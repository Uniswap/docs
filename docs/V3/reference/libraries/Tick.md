Contains functions for managing tick processes and relevant calculations


## Functions
### tickSpacingToMaxLiquidityPerTick
```solidity
  function tickSpacingToMaxLiquidityPerTick(
    int24 tickSpacing
  ) internal returns (uint128)
```
/ @notice Derives max liquidity per tick from given tick spacing

Executed within the pool constructor

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tickSpacing` |  | The amount of required tick separation, realized in multiples of `tickSpacing`
    e.g., a tickSpacing of 3 requires ticks to be initialized every 3rd tick i.e., ..., -6, -3, 0, 3, 6, ...

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | max liquidity per tick
### getFeeGrowthInside
```solidity
  function getFeeGrowthInside(
    mapping(int24 => struct Tick.Info) self, int24 tickLower, int24 tickUpper, int24 tickCurrent, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128
  ) internal returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128)
```
/ @notice Retrieves fee growth data


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all tick information for initialized ticks
|`tickLower` |  | The lower tick boundary of the position
|`tickUpper` |  | The upper tick boundary of the position
|`tickCurrent` |  | The current tick
|`feeGrowthGlobal0X128` |  | The all-time global fee growth, per unit of liquidity, in token0
|`feeGrowthGlobal1X128` |  | The all-time global fee growth, per unit of liquidity, in token1

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`feeGrowthInside0X128`|  | The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries
|`feeGrowthInside1X128`|  | The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries
### update
```solidity
  function update(
    mapping(int24 => struct Tick.Info) self, int24 tick, int24 tickCurrent, int128 liquidityDelta, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128, bool upper, uint128 maxLiquidity
  ) internal returns (bool flipped)
```
/ @notice Updates a tick and returns true if the tick was flipped from initialized to uninitialized, or vice versa


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all tick information for initialized ticks
|`tick` |  | The tick that will be updated
|`tickCurrent` |  | The current tick
|`liquidityDelta` |  | A new amount of liquidity to be added (subtracted) when tick is crossed from left to right (right to left)
|`feeGrowthGlobal0X128` |  | The all-time global fee growth, per unit of liquidity, in token0
|`feeGrowthGlobal1X128` |  | The all-time global fee growth, per unit of liquidity, in token1
|`upper` |  | A bool representing whether or not the call represents the upper, or lower tick
|`maxLiquidity` |  | The maximum liquidity allocation for a single tick

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`flipped`|  | Whether the tick was flipped from initialized to uninitialized, or vice versa
### clear
```solidity
  function clear(
    mapping(int24 => struct Tick.Info) self, int24 tick
  ) internal
```
/ @notice Clears tick data


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all initialized tick information for initialized ticks
|`tick` |  | The tick that will be cleared

### cross
```solidity
  function cross(
    mapping(int24 => struct Tick.Info) self, int24 tick, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128
  ) internal returns (int128 liquidityNet)
```
/ @notice Transitions to next tick as needed by price movement


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all tick information for initialized ticks
|`tick` |  | The destination tick of the transition
|`feeGrowthGlobal0X128` |  | The all-time global fee growth, per unit of liquidity, in token0
|`feeGrowthGlobal1X128` |  | The all-time global fee growth, per unit of liquidity, in token1

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidityNet`|  | The amount of liquidity added (subtracted) when tick is crossed from left to right (right to left)
