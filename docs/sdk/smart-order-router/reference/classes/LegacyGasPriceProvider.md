[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / LegacyGasPriceProvider

# Class: LegacyGasPriceProvider

Provider for getting gas prices.

## Hierarchy

- [`IGasPriceProvider`](IGasPriceProvider.md)

  ↳ **`LegacyGasPriceProvider`**

## Table of contents

### Constructors

- [constructor](LegacyGasPriceProvider.md#constructor)

### Properties

- [provider](LegacyGasPriceProvider.md#provider)

### Methods

- [getGasPrice](LegacyGasPriceProvider.md#getgasprice)

## Constructors

### constructor

• **new LegacyGasPriceProvider**(`provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `JsonRpcProvider` |

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[constructor](IGasPriceProvider.md#constructor)

#### Defined in

[src/providers/legacy-gas-price-provider.ts:8](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/legacy-gas-price-provider.ts#L8)

## Properties

### provider

• `Protected` **provider**: `JsonRpcProvider`

#### Defined in

[src/providers/legacy-gas-price-provider.ts:8](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/legacy-gas-price-provider.ts#L8)

## Methods

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/legacy-gas-price-provider.ts:12](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/legacy-gas-price-provider.ts#L12)
