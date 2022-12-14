---
id: background
title: Background
---

Before integrating with Uniswap, it may be helpful for newcomers to review the following background information on some important web3 concepts, the structure of our examples, and SDK concepts. 

If you are already familiar with web3 development and/or the basics of our SDK, we recommend you jump right into our guides starting with [Getting a Quote](./02-quoting.md).

## Web3 Providers

To communicate with the Ethereum blockchain, you will need a web3 provider. There are a few ways to get a provider:

### Ethers.js

[ethers.js](https://docs.ethers.io/v5/) offers a quick method to connect to a blockchain. In order to supply the data, you will need to get a RPC URL from somewhere such as [infura](https://infura.io/). Our code examples and guides will provide more information on setup.

### Wallet Extensions

Wallet extensions embed a provider directly into the Javascript window object as `window.ethereum`. From this provider you can directly access the blockchain and a user's connected accounts.

## Uniswap's Runnable Examples

Each guide is accompanied and driven by [runnable examples](https://github.com/Uniswap/examples/tree/main/v3-sdk) using React to provide a basic UI for interacting with the example. Each examples provides relevant options to run against such as running against a local blockchain, connecting to the Ethereum mainnet directly, or using a wallet extension.

Inputs and environment settings are configured in each example's `config.ts` and allows for simple setup and configuration.

### Developing and Testing

To test your code, we recommend utilizing a local fork of the Ethereum mainnet. To help facilitate easy testing, each example includes a quickstart for running this local chain with a test wallet. To further test, we also recommend using a wallet extension and connecting to this local chain. Finally, each example can be run against the Ethereum mainnet if desired. Full development instructs can be found in the `README.md` of each code example.

### Utility Libraries

To allow the guides to focus on the SDK's core functionality, basic building blocks can be found in each example's `libs` folder. The exported functionality from these files is intended to be the minimum needed for each example and not a complete library for production usage. These also include storing core constants such as definitions for tokens, ABI's, and blockchain addresses that can distract from the core concepts. Below are summaries of the helping libraries you will encounter.

#### Provider Utilities

`provider.ts` wraps the basics of `ethers.js` and connecting to wallet extensions into an abstracted view of a provider, a wallet, and the ability to send transactions. It also helps abstract the configured environment you wish to run against.

#### Wallet Utilities

`wallet.ts` offers the ability to query a wallet (whether connected via an extension or defined in code/config) for its balances and other essential information.

#### Display Utilities

`conversion.ts` provides display and light math wrappers to help show human readable prices when dealing with currency amounts (typically stored as raw numbers and the decimal placement separate for precision reasons) in the form of two functions: `fromReadableAmount` and `toReadableAmount`

## Notable SDK Structures and Concepts

When working with the SDK it can be helpful to understand some of the design choices and why they are needed. Below you can find a few important concepts.

### ABI's

To allow others to interact with a smart contract, each exposes an ABI (Application Binary Interface). As these are defined on the blockchain, we must ensure the correct definitions are provided to our Javascript functions. The SDK exposes ABI definitions for use and our examples will define ABI's directly as needed.

### CurrencyAmount and JSBI

Cryptocurrency applications often work with very small fractions of tokens. As a result, high precision is very important. To ensure precision is upheld, the `CurrencyAmount` class helps store exact values as fractions as well as utilizing [JSBI](https://github.com/GoogleChromeLabs/jsbi) for compatibility across the web. To display these amounts nicely to users, additional work is sometimes required.

### Tokens

ERC20 Tokens and ETH very in their relative value, so storage of these can also vary for precision reasons. The `Token` class allows your application to define the number of decimals needed for each currency along with the currency's address, symbol, and name.

