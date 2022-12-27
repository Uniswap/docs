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

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. We will then attempt to collect any fees that the position has accrued from those trading against our provisioned liquidity. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **amount of accrued fees** we want to collect for each token.

The guide will **cover**:
1. Creating or minting our position using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for creting the position minting transaction, and then executing the transaction.
2. Collecting accrued fees from our position by using the `NonfungiblePositionManager`'s `collectCallParameters` to get the data for creating the collect fees transaction, and then executing the transaction.

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application. We should also be able to collect the accrued fees (if any) with the press of a button and see the change reflected in the balance of our tokens.

## Example

### Creating or minting our position by using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for making the position minting transaction, and then executing the transaction

This step is covered in great detail in a previous guide, which focuses on [minting a position](./01-minting-position.md). However, we will go over the high level parts here too as they contribute to the understanding of modifying a position.

All of the minting logic can be found in the [`mintPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L128) function. The first step in that function is to give approval to the protocol's `NonfungiblePositionManager` to transfer our tokens by calling the `approve` method of the ERC20 contract. We achieve that by creating a local reference to our tokens's contracts. The logic for that step is encapsulated in the [`getTokenTransferApprovals`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/libs/positions.ts#L31) function.

We then create an instance of the Position class. The logic for creating the instance of the Position class is captured inside the [`getPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L83) function, which fetches the Pool data by creating a local reference to a Pool contract, and uses that to create and return an instance of the Position class. Note how we do not pass any parameters to `getPosition`, as we do not want to consider the full amounts for the position we are minting.

We then pass the Position instance as input to the `NonfungiblePositionManager`'s `addCallParameters` function:

```js reference title="Getting the transaction calldata and parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/560fc2e23a4db6a520a89875ab5cdc8606017952/v3-sdk/collecting-fees/src/example/Example.tsx#L146-L153
```

Note how the function also requires an options object as its second parameter off type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77). This is either of type [`MintOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L74) for minting a new position or [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75) for adding liquidity to an existing position. In the minting case, we want to populate `MintOptions`.

The function returns the calldata as well as the value required to execute the transaction, which we then execute. The effect of the transaction is to mint a new Position NFT, which should then be visible on the list of position ids.

### Collecting accrued fees from our position by using the `NonfungiblePositionManager`'s `collectCallParameters` to get the data for creating the collect fees transaction, and then executing the transaction

All of the fee collecting logic can be found in the [`collectFees`](https://github.com/Uniswap/examples/blob/560fc2e23a4db6a520a89875ab5cdc8606017952/v3-sdk/collecting-fees/src/example/Example.tsx#L169) function. The function is very similar to `mintPosition`, except for some details that we will go over. Notice how the **Collect Fees** button is disabled until a position is minted.

To start, we construct a call to the `NonfungiblePositionManager`'s `collectCallParameters`'s function that expects an options object of type  [`CollectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105):

```js reference title="Getting the calldata and value for the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/560fc2e23a4db6a520a89875ab5cdc8606017952/v3-sdk/collecting-fees/src/example/Example.tsx#L177-L188
```

Similar to the other function exposed by the `NonfungiblePositionManager`, we pass the `recipient` of the collected fees and `tokenId` which is just the `positionId` that we passed in as an argument to the function. In this example, we just pick the last position that we minted:

```js reference title="Passing the tokenId of the last minted position" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/560fc2e23a4db6a520a89875ab5cdc8606017952/v3-sdk/collecting-fees/src/example/Example.tsx#L302-L304
```

We have also provided two other parameters: `expectedCurrencyOwed0` and `expectedCurrencyOwed1`. They both are of type `CurrencyAmount`, and they represent the maximum amount of fees we would like to collect for each of the tokens. 

Now that we have both the calldata and value we needed for the transaction, we can build it and execute it:

```js reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L241-L251
```

After pressing the button, if someone has traded against our position, note how the balance of USDC and DAI drops as we collect fees.
