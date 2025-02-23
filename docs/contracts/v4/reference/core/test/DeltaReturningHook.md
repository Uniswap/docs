# DeltaReturningHook
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/DeltaReturningHook.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[BaseTestHooks](contracts/v4/reference/core/test/BaseTestHooks.md)


## State Variables
### manager

```solidity
IPoolManager immutable manager;
```


### deltaSpecified

```solidity
int128 deltaSpecified;
```


### deltaUnspecifiedBeforeSwap

```solidity
int128 deltaUnspecifiedBeforeSwap;
```


### deltaUnspecifiedAfterSwap

```solidity
int128 deltaUnspecifiedAfterSwap;
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

### setDeltaSpecified


```solidity
function setDeltaSpecified(int128 delta) external;
```

### setDeltaUnspecifiedBeforeSwap


```solidity
function setDeltaUnspecifiedBeforeSwap(int128 delta) external;
```

### setDeltaUnspecifiedAfterSwap


```solidity
function setDeltaUnspecifiedAfterSwap(int128 delta) external;
```

### beforeSwap


```solidity
function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata params, bytes calldata)
    external
    override
    onlyPoolManager
    returns (bytes4, BeforeSwapDelta, uint24);
```

### afterSwap


```solidity
function afterSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata params, BalanceDelta, bytes calldata)
    external
    override
    onlyPoolManager
    returns (bytes4, int128);
```

### _sortCurrencies


```solidity
function _sortCurrencies(PoolKey calldata key, IPoolManager.SwapParams calldata params)
    internal
    pure
    returns (Currency specified, Currency unspecified);
```

### _settleOrTake


```solidity
function _settleOrTake(Currency currency, int128 delta) internal;
```

