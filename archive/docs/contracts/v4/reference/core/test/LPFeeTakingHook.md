# LPFeeTakingHook
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/LPFeeTakingHook.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

