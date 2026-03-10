---
id: multi-hop-swapping
title: Executing Multi-Hop Swaps
sidebar_position: 3
---

## Introduction

This guide demonstrates how to execute multi-hop swaps on Uniswap V4, allowing you to trade between tokens that might not share a direct pool. Multi-hop swaps route through multiple pools to achieve the desired token exchange, often providing better pricing than attempting direct swaps through less liquid pools.

Building on our [single-hop swap guide](./single-hop-swapping.md), this guide will show you how to construct routing paths and execute them efficiently.

The guide will cover:

1. Constructing swap paths through multiple pools
2. Executing the multi-hop swap

At the end of this guide, you should be able to execute swaps between any two tokens using optimal routing through multiple pools.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/universal-router-sdk`](https://www.npmjs.com/package/@uniswap/universal-router-sdk)

## Constructing swap paths through multiple pools

Let's first define a multi-hop swap configuration. In this example, we'll swap ETH → USDC → USDT. The configuration follows closely from the quoting and single-hop swapping guides.

```typescript
import { SwapExactIn, PoolKey } from '@uniswap/v4-sdk'
import { ETH_TOKEN, USDC_TOKEN, USDT_TOKEN } from './constants'

const ETH_USDC_POOL_KEY: PoolKey = {
    currency0: ETH_TOKEN.address,
    currency1: USDC_TOKEN.address,
    fee: 3000,
    tickSpacing: 60,
    hooks: "0x0000000000000000000000000000000000000000",
};

const USDC_USDT_POOL_KEY: PoolKey = {
    currency0: USDC_TOKEN.address,
    currency1: USDT_TOKEN.address,
    fee: 10,
    tickSpacing: 1,
    hooks: "0x0000000000000000000000000000000000000000",
};

export const CurrentConfig: SwapExactIn = {
    currencyIn: ETH_TOKEN.address,
    path: encodeMultihopExactInPath(
        [ETH_USDC_POOL_KEY, USDC_USDT_POOL_KEY],
        ETH_TOKEN.address
    ),
    maxHopSlippage: [], // Optional: per-hop slippage limits (one entry per hop). Empty array disables per-hop checks.
    amountIn: ethers.utils.parseUnits('1', ETH_TOKEN.decimals).toString(),
    amountOutMinimum: "minAmountOut", // Change according to the slippage desired
}
```

Uniswap V4 uses a specific format for encoding multi-hop paths. Each hop in the path requires:

```typescript
type PathKey = {
    intermediateCurrency: string;
    fee: number;
    tickSpacing: number;
    hooks: string;
    hookData: string;
};
```

We can encode the path using a function like:

```typescript
export function encodeMultihopExactInPath(
  poolKeys: PoolKey[],
  currencyIn: string
): PathKey[] {
  const pathKeys: PathKey[] = []
  let currentCurrencyIn = currencyIn
  
  for (let i = 0; i < poolKeys.length; i++) {
    // Determine the output currency for this hop
    const currencyOut = currentCurrencyIn === poolKeys[i].currency0
      ? poolKeys[i].currency1
      : poolKeys[i].currency0
    
    // Create path key for this hop
    const pathKey: PathKey = {
      intermediateCurrency: currencyOut,
      fee: poolKeys[i].fee,
      tickSpacing: poolKeys[i].tickSpacing,
      hooks: poolKeys[i].hooks,
      hookData: '0x'
    }
    
    pathKeys.push(pathKey)
    currentCurrencyIn = currencyOut // Output becomes input for next hop
  }
  
  return pathKeys
}
```

## Executing the multi-hop swap

We'll use the same contract addresses and ABIs from the single-hop guide and construct the **ethers** `Contract` for them:

```typescript
const UNIVERSAL_ROUTER_ADDRESS = "0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af"
const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3"

// ABIs remain the same as in single-hop guide
const UNIVERSAL_ROUTER_ABI = [/* ... */]
const ERC20_ABI = [/* ... */]
const PERMIT2_ABI = [/* ... */]
```

The main function for executing multi-hop swaps is very similar to the single-hop guide as well. The only difference is that the first action to the Universal Router is `SWAP_EXACT_IN` instead of `SWAP_EXACT_IN_SINGLE`.

```typescript
import { Actions, V4Planner } from '@uniswap/v4-sdk'
import { CommandType, RoutePlanner } from '@uniswap/universal-router-sdk'

const v4Planner = new V4Planner()
const routePlanner = new RoutePlanner()

const deadline = Math.floor(Date.now() / 1000) + 3600

v4Planner.addAction(Actions.SWAP_EXACT_IN, [CurrentConfig]);
v4Planner.addAction(Actions.SETTLE_ALL, [ETH_USDC_POOL_KEY.currency0, CurrentConfig.amountIn]);
v4Planner.addAction(Actions.TAKE_ALL, [USDC_USDT_POOL_KEY.currency1, CurrentConfig.amountOutMinimum]);

const encodedActions = v4Planner.finalize()

routePlanner.addCommand(CommandType.V4_SWAP, [v4Planner.actions, v4Planner.params])

// Only needed for native ETH as input currency swaps
const txOptions: any = {
    value: CurrentConfig.amountIn
}

const tx = await universalRouter.execute(
  routePlanner.commands,
  [encodedActions],
  deadline,
  txOptions
)

const receipt = await tx.wait()
console.log('Multi-hop swap completed! Transaction hash:', receipt.transactionHash)
```

The token approvals for ERC20 token swaps remain the same as the [single-hop swapping guide](./02-single-hop-swapping.md).

## Next Steps

Now that you're familiar with trading, consider checking out our next guides on [pooling liquidity](../liquidity/01-pool-data.md) to Uniswap!
