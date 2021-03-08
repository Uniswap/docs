Facilitates multiplication and division that can have overflow of an intermediate value without any loss of precision

Handles "phantom overflow" i.e., allows multiplication and division where an intermediate value overflows 256 bits

## mulDiv
```solidity
  function mulDiv(
    uint256 a, uint256 b, uint256 denominator
  ) internal returns (uint256 result)
```
Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`a` |  | The multiplicand
|`b` |  | The multiplier
|`denominator` |  | The divisor

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`result`|  | The 256-bit result

## mulDivRoundingUp
```solidity
  function mulDivRoundingUp(
    uint256 a, uint256 b, uint256 denominator
  ) internal returns (uint256 result)
```
No description
### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`a` |  | The multiplicand
|`b` |  | The multiplier
|`denominator` |  | The divisor

### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`result`|  | The 256-bit result
