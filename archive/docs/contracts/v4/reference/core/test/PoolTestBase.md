# PoolTestBase
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolTestBase.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IUnlockCallback](/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md)


## State Variables
### manager

```solidity
IPoolManager public immutable manager;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _manager);
```

### _fetchBalances


```solidity
function _fetchBalances(Currency currency, address user, address deltaHolder)
    internal
    view
    returns (uint256 userBalance, uint256 poolBalance, int256 delta);
```

