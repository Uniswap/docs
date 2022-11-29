[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IOnChainQuoteProvider

# Interface: IOnChainQuoteProvider

Provider for getting on chain quotes using routes containing V3 pools or V2 pools.

**`Export`**

**`Interface`**

IOnChainQuoteProvider

## Implemented by

- [`OnChainQuoteProvider`](../classes/OnChainQuoteProvider.md)

## Table of contents

### Methods

- [getQuotesManyExactIn](IOnChainQuoteProvider.md#getquotesmanyexactin)
- [getQuotesManyExactOut](IOnChainQuoteProvider.md#getquotesmanyexactout)

## Methods

### getQuotesManyExactIn

▸ **getQuotesManyExactIn**<`TRoute`\>(`amountIns`, `routes`, `providerConfig?`): `Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For every route, gets an exactIn quotes for every amount provided.

**`Notice`**

While passing in exactIn V2Routes is supported, we recommend using the V2QuoteProvider to compute off chain quotes for V2 whenever possible

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](../classes/V3Route.md) \| [`V2Route`](../classes/V2Route.md) \| [`MixedRoute`](../classes/MixedRoute.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountIns` | [`CurrencyAmount`](../classes/CurrencyAmount.md)[] | The amounts to get quotes for. |
| `routes` | `TRoute`[] | The routes to get quotes for. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For each route returns a RouteWithQuotes object that contains all the quotes.

The blockNumber used when generating the quotes.

#### Defined in

[src/providers/on-chain-quote-provider.ts:137](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L137)

___

### getQuotesManyExactOut

▸ **getQuotesManyExactOut**<`TRoute`\>(`amountOuts`, `routes`, `providerConfig?`): `Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For every route, gets ane exactOut quote for every amount provided.

**`Notice`**

This does not support quotes for MixedRoutes (routes with both V3 and V2 pools/pairs) or pure V2 routes

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRoute` | extends [`V3Route`](../classes/V3Route.md)<`TRoute`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountOuts` | [`CurrencyAmount`](../classes/CurrencyAmount.md)[] | The amounts to get quotes for. |
| `routes` | `TRoute`[] | The routes to get quotes for. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `routesWithQuotes`: [`RouteWithQuotes`](../modules.md#routewithquotes)<`TRoute`\>[]  }\>

For each route returns a RouteWithQuotes object that contains all the quotes.

The blockNumber used when generating the quotes.

#### Defined in

[src/providers/on-chain-quote-provider.ts:156](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/on-chain-quote-provider.ts#L156)
