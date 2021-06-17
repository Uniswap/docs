


## Functions
### addDelta
```solidity
  function addDelta(
    uint128 x,
    int128 y
  ) internal pure returns (uint128 z)
```
Add a signed liquidity delta to liquidity and revert if it overflows or underflows


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint128 | The liquidity before change
|`y` | int128 | The delta by which liquidity should be changed

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint128 | The liquidity delta
