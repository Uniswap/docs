# AddressStringUtil
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/AddressStringUtil.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

provides utility functions for converting addresses to strings

*Reference: https://github.com/Uniswap/solidity-lib/blob/master/contracts/libraries/AddressStringUtil.sol*


## Functions
### toAsciiString

Converts an address to the uppercase hex string, extracting only len bytes (up to 20, multiple of 2)


```solidity
function toAsciiString(address addr, uint256 len) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|the address to convert|
|`len`|`uint256`|the number of bytes to extract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|the hex string|


### char

Converts a value into is corresponding ASCII character for the hex representation


```solidity
function char(uint8 b) private pure returns (bytes1 c);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`b`|`uint8`|the value to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`c`|`bytes1`|the ASCII character|


## Errors
### InvalidAddressLength

```solidity
error InvalidAddressLength(uint256 len);
```

