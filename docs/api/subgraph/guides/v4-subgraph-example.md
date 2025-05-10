---
id: v4-examples
title: v4 Protocol Query Examples
sidebar_position: 2
---

# Subgraph Query Examples

This doc will teach you how to query Uniswap v4 analytics by writing GraphQL queries on the subgraph. You can fetch data points like :

- [position details](#general-position-data)
- [current liquidity](#pool-data) of a pool
- [volume on a certain day](#historical-global-data)

and much more. Below are some example queries. To run a query copy and paste it into the [v4 explorer](https://thegraph.com/explorer/subgraphs/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G?view=Query&chain=arbitrum-one) to get fresh data.

## Global Data

Global data refers to data points about the Uniswap v4 protocol as a whole. Some examples of global data points are:
- Total value locked in the protocol,
- Total pools deployed,
- Total transaction counts. 

Thus, to query global data you must pass in the PoolManager address `0x000000000004444c5dc75cb358380d2e3de08a90` and select the desired fields. Reference the full [poolManager schema](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql#L1) to see all possible fields.

### Current Global Data

An example querying total pool count, transaction count, and total volume in USD and ETH:

```
{
  poolManager(id: "0x000000000004444c5dc75cb358380d2e3de08a90") {
    poolCount
    txCount
    totalVolumeUSD
    totalVolumeETH
  }
}
```

### Historical Global Data

You can also query historical data by specifying a block number.

```
{
  poolManager(
    id: "0x000000000004444c5dc75cb358380d2e3de08a90", 
    block: {
      number: 22451931
    }
  ) {
    poolCount
    txCount
    totalVolumeUSD
    totalVolumeETH
  }
}
```

## Pool Data

To get data about a certain pool, pass in the pool address. Reference the full [pool schema](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql#L76) and adjust the query fields to retrieve the data points you want.

### General Pool Query

The query below returns the feeTier, spot price, and liquidity for the ETH-USDC pool.

```
{
  pool(id: "0x21c67e77068de97969ba93d4aab21826d33ca12bb9f565d8496e8fda8a82ca27") {
    tick
    token0 {
      symbol
      id
      decimals
    }
    token1 {
      symbol
      id
      decimals
    }
    feeTier
    sqrtPrice
    liquidity
  }
}
```

### All Possible Pools

The maximum items you can query at once is 1000. Thus to get all possible pools, you can iterate using the skip variable. To get pools beyond the first 1000 you can also set the skip as shown below.

### Skipping First 1000 Pools

This query sets the skip value and returns the first 10 responses after the first 1000.

```
{
  pools(first: 10, skip: 1000) {
    id
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
  }
}
```

### Creating a Skip Variable

This next query sets a skip variable. In your language and environment of choice you can then iterate through a loop, query to get 1000 pools each time, and continually adjust skip by 1000 until all pool responses are returned.

Check out [this example](https://github.com/Uniswap/v3-info/blob/770a05dc1a191cf229432ebc43c1f2ceb3666e3b/src/data/pools/chartData.ts#L14) from our interface for poolDayData that does something similar.

> **Note**
> This query will not work in the graph explorer and more resembles the structure of a query you'd pass to some GraphQL middleware like Apollo.

```
query pools($skip: Int!) {
  pools(
    first: 1000
    skip: $skip
    orderDirection: asc
  ) {
    id
    sqrtPrice
    token0 {
      id
    }
    token1 {
      id
    }
  }
}
```

### Most Liquid Pools

Retrieve the top 1000 most liquid pools. You can use this similar set up to orderBy other variables like number of swaps or volume.

```
{
  pools(
    first: 1000, 
    orderBy: liquidity, 
    orderDirection: desc
  ) {
    id
  }
}
```

### Pool Daily Aggregated

This query returns daily aggregated data for the first 10 days since the given timestamp for the UNI-ETH pool.

```
{
  poolDayDatas(
    first: 10, 
    orderBy: date, 
    where: {
      pool: "0x21c67e77068de97969ba93d4aab21826d33ca12bb9f565d8496e8fda8a82ca27",
      date_gt: 1735689600
    } 
  ) {
    date
    liquidity
    sqrtPrice
    token0Price
    token1Price
    volumeToken0
    volumeToken1
  }
}
```

## Swap Data

### General Swap Data

To query data about a particular swap, input the transaction hash + "-" + the index in the swaps the transaction array. This is the reference for the full [swap schema](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql#L186).

This query fetches data about the sender, amounts, transaction data, timestamp, and tokens for a particular swap.

```
{
   swap(id: "0x0000329e0d864d8e7c93627b76f6b5b99bd776cb18d9f8829e7da469f563e7d4-212") {
    sender
    amount0
    amount1
    transaction {
      id
      blockNumber
      gasUsed
      gasPrice
    }
    timestamp
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
   }
 }
```

### Recent Swaps Within a Pool

You can set the `where` field to filter swap data by pool address. This example fetches data about multiple swaps for the ETH-USDT pool, ordered by timestamp.

```
{
  swaps(
    orderBy: timestamp,
    orderDirection: desc,
    where: {
      pool: "0x21c67e77068de97969ba93d4aab21826d33ca12bb9f565d8496e8fda8a82ca27"
    }
  ) {
    pool {
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
    sender
    amount0
    amount1
  }
}
```

## Token Data

Input the the token contract address to fetch token data. Any token that exists in at least one Uniswap v4 pool can be queried. The output will aggregate data across all v4 pools that include the token.

### General Token Data

This queries the decimals, symbol, name, pool count, and volume in USD for the UNI token. Reference the full [token schema](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql#L37) for all possible fields you can query.

```
{
  token(id:"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984") {
    symbol
    name
    decimals
    volumeUSD
    poolCount
  }
}
```

### Token Daily Aggregated

You can fetch aggregate data about a specific token over a 24-hour period. This query gets 10-days of the 24-hour volume data for the UNI token ordered from oldest to newest.

```
{
  tokenDayDatas(
    first: 10, 
    where: {
      token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    }, 
    orderBy: date, 
    orderDirection: asc
  ) {
    date
    token {
      id
      symbol
    }
    volumeUSD
  }
}
```
### All Tokens

Similar to retrieving all pools, you can fetch all tokens by using skip.

> **Note**
> This query will not work in the graph explorer and more resembles the structure of a query you'd pass to some GraphQL middleware like Apollo.

```
query tokens($skip: Int!) {
  tokens(first: 1000, skip: $skip) {
    id
    symbol
    name
  }
}
```

## Position Data

### General Position Data

To get data about a specific position, input the NFT tokenId. This queries the subscriptions, unsubscriptions, and transfers for the position with tokenId 3. Reference the full [position schema](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql#416) to see all fields.

```
{
  position(id:3) {
    id
    subscriptions {
      id
    }
    unsubscriptions {
      id
    }
    transfers {
      id
    }
  }
}
```

## Contribute

There are many more queries you can do with the Uniswap v4 subgraph including data related to ticks, subscriptions, unsubscriptions, and more. Once again you can reference the full schema [here](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql). If you'd like to suggest more example queries to showcase, feel free to drop some suggestions in [discord](https://discord.com/invite/uniswap) under #dev-chat or [contribute](https://github.com/Uniswap/docs/blob/main/CONTRIBUTING.md) your own queries by submitting a pull request to the docs repo.
