---
id: using-flash-swaps
title: Flash Swaps
---

Flash swaps are an integral feature of Uniswap V2. In fact, under the hood, all swaps are actually flash swaps! This simply means that pair contracts send output tokens to the recipient _before_ enforcing that enough input tokens have been received. This is slightly atypical, as one might expect a pair to ensure it's received payment before delivery. However, because Ethereum transactions are _atomic_, we can roll back the entire swap if it turns out that the contract hasn't received enough tokens to make itself whole by the end of the transaction.

To see how this all works, let's start by examining the interface of the `swap` function:

```solidity
function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data);
```

For the sake of example, let's assume that we're dealing with a DAI/WETH pair, where DAI is `token0` and WETH is `token1`. `amount0Out` and `amount1Out` specify the amount of DAI and WETH that the `msg.sender` wants the pair to send to the `to` address (one of these amounts may be 0). At this point you may be wondering how the contract _receives_ tokens. For a typical (non-flash) swap, it's actually the responsibility of `msg.sender` to ensure that enough WETH or DAI has _already been sent_ to the pair before `swap` is called (in the context of trading, this is all handled neatly by a router contract). But when executing a flash swap, _tokens do not need to be sent to the contract before calling `swap`_. Instead, they must be sent from within a _callback function_ that the pair triggers on the `to` address.

# Triggering a Flash Swap

To differentiate between the "typical" trading case and the flash swap case, pairs use the `data` parameter. Specifically, if `data.length` equals 0, the contract assumes that payment has already been received, and simply transfers the tokens to the `to` address. But, if `data.length` is greater than 0, the contract transfers the tokens and then calls the following function on the `to` address:

```solidity
function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data);
```

The logic behind this identification strategy is simple: the vast majority of valid flash swap use cases involve interactions with external protocols. The best way to pass information dictating how these interactions happen (function arguments, safety parameters, addresses, etc.) is via the `data` parameter. It's expected that `data` will be `abi.decode`d from within `uniswapV2Call`. In the rare case where no data is required, callers should ensure that `data.length` equals 1 (i.e. encode a single junk byte as `bytes`), and then ignore this argument in `uniswapV2Call`.

Pairs call `uniswapV2Call` with the `sender` argument set to the `msg.sender` of the `swap`. `amount0` and `amount1` are simply `amount0Out` and `amount1Out`.

# Using uniswapV2Call

There are several conditions that should be checked in all `uniswapV2Call` functions:

```solidity
function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) {
  address token0 = IUniswapV2Pair(msg.sender).token0(); // fetch the address of token0
  address token1 = IUniswapV2Pair(msg.sender).token1(); // fetch the address of token1
  assert(msg.sender == IUniswapV2Factory(factoryV2).getPair(token0, token1)); // ensure that msg.sender is a V2 pair
  // rest of the function goes here!
}
```

The first 2 lines simply fetch the token addresses from the pair, and the 3rd ensures that the `msg.sender` is an actual Uniswap V2 pair address.

# Repayment

At the end of `uniswapV2Call`, contracts must return enough tokens to the pair to make it whole. Specifically, this means that the product of the pair reserves after the swap, discounting all token amounts sent by 0.3% LP fee, must be greater than before.

## Multi-Token

In the case where the token withdrawn is _not_ the token returned (i.e. DAI was requested in the flash swap, and WETH was returned, or vice versa), the fee simplifies to the simple swap case. This means that the standard `getAmountIn` pricing function should be used to calculate e.g., the amount of WETH that must be returned in exchange for the amount of DAI that was requested out.

This type of fee calculation gives a slight advantage to the caller, as the fee derived from repayment in a corresponding token will always be slightly less than the fee derived from a direct token repayment, as a result of the difference between the amount required to pay back a swap, versus the amount withdrawn and then directly returned. The approximate comparison of fees is ~ 30 bps for a swap fee vs. 30.09 bps for a direct repayment.

## Single-Token

In the case where the token withdrawn is the _same_ as the token returned (i.e. DAI was requested in the flash swap, used, then returned, or vice versa with WETH), the following condition must be satisfied:

`DAIReservePre - DAIWithdrawn + (DAIReturned * .997) >= DAIReservePre`

It may be more intuitive to rewrite this formula in terms of a "fee" levied on the _withdrawn_ amount (despite the fact that Uniswap always levies fees on input amounts, in this case the _returned_ amount, here we can simplify to an effective fee on the _withdrawn_ amount). If we rearrange, the formula looks like:

`(DAIReturned * .997) - DAIWithdrawn >= 0`

`DAIReturned >= DAIWithdrawn / .997`

So, the effective fee on the withdrawn amount is `.003 / .997 ≈ 0.3009027%`.

# Resources

For further exploration of flash swaps, see the <a href='/whitepaper.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>.

# Example

A fully functional example of flash swaps is available: [`ExampleFlashSwap.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol).

# Interface

```solidity
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';
```

```solidity
pragma solidity >=0.5.0;

interface IUniswapV2Callee {
  function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
```
