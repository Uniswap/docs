[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3RouteWithValidQuote

# Class: V3RouteWithValidQuote

Represents a quote for swapping on a V3 only route. Contains all information
such as the route used, the amount specified by the user, the type of quote
(exact in or exact out), the quote itself, and gas estimates.

**`Export`**

## Implements

- [`IV3RouteWithValidQuote`](../modules.md#iv3routewithvalidquote)

## Table of contents

### Constructors

- [constructor](V3RouteWithValidQuote.md#constructor)

### Properties

- [amount](V3RouteWithValidQuote.md#amount)
- [gasCostInToken](V3RouteWithValidQuote.md#gascostintoken)
- [gasCostInUSD](V3RouteWithValidQuote.md#gascostinusd)
- [gasEstimate](V3RouteWithValidQuote.md#gasestimate)
- [gasModel](V3RouteWithValidQuote.md#gasmodel)
- [initializedTicksCrossedList](V3RouteWithValidQuote.md#initializedtickscrossedlist)
- [percent](V3RouteWithValidQuote.md#percent)
- [poolAddresses](V3RouteWithValidQuote.md#pooladdresses)
- [protocol](V3RouteWithValidQuote.md#protocol)
- [quote](V3RouteWithValidQuote.md#quote)
- [quoteAdjustedForGas](V3RouteWithValidQuote.md#quoteadjustedforgas)
- [quoteToken](V3RouteWithValidQuote.md#quotetoken)
- [quoterGasEstimate](V3RouteWithValidQuote.md#quotergasestimate)
- [rawQuote](V3RouteWithValidQuote.md#rawquote)
- [route](V3RouteWithValidQuote.md#route)
- [sqrtPriceX96AfterList](V3RouteWithValidQuote.md#sqrtpricex96afterlist)
- [tokenPath](V3RouteWithValidQuote.md#tokenpath)
- [tradeType](V3RouteWithValidQuote.md#tradetype)

### Methods

- [toString](V3RouteWithValidQuote.md#tostring)

## Constructors

### constructor

• **new V3RouteWithValidQuote**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`V3RouteWithValidQuoteParams`](../modules.md#v3routewithvalidquoteparams) |

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:196](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L196)

## Properties

### amount

• **amount**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV3RouteWithValidQuote.amount

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:170](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L170)

___

### gasCostInToken

• **gasCostInToken**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV3RouteWithValidQuote.gasCostInToken

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:182](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L182)

___

### gasCostInUSD

• **gasCostInUSD**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV3RouteWithValidQuote.gasCostInUSD

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:183](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L183)

___

### gasEstimate

• **gasEstimate**: `BigNumber`

#### Implementation of

IV3RouteWithValidQuote.gasEstimate

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:181](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L181)

___

### gasModel

• **gasModel**: [`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:180](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L180)

___

### initializedTicksCrossedList

• **initializedTicksCrossedList**: `number`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:175](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L175)

___

### percent

• **percent**: `number`

#### Implementation of

IV3RouteWithValidQuote.percent

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:177](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L177)

___

### poolAddresses

• **poolAddresses**: `string`[]

#### Implementation of

IV3RouteWithValidQuote.poolAddresses

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:185](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L185)

___

### protocol

• `Readonly` **protocol**: `V3` = `Protocol.V3`

#### Implementation of

IV3RouteWithValidQuote.protocol

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:169](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L169)

___

### quote

• **quote**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV3RouteWithValidQuote.quote

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:172](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L172)

___

### quoteAdjustedForGas

• **quoteAdjustedForGas**: [`CurrencyAmount`](CurrencyAmount.md)

#### Implementation of

IV3RouteWithValidQuote.quoteAdjustedForGas

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:173](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L173)

___

### quoteToken

• **quoteToken**: `Token`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:179](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L179)

___

### quoterGasEstimate

• **quoterGasEstimate**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:176](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L176)

___

### rawQuote

• **rawQuote**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:171](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L171)

___

### route

• **route**: [`V3Route`](V3Route.md)

#### Implementation of

IV3RouteWithValidQuote.route

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:178](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L178)

___

### sqrtPriceX96AfterList

• **sqrtPriceX96AfterList**: `BigNumber`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:174](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L174)

___

### tokenPath

• **tokenPath**: `Token`[]

#### Implementation of

IV3RouteWithValidQuote.tokenPath

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:186](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L186)

___

### tradeType

• **tradeType**: `TradeType`

#### Implementation of

IV3RouteWithValidQuote.tradeType

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:184](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L184)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:188](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L188)
