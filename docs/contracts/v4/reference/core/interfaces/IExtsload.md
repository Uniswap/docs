# IExtsload
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/interfaces/IExtsload.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for functions to access any storage slot in a contract


## Functions
### extsload

Called by external contracts to access granular pool state


```solidity
function extsload(bytes32 slot) external view returns (bytes32 value);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slot`|`bytes32`|Key of slot to sload|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`value`|`bytes32`|The value of the slot as bytes32|


### extsload

Called by external contracts to access granular pool state


```solidity
function extsload(bytes32 startSlot, uint256 nSlots) external view returns (bytes32[] memory values);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`startSlot`|`bytes32`|Key of slot to start sloading from|
|`nSlots`|`uint256`|Number of slots to load into return value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`values`|`bytes32[]`|List of loaded values.|


### extsload

Called by external contracts to access sparse pool state


```solidity
function extsload(bytes32[] calldata slots) external view returns (bytes32[] memory values);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`slots`|`bytes32[]`|List of slots to SLOAD from.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`values`|`bytes32[]`|List of loaded values.|


