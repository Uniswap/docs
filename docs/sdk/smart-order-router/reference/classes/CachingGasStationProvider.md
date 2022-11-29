[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingGasStationProvider

# Class: CachingGasStationProvider

Provider for getting gas price, with functionality for caching the results.

**`Export`**

## Implements

- [`IGasPriceProvider`](IGasPriceProvider.md)

## Table of contents

### Constructors

- [constructor](CachingGasStationProvider.md#constructor)

### Properties

- [cache](CachingGasStationProvider.md#cache)
- [chainId](CachingGasStationProvider.md#chainid)
- [gasPriceProvider](CachingGasStationProvider.md#gaspriceprovider)

### Methods

- [GAS\_KEY](CachingGasStationProvider.md#gas_key)
- [getGasPrice](CachingGasStationProvider.md#getgasprice)

## Constructors

### constructor

• **new CachingGasStationProvider**(`chainId`, `gasPriceProvider`, `cache`)

Creates an instance of CachingGasStationProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain id to use. |
| `gasPriceProvider` | [`IGasPriceProvider`](IGasPriceProvider.md) | The provider to use to get the gas price when not in the cache. |
| `cache` | [`ICache`](../interfaces/ICache.md)<[`GasPrice`](../modules.md#gasprice)\> | Cache instance to hold cached pools. |

#### Defined in

[src/providers/caching-gas-provider.ts:22](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L22)

## Properties

### cache

• `Private` **cache**: [`ICache`](../interfaces/ICache.md)<[`GasPrice`](../modules.md#gasprice)\>

Cache instance to hold cached pools.

#### Defined in

[src/providers/caching-gas-provider.ts:25](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L25)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain id to use.

#### Defined in

[src/providers/caching-gas-provider.ts:23](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L23)

___

### gasPriceProvider

• `Private` **gasPriceProvider**: [`IGasPriceProvider`](IGasPriceProvider.md)

The provider to use to get the gas price when not in the cache.

#### Defined in

[src/providers/caching-gas-provider.ts:24](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L24)

## Methods

### GAS\_KEY

▸ `Private` **GAS_KEY**(`chainId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`string`

#### Defined in

[src/providers/caching-gas-provider.ts:14](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L14)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Implementation of

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/caching-gas-provider.ts:28](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-gas-provider.ts#L28)
