Provides price and liquidity data useful for a wide variety of system designs

Instances of stored oracle data, "observations", are collected in the oracle array
Every pool is initialized with an oracle array length of 1. Anyone can pay the SSTOREs to increase the
maximum length of the oracle array. New slots will be added when the array is fully populated.
Observations are overwritten when the full length of the oracle array is populated.
The most recent observation is available, independent of the length of the oracle array, by passing 0 to observe()

## initialize
```solidity
  function initialize(
    struct Oracle.Observation[65535] self, uint32 time
  ) internal returns (uint16 cardinality, uint16 cardinalityNext)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The stored oracle array
|`time` |  | The time of the oracle initialization, via block.timestamp truncated to uint32

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`cardinality`|  | The number of populated elements in the oracle array
|`cardinalityNext`|  | The new length of the oracle array, independent of population
## write
```solidity
  function write(
    struct Oracle.Observation[65535] self, uint16 index, uint32 blockTimestamp, int24 tick, uint128 liquidity, uint16 cardinality, uint16 cardinalityNext
  ) internal returns (uint16 indexUpdated, uint16 cardinalityUpdated)
```
Writable at most once per block. Index represents the most recently written element, and must be tracked externally.
If the index is at the end of the allowable array length (according to cardinality), and the next cardinality
is greater than the current one, cardinality may be increased. This restriction is created to preserve ordering.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The stored oracle array
|`index` |  | The location of the most recently updated observation
|`blockTimestamp` |  | The timestamp of the new observation
|`tick` |  | The active tick at the time of the new observation
|`liquidity` |  | The total in-range liquidity at the time of the new observation
|`cardinality` |  | The number of populated elements in the oracle array
|`cardinalityNext` |  | The new length of the oracle array, independent of population

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`indexUpdated`|  | The new index of the most recently written element in the oracle array
|`cardinalityUpdated`|  | The new cardinality of the oracle array
## grow
```solidity
  function grow(
    struct Oracle.Observation[65535] self, uint16 current, uint16 next
  ) internal returns (uint16)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The stored oracle array
|`current` |  | The current next cardinality of the oracle array
|`next` |  | The proposed next cardinality which will be populated in the oracle array

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`next`|  | The next cardinality which will be populated in the oracle array
## observe
```solidity
  function observe(
    struct Oracle.Observation[65535] self, uint32 time, uint32[] secondsAgos, int24 tick, uint16 index, uint128 liquidity, uint16 cardinality
  ) internal returns (int56[] tickCumulatives, uint160[] liquidityCumulatives)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The stored oracle array
|`time` |  | The current block.timestamp
|`secondsAgos` |  | Each amount of time to look back, in seconds, at which point to return an observation
|`tick` |  | The current tick
|`index` |  | The location of a given observation within the oracle array
|`liquidity` |  | The current in-range pool liquidity
|`cardinality` |  | The number of populated elements in the oracle array

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tickCumulatives`|  | The tick * time elapsed since the pool was first initialized, as of each `secondsAgo`
|`liquidityCumulatives`|  | The liquidity * time elapsed since the pool was first initialized, as of each `secondsAgo`
