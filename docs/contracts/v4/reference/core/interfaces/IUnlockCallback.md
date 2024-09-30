# IUnlockCallback
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/interfaces/callback/IUnlockCallback.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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


