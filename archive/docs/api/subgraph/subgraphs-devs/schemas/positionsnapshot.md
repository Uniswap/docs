---
title: PositionSnapshot
sidebar_position: 7
---

Entity storing the state of a position after an action taken on the position.

:::caution Entity Not Defined
- Currently the entity is not defined for arbitrum-one chain
:::

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Position Snapshot ID. Format: `<NFT Token ID>#<Block Number>` |
|owner | Bytes! | | Position NFT's Owner's Address |
|pool | [Pool](./pool)! | | [Pool](./pool) entity to which the position belongs to |
|position | [Position](./position)! | | [Position](./position) entity for which the snapshot is taken |
|blockNumber | BigInt! | | BlockNumber in which the snapshot was created |
|timestamp | BigInt! | | Timestamp of the block in which the snapshot was created |
|liquidity | BigInt! | | Total Liquidity of the position |
|depositedToken0 | BigDecimal! | | Total amount of token0 ever deposited to the position |
|depositedToken1 | BigDecimal! | | Total amount of token1 ever deposited to the position |
|withdrawnToken0 | BigDecimal! | | Total amount of token0 withdrawn from the position (excluding the fee) |
|withdrawnToken1 | BigDecimal! | | Total amount of token1 withdrawn from the position (excluding the fee) |
|collectedFeesToken0 | BigDecimal! | | Total amount of token0 fee collected |
|collectedFeesToken1 | BigDecimal! | | Total amount of token1 fee collected |
|transaction | [Transaction](./transaction)! | | [Transaction](./transaction) in which the Snapshot was created. |
|feeGrowthInside0LastX128 | BigInt! | | Marker to compute the position's token0 fee in a pool |
|feeGrowthInside1LastX128 | BigInt! | | Marker to compute the position's token1 fee in a pool |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[savePositionSnapshot()](../functions-n-handlers/mappings/position-manager.ts#savepositionsnapshot)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
