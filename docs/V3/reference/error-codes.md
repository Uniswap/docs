---
id: error-codes
title: Error Codes
---


LiquidityMath.sol

* `LS` 
* `LA`

Oracle.sol

* `OLD`: The target must be chronologically at or after the oldest observation

* `I`: Cardinality must be greater than 0
  
Position.sol

* `NP`: disallow pokes for 0 liquidity positions

Tick.sol

* `LO` LiquidityGrossAfter must be less than MaxLiquidity

TickMath.sol 

* `T`:  require(absTick <= uint256(MAX_TICK), 'T');
* `R`: second inequality must be < because the price can never reach the price at the max tick

TransferHelper.sol

* `TF`: Transfer Failed : errors with TF if transfer fails


UniswapV3Pool.sol

* `LOK`: The reentrancy guard. Each pool can only be called once during a single transaction. This includes multiple swaps, or withdrawing a flash and then swapping on the same pool afterwards 

* `TLU`: The lower tick must be below the upper tick
* `TLM`: The lower tick must be greater, or equal to, the minimum tick
* `TUM`: The upper tick must be lesser than, or equal to, the maximum tick
* `AI`: The pool is already initialized
* `M0`: Mint 0, The balance of token0 in the given pool before minting must be less than, or equal to, the balance after minting
* `M1`: Mint 1, The balance of token1 in the given pool before minting must be less than, or equal to, the balance after minting
* `AS`: `amountSpecified` cannot be zero
* `SPL`: Square root price limit
* `IIA`: The pool balance of the inbound token must be as expected after the swap callback
* `L`: Liquidity in the pool must be greater than zero
* `F0`: The balance of token0 in the given pool before the flash transaction must be less than, or equal to, the balance of token0 after the flash
* `F1`: The balance of token1 in the given pool before the flash transaction must be less than, or equal to, the balance of token0 after the flash