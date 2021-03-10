


## Functions
### _blockTimestamp
```solidity
  function _blockTimestamp(
    
  ) internal returns (uint32)
```

Returns the block timestamp truncated to 32 bits, i.e. mod 2**32. This method is overridden in tests.


### secondsInside
```solidity
  function secondsInside(
    int24 tickLower, int24 tickUpper
  ) external returns (uint32)
```
Returns a relative timestamp value representing how long, in seconds, the pool has spent between
tickLower and tickUpper

This timestamp is strictly relative. To get a useful elapsed time (i.e., duration) value, the value returned
by this method should be checkpointed externally after a position is minted, and again before a position is
burned. Thus the external contract must control the lifecycle of the position.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tickLower` | int24 | The lower tick of the range for which to get the seconds inside
|`tickUpper` | int24 | The upper tick of the range for which to get the seconds inside

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`A`| int24 | relative timestamp for how long the pool spent in the tick range
### observe
```solidity
  function observe(
    uint32[] secondsAgos
  ) external returns (int56[] tickCumulatives, uint160[] liquidityCumulatives)
```
Returns the cumulative tick and liquidity as of each timestamp `secondsAgo` from the current block timestamp

To get a time weighted average tick or liquidity-in-range, you must call this with two values, one representing
the beginning of the period and another for the end of the period. E.g., to get the last hour time-weighted average tick,
you must call it with secondsAgos = [3600, 0].
The time weighted average tick represents the geometric time weighted average price of the pool, in
log base sqrt(1.0001) of token1 / token0. The TickMath library can be used to go from a tick value to a ratio.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`secondsAgos` | uint32[] | From how long ago each cumulative tick and liquidity value should be returned

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`tickCumulatives`| uint32[] | Cumulative tick values as of each `secondsAgos` from the current block timestamp
|`liquidityCumulatives`|  | Cumulative liquidity-in-range value as of each `secondsAgos` from the current block
timestamp
### increaseObservationCardinalityNext
```solidity
  function increaseObservationCardinalityNext(
    uint16 observationCardinalityNext
  ) external
```
Increase the maximum number of price and liquidity observations that this pool will store

This method is no-op if the pool already has an observationCardinalityNext greater than or equal to
the input observationCardinalityNext.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`observationCardinalityNext` | uint16 | The desired minimum number of observations for the pool to store

### initialize
```solidity
  function initialize(
    uint160 sqrtPriceX96
  ) external
```
Sets the initial price for the pool

not locked because it initializes unlocked
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtPriceX96` | uint160 | the initial sqrt price of the pool as a Q64.96

### mint
```solidity
  function mint(
    address recipient, int24 tickLower, int24 tickUpper, uint128 amount, bytes data
  ) external returns (uint256 amount0, uint256 amount1)
```
Adds liquidity for the given recipient/tickLower/tickUpper position

noDelegateCall is applied indirectly via _modifyPosition
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address for which the liquidity will be created
|`tickLower` | int24 | The lower tick of the position in which to add liquidity
|`tickUpper` | int24 | The upper tick of the position in which to add liquidity
|`amount` | uint128 | The amount of liquidity to mint
|`data` | bytes | Any data that should be passed through to the callback

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| address | The amount of token0 that was paid to mint the given amount of liquidity. Matches the value in the callback
|`amount1`| int24 | The amount of token1 that was paid to mint the given amount of liquidity. Matches the value in the callback
### collect
```solidity
  function collect(
    address recipient, int24 tickLower, int24 tickUpper, uint128 amount0Requested, uint128 amount1Requested
  ) external returns (uint128 amount0, uint128 amount1)
```
Collects fees owed to a position

Does not recompute fees, which must be done either via mint, burn or poke. Must be called by the position
owner. To withdraw no fees for a token, amount0Requested or amount1Request may be set to zero. To withdraw all fees owed, caller may
pass any value greater than the fees owed.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address which should receive the fees collected
|`tickLower` | int24 | The lower tick of the position for which to collect fees
|`tickUpper` | int24 | The upper tick of the position for which to collect fees
|`amount0Requested` | uint128 | How much token0 should be withdrawn from the fees owed
|`amount1Requested` | uint128 | How much token1 should be withdrawn from the fees owed

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| address | The amount of fees collected in token0
|`amount1`| int24 | The amount of fees collected in token1
### burn
```solidity
  function burn(
    int24 tickLower, int24 tickUpper, uint128 amount
  ) external returns (uint256 amount0, uint256 amount1)
```
Burn liquidity from the sender and account tokens owed for the liquidity to the position

noDelegateCall is applied indirectly via _modifyPosition
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tickLower` | int24 | The lower tick of the position for which to burn liquidity
|`tickUpper` | int24 | The upper tick of the position for which to burn liquidity
|`amount` | uint128 | How much liquidity to burn

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| int24 | The amount of token0 sent to the recipient
|`amount1`| int24 | The amount of token1 sent to the recipient
### swap
```solidity
  function swap(
    address recipient, bool zeroForOne, int256 amountSpecified, uint160 sqrtPriceLimitX96, bytes data
  ) external returns (int256 amount0, int256 amount1)
```
Swap token0 for token1, or token1 for token0

The caller of this method receives a callback in the form of IUniswapV3SwapCallback#uniswapV3SwapCallback

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address to receive the output of the swap
|`zeroForOne` | bool | The direction of the swap, true for token0 to token1, false for token1 to token0
|`amountSpecified` | int256 | The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
|`sqrtPriceLimitX96` | uint160 | The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this
value after the swap. If one for zero, the price cannot be greater than this value after the swap
|`data` | bytes | Any data to be passed through to the callback

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| address | The delta of the balance of token0 of the pool, exact when negative, minimum when positive
|`amount1`| bool | The delta of the balance of token1 of the pool, exact when negative, minimum when positive
### flash
```solidity
  function flash(
    address recipient, uint256 amount0, uint256 amount1, bytes data
  ) external
```
Receive token0 and/or token1 and pay it back, plus a fee, in the callback

The caller of this method receives a callback in the form of IUniswapV3FlashCallback#uniswapV3FlashCallback
Can be used to donate underlying tokens pro-rata to currently in-range liquidity providers by calling
with 0 amount{0,1} and sending the donation amount(s) from the callback

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address which will receive the token0 and token1 amounts
|`amount0` | uint256 | The amount of token0 to send
|`amount1` | uint256 | The amount of token1 to send
|`data` | bytes | Any data to be passed through to the callback

### setFeeProtocol
```solidity
  function setFeeProtocol(
    uint8 feeProtocol0, uint8 feeProtocol1
  ) external
```
Set the denominator of the protocol's % share of the fees


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`feeProtocol0` | uint8 | new protocol fee for token0 of the pool
|`feeProtocol1` | uint8 | new protocol fee for token1 of the pool

### collectProtocol
```solidity
  function collectProtocol(
    address recipient, uint128 amount0Requested, uint128 amount1Requested
  ) external returns (uint128 amount0, uint128 amount1)
```
Collect the protocol fee accrued to the pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address to which collected protocol fees should be sent
|`amount0Requested` | uint128 | The maximum amount of token0 to send, can be 0 to collect fees in only token1
|`amount1Requested` | uint128 | The maximum amount of token1 to send, can be 0 to collect fees in only token0

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| address | The protocol fee collected in token0
|`amount1`| uint128 | The protocol fee collected in token1
