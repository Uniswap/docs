# ActionsRouter
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/ActionsRouter.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IUnlockCallback](/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md), Test, GasSnapshot

A router that handles an arbitrary input of actions.
TODO: Can continue to add functions per action.


## State Variables
### manager

```solidity
IPoolManager manager;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _manager);
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata data) external returns (bytes memory);
```

### executeActions


```solidity
function executeActions(Actions[] memory actions, bytes[] memory params) external payable;
```

### _settle


```solidity
function _settle() internal;
```

### _settleNative


```solidity
function _settleNative(bytes memory params) internal;
```

### _settleFor


```solidity
function _settleFor(bytes memory params) internal;
```

### _take


```solidity
function _take(bytes memory params) internal;
```

### _prankTakeFrom


```solidity
function _prankTakeFrom(bytes memory params) internal;
```

### _sync


```solidity
function _sync(bytes memory params) internal;
```

### _mint


```solidity
function _mint(bytes memory params) internal;
```

### _clear


```solidity
function _clear(bytes memory params) internal;
```

### _assertBalanceEquals


```solidity
function _assertBalanceEquals(bytes memory params) internal view;
```

### _assertReservesEquals


```solidity
function _assertReservesEquals(bytes memory params) internal view;
```

### _assertDeltaEquals


```solidity
function _assertDeltaEquals(bytes memory params) internal view;
```

### _assertNonzeroDeltaCountEquals


```solidity
function _assertNonzeroDeltaCountEquals(bytes memory params) internal view;
```

### _transferFrom


```solidity
function _transferFrom(bytes memory params) internal;
```

## Errors
### ActionNotSupported

```solidity
error ActionNotSupported();
```

### CheckParameters

```solidity
error CheckParameters();
```

