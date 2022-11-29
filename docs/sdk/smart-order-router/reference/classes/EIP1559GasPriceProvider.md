[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / EIP1559GasPriceProvider

# Class: EIP1559GasPriceProvider

Computes a gas estimate using on-chain data from the eth_feeHistory RPC endpoint.

Takes the average priority fee from the past `blocksToConsider` blocks, and adds it
to the current base fee.

**`Export`**

## Hierarchy

- [`IGasPriceProvider`](IGasPriceProvider.md)

  ↳ **`EIP1559GasPriceProvider`**

## Table of contents

### Constructors

- [constructor](EIP1559GasPriceProvider.md#constructor)

### Properties

- [blocksToConsider](EIP1559GasPriceProvider.md#blockstoconsider)
- [priorityFeePercentile](EIP1559GasPriceProvider.md#priorityfeepercentile)
- [provider](EIP1559GasPriceProvider.md#provider)

### Methods

- [getGasPrice](EIP1559GasPriceProvider.md#getgasprice)

## Constructors

### constructor

• **new EIP1559GasPriceProvider**(`provider`, `priorityFeePercentile?`, `blocksToConsider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `provider` | `JsonRpcProvider` | `undefined` |
| `priorityFeePercentile` | `number` | `DEFAULT_PRIORITY_FEE_PERCENTILE` |
| `blocksToConsider` | `number` | `DEFAULT_BLOCKS_TO_LOOK_BACK` |

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[constructor](IGasPriceProvider.md#constructor)

#### Defined in

[src/providers/eip-1559-gas-price-provider.ts:38](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eip-1559-gas-price-provider.ts#L38)

## Properties

### blocksToConsider

• `Private` **blocksToConsider**: `number` = `DEFAULT_BLOCKS_TO_LOOK_BACK`

#### Defined in

[src/providers/eip-1559-gas-price-provider.ts:41](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eip-1559-gas-price-provider.ts#L41)

___

### priorityFeePercentile

• `Private` **priorityFeePercentile**: `number` = `DEFAULT_PRIORITY_FEE_PERCENTILE`

#### Defined in

[src/providers/eip-1559-gas-price-provider.ts:40](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eip-1559-gas-price-provider.ts#L40)

___

### provider

• `Protected` **provider**: `JsonRpcProvider`

#### Defined in

[src/providers/eip-1559-gas-price-provider.ts:39](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eip-1559-gas-price-provider.ts#L39)

## Methods

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/eip-1559-gas-price-provider.ts:46](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/eip-1559-gas-price-provider.ts#L46)
