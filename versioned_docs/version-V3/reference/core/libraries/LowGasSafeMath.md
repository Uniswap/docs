Contains methods for doing math operations that revert on overflow or underflow for minimal gas cost


## Functions
### add
```solidity
  function add(
    uint256 x,
    uint256 y
  ) internal pure returns (uint256 z)
```
Returns x + y, reverts if sum overflows uint256


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint256 | The augend
|`y` | uint256 | The addend

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The sum of x and y
### sub
```solidity
  function sub(
    uint256 x,
    uint256 y
  ) internal pure returns (uint256 z)
```
Returns x - y, reverts if underflows


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint256 | The minuend
|`y` | uint256 | The subtrahend

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The difference of x and y
### mul
```solidity
  function mul(
    uint256 x,
    uint256 y
  ) internal pure returns (uint256 z)
```
Returns x * y, reverts if overflows


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint256 | The multiplicand
|`y` | uint256 | The multiplier

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| uint256 | The product of x and y
### add
```solidity
  function add(
    int256 x,
    int256 y
  ) internal pure returns (int256 z)
```
Returns x + y, reverts if overflows or underflows


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | int256 | The augend
|`y` | int256 | The addend

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The sum of x and y
### sub
```solidity
  function sub(
    int256 x,
    int256 y
  ) internal pure returns (int256 z)
```
Returns x - y, reverts if overflows or underflows


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | int256 | The minuend
|`y` | int256 | The subtrahend

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`z`| int256 | The difference of x and y
