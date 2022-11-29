[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / StaticGasPriceProvider

# Class: StaticGasPriceProvider

Provider for getting gas prices.

## Implements

- [`IGasPriceProvider`](IGasPriceProvider.md)

## Table of contents

### Constructors

- [constructor](StaticGasPriceProvider.md#constructor)

### Properties

- [gasPriceWei](StaticGasPriceProvider.md#gaspricewei)

### Methods

- [getGasPrice](StaticGasPriceProvider.md#getgasprice)

## Constructors

### constructor

• **new StaticGasPriceProvider**(`gasPriceWei`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasPriceWei` | `BigNumber` |

#### Defined in

[src/providers/static-gas-price-provider.ts:7](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/static-gas-price-provider.ts#L7)

## Properties

### gasPriceWei

• `Private` **gasPriceWei**: `BigNumber`

#### Defined in

[src/providers/static-gas-price-provider.ts:7](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/static-gas-price-provider.ts#L7)

## Methods

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Implementation of

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/static-gas-price-provider.ts:8](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/static-gas-price-provider.ts#L8)
