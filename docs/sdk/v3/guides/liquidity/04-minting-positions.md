---
id: minting
title: Minting a new Position
---

## Overview

In this guide, you will learn how to mint a new liquidity position, add liquidity, and then remove liquidity. You will learn how to invoke each function with the required parameters necessary in returning the calldata. Because any liquidity related action relies on setting up pool and position instances, you will also need to know [How to Create A Pool](../03-creating-a-pool) and how to set up a position instance.

In summary, the following is what you will learn in this guide:

1. Set up the pool instance. This follows the same structure as the previous guide. Refer to [Creating a Pool Instance](../03-creating-a-pool) for more detail.
2. Create a position.
3. Construct the calldata for minting a position.
4. Construct the calldata for adding to a position.
5. Construct the calldata for removing from a position.

## Setting up the pool

First, call the constructor to create an instance of a Uniswap v3 pool. For example, the following code creates a DAI-USDC 0.05% pool.

```typescript
const DAI_USDC_POOL = new Pool(
  DAI,
  USDC,
  immutables.fee,
  state.sqrtPriceX96.toString(),
  state.liquidity.toString(),
  state.tick
)
```

The input parameters are the two token addresses, the fee tier (0.05%), the current pool price, the current liquidity, and the current tick. Reference [the previous guide](../03-creating-a-pool.md) to understand how to retrieve these necessary parameters for setting up instances of existing pools.

## Creating a Position Instance

A position represents the price range for a specific pool that LPs choose to provide in. After constructing a pool, set up the position instance:

```typescript
const position = new Position({
  pool: DAI_USDC_POOL,
  liquidity: state.liquidity * 0.0002,
  tickLower: nearestUsableTick(state.tick, immutables.tickSpacing) - immutables.tickSpacing * 2,
  tickUpper: nearestUsableTick(state.tick, immutables.tickSpacing) + immutables.tickSpacing * 2,
})
```

You can retrieve the variable inputs (like `state.liquidity` and `immutables.tickSpacing`) from fetching the state data as shown in the previous guide.

After you fetch these variables, call the Position constructor and input the parameters: `pool`, `liquidity`, `tickLower`, and `tickUpper`:

- The `pool` parameter takes in the pool instance from step 1.
- The `liquidity` parameter specifies how much liquidity to add. This examples adds a fraction of the current liquidity in the pool: 0.0002 times the amount of current liquidity. In production, this could be a parameter inputted into the function adjustable by the end-user.
- The `tickLower` and `tickUpper` parameters specify the price range at which to provide liquidity. This example calls `nearestUsableTick` to get the current useable tick and adjust the lower parameter to be below it by 2 _ `tickSpacing` and the upper to be above it by 2 _ `tickSpacing`. This guarantees that the provided liquidity is "in range", meaning it will be earning fees upon minting this position.

## Minting the Position

To create the calldata for minting a position, use the function defined in the SDK called `addCallParameters` which takes in a position (of type `Position`) and an option (of type `AddLiquidityOptions`). `AddLiquidityOptions` are either `MintOptions` for minting a new position or `IncreaseOptions` for adding liquidity to an existing position. Below, the example outlines the parameters needed to mint a new position and passes in a valid `MintOptions` struct to the SDK function `addCallParameters`.

`MintOptions` are constructed from `CommonAddLiquidityOptions & MintSpecificOptions`. To see all potential parameters that can be inputted here is the reference for [`CommonAddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L47):

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

and here is the reference for [`MintSpecificOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L25):

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

You can omit the parameters that are not required. In order to create the most basic valid `MintOptions` struct just set the `slippageTolerance`, `deadline`, and `recipient` which is constructed below:

```typescript
const deadline = block.timestamp + 200

const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
  slippageTolerance: new Percent(50, 10_000),
  recipient: sender,
  deadline: deadline,
})
```

where `slippageTolerance` is set to 0.005%, `recipient` is set to the sender address which is an input to this function, and `deadline` is set to the current `block.timestamp` plus some arbitrary amount, for this example. The parameter `slippageTolerance` refers to the percentage that the price can change for the transaction to still succeed. If a price slips beyond the percentage specified, the transaction will not go through. Set `recipient` to the address that will own the newly minted NFT position. Set `deadline` to the timebound at which this transaction can still be submitted.
