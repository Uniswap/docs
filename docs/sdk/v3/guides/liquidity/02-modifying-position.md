---
id: modifying-position
title: Adding & Removing Liquidity
---

## Introduction

This guide will cover how to modify a liquidity position by adding or removing liquidity on the Uniswap V3 protocol. It is based on the [modifying a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/modifying-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/modifying-position/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position and then modify the provided liquidity for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **fraction** by which to **add and remove** from our position.

The guide will **cover**:

1. Adding liquidity to our position
2. Removing liquidity from our position

At the end of the guide, given the inputs above, we should be able to add or remove liquidity from a minted position with the press of a button and see the change reflected in our position and the balance of our tokens.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`addLiquidity()`](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src/example/Example.tsx#L33) and [`removeLiquidity()`](https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L83)

:::note
This guide assumes you are familiar with our [Minting a Position](./01-minting-position.md) guide. A minted position is required to add or remove liquidity from, so the buttons will be disabled until a position is minted.

Also note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we will have already done that when minting our position.
:::

## Adding liquidity to our position

Assuming we have already minted a position, our first step is to construct the modified position using our original position to calculate the amount by which we want to increase our current position:

```typescript reference title="Creating the Position" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L46-L61
```

The function receives two arguments, which are the `CurrencyAmount`s that are used to construct the Position instance. In this example, both of the arguments follow the same logic: we multiply the parameterized `tokenAmount` by the parameterized `fractionToAdd` since the new liquidity position will be added on top of the already minted liquidity position.

We then need to construct an options object of type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77) similar to how we did in the minting case. In this case, we will use [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75):

```typescript reference title="Constructing the options object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L63-L67
```

Compared to minting, we have we have omitted the `recipient` parameter and instead passed in the `tokenId` of the position we previously minted.

The newly created position along with the options object are then passed to the `NonfungiblePositionManager`'s `addCallParameters`:

```typescript reference title="Passing the position and options object to addCallParameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L70-L73
```

The return values of `addCallParameters` are the calldata and value of the transaction we need to submit to increase our position's liquidity. We can now build and execute the transaction:

```typescript reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L76-L85
```

After pressing the button, note how the balance of USDC and DAI drops and our position's liquidity increases.

## Removing liquidity from our position

The `removeLiquidity` function is the mirror action of adding liquidity and will be somewhat similar as a result, requiring a position to already be minted.

To start, we create a position identical to the one we minted:

```typescript reference title="Creating an identical position as minting" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L97-L112
```

We then need to construct an options object of type [`RemoveLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L138):

```typescript reference title="Constructing the options object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L126-L133
```

Just as with adding liquidity, we have we have omitted the `recipient` parameter and instead passed in the `tokenId` of the position we previously minted.

We have also provide two additional parameters:

- `liquidityPercentage` determines how much liquidity is removed from our initial position (as a `Percentage`), and transfers the removed liquidity back to our address. We set this percentage from our guide configuration ranging from 0 (0%) to 1 (100%).
- [`collectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105) gives us the option to collect the fees, if any, that we have accrued for this position. In this example, we won't collect any fees, so we provide zero values. If you'd like to see how to collect fees without modifying your position, check out our [collecting fees](./03-collecting-fees.md) guide!

```typescript reference title="Constructing the collect options object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L114-L124
```

The position object along with the options object is passed to the `NonfungiblePositionManager`'s `removeCallParameters`, similar to how we did in the adding liquidity case:

```typescript reference title="Getting the calldata and value for the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L135-L138
```

The return values `removeCallParameters` are the calldata and value that are needed to construct the transaction to remove liquidity from our position. We can build the transaction and send it for execution:

```typescript reference title="Building and submitting the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/b5e64e3d6c17cb91bc081f1ed17581bbf22024bc/v3-sdk/modifying-position/src/libs/liquidity.ts#L141-L150
```

After pressing the button, note how the balance of USDC and DAI increases and our position's liquidity drops.

## Next Steps

Now that you can mint and modify a position, check out how to [collect fees](./03-collecting-fees.md)) from the position!
