---
id: trade
title: Trade
---

```typescript
constructor(route: Route, amount: TokenAmount, tradeType: TradeType)
```

The Trade entity represents a fully specified trade along a route. This entity supplies all the information necessary to craft a router transaction.

# Example

```typescript
import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
const HOT_NOT = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))
const NOT_TO_HOT = new Route([HOT_NOT], NOT)

const trade = new Trade(NOT_TO_HOT, new TokenAmount(NOT, '1000000000000000'), TradeType.EXACT_INPUT)
```

# Properties

## route

```typescript
route: Route
```

The [path](route#path) property of the route should be passed as the path parameter to router functions.

## tradeType

```typescript
tradeType: TradeType
```

`TradeType.EXACT_INPUT` corresponds to `swapExact*For*` router functions. `TradeType.EXACT_OUTPUT` corresponds to `swap*ForExact*` router functions.

## inputAmount

```typescript
inputAmount: TokenAmount
```

For exact input trades, this value should be passed as amountIn to router functions. For exact output trades, this value should be multiplied by a factor >1, representing slippage tolerance, and passed as amountInMax to router functions.

## outputAmount

```typescript
outputAmount: TokenAmount
```

For exact output trades, this value should be passed as amountOut to router functions. For exact input trades, this value should be multiplied by a factor <1, representing slippage tolerance, and passed as amountOutMin to router functions.

## executionPrice

```typescript
executionPrice: Price
```

The average price that the trade would execute at.

## nextMidPrice

```typescript
nextMidPrice: Price
```

What the new mid price would be if the trade were to execute.

## slippage

```typescript
slippage: Percent
```

The slippage incurred by the trade.

- Strictly > .30%.

# Methods

In the context of the following two methods, slippage refers to the percent difference between the actual price and the trade `executionPrice`.

## minimumAmountOut (since 2.0.4)

```typescript
minimumAmountOut(slippageTolerance: Percent): TokenAmount
```

Returns the minimum amount of the output token that should be received from a trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_INPUT`.

## maximumAmountIn (since 2.0.4)

```typescript
maximumAmountIn(slippageTolerance: Percent): TokenAmount
```

Returns the maximum amount of the input token that should be spent on the trade, given the slippage tolerance.

Useful when constructing a transaction for a trade of type `EXACT_OUTPUT`.

# Static methods

These static methods provide ways to construct ideal trades from lists of pairs.
Note these methods do not perform any aggregation across routes, as routes are linear.
It's possible that a better price can be had by combining multiple trades across
different routes.

## bestTradeExactIn

Given a list of pairs, a fixed amount in, and token amount out,
this method returns the best `maxNumResults` trades that swap
an input token amount to an output token, making at most `maxHops` hops.
The returned trades are sorted by output amount, in decreasing order, and
all share the given input amount.

```typescript
Trade.bestTradeExactIn(
    pairs: Pair[],
    amountIn: TokenAmount,
    tokenOut: Token,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```

## bestTradeExactOut

Similar to the above method, but targets a fixed output token amount.
The returned trades are sorted by input amount, in increasing order,
and all share the given output amount.

```typescript
Trade.bestTradeExactOut(
    pairs: Pair[],
    tokenIn: Token,
    amountOut: TokenAmount,
    { maxNumResults = 3, maxHops = 3 }: BestTradeOptions = {}): Trade[]
```
