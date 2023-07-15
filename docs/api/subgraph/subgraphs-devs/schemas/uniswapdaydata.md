---
title: UniswapDayData
sidebar_position: 14
---

Entities capturing the daily metrics for all of the Uniswap protocol.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Timestamp rounded to current day by dividing by 86400 |
|date | Int! | | Timestamp rounded to current day by dividing by 86400 |
|volumeETH | BigDecimal! | | Total daily volume in Uniswap derived in terms of ETH |
|volumeUSD | BigDecimal! | | Total daily volume in Uniswap derived in terms of USD |
|volumeUSDUntracked | BigDecimal! | | total daily volume in Uniswap derived in terms of USD (including tokens with unreliable USD value) |
|feesUSD | BigDecimal! | | Amount of swap fee taken during the day in terms of USD |
|txCount | BigInt! | | No. of transactions that occurred during the day |
|tvlUSD | BigDecimal! | | TVL locked at the end of the day in terms of USD |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updateUniswapDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updateuniswapdaydata)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|