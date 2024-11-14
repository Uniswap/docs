# SafeCallback
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/base/SafeCallback.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md), IUnlockCallback

A contract that only allows the Uniswap v4 PoolManager to call the unlockCallback


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager) ImmutableState(_poolManager);
```

### onlyPoolManager

Only allow calls from the PoolManager contract


```solidity
modifier onlyPoolManager();
```

### unlockCallback

Called by the pool manager on `msg.sender` when the manager is unlocked

*We force the onlyPoolManager modifier by exposing a virtual function after the onlyPoolManager check.*


```solidity
function unlockCallback(bytes calldata data) external onlyPoolManager returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|The data that was passed to the call to unlock|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Any data that you want to be returned from the unlock call|


### _unlockCallback

*to be implemented by the child contract, to safely guarantee the logic is only executed by the PoolManager*


```solidity
function _unlockCallback(bytes calldata data) internal virtual returns (bytes memory);
```

## Errors
### NotPoolManager
Thrown when calling unlockCallback where the caller is not PoolManager


```solidity
error NotPoolManager();
```

