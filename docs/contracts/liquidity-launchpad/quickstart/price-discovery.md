---
id: price-discovery
title: Price discovery
sidebar_position: 5
---

# Entering price discovery
This section will walk you through how a CCA auction discovers new prices over time.

## Prerequisites
Basic understanding of the CCA auction mechanism and Solidity is assumed. This guide continues from the [previous section](/docs/contracts/liquidity-launchpad/quickstart/first-bid.md) where we submitted our first bid.

## Summary
Currently we have a CCA contract deployed which we have submitted a bid to. We'll now modify our script to show how the price of the auction can change over time.

To summarize the current relative parameters:
| Parameter             | Value                                      | Notes                                                                                                          |
|-----------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| currency              | `address(0)`                               | We'll use the native token for this example                                                                    |
| tickSpacing           | `1 << 96`                                  | Use a tick spacing equal to the floor price. Next possible bid prices: 2:1, 3:1, etc.                         |
| floorPrice            | `1 << 96`                                  | Use a floor price representing a ratio of 1:1                                                                  |

And the total supply to sell is 1 billion tokens.

## Discovering a new price
In the last section we showed how the auction updates its internal state via checkpointing when a new bid is submitted. The bid that we submitted had two main parts: a max price and an amount.

The [whitepaper](https://uniswap.org/whitepaper.pdf) is the best resource to understand the mechanics of the auction but at a high level this is how the auction's mechanism works:
- Given that each bid is willing to purchase tokens until some _maximum price_, there exists a price for which no one is willing to participate in the auction.
- A less extreme version of the idea above is that there exists a _clearing price_ for which all of the demand (ex. ETH) in the auction can purchase all of the tokens that are being sold.
- This equilibrium can only change if a new bid is submitted into the auction.
- Thus, every time a new bid is added we try to find a new _clearing price_. We do this by iterating through each price tick until we find a price at which there is not enough demand to purchase all of the tokens that are being sold.
- This is the _clearing price_ and it is the price at which all active participants will pay in this block.

Hopefully you can quickly reason about how much `currency` is required to move the price of the auction above the floor: `required currency = desired price * totalSupply`

In our example, the floor price is a 1:1 ratio and the total supply is 1 billion tokens. So we'll need 1 billion ETH to move the price of the auction above the floor.

Since we only bid 1 ETH, the price of the auction didn't change.
