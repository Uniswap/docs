Contains pool methods that can be called by anyone


## Functions
### initialize
```solidity
  function initialize(
    uint160 sqrtPriceX96
  ) external
```
Sets the initial price for the pool

Price is represented as a sqrt(amountToken1/amountToken0) Q64.96 value

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sqrtPriceX96` | uint160 | the initial sqrt price of the pool as a Q64.96

### mint
```solidity
  function mint(
    address recipient,
    int24 tickLower,
    int24 tickUpper,
    uint128 amount,
    bytes data
  ) external returns (uint256 amount0, uint256 amount1)
```
Adds liquidity for the given recipient/tickLower/tickUpper position

The caller of this method receives a callback in the form of IUniswapV3MintCallback#uniswapV3MintCallback
in which they must pay any token0 or token1 owed for the liquidity. The amount of token0/token1 due depends
on tickLower, tickUpper, the amount of liquidity, and the current price.

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
|`amount0`| uint256 | The amount of token0 that was paid to mint the given amount of liquidity. Matches the value in the callback
|`amount1`| uint256 | The amount of token1 that was paid to mint the given amount of liquidity. Matches the value in the callback
### collect
```solidity
  function collect(
    address recipient,
    int24 tickLower,
    int24 tickUpper,
    uint128 amount0Requested,
    uint128 amount1Requested
  ) external returns (uint128 amount0, uint128 amount1)
```
Collects tokens owed to a position

Does not recompute fees earned, which must be done either via mint or burn of any amount of liquidity.
Collect must be called by the position owner. To withdraw only token0 or only token1, amount0Requested or
amount1Requested may be set to zero. To withdraw all tokens owed, caller may pass any value greater than the
actual tokens owed, e.g. type(uint128).max. Tokens owed may be from accumulated swap fees or burned liquidity.

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
|`amount0`| uint128 | The amount of fees collected in token0
|`amount1`| uint128 | The amount of fees collected in token1
### burn
```solidity
  function burn(
    int24 tickLower,
    int24 tickUpper,
    uint128 amount
  ) external returns (uint256 amount0, uint256 amount1)
```
Burn liquidity from the sender and account tokens owed for the liquidity to the position

Can be used to trigger a recalculation of fees owed to a position by calling with an amount of 0
Fees must be collected separately via a call to #collect

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tickLower` | int24 | The lower tick of the position for which to burn liquidity
|`tickUpper` | int24 | The upper tick of the position for which to burn liquidity
|`amount` | uint128 | How much liquidity to burn

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| uint256 | The amount of token0 sent to the recipient
|`amount1`| uint256 | The amount of token1 sent to the recipient
### swap
```solidity
  function swap(
    address recipient,
    bool zeroForOne,
    int256 amountSpecified,
    uint160 sqrtPriceLimitX96,
    bytes data
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
|`amount0`| int256 | The delta of the balance of token0 of the pool, exact when negative, minimum when positive
|`amount1`| int256 | The delta of the balance of token1 of the pool, exact when negative, minimum when positive
### flash
```solidity
  function flash(
    address recipient,
    uint256 amount0,
    uint256 amount1,
    bytes data
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

