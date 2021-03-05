
## `SwapMath`

Computes the result of a swap within ticks


Contains methods for computing the result of a swap within a single tick price range, i.e., a single tick.




### `computeSwapStep(uint160 sqrtRatioCurrentX96, uint160 sqrtRatioTargetX96, uint128 liquidity, int256 amountRemaining, uint24 feePips) → uint160 sqrtRatioNextX96, uint256 amountIn, uint256 amountOut, uint256 feeAmount` (internal)

Computes the result of swapping some amount in, or amount out, given the parameters of the swap


The fee, plus the amount in, will never exceed the amount remaining if the swap's `amountSpecified` is positive


sqrtRatioCurrentX96: The current sqrt price of the pool

sqrtRatioTargetX96: The price that cannot be exceeded, from which the direction of the swap is inferred

liquidity: The usable liquidity

amountRemaining: How much input or output amount is remaining to be swapped in/out

feePips: The fee taken from the input amount, expressed in hundredths of a bip


sqrtRatioNextX96: The price after swapping the amount in/out, not to exceed the price target

amountIn: The amount to be swapped in, of either token0 or token1, based on the direction of the swap

amountOut: The amount to be swapped in, of either token0 or token1, based on the direction of the swap

feeAmount: The amount of input that will be taken as a fee


