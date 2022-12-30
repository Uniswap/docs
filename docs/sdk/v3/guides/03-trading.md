---
id: trading
title: Executing a Trading
---   

## Introduction

This guide will build off our [quoting guide](./02-quoting.md) and show how to use a quote to construct and execute a trade on the Uniswap V3 protocol. It is based on the [Trading code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/trading), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will trade between two ERC20 tokens: **WETH and USDC**. The tokens, amount of input token, and the fee level can be configured as inputs.

The guide will **cover**:

1. Constructing a route from pool information
2. Constructing an unchecked trade
3. Executing a trade

At the end of the guide, we should be able to create and execute a trade between any two ERC20 tokens using the example's included UI.

:::note
Included in the example application is functionality to wrap/unwrap ETH as needed to fund the example `WETH` to `USDC` swap directly from an `ETH` balance.
:::

## Constructing a route from pool information

To construct our trade, we will first create an model instance of a `Pool`. We will first extract the needed metadata from the relevant pool contract. Metadata includes both constant information about the pool as well as information about its current state stored in its first slot:

```typescript reference title="Fetching pool metadata" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L152-L161
```

Using this metadata along with our inputs, we will then construct a `Pool`:

```js reference title="Constructing a Pool" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L42-L49
```

With this `Pool`, we can now construct a route to use in our trade. We will reuse our previous quoting code to calculate the output amount we expect from our trade:

```js reference title="Constructing a Route" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L51-L55
```

## Constructing an unchecked trade

Once we have a route, we can now construct an unchecked trade using the route in addition to the output amount from a quote based on our input:

```js reference title="Creating a Trade" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L59-L73
```

This example uses an exact input trade, but we can also construct a trade using exact output assuming we adapt our quoting code accordingly.

## Executing a trade

Once we have created a trade, we can now execute this trade with our provider. First, we must set our options that define how much time and slippage can occur in our execution as well as the address to use for our wallet:

```js reference title="Constructing SwapOptions" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L86-L90
```

Next, we use the Uniswap `SwapRouter` to get the associated call parameters for our trade and options:

```js reference title="Getting call parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L92
```

Finally, we can construct a transaction from the method parameters and send the transaction:

```js reference title="Sending a transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e8bd4178ccaccd6776407f79a319128d4c31f90d/v3-sdk/trading/src/trading.ts#L94-L101
```

## Result and Next Steps

The resulting example allows for trading between any two ERC20 tokens, but this can be suboptimal for the best pricing and fees. To achieve the best possible price, we use the Uniswap auto router to route through pools to get an optimal cost. The next guide on [routing](./04-routing.md) will show you how to use this router and execute optimal swaps.
