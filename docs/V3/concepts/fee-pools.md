---
id: fee-pools
title: Pool Fees
---

As more tokens are designed and released, it has become apparent that one fee structure does not fit all in the arena of market-making.

To accommodate this, we've broken up each trading pair into three distinct pairs, each with a unique swap fee rewarded to the liquidity providers. Breaking pools into separate partitions was previously an untenable option due to the liquidity fragmentation. Any incentive refinements achieved by more fee optionality invariably resulted in a net loss due to lower pairwise liquidity and the increased swapping price impact users would suffer as a result.

Uniswap v3 restructures capital to such a degree that the liquidity fragmentation issue previously blocking multiple fee pairs is no longer relevant in the way it once was.

Uniswap v3 introduces multiple pools for each token pair, each with a different swapping fee. All pools are created by the same factory contract. The factory contract initially allows pools to be created at three fee levels: 0.05%, 0.30%, and 1%. Additional fee levels can be enabled by UNI governance.


## Choosing The Right Fee

We anticipate that certain kinds of assets will gravitate towards specific fee structures, based on where the incentives for both swappers and liquidity providers come nearest to alignment. Namely, low volatility assets (stable coins) will likely create the most substantive network effect in the lowest fee tier, as the price risk for holding these assets is very low. Similarly, we anticipate the highest volatility assets will naturally gravitate towards a higher fee, as liquidity providers will be motivated to offset the cost risk of holding the volatile assets for the duration of their liquidity position.

Lower fee pairs allow smaller tick spacing, an additional feature to consider. Areas where capital efficiency is paramount, such as stable coin X stable coin pairs, will likely benefit substantially from narrower tick spacing and the resulting capital efficiency improvements.