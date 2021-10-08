---
id: Subgraph examples
sidebar_position: 3
---

# Subgraph Query Examples
You can use the subgraph to make GraphQL queries to fetch data about Uniswap V3. You can fetch data points like the spot price of a token, current liquidity of a pool, volume on a certain day, and much more. Below are some example queries. You can copy and paste them in the [v3 explorer](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3) to get fresh data.

## Global Data
To query global data, pass in the Uniswap Factory address : `0x1F98431c8aD98523631AE4a59f267346ea31F984` and select the desired fields.  Reference the full [factory schema](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql#L1) to see all possible fields.

### Current Global Data
An example querying total pool count, transaction count, and total volume in USD and ETH:
```
{
  factory(id: "0x1F98431c8aD98523631AE4a59f267346ea31F984" ) {
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
  factory(id: "0x1F98431c8aD98523631AE4a59f267346ea31F984", block: {number: 13380584}){
    poolCount
    txCount
    totalVolumeUSD
    totalVolumeETH
  }
}
```

## Pool Data
To get data about a certain pool, pass in the pool address. Reference the full [pool schema](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql#L75) and adjust the query fields to retrieve the data points you want.

### General Pool Query
The query below returns the feeTier, spot price, and liquidity for the ETH-USDC pool.

```{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
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
The maxiumum items you can query at once is 1000. Thus to get all possible pools, you can interate using the skip variable. To get pools beyond the first 1000 you can also set the skip as shown below.

### Skipping First 1000 Pools
This query sets the skip value and returns the first 10 responses after the first 1000.
```
{
  pools(first:10, skip:1000){
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

Note: This query will not work in the graph explorer and more resembles the structure of a query you'd pass to some graphql middleware like Apollo.

```
query pools( $skip: Int!) {
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
    	token1{
      id
    }
    }
  }

```

### Most Liquid Pools
Retrieve the top 1000 most liquid pools. You can use this similar set up to orderBy other variables like number of swaps or volume.

```
{
 pools(first: 1000, orderBy: liquidity, orderDirection: desc) {
   id
 }
}
```

### Pool Daily Aggregated
This query returns daily aggregated data for the first 10 days since the given timestamp for the UNI-ETH pool.

```
{
  poolDayDatas(first: 10, orderBy: date, where: {
    pool: "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801",
    date_gt: 1633642435
  } ) {
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
To query data about a particular swap, input the transaction hash + "#" + the index in the swaps the transaction array.
Reference for the full [swap schema](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql#L353).

This query fetches data about the sender, receiver, amounts, transaction data, and timestamp for a particular swap.
```
{
   swap(id: "0x000007e1111cbd97f74cfc6eea2879a5b02020f26960ac06f4af0f9395372b64#66785") {
    sender
    recipient
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
You can also filter swap data by a pool address by setting the `where` field. This example fetches data about multiple swaps for the USDC-USDT pool, ordered by timestamp.

```
{
swaps(orderBy: timestamp, orderDirection: desc, where:
 { pool: "0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf" }
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
  recipient
  amount0
  amount1
 }
}
```
## Token Data

Fetch token data by inputting the token contract address. Any token that is apart of a Uniswap pool can be queried and the data that is returned is aggregated across all the pools the token is apart of.

### General Token Data

This queries the decimals, symbol, name, pool count, and volume in USD for the UNI token. Reference the full [token schema](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql#L38) for all possible fields you can query.


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

You can fetch aggregate data about a specific token over a day. This query gets 10-day volume data for the UNI token ordered from oldest to newest.
```
{
  tokenDayDatas(first: 10, where: {token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"}, orderBy: date, orderDirection: asc) {
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
Note: This query will not work in the graph sandbox and more resembles the structure of a query you'd pass to some graphql middleware like Apollo.

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
To get data about a specific position, input the NFT tokenId. This queries the collected fees for token0 and token1 and current liquidity for the position with tokedId 3. Reference the full [position schema](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql#L192) to see all fields.

```
{
  position(id:3) {
    id
    collectedFeesToken0
    collectedFeesToken1
    liquidity
    token0 {
      id
      symbol
    }
    token1
    {
      id
      symbol
    }
  }
}
```


## Contribute

There are many more queries you can do with the Uniswap v3 subgraph including data related to ticks, mints, positions, and burns. Once again you can reference the full schema [here](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql). If you'd like to suggest more example queries to showcase, feel free to drop some suggestions in discord under #dev-chat or contribute your own queries by submitting a pull request to the docs repo.


