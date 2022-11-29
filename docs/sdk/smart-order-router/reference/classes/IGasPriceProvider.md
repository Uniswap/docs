[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IGasPriceProvider

# Class: IGasPriceProvider

Provider for getting gas prices.

## Hierarchy

- **`IGasPriceProvider`**

  ↳ [`EIP1559GasPriceProvider`](EIP1559GasPriceProvider.md)

  ↳ [`ETHGasStationInfoProvider`](ETHGasStationInfoProvider.md)

  ↳ [`LegacyGasPriceProvider`](LegacyGasPriceProvider.md)

  ↳ [`OnChainGasPriceProvider`](OnChainGasPriceProvider.md)

## Implemented by

- [`CachingGasStationProvider`](CachingGasStationProvider.md)
- [`StaticGasPriceProvider`](StaticGasPriceProvider.md)

## Table of contents

### Constructors

- [constructor](IGasPriceProvider.md#constructor)

### Methods

- [getGasPrice](IGasPriceProvider.md#getgasprice)

## Constructors

### constructor

• **new IGasPriceProvider**()

## Methods

### getGasPrice

▸ `Abstract` **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Defined in

[src/providers/gas-price-provider.ts:11](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/gas-price-provider.ts#L11)
