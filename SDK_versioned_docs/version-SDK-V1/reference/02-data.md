---
id: 02-data
title: Data
---

# getTokenReserves

This function fetches Uniswap reserve data for a given token address on a given network.

- If only a chain id is specified, the Ethereum node used to fulfill data requests is determined by [`ethers.getDefaultProvider`](https://docs.ethers.io/ethers.js/html/api-providers.html#connecting-to-ethereum), else it is the one specified by the passed provider.
- This function throws an error if the provided tokenAddress is not a token with a Uniswap exchange.

## Function Signature

```typescript
export async function getTokenReserves(
  tokenAddress: string,
  chainIdOrProvider: ChainIdOrProvider = 1
): Promise<TokenReservesNormalized>
```

## Input Parameters

| Parameter         | Type                | Description                                                                                                                                                                                                                            |
| :---------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress      | `string`            | The checksummed address of a token with a Uniswap exchange.                                                                                                                                                                            |
| chainIdOrProvider | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tokenAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359' // DAI Mainnet
const chainIdOrProvider: ChainIdOrProvider = 1 // could be e.g. window.ethereum instead

const tokenReserves: TokenReservesNormalized = await getTokenReserves(tokenAddress, chainIdOrProvider)

/*
{
  // details for the passed token
  token: {
    chainId: 1,
    address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
    decimals: 18
  },

  // details for the Uniswap exchange of the passed token
  exchange: {
    chainId: 1,
    address: '0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14',
    decimals: 18
  },

  // details for the ETH portion of the reserves of the passed token
  ethReserve: {
    token: {
      chainId: 1,
      address: 'ETH',
      decimals: 18
    },
    amount: <BigNumber>
  },

  // details for the token portion of the reserves of the passed token
  tokenReserve: {
    token: {
      chainId: 1,
      address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
      decimals: 18
    },
    amount: <BigNumber>
  }
}
*/
```
