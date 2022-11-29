[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3SubgraphProvider

# Class: V3SubgraphProvider

Provider for getting V3 pools from the Subgraph

**`Export`**

**`Interface`**

IV3SubgraphProvider

## Implements

- [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V3SubgraphProvider.md#constructor)

### Properties

- [chainId](V3SubgraphProvider.md#chainid)
- [client](V3SubgraphProvider.md#client)
- [retries](V3SubgraphProvider.md#retries)
- [rollback](V3SubgraphProvider.md#rollback)
- [timeout](V3SubgraphProvider.md#timeout)

### Methods

- [getPools](V3SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new V3SubgraphProvider**(`chainId`, `retries?`, `timeout?`, `rollback?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `retries` | `number` | `2` |
| `timeout` | `number` | `30000` |
| `rollback` | `boolean` | `true` |

#### Defined in

[src/providers/v3/subgraph-provider.ts:83](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L83)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/v3/subgraph-provider.ts:84](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L84)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[src/providers/v3/subgraph-provider.ts:81](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L81)

___

### retries

• `Private` **retries**: `number` = `2`

#### Defined in

[src/providers/v3/subgraph-provider.ts:85](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L85)

___

### rollback

• `Private` **rollback**: `boolean` = `true`

#### Defined in

[src/providers/v3/subgraph-provider.ts:87](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L87)

___

### timeout

• `Private` **timeout**: `number` = `30000`

#### Defined in

[src/providers/v3/subgraph-provider.ts:86](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L86)

## Methods

### getPools

▸ **getPools**(`_tokenIn?`, `_tokenOut?`, `providerConfig?`): `Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tokenIn?` | `Token` |
| `_tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Implementation of

[IV3SubgraphProvider](../interfaces/IV3SubgraphProvider.md).[getPools](../interfaces/IV3SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v3/subgraph-provider.ts:96](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/subgraph-provider.ts#L96)
