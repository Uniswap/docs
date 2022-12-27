---
id: liquidity-fees
title: Collecting Fees
---

## Introduction

This guide will cover how to collect fees from a liquidity position on the Uniswap V3 protocol.
It is based on the [collecting fees code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/collecting-fees), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/README.md) and follow the setup instructions.

:::info

If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!

:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. We will then attempt to collect any fees that the position has accrued from those trading against our provisioned liquidity. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **max amount of accrued fees** we want to collect for each token.

The guide will **cover** collecting accrued fees from our position.

Note that the minting logic is not covered in this guide as it was covered in detail in the [previous guide](./01-minting-position.md).

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application. We should also be able to collect the accrued fees (if any) with the press of a button and see the change reflected in the balance of our tokens.

## Example

### Collecting accrued fees from our position

All of the fee collecting logic can be found in the [`collectFees`](https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L24) function. Notice how the **Collect Fees** button is disabled until a position is minted. This happens because there will be no fees to collect unless there is a position whose liquidity has been traded against. 

To start, we construct an options object of type  [`CollectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105) that holds the data about the fees we want to collect:

```js reference title="Constructing the CollectOptions" referenceLinkText="View on Github" customStyling 
https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L31-L48
```

Similar to the other functions exposed by the `NonfungiblePositionManager`, we pass the `tokenId` which is just the `positionId` that we passed in as an argument to the function. We also provide the `recipient` of the fees, which in this case is our wallet's address.

The other 2 parameters, `expectedCurrencyOwed0` and `expectedCurrencyOwed1`, concern the type of currency and **max** amount of currency we expect to get collect through accrued fees, one for each of the two tokens of the pool. The type of the parameters is `CurrencyAmount`, a type that describes both the type and amount of currency. The values we provide are configuration parameters to our guide.

We then get the call parameters for collecting our fees from our `NonfungiblePositionManager` using the constructed `CollectOptions`:

```js reference title="Getting the calldata and value for the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L51-L52
```

The function above returns the calldata and value required to construct the transaction for collecting accrued fees. Now that we have both the calldata and value we needed for the transaction, we can build and execute the it:

```js reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/be67e7df220b0a270c9d18bbaab529e017213adf/v3-sdk/collecting-fees/src/example/Example.tsx#L55-L64
```

After pressing the button, if someone has traded against our position, we should be able to note how the balance of USDC and DAI increases as we collect fees.

Note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we have already done that when minting our position.
