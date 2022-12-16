---
id: minting
title: Minting a Position
---

## Introduction

This guide will cover how to create (or mint) a liquidity position on the Uniswap V3 protocol.
It is based on the [Minting a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/minting-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/README.md) and follow the setup instructions.

:::info

For a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background coverage](./01-background.md) page!

:::

In this example we will use  the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair.
The inputs are the **token in**, the **token out**,  the **amount in**, the **fee** and the **liquidity**.

The guide will **cover**:
1. Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens.
2. Fetching the Pool's constants and current state.
3. Creating an instance of a `Position` class and using `addCallParameters` on our `NonfungiblePositionManager` to get the data for the transaction.

At the end of the guide, we should be able to mint a liquidity position, given the inputs above with the press of a button and view the position's id on the web application.

## Example

### Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens

To be able to provide liquidity to the Uniswap V3 protocol using our tokens, we need to mint a non-fungible token (NFT) which represents our position.

The first step is to give approval to the protocol's `NonfungiblePositionManager` to transfer our tokens. 

```js reference title="Approving our tokens for transferring" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/6fba6da4d323804db56b3189ad1bbbaf18e6180f/v3-sdk/minting-position/src/example/Example.tsx#L113-L124
```

The logic to achieve that is wrapped in the `getTokenTransferApprovals` function. In short, since both **USDC** and **DAI** are ERC20 tokens, we setup a reference to their smart contracts and call the `approve` function:

```js reference title="Setting up an ERC20 contract reference and approving" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/6fba6da4d323804db56b3189ad1bbbaf18e6180f/v3-sdk/minting-position/src/libs/contracts.ts#L73-L78
```

### Fetching the Pool's constant and state to create an instance of a `Pool` class

Having approved the transfer of our tokens, we now need to get data about the pool for which we will provide liquidity, in order to instantiate a Pool class:

```js reference title="Fetching the Pool's constants and current state" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/6fba6da4d323804db56b3189ad1bbbaf18e6180f/v3-sdk/minting-position/src/example/Example.tsx#L134-L135
```

:::info

For a briefer on how to instantiate a reference to the Uniswap V3 Pool smart contract, and retrieving the pool constants, please take a look at the [quoting guide](../quoting#setting-up-a-reference-to-the-pool-contract-and-getting-metadata-from-it)!

:::

Like we did for the Pool constants, we get the Pool's current state data by creating a reference to the Pool's smart contract and accessing its methods:

```js reference title="Setting up a Pool contract reference and fetching current state data" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L81-L86
```

Having collected the required data, we can now create an instance of the Pool helper class:

```js reference title="Create a Pool representation instance " referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L127-L134
```

### Creating an instance of a `Position` class and using `addCallParameters` to get the data for the transaction

Having created the instance of the Pool class, we can now use that to create an instance of a Position class, which represents the position we want to create:

```js reference title="Create a Position representation instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L137-L146
```

The Position instance is then passed as input to the `NonfungiblePositionManager`'s `addCallParameters` function:

```js reference title="Getting the transaction calldata and parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L149-L156
```

The function return value is the calldata and value we need to execute the transaction:

```js reference title="Submit the position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/74621ce380dec537a3f9654ec8723cc4be9e54b8/v3-sdk/minting-position/src/example/Example.tsx#L159-L168
```

The effect of the transaction is to mint a new Position NFT.