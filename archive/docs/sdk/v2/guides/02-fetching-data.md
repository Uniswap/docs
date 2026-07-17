---
id: fetching-data
title: Fetching Data
---

> Looking for a [quickstart](quick-start)?

While the SDK is fully self-contained, there are two cases where it needs _on-chain data_ to function.
This guide will detail both of these cases, and offer a sample that you can use to fetch this data.

# Case 1: Tokens

Unsurprisingly, the SDK needs some notion of an ERC-20 token to be able to function. This immediately raises the question of _where data about tokens comes from_.

As an example, let's try to represent DAI in a format the SDK can work with. To do so, we need at least 3 pieces of data: a **chainId**, a **token address**, and how many **decimals** the token has. We also may be interested in the **symbol** and/or **name** of the token.

## Identifying Data

The first two pieces of data — **chainId** and **token address** — must be provided by us. Thinking about it, this makes sense, as there's really no other way to unambiguously identify a token.

So, in the case of DAI, we know that the **chainId** is `1` (we're on mainnet), and the **token address** is `0x6B175474E89094C44Da98b954EedeAC495271d0F`. Note that it's very important to externally verify token addresses. Don't use addresses from sources you don't trust!

## Required Data

The next piece of data we need is **decimals**.

### Provided by the User

One option here is to simply pass in the correct value, which we may know is `18`. At this point, we're ready to represent DAI as a [Token](../../core/reference/classes/Token.md):

```typescript
import { ChainId, Token } from '@uniswap/sdk-core'

const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed
const decimals = 18

const DAI = new Token(chainId, tokenAddress, decimals)
```

If we don't know or don't want to hardcode the value, we could look it up ourselves via any method of retrieving on-chain data in a function that looks something like:

```typescript
import { ChainId } from '@uniswap/sdk-core'

async function getDecimals(chainId: ChainId, tokenAddress: string): Promise<number> {
  // Setup provider, import necessary ABI ...
  const tokenContract = new ethers.Contract(tokenAddress, erc20abi, provider)
  return tokenContract["decimals"]()
}
```

## Optional Data

Finally, we can talk about **symbol** and **name**. Because these fields aren't used anywhere in the SDK itself, they're optional, and can be provided if you want to use them in your application. However, the SDK will not fetch them for you, so you'll have to provide them:

```typescript
import { ChainId, Token } from '@uniswap/sdk-core'

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
```

# Case 2: Pairs

Now that we've explored how to define a token, let's talk about pairs. To read more about what Uniswap pairs are, see [Pair](../../../contracts/v2/reference/smart-contracts/pair)

As an example, let's try to represent the DAI-WETH pair.

## Identifying Data

Each pair consists of two tokens (see previous section). Note that WETH used by the router is [exported by the SDK Core as WETH9](../../core/reference/overview.md).

## Required Data

The data we need is the _reserves_ of the pair. To read more about reserves, see [getReserves](../../../contracts/v2/reference/smart-contracts/pair#getreserves).

### Provided by the User

One option here is to simply pass in values which we've fetched ourselves to create a [Pair](../reference/pair). In this example we use ethers to fetch the data directly from the blockchain:

```typescript
import { ChainId, Token, WETH9, CurrencyAmount } from '@uniswap/sdk-core'
import { Pair } from '@uniswap/v2-sdk'

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

async function createPair(): Promise<Pair> {
  const pairAddress = Pair.getAddress(DAI, WETH9[DAI.chainId])

  // Setup provider, import necessary ABI ...
  const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, provider)
  const reserves = await pairContract["getReserves"]()
  const [reserve0, reserve1] = reserves

  const tokens = [DAI, WETH9[DAI.chainId]]
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

  const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
  return pair
}
```

Note that these values can change as frequently as every block, and should be kept up-to-date.
