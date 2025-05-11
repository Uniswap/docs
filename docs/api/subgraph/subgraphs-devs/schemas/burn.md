---
title: Burn
sidebar_position: 10
---

Entity to stores the details of a burn event emitted while removing liquidity from a pool.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Burn Entity ID. Format: `<transaction hash>#<index in transaction.burns array>` |
|transaction | [Transaction](./transaction)! | | [Transaction Entity](./transaction) in which the burn event was emitted |
|pool | [Pool](./pool)! | | [Pool](./pool) in which the burn event was emitted |
|token0 | [Token](./token)! | | token0 entity of the pool |
|token1 | [Token](./token)! | | token1 entity of the pool |
|timestamp | BigInt! | | Timestamp of the block in which which the burn event was emitted |
|owner | Bytes! | | owner of the position to which the liquidity was burnt |
|origin | Bytes! | | The EOA address that initiated the transaction |
|amount | BigInt! | | Amount of liquidity burnt |
|amount0 | BigDecimal! | | Amount of token0 burnt |
|amount1 | BigDecimal! | | Amount of token1 burnt |
|amountUSD | BigDecimal | | Burn value derived in USD based on available prices of tokens |
|tickLower | BigInt! | | Lower tick of the position  |
|tickUpper | BigInt! | | Upper tick of the position |
|logIndex | BigInt | | Order of the Burn event within the logs of the transaction |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|