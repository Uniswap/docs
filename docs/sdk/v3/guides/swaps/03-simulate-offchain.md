---
id: simulate
title: Simulating trades offchain
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
2. Constructing an unchecked trade
3. Executing a trade

At the end of the guide, we should be able to create and execute a trade between any two ERC20 tokens using the example's included UI.

:::note
Included in the example application is functionality to wrap/unwrap ETH as needed to fund the example `WETH` to `USDC` swap directly from an `ETH` balance.
:::

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

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

To construct our trade, we will first create a model instance of a `Pool`. We create an **ethers** contract like in the [previous guide](./01-quoting.md#referencing-the-pool-contract-and-fetching-metadata).
We will first extract the needed metadata from the relevant pool contract. Metadata includes both constant information about the pool as well as information about its current state stored in its first slot:

```typescript
async function getPoolInfo() {
    const [token0, token1, fee, liquidity, slot0] =
    await Promise.all([
        poolContract.fee(),
        poolContract.liquidity(),
        poolContract.slot0(),
    ])

    return {
        fee,
        liquidity,
        sqrtPriceX96: slot0[0],
        tick: slot0[1],
    } 
}
```

Before continuing, let's talk about the values we fetched here and what they represent:

- `fee` is the fee that is taken from every swap that is executed on the pool in 1 per million - if the `fee` value of a pool is 500, ```500/ 1000000``` (or 0.05%) of the trade amount is taken as a fee. This fee goes to the liquidity providers of the Pool.
- `liquidity` is the amount of liquidity the Pool can use for trades at the current price.
- `sqrtPriceX96` is the current Price of the pool, encoded as a ratio between `token0` and `token1`.
- `tick` is the tick at the current price of the pool.

Check out the [whitepaper](https://uniswap.org/whitepaper-v3.pdf) to learn more on how liquidity and ticks work in Uniswap V3.
  
You can find the full code in [`pool.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/src/libs/pool.ts).

Using this metadata along with our inputs, we will then construct a `Pool`:

```typescript
const poolInfo = await getPoolInfo()

const pool = new Pool(
  CurrentConfig.tokens.in,
  CurrentConfig.tokens.out,
  CurrentConfig.tokens.poolFee,
  poolInfo.sqrtPriceX96.toString(),
  poolInfo.liquidity.toString(),
  poolInfo.tick
)
```

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
import { Route } from '@uniswap/v3-sdk'

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

As shown below, the quote is obtained using the `v3-sdk`'s `SwapQuoter`, in contrast to the [previous quoting guide](./01-quoting.md), where we directly accessed the smart contact:

```typescript
import { SwapQuoter } from '@uniswap/v3-sdk'
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core'

const { calldata } = await SwapQuoter.quoteCallParameters(
  swapRoute,
  CurrencyAmount.fromRawAmount(
    CurrentConfig.tokens.in,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    )
  ),
  TradeType.EXACT_INPUT,
  {
    useQuoterV2: true,
  }
)
```

The `SwapQuoter`'s `quoteCallParameters` function, gives us the calldata needed to make the call to the `Quoter`, and we then decode the returned quote:

```typescript
const quoteCallReturnData = await provider.call({
  to: QUOTER_CONTRACT_ADDRESS,
  data: calldata,
})

return ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData)
```

With the quote and the route, we can now construct a trade using the route in addition to the output amount from a quote based on our input.
Because we already know the expected output of our Trade, we do not have to check it again. We can use the `uncheckedTrade` function to create our Trade:

```typescript
import { Trade } from 'uniswap/v3-sdk'
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import JSBI from 'jsbi'

const uncheckedTrade = Trade.createUncheckedTrade({
  route: swapRoute,
  inputAmount: CurrencyAmount.fromRawAmount(
    CurrentConfig.tokens.in,
    fromReadableAmount(
      CurrentConfig.tokens.amountIn,
      CurrentConfig.tokens.in.decimals
    )
  ),
  outputAmount: CurrencyAmount.fromRawAmount(
    CurrentConfig.tokens.out,
    JSBI.BigInt(amountOut)
  ),
  tradeType: TradeType.EXACT_INPUT,
})
```

This example uses an exact input trade, but we can also construct a trade using exact output assuming we adapt our quoting code accordingly.

## Executing a trade

Once we have created a trade, we can now execute this trade with our provider. First, we must give the `SwapRouter` approval to spend our tokens for us:

```typescript
const tokenApproval = await getTokenTransferApproval(CurrentConfig.tokens.in)
```

You can find the approval function [here](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/src/libs/trading.ts#L151). 
We will use this function or similar implementations in most guides.

Then, we set our options that define how much time and slippage can occur in our execution as well as the address to use for our wallet:

```typescript
import { SwapOptions } from '@uniswap/v3-sdk'
import { Percent } from '@uniswap/sdk-core'

const options: SwapOptions = {
  slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
  deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
  recipient: walletAddress,
}
```

The slippage of our trade is the maximum decrease from our calculated output amount that we are willing to accept for this trade.
The deadline is the latest point in time when we want the transaction to go through. 
If we set this value too high, the transaction could be left waiting for days and we would need to pay gas fees to cancel it.

Next, we use the `SwapRouter` class, a representation of the Uniswap [SwapRouter Contract](https://github.com/Uniswap/v3-periphery/blob/v1.0.0/contracts/SwapRouter.sol), to get the associated call parameters for our trade and options:

```typescript
import { SwapRouter } from '@uniswap/v3-sdk'

const methodParameters = SwapRouter.swapCallParameters([uncheckedTrade], options)
```

Finally, we can construct a transaction from the method parameters and send the transaction:

```typescript
const tx = {
  data: methodParameters.calldata,
  to: SWAP_ROUTER_ADDRESS,
  value: methodParameters.value,
  from: walletAddress,
  maxFeePerGas: MAX_FEE_PER_GAS,
  maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
}

const res = await wallet.sendTransaction(tx)
```

## Next Steps

The resulting example allows for trading between any two ERC20 tokens, but this can be suboptimal for the best pricing and fees. To achieve the best possible price, we use the Uniswap auto router to route through pools to get an optimal cost. Our [routing](./03-routing.md) guide will show you how to use this router and execute optimal swaps.
