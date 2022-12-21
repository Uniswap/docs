---
id: liquidity
title: Adding & Removing Liquidity
---

# Notes
- mention how you also have the option to collect fees but we will do that in the next guide
- % to decrease liquidty by


## Introduction

This guide will cover how to modify a liquidity position by adding or removing liquidity on the Uniswap V3 protocol.
It is based on the [modifying a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/modifying-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/modifying-position/README.md) and follow the setup instructions.

:::info

If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!

:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position and then modify the provided liquidity for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **percentage** by which to **add and remove** from our position.

The guide will **cover**:
1. Creating or minting our position by using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for making the position minting transaction, and then executing the transaction.
2. Adding liquidity to our position by using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for making the add liquidity transaction, and then executing the transaction.
3. Removing our position's liquidity  by using the `NonfungiblePositionManager`'s `removeCallParameters` to get the data for making the remove liquidity transaction, and then executing the transaction.

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application. We should also be able to add or remove liquidity with the change of a button and see the change reflected in the balance of our tokens.

## Example

### Creating or minting our position by using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for making the position minting transaction, and then executing the transaction

This step is covered in great detail in the previous guide, which focuses on [minting a position](./01-minting-position.md). However, we will go over the high level parts here too as they contribute to the understanding of modifying a position.

All of the minting logic cannot be found in the [`mintPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L128) function. The first step in that function is to give approval to the protocol's `NonfungiblePositionManager` to transfer our tokens by calling the `approve` method of the ERC20 contract. We achieve that by creating a local reference to our tokens's contracts. The logic for that step is encapsulated in the [`getTokenTransferApprovals`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/libs/positions.ts#L31) function.

We then create an instance of the Position class. The logic for creating the instance of the Position class is captured inside the [`getPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L83) function, which fetches the Pool data by creating a local reference to a Pool contract, and uses that to create and return an instance of the Position class. Note how we do not pass any parameters to `getPosition`, as we do not want to consider the full amounts for the position we are minting.

We then pass the Position instance as input to the `NonfungiblePositionManager`'s `addCallParameters` function:

```js reference title="Getting the transaction calldata and parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L156-L163
```

Note how the function also requires an options object as its second parameter off type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77). This is either of type [`MintOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L74) for minting a new position or [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75) for adding liquidity to an existing position. In the minting case, we want to populate `MintOptions`.

The function returns the calldata as well as the value required to execute the transaction, which we then execute. The effect of the transaction is to mint a new Position NFT, which should then be visible on the list of position ids.

### Adding liquidity to our position by using the `NonfungiblePositionManager`'s `addCallParameters` to get the data for making the add liquidity transaction, and then executing the transaction

All of the liquidity adding logic cannot be found in the [`mintPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L128) function. The function is very similar to `mintPosition`, except for some details that we will go over. Notice how the **Add Liquidity** button is disabled until a position is minted.

The first difference to point out is that we do need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we have already done that when minting our position. 

To start, we create the position by which we want to increase our current position:

```js reference title="Submitting the Position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L186-L188
```

Note how we pass `percentageToAdd` to add as a parameter, which creates a new position with a percentage of the amount of each token that we want to increase by. We do not create a new position, but instead use the new Position instance to consider how much liquidity we want to add to our current position.

We then pass the new Position, along with an options object of type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77) to the `NonfungiblePositionManager`'s `addCallParameters`, exactly like we did in the minting case. Note however, how oru config object is now of the other allowed type of `AddLiquidityOptions`, which is [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75):

```js reference title="Submitting the Position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L191-L198
```
In essence, the difference here is that we have omitted the `recipient` parameters in the config object, and have instead passed in the `tokenId` of the position we previously minted. Note how `tokenId` is just the `positionId` that we passed in as an argument to the function. In this example, we just pick the last position that we minted:

```js reference title="Submitting the Position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L357-L359
```


### Removing our position's liquidity  by using the `NonfungiblePositionManager`'s `removeCallParameters` to get the data for making the remove liquidity transaction, and then executing the transaction.

All of the liquidity removing logic cannot be found in the [`mintPosition`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L128) function. The function is very similar to `mintPosition`, except for some details that we will go over. Notice how the **Remove Liquidity** button is disabled until a position is minted.