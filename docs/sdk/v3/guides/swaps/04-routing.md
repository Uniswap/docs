---
id: routing
title: Routing a Swap
---

## Introduction

This guide will cover how to use Uniswap's smart order router to compute optimal routes and execute swaps. Rather than trading between a single pool, smart routing may use multiple hops (as many as needed) to ensure that the end result of the swap is the optimal price. It is based on the [routing code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/routing), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/routing/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will trade between **WETH and USDC**, but you can configure your example to us any two currencies and amount of input currency.

The guide will **cover**:

1. Creating a router instance
2. Creating a route
3. Swapping using a route

At the end of the guide, we should be able to create a route and and execute a swap between any two currencies tokens using the example's included UI.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/smart-order-router`](https://www.npmjs.com/package/@uniswap/smart-order-router)

The core code of this guide can be found in [`routing.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/routing/src/libs/routing.ts)

The config, which we will use in some code snippets in this guides has this structure:

```typescript
import { Token } from '@uniswap/sdk-core'

interface ExampleConfig {
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
  }
}

export const CurrentConfig: ExampleConfig = {...}
```

## Creating a router instance

To compute our route, we will use the `@uniswap/smart-order-router` package, specifically the `AlphaRouter` class which requires a `chainId` and a `provider`. Note that routing is not supported for local forks, so we will use a mainnet provider even when swapping on a local fork:

```typescript
import { AlphaRouter, ChainId } from '@uniswap/smart-order-router'

const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

const router = new AlphaRouter({
  chainId: ChainId.MAINNET,
  provider,
})
```

## Creating a route

We will use the [SwapRouter02](https://github.com/Uniswap/v3-periphery/blob/v1.0.0/contracts/SwapRouter.sol) for our trade.
The `smart-order-router` package provides us with a SwapOptionsSwapRouter02` interface, defining the wallet to use, slippage tolerance, and deadline for the transaction that we need to interact with the contract:

```typescript
import { SwapOptionsSwapRouter02, SwapType } from '@uniswap/smart-order-router'
import { Percent } from '@uniswap/sdk-core'

const options: SwapOptionsSwapRouter02 = {
  recipient: CurrentConfig.wallet.address,
  slippageTolerance: new Percent(50, 10_000),
  deadline: Math.floor(Date.now() / 1000 + 1800),
  type: SwapType.SWAP_ROUTER_02,
}
```

Like explained in the [previous guide](./02-trading.md#executing-a-trade), it is important to set the parameters to sensible values.

Using these options, we can now create a trade (`TradeType.EXACT_INPUT` or `TradeType.EXACT_OUTPUT`) with the currency and the input amount to use to get a quote. For this example, we'll use an `EXACT_INPUT` trade to get a quote outputted in the quote currency.

```typescript
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core'

const rawTokenAmountIn: JSBI = fromReadableAmount(
      CurrentConfig.currencies.amountIn,
      CurrentConfig.currencies.in.decimals
    )

const route = await router.route(
  CurrencyAmount.fromRawAmount(
    CurrentConfig.currencies.in,
    rawTokenAmountIn
  ),
  CurrentConfig.currencies.out,
  TradeType.EXACT_INPUT,
  options
)
```

The `fromReadableAmount` function calculates the amount of tokens in the Token's smallest unit from the full unit and the Token's decimals:

```typescript title="src/libs/conversion.ts"
export function fromReadableAmount(amount: number, decimals: number): JSBI {
  const extraDigits = Math.pow(10, countDecimals(amount))
  const adjustedAmount = amount * extraDigits
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
    ),
    JSBI.BigInt(extraDigits)
  )
}
```

`route` and `route.methodParameters` are *optional* as the request can fail, for example if **no route exists** between the two Tokens or because of networking issues.
We check if the call was succesful:

```typescript
if (!route || !route.methodParameters) {
    // Handle failed request
}
```

Depending on our preferences and reason for the issue we could retry the request or throw an Error.

## Swapping using a route

First, we need to give approval to the `SwapRouter` smart contract to spend our tokens for us:

```typescript
import { ethers } from 'ethers'
...

const wallet = new ethers.Wallet(privateKey, provider)
const tokenContract = new ethers.Contract(
    CurrentConfig.tokens.in.address, 
    ERC20ABI, 
    wallet
)
const tokenApproval = await tokenContract.approve(
    V3_SWAP_ROUTER_ADDRESS, 
    ethers.BigNumber.from(rawTokenAmountIn.toString())
)
```

To be able to spend the tokens of a wallet, a smart contract first needs to get an approval from that wallet. 
ERC20 tokens have an `approve` function that accepts the address of the smart contract that we want to allow spending our tokens and the amount the smart contract should be allowed to spend.

We can get the **V3_SWAP_ROUTER_ADDRESS** for our chain from [Github](https://github.com/Uniswap/v3-periphery/blob/main/deploys.md). 
Keep in mind that different chains might have **different deployment addresses** for the same contracts.
The deployment address for local forks of a network are the same as in the network you forked, so for a **fork of mainnet** it would be the address for **Mainnet**.

We need to wait one block for the approval transaction to be included by the blockchain.

Once the approval has been granted, we can now execute the trade using the route's computed calldata, values, and gas values:

```typescript
const txRes = await wallet.sendTransaction({
  data: route.methodParameters.calldata,
  to: V3_SWAP_ROUTER_ADDRESS,
  value: route.methodParameters.value,
  from: wallet.address,
  maxFeePerGas: MAX_FEE_PER_GAS,
  maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
})
```

After swapping, you should see the currency balances update in the UI shortly after the block is confirmed.

You can find the full code in [`routing.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/routing/src/libs/routing.ts).

## Next Steps

Now that you're familiar with trading, consider checking out our next guides on [pooling liquidity](../liquidity/01-position-data.md) to Uniswap!
