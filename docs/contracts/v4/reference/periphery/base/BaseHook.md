# BaseHook
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/hooks/BaseHook.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
IHooks, [SafeCallback](/src/base/SafeCallback.sol/abstract.SafeCallback.md)

abstract contract for hook implementations


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) SafeCallback(_manager);
```

### selfOnly

*Only this address may call this function*


```solidity
modifier selfOnly();
```

### onlyValidPools

*Only pools with hooks set to this contract may call this function*


```solidity
modifier onlyValidPools(IHooks hooks);
```

### getHookPermissions

Returns a struct of permissions to signal which hook functions are to be implemented

*Used at deployment to validate the address correctly represents the expected permissions*


```solidity
function getHookPermissions() public pure virtual returns (Hooks.Permissions memory);
```

### validateHookAddress

Validates the deployed hook address agrees with the expected permissions of the hook

*this function is virtual so that we can override it during testing,
which allows us to deploy an implementation to any address
and then etch the bytecode into the correct address*


```solidity
function validateHookAddress(BaseHook _this) internal pure virtual;
```

### _unlockCallback


```solidity
function _unlockCallback(bytes calldata data) internal virtual override returns (bytes memory);
```

### beforeInitialize

The hook called before the state of a pool is initialized


```solidity
function beforeInitialize(address, PoolKey calldata, uint160, bytes calldata) external virtual returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`uint160`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### afterInitialize

The hook called after the state of a pool is initialized


```solidity
function afterInitialize(address, PoolKey calldata, uint160, int24, bytes calldata) external virtual returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`uint160`||
|`<none>`|`int24`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### beforeAddLiquidity

The hook called before liquidity is added


```solidity
function beforeAddLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    external
    virtual
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.ModifyLiquidityParams`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### beforeRemoveLiquidity

The hook called before liquidity is removed


```solidity
function beforeRemoveLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    external
    virtual
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.ModifyLiquidityParams`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### afterAddLiquidity

The hook called after liquidity is added


```solidity
function afterAddLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) external virtual returns (bytes4, BalanceDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.ModifyLiquidityParams`||
|`<none>`|`BalanceDelta`||
|`<none>`|`BalanceDelta`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BalanceDelta`|BalanceDelta The hook's delta in token0 and token1. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### afterRemoveLiquidity

The hook called after liquidity is removed


```solidity
function afterRemoveLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) external virtual returns (bytes4, BalanceDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.ModifyLiquidityParams`||
|`<none>`|`BalanceDelta`||
|`<none>`|`BalanceDelta`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BalanceDelta`|BalanceDelta The hook's delta in token0 and token1. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### beforeSwap

The hook called before a swap


```solidity
function beforeSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, bytes calldata)
    external
    virtual
    returns (bytes4, BeforeSwapDelta, uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.SwapParams`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BeforeSwapDelta`|BeforeSwapDelta The hook's delta in specified and unspecified currencies. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|
|`<none>`|`uint24`|uint24 Optionally override the lp fee, only used if three conditions are met: 1. the Pool has a dynamic fee, 2. the value's 2nd highest bit is set (23rd bit, 0x400000), and 3. the value is less than or equal to the maximum fee (1 million)|


### afterSwap

The hook called after a swap


```solidity
function afterSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, BalanceDelta, bytes calldata)
    external
    virtual
    returns (bytes4, int128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`IPoolManager.SwapParams`||
|`<none>`|`BalanceDelta`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`int128`|int128 The hook's delta in unspecified currency. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### beforeDonate

The hook called before donate


```solidity
function beforeDonate(address, PoolKey calldata, uint256, uint256, bytes calldata) external virtual returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`uint256`||
|`<none>`|`uint256`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### afterDonate

The hook called after donate


```solidity
function afterDonate(address, PoolKey calldata, uint256, uint256, bytes calldata) external virtual returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||
|`<none>`|`PoolKey`||
|`<none>`|`uint256`||
|`<none>`|`uint256`||
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


## Errors
### NotSelf

```solidity
error NotSelf();
```

### InvalidPool

```solidity
error InvalidPool();
```

### LockFailure

```solidity
error LockFailure();
```

### HookNotImplemented

```solidity
error HookNotImplemented();
```

