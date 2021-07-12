---
id: fetching-data
title: Fetching Data
tags: SDK, developer-guides, documentation
---

> Looking for a [quickstart](quick-start)?

While the SDK is fully self-contained, there are two cases where it needs _on-chain data_ to function.
This guide will detail both of these cases, and offer some strategies that you can use to fetch this data.

# Case 1: Tokens

Unsurprisingly, the SDK needs some notion of an ERC-20 token to be able to function. This immediately raises the question of _where data about tokens comes from_.

As an example, let's try to represent DAI in a format the SDK can work with. To do so, we need at least 3 pieces of data: a **chainId**, a **token address**, and how many **decimals** the token has. We also may be interested in the **symbol** and/or **name** of the token.

## Identifying Data

The first two pieces of data — **chainId** and **token address** — must be provided by us. Thinking about it, this makes sense, as there's really no other way to unambiguously identify a token.

So, in the case of DAI, we know that the **chainId** is `1` (we're on mainnet), and the **token address** is `0x6B175474E89094C44Da98b954EedeAC495271d0F`. Note that it's very important to externally verify token addresses. Don't use addresses from sources you don't trust!

## Required Data

The next piece of data we need is **decimals**.

### Provided by the User

One option here is to simply pass in the correct value, which we may know is `18`. At this point, we're ready to represent DAI as a [Token](../reference/token):

```typescript
import { ChainId, Token } from "@uniswap/sdk";

const chainId = ChainId.MAINNET;
const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // must be checksummed
const decimals = 18;

const DAI = new Token(chainId, tokenAddress, decimals);
```

If we don't know or don't want to hardcode the value, we could look it up ourselves via any method of retrieving on-chain data in a function that looks something like:

```typescript
import { ChainId } from "@uniswap/sdk";

async function getDecimals(
  chainId: ChainId,
  tokenAddress: string
): Promise<number> {
  // implementation details
}
```

### Fetched by the SDK

If we don't want to provide or look up the value ourselves, we can ask the SDK to look it up for us with [Fetcher.fetchTokenData](../reference/fetcher#fetchtokendata)

```typescript
import { ChainId, Token, Fetcher } from "@uniswap/sdk";

const chainId = ChainId.MAINNET;
const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // must be checksummed

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const DAI: Token = await Fetcher.fetchTokenData(chainId, tokenAddress);
```

By default, this method will use the [default provider defined by ethers.js](https://docs.ethers.io/v5/api/providers/#providers-getDefaultProvider).
If you're already using ethers.js in your application, you may pass in your provider as a 3rd argument.
If you're using another library, you'll have to fetch the data separately.

## Optional Data

Finally, we can talk about **symbol** and **name**. Because these fields aren't used anywhere in the SDK itself, they're optional, and can be provided if you want to use them in your application. However, the SDK will not fetch them for you, so you'll have to provide them:

```typescript
import { ChainId, Token } from "@uniswap/sdk";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin"
);
```

or:

```typescript
import { ChainId, Token, Fetcher } from "@uniswap/sdk";

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const DAI = await Fetcher.fetchTokenData(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  undefined,
  "DAI",
  "Dai Stablecoin"
);
```

# Case 2: Pairs

Now that we've explored how to define a token, let's talk about pairs. To read more about what Uniswap pairs are, see [Pair](../../../protocol/V2/reference/smart-contracts/pair)

As an example, let's try to represent the DAI-WETH pair.

## Identifying Data

Each pair consists of two tokens (see previous section). Note that WETH used by the router is [exported by the SDK](../reference/other-exports).

## Required Data

The data we need is the _reserves_ of the pair. To read more about reserves, see [getReserves](../../../protocol/V2/reference/smart-contracts/pair#getreserves).

### Provided by the User

One option here is to simply pass in values which we've fetched ourselves to create a [Pair](../reference/pair):

```typescript
import { ChainId, Token, WETH, Pair, TokenAmount } from "@uniswap/sdk";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18
);

async function getPair(): Promise<Pair> {
  const pairAddress = Pair.getAddress(DAI, WETH[DAI.chainId]);

  const reserves = [
    /* use pairAddress to fetch reserves here */
  ];
  const [reserve0, reserve1] = reserves;

  const tokens = [DAI, WETH[DAI.chainId]];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1])
    ? tokens
    : [tokens[1], tokens[0]];

  const pair = new Pair(
    new TokenAmount(token0, reserve0),
    new TokenAmount(token1, reserve1)
  );
  return pair;
}
```

Note that these values can change as frequently as every block, and should be kept up-to-date.

### Fetched by the SDK

If we don't want to look up the value ourselves, we can ask the SDK to look them up for us with [Fetcher.fetchTokenData](../reference/fetcher#fetchtokendata):

```typescript
import { ChainId, Token, WETH, Fetcher } from "@uniswap/sdk";

const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18
);

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
```

By default, this method will use the [default provider defined by ethers.js](https://docs.ethers.io/v5/api/providers/#providers-getDefaultProvider). If you're already using ethers.js in your application, you may pass in your provider as a 3rd argument. If you're using another library, you'll have to fetch the data separately.

Note that these values can change as frequently as every block, and should be kept up-to-date.
