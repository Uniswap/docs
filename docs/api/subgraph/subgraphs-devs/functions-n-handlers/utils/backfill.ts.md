---
title: backfill.ts
---

:::info Only in Optimism
The file is present only for the optimism subgraph
:::

path: [`/src/utils/backfill.ts`](https://github.com/Uniswap/v3-subgraph/blob/ian/optimism-fix/src/utils/backfill.ts)


### populateToken()
```
Params:
 - tokenAddress (String): 

ReturnType: void
```

- Initializes a new Token Enttity for the token address if not already present.
- Initializes the token parameters using `fetchTokenSymbol()`, `fetchTokenName()`, `fetchTokenTotalSupply()`, `fetchTokenDecimals()` and metrics to `ZERO_BD` or `ZERO_BI`. 

#### Entities:
1. [Token](../../schemas/token) - Read/Create & Write

#### Dependencies:
1. [fetchTokenSymbol()](./token.ts#fetchtokensymbol)
2. [fetchTokenName()](./token.ts#fetchtokenname)
3. [fetchTokenTotalSupply()](./token.ts#fetchtokentotalsupply)
4. [fetchTokenDecimals()](./token.ts#fetchtokendecimals)
5. [ZERO_BD](../utils/constants.ts#zero_bd)
6. [ZERO_BI](../utils/constants.ts#zero_bi)

#### Invoked at:
1. [populateEmptyPools()](#populateemptypools)

### populateEmptyPools()
```
Params:
 - event (ethereum.Event): 

ReturnType: void
```

Create entities for each pool and token before regenesis of optimism chain. 
- Iterates through the pools present in `POOL_MAPPINGS` list. Fow each of the items, does the below mentioned steps.
- Using PoolABI, loads the pool contract. Creates a new `Pool` entity and sets it's `token0`, `token1` values from POOL_MAPPING and liquidity from the contract read. Iniitalizes all the metrics to `ZERO_BD` or `ZERO_BI`.
- set `pool.feeTier` by reading it from the contract.
- Invokes `populateToken()` for the two tokens.
- For each token, adds pool to `token.whitelistPool` if the other token is present in `WHITELIST_TOKENS` list.
- Sets `pool.totalValueLockedToken` and `token.totalValueLocked` by reading the ERC20 contract and invoking `balanceOf()`.
- Saves the token and pool entities.

:::danger Overwrites Token TVL
`token.tokenValueLocked` is set everytime instead of adding it to the existing balance. Thus if a token is present in multiple pools, the TVL in the from the last pool will be shown.
:::

#### Entities:
1. [Pool](../../schemas/pool) - Create & Write
2. [Token](../../schemas/token) - Read/Create & Write

#### Contracts
1. [Pool (Template)](../../contracts/pool) - Create

#### ABI Dependencies:
1. pool.json
2. ERC20.json

#### Dependencies:
1. [POOL_MAPPINGS](../poolMapping.ts#pool_mappings)
2. [ZERO_BD](./constants.ts#zero_bd)
3. [ZERO_BI](./constants.ts#zero_bi)
4. [populateToken()](#populatetoken)
5. [WHITELIST_TOKENS](./pricing.ts#whitelist_tokens)
6. [convertTokenToDecimal()](./index.ts#converttokentodecimal)

#### Invoked at:
1. [handlePoolCreated()](../mappings/factory.ts#handlepoolcreated)