[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / FallbackTenderlySimulator

# Class: FallbackTenderlySimulator

Provider for dry running transactions.

**`Export`**

## Hierarchy

- [`Simulator`](Simulator.md)

  ↳ **`FallbackTenderlySimulator`**

## Table of contents

### Constructors

- [constructor](FallbackTenderlySimulator.md#constructor)

### Properties

- [chainId](FallbackTenderlySimulator.md#chainid)
- [provider](FallbackTenderlySimulator.md#provider)
- [tenderlySimulator](FallbackTenderlySimulator.md#tenderlysimulator)
- [v2PoolProvider](FallbackTenderlySimulator.md#v2poolprovider)
- [v3PoolProvider](FallbackTenderlySimulator.md#v3poolprovider)

### Methods

- [checkTokenApproved](FallbackTenderlySimulator.md#checktokenapproved)
- [ethEstimateGas](FallbackTenderlySimulator.md#ethestimategas)
- [simulate](FallbackTenderlySimulator.md#simulate)
- [simulateTransaction](FallbackTenderlySimulator.md#simulatetransaction)
- [userHasSufficientBalance](FallbackTenderlySimulator.md#userhassufficientbalance)

## Constructors

### constructor

• **new FallbackTenderlySimulator**(`chainId`, `tenderlyBaseUrl`, `tenderlyUser`, `tenderlyProject`, `tenderlyAccessKey`, `provider`, `v2PoolProvider`, `v3PoolProvider`, `tenderlySimulator?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `tenderlyBaseUrl` | `string` |
| `tenderlyUser` | `string` |
| `tenderlyProject` | `string` |
| `tenderlyAccessKey` | `string` |
| `provider` | `JsonRpcProvider` |
| `v2PoolProvider` | [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md) |
| `v3PoolProvider` | [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md) |
| `tenderlySimulator?` | [`TenderlySimulator`](TenderlySimulator.md) |

#### Overrides

[Simulator](Simulator.md).[constructor](Simulator.md#constructor)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:64](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L64)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Inherited from

[Simulator](Simulator.md).[chainId](Simulator.md#chainid)

#### Defined in

[src/providers/simulation-provider.ts:38](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L38)

___

### provider

• `Protected` **provider**: `JsonRpcProvider`

#### Inherited from

[Simulator](Simulator.md).[provider](Simulator.md#provider)

#### Defined in

[src/providers/simulation-provider.ts:32](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L32)

___

### tenderlySimulator

• `Private` **tenderlySimulator**: [`TenderlySimulator`](TenderlySimulator.md)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:60](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L60)

___

### v2PoolProvider

• `Private` **v2PoolProvider**: [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:62](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L62)

___

### v3PoolProvider

• `Private` **v3PoolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:61](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L61)

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

#### Inherited from

[Simulator](Simulator.md).[checkTokenApproved](Simulator.md#checktokenapproved)

#### Defined in

[src/providers/simulation-provider.ts:122](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L122)

___

### ethEstimateGas

▸ `Private` **ethEstimateGas**(`fromAddress`, `swapOptions`, `route`, `l2GasData?`): `Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `swapOptions` | [`SwapOptions`](../modules.md#swapoptions) |
| `route` | [`SwapRoute`](../modules.md#swaproute) |
| `l2GasData?` | `OptimismGasData` \| `ArbitrumGasData` |

#### Returns

`Promise`<[`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/providers/tenderly-simulation-provider.ts:144](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L144)

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

#### Inherited from

[Simulator](Simulator.md).[simulate](Simulator.md#simulate)

#### Defined in

[src/providers/simulation-provider.ts:42](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L42)

___

### simulateTransaction

▸ `Protected` **simulateTransaction**(`fromAddress`, `swapOptions`, `swapRoute`, `l2GasData?`, `providerConfig?`): `Promise`<[`SwapRoute`](../modules.md#swaproute)\>

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

#### Overrides

[Simulator](Simulator.md).[simulateTransaction](Simulator.md#simulatetransaction)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:92](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L92)

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

#### Inherited from

[Simulator](Simulator.md).[userHasSufficientBalance](Simulator.md#userhassufficientbalance)

#### Defined in

[src/providers/simulation-provider.ts:83](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/simulation-provider.ts#L83)
