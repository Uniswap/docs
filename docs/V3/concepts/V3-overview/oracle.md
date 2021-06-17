---
id: oracle
title: Oracle
---

:::note
Unfamiliar with oracles? check out the Ethereum Foundation's [oracle overview](https://ethereum.org/en/developers/docs/oracles/) first.
:::

All Uniswap v3 pools can serve as oracles, offering access to historical price and liquidity data. This capability unlocks a wide range of on-chain use cases.

Historical data is stored as an array of observations. At first, each pool tracks only a single observation, overwriting it as blocks elapse. This limits how far into the past users may access data. However, any party willing to pay the transaction fees may [increase the number of tracked observations](https://docs.uniswap.org/reference/core/libraries/Oracle#grow) (up to a maximum of `65535`), expanding the period of data availability to 9 days or more.

Storing price history directly in the pool contract substantially reduces the potential for logical errors on the part of the calling contract, and reduces integration costs by eliminating the need to store historical values. Additionally, the v3 oracle's considerable maximum length makes oracle price manipulation significantly more difficult, as the calling contract may cheaply construct a TWAP over an arbitrary position inside of, or encompassing, the full length of the oracle array.

## Observations

`Observation`s take the following form:

```solidity
function observe(
        Observation[65535] storage self,
        uint32 time,
        uint32[] memory secondsAgos,
        int24 tick,
        uint16 index,
        uint128 liquidity,
        uint16 cardinality
    ) internal view returns (int56[] memory tickCumulatives, uint160[] memory liquidityCumulatives) {
```

Each time `observe` is called, the caller must specify from how long ago to return the observation. If the given time matches a block in which an observation was written, the stored observation is returned.

Observations can be fetched as of any second, corresponding to either an actual observation, if one exists in storage, or a linearly interpolated one.

if called mid-block with secondsAgo = 0, assuming that the pool has already been interacted within the given block, `observe` returns the most recently written observation, which will be the value as of the beginning of the block.

When a price is desired in the near future (at the termination of the current block, during which the call was executed), or if 1 or more seconds have gone by since the last block in which an observation was recorded, no stored observation will exist, and a counterfactual observation will be returned.

## Tick Accumulator

The tick accumulator stores the cumulative sum of the active tick at the time of the observation. The tick accumulator value increases monotonically and grows by the value of the current tick - per second.

To derive the tick as of the given timestamp, the caller needs to retrieve an observation before the given timestamp, take the delta of the two values, and divide by the time elapsed between them. Calculating a TWAP from the price accumulator is also covered in the [**whitepaper**](https://uniswap.org/whitepaper-v3.pdf).

## Liquidity Accumulator

The liquidity accumulator stores how much in-range liquidity is available at the time of the observation. The liquidity accumulator value increases monotonically and grows by the value of the in-range liquidity - per second.

To derive the tick as of the given timestamp, the caller needs to retrieve an observation before the given timestamp, take the delta of the two values, and divide by the time elapsed between them. Calculating a TWAPs are addressed in finer detail in the [**whitepaper**](https://uniswap.org/whitepaper-v3.pdf).

:::note
The in-range liquidity accumulator should be used with care. Liquidity and tick data are entirely uncorrelated, and there are scenarios in which weighing price data and liquidity together may create inaccurate representations of the pool.
:::

## Deriving Price From A Tick

> When we use "active tick" or otherwise refer to the current tick of a pool, we mean the lower tick boundary that is closest to the current price.

When a pool is created, each token is assigned to either `token0` or `token1` based on the contract address of the tokens in the pair. Whether or not a token is `token0` or `token1` is meaningless; it is only used to maintain a fixed assignment for the purpose of relative valuation and general logic in the pool contract.

Deriving an asset price from the current tick is achievable due to the fixed expression across the pool contract of token0 in terms of token1.

---

An example of finding the price of WETH in a WETH / USDC pool, where WETH is `token0` and USDC is `token1`:

You have an oracle reading that shows a return of `tickCumulative` as [70,000, 1,000,000], with an elapsed time between the observations of 13 seconds.

The current tick is `71,538.46` as expressed by the delta between the most recent and second most recent value of `tickCumulative`, divided by the elapsed seconds time between the readings.

With a tick reading of `71,538.46,`, we can find the value of `token0` relative to `token1` by using the current tick as `i' in `𝑝(𝑖) = 1.0001^𝑖`

`1.0001^71,538.46 = 1278.56`

tick `71,538.46` gives us a price of WETH as 1278.56 in terms of USDC

---

Ticks are signed integers and can be expressed as a negative number, so for any circumstances where `token0` is of a lower value than `token1`, a negative tick value will be returned by `tickCumulative` and a relative value of `< 1` will be returned by a calculation of `token0` in terms of `token1`.
