# Action
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolNestedActionsTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


```solidity
enum Action {
    NESTED_SELF_UNLOCK,
    NESTED_EXECUTOR_UNLOCK,
    SWAP_AND_SETTLE,
    DONATE_AND_SETTLE,
    ADD_LIQUIDITY_AND_SETTLE,
    REMOVE_LIQUIDITY_AND_SETTLE,
    INITIALIZE
}
```

# PoolNestedActionsTest
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolNestedActionsTest.sol)

**Inherits:**
Test, [IUnlockCallback](/src/interfaces/callback/IUnlockCallback.sol/interface.IUnlockCallback.md)


## State Variables
### manager

```solidity
IPoolManager manager;
```


### executor

```solidity
NestedActionExecutor public executor;
```


### user

```solidity
address user;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _manager);
```

### unlock


```solidity
function unlock(bytes calldata data) external;
```

### unlockCallback

Called by the pool manager on `msg.sender` when the manager is unlocked


```solidity
function unlockCallback(bytes calldata data) external override returns (bytes memory);
```

### _nestedUnlock


```solidity
function _nestedUnlock() internal;
```

# NestedActionExecutor
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolNestedActionsTest.sol)

**Inherits:**
Test, [PoolTestBase](contracts/v4/reference/core/test/PoolTestBase.md)


## State Variables
### key

```solidity
PoolKey internal key;
```


### user

```solidity
address user;
```


### ADD_LIQUIDITY_PARAMS

```solidity
IPoolManager.ModifyLiquidityParams internal ADD_LIQUIDITY_PARAMS =
    IPoolManager.ModifyLiquidityParams({tickLower: -120, tickUpper: 120, liquidityDelta: 1e18, salt: 0});
```


### REMOVE_LIQUIDITY_PARAMS

```solidity
IPoolManager.ModifyLiquidityParams internal REMOVE_LIQUIDITY_PARAMS =
    IPoolManager.ModifyLiquidityParams({tickLower: -120, tickUpper: 120, liquidityDelta: -1e18, salt: 0});
```


### SWAP_PARAMS

```solidity
IPoolManager.SwapParams internal SWAP_PARAMS =
    IPoolManager.SwapParams({zeroForOne: true, amountSpecified: -100, sqrtPriceLimitX96: Constants.SQRT_PRICE_1_2});
```


### DONATE_AMOUNT0

```solidity
uint256 internal DONATE_AMOUNT0 = 12345e6;
```


### DONATE_AMOUNT1

```solidity
uint256 internal DONATE_AMOUNT1 = 98765e4;
```


## Functions
### constructor


```solidity
constructor(IPoolManager _manager, address _user) PoolTestBase(_manager);
```

### setKey


```solidity
function setKey(PoolKey memory _key) external;
```

### execute


```solidity
function execute(Action[] memory actions) public;
```

### _nestedUnlock


```solidity
function _nestedUnlock() internal;
```

### _swap


```solidity
function _swap(address caller) internal;
```

### _addLiquidity


```solidity
function _addLiquidity(address caller) internal;
```

### _removeLiquidity


```solidity
function _removeLiquidity(address caller) internal;
```

### _donate


```solidity
function _donate(address caller) internal;
```

### _initialize


```solidity
function _initialize() internal;
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata) external pure override returns (bytes memory);
```

## Errors
### KeyNotSet

```solidity
error KeyNotSet();
```

