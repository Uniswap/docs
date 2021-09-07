[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/pool](../modules/entities_pool.md) / Pool

# Class: Pool

[entities/pool](../modules/entities_pool.md).Pool

Represents a V3 pool

## Table of contents

### Constructors

- [constructor](entities_pool.Pool.md#constructor)

### Properties

- [\_token0Price](entities_pool.Pool.md#_token0price)
- [\_token1Price](entities_pool.Pool.md#_token1price)
- [fee](entities_pool.Pool.md#fee)
- [liquidity](entities_pool.Pool.md#liquidity)
- [sqrtRatioX96](entities_pool.Pool.md#sqrtratiox96)
- [tickCurrent](entities_pool.Pool.md#tickcurrent)
- [tickDataProvider](entities_pool.Pool.md#tickdataprovider)
- [token0](entities_pool.Pool.md#token0)
- [token1](entities_pool.Pool.md#token1)

### Accessors

- [chainId](entities_pool.Pool.md#chainid)
- [tickSpacing](entities_pool.Pool.md#tickspacing)
- [token0Price](entities_pool.Pool.md#token0price)
- [token1Price](entities_pool.Pool.md#token1price)

### Methods

- [getInputAmount](entities_pool.Pool.md#getinputamount)
- [getOutputAmount](entities_pool.Pool.md#getoutputamount)
- [involvesToken](entities_pool.Pool.md#involvestoken)
- [priceOf](entities_pool.Pool.md#priceof)
- [swap](entities_pool.Pool.md#swap)
- [getAddress](entities_pool.Pool.md#getaddress)

## Constructors

### constructor

• **new Pool**(`tokenA`, `tokenB`, `fee`, `sqrtRatioX96`, `liquidity`, `tickCurrent`, `ticks?`)

Construct a pool

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenA` | `Token` | One of the tokens in the pool |
| `tokenB` | `Token` | The other token in the pool |
| `fee` | [`FeeAmount`](../enums/constants.FeeAmount.md) | The fee in hundredths of a bips of the input amount of every swap that is collected by the pool |
| `sqrtRatioX96` | `BigintIsh` | The sqrt of the current ratio of amounts of token1 to token0 |
| `liquidity` | `BigintIsh` | The current value of in range liquidity |
| `tickCurrent` | `number` | The current tick of the pool |
| `ticks` | [`TickDataProvider`](../interfaces/entities_tickDataProvider.TickDataProvider.md) \| ([`Tick`](entities_tick.Tick.md) \| [`TickConstructorArgs`](../interfaces/entities_tick.TickConstructorArgs.md))[] | The current state of the pool ticks or a data provider that can return tick data |

#### Defined in

[entities/pool.ts:58](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L58)

## Properties

### \_token0Price

• `Private` `Optional` **\_token0Price**: `Price`<`Token`, `Token`\>

#### Defined in

[entities/pool.ts:41](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L41)

___

### \_token1Price

• `Private` `Optional` **\_token1Price**: `Price`<`Token`, `Token`\>

#### Defined in

[entities/pool.ts:42](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L42)

___

### fee

• `Readonly` **fee**: [`FeeAmount`](../enums/constants.FeeAmount.md)

#### Defined in

[entities/pool.ts:35](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L35)

___

### liquidity

• `Readonly` **liquidity**: `default`

#### Defined in

[entities/pool.ts:37](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L37)

___

### sqrtRatioX96

• `Readonly` **sqrtRatioX96**: `default`

#### Defined in

[entities/pool.ts:36](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L36)

___

### tickCurrent

• `Readonly` **tickCurrent**: `number`

#### Defined in

[entities/pool.ts:38](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L38)

___

### tickDataProvider

• `Readonly` **tickDataProvider**: [`TickDataProvider`](../interfaces/entities_tickDataProvider.TickDataProvider.md)

#### Defined in

[entities/pool.ts:39](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L39)

___

### token0

• `Readonly` **token0**: `Token`

#### Defined in

[entities/pool.ts:33](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L33)

___

### token1

• `Readonly` **token1**: `Token`

#### Defined in

[entities/pool.ts:34](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L34)

## Accessors

### chainId

• `get` **chainId**(): `number`

Returns the chain ID of the tokens in the pool.

#### Returns

`number`

#### Defined in

[entities/pool.ts:137](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L137)

___

### tickSpacing

• `get` **tickSpacing**(): `number`

#### Returns

`number`

#### Defined in

[entities/pool.ts:304](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L304)

___

### token0Price

• `get` **token0Price**(): `Price`<`Token`, `Token`\>

Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0

#### Returns

`Price`<`Token`, `Token`\>

#### Defined in

[entities/pool.ts:97](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L97)

___

### token1Price

• `get` **token1Price**(): `Price`<`Token`, `Token`\>

Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1

#### Returns

`Price`<`Token`, `Token`\>

#### Defined in

[entities/pool.ts:112](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L112)

## Methods

### getInputAmount

▸ **getInputAmount**(`outputAmount`, `sqrtPriceLimitX96?`): `Promise`<[`CurrencyAmount`<`Token`\>, [`Pool`](entities_pool.Pool.md)]\>

Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputAmount` | `CurrencyAmount`<`Token`\> | the output amount for which to quote the input amount |
| `sqrtPriceLimitX96?` | `default` | The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap |

#### Returns

`Promise`<[`CurrencyAmount`<`Token`\>, [`Pool`](entities_pool.Pool.md)]\>

The input amount and the pool with updated state

#### Defined in

[entities/pool.ts:173](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L173)

___

### getOutputAmount

▸ **getOutputAmount**(`inputAmount`, `sqrtPriceLimitX96?`): `Promise`<[`CurrencyAmount`<`Token`\>, [`Pool`](entities_pool.Pool.md)]\>

Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputAmount` | `CurrencyAmount`<`Token`\> | The input amount for which to quote the output amount |
| `sqrtPriceLimitX96?` | `default` | The Q64.96 sqrt price limit |

#### Returns

`Promise`<[`CurrencyAmount`<`Token`\>, [`Pool`](entities_pool.Pool.md)]\>

The output amount and the pool with updated state

#### Defined in

[entities/pool.ts:147](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L147)

___

### involvesToken

▸ **involvesToken**(`token`): `boolean`

Returns true if the token is either token0 or token1

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Token` | The token to check |

#### Returns

`boolean`

True if token is either token0 or token

#### Defined in

[entities/pool.ts:90](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L90)

___

### priceOf

▸ **priceOf**(`token`): `Price`<`Token`, `Token`\>

Return the price of the given token in terms of the other token in the pool.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Token` | The token to return price of |

#### Returns

`Price`<`Token`, `Token`\>

The price of the given token, in terms of the other.

#### Defined in

[entities/pool.ts:129](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L129)

___

### swap

▸ `Private` **swap**(`zeroForOne`, `amountSpecified`, `sqrtPriceLimitX96?`): `Promise`<`Object`\>

Executes a swap

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `zeroForOne` | `boolean` | Whether the amount in is token0 or token1 |
| `amountSpecified` | `default` | The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative) |
| `sqrtPriceLimitX96?` | `default` | The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap |

#### Returns

`Promise`<`Object`\>

amountCalculated

#### Defined in

[entities/pool.ts:203](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L203)

___

### getAddress

▸ `Static` **getAddress**(`tokenA`, `tokenB`, `fee`, `initCodeHashManualOverride?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenA` | `Token` |
| `tokenB` | `Token` |
| `fee` | [`FeeAmount`](../enums/constants.FeeAmount.md) |
| `initCodeHashManualOverride?` | `string` |

#### Returns

`string`

#### Defined in

[entities/pool.ts:44](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/pool.ts#L44)
