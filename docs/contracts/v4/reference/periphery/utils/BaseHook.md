# BaseHook
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/utils/BaseHook.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
IHooks, [ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md)

abstract contract for hook implementations


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) ImmutableState(_manager);
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

### beforeInitialize

The hook called before the state of a pool is initialized


```solidity
function beforeInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96)
    external
    onlyPoolManager
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the initialize call|
|`key`|`PoolKey`|The key for the pool being initialized|
|`sqrtPriceX96`|`uint160`|The sqrt(price) of the pool as a Q64.96|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _beforeInitialize


```solidity
function _beforeInitialize(address, PoolKey calldata, uint160) internal virtual returns (bytes4);
```

### afterInitialize

The hook called after the state of a pool is initialized


```solidity
function afterInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96, int24 tick)
    external
    onlyPoolManager
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the initialize call|
|`key`|`PoolKey`|The key for the pool being initialized|
|`sqrtPriceX96`|`uint160`|The sqrt(price) of the pool as a Q64.96|
|`tick`|`int24`|The current tick after the state of a pool is initialized|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _afterInitialize


```solidity
function _afterInitialize(address, PoolKey calldata, uint160, int24) internal virtual returns (bytes4);
```

### beforeAddLiquidity

The hook called before liquidity is added


```solidity
function beforeAddLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the add liquidity call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.ModifyLiquidityParams`|The parameters for adding liquidity|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the liquidity provider to be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _beforeAddLiquidity


```solidity
function _beforeAddLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    internal
    virtual
    returns (bytes4);
```

### beforeRemoveLiquidity

The hook called before liquidity is removed


```solidity
function beforeRemoveLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the remove liquidity call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.ModifyLiquidityParams`|The parameters for removing liquidity|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the liquidity provider to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _beforeRemoveLiquidity


```solidity
function _beforeRemoveLiquidity(address, PoolKey calldata, IPoolManager.ModifyLiquidityParams calldata, bytes calldata)
    internal
    virtual
    returns (bytes4);
```

### afterAddLiquidity

The hook called after liquidity is added


```solidity
function afterAddLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    BalanceDelta delta,
    BalanceDelta feesAccrued,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4, BalanceDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the add liquidity call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.ModifyLiquidityParams`|The parameters for adding liquidity|
|`delta`|`BalanceDelta`|The caller's balance delta after adding liquidity; the sum of principal delta, fees accrued, and hook delta|
|`feesAccrued`|`BalanceDelta`|The fees accrued since the last time fees were collected from this position|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the liquidity provider to be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BalanceDelta`|BalanceDelta The hook's delta in token0 and token1. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### _afterAddLiquidity


```solidity
function _afterAddLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) internal virtual returns (bytes4, BalanceDelta);
```

### afterRemoveLiquidity

The hook called after liquidity is removed


```solidity
function afterRemoveLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    BalanceDelta delta,
    BalanceDelta feesAccrued,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4, BalanceDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the remove liquidity call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.ModifyLiquidityParams`|The parameters for removing liquidity|
|`delta`|`BalanceDelta`|The caller's balance delta after removing liquidity; the sum of principal delta, fees accrued, and hook delta|
|`feesAccrued`|`BalanceDelta`|The fees accrued since the last time fees were collected from this position|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the liquidity provider to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BalanceDelta`|BalanceDelta The hook's delta in token0 and token1. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### _afterRemoveLiquidity


```solidity
function _afterRemoveLiquidity(
    address,
    PoolKey calldata,
    IPoolManager.ModifyLiquidityParams calldata,
    BalanceDelta,
    BalanceDelta,
    bytes calldata
) internal virtual returns (bytes4, BalanceDelta);
```

### beforeSwap

The hook called before a swap


```solidity
function beforeSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4, BeforeSwapDelta, uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the swap call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.SwapParams`|The parameters for the swap|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the swapper to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`BeforeSwapDelta`|BeforeSwapDelta The hook's delta in specified and unspecified currencies. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|
|`<none>`|`uint24`|uint24 Optionally override the lp fee, only used if three conditions are met: 1. the Pool has a dynamic fee, 2. the value's 2nd highest bit is set (23rd bit, 0x400000), and 3. the value is less than or equal to the maximum fee (1 million)|


### _beforeSwap


```solidity
function _beforeSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, bytes calldata)
    internal
    virtual
    returns (bytes4, BeforeSwapDelta, uint24);
```

### afterSwap

The hook called after a swap


```solidity
function afterSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    BalanceDelta delta,
    bytes calldata hookData
) external onlyPoolManager returns (bytes4, int128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the swap call|
|`key`|`PoolKey`|The key for the pool|
|`params`|`IPoolManager.SwapParams`|The parameters for the swap|
|`delta`|`BalanceDelta`|The amount owed to the caller (positive) or owed to the pool (negative)|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the swapper to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|
|`<none>`|`int128`|int128 The hook's delta in unspecified currency. Positive: the hook is owed/took currency, negative: the hook owes/sent currency|


### _afterSwap


```solidity
function _afterSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, BalanceDelta, bytes calldata)
    internal
    virtual
    returns (bytes4, int128);
```

### beforeDonate

The hook called before donate


```solidity
function beforeDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
    onlyPoolManager
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the donate call|
|`key`|`PoolKey`|The key for the pool|
|`amount0`|`uint256`|The amount of token0 being donated|
|`amount1`|`uint256`|The amount of token1 being donated|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the donor to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _beforeDonate


```solidity
function _beforeDonate(address, PoolKey calldata, uint256, uint256, bytes calldata) internal virtual returns (bytes4);
```

### afterDonate

The hook called after donate


```solidity
function afterDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
    onlyPoolManager
    returns (bytes4);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The initial msg.sender for the donate call|
|`key`|`PoolKey`|The key for the pool|
|`amount0`|`uint256`|The amount of token0 being donated|
|`amount1`|`uint256`|The amount of token1 being donated|
|`hookData`|`bytes`|Arbitrary data handed into the PoolManager by the donor to be be passed on to the hook|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes4`|bytes4 The function selector for the hook|


### _afterDonate


```solidity
function _afterDonate(address, PoolKey calldata, uint256, uint256, bytes calldata) internal virtual returns (bytes4);
```

## Errors
### HookNotImplemented

```solidity
error HookNotImplemented();
```

