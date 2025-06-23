---
id: add-remove-liquidity
title: Adding and Removing Liquidity
---

## Introduction

This guide will cover:

1. **Setting up liquidity operations** – Preparing to add/remove liquidity from v4 positions, including fetching position details, handling native ETH vs ERC20 tokens, and configuring Permit2 for ERC20 token approvals.
2. **Adding liquidity to existing positions** – Using the v4 SDK to increase liquidity with `addCallParameters`, handling native ETH positions, and executing transactions via PositionManager multicall.
3. **Removing liquidity from positions** – Using `removeCallParameters` to decrease or fully exit positions, handling proportional withdrawals, and token collection.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## v4 Architecture and Key Changes

### Native ETH Handling

Unlike v3, Uniswap v4 has native support for ETH without wrapping to WETH. This requires special handling in the SDK:

```typescript
// ✅ Correct: Using Ether.onChain() for native ETH
const token0 = Ether.onChain(chainId)
```

### Position Manager Multicall

All v4 position operations use the `PositionManager` contract's `multicall` function with encoded action sequences:

```typescript
const { calldata, value } = V4PositionManager.addCallParameters(position, options)

await walletClient.writeContract({
  address: POSITION_MANAGER_ADDRESS,
  functionName: 'multicall',
  args: [[calldata]],
  value: BigInt(value),
})
```

## Adding Liquidity to Existing Positions

### Theory: IncreaseLiquidityOptions

When adding liquidity to existing positions, we use `IncreaseLiquidityOptions` which combines:

- `CommonOptions`: slippage, deadline, hookData
- `ModifyPositionSpecificOptions`: tokenId
- `CommonAddLiquidityOptions`: useNative, batchPermit

### Step 1: Fetch Position Details

```typescript
interface PositionDetails {
  tokenId: bigint
  tickLower: number
  tickUpper: number
  liquidity: bigint
  poolKey: {
    currency0: Address
    currency1: Address
    fee: number
    tickSpacing: number
    hooks: Address
  }
  token0: Currency // Can be Ether or Token
  token1: Token // Always Token in current implementation
  currentTick: number
  sqrtPriceX96: string
  poolLiquidity: string
}

async function getPositionDetails(tokenId: bigint): Promise<PositionDetails> {
  // Fetch position info from PositionManager
  const [poolKey, infoValue] = await publicClient.readContract({
    address: POSITION_MANAGER_ADDRESS,
    abi: POSITION_MANAGER_ABI,
    functionName: 'getPoolAndPositionInfo',
    args: [tokenId],
  })

  // Create proper Currency instances
  let token0: Currency
  if (isNativeETH(poolKey.currency0)) {
    token0 = Ether.onChain(chainId)
  } else {
    const decimals0 = await fetchTokenDecimals(poolKey.currency0)
    const symbol0 = await getTokenSymbol(poolKey.currency0)
    token0 = new Token(chainId, poolKey.currency0, decimals0, symbol0)
  }

  const token1 = new Token(chainId, poolKey.currency1, decimals1, symbol1)

  return {
    tokenId,
    tickLower: infoValue.tickLower,
    tickUpper: infoValue.tickUpper,
    liquidity: infoValue.liquidity,
    poolKey,
    token0,
    token1,
    // ... other fields
  }
}
```

### Step 2: Configure Permit2 (Recommended)

```typescript
const PERMIT2_TYPES = {
  PermitDetails: [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint160' },
    { name: 'expiration', type: 'uint48' },
    { name: 'nonce', type: 'uint48' },
  ],
  PermitBatch: [
    { name: 'details', type: 'PermitDetails[]' },
    { name: 'spender', type: 'address' },
    { name: 'sigDeadline', type: 'uint256' },
  ],
}

async function configurePermit2(positionDetails: EnhancedPositionDetails, deadline: number) {
  const permitDetails = []

  // Add token1 (always ERC20)
  const [, , nonce1] = await publicClient.readContract({
    address: PERMIT2_ADDRESS,
    abi: PERMIT2_ABI,
    functionName: 'allowance',
    args: [userAddress, positionDetails.token1.address, POSITION_MANAGER_ADDRESS],
  })

  permitDetails.push({
    token: positionDetails.token1.address,
    amount: (2n ** 160n - 1n).toString(),
    expiration: deadline.toString(),
    nonce: nonce1.toString(),
  })

  // Add token0 only if it's not native ETH
  if (!positionDetails.token0.isNative) {
    const [, , nonce0] = await publicClient.readContract({
      address: PERMIT2_ADDRESS,
      abi: PERMIT2_ABI,
      functionName: 'allowance',
      args: [userAddress, (positionDetails.token0 as Token).address, POSITION_MANAGER_ADDRESS],
    })

    permitDetails.push({
      token: (positionDetails.token0 as Token).address,
      amount: (2n ** 160n - 1n).toString(),
      expiration: deadline.toString(),
      nonce: nonce0.toString(),
    })
  }

  const permitData = {
    details: permitDetails,
    spender: POSITION_MANAGER_ADDRESS,
    sigDeadline: deadline.toString(),
  }

  // Sign Permit2 data
  const signature = await walletClient.signTypedData({
    account,
    domain: {
      name: 'Permit2',
      chainId,
      verifyingContract: PERMIT2_ADDRESS,
    },
    types: PERMIT2_TYPES,
    primaryType: 'PermitBatch',
    message: permitData,
  })

  return {
    owner: userAddress,
    permitBatch: permitData,
    signature,
  }
}
```

### Step 3: Create Position and Add Liquidity

```typescript
async function addLiquidityToPosition(
  positionDetails: EnhancedPositionDetails,
  amount0: string,
  amount1: string,
  slippageTolerance: number = 0.05
) {
  // Create Pool instance
  const pool = new Pool(
    positionDetails.token0,
    positionDetails.token1,
    positionDetails.poolKey.fee,
    positionDetails.poolKey.tickSpacing,
    positionDetails.poolKey.hooks,
    positionDetails.sqrtPriceX96,
    positionDetails.poolLiquidity,
    positionDetails.currentTick
  )

  // Create currency amounts
  const amount0Currency = CurrencyAmount.fromRawAmount(positionDetails.token0, amount0)
  const amount1Currency = CurrencyAmount.fromRawAmount(positionDetails.token1, amount1)

  // Create Position from amounts
  const position = Position.fromAmounts({
    pool,
    tickLower: positionDetails.tickLower,
    tickUpper: positionDetails.tickUpper,
    amount0: amount0Currency.quotient,
    amount1: amount1Currency.quotient,
    useFullPrecision: true,
  })

  // Configure options
  const slippagePct = new Percent(Math.floor(slippageTolerance * 100), 10_000)
  const deadline = Math.floor(Date.now() / 1000) + 1200 // 20 minutes

  const addOptions: AddLiquidityOptions = {
    // CommonOptions
    slippageTolerance: slippagePct,
    deadline: deadline.toString(),
    hookData: '0x',

    // ModifyPositionSpecificOptions
    tokenId: positionDetails.tokenId.toString(),

    // CommonAddLiquidityOptions
    ...(positionDetails.token0.isNative && { useNative: Ether.onChain(chainId) }),
    batchPermit: await configurePermit2(positionDetails, deadline),
  }

  // Generate calldata and execute
  const { calldata, value } = V4PositionManager.addCallParameters(position, addOptions)

  const txHash = await walletClient.writeContract({
    account,
    address: POSITION_MANAGER_ADDRESS,
    chain: unichain,
    abi: POSITION_MANAGER_ABI,
    functionName: 'multicall',
    args: [[calldata]],
    value: BigInt(value.toString()),
  })

  return { txHash, addedAmounts: { amount0, amount1 } }
}
```

## Removing Liquidity from Positions

### Theory: RemoveLiquidityOptions

When removing liquidity, we use `RemoveLiquidityOptions` which includes:

- `CommonOptions`: slippage, deadline, hookData
- `ModifyPositionSpecificOptions`: tokenId
- `RemoveLiquiditySpecificOptions`: liquidityPercentage, burnToken, permit

### Step 1: Calculate Liquidity to Remove

```typescript
function calculateLiquidityToRemove(
  currentLiquidity: bigint,
  percentageToRemove: number // 0.25 = 25%, 1.0 = 100%
): {
  liquidityToRemove: bigint
  liquidityPercentage: Percent
} {
  const liquidityToRemove = (currentLiquidity * BigInt(Math.floor(percentageToRemove * 10000))) / 10000n
  const liquidityPercentage = new Percent(Math.floor(percentageToRemove * 100), 100)

  return { liquidityToRemove, liquidityPercentage }
}
```

### Step 2: Remove Liquidity Implementation

```typescript
async function removeLiquidityFromPosition(
  positionDetails: EnhancedPositionDetails,
  percentageToRemove: number, // 0.25 = 25%, 1.0 = 100%
  slippageTolerance: number = 0.05,
  burnTokenIfEmpty: boolean = false
) {
  const { liquidityToRemove, liquidityPercentage } = calculateLiquidityToRemove(
    positionDetails.liquidity,
    percentageToRemove
  )

  // Create Pool instance
  const pool = new Pool(
    positionDetails.token0,
    positionDetails.token1,
    positionDetails.poolKey.fee,
    positionDetails.poolKey.tickSpacing,
    positionDetails.poolKey.hooks,
    positionDetails.sqrtPriceX96,
    positionDetails.poolLiquidity,
    positionDetails.currentTick
  )

  // Create Position instance with current liquidity
  const position = new Position({
    pool,
    tickLower: positionDetails.tickLower,
    tickUpper: positionDetails.tickUpper,
    liquidity: positionDetails.liquidity.toString(),
  })

  // Configure remove options
  const slippagePct = new Percent(Math.floor(slippageTolerance * 100), 10_000)
  const deadline = Math.floor(Date.now() / 1000) + 1200

  const removeOptions: RemoveLiquidityOptions = {
    // CommonOptions
    slippageTolerance: slippagePct,
    deadline: deadline.toString(),
    hookData: '0x',

    // ModifyPositionSpecificOptions
    tokenId: positionDetails.tokenId.toString(),

    // RemoveLiquiditySpecificOptions
    liquidityPercentage,
    burnToken: burnTokenIfEmpty && percentageToRemove === 1.0,
    // permit: optional NFT permit if transaction sender doesn't own the NFT
  }

  // Generate calldata and execute
  const { calldata, value } = V4PositionManager.removeCallParameters(position, removeOptions)

  const txHash = await walletClient.writeContract({
    account,
    address: POSITION_MANAGER_ADDRESS,
    chain: unichain,
    abi: POSITION_MANAGER_ABI,
    functionName: 'multicall',
    args: [[calldata]],
    value: BigInt(value.toString()),
  })

  return {
    txHash,
    removedLiquidity: liquidityToRemove,
    percentageRemoved: percentageToRemove,
    tokenBurned: burnTokenIfEmpty && percentageToRemove === 1.0,
  }
}
```

## Complete Example: Add/Remove Workflow

```typescript
async function completeAddRemoveWorkflow() {
  const tokenId = 123456n

  // 1. Fetch position details
  const positionDetails = await getPositionDetails(tokenId)
  console.log(`Position: ${positionDetails.token0.symbol}/${positionDetails.token1.symbol}`)

  // 2. Add liquidity
  const addResult = await addLiquidityToPosition(
    positionDetails,
    '1000000000000000', // 0.001 ETH
    '1000000', // 1 USDC
    0.05 // 5% slippage
  )
  console.log(`Added liquidity: ${addResult.txHash}`)

  // 3. Wait and verify
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const updatedPosition = await getPositionDetails(tokenId)

  // 4. Remove 50% of liquidity
  const removeResult = await removeLiquidityFromPosition(
    updatedPosition,
    0.5, // 50%
    0.05, // 5% slippage
    false // don't burn token
  )
  console.log(`Removed 50% liquidity: ${removeResult.txHash}`)

  return { addResult, removeResult }
}
```
