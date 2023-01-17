---
id: connectors
title: Connectors
---     

## Introduction

This guide will cover how to integrate with web3-react. It is based on the [web3-react example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/README.md) and follow the setup instructions.


In this example we will walk through setting up web3-react by defining our connectors and wrapping our app using the `Web3ReactProvider`.


The only input parameters to this guide are the chains, and their respective RPC URLs, that we want our app to be able to connect to.

The guide will **cover**:

1. Creating a Web3ReactProvider
2. Building a Connector
3. Wrapping the app with the Web3ContextProvider

At the end of the guide, we should be able to ....

For this guide, the following web3-react packages are used ...

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)
- [`@web3-react/types`](https://www.npmjs.com/package/@web3-react/types)
- [`@web3-react/metamask`](https://www.npmjs.com/package/@web3-react/metamask)

The core code of this guide can be found in [Web3Provider](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Web3Provider.tsx) and [Injected Connector](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/injected.ts).


## Creating a `Web3ReactProvider`

To be able to interact with the methods that web3-react offers, we first need to setup a `Web3ReactProvider`. The latter uses [React Context](https://reactjs.org/docs/context.html) to allow us to use the exposed hooks without additional configuration. 

To start, we create a React component called `Web3ContextProvider` in order to wrap the logic of configuring the `Web3ReactProvider`. In this component, we first import  `Web3ReactProvider` from the web3-react [core package](https://www.npmjs.com/package/@web3-react/core).

The component receives just one parameter which is the children to which it will be providing the React Context:

```typescript reference title="Defining the Web3ContextProvider component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/components/Web3ContextProvider.tsx#L6
```

We then implement the component by rendering the imported `Web3ReactProvider`, and the children within that:


```typescript reference title="Implementing the Web3ContextProvider component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/components/Web3ContextProvider.tsx#L10-L16
```

## Creating the connectors

Note that the only parameter that we provide to `WebReactProvider` is the list of prioritized connectors, `PRIORITIZED_CONNECTORS`. The prioritization ordering is with regards to which one we want to be the active connector when a lot of them are connected to our application. The list is defined inside our connectors module: 

```typescript reference title="Creating the Connectors list" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/connections.ts#L36-L42
```

Each one of those connectors lives within its own file, and they all follow a very similar setup pattern. 

An example of a connector in the list is the `InjectedConnector`, which supports wallets that inject an Ethereum Provider into the browser window. The most popular example is the MetaMask browser extension. To set it up, we import the `initializeConnector` function from the web3-react **core** package and the `MetaMask` type from the web3-react `metamask` package:

```typescript reference title="Implementing the component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L1-L2
```

We then utilize the templated `initializeConnector` function with a type of `MetMask`:

```typescript reference title="Implementing the component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L12-L15
```

By passing in `MetaMask` as the template parameter, we define the function's required parameters. In this case, the only parameter we need to pass is an instance of `Metamask`, which receives the `actions` and `onError` parameters. The initial parameter defines the actions that web3-react can execute on a local store it creates for the connector, while the latter parameter defines the connector's behavior when an error in encountered.

The return type of the function is a tuple of the initialized connector and the hooks that we can use on it. Using this tuple, we create an instance of a [`Connection`](https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/connections.ts#L10) type, by setting the `type` attribute to `INJECTED`:


```typescript reference title="Implementing the component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L16-L20
```
Finally, were turn the instance we created, which is added to the list of prioritized connectors. 

:::info
For help on creating the rest of the supported connectors of this examples, please visit our [connectors](./02-connectors.md) guide!
:::


## Wrapping the app with `Web3ContextProvider`

Finally, now that we have created the `Web3ContextProvider` component, we can wrap our app with it:

```typescript reference title="Getting Pool metadata from the Pool smart contact" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/7ac3853bc465aecc428a32be584bbeb833b0a63c/web3-react/src/index.tsx#L16-L22
```

In the next guide we will dig it into how we create all the types of connectors that our example application supports.
# 

