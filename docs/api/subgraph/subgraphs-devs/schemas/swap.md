---
title: Swap
sidebar_position: 11
---

Entity to stores details of a swap event emitted while swapping one token for the other in a pool.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Swap Entity ID. Format: `<transaction hash>#<index in transaction.swaps array>` |
|transaction | [Transaction](./transaction)! | | [Transaction Entity](./transaction) in which the swap event was emitted |
|timestamp | BigInt! | | Timestamp of the block in which which the swap event was emitted |
|pool | [Pool](./pool)! | | [Pool](./pool) in which the swap event was emitted |
|token0 | [Token](./token)! | | token0 entity of the pool |
|token1 | [Token](./token)! | | token1 entity of the pool |
|sender | Bytes | | the address that triggered the swap |
|recipient | Bytes! | | The address that gets their tokens swapped | 
|origin | Bytes! | | The EOA address that initiated the transaction |
|amount0 | BigDecimal! | | Amount of token0 swapped |
|amount1 | BigDecimal! | | Amount of token1 swapped |
|amountUSD | BigDecimal | | Swapped token value derived in USD based on available prices of tokens |
|sqrtPriceX96 | BigInt! | | The sqrt(price) of the pool after the swap, as a Q64.96 |
|tick | BigInt! | | The tick after the swap |
|logIndex | BigInt | | Order of the swap event within the logs of the transaction |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|