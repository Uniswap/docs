[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / URISubgraphProvider

# Class: URISubgraphProvider<TSubgraphPool\>

Gets subgraph pools from a URI. The URI shoudl contain a JSON
stringified array of V2SubgraphPool objects or V3SubgraphPool
objects.

**`Export`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSubgraphPool` | extends [`V2SubgraphPool`](../interfaces/V2SubgraphPool.md) \| [`V3SubgraphPool`](../interfaces/V3SubgraphPool.md) |

## Hierarchy

- **`URISubgraphProvider`**

  ↳ [`V2URISubgraphProvider`](V2URISubgraphProvider.md)

  ↳ [`V3URISubgraphProvider`](V3URISubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](URISubgraphProvider.md#constructor)

### Properties

- [chainId](URISubgraphProvider.md#chainid)
- [retries](URISubgraphProvider.md#retries)
- [timeout](URISubgraphProvider.md#timeout)
- [uri](URISubgraphProvider.md#uri)

### Methods

- [getPools](URISubgraphProvider.md#getpools)

## Constructors

### constructor

• **new URISubgraphProvider**<`TSubgraphPool`\>(`chainId`, `uri`, `timeout?`, `retries?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSubgraphPool` | extends [`V2SubgraphPool`](../interfaces/V2SubgraphPool.md) \| [`V3SubgraphPool`](../interfaces/V3SubgraphPool.md) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `uri` | `string` | `undefined` |
| `timeout` | `number` | `6000` |
| `retries` | `number` | `2` |

#### Defined in

[src/providers/uri-subgraph-provider.ts:23](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L23)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/uri-subgraph-provider.ts:24](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L24)

___

### retries

• `Private` **retries**: `number` = `2`

#### Defined in

[src/providers/uri-subgraph-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L27)

___

### timeout

• `Private` **timeout**: `number` = `6000`

#### Defined in

[src/providers/uri-subgraph-provider.ts:26](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L26)

___

### uri

• `Private` **uri**: `string`

#### Defined in

[src/providers/uri-subgraph-provider.ts:25](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L25)

## Methods

### getPools

▸ **getPools**(): `Promise`<`TSubgraphPool`[]\>

#### Returns

`Promise`<`TSubgraphPool`[]\>

#### Defined in

[src/providers/uri-subgraph-provider.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/uri-subgraph-provider.ts#L30)
