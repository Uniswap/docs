---
id: fees
title: Fees
---
## Swap Fees

Swap fees are distributed pro-rata to all in range liquidity at the time of the swap. If the spot price moves out of a position, the given liquidity is no longer active and does not generate any fees. If the spot price reverses and reenters the position, the liquidity becomes active again and will generate fees.

Swap fees are not continually reinvested as they were in previous versions of Uniswap. Instead, they are collected separately from the pool and must be manually redeemed when the owner wishes to collect the fees.

## Pool Fees

Uniswap v3 introduces multiple pools for each token pair, each with a different swapping fee. Liquidity providers may initially create pools at three fee levels: 0.05%, 0.30%, and 1%. More fee levels are possible and may be created by UNI governance. 

Breaking pairs into separate pools was previously untenable due to the issue of liquidity fragmentation. Any incentive alignments achieved by more fee optionality invariably resulted in a net loss to traders due to lower pairwise liquidity and the resulting increase in price impact upon swapping. 

The introduction of concentrated liquidity decouples total liquidity from price impact. With price impact concerns out of the way, breaking pairs into multiple pools becomes a feasible approach to improving a pools functionality for assets previously underserved by the 0.30% swap fee. 


## Finding The Right Pool Fee

We anticipate that certain types of assets will gravitate towards specific fee tiers, based on where the incentives for both swappers and liquidity providers come nearest to alignment. 

We expect low volatility assets (stable coins) will likely create the most substantive network effect in the lowest fee tier, as the price risk for holding these assets is very low. 

Similarly, we anticipate the highest volatility assets, or assets traded rarely, will naturally gravitate towards a higher fee - as liquidity providers will be motivated to offset the cost risk of holding these assets for the duration of their position.

## Protocol Fees

Uniswap v3 has a protocol fee that can be turned on by UNI governance. compared to v2, UNI governance has more flexibility in choosing the fraction of swap fees that go to the protocol. For details regarding the protocol fee, see the [**whitepaper**](https://uniswap.org/whitepaper-v3.pdf).

## Tick Spacing

Lower fee pairs allow narrower tick spacing, an additional feature to consider. In areas where capital efficiency is paramount, such as stable coin pairs, narrower tick spacing increases the granularity of liquidity provisioning and will likely lower price impact when swapping - the result being significantly improved prices for stable coin swaps 

For more information on fee levels and their correlation to tick spacing, see the [**whitepaper**](https://uniswap.org/whitepaper-v3.pdf).