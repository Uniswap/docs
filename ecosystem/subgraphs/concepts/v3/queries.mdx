---
title: v3 Queries
description: Explore key entities and practical GraphQL query patterns for the Uniswap v3 subgraph.
---

The Uniswap v3 subgraph indexes onchain events from Factory and Pool contracts and exposes them as a GraphQL API via [The Graph](https://thegraph.com/). You can use it to query protocol metrics, pool state, swaps, token data, and liquidity position activity.

The full schema is available in the [v3-subgraph repository](https://github.com/Uniswap/v3-subgraph/blob/main/src/v3/schema.graphql).

## Core Entities

| Entity | Description |
|---|---|
| **Factory** | Protocol-level aggregates such as total volume, TVL, and transaction count |
| **Pool** | Per-pool state including liquidity, price, tick, volume, and fee tier |
| **Token** | Token metadata and aggregates across all pools containing the token |
| **Swap** | Individual swap events with token amounts, sender, and timestamp |
| **Position** | Position-level liquidity and fee data by NFT position ID |
| **PoolDayData / PoolHourData** | Time-series snapshots for pool metrics |
| **TokenDayData / TokenHourData** | Time-series snapshots for token metrics |

## Common Query Patterns

### Protocol-wide metrics

Query `factory` to retrieve aggregate protocol data:

```graphql
{
  factory(id: "0x1f98431c8ad98523631ae4a59f267346ea31f984") {
    poolCount
    txCount
    totalVolumeUSD
    totalValueLockedUSD
  }
}
```

### Pool state

Query a specific pool by pool address:

```graphql
{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    token0 { symbol }
    token1 { symbol }
    feeTier
    liquidity
    sqrtPrice
    tick
    totalValueLockedUSD
  }
}
```

### Recent swaps

Query swap events ordered by timestamp:

```graphql
{
  swaps(
    first: 20
    orderBy: timestamp
    orderDirection: desc
    where: { pool: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8" }
  ) {
    sender
    amount0
    amount1
    amountUSD
    timestamp
  }
}
```

### Token data

Query aggregate token metrics:

```graphql
{
  token(id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    symbol
    name
    decimals
    volumeUSD
    totalValueLockedUSD
    poolCount
  }
}
```

### Position data

Query a position by NFT position ID:

```graphql
{
  position(id: "1") {
    id
    owner
    liquidity
    depositedToken0
    depositedToken1
    collectedFeesToken0
    collectedFeesToken1
  }
}
```

## Pagination

The Graph returns up to 1000 entities per request. Use `first` and `skip` to iterate through large result sets:

```graphql
{
  pools(first: 1000, skip: 0, orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    token0 { symbol }
    token1 { symbol }
    totalValueLockedUSD
  }
}
```

Increase `skip` by 1000 for each subsequent request until fewer than 1000 results are returned.

## Historical Data

Query historical state at a specific block:

```graphql
{
  factory(
    id: "0x1f98431c8ad98523631ae4a59f267346ea31f984"
    block: { number: 17000000 }
  ) {
    poolCount
    totalVolumeUSD
    totalValueLockedUSD
  }
}
```

For trend analysis, query daily or hourly entities such as `PoolDayData` and `TokenDayData`.

## Next Steps

For additional end-to-end examples, see [v3 query examples](/docs/ecosystem/subgraphs/guides/v3-query-examples).