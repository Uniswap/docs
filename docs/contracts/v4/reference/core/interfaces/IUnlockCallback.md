# IUnlockCallback
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/interfaces/callback/IUnlockCallback.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the callback executed when an address unlocks the pool manager


## Functions
### unlockCallback

Called by the pool manager on `msg.sender` when the manager is unlocked


```solidity
function unlockCallback(bytes calldata data) external returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|The data that was passed to the call to unlock|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Any data that you want to be returned from the unlock call|


