---
id: minting
title: Minting a Position
---

## Introduction

This guide will cover how to create (or mint) a liquidity position on the Uniswap V3 protocol.
It is based on the [minting a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/minting-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/README.md) and follow the setup instructions.

:::info

If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!

:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **liquidity** we are providing to the Pool.

The guide will **cover**:
1. Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens.
2. Fetching the Pool's constants and current state and using them to create an instance of a `Pool` class.
3. Creating an instance of a `Position` class by calculating the liquidity we want to supply.
4. Using `addCallParameters` on our `NonfungiblePositionManager` to get the data for making the transaction, and executing the transaction.

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application.

## Example

### Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens

The first step is to give approval to the protocol's `NonfungiblePositionManager` to transfer our tokens. 

```js reference title="Approving our tokens for transferring" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/6fba6da4d323804db56b3189ad1bbbaf18e6180f/v3-sdk/minting-position/src/example/Example.tsx#L113-L124
```

The logic to achieve that is wrapped in the `getTokenTransferApprovals` function. In short, since both **USDC** and **DAI** are ERC20 tokens, we setup a reference to their smart contracts and call the `approve` function:

```js reference title="Setting up an ERC20 contract reference and approving" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/6fba6da4d323804db56b3189ad1bbbaf18e6180f/v3-sdk/minting-position/src/libs/contracts.ts#L73-L78
```

### Fetching the Pool's constants and current state and creating an instance of a `Pool` class

Having approved the transfer of our tokens, we now need to get data about the pool for which we will provide liquidity, in order to instantiate a Pool class. 

To start, we compute our Pool's address by using a helper function and passing in the unique identifiers of a Pool - a **tokenIn**, a **tokenOut**, and the Pool **fee**. The **fee** input parameter represents the swap fee that is distributed to all in range liquidity at the time of the swap:

```js reference title="Fetching the Pool's constants and current state" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/5007bda6dfa1255846248514018d995818b67d09/v3-sdk/minting-position/src/example/Example.tsx#L47-L52
```

Then, we get the Pool's data by creating a reference to the Pool's smart contract and accessing its methods:

```js reference title="Setting up a Pool contract reference and fetching current state data" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/3fe96214409a78c34e35747fc2567330c7b505d7/v3-sdk/minting-position/src/example/Example.tsx#L53-L67
```

Having collected the required data, we can now create an instance of the Pool class:


```js reference title="Fetching pool data and creating an instance of the Pool class" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/5007bda6dfa1255846248514018d995818b67d09/v3-sdk/minting-position/src/example/Example.tsx#L112-L119
```


### Creating an instance of a `Position` class by calculating the liquidity we want to supply

Having created the instance of the Pool class, we can now use that to create an instance of a Position class, which represents the price range for a specific pool that LPs choose to provide in:

```js reference title="Create a Position representation instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/5007bda6dfa1255846248514018d995818b67d09/v3-sdk/minting-position/src/example/Example.tsx#L122-L139
```

We use the `fromAmounts` static function of the `Position` class to create an instance of it. The **tickLower** and **tickUpper** parameters specify the price range at which to provide liquidity. This example calls **nearestUsableTick** to get the current useable tick and adjust the lower parameter to be below it by 2 **tickSpacing** and the upper to be above it by 2 tickSpacing. This guarantees that the provided liquidity is "in range", meaning it will be earning fees upon minting this position. We also provide **amount0** and **amount1** from our configuration parameters.

Given those parameters, `fromAmount` will attempt to calculate the maximum amount of liquidity we can supply.


### Using `addCallParameters` on our `NonfungiblePositionManager` to get the data for making the transaction, and executing the transaction

The Position instance is then passed as input to the `NonfungiblePositionManager`'s `addCallParameters` function. 
The function also requires an options object as its second parameter off type `AddLiquidityOptions`. This is either of type `MintOptions` for minting a new position or `IncreaseOptions` for adding liquidity to an existing position. Below, the example outlines the parameters needed to mint a new position:

```js reference title="Getting the transaction calldata and parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L149-L156
```

The function returns the calldata as well as the value required to execute the transaction:

```js reference title="Submitting the Position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L159-L168
```

The effect of the transaction is to mint a new Position NFT, which should then be visible on the list of position ids.