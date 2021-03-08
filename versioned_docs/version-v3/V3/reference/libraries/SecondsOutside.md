Contains methods for working with a mapping from tick to 32 bit timestamp values, specifically seconds
spent outside the tick.

The mapping uses int24 for keys since ticks are represented as int24 and there are 8 (2^3) values per word.

## initialize
```solidity
  function initialize(
    mapping(int24 => uint256) self, int24 tick, int24 tickCurrent, int24 tickSpacing, uint32 time
  ) internal
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | the packed mapping of tick to seconds outside
|`tick` |  | the tick to be initialized
|`tickCurrent` |  | the current tick
|`tickSpacing` |  | the spacing between usable ticks
|`time` |  | the current timestamp

## clear
```solidity
  function clear(
    mapping(int24 => uint256) self, int24 tick, int24 tickSpacing
  ) internal
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | the packed mapping of tick to seconds outside
|`tick` |  | the tick to be cleared
|`tickSpacing` |  | the spacing between usable ticks

## cross
```solidity
  function cross(
    mapping(int24 => uint256) self, int24 tick, int24 tickSpacing, uint32 time
  ) internal
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | the packed mapping of tick to seconds outside
|`tick` |  | the tick to be crossed
|`tickSpacing` |  | the spacing between usable ticks
|`time` |  | the current block timestamp truncated to 32 bits

## get
```solidity
  function get(
    mapping(int24 => uint256) self, int24 tick, int24 tickSpacing
  ) internal returns (uint32)
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | the packed mapping of tick to seconds outside
|`tick` |  | the tick to get the seconds outside value for
|`tickSpacing` |  | the spacing between usable ticks

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`the`|  | seconds outside value for that tick
## secondsInside
```solidity
  function secondsInside(
    mapping(int24 => uint256) self, int24 tickLower, int24 tickUpper, int24 tickCurrent, int24 tickSpacing, uint32 time
  ) internal returns (uint32)
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | the packed mapping of tick to seconds outside
|`tickLower` |  | the lower tick for which to get seconds inside
|`tickUpper` |  | the upper tick for which to get seconds inside
|`tickCurrent` |  | the current tick
|`tickSpacing` |  | the spacing between usable ticks

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`a`|  | relative seconds inside value that can be snapshotted and compared to a later snapshot to compute
time spent between tickLower and tickUpper, i.e. time that a position's liquidity was in use.
