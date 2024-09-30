# SqrtPriceMath
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/SqrtPriceMath.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Contains the math that uses square root of price as a Q64.96 and liquidity to compute deltas


## Functions
### getNextSqrtPriceFromAmount0RoundingUp

Gets the next sqrt price given a delta of currency0

*Always rounds up, because in the exact output case (increasing price) we need to move the price at least
far enough to get the desired output amount, and in the exact input case (decreasing price) we need to move the
price less in order to not send too much output.
The most precise formula for this is liquidity * sqrtPX96 / (liquidity +- amount * sqrtPX96),
if this is impossible because of overflow, we calculate liquidity / (liquidity / sqrtPX96 +- amount).*


```solidity
function getNextSqrtPriceFromAmount0RoundingUp(uint160 sqrtPX96, uint128 liquidity, uint256 amount, bool add)
    internal
    pure
    returns (uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPX96`|`uint160`|The starting price, i.e. before accounting for the currency0 delta|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`amount`|`uint256`|How much of currency0 to add or remove from virtual reserves|
|`add`|`bool`|Whether to add or remove the amount of currency0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint160`|The price after adding or removing amount, depending on add|


### getNextSqrtPriceFromAmount1RoundingDown

Gets the next sqrt price given a delta of currency1

*Always rounds down, because in the exact output case (decreasing price) we need to move the price at least
far enough to get the desired output amount, and in the exact input case (increasing price) we need to move the
price less in order to not send too much output.
The formula we compute is within <1 wei of the lossless version: sqrtPX96 +- amount / liquidity*


```solidity
function getNextSqrtPriceFromAmount1RoundingDown(uint160 sqrtPX96, uint128 liquidity, uint256 amount, bool add)
    internal
    pure
    returns (uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPX96`|`uint160`|The starting price, i.e., before accounting for the currency1 delta|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`amount`|`uint256`|How much of currency1 to add, or remove, from virtual reserves|
|`add`|`bool`|Whether to add, or remove, the amount of currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint160`|The price after adding or removing `amount`|


### getNextSqrtPriceFromInput

Gets the next sqrt price given an input amount of currency0 or currency1

*Throws if price or liquidity are 0, or if the next price is out of bounds*


```solidity
function getNextSqrtPriceFromInput(uint160 sqrtPX96, uint128 liquidity, uint256 amountIn, bool zeroForOne)
    internal
    pure
    returns (uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPX96`|`uint160`|The starting price, i.e., before accounting for the input amount|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`amountIn`|`uint256`|How much of currency0, or currency1, is being swapped in|
|`zeroForOne`|`bool`|Whether the amount in is currency0 or currency1|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint160`|uint160 The price after adding the input amount to currency0 or currency1|


### getNextSqrtPriceFromOutput

Gets the next sqrt price given an output amount of currency0 or currency1

*Throws if price or liquidity are 0 or the next price is out of bounds*


```solidity
function getNextSqrtPriceFromOutput(uint160 sqrtPX96, uint128 liquidity, uint256 amountOut, bool zeroForOne)
    internal
    pure
    returns (uint160);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPX96`|`uint160`|The starting price before accounting for the output amount|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`amountOut`|`uint256`|How much of currency0, or currency1, is being swapped out|
|`zeroForOne`|`bool`|Whether the amount out is currency1 or currency0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint160`|uint160 The price after removing the output amount of currency0 or currency1|


### getAmount0Delta

Gets the amount0 delta between two prices

*Calculates liquidity / sqrt(lower) - liquidity / sqrt(upper),
i.e. liquidity * (sqrt(upper) - sqrt(lower)) / (sqrt(upper) * sqrt(lower))*


```solidity
function getAmount0Delta(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, uint128 liquidity, bool roundUp)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price|
|`sqrtPriceBX96`|`uint160`|Another sqrt price|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`roundUp`|`bool`|Whether to round the amount up or down|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of currency0 required to cover a position of size liquidity between the two passed prices|


### absDiff

Equivalent to: `a >= b ? a - b : b - a`


```solidity
function absDiff(uint160 a, uint160 b) internal pure returns (uint256 res);
```

### getAmount1Delta

Gets the amount1 delta between two prices

*Calculates liquidity * (sqrt(upper) - sqrt(lower))*


```solidity
function getAmount1Delta(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, uint128 liquidity, bool roundUp)
    internal
    pure
    returns (uint256 amount1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price|
|`sqrtPriceBX96`|`uint160`|Another sqrt price|
|`liquidity`|`uint128`|The amount of usable liquidity|
|`roundUp`|`bool`|Whether to round the amount up, or down|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount1`|`uint256`|Amount of currency1 required to cover a position of size liquidity between the two passed prices|


### getAmount0Delta

Equivalent to:
amount1 = roundUp
? FullMath.mulDivRoundingUp(liquidity, sqrtPriceBX96 - sqrtPriceAX96, FixedPoint96.Q96)
: FullMath.mulDiv(liquidity, sqrtPriceBX96 - sqrtPriceAX96, FixedPoint96.Q96);
Cannot overflow because `type(uint128).max * type(uint160).max >> 96 < (1 << 192)`.

Helper that gets signed currency0 delta


```solidity
function getAmount0Delta(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, int128 liquidity)
    internal
    pure
    returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price|
|`sqrtPriceBX96`|`uint160`|Another sqrt price|
|`liquidity`|`int128`|The change in liquidity for which to compute the amount0 delta|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|int256 Amount of currency0 corresponding to the passed liquidityDelta between the two prices|


### getAmount1Delta

Helper that gets signed currency1 delta


```solidity
function getAmount1Delta(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, int128 liquidity)
    internal
    pure
    returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price|
|`sqrtPriceBX96`|`uint160`|Another sqrt price|
|`liquidity`|`int128`|The change in liquidity for which to compute the amount1 delta|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|int256 Amount of currency1 corresponding to the passed liquidityDelta between the two prices|


## Errors
### InvalidPriceOrLiquidity

```solidity
error InvalidPriceOrLiquidity();
```

### InvalidPrice

```solidity
error InvalidPrice();
```

### NotEnoughLiquidity

```solidity
error NotEnoughLiquidity();
```

### PriceOverflow

```solidity
error PriceOverflow();
```

