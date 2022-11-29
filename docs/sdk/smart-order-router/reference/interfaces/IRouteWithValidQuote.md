[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IRouteWithValidQuote

# Interface: IRouteWithValidQuote<Route\>

Represents a route, a quote for swapping some amount on it, and other
metadata used by the routing algorithm.

**`Export`**

**`Interface`**

IRouteWithValidQuote

## Type parameters

| Name | Type |
| :------ | :------ |
| `Route` | extends [`V3Route`](../classes/V3Route.md) \| [`V2Route`](../classes/V2Route.md) \| [`MixedRoute`](../classes/MixedRoute.md) |

## Table of contents

### Properties

- [amount](IRouteWithValidQuote.md#amount)
- [gasCostInToken](IRouteWithValidQuote.md#gascostintoken)
- [gasCostInUSD](IRouteWithValidQuote.md#gascostinusd)
- [gasEstimate](IRouteWithValidQuote.md#gasestimate)
- [percent](IRouteWithValidQuote.md#percent)
- [poolAddresses](IRouteWithValidQuote.md#pooladdresses)
- [quote](IRouteWithValidQuote.md#quote)
- [quoteAdjustedForGas](IRouteWithValidQuote.md#quoteadjustedforgas)
- [route](IRouteWithValidQuote.md#route)
- [tokenPath](IRouteWithValidQuote.md#tokenpath)
- [tradeType](IRouteWithValidQuote.md#tradetype)

## Properties

### amount

• **amount**: [`CurrencyAmount`](../classes/CurrencyAmount.md)

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:25](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L25)

___

### gasCostInToken

• **gasCostInToken**: [`CurrencyAmount`](../classes/CurrencyAmount.md)

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:33](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L33)

___

### gasCostInUSD

• **gasCostInUSD**: [`CurrencyAmount`](../classes/CurrencyAmount.md)

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:34](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L34)

___

### gasEstimate

• **gasEstimate**: `BigNumber`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:31](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L31)

___

### percent

• **percent**: `number`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:26](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L26)

___

### poolAddresses

• **poolAddresses**: `string`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:36](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L36)

___

### quote

• **quote**: [`CurrencyAmount`](../classes/CurrencyAmount.md)

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:29](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L29)

___

### quoteAdjustedForGas

• **quoteAdjustedForGas**: [`CurrencyAmount`](../classes/CurrencyAmount.md)

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:28](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L28)

___

### route

• **route**: `Route`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L30)

___

### tokenPath

• **tokenPath**: `Token`[]

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:37](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L37)

___

### tradeType

• **tradeType**: `TradeType`

#### Defined in

[src/routers/alpha-router/entities/route-with-valid-quote.ts:35](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/entities/route-with-valid-quote.ts#L35)
