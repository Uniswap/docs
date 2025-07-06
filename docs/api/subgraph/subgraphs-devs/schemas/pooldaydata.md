---
title: PoolDayData
sidebar_position: 15
---

Entity to store the daily metrics for each pool.

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | PoolDayData Entity ID. Format: `<pool.address>-<Timestamp rounded to current day by dividing by 86400>` |
|date | Int! | | Timestamp rounded to hour by dividing by 86400 |
|pool | [Pool](./pool)! | | [Pool Entity](./pool) for which the daily metrics are tracked |
|liquidity | BigInt! | | In range Liquidity at the end of the day |
|sqrtPrice | BigInt! | | Pool Price at the end of the day |
|token0Price | BigDecimal! | | Price of token0 in terms of token1 at the end of the day |
|token1Price | BigDecimal! | | Price of token1 in terms of token0 at the end of the day |
|tick | BigInt | | Actice Tick at the end of the day |
|feeGrowthGlobal0X128 | BigInt! | | Global Fee Marker Value for token0 at the end of the day | arbitrum-one |
|feeGrowthGlobal1X128 | BigInt! | | Global Fee Marker Value for token1 at the end of the day | arbitrum-one |
|tvlUSD | BigDecimal! | | TVL available at the end of the day derived in USD |
|volumeToken0 | BigDecimal! | | Total daily volume in token0 |
|volumeToken1 | BigDecimal! | | Total daily volume in token1 |
|volumeUSD | BigDecimal! | | Total daily volume in USD |
|feesUSD | BigDecimal! | | Total swap fee taken during the day in terms of USD |
|txCount | BigInt! | | No. of transactions in pool executed during the day |
|open | BigDecimal! | | Open Price of token0 |
|high | BigDecimal! | | High Price of token0 |
|low | BigDecimal! | | Low Price of token0 |
|close | BigDecimal! | | Close Price of token0 |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updatePoolDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatepooldaydata)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|