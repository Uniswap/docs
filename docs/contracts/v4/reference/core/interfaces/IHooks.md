# IHooks
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/interfaces/IHooks.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

V4 decides whether to invoke specific hooks by inspecting the least significant bits
of the address that the hooks contract is deployed to.
For example, a hooks contract deployed to address: 0x0000000000000000000000000000000000002400
has the lowest bits '10 0100 0000 0000' which would cause the 'before initialize' and 'after add liquidity' hooks to be used.
See the Hooks library for the full spec.

*Should only be callable by the v4 PoolManager.*


## Functions
### beforeInitialize

The hook called before the state of a pool is initialized


```solidity
function beforeInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96) external returns (bytes4);
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


### afterInitialize

The hook called after the state of a pool is initialized


```solidity
function afterInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96, int24 tick)
    external
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


### beforeAddLiquidity

The hook called before liquidity is added


```solidity
function beforeAddLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external returns (bytes4);
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
) external returns (bytes4, BalanceDelta);
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


### beforeRemoveLiquidity

The hook called before liquidity is removed


```solidity
function beforeRemoveLiquidity(
    address sender,
    PoolKey calldata key,
    IPoolManager.ModifyLiquidityParams calldata params,
    bytes calldata hookData
) external returns (bytes4);
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
) external returns (bytes4, BalanceDelta);
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


### beforeSwap

The hook called before a swap


```solidity
function beforeSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    bytes calldata hookData
) external returns (bytes4, BeforeSwapDelta, uint24);
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


### afterSwap

The hook called after a swap


```solidity
function afterSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    BalanceDelta delta,
    bytes calldata hookData
) external returns (bytes4, int128);
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


### beforeDonate

The hook called before donate


```solidity
function beforeDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
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


### afterDonate

The hook called after donate


```solidity
function afterDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1, bytes calldata hookData)
    external
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


