[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV2QuoteProvider

# Interface: IV2QuoteProvider

## Implemented by

- [`V2QuoteProvider`](../classes/V2QuoteProvider.md)

## Table of contents

### Methods

- [getQuotesManyExactIn](IV2QuoteProvider.md#getquotesmanyexactin)
- [getQuotesManyExactOut](IV2QuoteProvider.md#getquotesmanyexactout)

## Methods

### getQuotesManyExactIn

▸ **getQuotesManyExactIn**(`amountIns`, `routes`): `Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountIns` | [`CurrencyAmount`](../classes/CurrencyAmount.md)[] |
| `routes` | [`V2Route`](../classes/V2Route.md)[] |

#### Returns

`Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Defined in

[src/providers/v2/quote-provider.ts:22](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L22)

___

### getQuotesManyExactOut

▸ **getQuotesManyExactOut**(`amountOuts`, `routes`): `Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountOuts` | [`CurrencyAmount`](../classes/CurrencyAmount.md)[] |
| `routes` | [`V2Route`](../classes/V2Route.md)[] |

#### Returns

`Promise`<{ `routesWithQuotes`: [`V2RouteWithQuotes`](../modules.md#v2routewithquotes)[]  }\>

#### Defined in

[src/providers/v2/quote-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/v2/quote-provider.ts#L27)
