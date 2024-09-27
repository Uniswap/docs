# PoolTestBase
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/PoolTestBase.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

