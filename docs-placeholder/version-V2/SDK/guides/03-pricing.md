---
id: 03-pricing
title: Pricing
tags: SDK, developer-guides, documentation
---

> Looking for a [quickstart](../javascript-sdk/01-quick-start.md)?

Let's talk pricing. This guide will focus on the two most important Uniswap prices: the **mid price** and the **execution price**.

# Mid Price

The mid price, in the context of Uniswap, is the price that reflects the _ratio of reserves in one or more pairs_. There are three ways we can think about this price. Perhaps most simply, it defines the relative value of one token in terms of the other. It also represents the price at which you could theoretically trade an infinitesimal amount (ε) of one token for the other. Finally, it can be interpreted as the current _market-clearing or fair value price_ of the assets.

Let's consider the mid price for DAI-WETH (that is, the amount of DAI per 1 WETH).

## Direct

The simplest way to get the DAI-WETH mid price is to observe the pair directly:

```typescript
import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18
);

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);

const route = new Route([pair], WETH[DAI.chainId]);

console.log(route.midPrice.toSignificant(6)); // 201.306
console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
```

You may be wondering why we have to construct a _route_ to get the mid price, as opposed to simply getting it from the pair (which, after all, includes all the necessary data). The reason is simple: a route forces us to be opinionated about the _direction_ of trading. Routes consist of one or more pairs, and an input token (which fully defines a trading path). In this case, we passed WETH as the input token, meaning we're interested in a WETH -> DAI trade.

Now we understand that the mid price is going to be defined in terms of DAI/WETH. Not to worry though, if we need the WETH/DAI price, we can easily invert.

Finally, you may have noticed that we're formatting the price to 6 significant digits. This is because internally, prices are stored as exact-precision fractions, which can be converted to other representations on demand. For a full list of options, see [Price](../../reference/SDK/06-fractions.md#price).

## Indirect

For the sake of example, let's imagine a direct pair between DAI and WETH _doesn't exist_. In order to get a DAI-WETH mid price we'll need to pick a valid route. Imagine both DAI and WETH have pairs with a third token, USDC. In that case, we can calculate an indirect mid price through the USDC pairs:

```typescript
import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";

const USDC = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6
);
const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18
);

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[ChainId.MAINNET]);
const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC);

const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.MAINNET]);

console.log(route.midPrice.toSignificant(6)); // 202.081
console.log(route.midPrice.invert().toSignificant(6)); // 0.00494851
```

# Execution Price

Mid prices are great representations of the _current_ state of a route, but what about trades? It turns out that it makes sense to define another price, the _execution_ price of a trade, as the ratio of assets sent/received.

Imagine we're interested in trading 1 WETH for DAI:

```typescript
import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
} from "@uniswap/sdk";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18
);

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);

const route = new Route([pair], WETH[DAI.chainId]);

const trade = new Trade(
  route,
  new TokenAmount(WETH[DAI.chainId], "1000000000000000000"),
  TradeType.EXACT_INPUT
);

console.log(trade.executionPrice.toSignificant(6));
console.log(trade.nextMidPrice.toSignificant(6));
```

Notice that we're constructing a trade of 1 WETH for as much DAI as possible, _given the current reserves of the direct pair_. The execution price represents the average DAI/WETH price for this trade. Of course, the reserves of any pair can change every block, which would affect the execution price.

Also notice that we're able to access the _next_ mid price, if the trade were to complete successfully before the reserves changed.
