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
For help on setting up web3-react and interacting with a MetaMask wallet, please visit our [connecting to wallets](./01-connect-wallet.md) page!
:::


The input parameters to this guide are the chains that we want our dApp to be able to connect to and their RPC URLs.

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

The core code of this guide can be found in the top level of our [examples repository](https://github.com/Uniswap/examples/), under each connectors' name. For example, the code for the Coinbase Wallet connector can be found in the the [coinbase file](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/coinbase.ts).

## Building a Coinbase Wallet connector

The second connector in the list of prioritized connectors that [we provided](./01-connect-wallet.md/#building-an-injected-connector) as a parameter to [`Web3ReactProvider`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3ContextProvider.tsx) is the Coinbase Wallet connector:

```typescript reference title="Creating the prioritized Connectors list" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L33-L39
```

To connect to a Coinbase Wallet connector, we first need to install the `@web3-react/coinbase-wallet` package, as well as the [`@coinbase/wallet-sdk`](https://github.com/coinbase/coinbase-wallet-sdk) package. Having installed the packages, we can import the `CoinbaseWallet` class from the `@web3-react/coinbase-wallet` package, as well as the `initializeConnector` function from the `@web3-react/core` package:

```typescript reference title="Importing the Coinbase Wallet connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L1-L2
```
We can now build our connector, supplying the required arguments:

```typescript reference title="Initializing the Coinbase Wallet Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L8-L19
```

Note how we have provided the value of `CoinbaseWallet` as `initializeConnector`'s templated parameter. Similar to the case of the `InjectedConnector`, the `CoinbaseWallet` class is a class that extends the `AbstractConnector` class, which is part of the `@web3-react/core` package. The parameter provided to `initializeConnector` is a function that receives an `actions` object, and expects an instance of `CoinbaseWallet` to be returned.

We build the new `CoinbaseWallet` instance by passing the `actions` object, an `options` object, as well as an `onError` function. The latter handles errors that occur during interaction with the connector, and `options` is used to configure the connector. In our case, we pass the `url`, `appName` and `reloadOnDisconnect` options. The first argument is the RPC URL to connect to that was provided as an parameter to the example application, the second is the name of our application, and the third is a `boolean` that indicates whether the application should reload when the user disconnects from the wallet.

After building the connector, we use its two return types, the `Connector` and it's respective hooks, and build a `Connection` object by setting the connection's type as the coinbase wallet:

```typescript reference title="Building the Coinbase Wallet Connection" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/coinbase.ts#L20-L24
```

Having built the connector, all that remains is to build the user interface piece and supply it to our [`ConnectionOptions`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/ConnectionOptions.tsx):

```typescript reference title="Building the Coinbase Wallet component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/ConnectionOptions.tsx#L37-L45
```
## Building a WalletConnect Wallet connector

The third connector in the list of prioritized connectors that we provided to [`Web3ReactProvider`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3ContextProvider.tsx) is the WalletConnect Wallet connector.

To connect to a WalletConnect Wallet connector, we first need to install the `@web3-react/walletconnect` package, as well as the [`@walletconnect/ethereum-provider`](https://www.npmjs.com/package/@walletconnect/ethereum-provider) package. Having installed the packages, we can import the `WalletConnect` class from the `@web3-react/walletconnect` package, as well as the `initializeConnector` function from the `@web3-react/core` package:

```typescript reference title="Importing the WalletConnect Wallet Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/wallet-connect.ts#L1-L2
```
We can now build our connector, supplying the required arguments:

```typescript reference title="Initializing the WalletConnect Wallet Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/wallet-connect.ts#L8-L17
```

The main difference with the Coinbase Wallet connector lies in the arguments that the `WalletConnect` class requires to be instantiated. `web3-react` knows about this difference, as we pass the `WalletConnect` class as the templated parameter to `initializeConnector`, further specifying the type of `AbstractConnector`. In this case, the class receives three arguments, the first and third being `actions`, and `onError`, and are identical to those supplied in the Coinbase Wallet connector case. 

The difference lies in the second argument, which is an `options` object. In this case, we are passing the `rpc` parameter, which is an object that maps the chain ID to the RPC URL to connect to. We have already created this [map](https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/constants.ts#L11) in our [constants](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/constants.ts) file using our example's parameters. The other option that we are passing is the `qrcode`, which is a `boolean` that indicates whether the QR code should be displayed in the browser. In our case, we are passing `true` as the value of this option as we want to show the qr code.

Having built the connector, we just need to build the user interface to enable user interaction with the connector, and supply it to our `ConnectionOptions`:
    
```typescript reference title="Building the WalletConnect Wallet component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/ConnectionOptions.tsx#L47-L55
```

## Building a Network connector

The Network connector, alongside the Gnosis Safe connector, are two of the connectors that we do not surface through our user interface, but instead we connect to them programmatically. In contrast to the previous Connectors, these do not come with any pre-built user interface for the user to interact with. We attempt to connect to them **eagerly** in our [`Web3ContextProvider`](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3ContextProvider.tsx) component through a hook:
    
```typescript reference title="Hook to connect eagerly" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3ContextProvider.tsx#L8
```

The `useEagerlyConnect` hook is called in the `Web3ContextProvider` component, and attempts to connect to the Network Connector, and the Gnosis Safe Connector. The hook is named **eagerly**, as it is called in the component's body as an [React effect](https://reactjs.org/docs/hooks-effect.html) when the component is first rendered. In the hook implementation we attempt to call `web3-react`'s `connectEagerly` function if it exist on the connector, or call `activate` otherwise. The `connectEagerly` function attempts to connect our application to the connector, and fails silently if it does not succeed: 

```typescript reference title="Connecting eagerly" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/hooks.ts#L15-L19
```

Before connecting to the connectors eagerly, we first need to initialize them. We start by building the Network connector, and we first need to install the `@web3-react/network` package, and import the `Network` class from it. Note how this Connect does not require any package besides its `web3-react` package to function. We also need to import the `initializeConnector` function from the `@web3-react/core` package:

```typescript reference title="Importing the Network Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/network.ts#L1-L2
```
We can now build our connector, supplying the required arguments:

```typescript reference title="Initializing the Network Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/network.ts#L8-L15
```

The main difference with the other connectors lies in the arguments that the `Network` class requires to be instantiated. `web3-react` knows about this difference, as we pass the `Network` class as the templated parameter to `initializeConnector`, further specifying the type of `AbstractConnector`. In this case, the class receives 2 arguments, the first one being `actions`, and is identical to that supplied in the rest of the connectors. The second argument is a `urlMap` which is an object that maps the chain ID to the RPC URL to connect to, which we have already created in our `constants` file. The second parameter is a `defaultChainId` which is the chain ID to connect to by default and whose value is parameterized in our in the example. 

After building, the connector, we can create a `Connection` instance by supplying it the return value of the `initializeConnector` function, and the `Network` class:

```typescript reference title="Creating a Network connection" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/network.ts#L16-L20
```
All that remains is to return the constructed `Connection` instance.
## Building a Gnosis Safe connector

Similar to the Network connector, we build the Gnosis Safe connector. We start by first installing the `@web3-react/gnosis-safe` package, and import the `GnosisSafe` class from it. We also need to import the `initializeConnector` function from the `@web3-react/core` package:

```typescript reference title="Importing the Gnosis Safe connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/gnosis.tsx#L1-L2
```

The Gnosis Safe connector is the simplest of them all, as it does not require any additional parameterization, other than `actions`:

```typescript reference title="Initializing a Gnosis Safe Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/gnosis.tsx#L6-L9
```

Having initialized the connector, we can now build the `Connection` instance and return it:

```typescript reference title="Creating a Gnosis Safe Connection" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/gnosis.tsx#L10-L14
```

## Next steps

Now that we have gone through building all of the different types of supported connectors, we will learn how to switch chains.