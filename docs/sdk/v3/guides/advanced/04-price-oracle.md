---
id: price-oracle
title: Uniswap as a Price Oracle
---

## Introduction

This guide will cover how to fetch price observations from a V3 pool to get onchain asset prices.
It is based on the [Price Oracle example](https://github.com/Uniswap/examples/tree/main/v3-sdk/price-oracle), found in the Uniswap code examples [repository](https://github.com/Uniswap/example).
To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/price-oracle/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will use **ethers JS** to observe the development of a Pool's current tick over several blocks.
We will then calculate the time weighted average price - **TWAP**, and time weighted average liquidity - **TWAL** over the observed time interval.

This guide will **cover**:

1. Understanding observations
2. Fetching observations
3. Computing TWAP
4. Computing TWAL
5. Why prefer observe over observations

Before diving into this guide, consider reading the theory behind using Uniswap V3 as an [Onchain Oracle](../../../../concepts/protocol/oracle.md).

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)

The core code of this guide can be found in [`oracle.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/oracle/src/libs/oracle.ts)

## Understanding Observations

First, we need to create a Pool contract to fetch data from the blockchain. Check out the [Pool data guide](./02-pool-data.md) to learn how to compute the address and create an **ethers Contract** to interact with.

```typescript
const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    provider
)
```

All V3 pools store observations of the current tick and the block timestamp. 
To minimize pool deployment costs, only one Observation is stored in the contract when the Pool is created.
Anyone who is willing to pay the gas costs can [increase](../../../../contracts/v3/reference/core/UniswapV3Pool.md#increaseobservationcardinalitynext) the number of stored observations to up to `65535`.
If the Pool cannot store an additional Observation, it overwrites the oldest one.

We create an interface to map our data to:

```typescript
interface Observation {
    secondsAgo: number
    tickCumulative: bigint
    secondsPerLiquidityCumulativeX128: bigint
}
```

To fetch the `Observations` from our pool contract, we will use the [`observe`](../../../../contracts/v3/reference/core/UniswapV3Pool.md#observe) function:

```solidity
function observe(
    uint32[] secondsAgos
) external view override noDelegateCall returns (
    int56[] tickCumulatives, 
    uint160[] secondsPerLiquidityCumulativeX128s
)
```

We first check how many observations are stored in the Pool by calling the `slot0` function.

```typescript
const slot0 = await poolContract.slot0()

const observationCount = slot0.observationCardinality
const maxObservationCount = slot0.observationCardinalityNext
```

The `observationCardinalityNext` is the maximum number of Observations the Pool **can store** at the moment.
The `observationCardinality` is the actual number of Observations the Pool **has currently stored**.

Observations are only stored when the `swap()` function is called on the Pool or when a **Position is modified**, so it can take some time to write the Observations after the `observationCardinalityNext` was increased.
If the number of Observations on the Pool is not sufficient, we need to call the `increaseObservationCardinalityNext()` function and set it to the value we desire.

This is a write function as the contract needs to store more data on the blockchain.
We will need a **wallet** or **signer** to pay the corresponding gas fee.

In this example, we want to fetch 10 observations.

```typescript
import { ethers } from 'ethers'

let provider = new ethers.providers.WebSocketProvider('rpcUrl...')
let wallet = new ethers.Wallet('private_key', provider)

const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    wallet
)

const txRes = await poolContract.increaseObservationCardinalityNext(10)
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

## Fetching Observations

We are now sure that at least 10 observations exist, and can safely fetch observations for the last 10 blocks.
We call the `observe` function with an array of numbers, representing the timestamps of the Observations in seconds ago from now.

In this example, we calculate averages over the last ten blocks so we fetch 2 observations with 9 times the blocktime in between.
Fetching an Observation `0s` ago will return the **most recent Observation** interpolated to the current timestamp as observations are written at most once a block.

```typescript
const timestamps = [
    0, 108
]

const [tickCumulatives, secondsPerLiquidityCumulatives] = await poolContract.observe(timestamps)

const observations: Observation[] = timestamps.map((time, i) => {
    return {
        secondsAgo: time
        tickCumulative: BigInt(tickCumulatives[i])
        secondsPerLiquidityCumulativeX128: BigInt(secondsPerLiquidityCumulatives[i]) 
    }
})
```

We map the response from the RPC provider to match our Observations interface.

## Calculating the average Price

To calculate the time weighted average price (TWAP) in the period we fetched, we first need to understand what the values we fetched mean.

The `tickCumulative` value is a snapshot of the `tick accumulator` at the timestamp we fetched. The Tick Accumulator stores the sum of all current ticks at every second since the Pool was initialised. Its value is therefore increasing with every second.

We cannot directly use the value of a single Observation for anything meaningful. Instead we need to compare the **difference** between two Observations and calculate the **time weighted arithmetic mean**.

```typescript
const diffTickCumulative = observations[0].tickCumulative - observations[1].tickCumulative
const secondsBetween = 108

const averageTick = diffTickCumulative / secondsBetween
```

Now that we know the average active Tick over the last 10 blocks, we can calculate the price with the `tickToPrice` function, which returns a [`Price`](../../../core/reference/classes/Price.md) Object. Check out the [Pool data](./02-pool-data.md) guide to understand how to construct a Pool Object and access its properties. We don't need the full Tick Data for this guide.

```typescript
import { tickToPrice, Pool } from '@uniswap/v3-sdk'

const pool = new Pool(...)

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

## Why prefer observe over observations?

As touched on previously, the `observe` function calculates Observations for the timestamps requested from the nearest observations stored in the Pool.
It is also possible to directly fetch the stored observations by calling the `observations` function with the index of the Observation that we are interested in.

Let's fetch all observations stored in our Pool. We already made sure the observationCardinality is 10.
The solidity struct `Observation` looks like this:

```solidity
struct Observation {
    // the block timestamp of the observation
    uint32 blockTimestamp;
    // the tick accumulator, i.e. tick * time elapsed since the pool was first initialized
    int56 tickCumulative;
    // the seconds per liquidity, i.e. seconds elapsed / max(1, liquidity) since the pool was first initialized
    uint160 secondsPerLiquidityCumulativeX128;
    // whether or not the observation is initialized
    bool initialized;
}
```

It is possible to request any Observation up to (excluding) index `65535`, but indices equal to or greater than the `observationCardinality` will return uninitialized Observations.

The full code to the following code snippets can be found in [`oracle.ts`](https://github.com/uniswap/examples/blob/main/v3-sdk/oracle/src/libs/oracle.ts)

```typescript
let requests = []
for (let i = 0; i < 10; i++) {
    requets.push(poolContract.observations(i))
}

const results = await Promise.all(requests)
```

We can only request one Observation at a time, so we create an Array of Promises to get an Array of Observations.

We already see one difference, to using the `observe` function here.
While `observe` creates an array onchain in the smart contract and returns it, calling `observations` requires us to make multiple RPC calls.

:::note
Depending on our setup and the Node we are using, either option can be faster, but making multiple RPC calls always has the danger of the blockchain state changing between our calls.
While it is extremely unlikely, it is still possible that our Node updates with a new block and new Observation in between our calls.
Because we access indices of an array, this would give us an unexpected result that we need to handle as an edge case in our implementation.
:::

One way to handle this behaviour is deploying or [using](https://github.com/mds1/multicall) a Contract with a [multicall](https://solidity-by-example.org/app/multi-call/) functionality to get all observations with one request.
You can also find an example of a JS multicall in the [Pool data guide](./02-pool-data.md).

We map the RPC result to the Typescript interface that we created:

```typescript
const utcNow = Math.floor(Date.now() / 1000)
const observations = results.map((result) => {
    const secondsAgo = utcNow - Number(result.blockTimeStamp)
    return {
        secondsAgo,
        tickCumulative: BigInt(result.tickCumulative),
        secondsPerLiquidityCumulativeX128: BigInt(result.secondsPerLiquidityCumulativeX128) 
    }
}).sort((a, b) => a.secondsAgo - b.secondsAgo)
```

We now have an Array of observations in the same format that we are used to.

:::note
Because Observations are stored in a **fixed size array** with always the oldest Observation overwritten if a new one is stored, they are **not sorted**.
We need to sort the result by the timestamp.
:::

The timestamps of the Observations we got are correspondent to blocks where **Swaps or Position changes** happened on the Pool.
Because of this, we would need to calculate Observations for specific intervals manually from the **surrounding Observations**.

In conclusion, it is much harder to work with `observations` than with `observe`, and we need to consider multiple edge cases.
For this reason, it is recommended to use the `observe` function.

## Next Steps

Now that you are familiar with the Oracle feature of Uniswap, consider checking out the [next guide](./05-range-orders.md) on **Range Orders**.
