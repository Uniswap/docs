---
id: oracle
title: Oracle
---

All Uniswap v3 pools are capable of serving as _oracles_, offering access to historical price and liquidity data. This capability unlocks a wide range of on-chain use cases.

Historical data is stored as an array of observations. At first, each pool tracks only a single observation, overwriting it as blocks elapse. This limits how far into the past users may access data. However, any party willing to pay the transaction fees may increase the number of tracked observations (up to a maximum of `65535`), expanding the period of data availability to 9 days or more.

Storing price history directly in the pool contract substantially reduces the potential for logical errors on the part of the calling contract, and reduces integration costs by eliminating the need to store historical values. Additionally, the v3 oracle's considerable minimum length makes oracle price manipulation significantly more difficult, as the calling contract may cheaply construct a TWAP over an arbitrary postition inside of, or encompassing, the full length of the oracle array.

## Observations

// TODO i would modify this section to include the function signature/return values of `observe`, not the `Observation`. `Observation`s are low-level, and if discussed, deserve a smaller section lower down with an emphasis on why you'd need access to a particular `Observation` (outlier filtering, or something like that), and how to get them (not via `observe`, but by `observations(i)` array access)

`Observation`s take the following form:

```solidity
struct Observation {
        // the block timestamp of the observation
        uint32 blockTimestamp;
        // the tick accumulator, i.e. tick * time elapsed since the pool was first initialized
        int56 tickCumulative;
        // the liquidity accumulator, i.e. liquidity * time elapsed since the pool was first initialized
        uint160 liquidityCumulative;
        // whether or not the observation is initialized
        bool initialized;
```

Each time `observe` is called, the caller must specify from how long ago to return the observation. If the given time matches a block in which an observation was written, the stored observation is returned.

## Counterfactual Observations

// TODO i would not focus on counterfactual observations as a top-level section. i would instead recommend that you emphasize that observations can be fetched as of any second, corresponding to either an actual transaction or a linearly interpolated. the bit about times more recent than the most recent block is good though, and it should be worth mentioning that `secondsAgo` = 0 corresponds to either an interpolated observation _or_ the accumulator values as of the beginning of the block (if the call is happening within a block)

In some situations, the v3 oracle will return a **counterfactual** observation: an observation as it would have appeared if a block were mined at the exact time specified by the call. 

Counterfactual observations are returned in two circumstances:

* When a price is desired in the near future (at the termination of the current block, during which the call was executed). If 1 or more seconds have gone by since the last block in which an observation was recorded, no observation will exist.

* At a time in the past, providing it is located between two previously written observations. This primarily concerns observations returned from a time inside a single block.

A counterfactual observation is constructed by taking the first observation prior to the given timestamp, and adding the seconds elapsed since that observation, multiplied by the value of tick/liquidity at the end of the block following the initially queried observation.

A counterfactual observation is as effective as a written observation, and should make no difference in terms of safety or to the user of an integrating entity.

## Tick Accumulator

// TODO append-only isn't the right term here, that refers to an array whose length never goes down. accumulators are monotonically increasing (except in the case of overflow). same goes for liquidity acc section

// TODO the phrasing of the second para is weird. accumulator values are valid for a particular timestamp. to get the tick/liquidity as of that timestamp, you need an observation before or after or both, which lets you take a delta and divide out by the time elapsed.

The tick accumulator stores the cumulative sum of the active tick at the time of the observation, the data is append only and continuously grows for the life of the pool.

When called, it returns the in-range tick available at the time of the observation, expressed by the delta between the most recent and second most recent observation. The caller must calculate the delta themselves in order to retrieve the active tick at the time of the observation.

When we use “active tick” or otherwise refer to the current tick of a pool, we mean the lower tick boundary that is closest to the current price.


## Liquidity Accumulator

The liquidity accumulator stores how much in-range liquidity is available at the time of the observation, the data is append only and continuously grows for the life of the pool.

When called, it returns how much in-range liquidity is available at the time of the observation, expressed by the delta between the most recent and second most recent observation. The caller must calculate the delta themselves in order to retrieve the in-range liquidity at the desired time.

- An important note: the in-range liquidity accumulator should be used with care. Liquidity and tick data are entirely uncorrelated, and there are scenarios in which weighing price data and liquidity together may create inaccurate representations of the pool.


## Deriving price from a tick

When a pool is created, each token is assigned to either `token0` or `token1` based on the contract address of the tokens in the pair. Whether or not a token is `token0` or `token1` is meaningless; it is only used to maintain a fixed assignment for the purpose of relative valuation and general logic in the pool contract. 

Deriving an asset price from the current tick is achievable due to the fixed expression across the pool contract of token0 in terms of token1.

----

An example of finding the price of WETH in a WETH / USDC pool, where WETH is `token0` and USDC is `token1`: 

You have an oracle reading that shows a return of `tickCumulative` as [70000, 140000]

The current tick is `70,000` as expressed by the delta between the most recent and second most recent value of `tickCumulative`

With a tick reading of 70,000, we can find the value of `token0` relative to `token1` by using the current tick as `i` in `𝑝(𝑖) = 1.0001^𝑖`

`1.0001^70000 = 1996.25` 

tick `70,000` gives us a price of WETH as 1096.25 in terms of USDC

----

Ticks are signed integers and can be expressed as a negative number, so for any circumstances where `token0` is of a lower value than `token1`, a negative tick value will be returned by `tickCumulative` and a relative value of `< 1` will be returned by a calculation of `token0` in terms of `token1`.