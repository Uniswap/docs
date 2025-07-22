# Actions
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/ActionsRouter.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


```solidity
enum Actions {
    SETTLE,
    SETTLE_NATIVE,
    SETTLE_FOR,
    TAKE,
    PRANK_TAKE_FROM,
    SYNC,
    MINT,
    CLEAR,
    ASSERT_BALANCE_EQUALS,
    ASSERT_RESERVES_EQUALS,
    ASSERT_DELTA_EQUALS,
    ASSERT_NONZERO_DELTA_COUNT_EQUALS,
    TRANSFER_FROM,
    COLLECT_PROTOCOL_FEES
}
```

# ActionsRouter
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/ActionsRouter.sol)

**Inherits:**
[IUnlockCallback](/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md), Test

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

### _collectProtocolFees


```solidity
function _collectProtocolFees(bytes memory params) internal;
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

