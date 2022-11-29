[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingV3PoolProvider

# Class: CachingV3PoolProvider

Provider for getting V3 pools, with functionality for caching the results.
Does not cache by block because we compute quotes using the on-chain quoter
so do not mind if the liquidity values are out of date.

**`Export`**

## Implements

- [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

## Table of contents

### Constructors

- [constructor](CachingV3PoolProvider.md#constructor)

### Properties

- [cache](CachingV3PoolProvider.md#cache)
- [chainId](CachingV3PoolProvider.md#chainid)
- [poolProvider](CachingV3PoolProvider.md#poolprovider)

### Methods

- [POOL\_KEY](CachingV3PoolProvider.md#pool_key)
- [getPoolAddress](CachingV3PoolProvider.md#getpooladdress)
- [getPools](CachingV3PoolProvider.md#getpools)

## Constructors

### constructor

• **new CachingV3PoolProvider**(`chainId`, `poolProvider`, `cache`)

Creates an instance of CachingV3PoolProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `poolProvider` | [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md) | The provider to use to get the pools when not in the cache. |
| `cache` | [`ICache`](../interfaces/ICache.md)<`Pool`\> | Cache instance to hold cached pools. |

#### Defined in

[src/providers/v3/caching-pool-provider.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L30)

## Properties

### cache

• `Private` **cache**: [`ICache`](../interfaces/ICache.md)<`Pool`\>

Cache instance to hold cached pools.

#### Defined in

[src/providers/v3/caching-pool-provider.ts:33](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L33)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v3/caching-pool-provider.ts:31](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L31)

___

### poolProvider

• `Protected` **poolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

The provider to use to get the pools when not in the cache.

#### Defined in

[src/providers/v3/caching-pool-provider.ts:32](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L32)

## Methods

### POOL\_KEY

▸ `Private` **POOL_KEY**(`chainId`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[src/providers/v3/caching-pool-provider.ts:21](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L21)

___

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

#### Implementation of

[IV3PoolProvider](../interfaces/IV3PoolProvider.md).[getPoolAddress](../interfaces/IV3PoolProvider.md#getpooladdress)

#### Defined in

[src/providers/v3/caching-pool-provider.ts:117](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L117)

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

#### Implementation of

[IV3PoolProvider](../interfaces/IV3PoolProvider.md).[getPools](../interfaces/IV3PoolProvider.md#getpools)

#### Defined in

[src/providers/v3/caching-pool-provider.ts:36](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-pool-provider.ts#L36)
