---
id: oracle
title: Oracle
---

:::note
Unfamiliar with oracles? check out the Ethereum Foundation's [oracle overview](https://ethereum.org/en/developers/docs/oracles/) first.
:::

# Overview
Oracles are smart contracts that communicate price feed information between assets traded on-chain. Their goal is to signal the trading price between a pair of assets and are often used as inputs to another contract’s execution. DeFi projects that move billions in value rely on price oracles to feed untampered data to their protocols.

Uniswap is an excellent data source for price oracles because of the sheer volume of trades. Exchanges with large volumes are likely to follow the “true” spot price of a trading pair and are more resistant to bad actors. (“True” refers to the hypothetical fair market value across all markets.)

Uniswap v3 oracles return the average price and average liquidity (volume) of a traded pair within a given interval of seconds. All of this happens within a single call. The remainder of this page will explain how Uniswap oracles work at the protocol level and an exercise in using oracles.

# How Uniswap’s Price Oracle Works
Prices received from Uniswap’s oracles represent the average price of a trading pair over some time. Calculating the average price follows in a series of steps:

1. At the beginning (or end) of each block, Uniswaps records price and time and aggregates them into a single cumulative value
2. This value written to an array and stored in state
3. The user calls a function and provides a time interval of n seconds from the current block timestamp
4. The function returns an array with the cumulative value from the beginning and end of the time interval. From these numbers, users can calculate the average price of a trading pair.

## Observations, Ticks, and Arrays
As with v2, Uniswap v3 uses an aggregate number that multiplies the two into an accumulated value. At the beginning of each block, Uniswap records the accumulated value of the first transaction that touches a token pool. Each observation contains:

```solidity
[/core/contracts/libraries/Oracle.sol](https://github.com/Uniswap/uniswap-v3-core/blob/3e88af408132fc957e3e406f65a0ce2b1ca06c3d/contracts/libraries/Oracle.sol#L12)
struct Observation {
        // the block timestamp of the observation
        uint32 blockTimestamp;
        // the tick accumulator, i.e. tick * seconds-elapsed since the pool was first initialized
        int56 tickCumulative;
        // the liquidity accumulator, i.e. liquidity * seconds-elapsed since the pool was first initialized
        uint160 liquidityCumulative;
        // whether or not the observation is initialized
        bool initialized;
    }
   ```

Of note is the integer, `tickCumulative` (we will get to `liquidityCumulative` in [#Liquidity Oracle](#Liquidity Oracle)). Recall from Concentrated-Liquidity, that a “tick” is a separation of space between prices, all the way down to 0.01%. In other words, a tick is a measurement of price positions up to 1 basis point apart, making `tickCumulative` a product of price and time.

In v3, observations are stored in an array and keep multiple data structures in storage instead of just one. Arrays allow Uniswap to store the historical price data of each block. New `tickCumulative` values with each block fill the next slot, either overwriting the previous value or writing to a new slot. By introducing an array, v3 users only need to query Uniswap once to calculate an average price instead of querying and storing data at the beginning of the desired time interval.

Each array is initialized with just one slot, but new slots can be written with a one-time gas cost. With each new slot, price oracles increase the length of time they can measure, all the way up to a maximum of 65,536 indices. Oracles can only return data as far back as their arrays allow.

<img src="/docs/v3/concepts/images/oracle-f1" alt="figure1">
Figure 1: v2 vs v3 Oracles

Uniswap expects the users to provide a time interval using the `secondsAgo` variable and subtracting it from the current block timestamp to find the start of a range. To return the current accumulated values, pass `0`.

```solidity
[/core/contracts/interfaces/pool/IUniswapV3PoolDerivedState.sol](https://github.com/Uniswap/uniswap-v3-core/blob/3e88af408132fc957e3e406f65a0ce2b1ca06c3d/contracts/interfaces/pool/IUniswapV3PoolDerivedState.sol#L18)
function observe(uint32[] calldata secondsAgo)
        external
        view
        returns (int56[] memory tickCumulatives, uint160[] memory liquidityCumulatives);
    }
   ```

## Geometric Mean Time-Weighted Average Price
With the introduction of multiple liquidity pools for the same trading pair, Uniswap v3 uses a weighted geometric mean formula to determine the average price across all pools that exist for a single pair. Understanding this concept is crucial to have a deep understanding of Uniswap’s oracles.

The change from the arithmetic (v2) to geometric mean (v3) matters because of how price is denoted in automated market makers (AMM). Unlike order books, where both sides set buy/sell orders in some other currency (USD, Yuan, Euro), AMMs denote the price of one token in terms of the other - more of a ratio than a price. When calculating the average over a period of time, the two tokens’ ratios may not be reciprocal, presenting an arbitrage opportunity.

<img src="/docs/v3/concepts/images/oracle-f2" alt="figure2">
Figure 2: UNI is represented in terms of ETH

In v2, this requirement was met by keeping track of both ratios, UNI:ETH and ETH:UNI. However, with multiple pools with different fee structures existing for the same trading pair, ratios must be reciprocal within the same pool and sister pools. Fortunately, the geometric mean has a helpful property that keeps prices reciprocal at all times, making it a better fit for v3. More on this in the #Deriving Price from Ticks below.

<img src="/docs/v3/concepts/images/oracle-f3" alt="figure3">
Figure 3: Weighted Geometric Average

## Liquidity Oracle
In [#Observations, Ticks, and Arrays](#Observations, Ticks, and Arrays), the Observation struct declared a uint160 variable named `liquidityCumulative`. As with price oracles, Uniswap v3 introduces Liquidity Oracles. The only difference is that liquidity oracles track a measure of total volume and time. Otherwise, they operate similarly and provide a data point in assessing pools with different fee tiers. Try re-reading this entire section with `liquidityCumulative` instead.

# Deriving Price from Ticks
Oracle pricing data will return two variables, as described in [#Observations, Ticks, and Arrays](#Observations, Ticks, and Arrays): `int56[] memory tickCumulatives, uint160[] memory liquidityCumulatives`. Both these values are a combination of price/liquidity and time. 

To derive price from them, calling contracts must complete the math Uniswap started when calculating its tick values (as with `liquidityCumulative`). Let us go through an example to understand better.

In this hypothetical scenario, we want to get the average trading price of UNI/ETH twice per minute. To do so, we call the Observe function at block 125 and set `30` as our `secondsAgo` value. Some other parameters: (1) At the end of block 122, 70 UNI can buy 1 ETH, and (2) Average blocktime is 10 seconds.

<img src="/docs/v3/concepts/images/oracle-f4" alt="figure4">
Figure 4: tickCumulative calculated as a time-weighted geometric average of price. 

A value of `1,399,447` is far from a price reading. What we return from our call is an interval of `[123456, 1399447]`. This interval represents the `tickCumulative` value of the current block (block 125) and the `tickCumulative` value of the block 30 seconds ago (block 122). In truth, the numbers used to bookend the range do not matter. The difference between them is the fixed variable - in this case, `1,275,990`. Furthermore, log base 1.0001 is significant because it measures up to 1 basis point in price movement between ticks.

The calling contract must complete the calculation using the [TickMath.sol](https://github.com/Uniswap/uniswap-v3-core/blob/main/contracts/libraries/TickMath.sol) library to find the average price. The `tickCumulative` equation in Figure 3 is equivalent to the dividend on the right-hand side of Figure 2. Meaning, all that’s left is dividing `tickCumulative` by the sum of time passed (wi) and raising it to the power of base 1.0001 and end up with 70.32 as our geometric mean price of UNI in terms of ETH.

<img src="/docs/v3/concepts/images/oracle-f5" alt="">

# FAQs
##### Why are observations made at the beginning of a block?
Prices at the end/beginning of a block are more difficult to manipulate than transactions further in the ordering. If an attacker submits a transaction to manipulate the price to buy tokens for cheap, some other opportunistic arbitrageur may be able to submit a transaction in the next block before the attacker could recover the trade.
