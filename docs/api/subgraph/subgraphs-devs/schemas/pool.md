---
title: Pool
sidebar_position: 4
---

Entity to store a pool's metadata, current & lifetime metrics and links to events and hourly/daily metrics and references to it's tick entities.

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | Pool Contract Address |
|createdAtTimestamp | BigInt! | | BlockTime where the pool was created |
|createdAtBlockNumber | BigInt! | | Block Number where the pool was created |
|token0 | [Token](./token)! | | Token entity for token0 |
|token1 | [Token](./token)! | | Token entity for token1 |
|feeTier | BigInt! | | The percentage of token taken as fee in terms of basis points |
|liquidity | BigInt! | | Liquidity in the currently active tick range |
|sqrtPrice | BigInt! | | The current token pair price tracked in square root & Q96 format |
|feeGrowthGlobal0X128 | BigInt! | | The total fee in token0 per unit of liquidity collected by the pool | arbitrum-one |
|feeGrowthGlobal1X128 | BigInt! | | The total fee in token1 per unit of liquidity collected by the pool | arbitrum-one |
|token0Price | BigDecimal! | | Price of token0 in terms of token1 |
|token1Price | BigDecimal! | | Price of token1 in terms of token0 |
|tick | BigInt | | The current active [tick](./tick) |
|observationIndex | BigInt! | | The current observation index (used to record historic prices) |
|volumeToken0 | BigDecimal! | | Total volume of token0 swapped in the pool |
|volumeToken1 | BigDecimal! | | Total volume of token1 swapped in the pool |
|volumeUSD | BigDecimal! | | Total volume swapped in the pool in USD value |
|untrackedVolumeUSD | BigDecimal! | | Total volume swapped in the pool (including values for unreliable USD pools) in USD value |
|feesUSD | BigDecimal! | | Total fee collected in USD value |
|txCount | BigInt! | | Total no. of transactions in the pool |
|collectedFeesToken0 | BigDecimal! | | Total amount of token0 fee collected |
|collectedFeesToken1 | BigDecimal! | | Total amount of token1 fee collected |
|collectedFeesUSD | BigDecimal! | | Total amount of fee collected in USD value  |
|totalValueLockedToken0 | BigDecimal! | | Total amount of token0 locked across all ticks in the pool |
|totalValueLockedToken1 | BigDecimal! | | Total amount of token1 locked across all ticks in the pool |
|totalValueLockedETH | BigDecimal! | | Total value locked in the pool in ETH value |
|totalValueLockedUSD | BigDecimal! | | Total value locked in the pool in USD value |
|totalValueLockedUSDUntracked | BigDecimal! | | Total value locked in the pool (including tokens with unreliable USD values) in USD value |
|liquidityProviderCount | BigInt! | | Used for detecting new exchanges. (Currently not updated Anywhere) |
|poolHourData | [[PoolHourData](./poolhourdata)!]! | @derivedFrom(field: "pool") | Hourly Snapshots of Pool's data |
|poolDayData | [[PoolDayData](./pooldaydata)!]! | @derivedFrom(field: "pool") | Daily Snapshots of Pool's data |
|mints | [[Mint](./mint)!]! | @derivedFrom(field: "pool") | Mint Events emitted from the Pool |
|burns | [[Burn](./burn)!]! | @derivedFrom(field: "pool") | Burn Events emitted from the Pool |
|swaps | [[Swap](./swap)!]! | @derivedFrom(field: "pool") | Swap Events emitted from the Pool |
|collects | [[Collect](./collect)!]! | @derivedFrom(field: "pool") | Collect Events emitted from the Pool |
|ticks | [[Tick](./tick)!]! | @derivedFrom(field: "pool") | Tick entities respresenting the Pool liquidity |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[handlePoolCreated()](../functions-n-handlers/mappings/factory.ts#handlepoolcreated)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[updatePoolDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatepooldaydata)||<center>:white_check_mark:</center>|||
|[updatePoolHourData()](../functions-n-handlers/utils/intervalUpdates.ts#updatepoolhourdata)||<center>:white_check_mark:</center>|||
|[getEthPriceInUSD()](../functions-n-handlers/utils/pricing.ts#getethpriceinusd)||<center>:white_check_mark:</center>|||
|[findEthPerToken()](../functions-n-handlers/utils/pricing.ts#findethpertoken)||<center>:white_check_mark:</center>|||
|[handleInitialize()](../functions-n-handlers/mappings/core.ts#handleinitialize)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:*</center>|
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleFlash()](../functions-n-handlers/mappings/core.ts#handleflash)|||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[populateEmptyPools()\*](../functions-n-handlers/utils/backfill.ts#populateemptypools)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|

\* -> Different across chains