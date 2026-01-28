---
id: supply-schedule
title: Supply schedule
sidebar_position: 2
---

# Supply schedule
This guide will cover what a supply schedule is in the context of CCA and how it can be configured.

## Prerequisites
- [Foundry](https://getfoundry.sh/introduction/installation)
- Basic understanding of the CCA contracts and Solidity

If you haven't already, please check out the [quickstart guide](../quickstart/local-deployment.md).

## High-level overview
The supply schedule defines the _rate_ of token issuance over the course of the auction. The auction creator can configure exactly how many tokens are sold at each block of the auction.

A well-designed supply schedule does three things at once: it **creates meaningful incentives to participate early**, **keeps the auction attractive for late arrivals**, and **anchors a robust final clearing price**.

In practice, this is best achieved with a **moderately convex supply curve** that releases supply gradually, combined with a **large final block** of tokens. Early supply is sufficient to reward early bidders, later supply preserves participation throughout the auction, and the large end block ensures that the final clearing price reflects broad demand and is difficult to manipulate.

## Implementation
The supply schedule is implemented as a series of `uint64` values that represent the per-block issuance rate in MPS (milli-bips), and the number of blocks the rate is valid for. For example, the following supply schedule: `(100e3, 50), (200e3, 25)` represents a supply schedule where `100,000 mps` is sold each block for `50` consecutive blocks, and `200,000 mps` is sold each block for the next `25` blocks.

> Note that 1 mps represents one thousandth of a basis point, with one million mps representing 100% of the supply.

Thus, the above schedule sells 1% per block for the first 50 blocks, and 2% per block for the next 25 blocks, resulting in selling 1 * 50 + 2 * 25 = 100% of the supply. This schedule is _valid_ since the cumulative issuance rate is 100%.

### Encoding
The supply schedule is encoded as a packed bytes array of `uint64` values. Each `uint64` value represents an encoded pair of `(uint24 mps, uint40 blocks)`. The `mps` value is the per-block issuance rate in MPS, and the `blocks` value is the number of blocks the rate is valid for.

Use `abi.encodePacked` to pack the `uint64` values into a bytes array.

You can leverage the [AuctionStepsBuilder](https://github.com/Uniswap/continuous-clearing-auction/blob/main/test/utils/AuctionStepsBuilder.sol) helper library to build the auction steps data locally.

### Usage
The supply schedule is passed to the auction as a parameter within the `AuctionParameters` struct when deploying a new auction as the `auctionStepsData` parameter.

## Guidelines
Integrators and teams should be aware of the following best practices when designing a supply schedule:
- Schedules should be monotonically increasing (each step having a higher % rate than the previous step)
- Early steps should not sell a significant percentage of the supply
- The last step should be **one block** in length and should sell a **significant** percentage of the supply

### Price durability
Since the final clearing price becomes the starting price of the token on the AMM, it is crucial that the final block sells a significant percentage of the supply. This makes manipulation of the final clearing price difficult.

Additionally, it still allows for late bidders to receive a meaningful amount of tokens.

There is no single correct choice, but in practice the end block should be **large enough that the final clearing price cannot be meaningfully moved by new bids**, while not so large that it dominates the entire auction.

As a rough guideline:
- End blocks on the order of **20–40% of total supply** tend to work well across a wide range of market conditions.
- Below this range, the final price becomes increasingly sensitive to small amounts of late demand.
- Above this range, the auction begins to resemble a single-period sale, weakening early-participation incentives.

The appropriate size ultimately depends on the expected scale of participation, the importance of the final price as a market reference, and the level of manipulation resistance desired.

### (Optional) zero percentage steps
It's possible to configure the schedule to have multiple steps with a 0% issuance rate. 

If included in the beginning of the schedule, it functions as a **pre-bid** phase where bidders can bid before tokens start being sold. This is beneficial for large auctions as it reduces the chance that tokens are left unsold in earlier blocks of the auction.
