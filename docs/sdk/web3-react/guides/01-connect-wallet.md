---
id: connect-wallet
title: Connecting to Wallets
---     

## Introduction

This guide will cover how to connect wallets with web3-react. It is based on the [web3-react example](https://github.com/Uniswap/examples), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples) and follow the setup instructions.


In this example we will walk through setting up web3-react and connecting the most popular browser injected connector, MetaMask, using the web3-react [MetaMask package](https://www.npmjs.com/package/@web3-react/metamask).


The input parameters to this guide are the chains that we want our app to be able to connect to and their RPC URLs.

The guide will **cover**:

1. Creating a Web3ReactProvider
2. Building an Injected Connector
3. Connecting and  disconnecting the application to the connector

At the end of the guide, we should be able to connect and disconnect the application to a MetaMask injected connector.

For this guide, the following web3-react packages are used:

- [`@web3-react/core`](https://www.npmjs.com/package/@web3-react/core)
- [`@web3-react/types`](https://www.npmjs.com/package/@web3-react/types)
- [`@web3-react/metamask`](https://www.npmjs.com/package/@web3-react/metamask)

The core code of this guide can be found in [Web3Provider](https://github.com/Uniswap/examples) and [Injected Connector](https://github.com/Uniswap/examples).

## Creating a `Web3ReactProvider`

To be able to interact with the methods that web3-react offers, we first need to setup a `Web3ReactProvider` and wrap our application in it. Web3-react uses [React Context](https://reactjs.org/docs/context.html) to allow us to use the exposed hooks without additional configuration. 

To start, we create a React component called `Web3ContextProvider` in order to wrap the logic of configuring the `Web3ReactProvider`. In this component, we first import  `Web3ReactProvider` from the web3-react [core package](https://www.npmjs.com/package/@web3-react/core).

The component receives just one parameter which is the children to which it will be providing the React Context:

```typescript reference title="Defining the Web3React component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/components/Web3ContextProvider.tsx#L6
```

We then implement the component by rendering the imported `Web3ReactProvider`, and the children within that:


```typescript reference title="Implementing the component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Web3ContextProvider.tsx#L11-L15
```

Note that we map our list of [`Connections`](https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/connections.ts#L10) to a **tuple** of the **connector** and **hooks** of the connection. The third member of a Connection refers to the [type](https://github.com/Uniswap/examples/blob/06980acc8f6d484b719d2c60f5bfe9d766cb95d6/web3-react/src/libs/connections.ts#L16) of Connection being established, which we will later use to keep track of the actively connected wallet.

Finally, having created the `Web3ContextProvider` component, we can navigate to our [index file](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/index.tsx) and wrap the whole application with it:

```typescript reference title="Wrapping our app with the web3 context" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/7ac3853bc465aecc428a32be584bbeb833b0a63c/web3-react/src/index.tsx#L16-L22
```

## Building an Injected Connector

The only parameter that we provided to the `Web3ReactProvider` component is a list of prioritized connectors, declared as `PRIORITIZED_CONNECTORS`. The prioritization ordering is with regards to which connector we want to be active when more than one connector is connected to our application. The list is defined inside our connectors module: 

```typescript reference title="Creating the prioritized Connectors list" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L33-L39
```

Each one of those connectors lives within its own file, and they all follow a very similar setup pattern. 

An example of a connector in the list is the `InjectedConnector`, which supports wallets that inject an Ethereum Provider into the browser window. The most popular example of an injected connector is the MetaMask browser extension. To set it up, we import the `initializeConnector` function from the web3-react [core]((https://www.npmjs.com/package/@web3-react/core)) package and the MetaMask type from the web3-react [metamask]((https://www.npmjs.com/package/@web3-react/core)) package:

```typescript reference title="Importing Connector dependencies" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L1-L2
```

We then utilize the templated `initializeConnector` function with a type of `MetaMask`:

```typescript reference title="Initializing the MetaMask connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L12-L15
```

By passing in `MetaMask` as the templated parameter, we define the function's required input parameters. In this case, the only parameter we need to pass is an instance of `Metamask`, which receives the `actions` and `onError` parameters. The initial parameter defines the actions that web3-react can execute on a local store it creates for the connector, while the latter parameter defines the connector's behavior when an error in encountered.

The return type of the function is a tuple of the initialized **connector** and the **hooks** that we can use on it. Using this tuple, we create an instance of a [`Connection`](https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/connections.ts#L10) type, by setting the `type` attribute to `INJECTED`:


```typescript reference title="Creating a connection instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/856dbb002e7f38120554ef226f4309c96ce6ea79/web3-react/src/libs/injected.ts#L16-L20
```

Finally, we return the instance we created, which is added to the list of prioritized connectors. 

:::info
For help on creating the rest of the supported connectors of this examples, please visit our [connectors](./connectors.md) page!
:::


## Connecting and  disconnecting the application to the connector

Having built our Injected Connector, we now need to build the component that gives our application the ability to communicate with that connector. The basic functionality we would like to support is **connecting** and **disconnecting**  the connector to our application. To achieve this, we create a reusable [Option component](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/libs/components/Option.tsx) that supports rendering the UI and managing state for any connector that we want to support in our application:

```typescript reference title="Creating the Option component" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Option.tsx#L5-L11
```

The component receives 5 parameters, the first being wether a wallet connection is currently established. The second parameter is the currently active connection type, while the third parameter concerns the type of connection being established. The last 2 are hooks which are called once the component has established a connection or has been disconnected. 

Note that to access the `isActive` parameter, we utilize `web3-react`'s hooks in our [Example](https://github.com/Uniswap/examples/blob/feat/web3-react/web3-react/src/example/Example.tsx#L24) page:

```typescript reference title="Connecting to MetaMask" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/5ce44e28ca7a9323ec226f5452d6ffb6c949a82f/web3-react/src/example/Example.tsx#L24
```

Using those parameters, we have enough information to determine if the current option is **active** and wether any other option is currently active:

```typescript reference title="Managing Options state" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Option.tsx#L18-L26
```


In the UI, we can figure out whether we want the current Option's action button to be clickable, and whether this option can be connected or disconnected:

```typescript reference title="The Option UI" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Option.tsx#L47-L54
```

Finally, we also have enough information to figure out what action to take when the button is clicked. In the case that the click concerns a connection:

```typescript reference title="On connecting to a Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Option.tsx#L38-L43
```

To connect our wallet, all we need to do is to call the `tryActivateConnector` function and pass it the injected connector. We then call the `onActivate` callback, which makes the injected connector the active connector.


`tryActivateConnector` receives the connector that we want to activate, and attempts to call `activate` on it. If this succeeds, it set our app's `connectionType` to **INJECTED** and return the new connection type:


```typescript reference title="The implementation of tryActivateConnector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L90-L92
```


In the case that a click regards a disconnection:

```typescript reference title="On disconnecting from a Connector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/components/Option.tsx#L29-L36
```


To disconnect, all we need to do is to call the `tryDeactivateConnector` and pass in it the injected connector we created before. We then call the `onDeactivate` callback, which removes the injected connector as the currently active connector.

`tryDeactivateConnector` receives the connector that we want to deactivate, and attempts to call `deactivate` on it. If this succeeds, it resets the connector's state by calling `resetState` and returns **null**:

```typescript reference title="The implementation of tryDeactivateConnector" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/8c0e36ca8d2ba4718af944094191f39da62a9c5c/web3-react/src/libs/connections.ts#L101-L104
```

## Next Steps

Now that you're familiar with connecting and disconnecting from an injected connector, consider checking out our next guides on connecting and disconnecting from all the different types of connectors that web3-react supports.


