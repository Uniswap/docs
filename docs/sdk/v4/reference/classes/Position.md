[@uniswap/v4-sdk](../overview.md) / Position

Defined in: [entities/position.ts:23](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L23)

Represents a position on a Uniswap V4 Pool

## Dev

Similar to the V3 implementation
- using Currency instead of Token
- keep in mind that Pool and liquidity must be fetched from the pool manager

## Constructors

### new Position()

> **new Position**(`__namedParameters`): [`Position`](Position.md)

Defined in: [entities/position.ts:41](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L41)

Constructs a position for a given pool with the given liquidity

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `PositionConstructorArgs` |

#### Returns

[`Position`](Position.md)

## Properties

### liquidity

> `readonly` **liquidity**: `JSBI`

Defined in: [entities/position.ts:27](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L27)

***

### pool

> `readonly` **pool**: [`Pool`](Pool.md)

Defined in: [entities/position.ts:24](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L24)

***

### tickLower

> `readonly` **tickLower**: `number`

Defined in: [entities/position.ts:25](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L25)

***

### tickUpper

> `readonly` **tickUpper**: `number`

Defined in: [entities/position.ts:26](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L26)

## Accessors

### amount0

#### Get Signature

> **get** **amount0**(): `CurrencyAmount`<`Currency`>

Defined in: [entities/position.ts:69](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L69)

Returns the amount of token0 that this position's liquidity could be burned for at the current pool price

##### Returns

`CurrencyAmount`<`Currency`>

***

### amount1

#### Get Signature

> **get** **amount1**(): `CurrencyAmount`<`Currency`>

Defined in: [entities/position.ts:101](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L101)

Returns the amount of token1 that this position's liquidity could be burned for at the current pool price

##### Returns

`CurrencyAmount`<`Currency`>

***

### mintAmounts

#### Get Signature

> **get** **mintAmounts**(): `Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

Defined in: [entities/position.ts:272](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L272)

Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
the current price for the pool

##### Returns

`Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

***

### token0PriceLower

#### Get Signature

> **get** **token0PriceLower**(): `Price`<`Currency`, `Currency`>

Defined in: [entities/position.ts:55](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L55)

Returns the price of token0 at the lower tick

##### Returns

`Price`<`Currency`, `Currency`>

***

### token0PriceUpper

#### Get Signature

> **get** **token0PriceUpper**(): `Price`<`Currency`, `Currency`>

Defined in: [entities/position.ts:62](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L62)

Returns the price of token0 at the upper tick

##### Returns

`Price`<`Currency`, `Currency`>

## Methods

### burnAmountsWithSlippage()

> **burnAmountsWithSlippage**(`slippageTolerance`): `Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

Defined in: [entities/position.ts:223](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L223)

Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
position with the given slippage tolerance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

The amounts, with slippage

***

### fromAmount0()

> `static` **fromAmount0**(`__namedParameters`): [`Position`](Position.md)

Defined in: [entities/position.ts:402](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L402)

Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | { `amount0`: `BigintIsh`; `pool`: [`Pool`](Pool.md); `tickLower`: `number`; `tickUpper`: `number`; `useFullPrecision`: `boolean`; } |
| `__namedParameters.amount0` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |
| `__namedParameters.useFullPrecision` | `boolean` |

#### Returns

[`Position`](Position.md)

The position

***

### fromAmount1()

> `static` **fromAmount1**(`__namedParameters`): [`Position`](Position.md)

Defined in: [entities/position.ts:426](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L426)

Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | { `amount1`: `BigintIsh`; `pool`: [`Pool`](Pool.md); `tickLower`: `number`; `tickUpper`: `number`; } |
| `__namedParameters.amount1` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |

#### Returns

[`Position`](Position.md)

The position

***

### fromAmounts()

> `static` **fromAmounts**(`__namedParameters`): [`Position`](Position.md)

Defined in: [entities/position.ts:360](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L360)

Computes the maximum amount of liquidity received for a given amount of token0, token1,
and the prices at the tick boundaries.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | { `amount0`: `BigintIsh`; `amount1`: `BigintIsh`; `pool`: [`Pool`](Pool.md); `tickLower`: `number`; `tickUpper`: `number`; `useFullPrecision`: `boolean`; } |
| `__namedParameters.amount0` | `BigintIsh` |
| `__namedParameters.amount1` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |
| `__namedParameters.useFullPrecision` | `boolean` |

#### Returns

[`Position`](Position.md)

The amount of liquidity for the position

***

### mintAmountsWithSlippage()

> **mintAmountsWithSlippage**(`slippageTolerance`): `Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

Defined in: [entities/position.ts:159](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L159)

Returns the maximum amount of token0 and token1 that must be sent in order to safely mint the amount of liquidity held by the position
with the given slippage tolerance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | Tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`<{ `amount0`: `JSBI`; `amount1`: `JSBI`; }>

The amounts, with slippage

#### Dev

In v4, minting and increasing is protected by maximum amounts of token0 and token1.

***

### permitBatchData()

> **permitBatchData**(`slippageTolerance`, `spender`, `nonce`, `deadline`): [`AllowanceTransferPermitBatch`](../interfaces/AllowanceTransferPermitBatch.md)

Defined in: [entities/position.ts:321](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/position.ts#L321)

Returns the AllowanceTransferPermitBatch for adding liquidity to a position

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | The amount by which the price can 'slip' before the transaction will revert |
| `spender` | `string` | The spender of the permit (should usually be the PositionManager) |
| `nonce` | `BigintIsh` | A valid permit2 nonce |
| `deadline` | `BigintIsh` | The deadline for the permit |

#### Returns

[`AllowanceTransferPermitBatch`](../interfaces/AllowanceTransferPermitBatch.md)
