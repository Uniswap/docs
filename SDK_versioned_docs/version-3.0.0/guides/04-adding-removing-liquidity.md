---
id: liquidity-actions
title: Minting, Adding, and Removing Liquidity
---

In this guide, we will go through the actions of setting up the calldata for minting a position, adding liquidity to a pool, and removing from a pool. We will walk through the parameters required for each of these actions and give relevant examples. Note that this guide builds off of the previous guide [how to create a pool](https://docs.uniswap.org/sdk/guides/creating-a-pool) so be sure to look over that first.

## Overview

The steps we will be taking throughout the following guide are:
    1. Setting up our pool instance. This follows the same structure as the previous guide, so we won't go into detail of this below. Refer to [Creating a Pool Instance](https://docs.uniswap.org/sdk/guides/creating-a-pool) for more or you can look at the full example here. (LINK_TO_GITHUB)
    2. Creating a position.
    3. Constructing the calldata for minting a position
    4. Constructing the calldata for adding to a position
    5. Constructing the calldata for removing from a position


## Setting up the pool

For this example, we will use a Uniswap V3 DAI-USDC 0.05% pool. As we saw in the previous guide, to create a pool we call the constructor for the pool instance:

```typescript
  const DAI_USDC_POOL = new Pool(
    DAI,
    USDC,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
```
The input parameters are the two tokens, fee tier, the current pool price, the current liquidity, and current tick. Reference the previous guide to see how these parameters were selected.

## Creating a Position Instance

At its core, a position represents the price range for a specific pool that LPs choose to provide in. Now that we've constructed our pool, we can set up our position:

```typescript
const position = new Position({
    pool: DAI_USDC_POOL,
    liquidity: state.liquidity * 0.0002,
    tickLower: nearestUsableTick(state.tick, immutables.tickSpacing) - immutables.tickSpacing  * 2,
    tickUpper: nearestUsableTick(state.tick, immutables.tickSpacing) + immutables.tickSpacing * 2
  })
```
Above, we call the Position constructor and input the parameters: pool, liquidity, tickLower, and tickUpper:
- The pool parameter takes in our pool instance we created in step 1. 
- The liquidity parameter specifies how much liquidity to add. In this example, we are adding a fraction of the current liquidity in the pool: 0.0002 times the amount of current liquidity. In production, this could be a parameter inputted into the function you write adjustable by the end user. 
- The tickLower and tickUpper parameter specify the price range at which we will provide liquidity. In this example, we call    `nearestUsableTick` to get the current useable tick and adjust the lower parameter to be below it by 2 * tickSpacing and the upper to be above it by 2 * tickSpacing. This guarantees that our liquidity is in-range, meaning it will be earning fees upon minting this position.

## Minting the Position

To mint a position, we use the function defined in the SDK called `addCallParameters` which takes in a position (of type Position) and an option (of type AddLiquidityOptions). `AddLiquidityOptions` are either MintOptions or IncreaseOptions, and for this example we will pass in a valid `MintOptions` struct since we are minting a new position, not adding to an already existing position. The latter example we will see below.

`MintOptions` are constructed from `CommonAddLiquidityOptions & MintSpecificOptions`. To see all potential parameters that can be inputted here is the reference for CommonAddLiquidityOptions:

```typescript
export interface CommonAddLiquidityOptions {
  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh

  /**
   * Whether to spend ether. If true, one of the pool tokens must be WETH, by default false
   */
  useNative?: NativeCurrency

  /**
   * The optional permit parameters for spending token0
   */
  token0Permit?: PermitOptions

  /**
   * The optional permit parameters for spending token1
   */
  token1Permit?: PermitOptions
}
```
and here is the reference for MintSpecificOptions:

```typescript
export interface MintSpecificOptions {
  /**
   * The account that should receive the minted NFT.
   */
  recipient: string

  /**
   * Creates pool if not initialized before mint.
   */
  createPool?: boolean
}
```

Omitting the parameters that are not required, we recognize that the only parameters we need to specify in order to create a valid `MintOptions` struct are `slippageTolerance`, `deadline`, and `recipient`. Hence we can construct our calldata with the following call to `addCallParameters`:

```typescript
    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: new Percent(50, 10_000),
        recipient: sender,
        deadline: deadline
        });
```

where `slippageTolerance` is set to 0.005%, `recipient` is set to the sender address which is an input to this function, and `deadline` is set to the current block.timestamp plus some arbitrary amount, for this example. The parameter `slippageTolerance` refers to the percentage that the price can change for the transaction to still succeed. If a price slips beyond the percentage specified, the transaction will not go through. `recipient` should be set to the address that will own the newly minted NFT position.  `deadline` specifies the timebound at which this transaction can still be submitted. 

This code block is a sample from the full file which you can view here. (todo paste link)


## Adding Liquidity to the Position

Constructing the calldata for adding liquidity uses the same function call to `addCallParameters`, which takes in a `Position` and an options field of type `AddLiquidityOptions`. Since the goal of this example is to add liquidity to an already existing position, the options type we will be constructing is the `IncreaseOptions` instead of `MintOptions`. `IncreaseOptions` types are defined by the interfaces `CommonAddLiquidityOptions & IncreaseSpecificOptions`. `CommonAddLiquidityOptions` is outlined above because minting also required these parameters and the reference for `IncreaseSpecificOptions` is:

```typescript
export interface IncreaseSpecificOptions {
  /**
   * Indicates the ID of the position to increase liquidity for.
   */
  tokenId: BigintIsh
}
```

Thus, to construct the `IncreaseOptions` struct we just need to specify `slippageTolerance`, `deadline`, and `tokenId`. The `tokenId` is the unique identifier of the position (or more specifically, the ERC721 that represents a position) for which we want to add liquidity. In this example, our tokenId is just 1, but in production each tokenId is unique and can be monitored on chain.

```typescript
const {calldata ,value} = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: new Percent(50, 10_000),
        deadline: deadline,
        tokenId: 1
        });
  ```

## Removing Liquidity from a Position

To remove liquidity, we use the function `removeCallParameters`, which takes in a `Position` and `RemoveLiquidityOptions`. The reference for `RemoveLiquidityOptions` is:

```typescript
/**
 * Options for producing the calldata to exit a position.
 */
export interface RemoveLiquidityOptions {
  /**
   * The ID of the token to exit
   */
  tokenId: BigintIsh

  /**
   * The percentage of position liquidity to exit.
   */
  liquidityPercentage: Percent

  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh

  /**
   * Whether the NFT should be burned if the entire position is being exited, by default false.
   */
  burnToken?: boolean

  /**
   * The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT
   */
  permit?: NFTPermitOptions

  /**
   * Parameters to be passed on to collect
   */
  collectOptions: Omit<CollectOptions, 'tokenId'>
}
```

To remove liquidity from a position, we set the parameters for `tokenId`, `liquidityPercentage`, `slippageTolerance`, `deadline`, and `collectOptions`. `tokenId` is again set to 1 for this example, but refers to the unique id of the position. `liquidityPercentage` is set to the percent of liquidity to be removed. In this case, setting liquidity to `Percent(1)` removes all liquidity. `slipppageTolerance` and `deadline` are set to the same values as the previous examples. Finally. `collectOptions` defines the tokens to be collected and are passed onto `collect`. In this case we will be collecting DAI and USDC and we will be collecting the maximum amount of each, handled in the call to collect. 


```typescript
const {calldata, value} = NonfungiblePositionManager.removeCallParameters(position, {
        tokenId: 1,
        liquidityPercentage: new Percent(1),
        slippageTolerance: new Percent(50, 10_000),
        deadline: deadline,
        collectOptions: {
          expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(DAI, 0),
          expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(USDC, 0),
          recipient: sender
        }}
    );
```

## The example code

Here (todo) is a link to the full file with all example snippets to give a wholistic picture of declaring varibales and interacting with the SDK with the functions `addCallParameters` and `removeCallParameters`. 
