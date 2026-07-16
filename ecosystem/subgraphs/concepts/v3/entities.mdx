---
title: v3 Entities
description: Schema reference for the Uniswap v3 subgraph entities and their fields.
---

Entities define the schema of the subgraph, and represent the data that can be queried. Below is a reference for all entities in the Uniswap v3 subgraph.

To explore the schema interactively, visit the [Graph Explorer](https://thegraph.com/explorer/subgraphs/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV?view=Query&chain=arbitrum-one). The full schema is available in the [v3-subgraph repository](https://github.com/Uniswap/v3-subgraph/blob/main/src/v3/schema.graphql).

## Core Entities

### Factory

Stores aggregate information across the entire Uniswap v3 protocol. There is one Factory entity per deployment.

| Field | Type | Description |
|---|---|---|
| id | ID | Factory contract address |
| poolCount | BigInt | Total pools created |
| txCount | BigInt | All-time transaction count |
| totalVolumeUSD | BigDecimal | All-time volume in derived USD |
| totalVolumeETH | BigDecimal | All-time volume in derived ETH |
| totalFeesUSD | BigDecimal | All-time swap fees in USD |
| totalFeesETH | BigDecimal | All-time swap fees in ETH |
| untrackedVolumeUSD | BigDecimal | All-time volume including less reliable USD values |
| totalValueLockedUSD | BigDecimal | TVL in derived USD |
| totalValueLockedETH | BigDecimal | TVL in derived ETH |
| totalValueLockedUSDUntracked | BigDecimal | TVL in USD (untracked) |
| totalValueLockedETHUntracked | BigDecimal | TVL in ETH (untracked) |
| owner | ID | Current owner of the factory |

### Token

Stores aggregated information for a specific token across all v3 pools.

| Field | Type | Description |
|---|---|---|
| id | Bytes | Token contract address |
| symbol | String | Token symbol |
| name | String | Token name |
| decimals | BigInt | Token decimals |
| totalSupply | BigInt | Token total supply |
| volume | BigDecimal | All-time volume in token units |
| volumeUSD | BigDecimal | All-time volume in derived USD |
| untrackedVolumeUSD | BigDecimal | All-time volume including less reliable USD values |
| feesUSD | BigDecimal | All-time fees in USD |
| txCount | BigInt | Transaction count across all pools containing this token |
| poolCount | BigInt | Number of pools containing this token |
| totalValueLocked | BigDecimal | Liquidity across all pools in token units |
| totalValueLockedUSD | BigDecimal | Liquidity across all pools in derived USD |
| totalValueLockedUSDUntracked | BigDecimal | TVL in USD (untracked) |
| derivedETH | BigDecimal | Derived price in ETH |
| whitelistPools | [Pool] | Pools used for USD pricing |

### Pool

Individual pool state. Each pool is deployed as a separate contract in v3, identified by its contract address.

| Field | Type | Description |
|---|---|---|
| id | Bytes | Pool contract address |
| createdAtTimestamp | BigInt | Pool creation timestamp |
| createdAtBlockNumber | BigInt | Pool creation block number |
| token0 | Token | Reference to token0 |
| token1 | Token | Reference to token1 |
| feeTier | BigInt | Fee amount |
| liquidity | BigInt | In-range liquidity |
| sqrtPrice | BigInt | Current price tracker |
| token0Price | BigDecimal | token0 per token1 |
| token1Price | BigDecimal | token1 per token0 |
| tick | BigInt | Current tick |
| observationIndex | BigInt | Current observation index |
| volumeToken0 | BigDecimal | All-time token0 swapped |
| volumeToken1 | BigDecimal | All-time token1 swapped |
| volumeUSD | BigDecimal | All-time USD swapped |
| untrackedVolumeUSD | BigDecimal | All-time USD swapped (unfiltered) |
| feesUSD | BigDecimal | All-time fees in USD |
| txCount | BigInt | All-time transaction count |
| collectedFeesToken0 | BigDecimal | All-time collected fees in token0 |
| collectedFeesToken1 | BigDecimal | All-time collected fees in token1 |
| collectedFeesUSD | BigDecimal | All-time collected fees in derived USD |
| totalValueLockedToken0 | BigDecimal | Total token0 across all ticks |
| totalValueLockedToken1 | BigDecimal | Total token1 across all ticks |
| totalValueLockedETH | BigDecimal | TVL in derived ETH |
| totalValueLockedUSD | BigDecimal | TVL in USD |
| totalValueLockedUSDUntracked | BigDecimal | TVL in USD (untracked) |
| liquidityProviderCount | BigInt | Number of unique LPs |

### Tick

Stores information about individual ticks within a pool.

| Field | Type | Description |
|---|---|---|
| id | ID | Pool address + tick index |
| poolAddress | Bytes | Pool address |
| tickIdx | BigInt | Tick index |
| pool | Pool | Reference to pool |
| liquidityGross | BigInt | Total liquidity at this tick (as lower or upper) |
| liquidityNet | BigInt | Net liquidity change when tick is crossed |
| price0 | BigDecimal | Calculated price of token0 at this tick |
| price1 | BigDecimal | Calculated price of token1 at this tick |
| createdAtTimestamp | BigInt | Creation timestamp |
| createdAtBlockNumber | BigInt | Creation block number |

## Event Entities

### Swap

Individual swap events.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "#" + index in swaps array |
| transaction | Transaction | Reference to transaction |
| timestamp | BigInt | Swap timestamp |
| pool | Pool | Pool swap occurred within |
| token0 | Token | Reference to token0 |
| token1 | Token | Reference to token1 |
| sender | Bytes | Swap sender |
| recipient | Bytes | Swap recipient |
| origin | Bytes | EOA that initiated the transaction |
| amount0 | BigDecimal | Delta of token0 swapped |
| amount1 | BigDecimal | Delta of token1 swapped |
| amountUSD | BigDecimal | Derived USD amount |
| sqrtPriceX96 | BigInt | Pool sqrt price after the swap (Q64.96) |
| tick | BigInt | Pool tick after the swap |
| logIndex | BigInt | Event log index |

### Mint

Tracks liquidity additions to a position.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "#" + index |
| transaction | Transaction | Reference to transaction |
| timestamp | BigInt | Event timestamp |
| pool | Pool | Pool the position is within |
| token0 | Token | Reference to token0 |
| token1 | Token | Reference to token1 |
| owner | Bytes | Owner of the position |
| sender | Bytes | Address that minted the liquidity |
| origin | Bytes | EOA that initiated the transaction |
| amount | BigInt | Amount of liquidity minted |
| amount0 | BigDecimal | Amount of token0 provided |
| amount1 | BigDecimal | Amount of token1 provided |
| amountUSD | BigDecimal | Derived USD amount |
| tickLower | BigInt | Lower tick of the position |
| tickUpper | BigInt | Upper tick of the position |
| logIndex | BigInt | Event log index |

### Burn

Tracks liquidity removals from a position.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "#" + index |
| transaction | Transaction | Reference to transaction |
| pool | Pool | Pool the position is within |
| token0 | Token | Reference to token0 |
| token1 | Token | Reference to token1 |
| timestamp | BigInt | Event timestamp |
| owner | Bytes | Owner of the position |
| origin | Bytes | EOA that initiated the transaction |
| amount | BigInt | Amount of liquidity burned |
| amount0 | BigDecimal | Amount of token0 removed |
| amount1 | BigDecimal | Amount of token1 removed |
| amountUSD | BigDecimal | Derived USD amount |
| tickLower | BigInt | Lower tick of the position |
| tickUpper | BigInt | Upper tick of the position |
| logIndex | BigInt | Event log index |

### Collect

Tracks fee collection events on a position.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "#" + index |
| transaction | Transaction | Reference to transaction |
| timestamp | BigInt | Event timestamp |
| pool | Pool | Pool the collect occurred within |
| owner | Bytes | Owner of the position |
| amount0 | BigDecimal | Amount of token0 collected |
| amount1 | BigDecimal | Amount of token1 collected |
| amountUSD | BigDecimal | Derived USD amount |
| tickLower | BigInt | Lower tick of the position |
| tickUpper | BigInt | Upper tick of the position |
| logIndex | BigInt | Event log index |

### Flash

Tracks flash loan events.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "-" + index |
| transaction | Transaction | Reference to transaction |
| timestamp | BigInt | Event timestamp |
| pool | Pool | Pool the flash occurred within |
| sender | Bytes | Flash sender |
| recipient | Bytes | Flash recipient |
| amount0 | BigDecimal | Amount of token0 flashed |
| amount1 | BigDecimal | Amount of token1 flashed |
| amountUSD | BigDecimal | Derived USD amount |
| amount0Paid | BigDecimal | Amount of token0 paid as fee |
| amount1Paid | BigDecimal | Amount of token1 paid as fee |
| logIndex | BigInt | Event log index |

### Transaction

Stores Ethereum transaction data with references to all v3 events within it.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash |
| blockNumber | BigInt | Block number |
| timestamp | BigInt | Confirmation timestamp |
| gasUsed | BigInt | Gas used |
| gasPrice | BigInt | Gas price |
| mints | [Mint] | Derived mint events |
| burns | [Burn] | Derived burn events |
| swaps | [Swap] | Derived swap events |
| flashed | [Flash] | Derived flash events |
| collects | [Collect] | Derived collect events |

## Time-series Entities

### UniswapDayData

Protocol-wide daily aggregated data.

| Field | Type | Description |
|---|---|---|
| id | ID | Timestamp rounded to day (timestamp / 86400) |
| date | Int | Unix timestamp for start of day |
| volumeETH | BigDecimal | Daily volume in derived ETH |
| volumeUSD | BigDecimal | Daily volume in derived USD |
| volumeUSDUntracked | BigDecimal | Daily volume in USD (untracked) |
| feesUSD | BigDecimal | Daily fees in USD |
| txCount | BigInt | Daily transaction count |
| tvlUSD | BigDecimal | TVL in USD at end of day |

### PoolDayData

Daily aggregated data per pool.

| Field | Type | Description |
|---|---|---|
| id | ID | Timestamp rounded to day |
| date | Int | Unix timestamp for start of day |
| pool | Pool | Reference to pool |
| liquidity | BigInt | In-range liquidity at end of period |
| sqrtPrice | BigInt | Price tracker at end of period |
| token0Price | BigDecimal | token0 price derived from sqrtPrice |
| token1Price | BigDecimal | token1 price derived from sqrtPrice |
| tick | BigInt | Tick at end of period |
| tvlUSD | BigDecimal | TVL in USD at end of period |
| volumeToken0 | BigDecimal | Daily volume in token0 |
| volumeToken1 | BigDecimal | Daily volume in token1 |
| volumeUSD | BigDecimal | Daily volume in USD |
| feesUSD | BigDecimal | Daily fees in USD |
| txCount | BigInt | Daily transaction count |
| open | BigDecimal | Opening price of token0 |
| high | BigDecimal | High price of token0 |
| low | BigDecimal | Low price of token0 |
| close | BigDecimal | Closing price of token0 |

### PoolHourData

Hourly aggregated data per pool. Same fields as PoolDayData but with `periodStartUnix` instead of `date`.

### TokenDayData

Daily aggregated data per token.

| Field | Type | Description |
|---|---|---|
| id | ID | Token address + day index |
| date | Int | Unix timestamp for start of day |
| token | Token | Reference to token |
| volume | BigDecimal | Daily volume in token units |
| volumeUSD | BigDecimal | Daily volume in derived USD |
| untrackedVolumeUSD | BigDecimal | Daily volume in USD (untracked) |
| totalValueLocked | BigDecimal | Liquidity in token units |
| totalValueLockedUSD | BigDecimal | Liquidity in derived USD |
| priceUSD | BigDecimal | Price in USD at end of period |
| feesUSD | BigDecimal | Daily fees in USD |
| open | BigDecimal | Opening price in USD |
| high | BigDecimal | High price in USD |
| low | BigDecimal | Low price in USD |
| close | BigDecimal | Closing price in USD |

### TokenHourData

Hourly aggregated data per token. Same fields as TokenDayData but with `periodStartUnix` instead of `date`.

## Utility Entities

### Bundle

Global store of derived ETH price in USD, used for USD value derivations throughout the subgraph.

| Field | Type | Description |
|---|---|---|
| id | ID | Constant "1" |
| ethPriceUSD | BigDecimal | Derived price of ETH in USD based on stablecoin pools |
