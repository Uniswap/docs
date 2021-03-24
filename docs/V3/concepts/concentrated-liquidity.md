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

To achieve concentrated liquidity allocation, the once continuous spectrum of relative price space has been partitioned with *ticks*.

Ticks are the boundaries between discreet areas in price space, each equivalently spaced in a given pair. As the spot price changes during swapping, the pair contract will continuously exchange the outbound asset for the inbound, progressively utilizing all the liquidity available within the current tick interval, until the next tick is reached. At this point the contract switches to a new tick, activates the dormant liquidity available within that next tick interval, and leaves the previously crossed price space denominated in a single asset.       
