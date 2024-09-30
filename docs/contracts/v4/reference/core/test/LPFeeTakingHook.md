# LPFeeTakingHook
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/LPFeeTakingHook.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[BaseTestHooks](contracts/v4/reference/core/test/BaseTestHooks.md)

a hook that takes all of the LP fee revenue

*an example test hook to validate the data is provided correctly*


## State Variables
### manager

```solidity
IPoolManager immutable manager;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _manager);
```

### onlyPoolManager


```solidity
modifier onlyPoolManager();
```

### afterRemoveLiquidity


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta feeDelta,
    bytes calldata
) external override onlyPoolManager returns (bytes4, BalanceDelta);
```

### afterAddLiquidity


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta feeDelta,
    bytes calldata
) external override onlyPoolManager returns (bytes4, BalanceDelta);
```

