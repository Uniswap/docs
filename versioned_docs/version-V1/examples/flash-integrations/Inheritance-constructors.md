---
id: inheritance-constructors
title: Getting Started
sidebar_position: 1
---

In this guide, we will write a smart contract that calls `flash` on a V3 pool and swaps the full amount withdrawn of `token0` and `token1` in the corresponding pools with the same token pair - but different fee tiers. After the swap, the contract will pay back the first pool and transfer profits to the original calling address.

## Flash Transactions Overview

Flash transactions are an approach to transferring tokens on Ethereum that transfer token balances _before_ the necessary conditions are met for those balances to be transferred. In the context of a swap, this would mean the output is sent from the swap before the input is received.

Uniswap V3 introduces a new function, `flash`, within the Pool contract. `Flash` withdraws a specified amount of both `token0` and `token1` to the `recipient` address. The withdrawn amount, plus the swap fees, will be due to the pool at the end of the transaction. `flash` includes a fourth parameter, `data`, which allows the caller to abi.encode any necessary data to be passed through the function and decoded later.

```solidity
    function flash(
        address recipient,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external override lock noDelegateCall {
```

## The Flash Callback

`flash` will withdraw the tokens, but how are they paid back? To understand this, we must look inside the flash function code. midway through the [**flash**](https://github.com/Uniswap/uniswap-v3-core/blob/main/contracts/UniswapV3Pool.sol#L791) function, we see this:

```solidity
IUniswapV3FlashCallback(msg.sender).uniswapV3FlashCallback(fee0, fee1, data);
```

This step calls the `FlashCallback` function on `msg.sender` - which passes the fee data needed to calculate the balances due to the pool, as well as any data encoded into the `data` parameter.

In V3 there are three separate callback functions, `uniswapV3SwapCallback`, `uniswapV3MintCallback`, and `uniswapV3FlashCallback`, each available to be overridden with custom logic. To write our arbitrage contract, we'll be calling `flash` and overriding the `uniswapV3FlashCallback` with the steps needed to finish executing our transaction.

## Inheriting The V3 Contracts

Inherit `IUniswapV3FlashCallback` and `PeripheryPayments`, as we will use each in our program. Note these two inherited contracts already extend many other contracts that we will be using, such as [LowGasSafeMath](https://docs.niftyleague.com/reference/core/libraries/LowGasSafeMath) which we [attach](https://docs.soliditylang.org/en/v0.7.6/contracts.html?highlight=using#using-for), to types `uint256` and `int256`.

```solidity
contract PairFlash is IUniswapV3FlashCallback, PeripheryPayments {
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for int256;
```

Declare an immutable public variable `swapRouter` of type `ISwapRouter`:

```solidity
    ISwapRouter public Immutable swapRouter;
```

Declare the constructor here, which is executed once when the contract is deployed. Our constructor hardcodes the address of the V3 router, factory, and the address of weth9, the [ERC-20 wrapper](https://weth.io/) for ether.

```solidity
    constructor(
        ISwapRouter _swapRouter,
        address _factory,
        address _WETH9
    ) PeripheryImmutableState(_factory, _WETH9) {
        swapRouter = _swapRouter;
    }
```

The full import section and contract declaration:

```solidity
pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-core/contracts/interfaces/callback/IUniswapV3FlashCallback.sol';
import '@uniswap/v3-core/contracts/libraries/LowGasSafeMath.sol';

import '@uniswap/v3-periphery/contracts/base/PeripheryPayments.sol';
import '@uniswap/v3-periphery/contracts/base/PeripheryImmutableState.sol';
import '@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol';
import '@uniswap/v3-periphery/contracts/libraries/CallbackValidation.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';



contract PairFlash is IUniswapV3FlashCallback, PeripheryPayments {
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for int256;

    ISwapRouter public immutable swapRouter;

    constructor(
        ISwapRouter _swapRouter,
        address _factory,
        address _WETH9
    ) PeripheryImmutableState(_factory, _WETH9) {
        swapRouter = _swapRouter;
    }
```
