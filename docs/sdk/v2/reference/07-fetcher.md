---
id: fetcher
title: Fetcher
---

The data fetching logic is split from the rest of the code for better tree-shaking,
i.e. so that it does not get packaged into your code unless it is used.
The SDK is otherwise unconcerned with how you get data from the blockchain.

This class contains static methods for constructing instances of pairs and tokens
from on-chain data. It cannot be constructed.

# Static Methods

## fetchTokenData

```typescript
async fetchTokenData(
  chainId: ChainId,
  address: string,
  provider = getDefaultProvider(getNetwork(chainId)),
  symbol?: string,
  name?: string
): Promise<Token>
```

Initializes a class instance from a chainId and token address, if the decimals of the token are unknown and cannot be fetched externally. Decimals are fetched via an [ethers.js](https://github.com/ethers-io/ethers.js/) v5 provider. If not passed in, a default provider is used.

## fetchPairData

```typescript
async fetchPairData(
  tokenA: Token,
  tokenB: Token,
  provider = getDefaultProvider(getNetwork(tokenA.chainId))
): Promise<Pair>
```

Initializes a class instance from two Tokens, if the pair's balances of these tokens are unknown and cannot be fetched externally. Pair reserves are fetched via an [ethers.js](https://github.com/ethers-io/ethers.js/) v5 provider. If not passed in, a default provider is used.
