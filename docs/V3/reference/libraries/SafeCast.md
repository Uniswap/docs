Contains methods for safely downcasting to smaller types


## Functions
### toUint160
```solidity
  function toUint160(
  ) internal returns (uint160 z)
```
Cast a uint256 to a uint160, revert on overflow



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The downcasted integer, now type uint160
### toInt128
```solidity
  function toInt128(
  ) internal returns (int128 z)
```
Cast a int256 to a int128, revert on overflow or underflow



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The downcasted integer, now type int128
### toInt256
```solidity
  function toInt256(
  ) internal returns (int256 z)
```
Cast a uint256 to a int256, revert on overflow



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The downcasted integer, now type int256
