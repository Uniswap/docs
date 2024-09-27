# EmptyTestHooks
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/EmptyTestHooks.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IHooks](contracts/v4/reference/core/interfaces/IHooks.md)


## Functions
### constructor


```solidity
constructor();
```

### beforeInitialize


```solidity
function beforeInitialize(address, PoolKey calldata, uint160, bytes calldata) external pure override returns (bytes4);
```

### afterInitialize


```solidity
function afterInitialize(address, PoolKey calldata, uint160, int24, bytes calldata)
    external
    pure
    override
    returns (bytes4);
```

### beforeAddLiquidity


```solidity
function beforeAddLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    external
    pure
    override
    returns (bytes4);
```

### afterAddLiquidity


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) external pure override returns (bytes4, BalanceDelta);
```

### beforeRemoveLiquidity


```solidity
function beforeRemoveLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    external
    pure
    override
    returns (bytes4);
```

### afterRemoveLiquidity


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) external pure override returns (bytes4, BalanceDelta);
```

### beforeSwap


```solidity
function beforeSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, bytes calldata)
    external
    pure
    override
    returns (bytes4, BeforeSwapDelta, uint24);
```

### afterSwap


```solidity
function afterSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, BalanceDelta, bytes calldata)
    external
    pure
    override
    returns (bytes4, int128);
```

### beforeDonate


```solidity
function beforeDonate(address, PoolKey calldata, uint256, uint256, bytes calldata)
    external
    pure
    override
    returns (bytes4);
```

### afterDonate


```solidity
function afterDonate(address, PoolKey calldata, uint256, uint256, bytes calldata)
    external
    pure
    override
    returns (bytes4);
```

