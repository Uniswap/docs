---
id: auctiontypes
title: Auction Types
sidebar_position: 3
---

UniswapX operates different auction mechanisms across supported chains, each optimized for the specific characteristics of that blockchain. Understanding these differences is essential for integrating UniswapX on each chain. 

## Overview

The following is an overview of the different types of auction mechanisms on each chain. Each auction type is explained in detail in this section.


| Chain | Auction Type | Competition Model | Timing Mechanism |
|-------|-------------|------------------|------------------|
| **Ethereum** | Exclusive Dutch Auction | Exclusive via RFQ, then open | Exclusivity period, then time-based decay |
| **Arbitrum** | Dutch Auction | Open competition | Block-based decay |
| **Base, Unichain** | Priority Gas Auction | Priority fee bidding | Target block activation, then priority fee bidding |

### Reference Terminology

- **Request for Quote (RFQ)** — A process of crowdsourcing quotes for price discovery.
- **Fillers** — Parties who execute trades programmatically using sophisticated operations. These participants may also be called market makers, searchers, solvers, or MEV bots.
- **Quoters** — A subset of fillers that provide quotes in the RFQ process.
- **Classic Quote** — The quote from the AMM route.
- **Soft Quote** — An indicative quote used to show users their expected swap result.
- **Hard Quote** — The final quote collected to parameterize the auction before posting on-chain.


## Ethereum: RFQ + Exclusive Dutch Auction 

**Two-phase auction system with exclusive filling rights for winning quoters.**

### How It Works

1. User goes into the interface and inputs a swap.
2. Uniswap Labs fetches two quotes in parallel:
    - **Classic Quote**: This quote reflects the best price the user can get from classic Uniswap Protocol pools.
    - **UniswapX Quote**: A quote determined via a Request for Quote (RFQ) process with quoters. Because of the nature of the system, this set of market makers is permissioned and known to Labs.
3. Uniswap Labs selects the best quote (soft quote) returned and compares it to the Classic Quote. If the UniswapX quote is better, the user is shown a purple lightning bolt, indicating that they will be swapping through X.
4. The UniswapX Quote contains auction parameters, which the user signs to create a gasless offchain message. The signed message commits to the auction parameters, and defines a slippage tolerance, which is the minimum amount the swapper commits to recieving as part of the process. 
5. This gets sent to Uniswap Labs server which requests a final “hard quote” from the group of quoters. Whichever quote (hard-quote) is highest wins exclusivity and gives the quoter a fixed amount of time to "fill" the order (which means sending users their tokens/settling the transaction).
    - If no quoter provides the amount that the swapper had signed for (e.g. prices moved), then the order is sent out without exclusivity, meaning anyone can fill the order.
6. Sometimes the market maker who won the RFQ doesn't want to fill the order anymore (e.g. price moved against the filler). This is called 'fading' and we penalize the filler by ignoring their quotes for a period of time if they fade too much.
7. If the exclusive filler fades or there is no exclusive filler, the system proceeds to what's called a Dutch Auction, where we post the user's transactions for *anyone* to permissionlessly fill the order.
    - A "Dutch Auction" is a type of auction that descends in price.
    - We start the auction at or a bit below the quote price that the quoter faded.
    - Every block, we move the price a small amount below that price.
    - This achieves a great price to users because market makers are incentivized to fill the user's order the second the price is profitable for them to do so. Because they are competing with each other, best price is achieved, assuming just two competitive actors.

In this system, we call the market makers in step #3 "Quoters" because they respond to our request for a quote. We call the market makers in step #6 "Fillers." The difference is that the set of Quoters is permissioned while the set of Fillers is permissionless.


add content

## Arbitrum: Dutch Auction

**Direct Dutch auction without RFQ, leveraging fast block times for price discovery.**

### How It Works


## Base & Unichain: Priority Gas Auctions

**Priority fee bidding system leveraging OP Stack's Priority Gas Auction (PGA) transaction ordering.**

### How It Works




OLDOLDOLDOLDOLDOLDOLDOLDOLD

## Parametizing UniswapX Orders on Mainnet
The UniswapX protocol on Mainnet does not explicitly parameterize the pricing of orders like the Exclusive Dutch Order, rather order parameterization is left to be configured by the order constructor. 

In the current Uniswap Labs interface implementation of UniswapX, some fillers may choose to help parameterize orders on Mainnet by participating as quoters. These fillers can *only* win a quote if they guarantee improved swapper execution over Uniswap v3 or v2 liquidity pools. Fillers who win a quote will receive execution priority for a limited period of time to fill orders they submitted wining quotes for. 

To ensure a smooth swapping experience for traders, the set of Quoters will be vetted by Uniswap Labs following UniswapX’s launch, with plans to make the quoting system fully permissionless in the near future.

If you are interested in participating as a Quoter, please reach out [here](mailto:quoters@uniswap.org).