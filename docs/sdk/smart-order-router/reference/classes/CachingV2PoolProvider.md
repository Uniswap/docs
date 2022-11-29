[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingV2PoolProvider

# Class: CachingV2PoolProvider

Provider for getting V2 pools, with functionality for caching the results per block.

**`Export`**

## Implements

- [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

## Table of contents

### Constructors

- [constructor](CachingV2PoolProvider.md#constructor)

### Properties

- [cache](CachingV2PoolProvider.md#cache)
- [chainId](CachingV2PoolProvider.md#chainid)
- [poolProvider](CachingV2PoolProvider.md#poolprovider)

### Methods

- [POOL\_KEY](CachingV2PoolProvider.md#pool_key)
- [getPoolAddress](CachingV2PoolProvider.md#getpooladdress)
- [getPools](CachingV2PoolProvider.md#getpools)

## Constructors

### constructor

• **new CachingV2PoolProvider**(`chainId`, `poolProvider`, `cache`)

Creates an instance of CachingV3PoolProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `poolProvider` | [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md) | The provider to use to get the pools when not in the cache. |
| `cache` | [`ICache`](../interfaces/ICache.md)<{ `block?`: `number` ; `pair`: `Pair`  }\> | Cache instance to hold cached pools. |

#### Defined in

[src/providers/v2/caching-pool-provider.ts:28](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L28)

## Properties

### cache

• `Private` **cache**: [`ICache`](../interfaces/ICache.md)<{ `block?`: `number` ; `pair`: `Pair`  }\>

Cache instance to hold cached pools.

#### Defined in

[src/providers/v2/caching-pool-provider.ts:34](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L34)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v2/caching-pool-provider.ts:29](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L29)

___

### poolProvider

• `Protected` **poolProvider**: [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

The provider to use to get the pools when not in the cache.

#### Defined in

[src/providers/v2/caching-pool-provider.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L30)

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

[src/providers/v2/caching-pool-provider.ts:19](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L19)

___

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

#### Implementation of

[IV2PoolProvider](../interfaces/IV2PoolProvider.md).[getPoolAddress](../interfaces/IV2PoolProvider.md#getpooladdress)

#### Defined in

[src/providers/v2/caching-pool-provider.ts:124](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L124)

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

#### Implementation of

[IV2PoolProvider](../interfaces/IV2PoolProvider.md).[getPools](../interfaces/IV2PoolProvider.md#getpools)

#### Defined in

[src/providers/v2/caching-pool-provider.ts:37](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-pool-provider.ts#L37)
