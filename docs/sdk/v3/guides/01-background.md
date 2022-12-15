---
id: background
title: Background
---

Before integrating with Uniswap, it may be helpful for newcomers to review the following background information on some important developer web3 concepts, the structure of our examples, and SDK concepts.


:::info

Already familiar with web3 development and/or the basics of our SDK and want to get right to right to the code? Start with our first guide, [Getting a Quote](./02-quoting.md)!

:::

## Web3 Providers

To retrieve data about the blockchain, you'll need a source such as [infura](https://infura.io/). Infura offers RPC URL's for a wide variety of chains and testnets. For our examples, we'll only be using the Ethereum mainnet.

To communicate with the Ethereum blockchain, you will need a web3 provider. To create a provider, you can use [ethers.js](https://docs.ethers.io/v5/) to connect to a blockchain, using a data source such as infura as input. The library also allows you to define a local model of a smart contract using the provider and an [ABI](./01-background.md#abis).

If you are connecting to a wallet extension, these wallets embed a provider directly into the Javascript window object as `window.ethereum`. This object surfaces information and communication with the user's wallet and creating transactions on the connected chain. Importantly for our examples, it can be used with `ethers.js` to construct a provider.

## Uniswap's Runnable Examples

Each guide is accompanied and driven by [runnable examples](https://github.com/Uniswap/examples/tree/main/v3-sdk) using React to provide a basic UI for interacting with the example. Each examples provides relevant options such as running against a local blockchain or connecting to the Ethereum mainnet directly. You also have the option of using a wallet extension which can be connected to either environment.

Inputs and environment settings are configured in each example's `config.ts` and allows for simple setup and configuration.

### Developing and Testing

To test your code, we recommend utilizing a local fork of the Ethereum mainnet. To help facilitate easy testing, each example includes a quickstart for running the local chain with a test wallet. To further test, we also recommend using a wallet extension and connecting to the local chain. Finally, each example can be run against the Ethereum mainnet if desired. Full development instructs can be found in the `README.md` of each code example.

### Utility Libraries

To allow the guides to focus on the SDK's core functionality, basic building blocks can be found in each example's `libs` folder. The exported functionality from these files is intended to be the minimum needed for each example and not a complete library for production usage. These also include storing core constants such as definitions for tokens, ABI's, and blockchain addresses that can distract from the core concepts. Below are summaries of the helping libraries you will encounter.

#### Provider Utilities

`provider.ts` wraps the basics of `ethers.js` and connecting to wallet extensions into an abstracted view of a provider, a wallet address, and the ability to send transactions. It also helps abstract the configured environment you wish to run against in your example without making code changes outside of your configuration.

#### Wallet Utilities

`wallet.ts` offers the ability to query a wallet (whether connected via an extension or defined in code/config) for its balances and other essential information.

#### Display Utilities

`conversion.ts` provides display and light math wrappers to help show human readable prices when dealing with currency amounts (typically stored as raw numbers and the decimal placement separate for precision reasons) in the form of two functions: `fromReadableAmount` and `toReadableAmount`

## Notable SDK Structures and Concepts

When working with the SDK it can be helpful to understand some of the design choices and why they are needed. Below you can find a few important concepts.

### ABI's

To allow others to interact with a smart contract, each contract exposes an ABI (Application Binary Interface). As these are defined on the blockchain, we must ensure the correct definitions are provided to our Javascript functions. ABI's are provided from various SDK's and imported in as needed. Some examples will define an ABI directly as needed.

### CurrencyAmount and JSBI

Cryptocurrency applications often work with very small fractions of tokens. As a result, high precision is very important. To ensure precision is upheld, the `CurrencyAmount` class helps store exact values as fractions and utilizes [JSBI](https://github.com/GoogleChromeLabs/jsbi) for compatibility across the web. To display these amounts nicely to users, additional work is sometimes required.

### Currency

The `Currency` class can represent both native currency (ETH) and an ERC20 `Token`. Currencies vary in their relative value, so the `Token` class allows your application to define the number of decimals needed for each currency along with the currency's address, symbol, and name.

