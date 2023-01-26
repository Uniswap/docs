---
id: liquidity-fees
title: Collecting Fees
---

## Introduction

This guide will cover how to collect fees from a liquidity position on the Uniswap V3 protocol. It is based on the [collecting fees code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/collecting-fees), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. We will then attempt to collect any fees that the position has accrued from those trading against our provisioned liquidity. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **max amount of accrued fees** we want to collect for each token.

The guide will **cover**:

1. Setting up our fee collection
2. Submitting our fee collection transaction

At the end of the guide, given the inputs above, we should be able to collect the accrued fees (if any) of a minted position with the press of a button and see the change reflected in our position and the balance of our tokens.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`collectFees()`](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/src/libs/liquidity.ts#L35).

:::note
This guide assumes you are familiar with our [Minting a Position](./01-minting-position.md) guide. A minted position is required to add or remove liquidity from, so the buttons will be disabled until a position is minted.

Also note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we will have already done that when minting our position.
:::

## Setting up our fee collection

All of the fee collecting logic can be found in the [`collectFees`](https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L24) function. Notice how the **Collect Fees** button is disabled until a position is minted. This happens because there will be no fees to collect unless there is a position whose liquidity has been traded against.

To start, we construct an options object of type  [`CollectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105) that holds the data about the fees we want to collect:

```typescript reference title="Constructing the CollectOptions" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/collecting-fees/src/libs/liquidity.ts#L44-L61
```

Similar to the other functions exposed by the `NonfungiblePositionManager`, we pass the `tokenId` and the `recipient` of the fees, which in this case is our function's input position id and our wallet's address.

The other two `CurrencyAmount` parameters (`expectedCurrencyOwed0` and `expectedCurrencyOwed1`) define the **maximum** amount of currency we expect to get collect through accrued fees of each token in the pool. We set these through our guide's configuration.

## Submitting our fee collection transaction

We then get the call parameters for collecting our fees from our `NonfungiblePositionManager` using the constructed `CollectOptions`:

```typescript reference title="Getting the calldata and value for the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/collecting-fees/src/libs/liquidity.ts#L64-L65
```

The function above returns the calldata and value required to construct the transaction for collecting accrued fees. Now that we have both the calldata and value we needed for the transaction, we can build and execute the it:

```typescript reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/collecting-fees/src/libs/liquidity.ts#L68-L77
```

After pressing the button, if someone has traded against our position, we should be able to note how the balance of USDC and DAI increases as we collect fees.

## Next Steps

The previous guides detail all the atomic steps needed to create and manage positions. However, these approaches may not use all of your desired currency. To ensure you are using your full funds while minimizing gas prices, check out our guide on [Swapping and Adding Liquidity](./04-swap-and-add-liquidity.md) in a single transaction!
