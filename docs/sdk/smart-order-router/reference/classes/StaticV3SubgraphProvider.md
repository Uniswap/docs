[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / StaticV3SubgraphProvider

# Class: StaticV3SubgraphProvider

Provider that uses a hardcoded list of V3 pools to generate a list of subgraph pools.

Since the pools are hardcoded and the data does not come from the Subgraph, the TVL values
are dummys and should not be depended on.

Useful for instances where other data sources are unavailable. E.g. Subgraph not available.

**`Export`**

## Implements

- [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](StaticV3SubgraphProvider.md#constructor)

### Properties

- [chainId](StaticV3SubgraphProvider.md#chainid)
- [poolProvider](StaticV3SubgraphProvider.md#poolprovider)

### Methods

- [getPools](StaticV3SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new StaticV3SubgraphProvider**(`chainId`, `poolProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `poolProvider` | [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md) |

#### Defined in

[src/providers/v3/static-subgraph-provider.ts:173](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/static-subgraph-provider.ts#L173)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/v3/static-subgraph-provider.ts:174](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/static-subgraph-provider.ts#L174)

___

### poolProvider

• `Private` **poolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

#### Defined in

[src/providers/v3/static-subgraph-provider.ts:175](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/static-subgraph-provider.ts#L175)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`): `Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |

#### Returns

`Promise`<[`V3SubgraphPool`](../interfaces/V3SubgraphPool.md)[]\>

#### Implementation of

[IV3SubgraphProvider](../interfaces/IV3SubgraphProvider.md).[getPools](../interfaces/IV3SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v3/static-subgraph-provider.ts:178](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v3/static-subgraph-provider.ts#L178)
