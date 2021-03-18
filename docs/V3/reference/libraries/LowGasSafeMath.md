Contains methods for doing math operations that revert on overflow or underflow for minimal gas cost


## Functions
### add
```solidity
  function add(
    uint256 x, 
    uint256 y
  ) internal returns (uint256 z)
```
Returns x + y, reverts if sum overflows uint256



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The sum of x and y
### sub
```solidity
  function sub(
    uint256 x, 
    uint256 y
  ) internal returns (uint256 z)
```
Returns x - y, reverts if underflows



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The difference of x and y
### mul
```solidity
  function mul(
    uint256 x, 
    uint256 y
  ) internal returns (uint256 z)
```
Returns x * y, reverts if overflows



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The product of x and y
### add
```solidity
  function add(
    int256 x, 
    int256 y
  ) internal returns (int256 z)
```
Returns x + y, reverts if overflows or underflows



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The sum of x and y
### sub
```solidity
  function sub(
    int256 x, 
    int256 y
  ) internal returns (int256 z)
```
Returns x - y, reverts if overflows or underflows



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The difference of x and y