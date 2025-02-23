# HexStrings
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/HexStrings.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Provides function for converting numbers to hexadecimal strings

*Reference: https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/HexStrings.sol*


## State Variables
### ALPHABET

```solidity
bytes16 internal constant ALPHABET = "0123456789abcdef";
```


## Functions
### toHexStringNoPrefix

Convert a number to a hex string without the '0x' prefix with a fixed length


```solidity
function toHexStringNoPrefix(uint256 value, uint256 length) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`value`|`uint256`|The number to convert|
|`length`|`uint256`|The length of the output string, starting from the last character of the string|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The hex string|


