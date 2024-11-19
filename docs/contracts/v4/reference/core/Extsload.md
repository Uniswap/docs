# Extsload
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/Extsload.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IExtsload](contracts/v4/reference/core/interfaces/IExtsload.md)

Enables public storage access for efficient state retrieval by external contracts.
https://eips.ethereum.org/EIPS/eip-2330#rationale


## Functions
### extsload

Called by external contracts to access granular pool state


```solidity
function extsload(bytes32 slot) external view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slot`|`bytes32`|Key of slot to sload|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|value The value of the slot as bytes32|


### extsload

Called by external contracts to access granular pool state


```solidity
function extsload(bytes32 startSlot, uint256 nSlots) external view returns (bytes32[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`startSlot`|`bytes32`||
|`nSlots`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32[]`|value The value of the slot as bytes32|


### extsload

Called by external contracts to access granular pool state


```solidity
function extsload(bytes32[] calldata slots) external view returns (bytes32[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slots`|`bytes32[]`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32[]`|value The value of the slot as bytes32|


