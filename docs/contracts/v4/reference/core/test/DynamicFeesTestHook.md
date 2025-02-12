# DynamicFeesTestHook
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/DynamicFeesTestHook.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[BaseTestHooks](contracts/v4/reference/core/test/BaseTestHooks.md)


## State Variables
### fee

```solidity
uint24 internal fee;
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

### setFee


```solidity
function setFee(uint24 _fee) external;
```

### afterInitialize


```solidity
function afterInitialize(address, PoolKey calldata key, uint160, int24) external override returns (bytes4);
```

### beforeSwap


```solidity
function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata, bytes calldata)
    external
    override
    returns (bytes4, BeforeSwapDelta, uint24);
```

### forcePoolFeeUpdate


```solidity
function forcePoolFeeUpdate(PoolKey calldata _key, uint24 _fee) external;
```

