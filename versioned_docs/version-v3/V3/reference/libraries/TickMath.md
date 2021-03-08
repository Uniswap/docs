Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports
prices between 2**-128 and 2**128


## getSqrtRatioAtTick
```solidity
  function getSqrtRatioAtTick(
    int24 tick
  ) internal returns (uint160 sqrtPriceX96)
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tick` |  | The input tick for the above formula

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`sqrtPriceX96`|  | A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0)
at the given tick
## getTickAtSqrtRatio
```solidity
  function getTickAtSqrtRatio(
    uint160 sqrtPriceX96
  ) internal returns (int24 tick)
```
Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may
ever return.

### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtPriceX96` |  | The sqrt ratio for which to compute the tick as a Q64.96

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tick`|  | The greatest tick for which the ratio is less than or equal to the input ratio
