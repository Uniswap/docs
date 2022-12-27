---
id: modifying-position
title: Adding & Removing Liquidity
---

## Introduction

This guide will cover how to modify a liquidity position by adding or removing liquidity on the Uniswap V3 protocol.
It is based on the [modifying a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/modifying-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/modifying-position/README.md) and follow the setup instructions.

:::info

If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!

:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position and then modify the provided liquidity for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **fraction** by which to **add and remove** from our position.

The guide will **cover**:
1. Adding liquidity to our position.
2. Removing liquidity from our position.

Note that the minting logic is not covered in this guide as it was covered in detail in the [previous guide](./01-minting-position.md).

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application. We should also be able to add or remove liquidity with the press of a button and see the change reflected in the balance of our tokens.

## Example
### Adding liquidity to our position

All of the liquidity adding logic can be found in the [`addLiquidity`](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src/example/Example.tsx#L33) function. The function is very similar to `mintPosition`, except for some details that we will go over. Notice how the **Add Liquidity** button is disabled until a position is minted.

The first difference to point out is that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we have already done that when minting our position. 

To start, we construct the position by which we want to increase our current position:

```js reference title="Creating the Position" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L40-L55
```

The function receives 2 arguments, which are the 2 `CurrencyAmount`s that are used to construct the Position instance. Both of the arguments follow the same logic: we multiply the parameterized `tokenAmount` by the parameterized `fractionToAdd` since the new liquidity position will be added on top of the already minted liquidity position.

We then need to construct an options object of type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77) exactly like we did in the minting case. Note however, how our config object is now of the other allowed type of `AddLiquidityOptions`, which is [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75):

```js reference title="Constructing the options object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L57-L61
```

In essence, the difference with the minting case is that we have omitted the `recipient` parameter in the config object, and have instead passed in the `tokenId` of the position we previously minted. Note how `tokenId` is just the `positionId` that we passed in as an argument to the function. 

The newly created position along with the options object are then passed to the `NonfungiblePositionManager`'s `addCallParameters`:

```js reference title="Passing the position and options object to addCallParameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L64-L67
```

The return values of `addCallParameters` are the calldata and value of the transaction we need to submit to increase our position's liquidity. We can now build and execute it:

```js reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L70-L79
```

After pressing the button, note how the balance of USDC and DAI drops as we add liquidity to our position.


### Removing liquidity from our position

All of the liquidity removing logic can be found in the [`removeLiquidity`](https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L128) function. The function is very similar to `addLiquidity`, except for some details that we will go over. Notice how the **Remove Liquidity** button is disabled until a position is minted.

Note how we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we have already done that when minting our position. 

To start, we create a position identical to the one we created during minting:

```js reference title="Creating an identical position as minting" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L221
```

We then pass the new Position, along with an options object of type [`RemoveLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L138) to the `NonfungiblePositionManager`'s `removeCallParameters`, exactly like we did in the adding liquidity case:

```js reference title="Getting the calldata and value for the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L224-L238
```
Note how we have omitted the `recipient` parameters in the config object, and have instead passed in the `tokenId` of the position we previously minted. `tokenId` is just the `positionId` that we passed in as an argument to the function. In this example, we just pick the last position that we minted:

```js reference title="Passing the tokenId of the last minted position" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L370-L372
```

We have also provided two other parameters: `liquidityPercentage` and `collectOptions`. The first is of type `Percentage` and accepts a fraction from 0 to 1, which we provide through our configuration file. This parameter determines how much liquidity is removed from our initial position, and transfers the removed liquidity back to our address. 

The latter parameter is of type [`CollectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105) and gives us the option to collect the fees that we have collected for the time that we were actively provisioning liquidity. In this example, we pass in 0 for both tokens as we do not want to collect any fees.

Now that we have both the calldata and value we needed for the transaction, we can build it and execute it:

```js reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/d6300e2db41f6a2c3e9c69860347c17c484232ba/v3-sdk/modifying-position/src/example/Example.tsx#L241-L251
```

After pressing the button, note how the balance of USDC and DAI drops as we remove liquidity from our position.