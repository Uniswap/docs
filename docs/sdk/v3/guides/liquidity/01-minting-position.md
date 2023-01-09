---
id: minting
title: Minting a Position
---

## Introduction

This guide will cover how to create (or mint) a liquidity position on the Uniswap V3 protocol.
It is based on the [minting a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/minting-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-posotion/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for and the Pool **fee**.

The guide will **cover**:

1. Giving approval to transfer our tokens
2. Creating an instance of a `Pool`
3. Calculating our `Position` from our input tokens
4. Configuring and executing our minting transaction

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position on the UI of the web application.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/smart-order-router`](https://www.npmjs.com/package/@uniswap/smart-order-router)

The core code of this guide can be found in [`mintPosition()`](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/src/libs/positions.ts#L37)

## Giving approval to transfer our tokens

The first step is to give approval to the protocol's `NonfungiblePositionManager` to transfer our tokens:

```typescript reference title="Approving our tokens for transferring" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L46-L51
```

The logic to achieve that is wrapped in the `getTokenTransferApprovals` function. In short, since both **USDC** and **DAI** are ERC20 tokens, we setup a reference to their smart contracts and call the `approve` function:

```typescript reference title="Setting up an ERC20 contract reference and approving" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L202-L211
```

## Creating an instance of a `Pool`

Having approved the transfer of our tokens, we now need to get data about the pool for which we will provide liquidity, in order to instantiate a Pool class.

To start, we compute our Pool's address by using a helper function and passing in the unique identifiers of a Pool - the **two tokens** and the Pool **fee**. The **fee** input parameter represents the swap fee that is distributed to all in range liquidity at the time of the swap:

```typescript reference title="Computing the Pool's address" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/pool.ts#L24-L29
```

Then, we get the Pool's data by creating a reference to the Pool's smart contract and accessing its methods:

```typescript reference title="Setting up a Pool contract reference and fetching current state data" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/pool.ts#L31-L45
```

Having collected the required data, we can now create an instance of the `Pool` class:

```typescript reference title="Fetching pool data and creating an instance of the Pool class" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L111-L118
```

## Calculating our `Position` from our input tokens

Having created the instance of the `Pool` class, we can now use that to create an instance of a `Position` class, which represents the price range for a specific pool that LPs choose to provide in:

```typescript reference title="Create a Position representation instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L121-L132
```

We use the `fromAmounts` static function of the `Position` class to create an instance of it, which uses the following parameters:

- The **tickLower** and **tickUpper** parameters specify the price range at which to provide liquidity. This example calls **nearestUsableTick** to get the current useable tick and adjust the lower parameter to be below it by two **tickSpacing** and the upper to be above it by two tickSpacing. This guarantees that the provided liquidity is "in range", meaning it will be earning fees upon minting this position
- **amount0** and **amount1** define the maximum amount of currency the liquidity position can use. In this example, we supply these from our configuration parameters.

Given those parameters, `fromAmounts` will attempt to calculate the maximum amount of liquidity we can supply.

## Configuring and executing our minting transaction

The Position instance is then passed as input to the `NonfungiblePositionManager`'s `addCallParameters` function. The function also requires an [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77) object as its second parameter. This is either of type [`MintOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L74) for minting a new position or [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75) for adding liquidity to an existing position. For this example, we're using a `MintOptions` to create our position.

```typescript reference title="Getting the transaction calldata and parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L78-L88
```

The function returns the calldata as well as the value required to execute the transaction:

```typescript reference title="Submitting the Position NFT minting transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/minting-position/src/libs/positions.ts#L91-L100
```

The effect of the transaction is to mint a new Position NFT. We should see a new position with liquidity in our list of positions.

## Next Steps

Once you have minted a position, our next guide ([Adding and Removing Liquidity](./02-modifying-position.md)) will demonstrate how you can add and remove liquidity from that minted position!
