[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingV3SubgraphProvider

# Class: CachingV3SubgraphProvider

Provider for getting V3 pools, with functionality for caching the results.

**`Export`**

## Implements

- [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](CachingV3SubgraphProvider.md#constructor)

### Properties

- [cache](CachingV3SubgraphProvider.md#cache)
- [chainId](CachingV3SubgraphProvider.md#chainid)
- [subgraphProvider](CachingV3SubgraphProvider.md#subgraphprovider)

### Methods

- [SUBGRAPH\_KEY](CachingV3SubgraphProvider.md#subgraph_key)
- [getPools](CachingV3SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new CachingV3SubgraphProvider**(`chainId`, `subgraphProvider`, `cache`)

Creates an instance of CachingV3SubgraphProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `subgraphProvider` | [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md) | The provider to use to get the subgraph pools when not in the cache. |
| `cache` | [`ICache`](../interfaces/ICache.md)<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\> | Cache instance to hold cached pools. |

#### Defined in

[src/providers/v3/caching-subgraph-provider.ts:21](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L21)

## Properties

### cache

• `Private` **cache**: [`ICache`](../interfaces/ICache.md)<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

Cache instance to hold cached pools.

#### Defined in

[src/providers/v3/caching-subgraph-provider.ts:24](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L24)

___

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/v3/caching-subgraph-provider.ts:22](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L22)

___

### subgraphProvider

• `Protected` **subgraphProvider**: [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

The provider to use to get the subgraph pools when not in the cache.

#### Defined in

[src/providers/v3/caching-subgraph-provider.ts:23](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L23)

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

[src/providers/v3/caching-subgraph-provider.ts:13](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L13)

___

### getPools

▸ **getPools**(): `Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Returns

`Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Implementation of

[IV3SubgraphProvider](../interfaces/IV3SubgraphProvider.md).[getPools](../interfaces/IV3SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v3/caching-subgraph-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/caching-subgraph-provider.ts#L27)
