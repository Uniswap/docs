[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV2PoolProvider

# Interface: IV2PoolProvider

Provider for getting V2 pools.

**`Export`**

**`Interface`**

IV2PoolProvider

## Implemented by

- [`CachingV2PoolProvider`](../classes/CachingV2PoolProvider.md)
- [`V2PoolProvider`](../classes/V2PoolProvider.md)

## Table of contents

### Methods

- [getPoolAddress](IV2PoolProvider.md#getpooladdress)
- [getPools](IV2PoolProvider.md#getpools)

## Methods

### getPoolAddress

▸ **getPoolAddress**(`tokenA`, `tokenB`): `Object`

Gets the pool address for the specified token pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenA` | `Token` | Token A in the pool. |
| `tokenB` | `Token` | Token B in the pool. |

#### Returns

`Object`

The pool address and the two tokens.

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |
| `token0` | `Token` |
| `token1` | `Token` |

#### Defined in

[src/providers/v2/pool-provider.ts:46](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L46)

___

### getPools

▸ **getPools**(`tokenPairs`, `providerConfig?`): `Promise`<[`V2PoolAccessor`](../modules.md#v2poolaccessor)\>

Gets the pools for the specified token pairs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenPairs` | [`Token`, `Token`][] | The token pairs to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`V2PoolAccessor`](../modules.md#v2poolaccessor)\>

A pool accessor with methods for accessing the pools.

#### Defined in

[src/providers/v2/pool-provider.ts:34](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/pool-provider.ts#L34)
