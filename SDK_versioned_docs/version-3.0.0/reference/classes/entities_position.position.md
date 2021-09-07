[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/position](../modules/entities_position.md) / Position

# Class: Position

[entities/position](../modules/entities_position.md).Position

Represents a position on a Uniswap V3 Pool

## Table of contents

### Constructors

- [constructor](entities_position.Position.md#constructor)

### Properties

- [\_mintAmounts](entities_position.Position.md#_mintamounts)
- [\_token0Amount](entities_position.Position.md#_token0amount)
- [\_token1Amount](entities_position.Position.md#_token1amount)
- [liquidity](entities_position.Position.md#liquidity)
- [pool](entities_position.Position.md#pool)
- [tickLower](entities_position.Position.md#ticklower)
- [tickUpper](entities_position.Position.md#tickupper)

### Accessors

- [amount0](entities_position.Position.md#amount0)
- [amount1](entities_position.Position.md#amount1)
- [mintAmounts](entities_position.Position.md#mintamounts)
- [token0PriceLower](entities_position.Position.md#token0pricelower)
- [token0PriceUpper](entities_position.Position.md#token0priceupper)

### Methods

- [burnAmountsWithSlippage](entities_position.Position.md#burnamountswithslippage)
- [mintAmountsWithSlippage](entities_position.Position.md#mintamountswithslippage)
- [ratiosAfterSlippage](entities_position.Position.md#ratiosafterslippage)
- [fromAmount0](entities_position.Position.md#fromamount0)
- [fromAmount1](entities_position.Position.md#fromamount1)
- [fromAmounts](entities_position.Position.md#fromamounts)

## Constructors

### constructor

• **new Position**(`__namedParameters`)

Constructs a position for a given pool with the given liquidity

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `PositionConstructorArgs` |

#### Defined in

[entities/position.ts:40](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L40)

## Properties

### \_mintAmounts

• `Private` **\_mintAmounts**: ``null`` \| `Readonly`<`Object`\> = `null`

#### Defined in

[entities/position.ts:31](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L31)

___

### \_token0Amount

• `Private` **\_token0Amount**: ``null`` \| `CurrencyAmount`<`Token`\> = `null`

#### Defined in

[entities/position.ts:29](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L29)

___

### \_token1Amount

• `Private` **\_token1Amount**: ``null`` \| `CurrencyAmount`<`Token`\> = `null`

#### Defined in

[entities/position.ts:30](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L30)

___

### liquidity

• `Readonly` **liquidity**: `default`

#### Defined in

[entities/position.ts:26](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L26)

___

### pool

• `Readonly` **pool**: [`Pool`](entities_pool.Pool.md)

#### Defined in

[entities/position.ts:23](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L23)

___

### tickLower

• `Readonly` **tickLower**: `number`

#### Defined in

[entities/position.ts:24](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L24)

___

### tickUpper

• `Readonly` **tickUpper**: `number`

#### Defined in

[entities/position.ts:25](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L25)

## Accessors

### amount0

• `get` **amount0**(): `CurrencyAmount`<`Token`\>

Returns the amount of token0 that this position's liquidity could be burned for at the current pool price

#### Returns

`CurrencyAmount`<`Token`\>

#### Defined in

[entities/position.ts:68](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L68)

___

### amount1

• `get` **amount1**(): `CurrencyAmount`<`Token`\>

Returns the amount of token1 that this position's liquidity could be burned for at the current pool price

#### Returns

`CurrencyAmount`<`Token`\>

#### Defined in

[entities/position.ts:100](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L100)

___

### mintAmounts

• `get` **mintAmounts**(): `Readonly`<`Object`\>

Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
the current price for the pool

#### Returns

`Readonly`<`Object`\>

#### Defined in

[entities/position.ts:258](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L258)

___

### token0PriceLower

• `get` **token0PriceLower**(): `Price`<`Token`, `Token`\>

Returns the price of token0 at the lower tick

#### Returns

`Price`<`Token`, `Token`\>

#### Defined in

[entities/position.ts:54](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L54)

___

### token0PriceUpper

• `get` **token0PriceUpper**(): `Price`<`Token`, `Token`\>

Returns the price of token0 at the upper tick

#### Returns

`Price`<`Token`, `Token`\>

#### Defined in

[entities/position.ts:61](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L61)

## Methods

### burnAmountsWithSlippage

▸ **burnAmountsWithSlippage**(`slippageTolerance`): `Readonly`<`Object`\>

Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
position with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`<`Object`\>

The amounts, with slippage

#### Defined in

[entities/position.ts:213](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L213)

___

### mintAmountsWithSlippage

▸ **mintAmountsWithSlippage**(`slippageTolerance`): `Readonly`<`Object`\>

Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | Tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`<`Object`\>

The amounts, with slippage

#### Defined in

[entities/position.ts:157](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L157)

___

### ratiosAfterSlippage

▸ `Private` **ratiosAfterSlippage**(`slippageTolerance`): `Object`

Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | The amount by which the price can 'slip' before the transaction will revert |

#### Returns

`Object`

The sqrt ratios after slippage

| Name | Type |
| :------ | :------ |
| `sqrtRatioX96Lower` | `default` |
| `sqrtRatioX96Upper` | `default` |

#### Defined in

[entities/position.ts:134](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L134)

___

### fromAmount0

▸ `Static` **fromAmount0**(`__namedParameters`): [`Position`](entities_position.Position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.amount0` | `BigintIsh` | The desired amount of token0 |
| `__namedParameters.pool` | [`Pool`](entities_pool.Pool.md) | The pool for which the position is created |
| `__namedParameters.tickLower` | `number` | The lower tick |
| `__namedParameters.tickUpper` | `number` | The upper tick |
| `__namedParameters.useFullPrecision` | `boolean` | If true, liquidity will be maximized according to what the router can calculate, not what core can theoretically support |

#### Returns

[`Position`](entities_position.Position.md)

The position

#### Defined in

[entities/position.ts:354](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L354)

___

### fromAmount1

▸ `Static` **fromAmount1**(`__namedParameters`): [`Position`](entities_position.Position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.amount1` | `BigintIsh` | The desired amount of token1 |
| `__namedParameters.pool` | [`Pool`](entities_pool.Pool.md) | The pool for which the position is created |
| `__namedParameters.tickLower` | `number` | The lower tick |
| `__namedParameters.tickUpper` | `number` | The upper tick |

#### Returns

[`Position`](entities_position.Position.md)

The position

#### Defined in

[entities/position.ts:378](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L378)

___

### fromAmounts

▸ `Static` **fromAmounts**(`__namedParameters`): [`Position`](entities_position.Position.md)

Computes the maximum amount of liquidity received for a given amount of token0, token1,
and the prices at the tick boundaries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.amount0` | `BigintIsh` | token0 amount |
| `__namedParameters.amount1` | `BigintIsh` | token1 amount |
| `__namedParameters.pool` | [`Pool`](entities_pool.Pool.md) | The pool for which the position should be created |
| `__namedParameters.tickLower` | `number` | The lower tick of the position |
| `__namedParameters.tickUpper` | `number` | The upper tick of the position |
| `__namedParameters.useFullPrecision` | `boolean` | If false, liquidity will be maximized according to what the router can calculate, not what core can theoretically support |

#### Returns

[`Position`](entities_position.Position.md)

The amount of liquidity for the position

#### Defined in

[entities/position.ts:312](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/position.ts#L312)
