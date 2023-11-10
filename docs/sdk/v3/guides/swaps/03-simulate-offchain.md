---
id: simulate
title: Simulating Trades
---   

## Introduction

In this guide, we will fetch tickdata for several pools and simulate trades offchain to find the best possible route, before executing our trade onchain.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!

To get started with local development, also check out the [local development guide](../02-local-development.md).
:::

In this example we will trade between two ERC20 tokens: **USDC and DAI**. The tokens, amount of input token, and the available Pools can be configured as inputs.

The guide will **cover**:

1. Constructing a fully initialized Pool
2. Simulating Swaps
3. Executing a Trade

At the end of the guide, we should be able to initialize Pools with full tickdata and simulate trades offchain.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`simulations.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/offchain-simulation/src/libs/simulations.ts)

## Example configuration

We will use the example configuration `CurrentConfig` in most code snippets of this guide. It has the format:

```typescript
import { Token } from '@uniswap/sdk-core'
import { FeeAmount, Pool } from '@uniswap/v3-sdk'

interface ExampleConfig {
  rpc: {
    local: string,
    mainnet: string
  }
  tokens: {
    in: Token
    readableAmountIn: number
    out: Token
  },
  pools: Pool[]
}

export const CurrentConfig: ExampleConfig = {...}
```

The default config of the example uses a local fork of mainnet. If you haven't already, check out our [local development guide](../02-local-development.md).
To change the rpc endpoint or the Pools used, edit the [`Currentconfig`](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/config.ts#L21).

```typescript
export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: '...'
  },
  tokens: {
    in: USDC_TOKEN,
    readableAmountIn: 1000,
    out: DAI_TOKEN,
  },
  pools: [
    USDC_WETH_Pool,
    USDT_WETH_Pool, 
    USDT_DAI_Pool
    ]
}
```

Fetching the TickData for a Pool requires a lot of RPC requests. Make sure you are aware of the costs of your RPC provider and strongly consider using a websocket provider for performance.
Free, public rpc endpoints are usually not fast enough to fetch this amount of data in a sensible time.
This functionality of the sdk will usually be used in a backend.

The pools used in the configuration are imported from `constants.ts`. You can add any Pool you want to the array, just make sure they exist onchain.
Check out the top pools on [Uniswap info](https://info.uniswap.org/#/pools).

## Initializing the Pools

We already initialized a Pool object in the previous guide using the `getPoolData` function.
By default, a Pool does not hold the full Tickdata necessary to compute trades, as fetching it is not necessary for most use cases and can be expensive.

To fetch the full Tickdata for the Pool, we use the `initializeTicks()` function on our Pools:

```typescript
import { ethers } from 'ethers'

const provider = new ethers.providers.JsonRpcProvider(CurrenConfig.rpc.local)

let promises = []

let pools = CurrentConfig.pools
for (let pool of pools) {
  const request = pool.initializeTicks(provider)
  promises.push(request)
}

await Promise.all(promises)
```

Our pools are now fully initialized and we can use them to simulate our trade offchain.

## Simulating trades

In this example, we want to make an exact Input trade from **USDC** to **DAI**. 
We use the `Trade.bestTradeExactIn` function to find the best route given our Pools:

```typescript
import { Trade, BestTradeOptions } from '@uniswap/v3-sdk'
import { CurrencyAmount } from '@uniswap/sdk-core'

const currencyAmountIn = CurrencyAmount.fromRawAmount(...)

const bestTrades = Trade.bestTradeExactIn(
  pools,
  currencyAmountIn,
  CurrentConfig.tokens.out
)

const bestTrade = bestTrades[0]
```

The function allows us to optionally define `BestTradeOptions`.
The maxNumResults is the maximum number of Trades that should be returned, the maxHops is the maximum number of Pools that should be used in a single Route in one of those trades.
We will keep the default configuration in this example:

```typescript
{ maxNumResults = 3, maxHops = 3 }
```

We can get the output amount and the routes that are used by the Trade from the object returned.
The `bestTradeExactIn` function considers splitting the trade between multiple routes, so for larger trades the input amount may be split between several routes.
We can access them with the `swaps` getter if we want to access this information.

## Executing the trade

Like in the previous guide, we execute the trade with `executeTrade()` on the `SwapRouter` class:

```typescript
import { SwapRouter } from '@uniswap/v3-sdk'

wallet.connect(provider)
const txResponse = SwapRouter.executeTrade(
  [bestTrade[0]],
  ,
  wallet
)
```

### Doing everything at once

If you are not interested in the quote or don't want to initialize the pools yourself, you can directly execute a swap by using the `executeBestSimulatedSwapOnPools()` function:

```typescript
wallet.connect(provider)

const txResponse = SwapRouter.executeBestSimulatedSwapOnPools(
  pools,
  currencyAmountIn,
  CurrentConfig.tokens.in,
  CurrentConfig.tokens.out,
  TradeType.EXACT_INPUT,
  undefined,
  undefined,
  wallet
)
```

This function is an abstraction of all the steps laid out in this guide and directly executes the best trade found by the `bestTradeExactIn` or `bestTradeExactOut` functions.

## Next Steps

Now that you are familiar with simulating Trades and finding optimal routes offchain, we will demonstrate an alternative solution for routing in the [next guide](04-routing.md).
