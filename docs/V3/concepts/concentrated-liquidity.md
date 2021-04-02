---
id: concentrated-liquidity
title: Concentrated Liquidity
---
## Concentrated Liquidity

The defining idea of Uniswap v3 is concentrated liquidity: liquidity that is allocated within a custom price boundary.

In earlier versions, liquidity was distributed uniformly along the 𝑥 · 𝑦 = L<sup>2</sup> reserves curve, where 𝑥 and 𝑦 are the respective reserves of two assets X and Y, and L[^1] is a constant measure of liquidity. 

A uniform distribution allows trading across the entire price interval (0, ∞) without any loss of liquidity. However, in some pools a majority of the liquidity is never used. Consider stablecoins where the price of the asset stays relatively consistent. Since liquidity is distributed evenly, the amount of liquidity at the typical price range is equivalent to the amount of liquidity at any other price range on the curve. Yet, the liquidity outside the typical price range of a stablecoin is rarely touched. For example, the v2 DAI/USDC pair reserves just ~0.50% of capital for trading between $0.99 and $1.01, the price range in which LPs would expect to see the most volume and consequently earn the most fees.

With v3, LPs are able to concentrate their capital to smaller price intervals than (0, ∞). We call liquidity concentrated to a finite interval a position. LPs can have many different positions, creating individualized price curves that reflect the preferances of each LP.
 
### Active Liquidity

As the price of an asset rises or falls, it may exit the price bounds that LPs have set in a position. When the price exits a position’s interval, the position’s liquidity is no longer active and no longer earns fees. At this point, the LPs provided liquidity is composed entirely of a single asset because the reserves of the other asset have been entirely depleted. This happens because as price moves in one direction, LPs gain more of the one asset as swappers demand the other, until their entire liquidity supply consists of only one asset. (In v2, we don't see this behavior because LPs never reach the upper or lower bound of the price of two assets, namely 0 and ∞). If the price ever reenters the interval, the liquidity becomes active again and LPs begin earning fees once more.

Importantly, LPs are free to create as many positions as they see fit, each with its own price interval.

Concentrated liquidity serves as a mechanism to let the market decide what a sensible distribution of liquidity is, as rational LPs are incentivized to concentrate their liquidity while ensuring that their liquidity remains active.

 ## Ticks

To achieve concentrated liquidity, the once continuous spectrum of price space has been partitioned with *ticks*.

Ticks are the boundaries between discrete areas in price space. Ticks are spaced such that, at any point along the curve, an increase of 1 tick represents a .01% increase in price.

Ticks function as boundaries for liquidity positions. When a position is created, the provider must choose the beginning and ending tick that will represent their position's borders. 

As the spot price changes during swapping, the pool contract will continuously exchange the outbound asset for the inbound, progressively utilizing all the liquidity available within the current tick interval until the next tick is reached. At this point, the contract switches to a new tick and activates any dormant liquidity within a position that has a boundary at the newly active tick.

[^1]: L<sup>2</sup> is a notational change. In previous versions, this is k.