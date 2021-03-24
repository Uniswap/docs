These methods compose the pool's state, and can change with any frequency including multiple times
per transaction


## Functions
### slot0
```solidity
  function slot0(
  ) external returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)
```
The 0th storage slot in the pool stores many values, and is exposed as a single method to save gas
when accessed externally.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`sqrtPriceX96`|  | The current price of the pool as a sqrt(token1/token0) Q64.96 value
tick The current tick of the pool, i.e. according to the last tick transition that was run.
This value may not always be equal to SqrtTickMath.getTickAtSqrtRatio(sqrtPriceX96) if the price is on a tick
boundary.
observationIndex The index of the last oracle observation that was written,
observationCardinality The current maximum number of observations stored in the pool,
observationCardinalityNext The next maximum number of observations, to be updated when the observation.
index The index of the last element written to the observation array.
feeProtocol The protocol fee for both tokens of the pool.
Encoded as two 4 bit values, where the protocol fee of token1 is shifted 4 bits and the protocol fee of token0
is the lower 4 bits. Used as the denominator of a fraction of the swap fee, e.g. 4 means 1/4th of the swap fee.
unlocked Whether the pool is currently locked to reentrancy
### feeGrowthGlobal0X128
```solidity
  function feeGrowthGlobal0X128(
  ) external returns (uint256)
```
The fee growth as a Q128.128 fees of token0 collected per unit of liquidity for the entire life of the pool

This value can overflow the uint256


### feeGrowthGlobal1X128
```solidity
  function feeGrowthGlobal1X128(
  ) external returns (uint256)
```
The fee growth as a Q128.128 fees of token1 collected per unit of liquidity for the entire life of the pool

This value can overflow the uint256


### protocolFees
```solidity
  function protocolFees(
  ) external returns (uint128 token0, uint128 token1)
```
The amounts of token0 and token1 that are owed to the protocol

Protocol fees will never exceed uint128 max in either token


### liquidity
```solidity
  function liquidity(
  ) external returns (uint128)
```
The currently in range liquidity available to the pool

This value has no relationship to the total liquidity across all ticks


### ticks
```solidity
  function ticks(
    int24 tick
  ) external returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128)
```
Look up information about a specific tick in the pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tick` | int24 | The tick to look up

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`liquidityGross`| int24 | the total amount of position liquidity that uses the pool either as tick lower or
tick upper,
liquidityNet how much liquidity changes when the pool price crosses the tick,
feeGrowthOutside0X128 the fee growth on the other side of the tick from the current tick in token0,
feeGrowthOutside1X128 the fee growth on the other side of the tick from the current tick in token1,
feeGrowthOutsideX128 values can only be used if the tick is initialized,
i.e. if liquidityGross is greater than 0. In addition, these values are only relative and are used to
compute snapshots.
### tickBitmap
```solidity
  function tickBitmap(
  ) external returns (uint256)
```
Returns 256 packed tick initialized boolean values. See TickBitmap for more information



### secondsOutside
```solidity
  function secondsOutside(
  ) external returns (uint256)
```
Returns 8 packed tick seconds outside values. See SecondsOutside for more information



### positions
```solidity
  function positions(
    bytes32 key
  ) external returns (uint128 _liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)
```
Returns the information about a position by the position's key


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`key` | bytes32 | The position's key is a hash of a preimage composed by the owner, tickLower and tickUpper

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`_liquidity`| bytes32 | The amount of liquidity in the position,
Returns feeGrowthInside0LastX128 fee growth of token0 inside the tick range as of the last mint/burn/poke,
Returns feeGrowthInside1LastX128 fee growth of token1 inside the tick range as of the last mint/burn/poke,
Returns tokensOwed0 the computed amount of token0 owed to the position as of the last mint/burn/poke,
Returns tokensOwed1 the computed amount of token1 owed to the position as of the last mint/burn/poke
### observations
```solidity
  function observations(
    uint256 index
  ) external returns (uint32 blockTimestamp, int56 tickCumulative, uint160 liquidityCumulative, bool initialized)
```
Returns data about a specific observation index

You most likely want to use #observe() instead of this method to get an observation as of some amount of time
ago, rather than at a specific index in the array.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`index` | uint256 | The element of the observations array to fetch

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`blockTimestamp`| uint256 | The timestamp of the observation,
Returns tickCumulative the current tick multiplied by seconds elapsed for the life of the pool as of the
observation,
Returns liquidityCumulative the current liquidity multiplied by seconds elapsed for the life of the pool as of
the observation,
Returns initialized whether the observation has been initialized and the values are safe to use
