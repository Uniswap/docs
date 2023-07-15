---
title: TickHourData
sidebar_position: 17
---

Entities capturing details of Liquidity available & Volume of token traded at a tick for a given hour.

:::info Not Used
The Schema is not currently populated in mainnet subgraph
:::


## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | TickHourData Entity ID. Format: `<pool.address>-<Tick Index>-<Timestamp rounded to the hour by dividing by 3600>` |
|periodStartUnix | Int! | | Timestamp rounded to the hour by dividing by 3600 |
|pool | [Pool](./pool)! | | [Pool Entity](./pool) for which the hourly tick metrics were recorded |
|tick | [Tick](./tick)! | | [Tick Entity](./tick) for which hourly metrics were recorded |
|liquidityGross | BigInt! | | Total liquidity around the tick (1-tick range below or above) at end of the hour |
|liquidityNet | BigInt! | | Change in liquidity when the tick is crossed at end of the hour |
|volumeToken0 | BigDecimal! | | Hourly volume of token0 with this tick in active range |
|volumeToken1 | BigDecimal! | | Hourly volume of token1 with this tick in active range |
|volumeUSD | BigDecimal! | | Hourly swap value with this tick in active range in derived USD |
|feesUSD | BigDecimal! | |  Hourly swap fee with this tick in active range in derived USD |