---
sidebar_position: 1
title: constants.ts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

path: [`/src/utils/constants.ts`](https://github.com/Uniswap/v3-subgraph/blob/main/src/utils/constants.ts)

### ADDRESS_ZERO
```
- type: String
- value: '0x0000000000000000000000000000000000000000'
```
Represents the null address in ethereum.

#### Referenced at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)
2. [getPosition()](../mappings/position-manager.ts#getposition)

### FACTORY_ADDRESS
```
- type: String
- value: '0x1F98431c8aD98523631AE4a59f267346ea31F984'
```

#### Referenced at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)
2. [factoryContract](#factorycontract)
3. [handleMint()](../mappings/core.ts#handlemint)
4. [handleBurn()](../mappings/core.ts#handleburn)
5. [handleSwap()](../mappings/core.ts#handleswap)
6. [updateUniswapDayData()](./intervalUpdates.ts#updateuniswapdaydata)

### ZERO_BI
```
- type: BigInt
- value: 0
```
<Tabs>
<TabItem value="Other Chains" lable="Other-Chains">

#### Referenced at:
1. [updatePoolDayData()](./intervalUpdates.ts#updatepooldaydata)
2. [updatePoolHourData()](./intervalUpdates.ts#updatepoolhourdata)
3. [findEthPerToken()](./pricing.ts#findethpertoken)
4. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)
5. [exponentToBigDecimal()](./index.ts#exponenttobigdecimal)
6. [bigDecimalExponated()](./index.ts#bigdecimalexponated)
7. [tokenAmountToDecimal()](./index.ts#tokenamounttodecimal)
8. [priceToDecimal()](./index.ts#pricetodecimal)
9. [convertTokenToDecimal()](./index.ts#converttokentodecimal)
10. [createTick()](./tick.ts#createtick)
11. [getPosition()](../mappings/position-manager.ts#getposition)
12. [handleSwap()](../mappings/core.ts#handleswap)

</TabItem>
<TabItem value="Optimism" lable="Optimism">

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)
2. [populateEmptyPools()](./backfill.ts#populateemptypools)

</TabItem>
</Tabs>

### ONE_BI
```
- type: BigInt
- value: 1
```

#### Referenced at:
1. [updatePoolDayData()](./intervalUpdates.ts#updatepooldaydata)
2. [updatePoolHourData()](./intervalUpdates.ts#updatepoolhourdata)
3. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)
4. [exponentToBigDecimal()](./index.ts#exponenttobigdecimal)
5. [bigDecimalExponated()](./index.ts#bigdecimalexponated)
6. [handleMint()](../mappings/core.ts#handlemint)
7. [handleBurn()](../mappings/core.ts#handleburn)
8. [handleSwap()](../mappings/core.ts#handleswap)

### TWO_BI
<Tabs>
<TabItem value="Arbitrum-One" lable="Arbitrum-One">

```
- type: BigInt
- value: 2
```

#### Referenced at:
1. [bigDecimalExponated()](./index.ts#bigdecimalexponated)

</TabItem>
<TabItem value="Other Chains" lable="Other-Chains">
	The Value is not present in any other chain.
</TabItem>
</Tabs>   


### ZERO_BD
```
- type: BigDecimal
- value: 0
```

<Tabs>
<TabItem value="Other Chains" lable="Other-Chains">

#### Referenced at:
1. [updatePoolDayData()](./intervalUpdates.ts#updatepooldaydata)
2. [updatePoolHourData()](./intervalUpdates.ts#updatepoolhourdata)
3. [updateTokenDayData()](./intervalUpdates.ts#updatetokendaydata)
4. [updateTokenHourData()](./intervalUpdates.ts#updatetokenhourdata)
5. [updateUniswapDayData()](./intervalUpdates.ts#updateuniswapdaydata)
6. [findEthPerToken()](./pricing.ts#findethpertoken)
7. [getTrackedAmountUSD()](./pricing.ts#gettrackedamountusd)
8. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)
9. [safeDiv()](./index.ts#safediv)
10. [equalToZero()](./index.ts#equaltozero)
11. [createTick()](./tick.ts#createtick)
12. [getPosition()](../mappings/position-manager.ts#getposition)
13. [handleSwap()](../mappings/core.ts#handleswap)

</TabItem>
<TabItem value="Optimism" lable="Optimism">

#### Additionally Invoked At:
1. [populateToken()](./backfill.ts#populatetoken)
2. [populateEmptyPools()](./backfill.ts#populateemptypools)

</TabItem>
</Tabs>

### ONE_BD
```
- type: BigDecimal
- value: 1
```

#### Referenced at:
1. [findEthPerToken()](./pricing.ts#findethpertoken)
2. [bigDecimalExponated()](./index.ts#bigdecimalexponated)
3. [createTick()](./tick.ts#createtick)

### BI_18
```
- type: BigInt
- value: 18
```

### factoryContract
An object representing a smart contract based on `abis/factory.json` abi, binded to `FACTORY_ADDRESS` to query the smart contract data.

#### Dependencies:
1. [FACTORY_ADDRESS](#factory_address)

#### Referenced at:
1. [getPosition()](../mappings/position-manager.ts#getposition)