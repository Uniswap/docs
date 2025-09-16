---
title: Tick
sidebar_position: 5
---

Entity to stores the metadata for a tick in a pool, it's lifetime metrics and current liquidity and fee variables.

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | Tick ID. Format: `<pool address>#<tick address>`|
|poolAddress | String | | [Pool](./pool) contract address |
|tickIdx | BigInt! | | [Tick](./tick) Index |
|pool | [Pool](./pool)! | | [Pool](./pool) Entity |
|liquidityGross | BigInt! | | Total Liquidity the pool has at the tick with it's lower and upper range. |
|liquidityNet | BigInt! | | Liquidity change when the tick is crossed |
|price0 | BigDecimal! | | Price of token0 at this tick (constant) |
|price1 | BigDecimal! | | Price of token1 at this tick (constant) |
|volumeToken0 | BigDecimal! | | Total volume of token0 transacted with tick in active range |
|volumeToken1 | BigDecimal! | | Total volume of token1 transacted with tick in active range |
|volumeUSD | BigDecimal! | | Total transacted value with tick in active range in USD |
|untrackedVolumeUSD | BigDecimal! | | Total transacted value with tick in active range (including tokens with unreliable USD value) in USD |
|feesUSD | BigDecimal! | | Fee collected with the tick in active range in USD |
|collectedFeesToken0 | BigDecimal! | | Total amount of token0 collected as fee when this tick is active |
|collectedFeesToken1 | BigDecimal! | | Total amount of token1 collected as fee when this tick is active |
|collectedFeesUSD | BigDecimal! | | Total value of fee collected when this tick is active is USD |
|createdAtTimestamp | BigInt! | | BlockTime when the tick was initialized |
|createdAtBlockNumber | BigInt! | | BlockNumber when the tick was initialized |
|liquidityProviderCount | BigInt! | | Used for detecting new exchanges. (Not Used currently) |
|feeGrowthOutside0X128 | BigInt! | | Used for calculating token0 fee's accumulated outside a tick whenever it is crossed | arbitrum-one |
|feeGrowthOutside1X128 | BigInt! | | Used for calculating token1 fee's accumulated outside a tick whenever it is crossed | arbitrum-one |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[createTick()](../functions-n-handlers/utils/tick.ts#createtick)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>||
|[updateTickDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetickdaydata)||<center>:white_check_mark:</center>|||
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)|||<center>:white_check_mark:</center>||
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)|||<center>:white_check_mark:</center>||
|[updateTickFeeVarsAndSave()](../functions-n-handlers/mappings/core.ts#updatetickfeevarsandsave)|||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[loadTickUpdateFeeVarsAndSave()](../functions-n-handlers/mappings/core.ts#loadtickupdatefeevarsandsave)||<center>:white_check_mark:</center>|||