---
id: position-data
title: Liquidity Positions
---

## Introduction

This guide will introduce us to **liquidity positions** in Uniswap V3 and provide some theoretical background for the guides in this section.
At the end of the guide, we should be familiar with the most important classes used to interact with liquidity positions.

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

## Liquidity Positions

When someone provides liquidity to a Pool, they create a **Liquidity Position**.
This position is defined by the amount of liquidity provided and the start tick and the end tick, or price range, of the Position.

Because V3 Pools allow users to choose any price range in which they want to provide liquidity, it is possible to create positions that do not contain the current Price of the Pool.
In this case, the liquidity provider will pay only one type of Token into the Pool, creating a **single side liquidity position**.

To learn more about how Ticks and Liquidity positions work, consider reading the [whitepaper](https://uniswap.org/whitepaper-v3.pdf) or the other resources mentioned above.

The SDK wraps Liquidity Positions in the `Position` class.

## NFTPositionManager

To simplify managing Liquidity Positions, Uniswap deployed the [NonfungiblePositionManager](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md) contract.
The SDK includes the `NonfungiblePositionManager` class that wraps this contract and provides utility functions to interact with it.

We will use it to create and modify Positions in the following guides.

## Next steps

Now that you are familiar with the most important classes and Contract to interact with Liquidity Positions, continue with the next guide on [Minting Positions](./02-minting-position.md).
