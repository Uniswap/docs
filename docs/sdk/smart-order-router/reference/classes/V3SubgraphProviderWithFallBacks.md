[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3SubgraphProviderWithFallBacks

# Class: V3SubgraphProviderWithFallBacks

Provider for getting V3 subgraph pools that falls back to a different provider
in the event of failure.

**`Export`**

## Implements

- [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V3SubgraphProviderWithFallBacks.md#constructor)

### Properties

- [fallbacks](V3SubgraphProviderWithFallBacks.md#fallbacks)

### Methods

- [getPools](V3SubgraphProviderWithFallBacks.md#getpools)

## Constructors

### constructor

• **new V3SubgraphProviderWithFallBacks**(`fallbacks`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fallbacks` | [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)[] |

#### Defined in

[src/providers/v3/subgraph-provider-with-fallback.ts:16](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider-with-fallback.ts#L16)

## Properties

### fallbacks

• `Private` **fallbacks**: [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)[]

#### Defined in

[src/providers/v3/subgraph-provider-with-fallback.ts:16](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider-with-fallback.ts#L16)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`, `providerConfig?`): `Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Implementation of

[IV3SubgraphProvider](../interfaces/IV3SubgraphProvider.md).[getPools](../interfaces/IV3SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v3/subgraph-provider-with-fallback.ts:18](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider-with-fallback.ts#L18)
