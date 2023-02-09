---
id: switch-chains
title: Switching Chains
---     

## Introduction

This guide will cover how to prompt a wallet that has connected to our dApp to switch chains using `web3-react`. It is based on the [`web3-react` example](https://github.com/Uniswap/examples/tree/main/web3-react), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/web3-react/README.md) and follow the setup instructions.


:::info
For help on setting up `web3-react` and interacting with a MetaMask wallet, please visit our [connecting to wallets](./01-connect-wallet.md) page!
:::


The input parameters to this guide are the chains that we want our dApp to be able to connect to and their RPC URLs.

At the end of the guide, we should be able to switch chains on the connected wallet.

For this guide, the following `web3-react` packages are used:

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)

The core code of this guide can be found in [connections](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/connections.ts).

## Switching Chains

Having [setup our application](./01-connect-wallet.md) to use `web3-react` and having built out the ability to [connect and disconnect wallets](./02-connectors.md), we can now move on to switching chains.

Switching chains requires two parameters, the `chainId` we want to switch to, and the current `connectionType`:

```typescript reference title="Defining the function" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L64
```

Given the `ConnectionType`, we can retrieve the actual connector:

```typescript reference title="Retrieving the connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L69
```

Then, depending on the `ConnectionType`, we determine how to switch chains. For the `Network` or `WalletConnect` cases, we call `web3-react`'s `activate` function with the supplied `chainId`:

```typescript reference title="Switching chains for Network and WalletConnect" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L71-L74
```

The rest of the connectors require us to build an `AddEthereumChainParameter` object and pass it to the `web3-react`'s `activate` function:

```typescript reference title="Switching chains the other Connectors" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L77-L84
```

The metadata required to build `AddEthereumChainParameter`  are defined in our constants file:
    
```typescript reference title="Defining the chain parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/constants.ts#L27-L40
```

## Next steps

Know you know how to support `web3-react`'s most common use cases! Stay tuned for follow up guides.
