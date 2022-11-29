[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / StaticV2SubgraphProvider

# Class: StaticV2SubgraphProvider

Provider that does not get data from an external source and instead returns
a hardcoded list of Subgraph pools.

Since the pools are hardcoded, the liquidity/price values are dummys and should not
be depended on.

Useful for instances where other data sources are unavailable. E.g. subgraph not available.

**`Export`**

## Implements

- [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

## Table of contents

### Constructors

- [constructor](StaticV2SubgraphProvider.md#constructor)

### Properties

- [chainId](StaticV2SubgraphProvider.md#chainid)

### Methods

- [getPools](StaticV2SubgraphProvider.md#getpools)

## Constructors

### constructor

• **new StaticV2SubgraphProvider**(`chainId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Defined in

[src/providers/v2/static-subgraph-provider.ts:64](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/static-subgraph-provider.ts#L64)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/v2/static-subgraph-provider.ts:64](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/static-subgraph-provider.ts#L64)

## Methods

### getPools

▸ **getPools**(`tokenIn?`, `tokenOut?`): `Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn?` | `Token` |
| `tokenOut?` | `Token` |

#### Returns

`Promise`<[`V2SubgraphPool`](../interfaces/V2SubgraphPool.md)[]\>

#### Implementation of

[IV2SubgraphProvider](../interfaces/IV2SubgraphProvider.md).[getPools](../interfaces/IV2SubgraphProvider.md#getpools)

#### Defined in

[src/providers/v2/static-subgraph-provider.ts:66](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/static-subgraph-provider.ts#L66)
