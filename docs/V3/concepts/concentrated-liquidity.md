---
id: concentrated-liquidity
title: Concentrated Liquidity
---
## Concentrated Liquidity

The defining idea of Uniswap v3 is concentrated liquidity: liquidity that is allocated within a determined price boundary.

In earlier versions, liquidity was (by design) distributed uniformly along the 𝑥 · 𝑦 = k reserves
curve, where 𝑥 and 𝑦 are the respective reserves of two assets X and Y, and K is a constant measure of liquidity. 

Earlier versions were designed to support trading across the entire **price interval** (0, ∞) without any loss of liquidity. While this allows liquidity to be efficiently aggregated, the relative price of any given pair rarely moves dramatically enough for this to be necessary.

Because the relative price of an asset pair rarely reaches the outer boundaries of price space, it is helpful to allow users to concentrate their liquidity into a smaller price interval. This concentrated liquidity is called a **position**

Concentrated liquidity serves as a mechanism to let the market decide what a sensible distribution of liquidity is, as liquidity providers are incentivized to concentrate their liquidity in areas where they expect their liquidity to remain active.

 ## Ticks

To achieve concentrated liquidity, the once continuous spectrum of price space has been partitioned with *ticks*.

Ticks are the boundaries between discrete areas in price space. Ticks are spaced such that, at any point along the curve, an increase of 1 tick represents a .01% increase in price.

Ticks function as boundaries for liquidity positions. When a position is created, the provider must choose the beginning and ending tick that will represent their position's borders. 

As the spot price changes during swapping, the pool contract will continuously exchange the outbound asset for the inbound, progressively utilizing all the liquidity available within the current tick interval until the next tick is reached. At this point, the contract switches to a new tick and activates any dormant liquidity within a position that has a boundary at the newly active tick.