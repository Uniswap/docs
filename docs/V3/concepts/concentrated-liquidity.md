---
id: concentrated-liquidity
title: Concentrated Liquidity
---
The defining idea of Uniswap v3 is concentrated liquidity: liquidity that is allocated within a determined price boundary.

In earlier versions, liquidity was (by design) distributed uniformly along the 𝑥 · 𝑦 = k reserves curve, where 𝑥 and 𝑦 are the respective reserves of two assets X and Y, and K is a constant measure of liquidity. 

In other words, earlier versions were designed to support trading across the entire price interval (0, ∞) without any loss of liquidity. This is simple and allows liquidity to be efficiently aggregated. On the other hand, the relative price of any given pair of assets rarely moves dramatically enough for this to be necessary.


Having considered this, it’s a natural idea to allow LPs to concentrate their liquidity to smaller price intervals than (0, ∞). We call liquidity concentrated to a finite interval a position. 

When the price exits a position’s interval, the position’s liquidity is no longer active and no longer earns fees. At this point, its liquidity is composed entirely of a single asset because the reserves of the other asset have been entirely depleted. If the price ever reenters the interval, the liquidity becomes active again.

Importantly, LPs are free to create as many positions as they see fit, each with its own price interval.

 Concentrated liquidity serves as a mechanism to let the market decide what a sensible distribution of liquidity is, as rational LPs are incentivized to concentrate their liquidity while ensuring that their liquidity remains active.

 ## Ticks

To achieve custom liquidity allocation, the once continuous spectrum of relative price space has been partitioned with *ticks*.

Ticks are the boundaries between discreet areas in price space, each equivalently spaced in a given pair, as the spot price changes during swapping, a new tick will become active as the current one is depleted. As the 

## Cells

The space between two nearest ticks, **Cells**, contain the total liquidity provided to it by every liquidity provider, including those who created a position exclusively within a single cell, or those with a much broader position that happened to include it. A single cell can contain a significant[^1] amount of liquidity, to the degree that reaching the upper limit of liquidity is unlikely.

[^1]: The maximum anount of liquidity in a cell is a matter of in range liquidity, rather than the specific cell at hand. The general requirement is that in range liquidity cannot exceed 2^128
