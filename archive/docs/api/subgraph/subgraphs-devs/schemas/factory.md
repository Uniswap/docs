---
title: Factory
sidebar_position: 1
---

Entity to capture metrics for all the pools deployed by a specific [factory contract](../contracts/factory).

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! |  | Factory Contract address | Field Missing |
|poolCount | BigInt! |  | No. of pools created using the factory |
|txCount | BigInt! |  | No. of all the transactions through pools mananged by the factory |
|totalVolumeUSD | BigDecimal! |  | Total Volume all time in derived USD |
|totalVolumeETH | BigDecimal! |  | Total Volume all time in derived ETH |
|totalFeesUSD | BigDecimal! |  | Total Swap Fees all time in derived USD |
|totalFeesETH | BigDecimal! |  | Total Swap Fees all time in derived ETH |
|untrackedVolumeUSD | BigDecimal! |  | Total Volume all time, including less reliable USD values |
|totalValueLockedUSD | BigDecimal! |  | TVL derived in USD |
|totalValueLockedETH | BigDecimal! |  | TVL derived in ETH |
|totalValueLockedUSDUntracked | BigDecimal! |  | TVL including tokens with unreliable USD prices in USD |
|totalValueLockedETHUntracked | BigDecimal! |  | TVL including tokens with unreliable USD prices in ETH |
|populated | Boolean |  | Flag capturing if the new pool is populated | All except optimism |
|owner | ID! |  | Current Owner of the factory contract |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[handlePoolCreated()](../functions-n-handlers/mappings/factory.ts#handlepoolcreated)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[updateUniswapDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updateuniswapdaydata)||<center>:white_check_mark:</center>|||