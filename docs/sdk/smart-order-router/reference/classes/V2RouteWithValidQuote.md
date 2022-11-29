[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2RouteWithValidQuote

# Class: V2RouteWithValidQuote

Represents a quote for swapping on a V2 only route. Contains all information
such as the route used, the amount specified by the user, the type of quote
(exact in or exact out), the quote itself, and gas estimates.

**`Export`**

## Implements

- [`IV2RouteWithValidQuote`](../modules.md#iv2routewithvalidquote)

## Table of contents

### Constructors

- [constructor](V2RouteWithValidQuote.md#constructor)

### Properties

- [amount](V2RouteWithValidQuote.md#amount)
- [gasCostInToken](V2RouteWithValidQuote.md#gascostintoken)
- [gasCostInUSD](V2RouteWithValidQuote.md#gascostinusd)
- [gasEstimate](V2RouteWithValidQuote.md#gasestimate)
- [gasModel](V2RouteWithValidQuote.md#gasmodel)
- [percent](V2RouteWithValidQuote.md#percent)
- [poolAddresses](V2RouteWithValidQuote.md#pooladdresses)
- [protocol](V2RouteWithValidQuote.md#protocol)
- [quote](V2RouteWithValidQuote.md#quote)
- [quoteAdjustedForGas](V2RouteWithValidQuote.md#quoteadjustedforgas)
- [quoteToken](V2RouteWithValidQuote.md#quotetoken)
- [rawQuote](V2RouteWithValidQuote.md#rawquote)
- [route](V2RouteWithValidQuote.md#route)
- [tokenPath](V2RouteWithValidQuote.md#tokenpath)
- [tradeType](V2RouteWithValidQuote.md#tradetype)

### Methods

- [toString](V2RouteWithValidQuote.md#tostring)

## Constructors

### constructor

• **new V2RouteWithValidQuote**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`V2RouteWithValidQuoteParams`](../modules.md#v2routewithvalidquoteparams) |

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:102](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L102)

## Properties

### amount

• **amount**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV2RouteWithValidQuote.amount

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:78](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L78)

___

### gasCostInToken

• **gasCostInToken**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV2RouteWithValidQuote.gasCostInToken

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:88](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L88)

___

### gasCostInUSD

• **gasCostInUSD**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV2RouteWithValidQuote.gasCostInUSD

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:89](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L89)

___

### gasEstimate

• **gasEstimate**: `BigNumber`

#### Implementation of

IV2RouteWithValidQuote.gasEstimate

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:87](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L87)

___

### gasModel

• **gasModel**: [`IGasModel`](../modules.md#igasmodel)<[`V2RouteWithValidQuote`](V2RouteWithValidQuote.md)\>

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:86](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L86)

___

### percent

• **percent**: `number`

#### Implementation of

IV2RouteWithValidQuote.percent

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:83](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L83)

___

### poolAddresses

• **poolAddresses**: `string`[]

#### Implementation of

IV2RouteWithValidQuote.poolAddresses

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:91](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L91)

___

### protocol

• `Readonly` **protocol**: `V2` = `Protocol.V2`

#### Implementation of

IV2RouteWithValidQuote.protocol

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:77](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L77)

___

### quote

• **quote**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV2RouteWithValidQuote.quote

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:81](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L81)

___

### quoteAdjustedForGas

• **quoteAdjustedForGas**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV2RouteWithValidQuote.quoteAdjustedForGas

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:82](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L82)

___

### quoteToken

• **quoteToken**: `Token`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:85](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L85)

___

### rawQuote

• **rawQuote**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:80](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L80)

___

### route

• **route**: [`V2Route`](V2Route.md)

#### Implementation of

IV2RouteWithValidQuote.route

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:84](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L84)

___

### tokenPath

• **tokenPath**: `Token`[]

#### Implementation of

IV2RouteWithValidQuote.tokenPath

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:92](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L92)

___

### tradeType

• **tradeType**: `TradeType`

#### Implementation of

IV2RouteWithValidQuote.tradeType

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:90](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L90)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:94](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L94)
