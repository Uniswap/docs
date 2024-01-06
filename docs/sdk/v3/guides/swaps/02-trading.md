---
id: trading
title: Executing a Trade
---   

## Introduction

This guide will build off our [quoting guide](./01-quoting.md) and show how to use a quote to construct and execute a trade on the Uniswap V3 protocol. It is based on the [Trading code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/trading), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!

To get started with local development, also check out the [local development guide](../02-local-development.md).
:::

In this example we will trade between two ERC20 tokens: **WETH and USDC**. The tokens, amount of input token, and the fee level can be configured as inputs.

The guide will **cover**:

1. Constructing a route from pool information
2. Fetching a Quote for the route
3. Executing a trade

At the end of the guide, we should be able to create and execute a trade between any two ERC20 tokens using the example's included UI.

:::note
Included in the example application is functionality to wrap/unwrap ETH as needed to fund the example `WETH` to `USDC` swap directly from an `ETH` balance.
:::

:::info
The SDKs that are used in the guide are now published by the [Uniswap Foundation](https://github.com/uniswapfoundation) instead of Uniswap Labs.
You can find a list of supported SDKs [here](https://www.npmjs.com/org/uniswapfoundation).
Make sure you don't mix SDKs published by Uniswap Labs and the Uniswap Foundation to avoid unpredictable behavior.
:::

For this guide, the following Uniswap packages are used:

- [`@uniswapfoundation/v3-sdk`](https://www.npmjs.com/package/@uniswapfoundation/v3-sdk)
- [`@uniswapfoundation/sdk-core`](https://www.npmjs.com/package/@uniswapfoundation/sdk-core)

The core code of this guide can be found in [`trading.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/src/libs/trading.ts)

## Using a wallet extension

Like in the previous guide, our [example](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading) uses a [config file ](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/src/config.ts) to configurate the inputs used.
The strucuture is similar to the quoting config, but we also have the option to select an environment:

```typescript
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  wallet: {
    address: string
    privateKey: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}
```

Per default, the env field is set to `Environment.LOCAL`:

```typescript
export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: '',
  },
  wallet: {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  tokens: {
    in: WETH_TOKEN,
    amountIn: 1,
    out: USDC_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
```

In this example, we have the option to use a Wallet Extension like Metamask to sign the transactions we are sending. To do so, let's change the Environment to `Environment.WALLET_EXTENSION`:

```typescript
export const CurrentConfig: ExampleConfig = {
  env: Environment.WALLET_EXTENSION,
  rpc: {
    local: 'http://localhost:8545',
  },
  wallet: {
    ...
  },
  tokens: {
    ...
  },
}
```

Run the example and then add the local network to your wallet browser extension, if you are using Metamask for example, follow [this guide](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).
You should also import a private key to use on your local network, for example `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` from Foundry's example wallets.

Consider checking out the [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/README.md) of the example.

If you cannot see the Tokens traded in your wallet, you possibly have to [import them](https://support.metamask.io/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask).

## Constructing a route from pool information

To construct our trade, we will first create a model instance of a `Pool`. We create an **ethers** provider like in the [previous guide](./01-quoting.md).
The sdk has a utility function to create a Pool from onchain data:

```typescript
  import {Pool} from '@uniswapfoundation/v3-sdk'
  import ethers from 'ethers'

  const provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet)

  const pool = await Pool.initFromChain(
    provider,
    CurrentConfig.tokens.in,
    CurrentConfig.tokens.out,
    CurrentConfig.tokens.poolFee
  )
```

Every Pool is uniquely identified by the two tokens it contains and its fee.
The initialized Pool already has all necessary metadata for our example but does not contain any Tick Data. 
Fetching Ticks can be expensive for large pools and is not necessary for most use cases.
We will dive deeper into this topic in the [next guide](./03-simulate-offchain.md)
  
You can find the full code in [`pool.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/src/libs/pool.ts).

## Creating a Route

With this `Pool`, we can now construct a route to use in our trade. Routes represent a route over one or more pools from one Token to another. Let's imagine we have three pools:

```
- PoolA: USDC/ WETH
- PoolB: USDT/ WETH
- PoolC: USDT/ DAI
```

We would like to trade from USDC to DAI, so we create a route through our 3 pools:

```
PoolA -> PoolB -> PoolC
```

The `Route` object can find this route from an array of given pools and an input and output Token.

To keep it simple for this guide, we only swap over one Pool:

```typescript
import { Route } from '@uniswapfoundation/v3-sdk'

const swapRoute = new Route(
  [pool],
  CurrentConfig.tokens.in,
  CurrentConfig.tokens.out
)
```

Our `Route` understands that `CurrentConfig.tokens.in` should be traded for `CurrentConfig.tokens.out` over the Array of pools `[pool]`.

## Constructing an unchecked trade

Once we have constructed the route object, we now need to obtain a quote for the given `inputAmount` of the example:

```typescript
const amountOut = await getOutputQuote(swapRoute)
```

As shown below, the quote is obtained using the `v3-sdk`'s `SwapQuoter`, for this guide we use the `callQuoter()` function.
In contrast to the `quoteExactInputSingle()` function we used in the previous guide, this function works for a Route with any number of Uniswap V3 Pools, not just a swap over a single Pool:

```typescript
import { SwapQuoter } from '@uniswapfoundation/v3-sdk'
import { CurrencyAmount, TradeType } from '@uniswapfoundation/sdk-core'

const rawInputAmount = ethers.utils.parseUnits(
    CurrentConfig.tokens.amountIn,
    CurrentConfig.tokens.in.decimals
    )

const currencyAmountIn = CurrencyAmount.fromRawAmount(
  CurrentConfig.tokens.tokenIn,
  rawInputAmount
)

const expectedOutput = await SwapQuoter.callQuoter({
  route: swapRoute,
  amount: currencyAmountIn,
  tradeType: TradeType.EXACT_INPUT,
  provider
})
```

We construct the input the same way we did in the previous guide.
The return value of the `callQuoter()` function is the expected output, parsed as a `CurrencyAmount` object.

With the quote and the route, we can now construct a trade using the route in addition to the output amount from a quote based on our input.
Because we already know the expected output of our Trade, we do not have to check it again. We can use the `uncheckedTrade` function to create our Trade:

```typescript
import { Trade } from '@uniswapfoundation/v3-sdk'

const uncheckedTrade = Trade.createUncheckedTrade({
  route: swapRoute,
  inputAmount: currencyAmountIn,
  outputAmount: expectedOutput,
  tradeType: TradeType.EXACT_INPUT,
})
```

This example uses an exact input trade, but we can also construct a trade using exact output assuming we adapt our quoting code accordingly.

## Executing a trade

Once we have created a trade, we can now execute this trade with our provider.
We will use the `executeTrade()` function of the `SwapRouter` class.
First we specify the deadline and the slippage tolerance we are willing to accept for our trade:

```typescript
import { SwapOptions } frpm '@uniswapfoundation/v3-sdk'
import { Percent } from '@uniswapfoundation/sdk-core'

const swapOptions: SwapOptions = {
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes from the current Unix time
        recipient: walletAddress,
      }
```

The slippage of our trade is the maximum decrease from our calculated output amount that we are willing to accept for this trade.
The deadline is the latest point in time when we want the transaction to go through.
If we set this value too high, the transaction could be left waiting for days and we would need to pay gas fees to cancel it.
The swapOptions are an optional parameter of the `executeTrade()` function and default to exactly what we specified here if they are not provided.

As we want to execute a state changing transaction on the blockchain, we need a wallet to sign our transaction:

```typescript
import { ethers } from 'ethers'

const wallet = getWallet()
wallet.connect(provider)
```

We are now ready to execute our trade:

```typescript
import { SwapRouter } from '@uniswapfoundation/v3-sdk'

const txResponse = await SwapRouter.executeTrade({
  trades: [uncheckedTrade],
  options: swapOptions,
  signer: wallet
})
```

The function automatically checks if the necessary token transfer approvals exist and creates them if not.
For this reason, we usually need to wait 2 blocks for the execution to finish.
The return value is an `ethers.TransactionResponse` object.

## Next Steps

So far, we have used onchain calls to get a quote for our trades.
In the next guide on [offchain simulations](03-simulate-offchain.md), we will use the sdk to fetch Tickdata first and simulate our Trades offchain.
