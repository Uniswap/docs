
This library provides functionality for computing bit properties of an unsigned integer

## Functions
### mostSignificantBit
```solidity
  function mostSignificantBit(
    uint256 x
  ) internal returns (uint8 r)
```
Returns the index of the most significant bit of the number,
    where the least significant bit is at index 0 and the most significant bit is at index 255

The function satisfies the property:
    x >= 2**mostSignificantBit(x) and x < 2**(mostSignificantBit(x)+1)

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint256 | the value for which to compute the most significant bit, must be greater than 0

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`r`| uint256 | the index of the most significant bit
### leastSignificantBit
```solidity
  function leastSignificantBit(
    uint256 x
  ) internal returns (uint8 r)
```
Returns the index of the least significant bit of the number,
    where the least significant bit is at index 0 and the most significant bit is at index 255

The function satisfies the property:
    (x & 2**leastSignificantBit(x)) != 0 and (x & (2**(leastSignificantBit(x)) - 1)) == 0)

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`x` | uint256 | the value for which to compute the least significant bit, must be greater than 0

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`r`| uint256 | the index of the least significant bit
