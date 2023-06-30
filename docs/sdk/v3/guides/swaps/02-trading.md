---
id: trading
title: Executing a Trade
---   

## Introduction

This guide will build off our [quoting guide](./01-quoting.md) and show how to use a quote to construct and execute a trade on the Uniswap V3 protocol. It is based on the [Trading code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/trading), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/trading/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
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

## Constructing a route from pool information

To construct our trade, we will first create an model instance of a `Pool`. We create an **ethers** contract like in the [previous guide](./01-quoting.md#referencing-the-pool-contract-and-fetching-metadata).
 We will first extract the needed metadata from the relevant pool contract. Metadata includes both constant information about the pool as well as information about its current state stored in its first slot:

```typescript
async function getPoolInfo() {
    const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.liquidity(),
        poolContract.slot0(),
    ])

    return {
        token0,
        token1,
        fee,
        tickSpacing,
        liquidity,
        sqrtPriceX96: slot0[0],
        tick: slot0[1],
    } 
}

```

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

With this `Pool`, we can now construct a route to use in our trade. We will reuse our previous quoting code to calculate the output amount we expect from our trade:

```typescript
import { Route } from '@uniswap/v3-sdk'

const swapRoute = new Route(
  [pool],
  CurrentConfig.tokens.in,
  CurrentConfig.tokens.out
)
```

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

With the quote and the route, we can now construct an unchecked trade using the route in addition to the output amount from a quote based on our input:

```typescript
import { Trade } from 'uniswap/v3-sdk'
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

Next, we use the Uniswap `SwapRouter` to get the associated call parameters for our trade and options:

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
