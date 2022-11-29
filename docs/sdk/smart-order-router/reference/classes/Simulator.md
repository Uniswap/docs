[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / Simulator

# Class: Simulator

Provider for dry running transactions.

**`Export`**

## Hierarchy

- **`Simulator`**

  ↳ [`FallbackTenderlySimulator`](FallbackTenderlySimulator.md)

  ↳ [`TenderlySimulator`](TenderlySimulator.md)

## Table of contents

### Constructors

- [constructor](Simulator.md#constructor)

### Properties

- [chainId](Simulator.md#chainid)
- [provider](Simulator.md#provider)

### Methods

- [checkTokenApproved](Simulator.md#checktokenapproved)
- [simulate](Simulator.md#simulate)
- [simulateTransaction](Simulator.md#simulatetransaction)
- [userHasSufficientBalance](Simulator.md#userhassufficientbalance)

## Constructors

### constructor

• **new Simulator**(`provider`, `chainId`)

Returns a new SwapRoute with simulated gas estimates

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `JsonRpcProvider` |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Defined in

[src/providers/simulation-provider.ts:38](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L38)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/simulation-provider.ts:38](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L38)

___

### provider

• `Protected` **provider**: `JsonRpcProvider`

#### Defined in

[src/providers/simulation-provider.ts:32](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L32)

## Methods

### checkTokenApproved

▸ `Protected` **checkTokenApproved**(`fromAddress`, `inputAmount`, `swapOptions`, `provider`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `inputAmount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `swapOptions` | [`SwapOptions`](../modules.md#swapoptions) |
| `provider` | `JsonRpcProvider` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/providers/simulation-provider.ts:122](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L122)

___

### simulate

▸ **simulate**(`fromAddress`, `swapOptions`, `swapRoute`, `amount`, `quote`, `l2GasData?`, `providerConfig?`): `Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `swapOptions` | [`SwapOptions`](../modules.md#swapoptions) |
| `swapRoute` | [`SwapRoute`](../modules.md#swaproute) |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `quote` | [`CurrencyAmount`](CurrencyAmount.md) |
| `l2GasData?` | `OptimismGasData` \| `ArbitrumGasData` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/providers/simulation-provider.ts:42](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L42)

___

### simulateTransaction

▸ `Protected` `Abstract` **simulateTransaction**(`fromAddress`, `swapOptions`, `swapRoute`, `l2GasData?`, `providerConfig?`): `Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `swapOptions` | [`SwapOptions`](../modules.md#swapoptions) |
| `swapRoute` | [`SwapRoute`](../modules.md#swaproute) |
| `l2GasData?` | `OptimismGasData` \| `ArbitrumGasData` |
| `providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/providers/simulation-provider.ts:75](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L75)

___

### userHasSufficientBalance

▸ `Protected` **userHasSufficientBalance**(`fromAddress`, `tradeType`, `amount`, `quote`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `tradeType` | `TradeType` |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `quote` | [`CurrencyAmount`](CurrencyAmount.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/providers/simulation-provider.ts:83](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L83)
