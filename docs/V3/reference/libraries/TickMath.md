Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports
prices between 2**-128 and 2**128


## Functions
### getSqrtRatioAtTick
```solidity
  function getSqrtRatioAtTick(
    int24 tick
  ) internal returns (uint160 sqrtPriceX96)
```
Calculates sqrt(1.0001^tick) * 2^96

Throws if |tick| > max tick

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tick` | int24 | The input tick for the above formula

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`sqrtPriceX96`| int24 | A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0)
at the given tick
### getTickAtSqrtRatio
```solidity
  function getTickAtSqrtRatio(
    uint160 sqrtPriceX96
  ) internal returns (int24 tick)
```
Calculates the greatest tick value such that getRatioAtTick(tick) <= ratio

Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may
ever return.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtPriceX96` | uint160 | The sqrt ratio for which to compute the tick as a Q64.96

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tick`| uint160 | The greatest tick for which the ratio is less than or equal to the input ratio
