---
id: routing
title: Routing a Swap
---

## Introduction

This guide will cover how to use Uniswap's smart order router to compute optimal routes and execute swaps. Rather than trading between a single pool, smart routing may use multiple hops (as many as needed) to ensure that the end result of the swap is the optimal price. It is based on the [routing code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/routing), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/routing/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will trade between **ETH and USDC**, but you can configure your example to us any two currencies and amount of input currency.

The guide will **cover**:

1. Creating a router instance
2. Creating a route
3. Swapping using a route

At the end of the guide, we should be able to create a route and and execute a swap between any two currencies tokens using the example's included UI.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/smart-order-router`](https://www.npmjs.com/package/@uniswap/smart-order-router)

The core code of this guide can be found in [`routing.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/routing/src/libs/routing.ts)

## Creating a router instance

To compute our route, we will use the `@uniswap/smart-order-router` package, specifically the `AlphaRouter` class which requires a `chainId` and a `provider`. Note that routing is not supported for local forks, so we will use a mainnet provider even when swapping on a local fork:

```typescript reference title="Instantiating an AlphaRouter" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/38ff60aeb3ad8ff839db9e7952a726ca7d6b68fd/v3-sdk/routing/src/libs/routing.ts#L24-L27
```

## Creating a route

Next, we will create our options conforming to the `SwapOptionsSwapRouter02` interface, defining the wallet to use, slippage tolerance, and deadline for the transaction:

```typescript reference title="Routing Options" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/38ff60aeb3ad8ff839db9e7952a726ca7d6b68fd/v3-sdk/routing/src/libs/routing.ts#L29-L34
```

Using these options, we can now create a trade (`TradeType.EXACT_INPUT` or `TradeType.EXACT_OUTPUT`) with the currency and the input amount to use to get a quote. For this example, we'll use an `EXACT_INPUT` trade to get a quote outputted in the quote currency.

```typescript reference title="Creating a route" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/38ff60aeb3ad8ff839db9e7952a726ca7d6b68fd/v3-sdk/routing/src/libs/routing.ts#L36-L47
```

## Swapping using a route

Using this route, we can now execute the trade using the route's computed calldata, values, and gas values.

```typescript reference title="Using a route" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/38ff60aeb3ad8ff839db9e7952a726ca7d6b68fd/v3-sdk/routing/src/libs/routing.ts#L61-L68
```

After swapping, you should see the currency balances update in the UI shortly after the block is confirmed.

## Next Steps

Now that you're familiar with trading, consider checking out our next guides on [pooling liquidity](./liquidity/01-minting-position.md) to Uniswap!
