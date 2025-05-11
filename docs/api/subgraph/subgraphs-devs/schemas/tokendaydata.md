---
title: TokenDayData
sidebar_position: 19
---

Entities capturing the daily stats for a token across all of Uniswap.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | TokenDayData Entity ID. Format: `<token address>-<Timestamp rounded to the day by dividing by 86400>` |
|date | Int! | | Timestamp rounded to the day by dividing by 86400 |
|token | [Token](./token)! | | [Token Entity](./token) for which the daily metric were recorded |
|volume | BigDecimal! | | Daily swap volume of the token |
|volumeUSD | BigDecimal! | | Daily swap volume of the token in derived USD |
|untrackedVolumeUSD | BigDecimal! | | Daily swap volume of the token in derived USD (including in pools with tokens with unreliable USD value) |
|totalValueLocked | BigDecimal! | | Liquidity across all pools in token units at the end of the day |
|totalValueLockedUSD | BigDecimal! | | Total value of liquidity across all pools in token units in derived USD at the end of the day|
|priceUSD | BigDecimal! | | Price of token in USD at the end of the day |
|feesUSD | BigDecimal! | | Total Fee Collected in derived USD at the end of the day |
|open | BigDecimal! | | Open Price of the token |
|high | BigDecimal! | | High Price of the token |
|low | BigDecimal! | | Low Price of the token |
|close | BigDecimal! | | Close Price of the token |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updateTokenDayData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetokendaydata)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
