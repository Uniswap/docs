---
id: swap-and-add
title: Swapping and Adding Liquidity
---

## Introduction

This guide will cover how to execute a swap-and-add operation in a single atomic transaction. It is based on the [swap-and-add example](https://github.com/Uniswap/examples/tree/main/v3-sdk/swap-and-add-liquidity), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/tree/main/v3-sdk/swap-and-add-liquidity) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

When adding liquidity to a Uniswap v3 pool, you must provide two assets in a particular ratio. In many cases, your contract or the user's wallet hold a different ratio of those two assets. In order to deposit 100% of your assets, you must first swap your assets to the optimal ratio and then add liquidity.

However, the swap may shift the balance of the pool and thus change the optimal ratio. To avoid that, we can execute this swap-and-add liquidity operation in an atomic fashion, using a router. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the **amount** of each token to swap-and-add, and the Pool **fee**.

The guide will **cover**:

1. Setup a router instance
2. Configuring our ratio calculation
3. Calculating our currency ratio
4. Constructing and executing our swap-and-add transaction

At the end of the guide, given the inputs above, we should be able swap-and-add liquidity using 100% of the input assets with the press of a button and see the change reflected in our position and the balance of our tokens.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/smart-order-router`](https://www.npmjs.com/package/@uniswap/smart-order-router)

The core code of this guide can be found in [`swapAndAddLiquidity()`](https://github.com/Uniswap/examples/blob/main/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L48).

:::note
This guide assumes you are familiar with our [Minting a Position](./01-minting-position.md) guide. A minted position is required to add or remove liquidity from, so the buttons will be disabled until a position is minted.

Also note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we will have already done that when minting our position.
:::

## Setup a router instance

The first step is to approve the `SwapRouter` smart contract to spend our tokens for us in order for us to add liquidity to our position:

```typescript reference title="Approve SwapRouter to spend our tokens" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/ec48bb845402419fa6e613cb26512a76d864afa5/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L58-L66
```

The we can setup our router, the [`AlphaRouter`](https://github.com/Uniswap/smart-order-router/blob/97c1bb7cb64b22ebf3509acda8de60c0445cf250/src/routers/alpha-router/alpha-router.ts#L333), which is part of the [smart-order-router package](https://www.npmjs.com/package/@uniswap/smart-order-router). The router requires a `chainId` and a `provider` to be initialized. Note that routing is not supported for local forks, so we will use a mainnet provider even when swapping on a local fork:

```typescript reference title="Creating a router instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L57
```

For a more detailed example, check out our [routing guide](../04-routing.md).

## Configuring our ratio calculation

Having created the router, we now need to construct the parameters required to make a call to its `routeToRatio` function, which will ensure the ratio of currency used matches the pool's required ratio to add our total liquidity. This will require the following parameters:

The first two parameters are the currency amounts we use as input to the `routeToRatio` algorithm:

```typescript reference title="Constructing the two CurrencyAmounts" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/ec48bb845402419fa6e613cb26512a76d864afa5/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L78-L92
```

Next, we will create a placeholder position with a liquidity of `1` since liquidity is still unknown and will be set inside the call to `routeToRatio`:

```typescript reference title="Constructing the position object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L75-L78
```

We then need to create an instance of `SwapAndAddConfig` which will set additional configuration parameters for the `routeToRatio` algorithm:

- `ratioErrorTolerance` determines the margin of error the resulting ratio can have from the optimal ratio.
- `maxIterations` determines the maximum times the algorithm will iterate to find a ratio within error tolerance. If max iterations is exceeded, an error is returned. The benefit of running the algorithm more times is that we have more chances to find a route, but more iterations will longer to execute. We've used a default of 6 in our example.

```typescript reference title="Constructing SwapAndAddConfig" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L80-L83
```

Finally, we will create an instance of `SwapAndAddOptions` to configure which position we are adding liquidity to and our defined swapping parameters in two different objects:

- **`swapConfig`** configures the `recipient` of leftover dust from swap, `slippageTolerance` and a `deadline` for the swap.
- **`addLiquidityOptions`** must contain a `tokenId` to add to an existing position

```typescript reference title="Constructing SwapAndAddOptions" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L85-L95
```

## Calculating our currency ratio

Having constructed all the parameters we need to call `routeToRatio`, we can now make the call to the function:

```typescript reference title="Making the call to routeToRatio" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L97-L103
```

The return type of the function call is [SwapToRatioResponse](https://github.com/Uniswap/smart-order-router/blob/97c1bb7cb64b22ebf3509acda8de60c0445cf250/src/routers/router.ts#L121). If a route was found successfully, this object will have two fields: the status (success) and the `SwapToRatioRoute` object. We check to make sure that both of those conditions hold true before we construct and submit the transaction:

```typescript reference title="Checking that a route was found" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L105-L110
```

In case a route was not found, we return from the function a `Failed` state for the transaction.

## Constructing and executing our swap-and-add transaction

After making sure that a route was successfully found, we can now construct and send the transaction. The response (`SwapToRatioRoute`) will have the properties we need to construct our transaction object:

```typescript reference title="Constructing and sending the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/swap-and-add-liquidity/src/libs/liquidity.ts#L112-L120
```

If the transaction was successful, our swap-and-add will be completed! We should see our input token balances decrease and our position balance should be increased accordingly.
