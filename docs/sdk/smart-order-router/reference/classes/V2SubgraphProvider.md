[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2SubgraphProvider

# Class: V2SubgraphProvider

Provider for getting V2 pools from the Subgraph

**`Export`**

**`Interface`**

IV2SubgraphProvider

## Implements

- [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](V2SubgraphProvider.md#constructor)

### Properties

- [chainId](V2SubgraphProvider.md#chainid)
- [client](V2SubgraphProvider.md#client)
- [pageSize](V2SubgraphProvider.md#pagesize)
- [retries](V2SubgraphProvider.md#retries)
- [rollback](V2SubgraphProvider.md#rollback)
- [timeout](V2SubgraphProvider.md#timeout)

### Methods

- [getPools](V2SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new V2SubgraphProvider**(`chainId`, `retries?`, `timeout?`, `rollback?`, `pageSize?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `retries` | `number` | `2` |
| `timeout` | `number` | `360000` |
| `rollback` | `boolean` | `true` |
| `pageSize` | `number` | `PAGE_SIZE` |

#### Defined in

[src/providers/v2/subgraph-provider.ts:67](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L67)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/v2/subgraph-provider.ts:68](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L68)

___

### client

• `Private` **client**: `GraphQLClient`

#### Defined in

[src/providers/v2/subgraph-provider.ts:65](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L65)

___

### pageSize

• `Private` **pageSize**: `number` = `PAGE_SIZE`

#### Defined in

[src/providers/v2/subgraph-provider.ts:72](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L72)

___

### retries

• `Private` **retries**: `number` = `2`

#### Defined in

[src/providers/v2/subgraph-provider.ts:69](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L69)

___

### rollback

• `Private` **rollback**: `boolean` = `true`

#### Defined in

[src/providers/v2/subgraph-provider.ts:71](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L71)

___

### timeout

• `Private` **timeout**: `number` = `360000`

#### Defined in

[src/providers/v2/subgraph-provider.ts:70](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L70)

## Methods

### getPools

▸ **getPools**(`_tokenIn?`, `_tokenOut?`, `providerConfig?`): `Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tokenIn?` | `Token` |
| `_tokenOut?` | `Token` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Implementation of

[IV2SubgraphProvider](../interfaces/IV2SubgraphProvider.md).[getPools](../interfaces/IV2SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v2/subgraph-provider.ts:81](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/subgraph-provider.ts#L81)
