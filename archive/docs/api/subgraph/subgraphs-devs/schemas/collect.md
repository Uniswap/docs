---
title: Collect
sidebar_position: 12
---

Entity to store details of a collect event emitted while removing tokens from a position.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Collect Entity ID. Format: `<transaction hash>#<index in transaction.collects array>` |
|transaction | [Transaction](./transaction)! | | [Transaction Entity](./transaction) in which the collect event was emitted |
|timestamp | BigInt! | | Timestamp of the block in which which the collect event was emitted |
|pool | [Pool](./pool)! | | [Pool](./pool) in which the collect event was emitted |
|owner | Bytes! | | owner of the position from which the tokens were collected |
|amount0 | BigDecimal! | | Amount of token0 collected |
|amount1 | BigDecimal! | | Amount of token1 collected |
|amountUSD | BigDecimal | | Collect value derived in USD based on available prices of tokens |
|tickLower | BigInt! | | Lower tick of the position  |
|tickUpper | BigInt! | | Upper tick of the position |
|logIndex | BigInt | | Order of the Collect Event within the logs of the transaction |

## Referencing Functions

:::danger 
Couldn't find any references to collect schema
:::