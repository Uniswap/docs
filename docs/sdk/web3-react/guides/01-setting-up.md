---
id: setting-up
title: Setting up
---     

## Introduction

This guide will cover how to integrate with web3-react. It is based on the [web3-react example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/README.md) and follow the setup instructions.


In this example we will walk through setting up web3-react by defining our connectors and wrapping our app using the `Web3ReactProvider`.


The only input parameters to this guide are are the chains, and the respective RPC URLs, that we want our app to be able to connect to.

The guide will **cover**:

1. Creating a Web3ReactProvider
2. Creating the connectors
3. Wrapping the app with the Web3ContextProvider

At the end of the guide, we should be able to ....

For this guide, the following web3-react packages are used ...

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)
- [`@web3-react/types`](https://www.npmjs.com/package/@web3-react/types)
- [`@web3-react/network`](https://www.npmjs.com/package/@web3-react/network)
- [`@web3-react/wallet-connect`](https://www.npmjs.com/package/@web3-react/wallet-connect)
- [`@web3-react/gnosis-safe`](https://www.npmjs.com/package/@web3-react/gnosis-safe)
- [`@web3-react/metamask`](https://www.npmjs.com/package/@web3-react/metamask)

The core code of this guide can be found in ['Web3Provider.tsx](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3Provider.tsx) and the connectors in ....


# Creating a Web3ReactProvider

To be able to interact with the methods that web3-react offers, we first need to setup a `Web3ReactProvider`. The latter uses ['React Context'](https://reactjs.org/docs/context.html) to allow us to use the exposed hooks without additional configuration. 

We first create a React component called `Web3ContextProvider` in order to wrap the logic of configuring the `Web3ReactProvider`. In this component, we import the `Web3ReactProvider` from the [web3-react/core package](https://www.npmjs.com/package/@web3-react/core).

We then define the component's sole parameter which is the children to which it will be providing the React Context:

```typescript reference title="Defining the Web3React component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/7ac3853bc465aecc428a32be584bbeb833b0a63c/web3-react/src/index.tsx#L6
```

We then implement the component by rendering the imported `Web3ReactProvider`, and the children within that:


```typescript reference title="Implementing the component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/7ac3853bc465aecc428a32be584bbeb833b0a63c/web3-react/src/index.tsx#L10-L16
```

# Creating the connectors

Note that the only parameter that we provide to `WebReactProvider` is the list of prioritized connectors: `PRIORITIZED_CONNECTORS`. This list allows us to link our Ethereum accounts


# Wrapping the app with `Web3ContextProvider`

Finally, now that we have created the `Web3ContextProvider` component, we can wrap our app with it:

```typescript reference title="Getting Pool metadata from the Pool smart contact" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/7ac3853bc465aecc428a32be584bbeb833b0a63c/web3-react/src/index.tsx#L16-L22
```

In the next guide we will ...
# 

