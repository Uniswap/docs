[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / Position

# Class: Position

Represents a position on a Uniswap V3 Pool

## Table of contents

### Constructors

- [constructor](Position.md#constructor)

### Properties

- [\_mintAmounts](Position.md#_mintamounts)
- [\_token0Amount](Position.md#_token0amount)
- [\_token1Amount](Position.md#_token1amount)
- [liquidity](Position.md#liquidity)
- [pool](Position.md#pool)
- [tickLower](Position.md#ticklower)
- [tickUpper](Position.md#tickupper)

### Accessors

- [amount0](Position.md#amount0)
- [amount1](Position.md#amount1)
- [mintAmounts](Position.md#mintamounts)
- [token0PriceLower](Position.md#token0pricelower)
- [token0PriceUpper](Position.md#token0priceupper)

### Methods

- [burnAmountsWithSlippage](Position.md#burnamountswithslippage)
- [mintAmountsWithSlippage](Position.md#mintamountswithslippage)
- [ratiosAfterSlippage](Position.md#ratiosafterslippage)
- [fromAmount0](Position.md#fromamount0)
- [fromAmount1](Position.md#fromamount1)
- [fromAmounts](Position.md#fromamounts)

## Constructors

### constructor

• **new Position**(`__namedParameters`)

Constructs a position for a given pool with the given liquidity

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `PositionConstructorArgs` |

#### Defined in

[entities/position.ts:40](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L40)

## Properties

### \_mintAmounts

• `Private` **\_mintAmounts**: ``null`` \| `Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\\}\> = `null`

#### Defined in

[entities/position.ts:31](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L31)

___

### \_token0Amount

• `Private` **\_token0Amount**: ``null`` \| `CurrencyAmount`\<`Token`\> = `null`

#### Defined in

[entities/position.ts:29](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L29)

___

### \_token1Amount

• `Private` **\_token1Amount**: ``null`` \| `CurrencyAmount`\<`Token`\> = `null`

#### Defined in

[entities/position.ts:30](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L30)

___

### liquidity

• `Readonly` **liquidity**: `default`

#### Defined in

[entities/position.ts:26](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L26)

___

### pool

• `Readonly` **pool**: [`Pool`](Pool.md)

#### Defined in

[entities/position.ts:23](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L23)

___

### tickLower

• `Readonly` **tickLower**: `number`

#### Defined in

[entities/position.ts:24](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L24)

___

### tickUpper

• `Readonly` **tickUpper**: `number`

#### Defined in

[entities/position.ts:25](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L25)

## Accessors

### amount0

• `get` **amount0**(): `CurrencyAmount`\<`Token`\>

Returns the amount of token0 that this position's liquidity could be burned for at the current pool price

#### Returns

`CurrencyAmount`\<`Token`\>

#### Defined in

[entities/position.ts:68](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L68)

___

### amount1

• `get` **amount1**(): `CurrencyAmount`\<`Token`\>

Returns the amount of token1 that this position's liquidity could be burned for at the current pool price

#### Returns

`CurrencyAmount`\<`Token`\>

#### Defined in

[entities/position.ts:100](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L100)

___

### mintAmounts

• `get` **mintAmounts**(): `Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
the current price for the pool

#### Returns

`Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

#### Defined in

[entities/position.ts:258](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L258)

___

### token0PriceLower

• `get` **token0PriceLower**(): `Price`\<`Token`, `Token`\>

Returns the price of token0 at the lower tick

#### Returns

`Price`\<`Token`, `Token`\>

#### Defined in

[entities/position.ts:54](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L54)

___

### token0PriceUpper

• `get` **token0PriceUpper**(): `Price`\<`Token`, `Token`\>

Returns the price of token0 at the upper tick

#### Returns

`Price`\<`Token`, `Token`\>

#### Defined in

[entities/position.ts:61](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L61)

## Methods

### burnAmountsWithSlippage

▸ **burnAmountsWithSlippage**(`slippageTolerance`): `Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
position with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

The amounts, with slippage

#### Defined in

[entities/position.ts:213](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L213)

___

### mintAmountsWithSlippage

▸ **mintAmountsWithSlippage**(`slippageTolerance`): `Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
with the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | Tolerance of unfavorable slippage from the current price |

#### Returns

`Readonly`\<\{ `amount0`: `default` ; `amount1`: `default`  \\}\>

The amounts, with slippage

#### Defined in

[entities/position.ts:157](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L157)

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

[entities/position.ts:134](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L134)

___

### fromAmount0

▸ `Static` **fromAmount0**(`__namedParameters`): [`Position`](Position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.amount0` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |
| `__namedParameters.useFullPrecision` | `boolean` |

#### Returns

[`Position`](Position.md)

The position

#### Defined in

[entities/position.ts:354](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L354)

___

### fromAmount1

▸ `Static` **fromAmount1**(`__namedParameters`): [`Position`](Position.md)

Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.amount1` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |

#### Returns

[`Position`](Position.md)

The position

#### Defined in

[entities/position.ts:378](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L378)

___

### fromAmounts

▸ `Static` **fromAmounts**(`__namedParameters`): [`Position`](Position.md)

Computes the maximum amount of liquidity received for a given amount of token0, token1,
and the prices at the tick boundaries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.amount0` | `BigintIsh` |
| `__namedParameters.amount1` | `BigintIsh` |
| `__namedParameters.pool` | [`Pool`](Pool.md) |
| `__namedParameters.tickLower` | `number` |
| `__namedParameters.tickUpper` | `number` |
| `__namedParameters.useFullPrecision` | `boolean` |

#### Returns

[`Position`](Position.md)

The amount of liquidity for the position

#### Defined in

[entities/position.ts:312](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L312)
