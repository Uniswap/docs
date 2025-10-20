---
id: library
title: Library
---

## Code

[`UniswapV2Library.sol`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol)

## Internal Functions

### sortTokens

```solidity
function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1);
```

Sorts token addresses.

### pairFor

```solidity
function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair);
```

Calculates the address for a pair without making any external calls via the v2 SDK.

### getReserves

```solidity
function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB);
```

Calls [getReserves](../smart-contracts/pair#getreserves) on the pair for the passed tokens, and returns the results sorted in the order that the parameters were passed in.

### quote

```solidity
function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB);
```

Given some asset amount and reserves, returns an amount of the other asset representing equivalent value.

- Useful for calculating optimal token amounts before calling [mint](../smart-contracts/pair#mint-1).

### getAmountOut

```solidity
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut);
```

Given an _input_ asset amount, returns the maximum _output_ amount of the other asset (accounting for fees) given reserves.

- Used in [getAmountsOut](#getamountsout).

### getAmountIn

```solidity
function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn);
```

Returns the minimum _input_ asset amount required to buy the given _output_ asset amount (accounting for fees) given reserves.

- Used in [getAmountsIn](#getamountsin).

### getAmountsOut

```solidity
function getAmountsOut(uint amountIn, address[] memory path) internal view returns (uint[] memory amounts);
```

Given an _input_ asset amount and an array of token addresses, calculates all subsequent maximum _output_ token amounts by calling [getReserves](#getreserves) for each pair of token addresses in the path in turn, and using these to call [getAmountOut](#getamountout).

- Useful for calculating optimal token amounts before calling [swap](../smart-contracts/pair#swap-1).

### getAmountsIn

```solidity
function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts);
```

Given an _output_ asset amount and an array of token addresses, calculates all preceding minimum _input_ token amounts by calling [getReserves](#getreserves) for each pair of token addresses in the path in turn, and using these to call [getAmountIn](#getamountin).

- Useful for calculating optimal token amounts before calling [swap](../smart-contracts/pair#swap-1).
