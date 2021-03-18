---
id: oracle
title: Oracle
---

The Uniswap v3 oracle is a subset of functions integrated into every pair contract which store historical price data directly in the pair. The historical price data can be easily queried on-chain by anyone wishing to integrate Uniswap v3 price data into their logic.

Historical price data is stored in the form of an `Observation`. A call to the v3 oracle returns an `Observation` as of the call's specified time in the past. Multiple observation instances may be returned at once, allowing the execution of custom logic based on a given price history without any data stored in the calling contract.

The number of instances of historical price data begins at `1`, and may be lengthened by any party willing to pay the transaction fees, with a maximum potential of `65535` instances of price data, roughly correlating to 9 days of price history given a 13 second block time.

Storing price history directly in the pair contract substantially reduces the potential for logic errors on the part of the calling contract, and reduces integration costs by eliminating the need for storage in the integrating contract. Additionally, the v3 oracle observation array's considerable length makes oracle price manipulation significantly more difficult, as the calling contract may cheaply construct a TWAP over the full duration of the oracle array length.


For a deeper look, see [Observations], [Geometric mean TWAPs], and [Liquidity Accumulator]

## Observations

Oracle data is returned in the form of an `observation`, a struct in the following configuration:

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


Each time `Observe` is called, the caller must specify from how long ago to return the observation. If the given time matches a block in which an observation was written, the stored observation is returned.

## Counterfactual Observations

In some situations, the v3 oracle will return a **counterfactual** observation: an observation as it would have appeared if a block were mined at the exact time specificed by the call.

Counterfactual observations are determined in two circumstances:

* When a price is desired in the near future (at the termination of the current block, during which the call was executed)

* At a time in the past, providing it is located between two already instantiated observations.

A counterfactual observation is calculated by ??

## Tick Accumulator

The tick accumulator stores the cumulative sum of the in range tick at the time of the observation, the data is append only and continuously grows for the life of the pair.



## Liquidity Accumulator

The liquidity accumulator stores how much in-range liquidity is available at the time of the observation, the data is append only and continuously grows for the life of the pair.

When called, it returns how much in-range liquidity is available at the time of the observation, expressed by the delta between the most recent and second most recent observation. The caller must calculate the delta themselves in order to retrive the in range liquidity at the desired time.

An important note: the in range liquidity accumulator should be used with care. Liquidity and tick data are entirely uncorrolated, and there are  scenarios in which weighing price data and liquidity together may create innacurate representations of the pair.

 



## Geometric Mean TWAPs

