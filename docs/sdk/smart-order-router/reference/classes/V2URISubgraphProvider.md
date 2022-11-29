[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2URISubgraphProvider

# Class: V2URISubgraphProvider

Provider for getting V2 pools from the Subgraph

**`Export`**

**`Interface`**

IV2SubgraphProvider

## Hierarchy

- [`URISubgraphProvider`](URISubgraphProvider.md)<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)\>

  ↳ **`V2URISubgraphProvider`**

## Implements

- [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V2URISubgraphProvider.md#constructor)

### Methods

- [getPools](V2URISubgraphProvider.md#getpools)

## Constructors

### constructor

• **new V2URISubgraphProvider**(`chainId`, `uri`, `timeout?`, `retries?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `uri` | `string` | `undefined` |
| `timeout` | `number` | `6000` |
| `retries` | `number` | `2` |

#### Inherited from

[URISubgraphProvider](URISubgraphProvider.md).[constructor](URISubgraphProvider.md#constructor)

#### Defined in

[src/providers/uri-subgraph-provider.ts:23](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L23)

## Methods

### getPools

▸ **getPools**(): `Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Returns

`Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Implementation of

[IV2SubgraphProvider](../interfaces/IV2SubgraphProvider.md).[getPools](../interfaces/IV2SubgraphProvider.md#getpools)

#### Inherited from

[URISubgraphProvider](URISubgraphProvider.md).[getPools](URISubgraphProvider.md#getpools)

#### Defined in

[src/providers/uri-subgraph-provider.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L30)
