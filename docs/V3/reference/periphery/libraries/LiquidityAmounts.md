Provides functions for computing liquidity amounts from token amounts and prices


## Functions
### getLiquidityForAmount0
```solidity
  function getLiquidityForAmount0(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint256 amount0
  ) internal returns (uint128 liquidity)
```
Computes the amount of liquidity received for a given amount of token0 and price range

Calculates amount0 * (sqrt(upper) * sqrt(lower)) / (sqrt(upper) - sqrt(lower))

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`amount0` | uint256 | The amount0 being sent in

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidity`| uint160 | The amount of returned liquidity
### getLiquidityForAmount1
```solidity
  function getLiquidityForAmount1(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint256 amount1
  ) internal returns (uint128 liquidity)
```
Computes the amount of liquidity received for a given amount of token1 and price range

Calculates amount1 / (sqrt(upper) - sqrt(lower)).

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`amount1` | uint256 | The amount1 being sent in

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidity`| uint160 | The amount of returned liquidity
### getLiquidityForAmounts
```solidity
  function getLiquidityForAmounts(
    uint160 sqrtRatioX96,
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint256 amount0,
    uint256 amount1
  ) internal returns (uint128 liquidity)
```
Computes the maximum amount of liquidity received for a given amount of token0, token1, the current
pool prices and the prices at the tick boundaries


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioX96` | uint160 | A sqrt price representing the current pool prices
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`amount0` | uint256 | The amount of token0 being sent in
|`amount1` | uint256 | The amount of token1 being sent in

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidity`| uint160 | The maximum amount of liquidity received
### getAmount0ForLiquidity
```solidity
  function getAmount0ForLiquidity(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint128 liquidity
  ) internal returns (uint256 amount0)
```
Computes the amount of token0 for a given amount of liquidity and a price range


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`liquidity` | uint128 | The liquidity being valued

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| uint160 | The amount of token0
### getAmount1ForLiquidity
```solidity
  function getAmount1ForLiquidity(
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint128 liquidity
  ) internal returns (uint256 amount1)
```
Computes the amount of token1 for a given amount of liquidity and a price range


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`liquidity` | uint128 | The liquidity being valued

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount1`| uint160 | The amount of token1
### getAmountsForLiquidity
```solidity
  function getAmountsForLiquidity(
    uint160 sqrtRatioX96,
    uint160 sqrtRatioAX96,
    uint160 sqrtRatioBX96,
    uint128 liquidity
  ) internal returns (uint256 amount0, uint256 amount1)
```
Computes the token0 and token1 value for a given amount of liquidity, the current
pool prices and the prices at the tick boundaries


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtRatioX96` | uint160 | A sqrt price representing the current pool prices
|`sqrtRatioAX96` | uint160 | A sqrt price representing the first tick boundary
|`sqrtRatioBX96` | uint160 | A sqrt price representing the second tick boundary
|`liquidity` | uint128 | The liquidity being valued

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| uint160 | The amount of token0
|`amount1`| uint160 | The amount of token1
