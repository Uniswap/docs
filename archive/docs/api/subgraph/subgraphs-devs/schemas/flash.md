---
title: Flash
sidebar_position: 13
---

Entity to store details of a flash event emitted while a flash loan was taken from a pool.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Flash Entity ID. Format: `<transaction hash>#<index in transaction.flashed array>` |
|transaction | [Transaction](./transaction)! | | [Transaction Entity](./transaction) in which the flash event was emitted |
|timestamp | BigInt! | | Timestamp of the block in which which the flash event was emitted |
|pool | [Pool](./pool)! | | [Pool](./pool) in which the flash event was emitted |
|sender | Bytes | | the address of the sender that invoked the flash operation |
|recipient | Bytes! | | the address of the recipient that received the flash amount |
|amount0 | BigDecimal! | | Amount of token0 flashed |
|amount1 | BigDecimal! | | Amount of token1 flashed |
|amountUSD | BigDecimal | | Flash value derived in USD based on available prices of tokens |
|amount0Paid | BigDecimal! | | Amount of token0 paid for the flash operation | 
|amount1Paid | BigDecimal! | | Amount of token1 paid for the flash operation | 
|logIndex | BigInt | | Order of the Flash Event within the logs of the transaction |

## Referencing Functions

:::danger 
Couldn't find any references to collect schema
:::