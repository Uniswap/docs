---
title: Position
sidebar_position: 6
---

Entity to store details of a position created through [NonfungiblePositionManager](../contracts/nonfungiblepositionmanager). Stores it's metadata, deposited/withdrawn tokens, fee variables and transactions where it participated.

:::caution Entity Not Defined
- Currently the entity is not defined for arbitrum-one chain
:::

## Schema
|Field|Type|derivedFrom|Description|Field Missing|
|-|-|-|-|-|
|id | ID! | | Position NFT Token ID |
|owner | Bytes! | | Position NFT owner's address |
|pool | [Pool](./pool)! | | [Pool](./pool) where the position staked the tokens |
|token0 | [Token](./token)! | | token0 entity of the pool |
|token1 | [Token](./token)! | | token1 entity of the pool |
|tickLower | [Tick](./tick)! | | Lower [Tick Entity](./tick) of the position |
|tickUpper | [Tick](./tick)! | | Upper [Tick Entity](./tick) of the position |
|liquidity | BigInt! | | Total liquidity added by the position |
|depositedToken0 | BigDecimal! | | Total amount token0 ever deposited to the position |
|depositedToken1 | BigDecimal! | | Total amount token1 ever deposited to the position |
|withdrawnToken0 | BigDecimal! | | Total amount token0 withdrawn to the position (excluding fees) |
|withdrawnToken1 | BigDecimal! | | Total amount token1 withdrawn to the position (excluding fees) |
|collectedToken0 | BigDecimal! | | Total amount of token0 collected (inclusive of burn amounts) | mainnet |
|collectedToken1 | BigDecimal! | | Total amount of token1 collected (inclusive of burn amounts) | mainnet |
|collectedFeesToken0 | BigDecimal! | | Total amount token0 fee collected |
|collectedFeesToken1 | BigDecimal! | | Total amount token1 fee collected |
|amountDepositedUSD | BigDecimal! | | Total amount deposited in terms of USD | mainnet, optimsim |
|amountWithdrawnUSD | BigDecimal! | | Total amount withdrawn in terms of USD | mainnet, optimism |
|amountCollectedUSD | BigDecimal! | | Total amount collected in terms of USD | mainnet, optimism |
|transaction | [Transaction](./transaction)! | | [Transaction entity](./transaction) in which the position was created |
|feeGrowthInside0LastX128 | BigInt! | | Tracking the amount of token0 fee accumulated by the position |
|feeGrowthInside1LastX128 | BigInt! | | Tracking the amount of token1 fee accumulated by the position |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[getPosition()](../functions-n-handlers/mappings/position-manager.ts#getposition)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>||
|[updateFeeVars()](../functions-n-handlers/mappings/position-manager.ts#updatefeevars)|||<center>:white_check_mark:</center>||
|[savePositionSnapshot()](../functions-n-handlers/mappings/position-manager.ts#savepositionsnapshot)||<center>:white_check_mark:</center>|||
|[handleIncreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handleincreaseliquidity)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleDecreaseLiquidity()](../functions-n-handlers/mappings/position-manager.ts#handledecreaseliquidity)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleCollect()](../functions-n-handlers/mappings/position-manager.ts#handlecollect)||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleTransfer()](../functions-n-handlers/mappings/position-manager.ts#handletransfer)|||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
