---
id: liquidity-fees
title: Collecting Fees
---

## Introduction

This guide will cover how to collect fees from a liquidity position on the Uniswap V3 protocol. It is based on the [collecting fees code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/collecting-fees), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. We will then attempt to collect any fees that the position has accrued from those trading against our provisioned liquidity. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **percentage of our accrued fees** we want to collect from the pool.

The guide will **cover**:

1. Collecting Fees from a position

At the end of the guide, given the inputs above, we should be able to collect the accrued fees (if any) of a minted position with the press of a button and see the change reflected in our position and the balance of our tokens.

:::info
The SDKs that are used in the guide are now published by the [Uniswap Foundation](https://github.com/uniswapfoundation) instead of Uniswap Labs.
You can find a list of supported SDKs [here](https://www.npmjs.com/org/uniswapfoundation).
Make sure you don't mix SDKs published by Uniswap Labs and the Uniswap Foundation to avoid unpredictable behavior.
:::

For this guide, the following Uniswap packages are used:

- [`@uniswapfoundation/v3-sdk`](https://www.npmjs.com/package/@uniswapfoundation/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`collectFees()`](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/src/libs/liquidity.ts#L35).

:::note
This guide assumes you are familiar with our [Minting a Position](./01-minting-position.md) guide. A minted position is required to add or remove liquidity from, so the buttons will be disabled until a position is minted.

Also note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we will have already done that when minting our position.
:::

## Setting up our fee collection

All of the fee collecting logic can be found in the [`collectFees`](https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L24) function. Notice how the **Collect Fees** button is disabled until a position is minted. This happens because there will be no fees to collect unless there is a position whose liquidity has been traded against.

To start, we fetch the position from the NonfungiblePositionManager Contract to get the fees we are owed:

```typescript
import { Position } from '@uniswapfoundation/v3-sdk'

const position = await Position.fetchWithPositionId(provider, positionId)
```

Read more about fetching position info [here](./01-position-data.md#fetching-positions).

Next, we specify the percentage of fees that we want to collect and use the sdk to collect our fees.
We want to collect all fees in this example:

```typescript
const percentageToCollect = new Percent(1)

const txResponse = await position.collectFeesOnChain({
    signer: wallet,
    provider,
    percentage: CurrentConfig.tokens.feePercentage,
  })
```

After pressing the button, if someone has traded against our position, we should be able to note how the balance of USDC and DAI increases as we collect fees.

## Next Steps

The previous guides detail all the atomic steps needed to create and manage positions. However, these approaches may not use all of your desired currency. To ensure you are using your full funds while minimizing gas prices, check out our guide on [Swapping and Adding Liquidity](./05-swap-and-add-liquidity.md) in a single transaction!
