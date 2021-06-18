---
id: 01-using-the-api
title: 'Using the API'
tags: user-guides, documentation
slug: /guides/
---

In this guide we will create a web interface that consumes and displays data from the Uniswap Subgraph. The goal is to provide a quick overview of a setup that you can extend to create your own UIs and analytics around Uniswap data.

Many different libraries can be used to create an interface and a connection to the subgraph graphql endpoint, but in this guide we will use [React](https://reactjs.org/) for the interface, and [Apollo Client](https://www.apollographql.com/docs/react/) for sending queries. We'll also be using yarn for dependency management.

### Setup and Installs

We'll need to create the basic skeleton for the application. We'll use [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) for this. We'll also add the dependencies we need. Navigate to your root location in your command line and run:

```javascript
yarn create react-app uniswap-demo
cd uniswap-demo
yarn add  apollo-client apollo-cache-inmemory apollo-link-http graphql graphql-tag @apollo/react-hooks
yarn start
```

In your browser you should see the default React app running. In a text editor open `App.js` within `src` and replace the contents with this stripped down boilerplate. We'll add to this as we go.

```javascript
import React from 'react'
import './App.css'

function App() {
  return <div></div>
}

export default App
```

### Graphql Client

We need to set up some middleware in order to make requests to the Uniswap subgraph and receive data. To do this we'll use Apollo and create a graphql client to handle this.

1. Add the imports shown below and instantiate a new client instance. Notice how we use the link to the Uniswap subgraph here.

```javascript
import React from "react"
import "./App.css"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"

export const client = new ApolloClient({
 link: new HttpLink({
   uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
 }),
 cache: new InMemoryCache(),
})

function App() {
 return <div></div>
}

export default App

```

2. We also need to add a context so that Apollo can handle requests properly. In your `index.js` file import the proper provider and wrap the root in it like this:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { ApolloProvider } from 'react-apollo'
import { client } from './App'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
```

### Writing the queries

Next we'll construct our query and fetch data. For this example we will fetch some data about the Dai token on Uniswap V2. We'll get the current price, and total liquidity across all pairs. We'll be using the Dai address as an id in this query. We'll also fetch the USD price of ETH to help create USD conversion for Dai data.

1. First we need to define the query itself. We'll use `gql` to parse a query string into the GraphQL AST standard. Import the `gql` helper into the app and use it to create the query. Add the following to your `App.js` file:

```javascript
import gql from 'graphql-tag'

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`
```

We use an id of `1` for the bundle because there is only one hardcoded bundle in the subgraph.

### Fetch data

Now we're ready to use these queries to fetch data from the Uniswap V2 subgraph. To do this we can use the `useQuery` hook which uses our client instance to fetch data, and gives us live info about the status of the request. To do this add the following to your `App.js` file:

```javascript
import { useQuery } from '@apollo/react-hooks'

const { loading, error, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
const { loading: daiLoading, error: daiError, data: daiData } = useQuery(DAI_QUERY, {
  variables: {
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
  }
})
```

Notice we're using the Dai token address to fetch data about Dai.

### Formatting Response

Now that we have our data we can format it and display it in the UI. First, we parse the return data to get the actual data that we want. Then we'll use it to get the USD price of Dai. Lastly we'll insert this data into the UI itself.

These queries will return an response object for each query. Within each one we're interested in the root field we defined in the query definition. For the `daiData` response we defined this as `tokens`, and for the `ethPriceData` query we defined this as `ethPrice`. Within each one we'll get an array of results. Because we're only querying for single entities we'll reference the `0` index in the data array.

Add the following lines to your `App.js` file to parse the responses:

```javascript
const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
```

### Displaying in the UI

Finally we can use our parsed response data to hydrate the UI. We'll do this in two steps.

1. First we'll create loading states. To detect if a query is still pending a response we can reference the loading variables we've already defined. We'll add two loading states, one for the Dai price, and one for the Dai total liquidity. These may flicker fast because the time to query is fast.

2. Populate with loaded data. Once we detect that the queries have finished loading we can populate the UI with the real data.

To do this add the following lines in the return function of your `App.js` file:

```javascript
return (
  <div>
    <div>
      Dai price:{' '}
      {ethLoading || daiLoading
        ? 'Loading token data...'
        : '$' +
          // parse responses as floats and fix to 2 decimals
          (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
    </div>
    <div>
      Dai total liquidity:{' '}
      {daiLoading
        ? 'Loading token data...'
        : // display the total amount of DAI spread across all pools
          parseFloat(daiTotalLiquidity).toFixed(0)}
    </div>
  </div>
)
```

### Next steps

This should render a very basic page with these two stats about the Dai token within Uniswap. This is a very basic example of what you can do with the Uniswap subgraph and we encourage you to build out more complex and interesting tools!

You can visit our [analytics site](https://uniswap.info/) to see a more advanced analytics page, or visit [the github](https://github.com/Uniswap/uniswap-info) for more detailed examples of using the Uniswap subgraph to create UIs.

### Review

In the end your `App.js` file should look like this:

```javascript
import React, { useEffect } from 'react'
import './App.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

function App() {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  })

  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  return (
    <div>
      <div>
        Dai price:{' '}
        {ethLoading || daiLoading
          ? 'Loading token data...'
          : '$' +
            // parse responses as floats and fix to 2 decimals
            (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
      </div>
      <div>
        Dai total liquidity:{' '}
        {daiLoading
          ? 'Loading token data...'
          : // display the total amount of DAI spread across all pools
            parseFloat(daiTotalLiquidity).toFixed(0)}
      </div>
    </div>
  )
}

export default App
```
