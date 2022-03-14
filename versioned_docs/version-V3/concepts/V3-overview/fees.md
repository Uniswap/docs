---
id: fees
title: Fees
---

## Swap Fees

Swap fees are distributed pro-rata to all in-range[^1] liquidity at the time of the swap. If the spot price moves out of a position’s range, the given liquidity is no longer active and does not generate any fees. If the spot price reverses and reenters the position’s range, the position’s liquidity becomes active again and will generate fees.

Swap fees are not automatically reinvested as they were in previous versions of Uniswap. Instead, they are collected separately from the pool and must be manually redeemed when the owner wishes to collect their fees.

## Pool Fees Tiers

Uniswap v3 introduces multiple pools for each token pair, each with a different swapping fee. Liquidity providers may initially create pools at three fee levels: 0.05%, 0.30%, and 1%. More fee levels may be added by UNI governance, e.g. the 0.01% fee level added by [this](https://app.uniswap.org/#/vote/2/9) governance proposal in November 2021, as executed [here](https://etherscan.io/tx/0x5c84f89a67237db7500538b81af61ebd827c081302dd73a1c20c8f6efaaf4f3c).

Breaking pairs into separate pools was previously untenable due to the issue of liquidity fragmentation. Any incentive alignments achieved by more fee optionality invariably resulted in a net loss to traders, due to lower pairwise liquidity and the resulting increase in price impact upon swapping.

The introduction of concentrated liquidity decouples total liquidity from price impact. With price impact concerns out of the way, breaking pairs into multiple pools becomes a feasible approach to improving the functionality of a pool for assets previously underserved by the 0.30% swap fee.

## Finding The Right Pool Fee

We anticipate that certain types of assets will gravitate towards specific fee tiers, based on where the incentives for both swappers and liquidity providers come nearest to alignment.

We expect low volatility assets (stable coins) will likely congregate in the lowest fee tier, as the price risk for liquidity providers holding these assets is very low, and those swapping will be motivated to pursue an execution price closest to 1:1 as they can get.

Similarly, we anticipate more exotic assets, or those traded rarely, will naturally gravitate towards a higher fee - as liquidity providers will be motivated to offset the cost risk of holding these assets for the duration of their position.

## Protocol Fees

Uniswap v3 has a protocol fee that can be turned on by UNI governance. Compared to v2, UNI governance has more flexibility in choosing the fraction of swap fees that go to the protocol. For details regarding the protocol fee, see the [**whitepaper**](https://uniswap.org/whitepaper-v3.pdf).

[^1]: In-range liquidity refers to the liquidity contained in any positions which span both sides of the spot price.
