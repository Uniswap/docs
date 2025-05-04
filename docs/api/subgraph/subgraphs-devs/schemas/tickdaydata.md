---
title: TickDayData
sidebar_position: 18
---

Entities storing the details of Liquidity available & volume of token traded at a tick on a given day.

:::info
An entity is created only if there is a change during the day
:::

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | TickDayData Entity ID. Format: `<pool.address>-<Tick Index>-<Timestamp rounded to the day by dividing by 86400>` |
|date | Int! | | Timestamp rounded to the day by dividing by 86400 |
|pool | [Pool](./pool)! | | [Pool Entity](./pool) for which the daily tick metrics were recorded |
|tick | [Tick](./tick)! | | [Tick Entity](./tick) for which daily metrics were recorded |
|liquidityGross | BigInt! | | Total liquidity around the tick (1-tick range below or above) at end of the day |
|liquidityNet | BigInt! | | Change in liquidity when the tick is crossed at end of the day |
|volumeToken0 | BigDecimal! | | Daily volume of token0 with this tick in active range |
|volumeToken1 | BigDecimal! | | Daily volume of token1 with this tick in active range |
|volumeUSD | BigDecimal! | | Daily swap value with this tick in active range in derived USD |
|feesUSD | BigDecimal! | |  Daily swap fee with this tick in active range in derived USD |
|feeGrowthOutside0X128 | BigInt! | | token0 fee accumulated marker outside the tick range at the end of the day | arbitrum-one |
|feeGrowthOutside1X128 | BigInt! | | token1 fee accumulated marker outside the tick range at the end of the day | arbitrum-one |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updateTickDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetickdaydata)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|