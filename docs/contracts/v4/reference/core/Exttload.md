# Exttload
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/Exttload.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IExttload](contracts/v4/reference/core/interfaces/IExttload.md)

Enables public transient storage access for efficient state retrieval by external contracts.
https://eips.ethereum.org/EIPS/eip-2330#rationale


## Functions
### exttload

Called by external contracts to access transient storage of the contract


```solidity
function exttload(bytes32 slot) external view returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slot`|`bytes32`|Key of slot to tload|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|value The value of the slot as bytes32|


### exttload

Called by external contracts to access transient storage of the contract


```solidity
function exttload(bytes32[] calldata slots) external view returns (bytes32[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slots`|`bytes32[]`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32[]`|value The value of the slot as bytes32|


