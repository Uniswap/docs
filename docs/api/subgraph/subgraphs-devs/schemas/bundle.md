---
title: Bundle
sidebar_position: 2
---

Entity to store the current Eth price in USD.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! |  | ID to fetch a unique entity. (Only ID='1' is used.) | 
|ethPriceUSD | BigDecimal! |  | Price of ETH in USD  | 

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[findEthPerToken()](../functions-n-handlers/utils/pricing.ts#findethpertoken)||<center>:white_check_mark:</center>|||
|[getTrackedAmountUSD()](../functions-n-handlers/utils/pricing.ts#gettrackedamountusd)||<center>:white_check_mark:</center>|||
|[handlePoolCreated()](../functions-n-handlers/mappings/factory.ts#handlepoolcreated)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleInitialize()](../functions-n-handlers/mappings/core.ts#handleinitialize)|||<center>:white_check_mark:*</center>|<center>:white_check_mark:*</center>|
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)||<center>:white_check_mark:</center>|||
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)||<center>:white_check_mark:</center>|||
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleIncreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handleincreaseliquidity)||<center>:white_check_mark:*</center>|||
|[handleDecreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handledecreaseliquidity)||<center>:white_check_mark:*</center>|||
|[handleCollect()](../functions-n-handlers/mappings/position-manager.ts#handlecollect)||<center>:white_check_mark:*</center>|||
|[updateTokenDayData()](../functions-n-handlers/utils/intervalupdates.ts#updatetokendaydata)||<center>:white_check_mark:</center>|||
|[updateTokenHourData()](../functions-n-handlers/utils/intervalupdates.ts#updatetokenhourdata)||<center>:white_check_mark:</center>|||

\* -> Varies across chains