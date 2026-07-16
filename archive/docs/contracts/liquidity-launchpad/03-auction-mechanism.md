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
Check out the full [technical reference](https://github.com/Uniswap/continuous-clearing-auction/blob/main/docs/TechnicalDocumentation.md)

## Integration guidelines
CCA is a very flexible protocol. Always validate the parameters of an auction before participating. Additionally, integrators and teams building on CCA should be aware of the following [integration guidelines](https://github.com/Uniswap/continuous-clearing-auction/blob/main/docs/TechnicalDocumentation.md#integration-guidelines).

## License
The Continuous Clearing Auction contracts are MIT licensed.
