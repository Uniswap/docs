---
title: Transaction
sidebar_position: 8
---

Entity capturing uniswap transaction details with a list of mint, burn, swap, flash and collects events emitted within a transaction.

## Schema
|Field|Type|derivedFrom|Description|
|-|-|-|-|
|id | ID! | | Transaction Hash |
|blockNumber | BigInt! | | Block Number where the transaction was added to the chain |
|timestamp | BigInt! | | Timestamp of the block where the transaction was added to the chain |
|gasUsed | BigInt! | | Amount of Gas Units Consumed to execute the transaction |
|gasPrice | BigInt! | | Cost of one unit Gas paid for the transaction |
|mints | [[Mint](./mint)]! | @derivedFrom(field: "transaction") | [Mint](./mint) entities created in this transaction |
|burns | [[Burn](./burn)]! | @derivedFrom(field: "transaction") | [Burn](./burn) entities created in this transaction |
|swaps | [[Swap](./swap)]! | @derivedFrom(field: "transaction") | [Swap](./swap) entities created in this transaction |
|flashed | [[Flash](./flash)]! | @derivedFrom(field: "transaction") | [Flash](./flash) entities created in this transaction |
|collects | [[Collect](./collect)]! | @derivedFrom(field: "transaction") | [Collect](./collect) entities created in this transaction |

## Referencing Functions

|FunctionName|Create|Read|Update|Save|
|-|-|-|-|-|
|[loadTransaction()](../functions-n-handlers/utils/index.ts#loadtransaction)|<center>:white_check_mark:</center>||<center>:white_check_mark:</center>|<center>:white_check_mark:</center>|
|[handleMint()](../functions-n-handlers/mappings/core.ts#handlemint)||<center>:white_check_mark:</center>|||
|[handleBurn()](../functions-n-handlers/mappings/core.ts#handleburn)||<center>:white_check_mark:</center>|||
|[handleSwap()](../functions-n-handlers/mappings/core.ts#handleswap)||<center>:white_check_mark:</center>|||
|[getPosition()](../functions-n-handlers/mappings/position-manager.ts#getposition)||<center>:white_check_mark:</center>|||
|[savePositionSnapshot()](../functions-n-handlers/mappings/position-manager.ts#savepositionsnapshot)||<center>:white_check_mark:</center>|||
