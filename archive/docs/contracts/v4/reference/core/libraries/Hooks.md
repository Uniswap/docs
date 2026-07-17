# Hooks
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/libraries/Hooks.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

V4 decides whether to invoke specific hooks by inspecting the least significant bits
of the address that the hooks contract is deployed to.
For example, a hooks contract deployed to address: 0x0000000000000000000000000000000000002400
has the lowest bits '10 0100 0000 0000' which would cause the 'before initialize' and 'after add liquidity' hooks to be used.


## State Variables
### ALL_HOOK_MASK

```solidity
uint160 internal constant ALL_HOOK_MASK = uint160((1 << 14) - 1);
```


### BEFORE_INITIALIZE_FLAG

```solidity
uint160 internal constant BEFORE_INITIALIZE_FLAG = 1 << 13;
```


### AFTER_INITIALIZE_FLAG

```solidity
uint160 internal constant AFTER_INITIALIZE_FLAG = 1 << 12;
```


### BEFORE_ADD_LIQUIDITY_FLAG

```solidity
uint160 internal constant BEFORE_ADD_LIQUIDITY_FLAG = 1 << 11;
```


### AFTER_ADD_LIQUIDITY_FLAG

```solidity
uint160 internal constant AFTER_ADD_LIQUIDITY_FLAG = 1 << 10;
```


### BEFORE_REMOVE_LIQUIDITY_FLAG

```solidity
uint160 internal constant BEFORE_REMOVE_LIQUIDITY_FLAG = 1 << 9;
```


### AFTER_REMOVE_LIQUIDITY_FLAG

```solidity
uint160 internal constant AFTER_REMOVE_LIQUIDITY_FLAG = 1 << 8;
```


### BEFORE_SWAP_FLAG

```solidity
uint160 internal constant BEFORE_SWAP_FLAG = 1 << 7;
```


### AFTER_SWAP_FLAG

```solidity
uint160 internal constant AFTER_SWAP_FLAG = 1 << 6;
```


### BEFORE_DONATE_FLAG

```solidity
uint160 internal constant BEFORE_DONATE_FLAG = 1 << 5;
```


### AFTER_DONATE_FLAG

```solidity
uint160 internal constant AFTER_DONATE_FLAG = 1 << 4;
```


### BEFORE_SWAP_RETURNS_DELTA_FLAG

```solidity
uint160 internal constant BEFORE_SWAP_RETURNS_DELTA_FLAG = 1 << 3;
```


### AFTER_SWAP_RETURNS_DELTA_FLAG

```solidity
uint160 internal constant AFTER_SWAP_RETURNS_DELTA_FLAG = 1 << 2;
```


### AFTER_ADD_LIQUIDITY_RETURNS_DELTA_FLAG

```solidity
uint160 internal constant AFTER_ADD_LIQUIDITY_RETURNS_DELTA_FLAG = 1 << 1;
```


### AFTER_REMOVE_LIQUIDITY_RETURNS_DELTA_FLAG

```solidity
uint160 internal constant AFTER_REMOVE_LIQUIDITY_RETURNS_DELTA_FLAG = 1 << 0;
```


## Functions
### validateHookPermissions

Utility function intended to be used in hook constructors to ensure
the deployed hooks address causes the intended hooks to be called

*permissions param is memory as the function will be called from constructors*


```solidity
function validateHookPermissions(IHooks self, Permissions memory permissions) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`IHooks`||
|`permissions`|`Permissions`|The hooks that are intended to be called|


### isValidHookAddress

Ensures that the hook address includes at least one hook flag or dynamic fees, or is the 0 address


```solidity
function isValidHookAddress(IHooks self, uint24 fee) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`IHooks`|The hook to verify|
|`fee`|`uint24`|The fee of the pool the hook is used with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True if the hook address is valid|


### callHook

performs a hook call using the given calldata on the given hook that doesn't return a delta


```solidity
function callHook(IHooks self, bytes memory data) internal returns (bytes memory result);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`bytes`|The complete data returned by the hook|


### callHookWithReturnDelta

performs a hook call using the given calldata on the given hook


```solidity
function callHookWithReturnDelta(IHooks self, bytes memory data, bool parseReturn) internal returns (int256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|int256 The delta returned by the hook|


### noSelfCall

modifier to prevent calling a hook if they initiated the action


```solidity
modifier noSelfCall(IHooks self);
```

### beforeInitialize

calls beforeInitialize hook if permissioned and validates return value


```solidity
function beforeInitialize(IHooks self, PoolKey memory key, uint160 sqrtPriceX96) internal noSelfCall(self);
```

### afterInitialize

calls afterInitialize hook if permissioned and validates return value


```solidity
function afterInitialize(IHooks self, PoolKey memory key, uint160 sqrtPriceX96, int24 tick) internal noSelfCall(self);
```

### beforeModifyLiquidity

calls beforeModifyLiquidity hook if permissioned and validates return value


```solidity
function beforeModifyLiquidity(
    IHooks self,
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    bytes calldata hookData
) internal noSelfCall(self);
```

### afterModifyLiquidity

calls afterModifyLiquidity hook if permissioned and validates return value


```solidity
function afterModifyLiquidity(
    IHooks self,
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    BalanceDelta delta,
    BalanceDelta feesAccrued,
    bytes calldata hookData
) internal returns (BalanceDelta callerDelta, BalanceDelta hookDelta);
```

### beforeSwap

calls beforeSwap hook if permissioned and validates return value


```solidity
function beforeSwap(IHooks self, PoolKey memory key, IPoolManager.SwapParams memory params, bytes calldata hookData)
    internal
    returns (int256 amountToSwap, BeforeSwapDelta hookReturn, uint24 lpFeeOverride);
```

### afterSwap

calls afterSwap hook if permissioned and validates return value


```solidity
function afterSwap(
    IHooks self,
    PoolKey memory key,
    IPoolManager.SwapParams memory params,
    BalanceDelta swapDelta,
    bytes calldata hookData,
    BeforeSwapDelta beforeSwapHookReturn
) internal returns (BalanceDelta, BalanceDelta);
```

### beforeDonate

calls beforeDonate hook if permissioned and validates return value


```solidity
function beforeDonate(IHooks self, PoolKey memory key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    internal
    noSelfCall(self);
```

### afterDonate

calls afterDonate hook if permissioned and validates return value


```solidity
function afterDonate(IHooks self, PoolKey memory key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    internal
    noSelfCall(self);
```

### hasPermission


```solidity
function hasPermission(IHooks self, uint160 flag) internal pure returns (bool);
```

## Errors
### HookAddressNotValid
Thrown if the address will not lead to the specified hook calls being called


```solidity
error HookAddressNotValid(address hooks);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hooks`|`address`|The address of the hooks contract|

### InvalidHookResponse
Hook did not return its selector


```solidity
error InvalidHookResponse();
```

### HookCallFailed
Additional context for ERC-7751 wrapped error when a hook call fails


```solidity
error HookCallFailed();
```

### HookDeltaExceedsSwapAmount
The hook's delta changed the swap from exactIn to exactOut or vice versa


```solidity
error HookDeltaExceedsSwapAmount();
```

## Structs
### Permissions

```solidity
struct Permissions {
    bool beforeInitialize;
    bool afterInitialize;
    bool beforeAddLiquidity;
    bool afterAddLiquidity;
    bool beforeRemoveLiquidity;
    bool afterRemoveLiquidity;
    bool beforeSwap;
    bool afterSwap;
    bool beforeDonate;
    bool afterDonate;
    bool beforeSwapReturnDelta;
    bool afterSwapReturnDelta;
    bool afterAddLiquidityReturnDelta;
    bool afterRemoveLiquidityReturnDelta;
}
```

