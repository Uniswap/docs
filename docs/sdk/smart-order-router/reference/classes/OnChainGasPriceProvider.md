[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / OnChainGasPriceProvider

# Class: OnChainGasPriceProvider

Gets gas prices on chain. If the chain supports EIP-1559 and has the feeHistory API,
uses the EIP1559 provider. Otherwise it will use a legacy provider that uses eth_gasPrice

**`Export`**

## Hierarchy

- [`IGasPriceProvider`](IGasPriceProvider.md)

  ↳ **`OnChainGasPriceProvider`**

## Table of contents

### Constructors

- [constructor](OnChainGasPriceProvider.md#constructor)

### Properties

- [chainId](OnChainGasPriceProvider.md#chainid)
- [eip1559GasPriceProvider](OnChainGasPriceProvider.md#eip1559gaspriceprovider)
- [eipChains](OnChainGasPriceProvider.md#eipchains)
- [legacyGasPriceProvider](OnChainGasPriceProvider.md#legacygaspriceprovider)

### Methods

- [getGasPrice](OnChainGasPriceProvider.md#getgasprice)

## Constructors

### constructor

• **new OnChainGasPriceProvider**(`chainId`, `eip1559GasPriceProvider`, `legacyGasPriceProvider`, `eipChains?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `eip1559GasPriceProvider` | [`EIP1559GasPriceProvider`](EIP1559GasPriceProvider.md) | `undefined` |
| `legacyGasPriceProvider` | [`LegacyGasPriceProvider`](LegacyGasPriceProvider.md) | `undefined` |
| `eipChains` | [`ChainId`](../enums/ChainId.md)[] | `DEFAULT_EIP_1559_SUPPORTED_CHAINS` |

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[constructor](IGasPriceProvider.md#constructor)

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:25](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L25)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:26](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L26)

___

### eip1559GasPriceProvider

• `Protected` **eip1559GasPriceProvider**: [`EIP1559GasPriceProvider`](EIP1559GasPriceProvider.md)

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L27)

___

### eipChains

• `Protected` **eipChains**: [`ChainId`](../enums/ChainId.md)[] = `DEFAULT_EIP_1559_SUPPORTED_CHAINS`

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:29](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L29)

___

### legacyGasPriceProvider

• `Protected` **legacyGasPriceProvider**: [`LegacyGasPriceProvider`](LegacyGasPriceProvider.md)

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:28](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L28)

## Methods

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Returns

`Promise`<[`GasPrice`](../modules.md#gasprice)\>

#### Overrides

[IGasPriceProvider](IGasPriceProvider.md).[getGasPrice](IGasPriceProvider.md#getgasprice)

#### Defined in

[src/providers/on-chain-gas-price-provider.ts:34](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-gas-price-provider.ts#L34)
