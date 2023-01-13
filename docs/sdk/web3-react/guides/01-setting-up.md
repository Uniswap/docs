---
id: setting-up
title: Setting up
---     

## Introduction

This guide will cover how to integrate with web3-react. It is based on the [web3-react example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/README.md) and follow the setup instructions.


In this example we will use `quoteExactInputSingle` to get a quote for the pair **USDC - WETH**.
The inputs are the **token in**, the **token out**, the **amount in** and the **fee**.

The **fee** input parameters represents the swap fee that distributed to all in range liquidity at the time of the swap. It is one of the identifiers of a Pool, the others being **tokenIn** and **tokenOut**.

The guide will **cover**:

1. Creating a Web3Provider
2. Creating connections with different provider
3. Switching chains with a provider

At the end of the guide, we should be able to fetch a quote for the given input token pair and the input token amount with the press of a button on the web application.

For this guide, the following web3-react packages are used:

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)
- [`@web3-react/types`](https://www.npmjs.com/package/@web3-react/types)
- [`@web3-react/network`](https://www.npmjs.com/package/@web3-react/network)
- [`@web3-react/wallet-connect`](https://www.npmjs.com/package/@web3-react/wallet-connect)
- [`@web3-react/gnosis-safe`](https://www.npmjs.com/package/@web3-react/gnosis-safe)
- [`@web3-react/metamask`](https://www.npmjs.com/package/@web3-react/metamask)
