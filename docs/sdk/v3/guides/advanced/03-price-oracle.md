---
id: price-oracle
title: Uniswap as a Price Oracle
---

## Introduction

This guide will cover how to fetch price observations from a V3 pool to get onchain asset prices.
It is based on the [Price Oracle example](https://github.com/Uniswap/examples/tree/main/v3-sdk/oracle), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/oracle/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will observe the development of a Pool's current tick over several blocks.
We will then calculate the time weighted average price - **TWAP**, and time weighted average liquidity - **TWAL** over the observed time interval.

This guide will **cover**:

1. Fetching observations
2. Computing TWAP
3. Computing TWAL

Before diving into this guide, consider reading the theory behind using Uniswap V3 as an [Onchain Oracle](../../../../concepts/protocol/oracle.md).

:::info
The SDKs that are used in the guide are now published by the [Uniswap Foundation](https://github.com/uniswapfoundation) instead of Uniswap Labs.
You can find a list of supported SDKs [here](https://www.npmjs.com/org/uniswapfoundation).
Make sure you don't mix SDKs published by Uniswap Labs and the Uniswap Foundation to avoid unpredictable behavior.
:::

For this guide, the following Uniswap packages are used:
  
- [`@uniswapfoundation/v3-sdk`](https://www.npmjs.com/package/@uniswapfoundation/v3-sdk)

The core code of this guide can be found in [`oracle.ts`](https://github.com/Uniswap/examples/tree/main/v3-sdk/price-oracle/src/libs/oracle.ts)

## Understanding Observations

First, we need to create a Pool object to interact with the blockchain.
We use `initFromChain` to create a Pool with an RPC connection in the same manner we did in the Trading guides:

```typescript
const provider = new ethers.providers.JsonRpcProvider(
    '...rpcUrl'
    )

const pool = await Pool.initFromChain({
    provider,
    tokenA: CurrentConfig.pool.token0,
    tokenB: CurrentConfig.pool.token1,
    fee: CurrentConfig.pool.fee,
  })
```

All V3 pools store observations of the current tick and the block timestamp.

To minimize pool deployment costs, only one Observation is stored in the contract when the Pool is created.
Anyone who is willing to pay the gas costs can [increase](../../../../contracts/v3/reference/core/UniswapV3Pool.md#increaseobservationcardinalitynext) the number of stored observations to up to `65535`.

If the Pool cannot store an additional Observation, it overwrites the oldest one.

## Number of Observations

Before fetching observations, we want to make sure the Pool stores enough observations to act as a reliable oracle.

We first check how many observations are stored in the Pool by calling the `slot0` function.

```typescript
const slot0 = await pool.rpcSlot0()

const observationCount = slot0.observationCardinality
const maxObservationCount = slot0.observationCardinalityNext
```

The `observationCardinality` is the actual number of Observations the Pool **has currently stored**.

The `observationCardinalityNext` is the maximum number of Observations the Pool **can store** at the moment.

Observations are only stored when the `swap()` function is called on the Pool or when a **Position is modified**, so it can take some time to write the Observations after the `observationCardinalityNext` was increased.
If the number of Observations on the Pool is not sufficient, we need to call the `increaseObservationCardinalityNext()` function and set it to the value we desire.

This is a write function because the contract needs to store more data on the blockchain.
We will need to pay the corresponding gas fee.

In this example, we want to fetch 10 observations.

```typescript
import { ethers } from 'ethers'

let wallet = new ethers.Wallet('private_key', provider)
const observationCardinalityNext = 10

const txRes = await pool.rpcIncreaseObservationCardinalityNext({
    signer: wallet,
    observationCardinalityNext,
  })
```

The Pool will now fill the open Observation Slots.
As someone has to pay for the gas to write the observations, writing to the array of observations is part of the `swap()` and the `modifyPosition()` function of the Pool.

:::note
Saving an Observation is a write operation on the blockchain and therefore costs gas.
This means that the pool will only be able to save observations for blocks where write calls are executed on the Pool contract.
If no Observation is stored for a block, it is calculated as the time weighted arithmetic mean between the two closest Observations.
Because of this, we can be sure the oldest Observation is **at least** 10 blocks old.
It is very likely that the number of blocks covered is bigger than 10.
:::

We are now sure that at least 10 observations exist, and can safely fetch observations for the last 10 blocks.

## Fetching Observations

To fetch the `Observations` from our pool, we will use the [`observe`](../../../../contracts/v3/reference/core/UniswapV3Pool.md#observe) function:

```solidity
function observe(
    uint32[] secondsAgos
) external view override noDelegateCall returns (
    int56[] tickCumulatives, 
    uint160[] secondsPerLiquidityCumulativeX128s
)
```

The sdk wraps this function in the `rpcObserve` function on our Pool object.

```typescript
  const observeResponse = await pool.rpcObserve({ secondsAgo: timestamps })
```

Let's create an interface to map our data to:

```typescript
interface Observation {
    secondsAgo: number
    tickCumulative: bigint
    secondsPerLiquidityCumulativeX128: bigint
}
```

In this example, we calculate averages over the last ten blocks so we fetch 2 observations with 9 times the blocktime in between.
Fetching an Observation `0s` ago will return the **most recent Observation** interpolated to the current timestamp as observations are written at most once a block.

```typescript
const timestamps = [
    0, 108
]

const observeResponse = await pool.rpcObserve(timestamps)

const observations: Observation[] = timestamps.map((time, i) => {
    return {
      secondsAgo: time,
      tickCumulative: observeResponse.tickCumulatives[i],
      secondsPerLiquidityCumulativeX128:
        observeResponse.secondsPerLiquidityCumulativeX128s[i],
    }
})
```

We map the response from the RPC provider to match our `Observation` interface.

## Calculating the average Price

To calculate the time weighted average price (TWAP) in the period we fetched, we first need to understand what the values we fetched mean.

The `tickCumulative` value is a snapshot of the `tick accumulator` at the timestamp we fetched. The Tick Accumulator stores the sum of all current ticks at every second since the Pool was initialised. Its value is therefore increasing with every second.

We cannot directly use the value of a single Observation for anything meaningful. Instead we need to compare the **difference** between two Observations and calculate the **time weighted arithmetic mean**.

```typescript
const diffTickCumulative = observations[0].tickCumulative - observations[1].tickCumulative
const secondsBetween = 108

const averageTick = Number(diffTickCumulative / BigInt(secondsBetween))
```

Now that we know the average active Tick over the last 10 blocks, we can calculate the price with the `tickToPrice` function, which returns a [`Price`](../../../core/reference/classes/Price.md) Object.

```typescript
import { tickToPrice } from '@uniswapfoundation/v3-sdk'

const TWAP = tickToPrice(pool.token0, pool.token1, averageTick)
```

We have now calculated the **time weighted average price** over the last 108 seconds.

Let's continue with the average liquidity.

## Calculating the average Liquidity

To understand the term **active Liquidity**, check out the [previous guide](./03-active-liquidity.md).
Similar to the `tick accumulator`, the `liquidity accumulator` stores a sum of values for every second since the Pool was initialized and increases with every second.
Because of the size of the active liquidity value, it is impractical to just add up the active liquidity. Instead the **seconds per liquidity** are summed up.

The `secondsPerLiquidityX128` value is calculated by shifting the seconds since the last Observation by 128 bits and dividing that value by the active liquidity. It is then added to the accumulator.

```solidity
uint32 delta = blockTimestamp - last.blockTimestamp;

uint128 secondsPerLiquidityX128 = (uint160(delta) << 128) / liquidity
uint160 secondsPerLiquidityCumulativeX128 = last.secondsPerLiquidityCumulativeX128 + secondsPerLiquidityX128
```

`last` is the most recent Observation in this illustrative code snippet. Consider taking a look at the [Solidity Oracle library](https://github.com/Uniswap/v3-core/blob/main/contracts/libraries/Oracle.sol) to see the actual implementation.

Let's invert this calculation and find the average active liquidity over our observed time period.

```typescript
const diffSecondsPerLiquidityX128 = observations[0].secondsPerLiquidityCumulativeX128 -
                    observations[1].secondsPerLiquidityCumulativeX128
const secondsBetweenX128 = BigInt(108) << 128

const TWAL =  secondsBetweenX128 / diffSecondsPerLiquidityX128
```

This **time weighted average liquidity** is the harmonic mean over the time period observed.

:::note
The costs associated with manipulating/ changing the liquidity of a Pool are **orders of magnitude smaller** than with manipulating the price of the assets, as **prices** will be arbitraged for assets **with more than one market**.
Adding massive amounts of liquidity to a Pool and withdrawing them after a block has passed more or less only costs gas fees.

Use the **TWAP** with care and consider handling outliers.
:::

## Next Steps

Now that you are familiar with the Oracle feature of Uniswap, consider checking out the [next guide](./05-range-orders.md) on **Range Orders**.
