# UnsafeMath
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/UnsafeMath.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Contains methods that perform common math functions but do not do any overflow or underflow checks


## Functions
### divRoundingUp

Returns ceil(x / y)

*division by 0 will return 0, and should be checked externally*


```solidity
function divRoundingUp(uint256 x, uint256 y) internal pure returns (uint256 z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint256`|The dividend|
|`y`|`uint256`|The divisor|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`uint256`|The quotient, ceil(x / y)|


### simpleMulDiv

Calculates floor(a×b÷denominator)

*division by 0 will return 0, and should be checked externally*


```solidity
function simpleMulDiv(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`a`|`uint256`|The multiplicand|
|`b`|`uint256`|The multiplier|
|`denominator`|`uint256`|The divisor|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint256`|The 256-bit result, floor(a×b÷denominator)|


