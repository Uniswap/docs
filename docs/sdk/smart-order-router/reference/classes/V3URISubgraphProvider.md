[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3URISubgraphProvider

# Class: V3URISubgraphProvider

Provider for getting V3 pools from the Subgraph

**`Export`**

**`Interface`**

IV3SubgraphProvider

## Hierarchy

- [`URISubgraphProvider`](URISubgraphProvider.md)<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)\>

  ↳ **`V3URISubgraphProvider`**

## Implements

- [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V3URISubgraphProvider.md#constructor)

### Methods

- [getPools](V3URISubgraphProvider.md#getpools)

## Constructors

### constructor

• **new V3URISubgraphProvider**(`chainId`, `uri`, `timeout?`, `retries?`)

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

▸ **getPools**(): `Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Returns

`Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Implementation of

[IV3SubgraphProvider](../interfaces/IV3SubgraphProvider.md).[getPools](../interfaces/IV3SubgraphProvider.md#getpools)

#### Inherited from

[URISubgraphProvider](URISubgraphProvider.md).[getPools](URISubgraphProvider.md#getpools)

#### Defined in

[src/providers/uri-subgraph-provider.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L30)
