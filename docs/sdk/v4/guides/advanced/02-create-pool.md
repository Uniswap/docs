---
id: create-pool
title: Create Pool
---

## Introduction
In this example we will use **ethers.js** and the **Uniswap v4 SDK** to create pools on Uniswap v4. Uniswap v4 is a popular destination for creating markets due to its:

- Proven track record and battle-tested codebase
- Concentrated liquidity, unlocks capital efficiency
- Flexible pool design through dynamic fees and hooks
- Gas-efficient architecture
- Integrations with alternative trading venues

For more information, developers should see [Uniswap v4 Overview](../../../../contracts/v4/overview.mdx)

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Configuration

To initialize a Uniswap v4 Pool _without initial liquidity_, developers should call [`PoolManager.initialize()`](/contracts/v4/reference/core/interfaces/IPoolManager#initialize)

Creating a pool without liquidity may be useful for "reserving" a pool for future use, when initial liquidity is not available, or when external market makers would provide the starting liquidity.

### Configure the Pool

We will first create an example configuration `CurrentConfig` in `config.ts`. It has the format:

```typescript
export const CurrentConfig: ExampleConfig = {
  env: Environment.MAINNET,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
  },
  ...
  poolKey: {
    currency0: currency0,
    currency1: currency1,
    fee: lpFee,
    tickSpacing: tickSpacing,
    hooks: HOOK_CONTRACT_ADDRESS,
  },
}
```

> For native token pairs (Ether), use `ADDRESS_ZERO` as `currency0`

[PoolKey](/contracts/v4/reference/core/types/PoolKey) uniquely identifies a pool

- _Currencies_ should be sorted, `uint160(currency0) < uint160(currency1)`
- _lpFee_ is the fee expressed in pips, i.e. 3000 = 0.30%
- _tickSpacing_ is the granularity of the pool. Lower values are more precise but may be more expensive to trade on
- _hookContract_ is the address of the hook contract

A note on `tickSpacing`:

Lower tick spacing provides improved price precision; however, smaller tick spaces will cause swaps to cross ticks more often, incurring higher gas costs.

## Call `initialize` of Pool Manager contract

Now to initialize the `Pool` we need to call the `initialize` function of the Pool Manager Contract.
To construct the Pool Manager Contract we need to provide the address of the contract, its ABI and a provider connected to an [RPC endpoint](https://www.chainnodes.org/docs).

```typescript
import { ethers } from 'ethers'
const POOL_MANAGER_ADDRESS = '0x000000000004444c5dc75cB358380D2e3dE08A90' // Replace with actual StateView contract address
const POOL_MANAGER_ABI = [...]; // Import or define the ABI for PoolManager contract

const provider = getProvider() // Provide the right RPC address for the chain
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const poolManager = new ethers.Contract(
    POOL_MANAGER_ADDRESS,
    POOL_MANAGER_ABI,
    signer
)
```
We get the `POOL_MANAGER_ADDRESS` for our chain from [Uniswap Deployments](https://docs.uniswap.org/contracts/v4/deployments).

Pools are initialized with a starting price

```typescript
const result = await poolManager.initialize(
    CurrentConfig.poolKey,
    startingPrice
)
```

- the _startingPrice_ is expressed as sqrtPriceX96: `floor(sqrt(token1 / token0) * 2^96)`
  - i.e. `79228162514264337593543950336` is the starting price for a 1:1 pool

Now the pool is initialized and you can add liquidity to it.