---
title: v4 Entities
description: Schema reference for the Uniswap v4 subgraph entities and their fields.
---

Entities define the schema of the subgraph, and represent the data that can be queried. Below is a reference for all entities in the Uniswap v4 subgraph.

To explore the schema interactively, visit the [Graph Explorer](https://thegraph.com/explorer/subgraphs/DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G?view=Query&chain=arbitrum-one). The full schema is available in the [v4-subgraph repository](https://github.com/Uniswap/v4-subgraph/blob/main/schema.graphql).

## Core Entities

### PoolManager

Stores aggregate information across the entire Uniswap v4 protocol. Unlike v3 which uses a Factory, v4 routes all operations through a single PoolManager singleton contract.

| Field | Type | Description |
|---|---|---|
| id | ID | PoolManager contract address |
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
| owner | ID | Current owner of the PoolManager |

### Token

Stores aggregated information for a specific token across all v4 pools.

| Field | Type | Description |
|---|---|---|
| id | ID | Token contract address |
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

Individual pool state including liquidity, pricing, volume, and the associated hook contract. In v4, pools are identified by a bytes32 hash derived from the pool key (token pair, fee, tick spacing, and hooks address), not a deployed contract address.

| Field | Type | Description |
|---|---|---|
| id | ID | Pool ID (bytes32 hash of pool key) |
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
| tickSpacing | BigInt | Tick spacing |
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
| isExternalLiquidity | Boolean | True when TVL is sourced from an external hook |
| totalValueLockedUSDUntracked | BigDecimal | TVL in USD (untracked) |
| hooks | String | Hook contract address |
| liquidityProviderCount | BigInt | Number of unique LPs |

### Tick

Stores information about individual ticks within a pool.

| Field | Type | Description |
|---|---|---|
| id | ID | Pool address + tick index |
| poolAddress | String | Pool address |
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
| origin | Bytes | EOA that initiated the transaction |
| amount0 | BigDecimal | Delta of token0 swapped |
| amount1 | BigDecimal | Delta of token1 swapped |
| amountUSD | BigDecimal | Derived USD amount |
| sqrtPriceX96 | BigInt | Pool sqrt price after the swap (Q64.96) |
| tick | BigInt | Pool tick after the swap |
| logIndex | BigInt | Event log index within the transaction |

### ModifyLiquidity

Tracks liquidity additions and removals. Replaces the separate Mint/Burn events used in v3.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "#" + index |
| transaction | Transaction | Reference to transaction |
| timestamp | BigInt | Event timestamp |
| pool | Pool | Pool the position is within |
| token0 | Token | Reference to token0 |
| token1 | Token | Reference to token1 |
| sender | Bytes | Address that modified liquidity |
| origin | Bytes | EOA that initiated the transaction |
| amount | BigInt | Amount of liquidity modified |
| amount0 | BigDecimal | Amount of token0 modified |
| amount1 | BigDecimal | Amount of token1 modified |
| amountUSD | BigDecimal | Derived USD amount |
| tickLower | BigInt | Lower tick of the position |
| tickUpper | BigInt | Upper tick of the position |
| logIndex | BigInt | Event log index |

### Transaction

Stores Ethereum transaction data with references to all v4 events within it.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash |
| blockNumber | BigInt | Block number |
| timestamp | BigInt | Confirmation timestamp |
| gasUsed | BigInt | Gas used |
| gasPrice | BigInt | Gas price |
| modifyLiquiditys | [ModifyLiquidity] | Derived liquidity modification events |
| swaps | [Swap] | Derived swap events |
| transfers | [Transfer] | Derived transfer events |
| subscriptions | [Subscribe] | Derived subscription events |
| unsubscriptions | [Unsubscribe] | Derived unsubscription events |

## Position Entities

### Position

Tracks liquidity positions by NFT tokenId. Unlike v3 where positions are always ERC-721 NFTs, v4 uses ERC-6909 for internal accounting. Positions also track subscription events for hooks.

| Field | Type | Description |
|---|---|---|
| id | ID | tokenId |
| tokenId | BigInt | NFT token ID |
| owner | String | Current owner address |
| origin | String | EOA that minted the position |
| createdAtTimestamp | BigInt | Creation timestamp |
| subscriptions | [Subscribe] | Subscription events |
| unsubscriptions | [Unsubscribe] | Unsubscription events |
| transfers | [Transfer] | Transfer events |

### Subscribe

Records when a position subscribes to a hook's notification system.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "-" + log index |
| tokenId | BigInt | Position token ID |
| address | String | Subscriber address |
| transaction | Transaction | Reference to transaction |
| logIndex | BigInt | Log index |
| timestamp | BigInt | Event timestamp |
| origin | String | EOA that initiated the transaction |
| position | Position | Reference to position |

### Unsubscribe

Records when a position unsubscribes from a hook.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "-" + log index |
| tokenId | BigInt | Position token ID |
| address | String | Unsubscriber address |
| transaction | Transaction | Reference to transaction |
| logIndex | BigInt | Log index |
| timestamp | BigInt | Event timestamp |
| origin | String | EOA that initiated the transaction |
| position | Position | Reference to position |

### Transfer

Records position ownership transfers.

| Field | Type | Description |
|---|---|---|
| id | ID | Transaction hash + "-" + log index |
| tokenId | BigInt | Position token ID |
| from | String | Previous owner address |
| to | String | New owner address |
| transaction | Transaction | Reference to transaction |
| logIndex | BigInt | Log index |
| timestamp | BigInt | Event timestamp |
| origin | String | EOA that initiated the transaction |
| position | Position | Reference to position |

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

Hourly aggregated data per pool.

| Field | Type | Description |
|---|---|---|
| id | ID | Pool address + hour start timestamp |
| periodStartUnix | Int | Unix timestamp for start of hour |
| pool | Pool | Reference to pool |
| liquidity | BigInt | In-range liquidity at end of period |
| sqrtPrice | BigInt | Price tracker at end of period |
| token0Price | BigDecimal | token0 price derived from sqrtPrice |
| token1Price | BigDecimal | token1 price derived from sqrtPrice |
| tick | BigInt | Tick at end of period |
| tvlUSD | BigDecimal | TVL in USD at end of period |
| volumeToken0 | BigDecimal | Hourly volume in token0 |
| volumeToken1 | BigDecimal | Hourly volume in token1 |
| volumeUSD | BigDecimal | Hourly volume in USD |
| feesUSD | BigDecimal | Hourly fees in USD |
| txCount | BigInt | Hourly transaction count |
| open | BigDecimal | Opening price of token0 |
| high | BigDecimal | High price of token0 |
| low | BigDecimal | Low price of token0 |
| close | BigDecimal | Closing price of token0 |

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
