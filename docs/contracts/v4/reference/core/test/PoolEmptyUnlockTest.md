# PoolEmptyUnlockTest
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolEmptyUnlockTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IUnlockCallback](/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md)


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

### unlock


```solidity
function unlock() external;
```

### unlockCallback

Called by the pool manager on `msg.sender` when the manager is unlocked


```solidity
function unlockCallback(bytes calldata) external override returns (bytes memory);
```

## Events
### UnlockCallback

```solidity
event UnlockCallback();
```

