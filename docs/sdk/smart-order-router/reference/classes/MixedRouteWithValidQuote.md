[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / MixedRouteWithValidQuote

# Class: MixedRouteWithValidQuote

Represents a quote for swapping on a Mixed Route. Contains all information
such as the route used, the amount specified by the user, the type of quote
(exact in or exact out), the quote itself, and gas estimates.

**`Export`**

## Implements

- [`IMixedRouteWithValidQuote`](../modules.md#imixedroutewithvalidquote)

## Table of contents

### Constructors

- [constructor](MixedRouteWithValidQuote.md#constructor)

### Properties

- [amount](MixedRouteWithValidQuote.md#amount)
- [gasCostInToken](MixedRouteWithValidQuote.md#gascostintoken)
- [gasCostInUSD](MixedRouteWithValidQuote.md#gascostinusd)
- [gasEstimate](MixedRouteWithValidQuote.md#gasestimate)
- [gasModel](MixedRouteWithValidQuote.md#gasmodel)
- [initializedTicksCrossedList](MixedRouteWithValidQuote.md#initializedtickscrossedlist)
- [percent](MixedRouteWithValidQuote.md#percent)
- [poolAddresses](MixedRouteWithValidQuote.md#pooladdresses)
- [protocol](MixedRouteWithValidQuote.md#protocol)
- [quote](MixedRouteWithValidQuote.md#quote)
- [quoteAdjustedForGas](MixedRouteWithValidQuote.md#quoteadjustedforgas)
- [quoteToken](MixedRouteWithValidQuote.md#quotetoken)
- [quoterGasEstimate](MixedRouteWithValidQuote.md#quotergasestimate)
- [rawQuote](MixedRouteWithValidQuote.md#rawquote)
- [route](MixedRouteWithValidQuote.md#route)
- [sqrtPriceX96AfterList](MixedRouteWithValidQuote.md#sqrtpricex96afterlist)
- [tokenPath](MixedRouteWithValidQuote.md#tokenpath)
- [tradeType](MixedRouteWithValidQuote.md#tradetype)

### Methods

- [toString](MixedRouteWithValidQuote.md#tostring)

## Constructors

### constructor

• **new MixedRouteWithValidQuote**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MixedRouteWithValidQuoteParams`](../modules.md#mixedroutewithvalidquoteparams) |

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:298](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L298)

## Properties

### amount

• **amount**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IMixedRouteWithValidQuote.amount

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:272](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L272)

___

### gasCostInToken

• **gasCostInToken**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IMixedRouteWithValidQuote.gasCostInToken

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:284](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L284)

___

### gasCostInUSD

• **gasCostInUSD**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IMixedRouteWithValidQuote.gasCostInUSD

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:285](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L285)

___

### gasEstimate

• **gasEstimate**: `BigNumber`

#### Implementation of

IMixedRouteWithValidQuote.gasEstimate

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:283](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L283)

___

### gasModel

• **gasModel**: [`IGasModel`](../modules.md#igasmodel)<[`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)\>

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:282](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L282)

___

### initializedTicksCrossedList

• **initializedTicksCrossedList**: `number`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:277](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L277)

___

### percent

• **percent**: `number`

#### Implementation of

IMixedRouteWithValidQuote.percent

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:279](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L279)

___

### poolAddresses

• **poolAddresses**: `string`[]

#### Implementation of

IMixedRouteWithValidQuote.poolAddresses

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:287](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L287)

___

### protocol

• `Readonly` **protocol**: `MIXED` = `Protocol.MIXED`

#### Implementation of

IMixedRouteWithValidQuote.protocol

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:271](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L271)

___

### quote

• **quote**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IMixedRouteWithValidQuote.quote

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:274](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L274)

___

### quoteAdjustedForGas

• **quoteAdjustedForGas**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IMixedRouteWithValidQuote.quoteAdjustedForGas

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:275](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L275)

___

### quoteToken

• **quoteToken**: `Token`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:281](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L281)

___

### quoterGasEstimate

• **quoterGasEstimate**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:278](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L278)

___

### rawQuote

• **rawQuote**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:273](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L273)

___

### route

• **route**: [`MixedRoute`](MixedRoute.md)

#### Implementation of

IMixedRouteWithValidQuote.route

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:280](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L280)

___

### sqrtPriceX96AfterList

• **sqrtPriceX96AfterList**: `BigNumber`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:276](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L276)

___

### tokenPath

• **tokenPath**: `Token`[]

#### Implementation of

IMixedRouteWithValidQuote.tokenPath

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:288](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L288)

___

### tradeType

• **tradeType**: `TradeType`

#### Implementation of

IMixedRouteWithValidQuote.tradeType

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:286](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L286)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:290](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L290)
