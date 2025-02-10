# StateView
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/lens/StateView.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md), [IStateView](contracts/v4/reference/periphery/interfaces/IStateView.md)

A view only contract wrapping the StateLibrary.sol library for reading storage in v4-core.

*The contract is intended for offchain clients. Use StateLibrary.sol directly if reading state onchain.*


## Functions
### constructor


```solidity
constructor(IPoolManager _poolManager) ImmutableState(_poolManager);
```

### getSlot0

Get Slot0 of the pool: sqrtPriceX96, tick, protocolFee, lpFee

*Corresponds to pools[poolId].slot0*


```solidity
function getSlot0(PoolId poolId)
    external
    view
    returns (uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|The square root of the price of the pool, in Q96 precision.|
|`tick`|`int24`|The current tick of the pool.|
|`protocolFee`|`uint24`|The protocol fee of the pool.|
|`lpFee`|`uint24`|The swap fee of the pool.|


### getTickInfo

Retrieves the tick information of a pool at a specific tick.

*Corresponds to pools[poolId].ticks[tick]*


```solidity
function getTickInfo(PoolId poolId, int24 tick)
    external
    view
    returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`tick`|`int24`|The tick to retrieve information for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidityGross`|`uint128`|The total position liquidity that references this tick|
|`liquidityNet`|`int128`|The amount of net liquidity added (subtracted) when tick is crossed from left to right (right to left)|
|`feeGrowthOutside0X128`|`uint256`|fee growth per unit of liquidity on the _other_ side of this tick (relative to the current tick)|
|`feeGrowthOutside1X128`|`uint256`|fee growth per unit of liquidity on the _other_ side of this tick (relative to the current tick)|


### getTickLiquidity

Retrieves the liquidity information of a pool at a specific tick.

*Corresponds to pools[poolId].ticks[tick].liquidityGross and pools[poolId].ticks[tick].liquidityNet. A more gas efficient version of getTickInfo*


```solidity
function getTickLiquidity(PoolId poolId, int24 tick)
    external
    view
    returns (uint128 liquidityGross, int128 liquidityNet);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`tick`|`int24`|The tick to retrieve liquidity for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidityGross`|`uint128`|The total position liquidity that references this tick|
|`liquidityNet`|`int128`|The amount of net liquidity added (subtracted) when tick is crossed from left to right (right to left)|


### getTickFeeGrowthOutside

Retrieves the fee growth outside a tick range of a pool

*Corresponds to pools[poolId].ticks[tick].feeGrowthOutside0X128 and pools[poolId].ticks[tick].feeGrowthOutside1X128. A more gas efficient version of getTickInfo*


```solidity
function getTickFeeGrowthOutside(PoolId poolId, int24 tick)
    external
    view
    returns (uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`tick`|`int24`|The tick to retrieve fee growth for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthOutside0X128`|`uint256`|fee growth per unit of liquidity on the _other_ side of this tick (relative to the current tick)|
|`feeGrowthOutside1X128`|`uint256`|fee growth per unit of liquidity on the _other_ side of this tick (relative to the current tick)|


### getFeeGrowthGlobals

Retrieves the global fee growth of a pool.

*Corresponds to pools[poolId].feeGrowthGlobal0X128 and pools[poolId].feeGrowthGlobal1X128*


```solidity
function getFeeGrowthGlobals(PoolId poolId)
    external
    view
    returns (uint256 feeGrowthGlobal0, uint256 feeGrowthGlobal1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthGlobal0`|`uint256`|The global fee growth for token0.|
|`feeGrowthGlobal1`|`uint256`|The global fee growth for token1.|


### getLiquidity

Retrieves the total liquidity of a pool.

*Corresponds to pools[poolId].liquidity*


```solidity
function getLiquidity(PoolId poolId) external view returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the pool.|


### getTickBitmap

Retrieves the tick bitmap of a pool at a specific tick.

*Corresponds to pools[poolId].tickBitmap[tick]*


```solidity
function getTickBitmap(PoolId poolId, int16 tick) external view returns (uint256 tickBitmap);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`tick`|`int16`|The tick to retrieve the bitmap for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickBitmap`|`uint256`|The bitmap of the tick.|


### getPositionInfo

Retrieves the position info without needing to calculate the `positionId`.

*Corresponds to pools[poolId].positions[positionId]*


```solidity
function getPositionInfo(PoolId poolId, address owner, int24 tickLower, int24 tickUpper, bytes32 salt)
    external
    view
    returns (uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`owner`|`address`|The owner of the liquidity position.|
|`tickLower`|`int24`|The lower tick of the liquidity range.|
|`tickUpper`|`int24`|The upper tick of the liquidity range.|
|`salt`|`bytes32`|The bytes32 randomness to further distinguish position state.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the position.|
|`feeGrowthInside0LastX128`|`uint256`|The fee growth inside the position for token0.|
|`feeGrowthInside1LastX128`|`uint256`|The fee growth inside the position for token1.|


### getPositionInfo

Retrieves the position info without needing to calculate the `positionId`.

*Corresponds to pools[poolId].positions[positionId]*


```solidity
function getPositionInfo(PoolId poolId, bytes32 positionId)
    external
    view
    returns (uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`positionId`|`bytes32`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the position.|
|`feeGrowthInside0LastX128`|`uint256`|The fee growth inside the position for token0.|
|`feeGrowthInside1LastX128`|`uint256`|The fee growth inside the position for token1.|


### getPositionLiquidity

Retrieves the liquidity of a position.

*Corresponds to pools[poolId].positions[positionId].liquidity. More gas efficient for just retrieving liquidity as compared to getPositionInfo*


```solidity
function getPositionLiquidity(PoolId poolId, bytes32 positionId) external view returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`positionId`|`bytes32`|The ID of the position.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the position.|


### getFeeGrowthInside

Calculate the fee growth inside a tick range of a pool

*pools[poolId].feeGrowthInside0LastX128 in Position.Info is cached and can become stale. This function will calculate the up to date feeGrowthInside*


```solidity
function getFeeGrowthInside(PoolId poolId, int24 tickLower, int24 tickUpper)
    external
    view
    returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolId`|`PoolId`|The ID of the pool.|
|`tickLower`|`int24`|The lower tick of the range.|
|`tickUpper`|`int24`|The upper tick of the range.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0X128`|`uint256`|The fee growth inside the tick range for token0.|
|`feeGrowthInside1X128`|`uint256`|The fee growth inside the tick range for token1.|


