# StateLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/libraries/StateLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A helper library to provide state getters that use extsload


## State Variables
### POOLS_SLOT
index of pools mapping in the PoolManager


```solidity
bytes32 public constant POOLS_SLOT = bytes32(uint256(6));
```


### FEE_GROWTH_GLOBAL0_OFFSET
index of feeGrowthGlobal0X128 in Pool.State


```solidity
uint256 public constant FEE_GROWTH_GLOBAL0_OFFSET = 1;
```


### LIQUIDITY_OFFSET
index of liquidity in Pool.State


```solidity
uint256 public constant LIQUIDITY_OFFSET = 3;
```


### TICKS_OFFSET
index of TicksInfo mapping in Pool.State: mapping(int24 => TickInfo) ticks;


```solidity
uint256 public constant TICKS_OFFSET = 4;
```


### TICK_BITMAP_OFFSET
index of tickBitmap mapping in Pool.State


```solidity
uint256 public constant TICK_BITMAP_OFFSET = 5;
```


### POSITIONS_OFFSET
index of Position.State mapping in Pool.State: mapping(bytes32 => Position.State) positions;


```solidity
uint256 public constant POSITIONS_OFFSET = 6;
```


## Functions
### getSlot0

Get Slot0 of the pool: sqrtPriceX96, tick, protocolFee, lpFee

*Corresponds to pools[poolId].slot0*


```solidity
function getSlot0(IPoolManager manager, PoolId poolId)
    internal
    view
    returns (uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
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
function getTickInfo(IPoolManager manager, PoolId poolId, int24 tick)
    internal
    view
    returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
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
function getTickLiquidity(IPoolManager manager, PoolId poolId, int24 tick)
    internal
    view
    returns (uint128 liquidityGross, int128 liquidityNet);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
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
function getTickFeeGrowthOutside(IPoolManager manager, PoolId poolId, int24 tick)
    internal
    view
    returns (uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
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

*Note that feeGrowthGlobal can be artificially inflated
For pools with a single liquidity position, actors can donate to themselves to freely inflate feeGrowthGlobal
atomically donating and collecting fees in the same unlockCallback may make the inflated value more extreme*


```solidity
function getFeeGrowthGlobals(IPoolManager manager, PoolId poolId)
    internal
    view
    returns (uint256 feeGrowthGlobal0, uint256 feeGrowthGlobal1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthGlobal0`|`uint256`|The global fee growth for token0.|
|`feeGrowthGlobal1`|`uint256`|The global fee growth for token1.|


### getLiquidity

Retrieves total the liquidity of a pool.

*Corresponds to pools[poolId].liquidity*


```solidity
function getLiquidity(IPoolManager manager, PoolId poolId) internal view returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the pool.|


### getTickBitmap

Retrieves the tick bitmap of a pool at a specific tick.

*Corresponds to pools[poolId].tickBitmap[tick]*


```solidity
function getTickBitmap(IPoolManager manager, PoolId poolId, int16 tick) internal view returns (uint256 tickBitmap);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|
|`tick`|`int16`|The tick to retrieve the bitmap for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickBitmap`|`uint256`|The bitmap of the tick.|


### getPositionInfo

Retrieves the position information of a pool without needing to calculate the `positionId`.

*Corresponds to pools[poolId].positions[positionId]*


```solidity
function getPositionInfo(
    IPoolManager manager,
    PoolId poolId,
    address owner,
    int24 tickLower,
    int24 tickUpper,
    bytes32 salt
) internal view returns (uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`||
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

Retrieves the position information of a pool at a specific position ID.

*Corresponds to pools[poolId].positions[positionId]*


```solidity
function getPositionInfo(IPoolManager manager, PoolId poolId, bytes32 positionId)
    internal
    view
    returns (uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|
|`positionId`|`bytes32`|The ID of the position.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the position.|
|`feeGrowthInside0LastX128`|`uint256`|The fee growth inside the position for token0.|
|`feeGrowthInside1LastX128`|`uint256`|The fee growth inside the position for token1.|


### getPositionLiquidity

Retrieves the liquidity of a position.

*Corresponds to pools[poolId].positions[positionId].liquidity. More gas efficient for just retrieiving liquidity as compared to getPositionInfo*


```solidity
function getPositionLiquidity(IPoolManager manager, PoolId poolId, bytes32 positionId)
    internal
    view
    returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|
|`positionId`|`bytes32`|The ID of the position.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The liquidity of the position.|


### getFeeGrowthInside

Calculate the fee growth inside a tick range of a pool

*pools[poolId].feeGrowthInside0LastX128 in Position.State is cached and can become stale. This function will calculate the up to date feeGrowthInside*


```solidity
function getFeeGrowthInside(IPoolManager manager, PoolId poolId, int24 tickLower, int24 tickUpper)
    internal
    view
    returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|
|`poolId`|`PoolId`|The ID of the pool.|
|`tickLower`|`int24`|The lower tick of the range.|
|`tickUpper`|`int24`|The upper tick of the range.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0X128`|`uint256`|The fee growth inside the tick range for token0.|
|`feeGrowthInside1X128`|`uint256`|The fee growth inside the tick range for token1.|


### _getPoolStateSlot


```solidity
function _getPoolStateSlot(PoolId poolId) internal pure returns (bytes32);
```

### _getTickInfoSlot


```solidity
function _getTickInfoSlot(PoolId poolId, int24 tick) internal pure returns (bytes32);
```

### _getPositionInfoSlot


```solidity
function _getPositionInfoSlot(PoolId poolId, bytes32 positionId) internal pure returns (bytes32);
```

