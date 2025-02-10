# IExttload
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/interfaces/IExttload.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for functions to access any transient storage slot in a contract


## Functions
### exttload

Called by external contracts to access transient storage of the contract


```solidity
function exttload(bytes32 slot) external view returns (bytes32 value);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slot`|`bytes32`|Key of slot to tload|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`value`|`bytes32`|The value of the slot as bytes32|


### exttload

Called by external contracts to access sparse transient pool state


```solidity
function exttload(bytes32[] calldata slots) external view returns (bytes32[] memory values);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slots`|`bytes32[]`|List of slots to tload|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`values`|`bytes32[]`|List of loaded values|


