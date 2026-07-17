---
title: TokenHourData
position: 20
---

Entities capturing the hourly metrics for a token across all of Uniswap.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | TokenHourData Entity ID. Format: `<token address>-<Timestamp rounded to the hour by dividing by 3600>` |
|periodStartUnix | Int! | | Timestamp rounded to the hour by dividing by 3600 |
|token | [Token](./token)! | | [Token Entity](./token) for which the hourly metric were recorded |
|volume | BigDecimal! | | Hourly swap volume of the token |
|volumeUSD | BigDecimal! | | Hourly swap volume of the token in derived USD |
|untrackedVolumeUSD | BigDecimal! | | Hourly swap volume of the token in derived USD (including in pools with tokens with unreliable USD value) |
|totalValueLocked | BigDecimal! | | Liquidity across all pools in token units at the end of the hour |
|totalValueLockedUSD | BigDecimal! | | Total value of liquidity across all pools in token units in derived USD at the end of the hour|
|priceUSD | BigDecimal! | | Price of token in USD at the end of the hour |
|feesUSD | BigDecimal! | | Total Fee Collected in derived USD at the end of the hour |
|open | BigDecimal! | | Open Price of the token |
|high | BigDecimal! | | High Price of the token |
|low | BigDecimal! | | Low Price of the token |
|close | BigDecimal! | | Close Price of the token |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[updateTokenHourData()](../functions-n-handlers/utils/intervalUpdates.ts#updatetokenhourdata)|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
