---
id: connectors
title: Supported Connectors
---     

## Introduction

This guide will cover how to connect our dApp to all the different connectors that `web3-react` supports. It is based on the [web3-react example](https://github.com/Uniswap/examples), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples) and follow the setup instructions.


In this example we will cover connecting our dApp to the following connectors:
- Coinbase wallet
- WalletConnect wallet
- Network
- Gnosis safe


:::info
For help on setting up web3-react and interacting with an `InjectedConnector`, please visit our [connecting to wallets](./01-connect-wallet.md) page!
:::


The input parameters to this guide are the chains that we want our app to be able to connect to and their RPC URLs.

The guide will **cover**:

1. Building a Coinbase Wallet connector
2. Building a WalletConnect Wallet connector
3. Building a Network connector
4. Building a Gnosis Safe connector


At the end of the guide, we should be able to connect and disconnect the application to the different connectors listed above.

For this guide, the following `web3-react` packages are used:

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)
- [`@web3-react/types`](https://www.npmjs.com/package/@web3-react/types)
- [`@web3-react/coinbase-wallet`](https://www.npmjs.com/package/@web3-react/coinbase-wallet)
- [`@web3-react/walletconnect`](https://www.npmjs.com/package/@web3-react/walletconnect)
- [`@web3-react/network`](https://www.npmjs.com/package/@web3-react/network)
- [`@web3-react/gnosis-safe`](https://www.npmjs.com/package/@web3-react/gnosis-safe)

The core code of this guide can be found in ...

## Building a Coinbase Wallet connector


The second connector in the list of prioritized connectors that we provided as a parameter to [`Web3ReactProvider`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3ContextProvider.tsx) is the Coinbase Wallet connector:

```typescript reference title="Creating the prioritized Connectors list" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L33-L39
```


To connect to a Coinbase Wallet connector, we first need to install the `@web3-react/coinbase-wallet` package, as well as the [`@coinbase/wallet-sdk`](https://github.com/coinbase/coinbase-wallet-sdk) package. Having installed the packages, we can import the `CoinbaseWallet` class from the `@web3-react/coinbase-wallet` package, as well as the `initializeConnector` function from the `@web3-react/core` package:

```typescript reference title="Importing the Coinbase Wallet connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L1-L2
```
We can now build our connector, supplying the required arguments:

```typescript reference title="Initializing the Coinbase Wallet connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L8-L19
```

Note how we have provided the value of `CoinbaseWallet` as `initializeConstructor`'s templated parameter. Similar to the case of the `InjectedConnector`, the `CoinbaseWallet` class is a class that extends the `AbstractConnector` class, which is part of the `@web3-react/core` package. The function provided to `initializeConstructor` is a function that receives an `actions` object, and expects a type of `CoinbaseWallet` to be returned from the function supplied as its argument.

Therefore, we build the new `CoinbaseWallet` instance by passing the `actions` object to the `CoinbaseWallet` constructor, and returning the new instance. The class also expects an options objects, as well as an `onError` function. The latter handles errors that occur during interaction with the connector, and the former is used to configure the connector. In our case, we are passing the `url` , the `appName` and the `reloadOnDisconnect` options. The first argument is the RPC URL to connect to that was provided as an parameter to the example, the second is the name of our application, and the third is a boolean that indicates whether the application should reload when the user disconnects from the wallet.

After building the connector, we use its two return types, the connector and it's respective hooks, and build a `Connection` object by setting the connection's type as the coinbase wallet:

```typescript reference title="Building the Coinbase Wallet connection" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L20-L24
```

Having built the connector, all that remains is to build the user interface piece and supply it to our [`ConnectionOptions`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/ConnectionOptions.tsx):

```typescript reference title="Building the Coinbase Wallet component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/ConnectionOptions.tsx#L37-L45
```


## Building a WalletConnect Wallet connector
## Building a Network connector
## Building a Gnosis Safe connector