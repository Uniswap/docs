Contains methods for safely casting between types


## Functions
### toUint160
```solidity
  function toUint160(
    uint256 y
  ) internal pure returns (uint160 z)
```
Cast a uint256 to a uint160, revert on overflow


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`y` | uint256 | The uint256 to be downcasted

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The downcasted integer, now type uint160
### toInt128
```solidity
  function toInt128(
    int256 y
  ) internal pure returns (int128 z)
```
Cast a int256 to a int128, revert on overflow or underflow


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`y` | int256 | The int256 to be downcasted

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The downcasted integer, now type int128
### toInt256
```solidity
  function toInt256(
    uint256 y
  ) internal pure returns (int256 z)
```
Cast a uint256 to a int256, revert on overflow


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`y` | uint256 | The uint256 to be casted

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The casted integer, now type int256
