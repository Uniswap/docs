---
id: create-pool
title: Create Pool
sidebar_position: 2
---

## Introduction

In this example we will use **ethers.js** and the **Uniswap v4 SDK** to create pools on Uniswap v4. Uniswap v4 is a popular destination for creating markets due to its:

- Proven track record and battle-tested codebase (over $2.75 trillion in cumulative volume)
- Concentrated liquidity, unlocking capital efficiency
- Flexible pool design through dynamic fees and hooks (150+ hooks already developed)
- Gas-efficient singleton architecture (99.99% cheaper pool creation)
- Native ETH support without wrapping
- Flash accounting system for optimized transactions
- Integrations with alternative trading venues

For more information, developers should see [Uniswap v4 Overview](/contracts/v4/overview)

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Two Approaches to Pool Creation

Uniswap v4 offers two methods for creating pools:

1. **Initialize pool without liquidity** - Using `PoolManager.initialize()`
2. **Atomic pool creation with liquidity** - Using `PositionManager` with multicall (recommended)

## Recommended: Atomic Pool Creation with Initial Liquidity

**Uniswap v4's PositionManager supports atomic creation of a pool and initial liquidity using multicall.** Developers can create a trading pool with liquidity in a single transaction. This is the recommended approach as it avoids the security risks of empty pools.

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

> For native token pairs (Ether), use `CurrencyLibrary.ADDRESS_ZERO` as `currency0`

[PoolKey](/contracts/v4/reference/core/types/PoolKey) uniquely identifies a pool

- _Currencies_ should be sorted, `uint160(currency0) < uint160(currency1)`
- _lpFee_ is the fee expressed in pips, i.e. 3000 = 0.30%
- _tickSpacing_ is the granularity of the pool. Lower values are more precise but may be more expensive to trade on
- _hookContract_ is the address of the hook contract (use zero address if no hooks)

A note on `tickSpacing`:

Lower tick spacing provides improved price precision; however, smaller tick spaces will cause swaps to cross ticks more often, incurring higher gas costs.

### Atomic Creation with PositionManager
```typescript
import { ethers } from 'ethers'
import { IPositionManager } from '@uniswap/v4-periphery/contracts/interfaces/IPositionManager.sol'

const POSITION_MANAGER_ADDRESS = '0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e' // Ethereum mainnet
const provider = getProvider()
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const positionManager = new ethers.Contract(
    POSITION_MANAGER_ADDRESS,
    POSITION_MANAGER_ABI,
    signer
)

// Prepare multicall parameters
const actions = [Actions.POOL_INITIALIZE, Actions.MINT_POSITION, Actions.SETTLE_PAIR]
const params = new Array(3)

// Initialize pool
import {IPoolInitializer_v4} from "v4-periphery/src/interfaces/IPoolInitializer_v4.sol"
params[0] = ethers.utils.defaultAbiCoder.encode(
  ['tuple(address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)', 'uint160'],
  [CurrentConfig.poolKey, startingPrice]
)

// Mint position
params[1] = ethers.utils.defaultAbiCoder.encode(
  ['tuple(address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)', 'int24', 'int24', 'uint256', 'uint128', 'uint128', 'address', 'bytes'],
  [CurrentConfig.poolKey, tickLower, tickUpper, liquidity, amount0Max, amount1Max, recipient, '0x']
)

// Settle tokens
params[2] = ethers.utils.defaultAbiCoder.encode(
  ['address', 'address'],
  [CurrentConfig.poolKey.currency0, CurrentConfig.poolKey.currency1]
)

// Execute atomically
const result = await positionManager.modifyLiquidities(
  ethers.utils.defaultAbiCoder.encode(['uint256[]', 'bytes[]'], [actions, params]),
  Math.floor(Date.now() / 1000) + 60 // 60 second deadline
)
```

- the _startingPrice_ is expressed as sqrtPriceX96: `floor(sqrt(token1 / token0) * 2^96)`
  - i.e. `79228162514264337593543950336` is the starting price for a 1:1 pool

## Alternative: Initialize Pool Without Liquidity

To initialize a Uniswap v4 Pool _without initial liquidity_, developers should call [`PoolManager.initialize()`](/contracts/v4/concepts/PoolManager)

Creating a pool without liquidity may be useful for "reserving" a pool for future use, when initial liquidity is not available, or when external market makers would provide the starting liquidity.

### Call `initialize` of Pool Manager contract
```typescript
import { ethers } from 'ethers'
const POOL_MANAGER_ADDRESS = '0x000000000004444c5dc75cB358380D2e3dE08A90' // Ethereum mainnet
const POOL_MANAGER_ABI = [...]; // Import or define the ABI for PoolManager contract

const provider = getProvider() // Provide the right RPC address for the chain
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const poolManager = new ethers.Contract(
    POOL_MANAGER_ADDRESS,
    POOL_MANAGER_ABI,
    signer
)
```

We get the `POOL_MANAGER_ADDRESS` for our chain from [Uniswap Deployments](/contracts/v4/deployments).

Pools are initialized with a starting price
```typescript
const result = await poolManager.initialize(
    CurrentConfig.poolKey,
    startingPrice
)
```

Now the pool is initialized and you can add liquidity to it.

## Important Security Considerations

### Risks of Empty Pools

When creating a new pool, it's **critical** to understand that initializing a pool without liquidity can be dangerous. An empty pool's spot price is freely manipulatable since there is no liquidity to resist price movements.

This means that on the first liquidity provision, if proper slippage parameters are not set:

1. Malicious actors can manipulate the price before the first position is minted
2. The first position can be mispriced and have incorrect asset ratios
3. Front-running attacks can extract value from the initial LP

### Best Practices for Safe Pool Creation

**Strongly Recommended:**
- Use the atomic pool creation method with PositionManager (shown above) to create pool + liquidity in one transaction
- This eliminates the window for price manipulation attacks

**If you must initialize without liquidity:**
- Add liquidity immediately after pool creation in the same transaction block
- Always use strict slippage parameters when minting the first position
- Set appropriate `amount0Max` and `amount1Max` limits
- Consider using a private mempool or flashbots to prevent front-running
- Monitor the pool state before adding liquidity

Reference our [Mint Position guide](/sdk/v4/guides/liquidity/position-minting) for proper liquidity addition practices.

## Gas Optimization Benefits

Uniswap v4's singleton architecture provides significant gas savings:
- **Pool creation**: Up to 99.99% cheaper than v3 (state update vs contract deployment)
- **Multi-hop swaps**: No intermediate token transfers needed
- **Flash accounting**: Only net balances settled via EIP-1153 transient storage
- **Native ETH**: ~15% gas savings on ETH pairs (no wrapping/unwrapping)

## Additional Resources

- [Position Manager Documentation](/contracts/v4/guides/position-manager)
- [Uniswap v4 Hooks](https://uniswaphooks.com/) - Browse 150+ community hooks
- [v4 Whitepaper](https://uniswap.org/whitepaper-v4.pdf)
- [Hook Incubator Program](https://atrium.academy/uniswap) - Learn to build custom hooks
