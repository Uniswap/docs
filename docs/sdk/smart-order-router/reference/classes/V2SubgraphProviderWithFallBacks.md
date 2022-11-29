[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2SubgraphProviderWithFallBacks

# Class: V2SubgraphProviderWithFallBacks

Provider for getting V2 subgraph pools that falls back to a different provider
in the event of failure.

**`Export`**

## Implements

- [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V2SubgraphProviderWithFallBacks.md#constructor)

### Properties

- [fallbacks](V2SubgraphProviderWithFallBacks.md#fallbacks)

### Methods

- [getPools](V2SubgraphProviderWithFallBacks.md#getpools)

## Constructors

### constructor

• **new V2SubgraphProviderWithFallBacks**(`fallbacks`)

Creates an instance of V2SubgraphProviderWithFallBacks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fallbacks` | [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)[] | Ordered list of `IV2SubgraphProvider` to try to get pools from. |

#### Defined in

[src/providers/v2/subgraph-provider-with-fallback.ts:20](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider-with-fallback.ts#L20)

## Properties

### fallbacks

• `Private` **fallbacks**: [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)[]

Ordered list of `IV2SubgraphProvider` to try to get pools from.

#### Defined in

[src/providers/v2/subgraph-provider-with-fallback.ts:20](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider-with-fallback.ts#L20)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`, `providerConfig?`): `Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Implementation of

[IV2SubgraphProvider](../interfaces/IV2SubgraphProvider.md).[getPools](../interfaces/IV2SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v2/subgraph-provider-with-fallback.ts:22](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider-with-fallback.ts#L22)
