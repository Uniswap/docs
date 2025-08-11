---
title: Token
sidebar_position: 3
---

Entity to stores the metadata and token level metrics for a token present in any of the pools.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Token Contract Address | 
|symbol | String! | | Token Symbol | 
|name | String! | | Token Name | 
|decimals | BigInt! | | No. of decimals in the token value | 
|totalSupply | BigInt! | | Total supply of the token | 
|volume | BigDecimal! | | Total token volume traded in swaps | 
|volumeUSD | BigDecimal! | | Total token value traded in swaps in USD | 
|untrackedVolumeUSD | BigDecimal! | | Total token value traded in USD, including pools with unreliable USD values | 
|feesUSD | BigDecimal! | | Amount of Fees taken from token swaps in derived in USD | 
|txCount | BigInt! | | No. of transactions across all pools that include this token  | 
|poolCount | BigInt! | | No. of pools containing this token | 
|totalValueLocked | BigDecimal! | | Liquidity across all pools for the token | 
|totalValueLockedUSD | BigDecimal! | | Liquidity across all pools for the token in terms of USD value | 
|totalValueLockedUSDUntracked | BigDecimal! | | Liquidity across all pools (including pools with unreliable USD values) for the token in terms of USD value | 
|derivedETH | BigDecimal! | | Price of token relative to ETH | 
|whitelistPools | [[Pool](./pool)!]! | | [Pool](./pool) entities which can can be used for reliable USD pricing of the token | 
|tokenDayData | [[TokenDayData](./tokendaydata)!]! | @derivedFrom(field: "token") | Link to daily stats for the token | 

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[sqrtPriceX96ToTokenPrices()](../functions-n-handlers/utils/pricing.ts#sqrtpricex96totokenprices)||<center>:white_check_mark:</center>|||
|[findEthPerToken()](../functions-n-handlers/utils/pricing.ts#findethpertoken)||<center>:white_check_mark:</center>|||
|[getTrackedAmountUSD()](../functions-n-handlers/utils/pricing.ts#gettrackedamountusd)||<center>:white_check_mark:</center>|||
|[updateTokenDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetokendaydata)||<center>:white_check_mark:</center>|||
|[updateTokenHourData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetokenhourdata)||<center>:white_check_mark:</center>|||
|[handleInitialize()](../functions-n-handlers/mappings/core.ts#handleinitialize)||<center>:white_check_mark:*</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:*</center>|
|[handlePoolCreated()](../functions-n-handlers/mappings/factory.ts#handlepoolcreated)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleIncreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handleincreaseliquidity)||<center>:white_check_mark:</center>|||
|[handleDecreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handledecreaseliquidity)||<center>:white_check_mark:</center>|||
|[handleCollect()](../functions-n-handlers/mappings/position-manager.ts#handlecollect)||<center>:white_check_mark:</center>|||
|[populateToken()\*](../functions-n-handlers/utils/backfill.ts#populatetoken)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[populateEmptyPools()\*](../functions-n-handlers/utils/backfill.ts#populateemptypools)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|

\* -> Different across chains