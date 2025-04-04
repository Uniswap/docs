# Pool
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/libraries/Pool.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

a library with all actions that can be performed on a pool


## Functions
### checkTicks

*Common checks for valid tick inputs.*


```solidity
function checkTicks(int24 tickLower, int24 tickUpper) private pure;
```

### initialize


```solidity
function initialize(State storage self, uint160 sqrtPriceX96, uint24 lpFee) internal returns (int24 tick);
```

### setProtocolFee


```solidity
function setProtocolFee(State storage self, uint24 protocolFee) internal;
```

### setLPFee

Only dynamic fee pools may update the lp fee.


```solidity
function setLPFee(State storage self, uint24 lpFee) internal;
```

### modifyLiquidity

Effect changes to a position in a pool

*PoolManager checks that the pool is initialized before calling*


```solidity
function modifyLiquidity(State storage self, ModifyLiquidityParams memory params)
    internal
    returns (BalanceDelta delta, BalanceDelta feeDelta);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`||
|`params`|`ModifyLiquidityParams`|the position details and the change to the position's liquidity to effect|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`delta`|`BalanceDelta`|the deltas of the token balances of the pool, from the liquidity change|
|`feeDelta`|`BalanceDelta`|the fees generated by the liquidity range|


### swap

Executes a swap against the state, and returns the amount deltas of the pool

*PoolManager checks that the pool is initialized before calling*


```solidity
function swap(State storage self, SwapParams memory params)
    internal
    returns (BalanceDelta swapDelta, uint256 amountToProtocol, uint24 swapFee, SwapResult memory result);
```

### donate

Donates the given amount of currency0 and currency1 to the pool


```solidity
function donate(State storage state, uint256 amount0, uint256 amount1) internal returns (BalanceDelta delta);
```

### getFeeGrowthInside

Retrieves fee growth data


```solidity
function getFeeGrowthInside(State storage self, int24 tickLower, int24 tickUpper)
    internal
    view
    returns (uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`|The Pool state struct|
|`tickLower`|`int24`|The lower tick boundary of the position|
|`tickUpper`|`int24`|The upper tick boundary of the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feeGrowthInside0X128`|`uint256`|The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries|
|`feeGrowthInside1X128`|`uint256`|The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries|


### updateTick

Updates a tick and returns true if the tick was flipped from initialized to uninitialized, or vice versa


```solidity
function updateTick(State storage self, int24 tick, int128 liquidityDelta, bool upper)
    internal
    returns (bool flipped, uint128 liquidityGrossAfter);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`|The mapping containing all tick information for initialized ticks|
|`tick`|`int24`|The tick that will be updated|
|`liquidityDelta`|`int128`|A new amount of liquidity to be added (subtracted) when tick is crossed from left to right (right to left)|
|`upper`|`bool`|true for updating a position's upper tick, or false for updating a position's lower tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`flipped`|`bool`|Whether the tick was flipped from initialized to uninitialized, or vice versa|
|`liquidityGrossAfter`|`uint128`|The total amount of liquidity for all positions that references the tick after the update|


### tickSpacingToMaxLiquidityPerTick

Derives max liquidity per tick from given tick spacing

*Executed when adding liquidity*


```solidity
function tickSpacingToMaxLiquidityPerTick(int24 tickSpacing) internal pure returns (uint128 result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickSpacing`|`int24`|The amount of required tick separation, realized in multiples of `tickSpacing` e.g., a tickSpacing of 3 requires ticks to be initialized every 3rd tick i.e., ..., -6, -3, 0, 3, 6, ...|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`uint128`|The max liquidity per tick|


### checkPoolInitialized

Reverts if the given pool has not been initialized


```solidity
function checkPoolInitialized(State storage self) internal view;
```

### clearTick

Clears tick data


```solidity
function clearTick(State storage self, int24 tick) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`|The mapping containing all initialized tick information for initialized ticks|
|`tick`|`int24`|The tick that will be cleared|


### crossTick

Transitions to next tick as needed by price movement


```solidity
function crossTick(State storage self, int24 tick, uint256 feeGrowthGlobal0X128, uint256 feeGrowthGlobal1X128)
    internal
    returns (int128 liquidityNet);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`|The Pool state struct|
|`tick`|`int24`|The destination tick of the transition|
|`feeGrowthGlobal0X128`|`uint256`|The all-time global fee growth, per unit of liquidity, in token0|
|`feeGrowthGlobal1X128`|`uint256`|The all-time global fee growth, per unit of liquidity, in token1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidityNet`|`int128`|The amount of liquidity added (subtracted) when tick is crossed from left to right (right to left)|


## Errors
### TicksMisordered
Thrown when tickLower is not below tickUpper


```solidity
error TicksMisordered(int24 tickLower, int24 tickUpper);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The invalid tickLower|
|`tickUpper`|`int24`|The invalid tickUpper|

### TickLowerOutOfBounds
Thrown when tickLower is less than min tick


```solidity
error TickLowerOutOfBounds(int24 tickLower);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The invalid tickLower|

### TickUpperOutOfBounds
Thrown when tickUpper exceeds max tick


```solidity
error TickUpperOutOfBounds(int24 tickUpper);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickUpper`|`int24`|The invalid tickUpper|

### TickLiquidityOverflow
For the tick spacing, the tick has too much liquidity


```solidity
error TickLiquidityOverflow(int24 tick);
```

### PoolAlreadyInitialized
Thrown when trying to initialize an already initialized pool


```solidity
error PoolAlreadyInitialized();
```

### PoolNotInitialized
Thrown when trying to interact with a non-initialized pool


```solidity
error PoolNotInitialized();
```

### PriceLimitAlreadyExceeded
Thrown when sqrtPriceLimitX96 on a swap has already exceeded its limit


```solidity
error PriceLimitAlreadyExceeded(uint160 sqrtPriceCurrentX96, uint160 sqrtPriceLimitX96);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceCurrentX96`|`uint160`|The invalid, already surpassed sqrtPriceLimitX96|
|`sqrtPriceLimitX96`|`uint160`|The surpassed price limit|

### PriceLimitOutOfBounds
Thrown when sqrtPriceLimitX96 lies outside of valid tick/price range


```solidity
error PriceLimitOutOfBounds(uint160 sqrtPriceLimitX96);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceLimitX96`|`uint160`|The invalid, out-of-bounds sqrtPriceLimitX96|

### NoLiquidityToReceiveFees
Thrown by donate if there is currently 0 liquidity, since the fees will not go to any liquidity providers


```solidity
error NoLiquidityToReceiveFees();
```

### InvalidFeeForExactOut
Thrown when trying to swap with max lp fee and specifying an output amount


```solidity
error InvalidFeeForExactOut();
```

## Structs
### TickInfo

```solidity
struct TickInfo {
    uint128 liquidityGross;
    int128 liquidityNet;
    uint256 feeGrowthOutside0X128;
    uint256 feeGrowthOutside1X128;
}
```

### State
The state of a pool

*Note that feeGrowthGlobal can be artificially inflated
For pools with a single liquidity position, actors can donate to themselves to freely inflate feeGrowthGlobal
atomically donating and collecting fees in the same unlockCallback may make the inflated value more extreme*


```solidity
struct State {
    Slot0 slot0;
    uint256 feeGrowthGlobal0X128;
    uint256 feeGrowthGlobal1X128;
    uint128 liquidity;
    mapping(int24 tick => TickInfo) ticks;
    mapping(int16 wordPos => uint256) tickBitmap;
    mapping(bytes32 positionKey => Position.State) positions;
}
```

### ModifyLiquidityParams

```solidity
struct ModifyLiquidityParams {
    address owner;
    int24 tickLower;
    int24 tickUpper;
    int128 liquidityDelta;
    int24 tickSpacing;
    bytes32 salt;
}
```

### ModifyLiquidityState

```solidity
struct ModifyLiquidityState {
    bool flippedLower;
    uint128 liquidityGrossAfterLower;
    bool flippedUpper;
    uint128 liquidityGrossAfterUpper;
}
```

### SwapResult

```solidity
struct SwapResult {
    uint160 sqrtPriceX96;
    int24 tick;
    uint128 liquidity;
}
```

### StepComputations

```solidity
struct StepComputations {
    uint160 sqrtPriceStartX96;
    int24 tickNext;
    bool initialized;
    uint160 sqrtPriceNextX96;
    uint256 amountIn;
    uint256 amountOut;
    uint256 feeAmount;
    uint256 feeGrowthGlobalX128;
}
```

### SwapParams

```solidity
struct SwapParams {
    int256 amountSpecified;
    int24 tickSpacing;
    bool zeroForOne;
    uint160 sqrtPriceLimitX96;
    uint24 lpFeeOverride;
}
```

