---
id: minting
title: Minting a Position
---

## Introduction

## Introduction

This guide will cover how to create (or mint) a liquidity position on the Uniswap protocol.
It is based on the [Minting a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/minting-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/README.md) and follow the setup instructions.

:::info

For a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background coverage](./01-background.md) page!

:::

In this example we will use  the `NonfungiblePositionManager` class to mint a liquidity position for the pair **USDC - DAI**.
The inputs are the **token in**, the **token out**,  the **amount in**, the **fee** and the **liquidity**.

The guide will **cover**:
1. Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens
2. Fetching the Pool's constant and state
3. Creating an instance of a  `Position` and using `addCallParameters` to get the data for the transaction

At the end of the guide, we should be able to mint a liquidity position, given the inputs above with the press of a button and view the position's id on the web application.


## Example

### Giving approval to the `NonfungiblePositionManager` contract to transfer our tokens

### Fetching the Pool's constant and state

### Creating an instance of a  `Position` and using `addCallParameters` to get the data for the transaction


## Notes
- Mention of NFT as position - mint vs create
- Ticks
- Update ReadMe
- liquidity provided (to parameterize
- link deployment addresses??
- how do I acquire the token in balance
- approving the token