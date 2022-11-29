[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV2SubgraphProvider

# Interface: IV2SubgraphProvider

Provider for getting V2 pools from the Subgraph

**`Export`**

**`Interface`**

IV2SubgraphProvider

## Implemented by

- [`CachingV2SubgraphProvider`](../classes/CachingV2SubgraphProvider.md)
- [`StaticV2SubgraphProvider`](../classes/StaticV2SubgraphProvider.md)
- [`V2SubgraphProvider`](../classes/V2SubgraphProvider.md)
- [`V2SubgraphProviderWithFallBacks`](../classes/V2SubgraphProviderWithFallBacks.md)
- [`V2URISubgraphProvider`](../classes/V2URISubgraphProvider.md)

## Table of contents

### Methods

- [getPools](IV2SubgraphProvider.md#getpools)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`, `providerConfig?`): `Promise`<[`V2SubgraphPool`](V2SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V2SubgraphPool`](V2SubgraphPool.md)[]\>

#### Defined in

[src/providers/v2/subgraph-provider.ts:57](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L57)
