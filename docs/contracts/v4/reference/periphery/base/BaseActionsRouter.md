# BaseActionsRouter
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/BaseActionsRouter.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[SafeCallback](contracts/v4/reference/periphery/base/SafeCallback.md)

Abstract contract for performing a combination of actions on Uniswap v4.

*Suggested uint256 action values are defined in Actions.sol, however any definition can be used*


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager) SafeCallback(_poolManager);
```

### _executeActions

internal function that triggers the execution of a set of actions on v4

*inheriting contracts should call this function to trigger execution*


```solidity
function _executeActions(bytes calldata unlockData) internal;
```

### _unlockCallback

function that is called by the PoolManager through the SafeCallback.unlockCallback


```solidity
function _unlockCallback(bytes calldata data) internal override returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes`|Abi encoding of (bytes actions, bytes[] params) where params[i] is the encoded parameters for actions[i]|


### _executeActionsWithoutUnlock


```solidity
function _executeActionsWithoutUnlock(bytes calldata actions, bytes[] calldata params) internal;
```

### _handleAction

function to handle the parsing and execution of an action and its parameters


```solidity
function _handleAction(uint256 action, bytes calldata params) internal virtual;
```

### msgSender

function that returns address considered executor of the actions

*The other context functions, _msgData and _msgValue, are not supported by this contract
In many contracts this will be the address that calls the initial entry point that calls `_executeActions`
`msg.sender` shouldn't be used, as this will be the v4 pool manager contract that calls `unlockCallback`
If using ReentrancyLock.sol, this function can return _getLocker()*


```solidity
function msgSender() public view virtual returns (address);
```

### _mapRecipient

Calculates the address for a action


```solidity
function _mapRecipient(address recipient) internal view returns (address);
```

### _mapPayer

Calculates the payer for an action


```solidity
function _mapPayer(bool payerIsUser) internal view returns (address);
```

## Errors
### InputLengthMismatch
emitted when different numbers of parameters and actions are provided


```solidity
error InputLengthMismatch();
```

### UnsupportedAction
emitted when an inheriting contract does not support an action


```solidity
error UnsupportedAction(uint256 action);
```

