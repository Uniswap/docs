[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / TenderlySimulator

# Class: TenderlySimulator

Provider for dry running transactions.

**`Export`**

## Hierarchy

- [`Simulator`](Simulator.md)

  ↳ **`TenderlySimulator`**

## Table of contents

### Constructors

- [constructor](TenderlySimulator.md#constructor)

### Properties

- [chainId](TenderlySimulator.md#chainid)
- [provider](TenderlySimulator.md#provider)
- [tenderlyAccessKey](TenderlySimulator.md#tenderlyaccesskey)
- [tenderlyBaseUrl](TenderlySimulator.md#tenderlybaseurl)
- [tenderlyProject](TenderlySimulator.md#tenderlyproject)
- [tenderlyUser](TenderlySimulator.md#tenderlyuser)
- [v2PoolProvider](TenderlySimulator.md#v2poolprovider)
- [v3PoolProvider](TenderlySimulator.md#v3poolprovider)

### Methods

- [checkTokenApproved](TenderlySimulator.md#checktokenapproved)
- [logTenderlyErrorResponse](TenderlySimulator.md#logtenderlyerrorresponse)
- [simulate](TenderlySimulator.md#simulate)
- [simulateTransaction](TenderlySimulator.md#simulatetransaction)
- [userHasSufficientBalance](TenderlySimulator.md#userhassufficientbalance)

## Constructors

### constructor

• **new TenderlySimulator**(`chainId`, `tenderlyBaseUrl`, `tenderlyUser`, `tenderlyProject`, `tenderlyAccessKey`, `v2PoolProvider`, `v3PoolProvider`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `tenderlyBaseUrl` | `string` |
| `tenderlyUser` | `string` |
| `tenderlyProject` | `string` |
| `tenderlyAccessKey` | `string` |
| `v2PoolProvider` | [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md) |
| `v3PoolProvider` | [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md) |
| `provider` | `JsonRpcProvider` |

#### Overrides

[Simulator](Simulator.md).[constructor](Simulator.md#constructor)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:218](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L218)

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

### tenderlyAccessKey

• `Private` **tenderlyAccessKey**: `string`

#### Defined in

[src/providers/tenderly-simulation-provider.ts:214](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L214)

___

### tenderlyBaseUrl

• `Private` **tenderlyBaseUrl**: `string`

#### Defined in

[src/providers/tenderly-simulation-provider.ts:211](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L211)

___

### tenderlyProject

• `Private` **tenderlyProject**: `string`

#### Defined in

[src/providers/tenderly-simulation-provider.ts:213](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L213)

___

### tenderlyUser

• `Private` **tenderlyUser**: `string`

#### Defined in

[src/providers/tenderly-simulation-provider.ts:212](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L212)

___

### v2PoolProvider

• `Private` **v2PoolProvider**: [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:215](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L215)

___

### v3PoolProvider

• `Private` **v3PoolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

#### Defined in

[src/providers/tenderly-simulation-provider.ts:216](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L216)

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

### logTenderlyErrorResponse

▸ `Private` **logTenderlyErrorResponse**(`resp`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resp` | [`TenderlyResponseUniversalRouter`](../modules.md#tenderlyresponseuniversalrouter) |

#### Returns

`void`

#### Defined in

[src/providers/tenderly-simulation-provider.ts:494](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L494)

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

▸ **simulateTransaction**(`fromAddress`, `swapOptions`, `swapRoute`, `l2GasData?`, `providerConfig?`): `Promise`<[`SwapRoute`](../modules.md#swaproute)\>

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

[src/providers/tenderly-simulation-provider.ts:237](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/tenderly-simulation-provider.ts#L237)

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
