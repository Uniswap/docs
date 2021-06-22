---
id: Position
title: Position
---

# Position

Represents a position on a Uniswap V3 Pool

## Constructors

### constructor

\+ **new Position**(`__namedParameters`: PositionConstructorArgs): [*Position*](entities_position.position.md)

Constructs a position for a given pool with the given liquidity

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | PositionConstructorArgs |

**Returns:** [*Position*](entities_position.position.md)

Defined in: [entities/position.ts:31](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L31)

## Properties

### liquidity

• `Readonly` **liquidity**: *default*

Defined in: [entities/position.ts:26](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L26)

___

### pool

• `Readonly` **pool**: [*Pool*](entities_pool.pool.md)

Defined in: [entities/position.ts:23](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L23)

___

### tickLower

• `Readonly` **tickLower**: *number*

Defined in: [entities/position.ts:24](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L24)

___

### tickUpper

• `Readonly` **tickUpper**: *number*

Defined in: [entities/position.ts:25](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L25)

## Accessors

### amount0

• get **amount0**(): *CurrencyAmount*<Token\>

Returns the amount of token0 that this position's liquidity could be burned for at the current pool price

**Returns:** *CurrencyAmount*<Token\>

Defined in: [entities/position.ts:68](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L68)

___

### amount1

• get **amount1**(): *CurrencyAmount*<Token\>

Returns the amount of token1 that this position's liquidity could be burned for at the current pool price

**Returns:** *CurrencyAmount*<Token\>

Defined in: [entities/position.ts:100](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L100)

___

### mintAmounts

• get **mintAmounts**(): *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
the current price for the pool

**Returns:** *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Defined in: [entities/position.ts:240](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L240)

___

### token0PriceLower

• get **token0PriceLower**(): *Price*<Token, Token\>

Returns the price of token0 at the lower tick

**Returns:** *Price*<Token, Token\>

Defined in: [entities/position.ts:54](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L54)

___

### token0PriceUpper

• get **token0PriceUpper**(): *Price*<Token, Token\>

Returns the price of token0 at the upper tick

**Returns:** *Price*<Token, Token\>

Defined in: [entities/position.ts:61](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L61)

## Methods

### burnAmountsWithSlippage

▸ **burnAmountsWithSlippage**(`slippageTolerance`: *Percent*): *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
position with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | *Percent* | tolerance of unfavorable slippage from the current price |

**Returns:** *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Defined in: [entities/position.ts:192](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L192)

___

### mintAmountsWithSlippage

▸ **mintAmountsWithSlippage**(`slippageTolerance`: *Percent*): *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | *Percent* | tolerance of unfavorable slippage from the current price |

**Returns:** *Readonly*<{ `amount0`: *default* ; `amount1`: *default*  }\>

Defined in: [entities/position.ts:134](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L134)

___

### fromAmount0

▸ `Static` **fromAmount0**(`__namedParameters`: { `amount0`: BigintIsh ; `pool`: [*Pool*](entities_pool.pool.md) ; `tickLower`: *number* ; `tickUpper`: *number* ; `useFullPrecision`: *boolean*  }): [*Position*](entities_position.position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | *object* | - |
| `__namedParameters.amount0` | BigintIsh | the desired amount of token0 |
| `__namedParameters.pool` | [*Pool*](entities_pool.pool.md) | the pool for which the position is created |
| `__namedParameters.tickLower` | *number* | the lower tick |
| `__namedParameters.tickUpper` | *number* | the upper tick |
| `__namedParameters.useFullPrecision` | *boolean* | if true, liquidity will be maximized according to what the router can calculate, not what core can theoretically support |

**Returns:** [*Position*](entities_position.position.md)

Defined in: [entities/position.ts:334](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L334)

___

### fromAmount1

▸ `Static` **fromAmount1**(`__namedParameters`: { `amount1`: BigintIsh ; `pool`: [*Pool*](entities_pool.pool.md) ; `tickLower`: *number* ; `tickUpper`: *number*  }): [*Position*](entities_position.position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | *object* | - |
| `__namedParameters.amount1` | BigintIsh | the desired amount of token1 |
| `__namedParameters.pool` | [*Pool*](entities_pool.pool.md) | the pool for which the position is created |
| `__namedParameters.tickLower` | *number* | the lower tick |
| `__namedParameters.tickUpper` | *number* | the upper tick |

**Returns:** [*Position*](entities_position.position.md)

Defined in: [entities/position.ts:357](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L357)

___

### fromAmounts

▸ `Static` **fromAmounts**(`__namedParameters`: { `amount0`: BigintIsh ; `amount1`: BigintIsh ; `pool`: [*Pool*](entities_pool.pool.md) ; `tickLower`: *number* ; `tickUpper`: *number* ; `useFullPrecision`: *boolean*  }): [*Position*](entities_position.position.md)

Computes the maximum amount of liquidity received for a given amount of token0, token1,
and the prices at the tick boundaries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | *object* | - |
| `__namedParameters.amount0` | BigintIsh | token0 amount |
| `__namedParameters.amount1` | BigintIsh | token1 amount |
| `__namedParameters.pool` | [*Pool*](entities_pool.pool.md) | the pool for which the position should be created |
| `__namedParameters.tickLower` | *number* | the lower tick of the position |
| `__namedParameters.tickUpper` | *number* | the upper tick of the position |
| `__namedParameters.useFullPrecision` | *boolean* | if false, liquidity will be maximized according to what the router can calculate, not what core can theoretically support |

**Returns:** [*Position*](entities_position.position.md)

Defined in: [entities/position.ts:293](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/position.ts#L293)
