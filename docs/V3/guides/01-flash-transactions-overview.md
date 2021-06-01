---
id: flash-transactions
title: Flash Transactions
---

The tooling landscape for developing smart contracts on Ethereum changes frequently. This guide uses Hardhat for solidity compilation and test running, yarn for package management, and waffle + mocha for writing tests. 

## Flash Transactions

Flash transactions are an approach to transferring tokens on Ethereum that transfer token balances *before* the necessary conditions are met for those balances to be transferred. In the context of a swap, this would mean the output is sent from the swap before the input is received. 

Uniswap V3 introduces a new function `flash` within the Pool contract. `Flash` withdraws a specified amount of both `token0` and `token1` to the `recipient` address. The withdrawn amount, plus the swap fees, will be due to the pool at the end of the transaction. `flash` includes a fourth parameter, `data`, which allows the called to abi.encode any necessary data to be passed through the function and decoded later.
  
```solidity
    function flash(
        address recipient,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external override lock noDelegateCall {
```

## The Flash Callback

`flash` will withdraw the tokens, but how are they payed back? To understand this we must look inside the flash function code. midway through the [**flash**](https://github.com/Uniswap/uniswap-v3-core/blob/main/contracts/UniswapV3Pool.sol#L791) function, we see this:

```solidity
IUniswapV3FlashCallback(msg.sender).uniswapV3FlashCallback(fee0, fee1, data);
```

This step calls the `FlashCallback` function on `msg.sender` - which passes the fee data needed to calculate the balances due to the pool, as well as the previously mentioned `data` parameter.

In V3 there are three separate callback functions, `uniswapV3SwapCallback`, `uniswapV3FlashCallback`, and `uniswapV3FlashCallback` each available to be overridden with custom logic. To write our arbitrage contract, we'll be calling `flash` and overriding the `uniswapV3FlashCalback` with the steps needed to finish executing our transaction.

## Getting started

In this guide, we will write a smart contract that calls `flash` on a V3 pool, and swaps the full amount withdrawn of `token0` and `token1` in the corresponding pools with the same token pair, but different fee tiers.

```solidity
contract PairFlash is IUniswapV3FlashCallback, PeripheryPayments {
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for int256;

    ISwapRouter swapRouter;

    constructor(
        ISwapRouter _swapRouter,
        address _factory,
        address _WETH9
    ) PeripheryImmutableState(_factory, _WETH9) {
        swapRouter = _swapRouter;
    }
```

Our first step is to inherit `IUniswapV3FlashCallback` and `PeripheryPayments`, as we will use each in our logic. Note these two inherited contracts already extend many other contracts that we will be using, such as `LowGasSafeMath`, which we are invoking for `uint256` and `int256`.