[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV3SubgraphProvider

# Interface: IV3SubgraphProvider

Provider for getting V3 pools from the Subgraph

**`Export`**

**`Interface`**

IV3SubgraphProvider

## Implemented by

- [`CachingV3SubgraphProvider`](../classes/CachingV3SubgraphProvider.md)
- [`StaticV3SubgraphProvider`](../classes/StaticV3SubgraphProvider.md)
- [`V3SubgraphProvider`](../classes/V3SubgraphProvider.md)
- [`V3SubgraphProviderWithFallBacks`](../classes/V3SubgraphProviderWithFallBacks.md)
- [`V3URISubgraphProvider`](../classes/V3URISubgraphProvider.md)

## Table of contents

### Methods

- [getPools](IV3SubgraphProvider.md#getpools)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`, `providerConfig?`): `Promise`<[`V3SubgraphPool`](V3SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V3SubgraphPool`](V3SubgraphPool.md)[]\>

#### Defined in

[src/providers/v3/subgraph-provider.ts:73](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L73)
