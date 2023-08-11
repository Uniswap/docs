---
id: position-data
title: Liquidity Positions
---

## Introduction

This guide will introduce us to **liquidity positions** in Uniswap V3 and present the `v3-sdk` classes and Contracts used to interact with the protocol.
The concepts and code snippets showcased here can be found across the **Pooling Liquidity** examples in the Uniswap code examples [repository](https://github.com/Uniswap/examples).

In this guide, we will take a look at the [Position](../../reference/classes/Position.md) and [NonfungiblePositionManager](../../reference/classes/NonfungiblePositionManager.md) classes, as well as the [NonfungiblePositionManager Contract](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md).

At the end of the guide, we should be familiar with the most important classes used to interact with liquidity positions.
We should also understand how to fetch positions from the **NonfungiblePositionManager Contract**.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/v3-periphery`](https://www.npmjs.com/package/@uniswap/v3-periphery)

The code mentioned in this guide can be found across the [minting Position](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/src), [collecting Fees](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/src), [modifying positions](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src) and [swap and add liquidity](https://github.com/Uniswap/examples/blob/main/v3-sdk/swap-and-add-liquidity/src) examples.

## Prerequisites

To understand what Positions are, we need to understand some underlying concepts of the Uniswap protocol.

Consider checking out the [Concepts section](../../../../concepts/protocol/concentrated-liquidity.md) as well as the [Uniswap Book](https://uniswapv3book.com/docs/introduction/uniswap-v3/).

### Concentrated liquidity

Uniswap V3 Pools use concentrated liquidity to allow a denser concentration of liquidity at specific prices.
Compared to the full range liquidity model Uniswap V2 uses, this allows traders to make larger trades with less price impact.
Liquidity providers can choose a specific price range in which they want their liquidity to be used by trades.

To achieve this, Uniswap V3 Pools discriminate the price range with **Ticks**.

### Ticks

Ticks are the boundaries between discrete price ranges.
A change of 1 Tick always represents a price change of 0.01% from the current price.
Uniswap V3 Pools can have different `tickSpacings`, a constant that describes which ticks can be used by the Pool.
Only ticks at indices that are divisible by the tickSpacing can be initialized.
This value is dependant on the fee of the Pool, Pools with higher fees have higher tickSpacing.

For example, a Pool with **HIGH** fee (1%) has a tickSpacing of 200, meaning the price difference between initializable Ticks is:

$$1.0001^{200} = 1.0202$$ or $$2.02$$%

### Liquidity Positions

When someone provides liquidity to a Pool, they create a **Liquidity Position**.
This position is defined by the amount of liquidity provided and the start tick and the end tick, or price range, of the Position.

Because V3 Pools allow users to choose any price range in which they want to provide liquidity, it is possible to create positions that do not contain the current Price of the Pool.
In this case, the liquidity provider will pay only one type of Token into the Pool, creating a **single side liquidity position**.

To learn more about how Ticks and Liquidity positions work, consider reading the [whitepaper](https://uniswap.org/whitepaper-v3.pdf) or the other resources mentioned above.

Now that we have a rough understanding of liquidity positions in Uniswap V3, let's look at the correspondent classes the SDK offers us.

## Position class

The **sdk** provides a [`Position`](https://github.com/Uniswap/v3-sdk/blob/main/src/entities/position.ts) class used to create local representations of an onchain position.
It is used to create the calldata for onchain calls to mint or modify an onchain position.

There are four ways to construct a position.

Directly with the [constructor](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L40):

```typescript
import { Pool, Position } from '@uniswap/v3-sdk'
import JSBI from 'jsbi'

const pool = new Pool(...)
const tickLower: number = -100
const tickUpper: number = 200
const liquidity: JSBI = JSBI.BigInt('1000000000000000000')

const position = new Position({
    pool,
    liquidity,
    tickLower,
    tickUpper
})
```

Using the [`fromAmounts()`](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L312) function:

```typescript
import { BigIntish } from '@uniswap/sdk-core'

const pool = new Pool(...)
const tickLower: number = -100
const tickUpper: number = 200
const amount0: BigIntish = '1000000000000000000'
const amount1: BigIntish = JSBI.BigInt('1000000000000000000')
const useFullPrecision: boolean = true

const position = Position.fromAmounts({
    pool, 
    tickLower, 
    tickUpper, 
    amount0, 
    amount1, 
    useFullPrecision
})
```

Or using the [`fromAmount0()`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/entities/position.ts#L354) or [`fromAmount1()`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/entities/position.ts#L378) functions:

```typescript
import { BigIntish } from '@uniswap/sdk-core'
...

const pool = new Pool(...)
const tickLower: number = -200
const tickUpper: number = 100
const amount0: BigIntish = '1000000000000000000'
const useFullPrecision: boolean = true

const singleSidePositionToken0 = Position.fromAmount0({
    pool, 
    tickLower, 
    tickUpper, 
    amount0,
    useFullPrecision
})

const amount1: BigIntish = 100000000

const singleSidePositionToken1 = Position.fromAmount1({
    pool, 
    tickLower, 
    tickUpper, 
    amount1,
    useFullPrecision
})
```

These last two functions calculate a position at the given tick range given the amount of `token0` or `token1`. The amount of the second token is calculated from the ratio of the tokens inside the tick range and the amount of token one.

A create transaction would then fail if the wallet doesn't hold enough `token1` or the Contract is not given the necessary **Transfer Approval**.

All of these functions take an Object with **named values** as a call parameter. The amount and liquidity values are of type `BigIntish` which accepts `number`, `string` and `JSBI`.

The values of `tickLower` and `tickUpper` must match **initializable ticks** of the Pool.

## NonfungiblePositionManager

The `NonfungiblePositionManager` class is mainly used to create calldata for functions on the **NonfungiblePositionManager Contract**.

We will look at the **sdk** class and write functions on the Contract in this section.

### Creating a Position

To create a position on a Pool, the [`mint`](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md#mint) function is called on the Contract.
The **sdk** class provides the `addCallParameters` function to create the calldata for the transaction:

```typescript
import { MintOptions, NonfungiblePositionManager } from '@uniswap/v3-sdk'

const mintOptions: MintOptions = {
  recipient: address,
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
}

// get calldata for minting a position
const { calldata, value } = NonfungiblePositionManager.addCallParameters(
  positionToMint,
  mintOptions
)
```

This call creates a position if it doesn't exist, but can also be used to increase an existing position.
Take a look at the [Mint Position guide](./02-minting-position.md) and [Modify Position guide](./04-modifying-position.md) to learn more.

### Decreasing and Increasing a Position

To decrease or increase the liquidity of a Position, the `decreaseLiquidity` or `increaseLiquidity` functions are called on the Contract.
To increase, `addCallParameters` is used as mentioned above, to decrease we use `removeCallParameters`:

```typescript
const { calldata, value } = NonfungiblePositionManager.removeCallParameters(
  currentPosition,
  removeLiquidityOptions
)
```

Take a look at the [Modify Positions guide](04-modifying-position.md) to learn how to create the `currentPosition` and `removeLiquidityOptions` parameters.

### Collecting Fees

To collect fees accrued, the `collect` function is called on the Contract.
The **sdk class** provides the `collectCallParameters` function to create the calldata for that:

```typescript
const { calldata, value } =
  NonfungiblePositionManager.collectCallParameters(collectOptions)
```


## Next steps

Now that you are familiar with the most important classes and Contract to interact with Liquidity Positions, continue with the next guide on [Minting Positions](./02-minting-position.md).
