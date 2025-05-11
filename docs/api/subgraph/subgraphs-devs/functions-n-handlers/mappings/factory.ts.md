---
sidebar_position: 2
title: factory.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/mappings/factory.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/mappings/factory.ts)

### handlePoolCreated()
```
Params:
 - event (PoolCreated): Event entity representing the Factory Contracts's Pool created event

ReturnType: void
```
<Tabs>
<TabItem value="Eth Mainnet, Polygon" lable="Eth Mainnet, Polygon">

:::info Ignored Pool
The following pool address is ignored by the function: [0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248](https://etherscan.io/address/0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248) (MULAN-USDT)
:::

- Loads the factory entity at `FACTORY_ADDRESS`, or creates one if not found. Creates the bundle entity while creating factory. Initializes the new entity to `ZERO_BD`, `ZERO_BI`.
- Increment the factory's pool count. 
- Creates new `Token` entity for each of the tokens in the pool if not already present. Initializes the token parameters using `fetchTokenSymbol()`, `fetchTokenName()`, `fetchTokenTotalSupply()`, `fetchTokenDecimals()` and metrics to `ZERO_BD` or `ZERO_BI`. 
- If a token is present in the `WHITELIST_TOKENS` list, it is added to the other token's `whitelistPools` list, which is used for calculating the amount in USD.
- Creates a new `Pool` entity for the token pair. Uses the event parameters, and `token` entities to initialize the values, while sets the metrics to `ZERO_BI` or `ZERO_BD`.
- Finally, using `Pool`(Template), adds a new pool entity to listen for events from the new pool.

:::danger Token decimals mandatory
While creating either of the tokens, if the decimals value is not available, the pool entity is not created and the function returns without changing any entity. Only the bundle entity is still created if factory entity didn't exist.
:::

#### Entities:
1. [Factory](../../schemas/factory) - Read/Create & Write Entity
2. [Bundle](../../schemas/bundle) - Create Entity
3. [Pool](../../schemas/pool) - Create Entity
4. [Token](../../schemas/token) - Read/Create & Write

#### Contracts
1. [Pool (Template)](../../contracts/pool) - Create

#### Dependencies:
1. [FACTORY_ADDRESS](../utils/constants.ts#factory_address)
2. [ADDRESS_ZERO](../utils/constants.ts#address_zero)
3. [ZERO_BD](../utils/constants.ts#zero_bd)
4. [ZERO_BI](../utils/constants.ts#zero_bi)
5. [ONE_BI](../utils/constants.ts#one_bi)
6. [fetchTokenSymbol()](../utils/token.ts#fetchtokensymbol)
7. [fetchTokenName()](../utils/token.ts#fetchtokenname)
8. [fetchTokenTotalSupply()](../utils/token.ts#fetchtokentotalsupply)
9. [fetchTokenDecimals()](../utils/token.ts#fetchtokendecimals)
10. [WHITELIST_TOKENS](../utils/pricing.ts#whitelist_tokens)

#### Invoked at:
1. [PoolCreated Event (Handler)](../../events)

</TabItem>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

- Same logic as mainnet, but doesn't initialize `pool.feeGrowthGlobal0X128` and `pool.feeGrowthGlobal1X128` values.

</TabItem>
<TabItem value="Optimism" lable="Optimism">

- If factory doesn't exists, initializes poolCount to `104` instead of `ZERO_BI` and `factory.populated` to `false`
- Before saving the pool entity, if `factory.populated` is false, invokes `populateEmptyPools()` to load the pool before regenisis and sets `factory.populated = true`.

### Additional Dependencies
1. [populateEmptyPools()](../utils/backfill.ts#populateemptypools)

</TabItem>
</Tabs>
