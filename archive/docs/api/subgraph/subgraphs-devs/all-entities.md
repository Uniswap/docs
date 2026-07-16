---
title: Entity Types
sidebar_position: 3
---

Following Entity Types are defined in the graph [schema file](https://github.com/Uniswap/v3-subgraph/blob/main/schema.graphql):


||Entity|Description|Schema differs with chain|
|-|-|-|-|
|1.|[Factory](./schemas/factory.md) | Captures metrics for all the pools deployed by a specific [factory contract](./contracts/factory). |<center>:white_check_mark:</center>|
|2.|[Bundle](./schemas/bundle) | Stores the current Eth price in USD. ||
|3.|[Token](./schemas/token) | Stores the metadata and token level metrics for a token present in any of the pools. ||
|4.|[Pool](./schemas/pool) | Stores a pool's metadata, current & lifetime metrics and links to events and hourly/daily metrics and references to it's tick entities. |<center>:white_check_mark:</center>|
|5.|[Tick](./schemas/tick) | Stores the metadata for a tick in a pool, it's lifetime metrics and current liquidity and fee variables. |<center>:white_check_mark:</center>|
|6.|[Position](./schemas/position) | Represents a position created through [NonfungiblePositionManager](../contracts/nonfungiblepositionmanager). Stores it's metadata, deposited/withdrawn tokens, fee variables and transactions where it participated. |<center>:white_check_mark:</center>|
|7|[PositionSnapshot](./schemas/positionsnapshot) | Saves the state of a position after an action taken on the position. |<center>:white_check_mark:</center>|
|8|[Transaction](./schemas/transaction) | Stores the list of mint, burn, swap, flash and collects events emitted within a transaction. ||
|9|[Mint](./schemas/mint) | Stores details of a mint event emitted while adding liquidity to a pool ||
|10|[Burn](./schemas/burn) | Stores details of a burn event emitted while removing liquidity from a pool ||
|11|[Swap](./schemas/swap) | Stores details of a swap event emitted while swapping one token for the other in a pool ||
|12|[Collect](./schemas/collect) | Stores details of a collect event emitted while removing tokens from a position ||
|13|[Flash](./schemas/flash) | Stores details of a flash event emitted while a flash loan was taken from a pool ||
|14|[UniswapDayData](./schemas/uniswapdaydata)| Daily stats for all of Uniswap. ||
|15|[PoolDayData](./schemas/pooldaydata)| Daily stats for each pool |<center>:white_check_mark:</center>|
|16|[PoolHourData](./schemas/poolhourdata)| Hourly stats for each pool |<center>:white_check_mark:</center>|
|17|[TickHourData](./schemas/tickhourdata)| Stats on Liquidity available & Volume of token traded at a tick for a given hour ||
|18|[TickDayData](./schemas/tickdaydata)| Stats on Liquidity available & Volume of token traded at a tick on a given day. <br/>(Note: this entity gets saved only if there is a change during the day) |<center>:white_check_mark:</center>|
|19|[TokenDayData](./schemas/tokendaydata) | Daily stats for a token across all of Uniswap. ||
|20|[TokenHourData](./schemas/tokenhourdata) | Hourly stats for a token across all of Uniswap. ||
