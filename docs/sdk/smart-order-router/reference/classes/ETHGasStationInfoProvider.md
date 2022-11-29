[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ETHGasStationInfoProvider

# Class: ETHGasStationInfoProvider

Provider for getting gas prices.

## Hierarchy

- [`IGasPriceProvider`](IGasPriceProvider.md)

  ↳ **`ETHGasStationInfoProvider`**

## Table of contents

### Constructors

- [constructor](ETHGasStationInfoProvider.md#constructor)

### Properties

- [url](ETHGasStationInfoProvider.md#url)

### Methods

- [getGasPrice](ETHGasStationInfoProvider.md#getgasprice)

## Constructors

### constructor

• **new ETHGasStationInfoProvider**(`url`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[constructor](IGasPriceProvider.md#constructor)

#### Defined in

[src/providers/eth-gas-station-info-gas-price-provider.ts:26](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eth-gas-station-info-gas-price-provider.ts#L26)

## Properties

### url

• `Private` **url**: `string`

#### Defined in

[src/providers/eth-gas-station-info-gas-price-provider.ts:25](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eth-gas-station-info-gas-price-provider.ts#L25)

## Methods

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/eth-gas-station-info-gas-price-provider.ts:31](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eth-gas-station-info-gas-price-provider.ts#L31)
