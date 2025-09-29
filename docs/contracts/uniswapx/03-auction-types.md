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

Regardless of their differences, all auctions do not require users to pay gas. Gas fees are wrapped into the final price and are paid by the filler, and failed swaps do not incur any fees at all.

### Reference Terminology

- **Request for Quote (RFQ)** — A process of crowdsourcing quotes for price discovery.
- **Fillers** — Parties who execute trades programmatically using sophisticated operations. These participants may also be called market makers, searchers, solvers, or MEV bots.
- **Quoters** — A subset of fillers that provide quotes in the RFQ process.
- **Classic Quote** — The quote from the AMM route.
- **Soft Quote** — An indicative quote used to show users their expected swap result.
- **Hard Quote** — The final quote collected to parameterize the auction before posting onchain.


## Ethereum: RFQ + Exclusive Dutch Auction 

TL;DR — **Two-phase auction system with exclusive filling rights for winning quoters.**

UniswapX on Ethereum uses a sophisticated two-phase auction system that balances execution quality with gas efficiency. Due to Ethereum's higher gas costs and 12-second block time, the system employs a Request for Quote (RFQ) process to ensure competitive pricing before committing users to onchain execution. This approach grants exclusive filling rights to winning quoters during an initial period, then falls back to an open Dutch auction if the exclusive filler cannot execute. The two-phase design minimizes failed transactions while maintaining competitive pricing through both permissioned quoters and permissionless fillers.

<ins>**Quote Discovery (Steps 1-3)**</ins>
1. User goes into the interface and inputs a swap.
2. Uniswap Labs fetches two quotes in parallel:
    - **Classic Quote**: This quote reflects the best price the user can get from classic Uniswap Protocol pools.
    - **UniswapX Quote**: A quote determined via a Request for Quote (RFQ) process with quoters. Because of the nature of the system, this set of market makers is permissioned and known to Labs.
3. Uniswap Labs selects the best quote (soft quote) returned and compares it to the Classic Quote. If the UniswapX quote is better, the user is shown a purple lightning bolt <img src="/img/bolt.svg" alt="Bolt icon" style={{height: "1em", width: "1em", display: "inline", verticalAlign: "middle", margin: "0 0.2em"}} />, indicating that they will be swapping through X.

<ins>**Order Execution (Steps 4-5)**</ins>
4. The UniswapX Quote contains auction parameters, which the user signs to create a gasless off-chain message. This signed message commits to the auction parameters and defines a slippage tolerance, representing the minimum amount the swapper will accept.
5. This gets sent to Uniswap Labs' server, which requests a final "hard quote" from the group of quoters. Whichever quote (hard quote) is highest wins exclusivity and gives the quoter a fixed amount of time to fill the order (sending users their tokens and settling the transaction).
    - If no quoter provides the amount that the swapper had signed for (e.g. prices moved), then the order is sent out without exclusivity, meaning anyone can fill the order.

<ins>**Fallback Mechanisms (Steps 6-7)**</ins>
6. Sometimes the market maker who won the RFQ doesn't want to fill the order anymore (e.g., price moved against them). This is called "fading." The system penalizes quoters who fade too frequently by ignoring their quotes for a period of time.
7. If the exclusive filler fades or there is no exclusive filler, the system proceeds to a Dutch Auction (a descending price auction), where the user's transaction is posted for anyone to permissionlessly fill the order.
    - The auction starts at or slightly below the quote price that the quoter faded.
    - Every block, the price decreases by a small amount.
    - This achieves a great price for users because market makers are incentivized to fill the user's order the moment the price becomes profitable for them. Because they are competing with each other, the best price is achieved, assuming at least two competitive actors.
    - In this system, we call the market makers in step 2 "Quoters" because they respond to our request for a quote. We call the market makers in step 6 "Fillers." The difference is that the set of Quoters is permissioned while the set of Fillers is permissionless.

<p align="center">
  <img src={require('./images/mainnet_flowchart.png').default} alt="UniswapX" width="60%" />
</p>

:::note Cosigners
Cosigners update auction parameters to reflect real-time prices, compensating for the delay between quoting and signing (which can be up to 30 seconds). They set the auction start block and adjust pricing within the user's signed parameters, while never exceeding the user's slippage tolerance. If you'd like to see how the Cosigner works in practice, please see the technical overview of [UniswapX V2 on Mainnet](/contracts/uniswapx/fillers/mainnet/02-v1-vs-v2.md). 
<br/>
Currently, the Uniswap Interface and Trading API sets the cosigner to Uniswap Labs, though this could be updated in the future.
:::

## Arbitrum: Dutch Auction

TL;DR — **Direct Dutch auction without RFQ, leveraging fast block times for onchain price discovery.**

Because Arbitrum's block frequency is much higher than Ethereum's, the Dutch auction can decay through more price points in the same amount of time. For example, exploring 5 price points takes 60 seconds on Ethereum (5 × 12-second blocks) but only 1.25 seconds on Arbitrum (5 × 0.25-second blocks). This speed advantage eliminates the need for an RFQ process since the auction can open directly to all fillers without exclusivity and still deliver excellent price discovery within an acceptable timeframe.


1. Based on the token pair and AMM liquidity, Uniswap Labs determines whether the swap will likely benefit from UniswapX.
2. If not, the user is routed to the AMM.
3. If so, an algorithm (called Unimind) sets the auction start and end prices (auction parameters) based on the historical performance of this pair.
    - Unimind is a gradient descent algorithm developed by Uniswap Labs to optimize both the amount given to the swapper and auction speed.
4. The user signs the auction parameters and sends them to Uniswap Labs.
5. Uniswap Labs updates the auction parameters to set the auction start block and sends the auction to fillers.
6. Fillers compete to fill the auction onchain.

## Base & Unichain: Priority Gas Auctions

TL;DR — **Priority fee bidding system leveraging OP Stack's transaction ordering mechanism.**

OP Stack rollups use Priority Ordering, a method for determining the order of transactions in a block based on the priority gas fees included in each transaction. This contrasts with Arbitrum, which uses first-come-first-serve ordering. Priority Gas Auctions (PGA) are a type of UniswapX auction that take advantage of this priority ordering  mechanism to decide the winner. 

Unlike a Dutch auction that decays over time, Priority Orders function more like a traditional English auction, where the auction starts at the user's max slippage tolerance. At a specified start block, the auction opens and fillers simultaneously submit their bids by including priority fees with their transactions. The highest priority fee wins the right to fill the order, while competing transactions revert.

1. Based on the token pair and AMM liquidity, Uniswap Labs determines whether the swap will likely benefit from UniswapX.
2. If not, the user is routed to the AMM.
3. If so, the auction is created using the classic price and max slippage provided by the user.
4. The user signs the auction parameters and sends them to Uniswap Labs.
5. Uniswap Labs updates the auction parameters to set the auction start block and sends the auction to fillers.
6. Fillers compete to fill the auction onchain by submitting transactions with varying priority fees at the target block.
