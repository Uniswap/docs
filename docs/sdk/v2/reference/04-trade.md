---
id: trade
title: Trade
---

```typescript
constructor(route: Route, amount: CurrencyAmount, tradeType: TradeType)
```

The Trade entity represents a fully specified trade along a route. This entity supplies all the information necessary to craft a router transaction.

## Example

```typescript
import { ChainId, Token, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { Pair, Trade, Route }

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
const HOT_NOT = new Pair(CurrencyAmount.fromRawAmount(HOT, '2000000000000000000'), CurrencyAmount.fromRawAmount(NOT, '1000000000000000000'))
const NOT_TO_HOT = new Route([HOT_NOT], NOT, HOT)

const trade = new Trade(NOT_TO_HOT, CurrencyAmount.fromRawAmount(NOT, '1000000000000000'), TradeType.EXACT_INPUT)
```

## Properties

### route

```typescript
route: Route
```

The [path](route#path) property of the route should be passed as the path parameter to router functions.

### tradeType

```typescript
tradeType: TradeType
```

`TradeType.EXACT_INPUT` corresponds to `swapExact*For*` router functions. `TradeType.EXACT_OUTPUT` corresponds to `swap*ForExact*` router functions.

### inputAmount

```typescript
inputAmount: CurrencyAmount
```

For exact input trades, this value should be passed as amountIn to router functions. For exact output trades, this value should be multiplied by a factor >1, representing slippage tolerance, and passed as amountInMax to router functions.

### outputAmount

```typescript
outputAmount: CurrencyAmount
```

For exact output trades, this value should be passed as amountOut to router functions. For exact input trades, this value should be multiplied by a factor \<1, representing slippage tolerance, and passed as amountOutMin to router functions.

### executionPrice

```typescript
executionPrice: Price
```

The average price that the trade would execute at.

### priceImpact

```typescript
priceImpact: Percent
```

The percent difference between the mid price before the trade and the trade execution price.

## Methods

In the context of the following two methods, slippage refers to the percent difference between the actual price and the trade `executionPrice`.

### minimumAmountOut (since 2.0.4)

```typescript
minimumAmountOut(slippageTolerance: Percent): CurrencyAmount
```

Returns the minimum amount of the output token that should be received from a trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_INPUT`.

### maximumAmountIn (since 2.0.4)

```typescript
maximumAmountIn(slippageTolerance: Percent): CurrencyAmount
```

Returns the maximum amount of the input token that should be spent on the trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_OUTPUT`.

### worstExecutionPrice

Return the execution price after accounting for slippage tolerance

```typescript
worstExecutionPrice(slippageTolerance: Percent): Price
```

## Static methods

These static methods provide ways to construct ideal trades from lists of pairs.
Note these methods do not perform any aggregation across routes, as routes are linear.
It's possible that a better price can be had by combining multiple trades across
different routes.

### exactIn

Constructs an exact in trade with the given amount in and route.

```typescript
Trade.exactIn(route: Route, amountIn: CurrencyAmount): Trade
```

### exactOut

Constructs an exact out trade with the given amount out and route

```typescript
Trade.exactOut(route: Route, amountOut: CurrencyAmount): Trade
```

### bestTradeExactIn

Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
amount to an output token, making at most `maxHops` hops.
Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
the amount in among multiple routes.

```typescript
Trade.bestTradeExactIn(
    pairs: Pair[],
    nextAmountIn: CurrencyAmount,
    currencyOut: Token,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```

### bestTradeExactOut

Similar to the above method but instead targets a fixed output amount given a list of pairs,
and a fixed amount out, returns the top `maxNumResults` trades that go from an input token to an output token amount,
making at most `maxHops` hops. Note this does not consider aggregation, as routes are linear.
It is possible a better route exists by splitting the amountIn among multiple routes.

```typescript
Trade.bestTradeExactOut(
    pairs: Pair[],
    currencyIn: Token,
    nextAmountOut: CurrencyAmount,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```
