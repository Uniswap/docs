---
sidebar_position: 6
title: tick.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/tick.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/tick.ts)

### createTick()
```
Params:
 - tickId (String): ID of the tick instance to create. Format: <pool address>#<tick index>
 - tickIdx (i32): Tick index
 - poolId (string): PoolId
 - event (MintEvent): The mint event where liquidity was added to the tick

ReturnType: Tick
```
<Tabs>
<TabItem value="Other Chains" lable="Other-Chains">

Initializes a new Tick to store the liquidity present at the specific tick.

Sets `tick.id`, `tick.tickIdx`, `tick.pool` and `tick.poolId` from the parametrs. Sets `tick.creatdAtTimeStamp` and `tick.createdAtBlockNumber` from `event.block.timestamp` and `event.block.number` respectively.

`tick.price0` is calcualted as `1.0001^tickIdx` and `tick.price1` as `safeDiv(ONE_BD, price0)`.

All the other parameters are initialized to `ZERO_BD` or `ZERO_BI`.

#### Entites:
1. [Tick](../../schemas/tick.md) - Create

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [ONE_BD](./constants.ts#one_bd)
3. [ZERO_BD](./constants.ts#zero_bd)
4. [bigDecimalExponated()](./index.ts#bigdecimalexponated)
5. [safeDiv()](./index.ts#safediv)

#### Invoked at:
1. [handleMint()](../mappings/core.ts#handlemint)

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

- Logic same as mainnet, except doesn't initialize the variables `tick.feeGrowthOutside0X128` and  `tick.feeGrowthOutside1X128`

</TabItem>
</Tabs>   

### createTickBurn()
:::info Only in Optimism
This function exists only in optimism subgraph
:::
```
Params:
 - tickId (String): ID of the tick instance to initialize. Format: <pool address>#<tick index>
 - tickIdx (i32): Tick index
 - poolId (string): PoolId
 - event (MintEvent): The event where the liquidity from the tick is removed

ReturnType: Tick
```

Instantiate a tick that already exists from previous transactions.

- Uses the same logic as [createTick()](#createtick) to initialize a new tick entity
- Later reads the Pool contract ticks data for `tickIdx` and sets the `tick.liquidityGross`, `tick.liquidityNet`, `tick.feeGrowthOutside0X128` and `tick.feeGrowthOutside1X128` vlaues.

#### Entites:
1. [Tick](../../schemas/tick.md) - Create * Write

#### ABI Dependencies:
1. pool.json

#### Dependencies:
1. [ZERO_BI](./constants.ts#zero_bi)
2. [ONE_BD](./constants.ts#one_bd)
3. [ZERO_BD](./constants.ts#zero_bd)
4. [bigDecimalExponated()](./index.ts#bigdecimalexponated)
5. [safeDiv()](./index.ts#safediv)

#### Invoked at:
1. [handleBurn()](../mappings/core.ts#handleburn)


### feeTierToTickSpacing()
```
Params:
 - feeTier (BigInt): The fee tier specified for the pool

ReturnType: BigInt
```
<Tabs>
<TabItem value="Other Chains" lable="Other-Chains">

Given a specific fee tier, returns a BigInt value for the respective tick spacing used in the pool contract.

|Fee Tier|TickSpaceing Returned|
|--|---|
| 10000 | 200 |
| 3000 | 60 |
| 500 | 10 |
| 100 | 1 |
| Anything Else | Error: 'Unexpected fee tier'|

#### Invoked at:
1. [handleSwap()](../mappings/core.ts#handleswap)

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

- Doesn't have the Fee Tier `100`, Tick Space `1` entry.

</TabItem>
</Tabs>   
