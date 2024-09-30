# PoolEmptyUnlockTest
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/PoolEmptyUnlockTest.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

