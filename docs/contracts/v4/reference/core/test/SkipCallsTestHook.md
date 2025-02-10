# SkipCallsTestHook
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/SkipCallsTestHook.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[BaseTestHooks](contracts/v4/reference/core/test/BaseTestHooks.md), Test


## State Variables
### counter

```solidity
uint256 public counter;
```


### manager

```solidity
IPoolManager manager;
```


## Functions
### setManager


```solidity
function setManager(IPoolManager _manager) external;
```

### beforeInitialize


```solidity
function beforeInitialize(address, PoolKey calldata key, uint160 sqrtPriceX96) external override returns (bytes4);
```

### afterInitialize


```solidity
function afterInitialize(address, PoolKey calldata key, uint160 sqrtPriceX96, int24)
    external
    override
    returns (bytes4);
```

### beforeAddLiquidity


```solidity
function beforeAddLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external override returns (bytes4);
```

### afterAddLiquidity


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    BalanceDelta,
    BalanceDelta,
    bytes calldata hookData
) external override returns (bytes4, BalanceDelta);
```

### beforeRemoveLiquidity


```solidity
function beforeRemoveLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external override returns (bytes4);
```

### afterRemoveLiquidity


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    BalanceDelta,
    BalanceDelta,
    bytes calldata hookData
) external override returns (bytes4, BalanceDelta);
```

### beforeSwap


```solidity
function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata params, bytes calldata hookData)
    external
    override
    returns (bytes4, BeforeSwapDelta, uint24);
```

### afterSwap


```solidity
function afterSwap(
    address,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    BalanceDelta,
    bytes calldata hookData
) external override returns (bytes4, int128);
```

### beforeDonate


```solidity
function beforeDonate(address, PoolKey calldata key, uint256 amt0, uint256 amt1, bytes calldata hookData)
    external
    override
    returns (bytes4);
```

### afterDonate


```solidity
function afterDonate(address, PoolKey calldata key, uint256 amt0, uint256 amt1, bytes calldata hookData)
    external
    override
    returns (bytes4);
```

### _initialize


```solidity
function _initialize(PoolKey memory key, uint160 sqrtPriceX96) public;
```

### _swap


```solidity
function _swap(PoolKey calldata key, IPoolManager.SwapParams memory params, bytes calldata hookData) public;
```

### _addLiquidity


```solidity
function _addLiquidity(PoolKey calldata key, IPoolManager.ModifyLiquidityParams memory params, bytes calldata hookData)
    public;
```

### _removeLiquidity


```solidity
function _removeLiquidity(
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams memory params,
    bytes calldata hookData
) public;
```

### _donate


```solidity
function _donate(PoolKey calldata key, uint256 amt0, uint256 amt1, bytes calldata hookData) public;
```

