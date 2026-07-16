---
title: PoolHourData
sidebar_position: 16
---

Entity to store the hourly stats for each pool.

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | PoolHourData Entity ID. Format: `<pool.address>-<Timestamp rounded to the hour by dividing by 3600>` |
|periodStartUnix | Int! | | Timestamp rounded to hour by dividing by 3600 |
|pool | [Pool](./pool)! | | [Pool Entity](./pool) for which the hourly metrics are tracked |
|liquidity | BigInt! | | In range Liquidity at the end of the hour |
|sqrtPrice | BigInt! | | Pool Price at the end of the hour |
|token0Price | BigDecimal! | | Price of token0 in terms of token1 at the end of the hour |
|token1Price | BigDecimal! | | Price of token1 in terms of token0 at the end of the hour |
|tick | BigInt | | Actice Tick at the end of the hour |
|feeGrowthGlobal0X128 | BigInt! | | Global Fee Marker Value for token0 at the end of the hour | arbitrum-one |
|feeGrowthGlobal1X128 | BigInt! | | Global Fee Marker Value for token1 at the end of the hour | arbitrum-one |
|tvlUSD | BigDecimal! | | TVL available at the end of the hour derived in USD |
|volumeToken0 | BigDecimal! | | Total hourly volume in token0 |
|volumeToken1 | BigDecimal! | | Total hourly volume in token1 |
|volumeUSD | BigDecimal! | | Total hourly volume in USD |
|feesUSD | BigDecimal! | | Total swap fee taken during the hour in terms of USD |
|txCount | BigInt! | | No. of transactions in pool executed during the hour |
|open | BigDecimal! | | Open Price of token0 |
|high | BigDecimal! | | High Price of token0 |
|low | BigDecimal! | | Low Price of token0 |
|close | BigDecimal! | | Close Price of token0 |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updatePoolHourData()](../functions-n-handlers/utils/intervalUpdates.ts#updatehourdaydata)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:*</center>|

\* -> Different across chains