# FullMath
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/libraries/FullMath.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Facilitates multiplication and division that can have overflow of an intermediate value without any loss of precision

*Handles "phantom overflow" i.e., allows multiplication and division where an intermediate value overflows 256 bits*


## Functions
### mulDiv

Calculates floor(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0

*Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv*


```solidity
function mulDiv(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
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
|`result`|`uint256`|The 256-bit result|


### mulDivRoundingUp

Calculates ceil(a×b÷denominator) with full precision. Throws if result overflows a uint256 or denominator == 0


```solidity
function mulDivRoundingUp(uint256 a, uint256 b, uint256 denominator) internal pure returns (uint256 result);
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
|`result`|`uint256`|The 256-bit result|


