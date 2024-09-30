# FeeTakingHook
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/FeeTakingHook.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[BaseTestHooks](contracts/v4/reference/core/test/BaseTestHooks.md)


## State Variables
### manager

```solidity
IPoolManager immutable manager;
```


### LIQUIDITY_FEE

```solidity
uint128 public constant LIQUIDITY_FEE = 543;
```


### SWAP_FEE_BIPS

```solidity
uint128 public constant SWAP_FEE_BIPS = 123;
```


### TOTAL_BIPS

```solidity
uint128 public constant TOTAL_BIPS = 10000;
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

### afterSwap


```solidity
function afterSwap(
    address,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    BalanceDelta delta,
    bytes calldata
) external override onlyPoolManager returns (bytes4, int128);
```

### afterRemoveLiquidity


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta delta,
    BalanceDelta,
    bytes calldata
) external override onlyPoolManager returns (bytes4, BalanceDelta);
```

### afterAddLiquidity


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta delta,
    BalanceDelta,
    bytes calldata
) external override onlyPoolManager returns (bytes4, BalanceDelta);
```

