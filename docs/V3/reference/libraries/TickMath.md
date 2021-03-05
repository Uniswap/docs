
## `TickMath`

Math library for computing sqrt prices from ticks and vice versa


Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports
prices between 2**-128 and 2**128




### `getSqrtRatioAtTick(int24 tick) → uint160 sqrtPriceX96` (internal)

Calculates sqrt(1.0001^tick) * 2^96.  Throws in case |tick| > max tick




tick: The input tick for the above formula


sqrtPriceX96: A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0)
at the given tick

### `getTickAtSqrtRatio(uint160 sqrtPriceX96) → int24 tick` (internal)

Calculates the greatest tick value such that getRatioAtTick(tick) <= ratio


Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may
ever return.


sqrtPriceX96: The sqrt ratio for which to compute the tick as a Q64.96


tick: The greatest tick for which the ratio is less than or equal to the input ratio


