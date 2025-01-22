[@uniswap/v4-sdk](../overview.md) / Pool

# Class: Pool

Defined in: [entities/pool.ts:33](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L33)

Represents a V4 pool

## Constructors

### new Pool()

> **new Pool**(`currencyA`, `currencyB`, `fee`, `tickSpacing`, `hooks`, `sqrtRatioX96`, `liquidity`, `tickCurrent`, `ticks`): [`Pool`](Pool.md)

Defined in: [entities/pool.ts:103](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L103)

Construct a pool

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `currencyA` | `Currency` | `undefined` | One of the currencys in the pool |
| `currencyB` | `Currency` | `undefined` | The other currency in the pool |
| `fee` | `number` | `undefined` | The fee in hundredths of a bips of the input amount of every swap that is collected by the pool |
| `tickSpacing` | `number` | `undefined` | The tickSpacing of the pool |
| `hooks` | `string` | `undefined` | The address of the hook contract |
| `sqrtRatioX96` | `BigintIsh` | `undefined` | The sqrt of the current ratio of amounts of currency1 to currency0 |
| `liquidity` | `BigintIsh` | `undefined` | The current value of in range liquidity |
| `tickCurrent` | `number` | `undefined` | The current tick of the pool |
| `ticks` | `TickDataProvider` \| (`Tick` \| `TickConstructorArgs`)[] | `NO_TICK_DATA_PROVIDER_DEFAULT` | - |

#### Returns

[`Pool`](Pool.md)

## Properties

### currency0

> `readonly` **currency0**: `Currency`

Defined in: [entities/pool.ts:34](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L34)

***

### currency1

> `readonly` **currency1**: `Currency`

Defined in: [entities/pool.ts:35](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L35)

***

### fee

> `readonly` **fee**: `number`

Defined in: [entities/pool.ts:36](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L36)

***

### hooks

> `readonly` **hooks**: `string`

Defined in: [entities/pool.ts:39](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L39)

***

### liquidity

> `readonly` **liquidity**: `JSBI`

Defined in: [entities/pool.ts:40](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L40)

***

### poolId

> `readonly` **poolId**: `string`

Defined in: [entities/pool.ts:44](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L44)

***

### poolKey

> `readonly` **poolKey**: [`PoolKey`](../overview.md#poolkey)

Defined in: [entities/pool.ts:43](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L43)

***

### sqrtRatioX96

> `readonly` **sqrtRatioX96**: `JSBI`

Defined in: [entities/pool.ts:38](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L38)

***

### tickCurrent

> `readonly` **tickCurrent**: `number`

Defined in: [entities/pool.ts:41](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L41)

***

### tickDataProvider

> `readonly` **tickDataProvider**: `TickDataProvider`

Defined in: [entities/pool.ts:42](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L42)

***

### tickSpacing

> `readonly` **tickSpacing**: `number`

Defined in: [entities/pool.ts:37](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L37)

## Accessors

### chainId

#### Get Signature

> **get** **chainId**(): `number`

Defined in: [entities/pool.ts:214](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L214)

Returns the chain ID of the currencies in the pool.

##### Returns

`number`

***

### currency0Price

#### Get Signature

> **get** **currency0Price**(): `Price`\<`Currency`, `Currency`\>

Defined in: [entities/pool.ts:166](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L166)

Returns the current mid price of the pool in terms of currency0, i.e. the ratio of currency1 over currency0

##### Returns

`Price`\<`Currency`, `Currency`\>

***

### currency1Price

#### Get Signature

> **get** **currency1Price**(): `Price`\<`Currency`, `Currency`\>

Defined in: [entities/pool.ts:185](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L185)

Returns the current mid price of the pool in terms of currency1, i.e. the ratio of currency0 over currency1

##### Returns

`Price`\<`Currency`, `Currency`\>

***

### token0

#### Get Signature

> **get** **token0**(): `Currency`

Defined in: [entities/pool.ts:143](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L143)

backwards compatibility with v2/3 sdks

##### Returns

`Currency`

***

### token0Price

#### Get Signature

> **get** **token0Price**(): `Price`\<`Currency`, `Currency`\>

Defined in: [entities/pool.ts:178](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L178)

backwards compatibility with v2/3 sdks

##### Returns

`Price`\<`Currency`, `Currency`\>

***

### token1

#### Get Signature

> **get** **token1**(): `Currency`

Defined in: [entities/pool.ts:146](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L146)

##### Returns

`Currency`

***

### token1Price

#### Get Signature

> **get** **token1Price**(): `Price`\<`Currency`, `Currency`\>

Defined in: [entities/pool.ts:197](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L197)

backwards compatibility with v2/3 sdks

##### Returns

`Price`\<`Currency`, `Currency`\>

## Methods

### getInputAmount()

> **getInputAmount**(`outputAmount`, `sqrtPriceLimitX96`?): `Promise`\<\[`CurrencyAmount`\<`Currency`\>, [`Pool`](Pool.md)\]\>

Defined in: [entities/pool.ts:257](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L257)

Given a desired output amount of a currency, return the computed input amount and a pool with state updated after the trade
Works only for vanilla hookless v3 pools, otherwise throws an error

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `outputAmount` | `CurrencyAmount`\<`Currency`\> | the output amount for which to quote the input amount |
| `sqrtPriceLimitX96`? | `JSBI` | The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap |

#### Returns

`Promise`\<\[`CurrencyAmount`\<`Currency`\>, [`Pool`](Pool.md)\]\>

The input amount and the pool with updated state

***

### getOutputAmount()

> **getOutputAmount**(`inputAmount`, `sqrtPriceLimitX96`?): `Promise`\<\[`CurrencyAmount`\<`Currency`\>, [`Pool`](Pool.md)\]\>

Defined in: [entities/pool.ts:219](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L219)

Works only for vanilla hookless v3 pools, otherwise throws an error

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `inputAmount` | `CurrencyAmount`\<`Currency`\> |
| `sqrtPriceLimitX96`? | `JSBI` |

#### Returns

`Promise`\<\[`CurrencyAmount`\<`Currency`\>, [`Pool`](Pool.md)\]\>

***

### involvesCurrency()

> **involvesCurrency**(`currency`): `boolean`

Defined in: [entities/pool.ts:155](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L155)

Returns true if the currency is either currency0 or currency1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currency` | `Currency` | The currency to check |

#### Returns

`boolean`

True if currency is either currency0 or currency1

***

### involvesToken()

> **involvesToken**(`currency`): `boolean`

Defined in: [entities/pool.ts:159](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L159)

backwards compatibility with v2/3 sdks

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency` | `Currency` |

#### Returns

`boolean`

***

### priceOf()

> **priceOf**(`currency`): `Price`\<`Currency`, `Currency`\>

Defined in: [entities/pool.ts:206](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L206)

Return the price of the given currency in terms of the other currency in the pool.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currency` | `Currency` | The currency to return price of |

#### Returns

`Price`\<`Currency`, `Currency`\>

The price of the given currency, in terms of the other.

***

### getPoolId()

> `static` **getPoolId**(`currencyA`, `currencyB`, `fee`, `tickSpacing`, `hooks`): `string`

Defined in: [entities/pool.ts:71](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L71)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currencyA` | `Currency` |
| `currencyB` | `Currency` |
| `fee` | `number` |
| `tickSpacing` | `number` |
| `hooks` | `string` |

#### Returns

`string`

***

### getPoolKey()

> `static` **getPoolKey**(`currencyA`, `currencyB`, `fee`, `tickSpacing`, `hooks`): [`PoolKey`](../overview.md#poolkey)

Defined in: [entities/pool.ts:49](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/pool.ts#L49)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currencyA` | `Currency` |
| `currencyB` | `Currency` |
| `fee` | `number` |
| `tickSpacing` | `number` |
| `hooks` | `string` |

#### Returns

[`PoolKey`](../overview.md#poolkey)
