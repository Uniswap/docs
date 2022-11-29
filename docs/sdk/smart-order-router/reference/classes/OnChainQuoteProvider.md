[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / OnChainQuoteProvider

# Class: OnChainQuoteProvider

Computes on chain quotes for swaps. For pure V3 routes, quotes are computed on-chain using
the 'QuoterV2' smart contract. For exactIn mixed and V2 routes, quotes are computed using the 'MixedRouteQuoterV1' contract
This is because computing quotes off-chain would require fetching all the tick data for each pool, which is a lot of data.

To minimize the number of requests for quotes we use a Multicall contract. Generally
the number of quotes to fetch exceeds the maximum we can fit in a single multicall
while staying under gas limits, so we also batch these quotes across multiple multicalls.

The biggest challenge with the quote provider is dealing with various gas limits.
Each provider sets a limit on the amount of gas a call can consume (on Infura this
is approximately 10x the block max size), so we must ensure each multicall does not
exceed this limit. Additionally, each quote on V3 can consume a large number of gas if
the pool lacks liquidity and the swap would cause all the ticks to be traversed.

To ensure we don't exceed the node's call limit, we limit the gas used by each quote to
a specific value, and we limit the number of quotes in each multicall request. Users of this
class should set BatchParams such that multicallChunk * gasLimitPerCall is less than their node
providers total gas limit per call.

**`Export`**

## Implements

- [`IOnChainQuoteProvider`](../interfaces/IOnChainQuoteProvider.md)

## Table of contents

### Constructors

- [constructor](OnChainQuoteProvider.md#constructor)

### Properties

- [batchParams](OnChainQuoteProvider.md#batchparams)
- [blockNumberConfig](OnChainQuoteProvider.md#blocknumberconfig)
- [chainId](OnChainQuoteProvider.md#chainid)
- [gasErrorFailureOverride](OnChainQuoteProvider.md#gaserrorfailureoverride)
- [multicall2Provider](OnChainQuoteProvider.md#multicall2provider)
- [provider](OnChainQuoteProvider.md#provider)
- [quoterAddressOverride](OnChainQuoteProvider.md#quoteraddressoverride)
- [retryOptions](OnChainQuoteProvider.md#retryoptions)
- [successRateFailureOverrides](OnChainQuoteProvider.md#successratefailureoverrides)

### Methods

- [getQuoterAddress](OnChainQuoteProvider.md#getquoteraddress)
- [getQuotesManyData](OnChainQuoteProvider.md#getquotesmanydata)
- [getQuotesManyExactIn](OnChainQuoteProvider.md#getquotesmanyexactin)
- [getQuotesManyExactOut](OnChainQuoteProvider.md#getquotesmanyexactout)
- [partitionQuotes](OnChainQuoteProvider.md#partitionquotes)
- [processQuoteResults](OnChainQuoteProvider.md#processquoteresults)
- [validateBlockNumbers](OnChainQuoteProvider.md#validateblocknumbers)
- [validateRoutes](OnChainQuoteProvider.md#validateroutes)
- [validateSuccessRate](OnChainQuoteProvider.md#validatesuccessrate)

## Constructors

### constructor

• **new OnChainQuoteProvider**(`chainId`, `provider`, `multicall2Provider`, `retryOptions?`, `batchParams?`, `gasErrorFailureOverride?`, `successRateFailureOverrides?`, `blockNumberConfig?`, `quoterAddressOverride?`)

Creates an instance of OnChainQuoteProvider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | The chain to get quotes for. |
| `provider` | `BaseProvider` | The web 3 provider. |
| `multicall2Provider` | [`UniswapMulticallProvider`](UniswapMulticallProvider.md) | The multicall provider to use to get the quotes on-chain. Only supports the Uniswap Multicall contract as it needs the gas limitting functionality. |
| `retryOptions` | `Options` | The retry options for each call to the multicall. |
| `batchParams` | [`BatchParams`](../modules.md#batchparams) | The parameters for each batched call to the multicall. |
| `gasErrorFailureOverride` | [`FailureOverrides`](../modules.md#failureoverrides) | The gas and chunk parameters to use when retrying a batch that failed due to out of gas. |
| `successRateFailureOverrides` | [`FailureOverrides`](../modules.md#failureoverrides) | The parameters for retries when we fail to get quotes. |
| `blockNumberConfig` | [`BlockNumberConfig`](../modules.md#blocknumberconfig) | Parameters for adjusting which block we get quotes from, and how to handle block header not found errors. |
| `quoterAddressOverride?` | `string` | Overrides the address of the quoter contract to use. |

#### Defined in

[src/providers/on-chain-quote-provider.ts:265](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L265)

## Properties

### batchParams

• `Protected` **batchParams**: [`BatchParams`](../modules.md#batchparams)

The parameters for each batched call to the multicall.

#### Defined in

[src/providers/on-chain-quote-provider.ts:275](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L275)

___

### blockNumberConfig

• `Protected` **blockNumberConfig**: [`BlockNumberConfig`](../modules.md#blocknumberconfig)

Parameters for adjusting which block we get quotes from, and how to handle block header not found errors.

#### Defined in

[src/providers/on-chain-quote-provider.ts:288](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L288)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

The chain to get quotes for.

#### Defined in

[src/providers/on-chain-quote-provider.ts:266](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L266)

___

### gasErrorFailureOverride

• `Protected` **gasErrorFailureOverride**: [`FailureOverrides`](../modules.md#failureoverrides)

The gas and chunk parameters to use when retrying a batch that failed due to out of gas.

#### Defined in

[src/providers/on-chain-quote-provider.ts:280](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L280)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`UniswapMulticallProvider`](UniswapMulticallProvider.md)

The multicall provider to use to get the quotes on-chain.
Only supports the Uniswap Multicall contract as it needs the gas limitting functionality.

#### Defined in

[src/providers/on-chain-quote-provider.ts:269](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L269)

___

### provider

• `Protected` **provider**: `BaseProvider`

The web 3 provider.

#### Defined in

[src/providers/on-chain-quote-provider.ts:267](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L267)

___

### quoterAddressOverride

• `Protected` `Optional` **quoterAddressOverride**: `string`

Overrides the address of the quoter contract to use.

#### Defined in

[src/providers/on-chain-quote-provider.ts:292](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L292)

___

### retryOptions

• `Protected` **retryOptions**: `Options`

The retry options for each call to the multicall.

#### Defined in

[src/providers/on-chain-quote-provider.ts:270](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L270)

___

### successRateFailureOverrides

• `Protected` **successRateFailureOverrides**: [`FailureOverrides`](../modules.md#failureoverrides)

The parameters for retries when we fail to get quotes.

#### Defined in

[src/providers/on-chain-quote-provider.ts:284](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L284)

## Methods

### getQuoterAddress

▸ `Private` **getQuoterAddress**(`useMixedRouteQuoter`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `useMixedRouteQuoter` | `boolean` |

#### Returns

`string`

#### Defined in

[src/providers/on-chain-quote-provider.ts:295](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L295)

___

### getQuotesManyData

▸ `Private` **getQuotesManyData**<`TRoute`\>(`amounts`, `routes`, `functionName`, `_providerConfig?`): `Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](V3Route.md) \| [`V2Route`](V2Route.md) \| [`MixedRoute`](MixedRoute.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `routes` | `TRoute`[] |
| `functionName` | ``"quoteExactInput"`` \| ``"quoteExactOutput"`` |
| `_providerConfig?` | `ProviderConfig` |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

#### Defined in

[src/providers/on-chain-quote-provider.ts:345](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L345)

___

### getQuotesManyExactIn

▸ **getQuotesManyExactIn**<`TRoute`\>(`amountIns`, `routes`, `providerConfig?`): `Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For every route, gets an exactIn quotes for every amount provided.

**`Notice`**

While passing in exactIn V2Routes is supported, we recommend using the V2QuoteProvider to compute off chain quotes for V2 whenever possible

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](V3Route.md) \| [`V2Route`](V2Route.md) \| [`MixedRoute`](MixedRoute.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountIns` | [`CurrencyAmount`](CurrencyAmount.md)[] | The amounts to get quotes for. |
| `routes` | `TRoute`[] | The routes to get quotes for. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For each route returns a RouteWithQuotes object that contains all the quotes.

The blockNumber used when generating the quotes.

#### Implementation of

[IOnChainQuoteProvider](../interfaces/IOnChainQuoteProvider.md).[getQuotesManyExactIn](../interfaces/IOnChainQuoteProvider.md#getquotesmanyexactin)

#### Defined in

[src/providers/on-chain-quote-provider.ts:311](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L311)

___

### getQuotesManyExactOut

▸ **getQuotesManyExactOut**<`TRoute`\>(`amountOuts`, `routes`, `providerConfig?`): `Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For every route, gets ane exactOut quote for every amount provided.

**`Notice`**

This does not support quotes for MixedRoutes (routes with both V3 and V2 pools/pairs) or pure V2 routes

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](V3Route.md)<`TRoute`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountOuts` | [`CurrencyAmount`](CurrencyAmount.md)[] | The amounts to get quotes for. |
| `routes` | `TRoute`[] | The routes to get quotes for. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For each route returns a RouteWithQuotes object that contains all the quotes.

The blockNumber used when generating the quotes.

#### Implementation of

[IOnChainQuoteProvider](../interfaces/IOnChainQuoteProvider.md).[getQuotesManyExactOut](../interfaces/IOnChainQuoteProvider.md#getquotesmanyexactout)

#### Defined in

[src/providers/on-chain-quote-provider.ts:329](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L329)

___

### partitionQuotes

▸ `Private` **partitionQuotes**(`quoteStates`): [`QuoteBatchSuccess`[], `QuoteBatchFailed`[], `QuoteBatchPending`[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `quoteStates` | `QuoteBatchState`[] |

#### Returns

[`QuoteBatchSuccess`[], `QuoteBatchFailed`[], `QuoteBatchPending`[]]

#### Defined in

[src/providers/on-chain-quote-provider.ts:808](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L808)

___

### processQuoteResults

▸ `Private` **processQuoteResults**<`TRoute`\>(`quoteResults`, `routes`, `amounts`): [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](V3Route.md) \| [`V2Route`](V2Route.md) \| [`MixedRoute`](MixedRoute.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `quoteResults` | [`Result`](../modules.md#result)<[`BigNumber`, `BigNumber`[], `number`[], `BigNumber`]\>[] |
| `routes` | `TRoute`[] |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |

#### Returns

[`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]

#### Defined in

[src/providers/on-chain-quote-provider.ts:841](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L841)

___

### validateBlockNumbers

▸ `Private` **validateBlockNumbers**(`successfulQuoteStates`, `totalCalls`, `gasLimitOverride?`): ``null`` \| [`BlockConflictError`](BlockConflictError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `successfulQuoteStates` | `QuoteBatchSuccess`[] |
| `totalCalls` | `number` |
| `gasLimitOverride?` | `number` |

#### Returns

``null`` \| [`BlockConflictError`](BlockConflictError.md)

#### Defined in

[src/providers/on-chain-quote-provider.ts:928](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L928)

___

### validateRoutes

▸ `Protected` **validateRoutes**(`routes`, `functionName`, `useMixedRouteQuoter`): `void`

Throw an error for incorrect routes / function combinations

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routes` | ([`V3Route`](V3Route.md) \| [`V2Route`](V2Route.md) \| [`MixedRoute`](MixedRoute.md))[] | Any combination of V3, V2, and Mixed routes. |
| `functionName` | `string` |  |
| `useMixedRouteQuoter` | `boolean` | true if there are ANY V2Routes or MixedRoutes in the routes parameter |

#### Returns

`void`

#### Defined in

[src/providers/on-chain-quote-provider.ts:997](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L997)

___

### validateSuccessRate

▸ `Protected` **validateSuccessRate**(`allResults`, `haveRetriedForSuccessRate`): `void` \| [`SuccessRateError`](SuccessRateError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `allResults` | [`Result`](../modules.md#result)<[`BigNumber`, `BigNumber`[], `number`[], `BigNumber`]\>[] |
| `haveRetriedForSuccessRate` | `boolean` |

#### Returns

`void` \| [`SuccessRateError`](SuccessRateError.md)

#### Defined in

[src/providers/on-chain-quote-provider.ts:965](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L965)
