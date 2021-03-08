These methods compose the pool's state, and can change with any frequency including multiple times
per transaction

## slot0
```solidity
  function slot0(
    
  ) external returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)
```
No description

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`sqrtPriceX96`|  | The current price of the pool as a sqrt(token1/token0) Q64.96 value
tick The current tick of the pool, i.e. according to the last tick transition that was run.
This value may not always be equal to SqrtTickMath.getTickAtSqrtRatio(sqrtPriceX96) if the price is on a tick
boundary.
observationIndex The index of the last oracle observation that was written,
observationCardinality The current maximum number of observations stored in the pool,
observationCardinalityNext The next maximum number of observations, to be updated when the observation,
index The last element of the observation array,
feeProtocol The fees collected by the protocol for the pool,
unlocked Whether the pool is currently locked to reentrancy
## feeGrowthGlobal0X128
```solidity
  function feeGrowthGlobal0X128(
    
  ) external returns (uint256)
```
This value can overflow the uint256


## feeGrowthGlobal1X128
```solidity
  function feeGrowthGlobal1X128(
    
  ) external returns (uint256)
```
This value can overflow the uint256


## protocolFees
```solidity
  function protocolFees(
    
  ) external returns (uint128 token0, uint128 token1)
```
Protocol fees will never exceed uint128 max in either token


## liquidity
```solidity
  function liquidity(
    
  ) external returns (uint128)
```
This value has no relationship to the total liquidity across all ticks


## ticks
```solidity
  function ticks(
    int24 tick
  ) external returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tick` |  | The tick to look up

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidityGross`|  | the total amount of position liquidity that uses the pool either as tick lower or
tick upper,
liquidityNet how much liquidity changes when the pool price crosses the tick,
feeGrowthOutside0X128 the fee growth on the other side of the tick from the current tick in token0,
feeGrowthOutside1X128 the fee growth on the other side of the tick from the current tick in token1,
feeGrowthOutsideX128 values can only be used if the tick is initialized,
i.e. if liquidityGross is greater than 0. In addition, these values are only relative and are used to
compute snapshots.
## tickBitmap
```solidity
  function tickBitmap(
    int16 wordPosition
  ) external returns (uint256)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`wordPosition` |  | the index of the word in the bitmap to fetch. The initialized booleans are packed into words
based on the tick and the pool's tick spacing

## secondsOutside
```solidity
  function secondsOutside(
    int24 wordPosition
  ) external returns (uint256)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`wordPosition` |  | The index of the word in the map to fetch. The seconds outside 32 bit values are packed into
words based on the tick and the pool's tick spacing

## positions
```solidity
  function positions(
    bytes32 key
  ) external returns (uint128 _liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` |  | The position's key is a hash of a preimage composed by the owner, tickLower and tickUpper

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`_liquidity`|  | The amount of liquidity in the position,
Returns feeGrowthInside0LastX128 fee growth of token0 inside the tick range as of the last mint/burn/poke,
Returns feeGrowthInside1LastX128 fee growth of token1 inside the tick range as of the last mint/burn/poke,
Returns tokensOwed0 the computed amount of token0 owed to the position as of the last mint/burn/poke,
Returns tokensOwed1 the computed amount of token1 owed to the position as of the last mint/burn/poke
## observations
```solidity
  function observations(
    uint256 index
  ) external returns (uint32 blockTimestamp, int56 tickCumulative, uint160 liquidityCumulative, bool initialized)
```
You most likely want to use #observe() instead of this method to get an observation as of some amount of time
ago, rather than at a specific index in the array.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`index` |  | The element of the observations array to fetch

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`blockTimestamp`|  | The timestamp of the observation,
Returns tickCumulative the current tick multiplied by seconds elapsed for the life of the pool as of the
observation,
Returns liquidityCumulative the current liquidity multiplied by seconds elapsed for the life of the pool as of
the observation,
Returns initialized whether the observation has been initialized and the values are safe to use
