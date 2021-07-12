---
id: concentrated-liquidity
title: Concentrated Liquidity
---

  <div>
  <video width="100%" height="100%" playsInline controls loop>
  <source src="https://gateway.pinata.cloud/ipfs/QmTf6EueKk5ZJ2KQwt1ZCHxRaogYVRci2U5uKRo8NeCmoB" />
  Your browser does not support the video tag.
  </video>
  </div>

---

## Introduction

The defining idea of Uniswap v3 is concentrated liquidity: liquidity that is allocated within a custom price range.
In earlier versions, liquidity was distributed uniformly along the price curve between 0 and infinity.

The previously uniform distribution allowed trading across the entire price interval (0, ∞) without any loss of liquidity. However, in many pools, the majority of the liquidity was never used.

Consider stablecoin pairs, where the relative price of the two assets stays relatively constant. The liquidity outside the typical price range of a stablecoin pair is rarely touched. For example, the v2 DAI/USDC pair utilizes ~0.50% of the total available capital for trading between $0.99 and $1.01, the price range in which LPs would expect to see the most volume - and consequently earn the most fees.

With v3, liquidity providers may concentrate their capital to smaller price intervals than (0, ∞). In a stablecoin/stablecoin pair, for example, an LP may choose to allocate capital solely to the 0.99 - 1.01 range. As a result, traders are offered deeper liquidity around the mid-price, and LPs earn more trading fees with their capital. We call liquidity concentrated to a finite interval a position. LPs may have many different positions per pool, creating individualized price curves that reflect the preferences of each LP.

## Active Liquidity

As the price of an asset rises or falls, it may exit the price bounds that LPs have set in a position. When the price exits a position's interval, the position's liquidity is no longer active and no longer earns fees.

As price moves in one direction, LPs gain more of the one asset as swappers demand the other, until their entire liquidity consists of only one asset. (In v2, we don't typically see this behavior because LPs rarely reach the upper or lower bound of the price of two assets, i.e., 0 and ∞). If the price ever reenters the interval, the liquidity becomes active again, and in-range LPs begin earning fees once more.

Importantly, LPs are free to create as many positions as they see fit, each with its own price interval. Concentrated liquidity serves as a mechanism to let the market decide what a sensible distribution of liquidity is, as rational LPs are incentivized to concentrate their liquidity while ensuring that their liquidity remains active.

## Ticks

To achieve concentrated liquidity, the once continuous spectrum of price space has been partitioned with ticks.

Ticks are the boundaries between discrete areas in price space. Ticks are spaced such that an increase or decrease of 1 tick represents a 0.0001% increase or decrease in price at any point in price space.

Ticks function as boundaries for liquidity positions. When a position is created, the provider must choose the lower and upper tick that will represent their position's borders.

As the spot price changes during swapping, the pool contract will continuously exchange the outbound asset for the inbound, progressively using all the liquidity available within the current tick interval[1] until the next tick is reached. At this point, the contract switches to a new tick and activates any dormant liquidity within a position that has a boundary at the newly active tick.

While each pool has the same number of underlying ticks, in practice only a portion of them are able to serve as active ticks. Due to the nature of the v3 smart contracts, tick spacing is directly correlated to the swap fee. Lower fee tiers allow closer potentially active ticks, and higher fees allow a relatively wider spacing of potential active ticks.

While inactive ticks have no impact on transaction cost during swaps, crossing an active tick does increase the cost of the transaction in which it is crossed, as the tick crossing will activate the liquidity within any new positions using the given tick as a border.

In areas where capital efficiency is paramount, such as stable coin pairs, narrower tick spacing increases the granularity of liquidity provisioning and will likely lower price impact when swapping - the result being significantly improved prices for stable coin swaps

For more information on fee levels and their correlation to tick spacing, see the [**whitepaper.**](https://uniswap.org/whitepaper-v3.pdf)

[^1]: Tick interval refers to the area of price space between two nearest active ticks
