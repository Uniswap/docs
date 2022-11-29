[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingV2SubgraphProvider

# Class: CachingV2SubgraphProvider

Provider for getting V2 pools, with functionality for caching the results.

**`Export`**

## Implements

- [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](CachingV2SubgraphProvider.md#constructor)

### Properties

- [cache](CachingV2SubgraphProvider.md#cache)
- [chainId](CachingV2SubgraphProvider.md#chainid)
- [subgraphProvider](CachingV2SubgraphProvider.md#subgraphprovider)

### Methods

- [SUBGRAPH\_KEY](CachingV2SubgraphProvider.md#subgraph_key)
- [getPools](CachingV2SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new CachingV2SubgraphProvider**(`chainId`, `subgraphProvider`, `cache`)

Creates an instance of CachingV2SubgraphProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `subgraphProvider` | [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md) | The provider to use to get the subgraph pools when not in the cache. |
| `cache` | [`ICache`](../interfaces/ICache.md)<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\> | Cache instance to hold cached pools. |

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:21](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L21)

## Properties

### cache

• `Private` **cache**: [`ICache`](../interfaces/ICache.md)<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

Cache instance to hold cached pools.

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:24](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L24)

___

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:22](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L22)

___

### subgraphProvider

• `Protected` **subgraphProvider**: [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

The provider to use to get the subgraph pools when not in the cache.

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:23](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L23)

## Methods

### SUBGRAPH\_KEY

▸ `Private` **SUBGRAPH_KEY**(`chainId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`string`

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:13](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L13)

___

### getPools

▸ **getPools**(): `Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Returns

`Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Implementation of

[IV2SubgraphProvider](../interfaces/IV2SubgraphProvider.md).[getPools](../interfaces/IV2SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v2/caching-subgraph-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/caching-subgraph-provider.ts#L27)
