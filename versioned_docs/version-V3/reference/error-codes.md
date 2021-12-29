---
id: error-codes
title: Error Codes
---


LiquidityMath.sol

* `LS`: Liquidity Sub
* `LA`: Liquidity Add

Oracle.sol

* `OLD`: The target must be chronologically after the oldest observation

* `I`: The pool has not been initialized
  
Position.sol

* `NP`: Burn cannot be called for a position with 0 liquidity

Tick.sol

* `LO`: LiquidityGrossAfter must be less than MaxLiquidity

TickMath.sol 

* `T`: The given tick must be less than, or equal to, the maximum tick
* `R`: second inequality must be < because the price can never reach the price at the max tick

TransferHelper.sol

* `TF`: Transfer Failed : errors with TF if transfer fails


UniswapV3Pool.sol

* `LOK`: The reentrancy guard. A transaction cannot re-enter the pool mid-swap

* `TLU`: The lower tick must be below the upper tick
* `TLM`: The lower tick must be greater, or equal to, the minimum tick
* `TUM`: The upper tick must be lesser than, or equal to, the maximum tick
* `AI`: The pool is already initialized
* `M0`: Mint 0, The balance of token0 in the given pool before minting must be less than, or equal to, the balance after minting
* `M1`: Mint 1, The balance of token1 in the given pool before minting must be less than, or equal to, the balance after minting
* `AS`: `amountSpecified` cannot be zero
* `SPL`: Square root price limit
* `IIA`: Insufficient input amount, an insufficient amount of input token was sent during the callback
* `L`: Liquidity in the pool must be greater than zero for a flash to be executed
* `F0`: The balance of token0 in the given pool before the flash transaction must be less than, or equal to, the balance of token0 after the flash plus the fee
* `F1`: The balance of token1 in the given pool before the flash transaction must be less than, or equal to, the balance of token0 after the flash plus the fee