---
id: CCA
title: Continuous Clearing Auction
sidebar_position: 3
---

# Continuous Clearing Auction (CCA)

**Repository:** [github.com/Uniswap/continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction)

The Continuous Clearing Auction (CCA) is a novel auction mechanism that generalizes the uniform-price auction into continuous time. It provides fair price discovery for bootstrapping initial liquidity while eliminating timing games and encouraging early participation (see [whitepaper](/whitepaper_cca.pdf)).

## Overview

Bootstrapping initial liquidity for new tokens is challenging. Traditional approaches suffer from various weaknesses:
- **Fixed-price sales** lead to mispricing and priority races, creating thin or unstable liquidity
- **Dutch auctions** create timing games and favor professionals over genuine participants
- **One-shot auctions** enable demand reduction and last-minute sniping
- **Bonding curves** are path-dependent and vulnerable to manipulation
- **Centralized market makers** require trust and extract significant value

CCA addresses these issues through a unique approach: **automatic bid spreading over time** combined with **continuous price discovery**.

### Mechanism overview

For a detailed overview, please read the [whitepaper](/whitepaper_cca.pdf).

The most important element to understand about a Continuous Clearing Auction (CCA) is that tokens are sold over time to the current set of active participants. Participants are comprised of two things, a budget and a max price. 

The clearing price of the auction in a block is the price which all bidders in that block pay. This is the same concept as in uniform price auctions. But in CCA this price is gradually discovered over time. Every block, some number of tokens (as defined by the configured release schedule) are allocated to bids with higher max prices, then those with lower max prices. 

Because we require users to specify a maximum price, there exists a clearing price for which there are not enough "active" participants in the auction to purchase all of the tokens that are being sold, since a bid is removed from the auction once it falls below the clearingPrice. The current price of the auction will always be just below this price, ensuring that all of the supply can be sold to the current set of bids.

At a high level it has these benefits:
- No participant can concentrate demand at a single moment
- Timing of bid submission matters less than valuation
- Early bidders naturally gain more exposure to lower prices
- Sniping and last-minute gaming become ineffective

## Technical overview
Check out the full [technical reference](TODO)

## Integration guidelines

### Incorrect configuration of the auction parameters

CCA auctions are highly configurable. As such, it is important to ensure that the configurations of each auction instance are not only correct but protect against known risks.

Ensure that the following parameters are correctly set:

- `token` and `currency`
- `totalSupply` is not too large (see [note on total supply and maximum bid price](#note-on-total-supply-and-maximum-bid-price) below)
- `startBlock`, `endBlock`, and `claimBlock`
- `tickSpacing` is not too small (see [note on ticks](#note-on-ticks) below)
- `floorPrice` is correctly set
- `requiredCurrencyRaised` is not set too high where the auction will never graduate
- `auctionStepsData` avoids common pitfalls (see [note on auction steps](#note-on-auction-steps) below)

### Extra funds sent to the auction are not recoverable
Do NOT send more tokens than intended in `totalSupply` to the auction. They will not be recoverable.

Likewise, any `currency` sent directly to the auction and not through `submitBid` will not be lost.

### Note on total supply and maximum bid price

The following limitations regarding total supply and maximum bid prices should be considered:

- The maximum total supply that can be sold in the auction is 1e30 wei of `token`. For a token with 18 decimals, this is 1 trillion tokens.
- The auction also ensures that the total currency raised does not exceed the maximum allowable liquidity for a Uniswap v4 liquidity position. The lowest bound for this is 2^107 wei (given the smallest possible tick spacing of 1).

Given a total supply of:

- 1 trillion 18 decimal tokens (1e30), the maximum bid price is 2^110. The max ratio of currency to token is 2^(110-96) = 2^14 = 16384.
- 1 billion 6 decimal tokens (1e15), the maximum bid price is 2^160. The max ratio of currency to token is 2^(160-96) = 2^64 = 18446744073709551616.

We strongly recommend that the `currency` is chosen to be more valuable than `token`, and that the total supply is not excessively large.

### Note on ticks

Ticks in the auction govern where bids can be placed. They have no impact on the potential clearingPrices of the auction and merely serve to prevent users from being outbid by others by infinitesimally small amounts and for gas efficiency in finding new clearing prices.

Generally integrators should choose a tick spacing of AT LEAST 1 basis point of the floor price. 1% or 10% is also reasonable.

Setting too small of a tick spacing will make the auction extremely gas inefficient, and in specific cases, can result in a DoS attack where the auction cannot finish.

### Note on auction steps

Steps in the auction create the supply issuance schedule. Generally each step should be monotonically increasing in the amount of tokens sold, and the last block of the auction MUST sell a significant amount of tokens.

This is because the final clearing price of the auction is used to initialize a Uniswap v4 liquidity pool, and if only a small number of tokens are sold at the end, the final price will be easy to manipulate.

See the [whitepaper](./docs/assets/whitepaper.pdf) for more details.