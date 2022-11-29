[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV3PoolProvider

# Interface: IV3PoolProvider

Provider or getting V3 pools.

**`Export`**

**`Interface`**

IV3PoolProvider

## Implemented by

- [`CachingV3PoolProvider`](../classes/CachingV3PoolProvider.md)
- [`V3PoolProvider`](../classes/V3PoolProvider.md)

## Table of contents

### Methods

- [getPoolAddress](IV3PoolProvider.md#getpooladdress)
- [getPools](IV3PoolProvider.md#getpools)

## Methods

### getPoolAddress

▸ **getPoolAddress**(`tokenA`, `tokenB`, `feeAmount`): `Object`

Gets the pool address for the specified token pair and fee tier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenA` | `Token` | Token A in the pool. |
| `tokenB` | `Token` | Token B in the pool. |
| `feeAmount` | `FeeAmount` | The fee amount of the pool. |

#### Returns

`Object`

The pool address and the two tokens.

| Name | Type |
| :------ | :------ |
| `poolAddress` | `string` |
| `token0` | `Token` |
| `token1` | `Token` |

#### Defined in

[src/providers/v3/pool-provider.ts:54](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L54)

___

### getPools

▸ **getPools**(`tokenPairs`, `providerConfig?`): `Promise`<[`V3PoolAccessor`](../modules.md#v3poolaccessor)\>

Gets the specified pools.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenPairs` | [`Token`, `Token`, `FeeAmount`][] | The token pairs and fee amount of the pools to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`V3PoolAccessor`](../modules.md#v3poolaccessor)\>

A pool accessor with methods for accessing the pools.

#### Defined in

[src/providers/v3/pool-provider.ts:41](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/pool-provider.ts#L41)
