Contains view functions to provide information about the pool that is computed rather than stored on the
blockchain. The functions here may have variable gas costs.


## Functions
### secondsInside
```solidity
  function secondsInside(
    int24 tickLower,
    int24 tickUpper
  ) external returns (uint32)
```
Returns a relative timestamp value representing how long, in seconds, the pool has spent between
tickLower and tickUpper

This timestamp is strictly relative. To get a useful elapsed time (i.e., duration) value, the value returned
by this method should be checkpointed externally after a position is minted, and again before a position is
burned. Thus the external contract must control the lifecycle of the position.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tickLower` | int24 | The lower tick of the range for which to get the seconds inside
|`tickUpper` | int24 | The upper tick of the range for which to get the seconds inside

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`A`| int24 | relative timestamp for how long the pool spent in the tick range
### observe
```solidity
  function observe(
    uint32[] secondsAgos
  ) external returns (int56[] tickCumulatives, uint160[] liquidityCumulatives)
```
Returns the cumulative tick and liquidity as of each timestamp `secondsAgo` from the current block timestamp

To get a time weighted average tick or liquidity-in-range, you must call this with two values, one representing
the beginning of the period and another for the end of the period. E.g., to get the last hour time-weighted average tick,
you must call it with secondsAgos = [3600, 0].
The time weighted average tick represents the geometric time weighted average price of the pool, in
log base sqrt(1.0001) of token1 / token0. The TickMath library can be used to go from a tick value to a ratio.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`secondsAgos` | uint32[] | From how long ago each cumulative tick and liquidity value should be returned

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tickCumulatives`| uint32[] | Cumulative tick values as of each `secondsAgos` from the current block timestamp
|`liquidityCumulatives`|  | Cumulative liquidity-in-range value as of each `secondsAgos` from the current block
timestamp
