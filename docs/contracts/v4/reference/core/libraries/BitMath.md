# BitMath
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/BitMath.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Author:**
Solady (https://github.com/Vectorized/solady/blob/8200a70e8dc2a77ecb074fc2e99a2a0d36547522/src/utils/LibBit.sol)

*This library provides functionality for computing bit properties of an unsigned integer*


## Functions
### mostSignificantBit

Returns the index of the most significant bit of the number,
where the least significant bit is at index 0 and the most significant bit is at index 255


```solidity
function mostSignificantBit(uint256 x) internal pure returns (uint8 r);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint256`|the value for which to compute the most significant bit, must be greater than 0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`r`|`uint8`|the index of the most significant bit|


### leastSignificantBit

Returns the index of the least significant bit of the number,
where the least significant bit is at index 0 and the most significant bit is at index 255


```solidity
function leastSignificantBit(uint256 x) internal pure returns (uint8 r);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint256`|the value for which to compute the least significant bit, must be greater than 0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`r`|`uint8`|the index of the least significant bit|


