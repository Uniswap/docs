---
sidebar_position: 3
title: intervalUpdates.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/intervalUpdates.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/intervalUpdates.ts)


### updateUniswapDayData()
```
Params:
 - event (ethereum.Event): The event used to determine dayId

ReturnType: UniswapDayData
```
Updates the `tvlUSD` and `txCount` parameters for `UniswapDayData` entity for a given day. Sets the variables to `factory` entity's `totalValueLockedUSD` and `txCount` values respectively.

Uses `event.block.timestamp.toI32() / 86400` to determine the `dayID` for `UniswapDayData`. If a `UniswapDayData` entity for the given day doesn't exist already, it is first created, with rest of the metrics initialized to `ZERO_BD`.

#### Entities:
1. [Factory](../../schemas/factory) - Read
2. [UniswapDayData](../../schemas/uniswapDayData) - Read/Create & Write

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)


#### Invoked at:
1. [handleMint()](../mappings/core.ts#handlemint)
2. [handleBurn()](../mappings/core.ts#handleburn)
3. [handleSwap()](../mappings/core.ts#handleswap)

### updatePoolDayData()
```
Params:
 - event (ethereum.Event): The event used to determine pool address and dayId to get the PoolId

ReturnType: PoolDayData
```

<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Using `event.block.timestamp.toI32()/86400` and `event.address.toHexString()` to get the `dayID` and `poolID` respectively. Together also give the `poolDayDataID`.

Creates a new `PoolDayData` entity for the day if not found. The new entity's metrics are initialized to `ZERO_BD` or `ZERO_BI`, while the `open`, `high`, `low` and `close` values are set to `pool.token0price`.

Updates the `PoolDayData` values `high` or `low` conditionally by comparing `pool.token0Price` with the existing values.

Updates the rest of the metrics using values from `Pool` entity.

Note: Currently updates `poolDayData.close` only when a new entity is created.

#### Entities:
1. [Pool](../../schemas/pool) - Read
2. [PoolDayData](../../schemas/poolDayData) - Read/Create & Write

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)
2. [ZERO_BI](./constants.ts#zero_bi)

#### Invoked at:
1. [handleInitialize()](../mappings/core.ts#handleinitialize)
2. [handleMint()](../mappings/core.ts#handlemint)
3. [handleBurn()](../mappings/core.ts#handleburn)
4. [handleSwap()](../mappings/core.ts#handleswap)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Uses the logic of mainnet but doesn't initialize or update `poolDayData.feeGrowthGlobal0X128` and `poolDayData.feeGrowthGlobal1X128` values.

</TabItem>
</Tabs>

### updatePoolHourData()
```
Params:
 - event (ethereum.Event): The event used to determine pool address and hourId to get the HourPoolId

ReturnType: PoolHourData
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Using `event.block.timestamp.toI32()/3600` and `event.address.toHexString()` to get the `hourIndex` and `poolID` respectively. Together also give the `hourPoolID`.

Creates a new `PoolHourData` entity for the specific hour if not found. The new entity's metrics are initialized to `ZERO_BD` or `ZERO_BI`, while the `open`, `high`, `low` and `close` values are set to `pool.token0price`.

Updates the `PoolHourData` values `high` or `low` conditionally by comparing `pool.token0Price` with the existing values.

Updates the rest of the metrics using values from `Pool` entity.

#### Entities:
1. [Pool](../../schemas/pool) - Read
2. [PoolHourData](../../schemas/poolHourData) - Read/Create & Write

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)
2. [ZERO_BI](./constants.ts#zero_bi)
3. [ONE_BI](./constants.ts#one_bi)
#### Invoked at:
1. [handleInitialize()](../mappings/core.ts#handleinitialize)
2. [handleMint()](../mappings/core.ts#handlemint)
3. [handleBurn()](../mappings/core.ts#handleburn)
4. [handleSwap()](../mappings/core.ts#handleswap)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Uses the logic of mainnet but doesn't initialize or update `poolHourData.feeGrowthGlobal0X128` and `poolHourData.feeGrowthGlobal1X128` values.

</TabItem>
</Tabs>

### updateTokenDayData()
```
Params:
 - token (Token): token to update the daily metrics for
 - event (ethereum.Event): The event used to determine the dayID

ReturnType: TokenDayData
```
Uses `event.block.timestamp.toI32() / 86400` to determine the `dayID`. Uses `dayId` and `token.id.toString()` to get the `tokenDayID`. 

Uses `token`'s value in terms of eth and multiplies it with eth's price in USD using `bundle.ethPriceUSD` to get `tokenPrice`. 

Creates a new `TokenDayData` entity if one for `tokenDayID` is not found. Initializes the metrics to `ZERO_BD`, while the `open`, `high`, `low` and `close` are set to `tokenPrice`.

Updates the `TokenDayData` values `high` or `low` conditionally by comparing `pool.token0Price` with the existing values.

Upadates the rest of the metrics using valus from `Token` entity.

#### Entities:
1. [Bundle](../../schemas/bundle) - Read
2. [TokenDayData](../../schemas/tokenDayData) - Read/Create & Write

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. [handleMint()](../mappings/core.ts#handlemint)
2. [handleBurn()](../mappings/core.ts#handleburn)
3. [handleSwap()](../mappings/core.ts#handleswap)

### updateTokenHourData()
```
Params:
 - token (Token): token to update hourly metrics for
 - event (ethereum.Event): The event used to determine the hourIndex

ReturnType: TokenHourData
```
Using `event.block.timestamp.toI32()/3600` to get the `hourIndex`. Uses `hourIndex` and `token.id.toString()` to get the `tokenHourID`. 

Uses `token`'s value in terms of eth and multiplies it with eth's price in USD using `bundle.ethPriceUSD` to get `tokenPrice`. 

Creates a new `TokenHourData` entity for the specific hour if not found. The new entity's metrics are initialized to `ZERO_BD`, while the `open`, `high`, `low` and `close` values are set to `tokenPrice`.

Updates the `TokenHourData` values `high` or `low` conditionally by comparing `tokenPrice` with the existing values.

Updates the rest of the metrics using values from `token` entity.

#### Entities:
1. [Bundle](../../schemas/bundle) - Read
2. [TokenHourData](../../schemas/tokenHourData) - Read/Create & Write

#### Dependencies:
1. [ZERO_BD](./constants.ts#zero_bd)

#### Invoked at:
1. [handleMint()](../mappings/core.ts#handlemint)
2. [handleBurn()](../mappings/core.ts#handleburn)
3. [handleSwap()](../mappings/core.ts#handleswap)

### updateTickDayData()
```
Params:
 - tick (Tick): Tick to update daily metrics for
 - event (ethereum.Event): The event used to determine the dayId

ReturnType: TickDayData
```
<Tabs>
<TabItem value="Other Chains" label="Other-Chains">

Uses `event.block.timestamp.toI32() / 86400` to determine the `dayID`. Uses `dayId` and `tick.id` to get the `tickDayDataID`.

Creates a new `TickDayData` entity for the specific day if not found. Initializes the fields `pool` and `tick` using `tick.pool` and `tick.id`  respectively.

Sets the `TickDayData` entity's field values using corresponding fields from `tick`.

#### Entities:
1. [TickDayData](../../schemas/tickDayData) - Read/Create & Write

#### Invoked at:
1. [updateTickFeeVarsAndSave()](../mappings/core.ts#updatetickfeevarsandsave)

</TabItem>
<TabItem value="Arbitrum-One" label="Arbitrum-One">

- Uses the logic of mainnet but doesn't initialize or update `tickDayData.feeGrowthOutside0X128` and `tickDayData.feeGrowthOutside1X128` values.

</TabItem>
</Tabs>