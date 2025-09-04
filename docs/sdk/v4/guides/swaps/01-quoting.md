---
id: quoting
title: Getting a Quote
---

## Introduction

This guide will cover how to get the current quotes for any token pair on the Uniswap protocol.

In this example we will use `quoteExactInputSingle` to get a quote for the pair **ETH - USDC**. The inputs are **poolKey**, **zeroForOne**, **exactAmount** and **hookData**.

The guide will cover:

1. Constructing the `PoolKey` and swap parameters
2. Referencing the `Quoter` contract and getting a quote

At the end of the guide, we should be able to fetch the output for the given token pair and input amount.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Constructing the PoolKey and Swap parameters

We will first create an example configuration `CurrentConfig` in `config.ts`. For this example, we are using the [0.05% ETH - USDC pool](https://app.uniswap.org/explore/pools/ethereum/0x21c67e77068de97969ba93d4aab21826d33ca12bb9f565d8496e8fda8a82ca27) which has the format:

```typescript
import { SwapExactInSingle } from '@uniswap/v4-sdk'
import { USDC_TOKEN, ETH_TOKEN } from './constants'
import { parseUnits, JsonRpcProvider, formatUnits } from 'ethers'

export const CurrentConfig: SwapExactInSingle = {
    poolKey: {
        currency0: ETH_TOKEN.address,
        currency1: USDC_TOKEN.address,
        fee: 500,
        tickSpacing: 10,
        hooks: "0x0000000000000000000000000000000000000000",
    },
    zeroForOne: true,
    amountIn: parseUnits('1', ETH_TOKEN.decimals).toString(), 
    amountOutMinimum: "0",
    hookData: '0x00'
}
```

The pool used is defined by a pair of tokens in `constants.ts`.
You can also change these two tokens and the other pool parameters in the config, just make sure a pool actually exists for your configuration.
Check out the top pools on [Uniswap](https://app.uniswap.org/#/pools).

```typescript
import { Token, ChainId } from '@uniswap/sdk-core'

export const ETH_TOKEN = new Token(
  ChainId.MAINNET,
  '0x0000000000000000000000000000000000000000',
  18,
  'ETH',
  'Ether'
)

export const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USDC'
)
```

## Referencing the Quoter contract and getting a quote

To get quotes for trades, Uniswap has deployed a **Quoter Contract**. We will use this contract to fetch the output amount we can expect for our trade, without actually executing the trade.

Now, we need to construct an instance of an **ethers** `Contract` for our Quoter contract in order to interact with it:

```typescript
const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI, // Import or define the ABI for Quoter contract
  new JsonRpcProvider("RPC") // Provide the right RPC address for the chain
)
```

We get the `QUOTE_CONTRACT_ADDRESS` for our chain from [Uniswap Deployments](https://docs.uniswap.org/contracts/v4/deployments).

We can now use our Quoter contract to obtain the quote.

In an ideal world, the quoter functions would be `view` functions, which would make them very easy to query on-chain with minimal gas costs. However, the Uniswap V4 Quoter contracts rely on state-changing calls designed to be reverted to return the desired data. This means calling the quoter will be very expensive and **should not be called on-chain.**

To get around this difficulty, we can use the `callStatic` method provided by the **ethers.js** `Contract` instances.
This is a useful method that submits a state-changing transaction to an Ethereum node, but asks the node to simulate the state change, rather than to execute it. Our script can then return the result of the simulated state change:

```typescript
const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle({
    poolKey: CurrentConfig.poolKey,
    zeroForOne: CurrentConfig.zeroForOne,
    exactAmount: CurrentConfig.amountIn, 
    hookData: CurrentConfig.hookData,
})

console.log(formatUnits(quotedAmountOut.amountOut, USDC_TOKEN.decimals));
```

The result of the call is the number of output tokens you would receive for the quoted swap.

It should be noted that `quoteExactInputSingle` is only 1 of 4 different methods that the quoter offers:

1. `quoteExactInputSingle` - given an input amount, produce a quote of the output amount for a swap on a single pool
2. `quoteExactInput` - given an input amount, produce a quote for the output amount a swap over multiple pools
3. `quoteExactOutputSingle` - given a desired output amount, produce a quote for the input amount on a swap over a single pool
4. `quoteExactOutput`  - given a desired output amount, produce a quote for the input amount in for a swap over multiple pools

If we want to trade two tokens that do not share a pool with each other, we will need to make swaps over multiple pools.
This is where the `quoteExactInput` and `quoteExactOutput` methods come in.

For the `exactOutput` and `exactOutputSingle` methods, we need to keep in mind that a pool can not give us more than the amount of Tokens it holds.
If we try to get a quote on an output of 100 ETH from a pool that only holds 50 ETH, the function call will fail.
