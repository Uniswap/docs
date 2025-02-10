# VanityAddressLib
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/VanityAddressLib.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A library to score addresses based on their vanity


## Functions
### betterThan

Compares two addresses and returns true if the first address has a better vanity score


```solidity
function betterThan(address first, address second) internal pure returns (bool better);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`first`|`address`|The first address to compare|
|`second`|`address`|The second address to compare|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`better`|`bool`|True if the first address has a better vanity score|


### score

Scores an address based on its vanity

*Scoring rules:
Requirement: The first nonzero nibble must be 4
10 points for every leading 0 nibble
40 points if the first 4 is followed by 3 more 4s
20 points if the first nibble after the 4 4s is NOT a 4
20 points if the last 4 nibbles are 4s
1 point for every 4*


```solidity
function score(address addr) internal pure returns (uint256 calculatedScore);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addr`|`address`|The address to score|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`calculatedScore`|`uint256`|The vanity score of the address|


### getLeadingNibbleCount

Returns the number of leading nibbles in an address that match a given value


```solidity
function getLeadingNibbleCount(bytes20 addrBytes, uint256 startIndex, uint8 comparison)
    internal
    pure
    returns (uint256 count);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`addrBytes`|`bytes20`|The address to count the leading zero nibbles in|
|`startIndex`|`uint256`||
|`comparison`|`uint8`||


### getNibble

Returns the nibble at a given index in an address


```solidity
function getNibble(bytes20 input, uint256 nibbleIndex) internal pure returns (uint8 currentNibble);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`input`|`bytes20`|The address to get the nibble from|
|`nibbleIndex`|`uint256`|The index of the nibble to get|


