---
sidebar_position: 1
title: core.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/mappings/core.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/mappings/core.ts)

### handleInitialize()
```
Params:
 - event (initialize): entity of the initialize event emitted in a pool contract

ReturnType: void
```
<Tabs>
    <TabItem value="Eth Mainnet" lable="Eth Mainnet">

- Handles the initialization of a new pool by setting it's `price` and current `tick` value.
- Updates the pools daily and hourly metrics using `updatePoolDayData()` and `updatePoolHourData()`.
- Updates Eth's USD price using `getEthPriceInUSD()` .
- Updates the token's prices relative to Eth using `findEthPerToken()`.

#### Entities
1. [Pool](../../schemas/pool) - Read & Write
2. [Token](../../schemas/token) - Write
3. [Bundle](../../schemas/bundle) - Write

#### Dependencies:
1. [updatePoolDayData()](../utils/intervalUpdates.ts#updatepooldaydata)
2. [updatePoolHourData()](../utils/intervalUpdates.ts#updatepoolhourdata)
3. [getEthPriceInUSD()](../utils/pricing.ts#getethpriceinusd)
4. [findEthPerToken()](../utils/pricing.ts#findethpertoken)

#### Invoked at:
1. [Initialize Event (Handler)](../../events)

</TabItem>
<TabItem value="Polygon, Optimism" lable="Polygon, Optimism">

- Follows the logic of update, but doesn't save the `pool` entity.

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

- Doesn't save the pool entity
- Doesn't update the Eth's USD price, or the token prices relative to ETh.

</TabItem>
</Tabs>

### handleMint()
```
Params:
 - event (MintEvent): entity of the initialize event emitted in a pool contract

ReturnType: void
```
- updates `txCount`, `totalValueLockedETH` and `totalValueLockedUSD` metrics for `pool`, `factory` and `token` entities.
- Increases `pool.liquidity` by `event.params.amount` if the current `pool.tick` value is within the minted tick range.
- Creates a new `Mint` entity using `transaction.id` and `pool.txCount` as `mint.id`
- Creates tick entities `lowerTick` and `upperTick` if not already present using `createTick()` and updates their `liquidityGross` and `liquidityNet` fields. 
- Updates the pool and token metrics using `updateUniswapDayData()`, `updatePoolDayData()`, `updatePoolHourData()`, `updateTokenDayData()`, `updateTokenHourData()`.
- Updates the fees accumulated outside the lower/upper ticks using `updateTickFeeVarsAndSave()`

#### Entities
1. [Bundle](../../schemas/bundle) - Read
2. [Pool](../../schemas/pool) - Read & Write
3. [Token](../../schemas/token) - Read & Write
4. [Factory](../../schemas/factory) - Read & Write
5. [Tick](../../schemas/tick) - Read/Create & Write
6. [Mint](../../schemas/mint) - Create & Write

#### Dependencies:
1. [FACTORY_ADDRESS](../utils/constants.ts#factory_address)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [loadTransaction()](../utils/index.ts#loadtransaction)
4. [createTick()](../utils/tick.ts#createtick)
5. [updateUniswapDayData()](../utils/intervalUpdates.ts#updateuniswapdaydata)
6. [updatePoolDayData()](../utils/intervalUpdates.ts#updatepooldaydata)
7. [updatePoolHourData()](../utils/intervalUpdates.ts#updatepoolhourdata)
8. [updateTokenDayData()](../utils/intervalUpdates.ts#updatetokendaydata)
9. [updateTokenHourData()](../utils/intervalUpdates.ts#updatetokenhourdata)
10. [updateTickFeeVarsAndSave()](#updatetickfeevarsandsave)
11. [ONE_BI](../utils/constants.ts#one_bi)

#### Invoked at:
1. [Mint Event (Handler)](../../events)

### handleBurn()
```
Params:
 - event (BurnEvent): entity of the burn event emitted in a pool contract

ReturnType: void
```
<Tabs>
    <TabItem value="Other-Chains" lable="Other-Chains">

- updates `txCount`, `totalValueLockedETH` and `totalValueLockedUSD` metrics for `pool`, `factory` and `token` entities.
- Decreases `pool.liquidity` by `event.params.amount` if the current `pool.tick` value is within the burnt tick range.
- Creates a new `Burn` entity using `transaction.id` and `pool.txCount` as `mint.id`. Sets the values from `event` parameters.
- Reduces the liquidity represented by  `liquidityGross` and `liquidityNet` fields of the LowerTick and UpperTick. 
- Updates the pool and token metrics using `updateUniswapDayData()`, `updatePoolDayData()`, `updatePoolHourData()`, `updateTokenDayData()`, `updateTokenHourData()`.
- Updates the fees accumulated outside the lower/upper ticks using `updateTickFeeVarsAndSave()`

#### Entities
1. [Bundle](../../schemas/bundle) - Read
2. [Pool](../../schemas/pool) - Read & Write
3. [Token](../../schemas/token) - Read & Write
4. [Factory](../../schemas/factory) - Read & Write
5. [Tick](../../schemas/tick) - Read & Write
6. [Burn](../../schemas/burn) - Create & Write

#### Dependencies:
1. [FACTORY_ADDRESS](../utils/constants.ts#factory_address)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [loadTransaction()](../utils/index.ts#loadtransaction)
4. [ONE_BI](../utils/constants.ts#one_bi)
5. [updateUniswapDayData()](../utils/intervalUpdates.ts#updateuniswapdaydata)
6. [updatePoolDayData()](../utils/intervalUpdates.ts#updatepooldaydata)
7. [updatePoolHourData()](../utils/intervalUpdates.ts#updatepoolhourdata)
8. [updateTokenDayData()](../utils/intervalUpdates.ts#updatetokendaydata)
9. [updateTokenHourData()](../utils/intervalUpdates.ts#updatetokenhourdata)
10. [updateTickFeeVarsAndSave()](#updatetickfeevarsandsave)

#### Invoked at:
1. [Burn Event (Handler)](../../events)

</TabItem>
<TabItem value="Optimism" lable="Optimism">

Most of the logic is same as mainnet subgraph with following changes:
- While loading the `Tick` entities, if either one is not found, invokes `createTickBurn()` to create ticks and then proceeds with updating the liquidity values and metrics.

### Additional Dependencies
1. [createTickBurn()](../utils/tick.ts#createtickburn)

</TabItem>
</Tabs>

### handleSwap()
```
Params:
 - event (SwapEvent): entity of the swap event emitted in a pool contract

ReturnType: void
```
:::info Ignored Pool
The following pool address is ignored by the function: [0x9663f2ca0454accad3e094448ea6f77443880454](https://etherscan.io/address/9663f2ca0454accad3e094448ea6f77443880454) (WETH-LUSD)
:::

<Tabs>
<TabItem value="Eth Mainnet" lable="Eth Mainnet">

- Calculates the tracked and untracked USD amount for the swap. `tracked` amount is the USD amount calculated only for tokens present in `WHITELIST_TOKEN` using `getTrackedAmountUSD`. `untracked` amount is calculated using `token.derivedETH * bundle.ethPriceUSD`. 
- Calculates the fee in `ETH` & `USD` using the formula `amountTracked * (pool.feeTier/1,000,000)`.
- Updates the fields for `txCount`, volume & fees (in eth & usd) and `untrackedVolumeUSD` for `pool`, `factory` & `token` entities.
- For `pool` entity, sets `liquidity`, `tick`, `sqrtPrice` from the `event` parameters.
- Sets the `pool.token0Price` and `pool.token1Price` using `sqrtPriceX96ToTokenPrices()`.
- Updates the `bundle.ethPriceUSD` using `getEthPriceInUSD()`.
- Updates the `token.derivedETH` value using `findEthPerToken()`.
- Updates the `totalValueLockedETH` and `totalValueLockedUSD` for `pool`, `factory` and `token` entities after the USD price update.
- Creates a new `Swap` entity using `transaction.id` and `pool.txCount` as `swap.id`. Sets the values from `event` parameters.
- Sets `pool.feeGrowthGlobal0X128` and `pool.feeGrowthGlobal1X128` by reading the them from pool contract's blockchain state using the ABI.
- Triggers updates to the daily and hourly metrics for pool and tokens. Uses the returned instances to set the fields for volume & fee.
- If the updated `pool.tick` is initialized, updates it's fee variables using `loadTickUpdateFeeVarsAndSave()`.
- Iterates over all the ticks crossed with the swap (oldTick to newTick) and updates their fee fields using `loadTickUpdateFeeVarsAndSave()`. If the number of ticks cross is more than 100, the updates are ignored to prevent timeouts.

#### Entities
1. [Bundle](../../schemas/bundle) - Read & Write
2. [Pool](../../schemas/pool) - Read & Write
3. [Token](../../schemas/token) - Read & Write
4. [Factory](../../schemas/factory) - Read & Write
5. [Tick](../../schemas/tick) - Read/Create & Write
6. [Swap](../../schemas/swap) - Create & Write
7. [UniswapDayData](../../schemas/uniswapdaydata) - Write
8. [PoolDayData](../../schemas/pooldaydata) - Write
9. [PoolHourData](../../schemas/poolhourdata) - Write
10. [TokenDayData](../../schemas/tokendaydata) - Write
11. [TokenHourData](../../schemas/tokenhourdata) - Write

#### ABI Dependencies:
1. pool.json

#### Dependencies:
1. [FACTORY_ADDRESS](../utils/constants.ts#factory_address)
2. [convertTokenToDecimal()](../utils/index.ts#converttokentodecimal)
3. [loadTransaction()](../utils/index.ts#loadtransaction)
4. [getTrackedAmountUSD()](../utils/pricing.ts#gettrackedamountusd)
5. [safeDiv()](../utils/index.ts#safediv)
6. [sqrtPriceX96ToTokenPrices()](../utils/pricing.ts#sqrtpricex96totokenprices)
7. [getEthPriceInUSD()](../utils/pricing.ts#getethpriceinusd)
8. [findEthPerToken()](../utils/pricing.ts#findethpertoken)
9. [updateUniswapDayData()](../utils/intervalUpdates.ts#updateuniswapdaydata)
10. [updatePoolDayData()](../utils/intervalUpdates.ts#updatepooldaydata)
11. [updatePoolHourData()](../utils/intervalUpdates.ts#updatepoolhourdata)
12. [updateTokenDayData()](../utils/intervalUpdates.ts#updatetokendaydata)
13. [updateTokenHourData()](../utils/intervalUpdates.ts#updatetokenhourdata)
14. [loadTickUpdateFeeVarsAndSave()](#loadtickupdatefeevarsandsave)
15. [feeTierToTickSpacing()](../utils/tick.ts#feetiertotickspacing)
16. [ZERO_BD](../utils/constants.ts#zero_bd)
17. [ZERO_BI](../utils/constants.ts#zero_bi)
18. [ONE_BI](../utils/constants.ts#one_bi)

#### Invoked at:
1. [Swap Event (Handler)](../../events)

</TabItem>
<TabItem value="Polygon" lable="Polygon">

- Follows the logic of mainnet except doesn't save the `token0HourData`, `token1HourData` and `poolHourData` entities.

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

- Follows the logic of mainnet except doesn't save the `token0HourData`, `token1HourData` and `poolHourData` entities.
- Doesn't update the `pool.feeGrowthGlobal0X128` and `pool.feeGrowthGlobal1X128` values.

</TabItem>
</Tabs>

### handleFlash()
```
Params:
 - event (FlashEvent): entity of the flash event emitted in a pool contract

ReturnType: void
```

<Tabs>
<TabItem value="Eth Mainnet, Polygon" lable="Eth Mainnet, Polygon">

- Sets `pool.feeGrowthGlobal0X128` and `pool.feeGrowthGlobal1X128` by reading the them from pool contract's blockchain state using the ABI.

#### Entities
1. [Pool](../../schemas/pool) - Read & Write

#### ABI Dependencies:
1. pool.json

#### Invoked at:
1. [Flash Event (Handler)](../../events)

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">
- Doesn't update anything. Only loads the pool entity and immediately saves it.
</TabItem>
</Tabs>

### updateTickFeeVarsAndSave()
```
Params:
 - tick (Tick): Fee Variables are updated for this tick entity
 - event (Ethereum.event): An event from the pool the tick represent is in

ReturnType: void
```

<Tabs>
<TabItem value="Eth Mainnet, Polygon" lable="Eth Mainnet, Polygon">

- Sets `tick.feeGrowthOutside0X128` and `tick.feeGrowthOutside1X128` by reading the tick from pool contract's blockchain state using the ABI.
- Triggers update to tick day metrics by invoking `updateTickDayData()`.

#### Entities
1. [Tick](../../schemas/tick) - Write

#### ABI Dependencies:
1. pool.json

#### Dependencies:
1. [updateTickDayData()](../utils/intervalUpdates.ts#updatetickdaydata)

#### Invoked at:
1. [handleMint()](#handlemint)
2. [handleBurn()](#handleburn)
3. [loadTickUpdateFeeVarsAndSave](#loadtickupdatefeevarsandsave)

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">
- Doesn't update anything. Only loads the ticks from pool contract and invokes save on the tick entity passed as parameter.
</TabItem>
</Tabs>

### loadTickUpdateFeeVarsAndSave()
```
Params:
 - tickId (i32): The fee variables are updated for this tickId
 - event (ethereum.event): An event from the pool contract which the tick is a part of.

ReturnType: void
```
- Loads the tick using `event.address` and `tickId`. If found, updates the tick variables by invoking `updateTickFeeVarsAndSave()`.

#### Entities
1. [Tick](../../schemas/tick) - Read & Write

#### Dependencies:
1. [updateTickFeeVarsAndSave()](#updatetickfeevarsandsave)

#### Invoked at:
1. [handleSwap()](#handleswap)
