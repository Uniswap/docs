[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2QuoteProvider

# Class: V2QuoteProvider

Computes quotes for V2 off-chain. Quotes are computed using the balances
of the pools within each route provided.

**`Export`**

## Implements

- [`IV2QuoteProvider`](../interfaces/IV2QuoteProvider.md)

## Table of contents

### Constructors

- [constructor](V2QuoteProvider.md#constructor)

### Methods

- [getQuotes](V2QuoteProvider.md#getquotes)
- [getQuotesManyExactIn](V2QuoteProvider.md#getquotesmanyexactin)
- [getQuotesManyExactOut](V2QuoteProvider.md#getquotesmanyexactout)

## Constructors

### constructor

• **new V2QuoteProvider**()

#### Defined in

[src/providers/v2/quote-provider.ts:42](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L42)

## Methods

### getQuotes

▸ `Private` **getQuotes**(`amounts`, `routes`, `tradeType`): `Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `routes` | [`V2Route`](V2Route.md)[] |
| `tradeType` | `TradeType` |

#### Returns

`Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Defined in

[src/providers/v2/quote-provider.ts:59](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L59)

___

### getQuotesManyExactIn

▸ **getQuotesManyExactIn**(`amountIns`, `routes`): `Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountIns` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `routes` | [`V2Route`](V2Route.md)[] |

#### Returns

`Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Implementation of

[IV2QuoteProvider](../interfaces/IV2QuoteProvider.md).[getQuotesManyExactIn](../interfaces/IV2QuoteProvider.md#getquotesmanyexactin)

#### Defined in

[src/providers/v2/quote-provider.ts:45](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L45)

___

### getQuotesManyExactOut

▸ **getQuotesManyExactOut**(`amountOuts`, `routes`): `Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountOuts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `routes` | [`V2Route`](V2Route.md)[] |

#### Returns

`Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Implementation of

[IV2QuoteProvider](../interfaces/IV2QuoteProvider.md).[getQuotesManyExactOut](../interfaces/IV2QuoteProvider.md#getquotesmanyexactout)

#### Defined in

[src/providers/v2/quote-provider.ts:52](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L52)
