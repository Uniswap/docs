---
id: bounded-liquidity
title: Bounded Liquidity
---

The defining idea of Uniswap v3 is that of bounded liquidity: liq- uidity concentrated to some price interval.

In earlier versions, liquidity was (by design) distributed uni-formly along the 𝑥 · 𝑦 = 𝐿2 reserves curve, where 𝑥 and 𝑦 are the respective reserves of two assets X and Y, and 𝐿1 is a constant mea- sure of liquidity [1]. In other words, earlier versions were designed to support trading across the entire price interval (0, ∞) without any loss of liquidity. This is simple and allows liquidity to be ef- ficiently aggregated. On the other hand, the relative price of any given pair of assets should rarely move dramatically enough for this to be necessary.

Having considered this, it’s a natural idea to allow LPs to con- centrate their liquidity to smaller price intervals than (0, ∞). We call liquidity concentrated to a finite interval a position. A position only needs to maintain enough reserves to support trading within its interval, and therefore can simulate a larger amount of liquidity (we call this quantity the virtual liquidity) within that interval. For a fixed amount of real liquidity, the virtual liquidity it can support and the size of its interval are inversely related. Fig. 1 depicts the mechanism by which a position’s real liquidity simulates a virtual reserves curve. A mathematical formulation of the mechanism is given in Appendix A.

When the price exits a position’s interval, the position’s liquidity is no longer active, and no longer earns fees. At that point, its liquidity is composed entirely of a single asset, because the reserves of the other asset must have been entirely depleted. If the price ever reenters the interval, the liquidity becomes active again.
Importantly, LPs are free to create as many positions as they see fit, each on their own price interval. In this way, LPs can approxi- mate any desired distribution of liquidity on the price space (see Fig. 2 for a few examples). Furthermore, this serves as a mechanism to let the market decide what a sensible distribution is, rather than trying to estimate a distribution via some heuristic, as has been suggested previously []. Rational LPs are incentivized to maximally concentrate their liquidity (fees are earned proportionally to virtual liquidity) while ensuring that their liquidity remains active.
