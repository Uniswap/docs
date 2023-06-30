---
id: quoting
title: Getting a Quote
---     

## Introduction

This guide will cover how to get the current quotes for any token pair on the Uniswap protocol. It is based on the [Quoting code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will use `quoteExactInputSingle` to get a quote for the pair **USDC - WETH**.
The inputs are the **token in**, the **token out**, the **amount in** and the **fee**.

The **fee** input parameters represents the swap fee that distributed to all in range liquidity at the time of the swap. It is one of the identifiers of a Pool, the others being **tokenIn** and **tokenOut**.

The guide will **cover**:

1. Computing the Pool's deployment address
2. Referencing the Pool contract and fetching metadata
3. Referencing the Quoter contract and getting a quote

At the end of the guide, we should be able to fetch a quote for the given input token pair and the input token amount with the press of a button on the web application.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`quote.ts`](https://github.com/Uniswap/examples/blob/main/v3-sdk/quoting/src/libs/quote.ts)

## Example configuration

We will use the example configuration `CurrentConfig` in most code snippets of this guide. It has the format:

```typescript
import { Token } from '@uniswap/sdk-core'

interface ExampleConfig {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

export CurrentConfig: ExampleConfig = {
    ...
}
```

## Computing the Pool's deployment address

To interact with the **USDC - WETH** Pool contract, we first need to compute its deployment address.
The SDK provides a utility method for that:

```typescript
const currentPoolAddress = computePoolAddress({
  factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
  tokenA: CurrentConfig.tokens.in,
  tokenB: CurrentConfig.tokens.out,
  fee: CurrentConfig.tokens.poolFee,
})
```

Since each *Uniswap V3 Pool* is uniquely identified by 3 characteristics (token in, token out, fee), we use those
in combination with the address of the *PoolFactory* contract to compute the address of the **USDC - ETH** Pool.
These parameters have already been defined in our configuration file:

```typescript
const WETH_TOKEN = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
)

const USDC_TOKEN = new Token(
  1,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
)

tokens: {
  in: USDC_TOKEN,
  amountIn: 1000,
  out: WETH_TOKEN,
  fee: FeeAmount.MEDIUM,
},
```

We can find the Pool Factory Contract address for our chain [here](../../../../contracts/v3/reference/Deployments.md).

## Referencing the Pool contract and fetching metadata

Now that we have the deployment address of the **USDC - ETH** Pool, we can construct an instance of an **ethers** `Contract` to interact with it:

```typescript
import { ethers } from 'ethers'

const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
const poolContract = new ethers.Contract(
  currentPoolAddress,
  IUniswapV3PoolABI.abi,
  provider
)
```

To construct the *Contract* we need to provide the address of the contract, its ABI and the provider that will carry out the RPC call for us.
We get access to the contract's ABI through the [@uniswap/v3-core](https://www.npmjs.com/package/@uniswap/v3-core) package, which holds the core smart contracts of the Uniswap V3 protocol:

```typescript
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
```

Having constructed our reference to the contract, we can now access its methods through our provider.
We use a batch `Promise` call. This approach queries state data concurrently, rather than sequentially, to minimize the chance of fetching out of sync data that may be returned if sequential queries are executed over the span of two blocks:

```typescript
const [token0, token1, fee] = await Promise.all([
  poolContract.token0(),
  poolContract.token1(),
  poolContract.fee(),
])
```

The return values of these methods will become inputs to the quote fetching function.
The `token0` and `token1` variables are the addresses of the tokens in the Pool and should not be mistaken for `Token` objects from the sdk.

:::note
In this example, the metadata we fetch is already present in our inputs. This guide fetches this information first in order to show how to fetch any metadata, which will be expanded on in future guides.
:::

## Referencing the Quoter contract and getting a quote

Like we did for the Pool contract, we need to construct an instance of an **ethers** `Contract` for our Quoter contract in order to interact with it:

```typescript
const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  Quoter.abi,
  getProvider()
)
```

We get access to the contract's ABI through the [@uniswap/v3-periphery](https://www.npmjs.com/package/@uniswap/v3-periphery) package, which holds the periphery smart contracts of the Uniswap V3 protocol:

```typescript
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
```

We get the QUOTE_CONTRACT_ADDRESS for our chain from [Github](https://github.com/Uniswap/v3-periphery/blob/main/deploys.md).

We can now use our Quoter contract to obtain the quote.

In an ideal world, the quoter functions would be `view` functions, which would make them very easy to query on-chain with minimal gas costs. However, the Uniswap V3 Quoter contracts rely on state-changing calls designed to be reverted to return the desired data. This means calling the quoter will be very expensive and should not be called on-chain.

To get around this difficulty, we can use the `callStatic` method provided by the **ethers.js** `Contract` instances.
This is a useful method that submits a state-changing transaction to an Ethereum node, but asks the node to simulate the state change, rather than to execute it. Our script can then return the result of the simulated state change:

```typescript
const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
  token0,
  token1,
  fee,
  fromReadableAmount(
    CurrentConfig.tokens.amountIn,
    CurrentConfig.tokens.in.decimals
  ).toString(),
  0
)
```

The `fromReadableAmount()` function creates the amount of the smallest unit of a token from the full unit amount and the decimals.

The result of the call is the number of output tokens you'd receive for the quoted swap.

It should be noted that `quoteExactInputSingle` is only 1 of 4 different methods that the quoter offers:

1. `quoteExactInputSingle` - given the amount you want to swap, produces a quote for the amount out for a swap of a single pool
2. `quoteExactInput` - given the amount you want to swap, produces a quote for the amount out for a swap over multiple pools
3. `quoteExactOutputSingle` - given the amount you want to get out, produces a quote for the amount in for a swap over a single pool
4. `quoteExactOutput`  - given the amount you want to get out, produces a quote for the amount in for a swap over multiple pools

## Next Steps

Now that you're able to make a quote, check out our next guide on [trading](./02-trading.md) using this quote!
