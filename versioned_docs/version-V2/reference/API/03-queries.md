---
id: queries
title: Queries
tags: api, documentation
---

The subgraph can be queried to retrieve important information about Uniswap, pairs, tokens, transactions, users, and more. This page will provide examples for common queries.

To try these queries and run your own visit the [subgraph sandbox](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2).

### Global Data

To query global data you can pass in the Uniswap Factory address and select from available fields.

#### Global Stats

All time volume in USD, total liquidity in USD, all time transaction count.

```
{
 uniswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"){
   totalVolumeUSD
   totalLiquidityUSD
   txCount
 }
}
```

#### Global Historical lookup

To get a snapshot of past state, use The Graph's block query feature and query at a previous block. See this post to get more information about [fetching block numbers from timestamps](https://blocklytics.org/blog/ethereum-blocks-subgraph-made-for-time-travel/). This can be used to calculate things like 24hr volume.

```
{
 uniswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", block: {number: 10291203}){
   totalVolumeUSD
   totalLiquidityUSD
   txCount
 }
}
```

### Pair Data

#### Pair Overview

Fetch a snapshot of the current state of the pair with common values. This example fetches the DAI/WETH pair.

```
{
 pair(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"){
     token0 {
       id
       symbol
       name
       derivedETH
     }
     token1 {
       id
       symbol
       name
       derivedETH
     }
     reserve0
     reserve1
     reserveUSD
     trackedReserveETH
     token0Price
     token1Price
     volumeUSD
     txCount
 }
}
```

#### All pairs in Uniswap

The Graph limits entity return amounts to 1000 per query as of now. To get all pairs on Uniswap use a loop and graphql skip query to fetch multiple chunks of 1000 pairs. The query would look like this (where skip is some incrementing variable passed into your query).

```
{
 query pairs($skip: Int!) {
   pairs(first: 1000, skip: $skip) {
     id
   }
 }
}
```

#### Most liquid pairs

Order by liquidity to get the most liquid pairs in Uniswap.

```
{
 pairs(first: 1000, orderBy: reserveUSD, orderDirection: desc) {
   id
 }
}
```

#### Recent Swaps within a Pair

Get the last 100 swaps on a pair by fetching Swap events and passing in the pair address. You'll often want token information as well.

```
{
swaps(orderBy: timestamp, orderDirection: desc, where:
 { pair: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11" }
) {
     pair {
       token0 {
         symbol
       }
       token1 {
         symbol
       }
     }
     amount0In
     amount0Out
     amount1In
     amount1Out
     amountUSD
     to
 }
}
```

#### Pair Daily Aggregated

Day data is useful for building charts and historical views around entities. To get stats about a pair in daily buckets query for day entities bounded by timestamps. This query gets the first 100 days after the given unix timestamp on the DAI/WETH pair.

```
{
 pairDayDatas(first: 100, orderBy: date, orderDirection: asc,
   where: {
     pairAddress: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
     date_gt: 1592505859
   }
 ) {
     date
     dailyVolumeToken0
     dailyVolumeToken1
     dailyVolumeUSD
     reserveUSD
 }
}
```

### Token Data

Token data can be fetched using the token contract address as an ID. Token data is aggregated across all pairs the token is included in. Any token that is included in some pair in Uniswap can be queried.

#### Token Overview

Get a snapshot of the current stats on a token in Uniswap. This query fetches current stats on DAI.
The allPairs field gets the first 200 pairs DAI is included in sorted by liquidity in derived USD.

```
{
 token(id: "0x6b175474e89094c44da98b954eedeac495271d0f"){
   name
   symbol
   decimals
   derivedETH
   tradeVolumeUSD
   totalLiquidity
 }
}
```

#### All Tokens in Uniswap

Similar to fetching all pairs (see above), you can query all tokens in Uniswap. Because The Graph service limits return size to 1000 entities use graphql skip query. (Note this query will not work in the graph sandbox and more resembles the structure of a query you'd pass to some graphql middleware like [Apollo](https://www.apollographql.com/)).

```
{
 query tokens($skip: Int!) {
   tokens(first: 1000, skip: $skip) {
     id
     name
     symbol
   }
 }
}
```

#### Token Transactions

To get transactions that include a token you'll need to first fetch an array of pairs that the token is included in (this can be done with the allPairs field on the Token entity.) Once you have an array of pairs the token is included in, filter on that in the transaction lookup.

This query fetches the latest 30 mints, swaps, and burns involving DAI. The allPairs array could look something like this where we include the DAI/WETH pair address and the DAI/USDC pair address.

```
allPairs = [
 "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
 "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5"
]
```

```
query($allPairs: [String!]) {
 mints(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
   transaction {
     id
     timestamp
   }
   to
   liquidity
   amount0
   amount1
   amountUSD
 }
 burns(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
   transaction {
     id
     timestamp
   }
   to
   liquidity
   amount0
   amount1
   amountUSD
 }
 swaps(first: 30, where: { pair_in: $allPairs }, orderBy: timestamp, orderDirection: desc) {
   transaction {
     id
     timestamp
   }
   amount0In
   amount0Out
   amount1In
   amount1Out
   amountUSD
   to
 }
}
```

#### Token Daily Aggregated

Like pair and global daily lookups, tokens have daily entities that can be queries as well. This query gets daily information for DAI. Note that you may want to sort in ascending order to receive your days from oldest to most recent in the return array.

```
{
 tokenDayDatas(orderBy: date, orderDirection: asc,
  where: {
    token: "0x6b175474e89094c44da98b954eedeac495271d0f"
  }
 ) {
    id
    date
    priceUSD
    totalLiquidityToken
    totalLiquidityUSD
    totalLiquidityETH
    dailyVolumeETH
    dailyVolumeToken
    dailyVolumeUSD
 }
}
```

### ETH Price

You can use the Bundle entity to query current USD price of ETH in Uniswap based on a weighted average of stablecoins.

```
{
 bundle(id: "1" ) {
   ethPrice
 }
}
```
