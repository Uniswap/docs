---
id: quoting
title: Getting a Quote
---     

## Introduction

This guide will cover how to get the current quotes for any token pair on the Uniswap protocol. It is based on the [Quoting code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

In this example we will use the Quoter class to get a quote for a trade from **USDC to WETH**.
The inputs are the **token in**, the **token out**, the **amount in** and the **fee**.

The **fee** input parameter represents the swap fee that is deducted from the trade and given to liquidity providers. It is one of the identifiers of a Pool, the others being **tokenIn** and **tokenOut**.

The guide will **cover**:

1. Fetching a Quote for a simple swap on one Pool

At the end of the guide, we should be able to fetch a quote for the given input token pair and the input token amount with the press of a button on the web application.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`quote.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/libs/quote.ts)

## Example configuration

We will use the example configuration `CurrentConfig` in most code snippets of this guide. It has the format:

```typescript
import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'

interface ExampleConfig {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    readableAmountIn: number
    out: Token
    poolFee: FeeAmount
  }
}

export const CurrentConfig: ExampleConfig = {...}
```

The default config of the example uses a local fork of mainnet. If you haven't already, check out our [local development guide](../02-local-development.md).
To change the rpc endpoint or the Pool used, edit the [`Currentconfig`](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/config.ts#L21).
To connect to mainnet directly, set the `mainnet` field in the config:

```typescript
export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: 1000,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
```

The pool used is defined by a pair of tokens in [`constants.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/libs/constants.ts#L14). 
You can also change these two tokens and the fee of the pool in the config, just make sure a Pool actually exists for your configuration.
Check out the top pools on [Uniswap info](https://info.uniswap.org/#/pools).

Check out the full code for the following snippets in [quote.ts](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/libs/quote.ts)

## Using the SwapQuoter class to fetch a quote

To get quotes for trades, Uniswap has deployed a Quoter Contract. We will use this contract to fetch the output amount we can expect for our trade, without actually executing the trade.

The `SwapQuoter` class allows us to interact with the Quoter Contract.
We will use the `quoteExactInputSingle` function to fetch a quote for our swap:

```typescript
async function quoteExactInputSingle<TInput extends Token, TOutput extends Token>(
    amountIn: CurrencyAmount<TInput>,
    tokenOut: TOutput,
    poolFee: FeeAmount,
    provider: Provider
): Promise<CurrencyAmount<TOutput>>
```

The function expects a `CurrencyAmount` object. We use ethers to parse the input amount:

```typescript
import { ethers } from 'ethers'
import { CurrencyAmount } from 'sdk-core'

const rawInputAmount = ethers.utils.parseUnits(
    CurrentConfig.tokens.amountIn,
    CurrentConfig.tokens.in.decimals
    )

const currencyAmountIn = CurrencyAmount.fromRawAmount(
  CurrentConfig.tokens.tokenIn,
  rawInputAmount
)
```

We can now use the SwapQuoter class to fetch a quote for our swap. We need a provider to connect to the blockchain:

```typescript
import { SwapQuoter } from '@uniswap/v3-sdk'

const provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet)

const currencyAmountOut = await SwapQuoter.quoteExactInputSingle(
  currencyAmountInt,
  CurrentConfig.tokens.out,
  CurrentConfig.tokens.poolFee,
  provider
)
```

The return value is a `CurrencyAmount` object of the expected output amount for our swap.

It should be noted that `quoteExactInputSingle` is only 1 of 4 different methods that the quoter offers:

1. `quoteExactInputSingle` - given the amount you want to swap, produces a quote for the amount out for a swap of a single pool
2. `quoteExactInput` - given the amount you want to swap, produces a quote for the amount out for a swap over multiple pools
3. `quoteExactOutputSingle` - given the amount you want to get out, produces a quote for the amount in for a swap over a single pool
4. `quoteExactOutput`  - given the amount you want to get out, produces a quote for the amount in for a swap over multiple pools

If we want to trade two tokens that do not share a pool with each other, we will need to make swaps over multiple pools.
This is where the `quoteExactInput` and `quoteExactOutput` methods come in.
We will dive deeper into routing in the [routing guide](03-routing.md).

For the `exactOutput` and `exactOutputSingle` methods, we need to keep in mind that a pool can not give us more than the amount of Tokens it holds.
If we try to get a quote on an output of 100 WETH from a Pool that only holds 50 WETH, the function call will fail.

## Next Steps

Now that you're able to make a quote, check out our next guide on [trading](./02-trading.md) using this quote!
