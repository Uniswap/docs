---
id: pool-data
title: Fetching Pool Data
---

## Introduction

This guide will cover how to initialize a Pool with full tick data to allow offchain calculations. It is based on the [Fetching Pool data example](https://github.com/Uniswap/examples/tree/main/v3-sdk/pool-data), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/pool-data/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will use **ethers JS** and **The Graph** to construct a `Pool` object that we can use in the following guides.

This guide will **cover**:

1. Computing the Pool's address
2. Referencing the Pool contract and fetching metadata
3. Using the V3 subgraph to fetch Tick data

At the end of the guide, we should be able to view the full tick data of a pool using the example's included UI.

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`pool.ts`](https://github.com/Uniswap/v3-sdk/blob/main/src/entities/pool.ts)

## Computing the Pool's deployment address

In this example, we will construct the **USDC - WETH** Pool with **LOW** fees. The SDK provides a method to compute the address:

```typescript
import { Pool, FeeAmount } from '@uniswap/v3-sdk'
import { Token, WETH9 } from '@uniswap/sdk-core'

const USDC = new Token(1, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6)
const WETH = WETH9[USDC.chainId]
const poolAddress = Pool.getAddress(
    tokenA, 
    tokenB, 
    FeeAmount.LOW
    )
```

Uniswap V3 allows different Fee tiers when deploying a pool, so multiple pools can exist for each pair of tokens.

## Creating a Pool Contract instance and fetching metadata

Now that we have the address of a **USDC - ETH** Pool, we can construct an instance of an **ethers** `Contract` to interact with it.
To construct the Contract we need to provide the address of the contract, its ABI and the provider that will carry out the RPC call for us. We get access to the contract's ABI through the @uniswap/v3-core package, which holds the core smart contracts of the Uniswap V3 protocol:

```typescript
import { ethers } from 'ethers
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    provider
)
```

Once we have set up our reference to the contract, we can proceed to access its methods. To construct our offchain representation of the Pool Contract, we need to fetch its liquidity, sqrtPrice, currently active tick and the full Tick data.
We get the **liquidity**, **sqrtPrice** and **tick** directly from the blockchain:

```typescript
const [liquidity, slot0] =
  await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ])
```

## Fetching all Ticks

V3 pools use ticks to [concentrate liquidity](../../../concepts/protocol/concentrated-liquidity.md) in price ranges and allow for better pricing of trades.
Even though most Pools only have a couple of initialized ticks, it is possible that a pools liquidity is spread among thousands of ticks.
In that case, it can be very expensive or slow to get all of them with RPC calls.

To fetch all ticks of the **USDC - WETH Pool**, we will use the [Uniswap V3 graph](../../../api/subgraph/overview.md). To construct a `Tick` for the SDK, we need the **tickIdx**, the **liquidityGross** and the **liquidityNet**.
We define our GraphQL query:

```{
 ticks (
          where: {
            poolAddress: "${poolAddress.toLowerCase()}", 
            liquidityGross_gt: "0"}
          first: 1000
        ) {
          tickIdx
          liquidityGross
          liquidityNet
        }
}
```

We only fetch the ticks that have liquidity, and we convert the poolAddress to lower case for the subgraph to work with.
To create our Pool, we need to map the raw data we received from the subgraph to `Tick` objects that the SDK can work with:

```typescript
const sdkTicks = ticks.map((graphTick: GraphTick) => {
        return new Tick({
            index: +graphTick.tickIdx,
            liquidityGross: graphTick.liquidityGross,
            liquidityNet: graphTick.liquidityNet
        })
    })
```

:::note
GraphQL is only able to fetch 1000 records at a time. If a pool has more than 1000 initialized ticks, multiple calls are necessary to get all of them.
:::

We have everything to construct our `Pool` now:

```typescript
const usdcWethPool = new Pool(
    tokenA,
    tokenB,
    feeAmount,
    slot0.sqrtPriceX96,
    liquidity,
    slot0.tick,
    sdkTicks
)
```

With this fully initialized Pool, we can calculate swaps on it offchain, without the need to make expensive RPC calls.
