---
id: collect-fees
title: Collecting Fee
sidebar_position: 3
---

## Introduction

This guide will cover:

1. **Setting up our fee collection** – Preparing to collect fees from a v4 position, including fetching position details, computing the `poolId`, using `StateView` to read fee growth data, and calculating the unclaimed fees off-chain.
2. **Submitting our fee collection transaction** – Using the v4 SDK to create the transaction calldata (with `collectCallParameters`), executing the call (via a multicall on the PositionManager).

For this guide, the following Uniswap packages are used:

- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Fee Calculation Theory

In Uniswap v4, fees are not stored directly. Instead, fees must be calculated using **differential calculation** from cumulative values called `feeGrowthInside`.

### feeGrowthInside Concept

```text
feeGrowthInside = Cumulative fees generated in pool ÷ Active liquidity at that time
```

### Unclaimed Fees (Currently Collectible Fees)

```typescript
const Q128 = 2n ** 128n
unclaimedFees = ((feeGrowthCurrent - feeGrowthLast) * liquidity) / Q128
```

**Compute unclaimed fees off-chain using the v4 formula:**

- `feeGrowthInsideCurrentX128` (for token0 and token1): the total fee growth inside the range as of now.
- `feeGrowthInsideLastX128` (for token0 and token1): the fee growth inside the range at the last time the position's state was updated (recorded in the position info).
- `liquidity`: the amount of liquidity in the position.

**Implementation**:

```typescript
function calculateUnclaimedFeesV4(
  liquidity: bigint,
  feeGrowthInside0Current: bigint,
  feeGrowthInside1Current: bigint,
  feeGrowthInside0Last: bigint,
  feeGrowthInside1Last: bigint
): UnclaimedFees {
  const Q128 = 2n ** 128n

  // Overflow protection: return 0 if current is less than last
  const feeGrowthDelta0 =
    feeGrowthInside0Current >= feeGrowthInside0Last ? feeGrowthInside0Current - feeGrowthInside0Last : 0n

  const feeGrowthDelta1 =
    feeGrowthInside1Current >= feeGrowthInside1Last ? feeGrowthInside1Current - feeGrowthInside1Last : 0n

  return {
    token0Fees: (feeGrowthDelta0 * liquidity) / Q128,
    token1Fees: (feeGrowthDelta1 * liquidity) / Q128,
  }
}
```

### Lifetime Fees (Total Fees Since Position Creation)

```typescript
lifetimeFees = (feeGrowthCurrent * liquidity) / Q128
```

**Implementation**:

```typescript
function calculateLifetimeFeesV4(
  liquidity: bigint,
  feeGrowthInside0Current: bigint,
  feeGrowthInside1Current: bigint
): LifetimeFees {
  const Q128 = 2n ** 128n

  return {
    token0LifetimeFees: (feeGrowthInside0Current * liquidity) / Q128,
    token1LifetimeFees: (feeGrowthInside1Current * liquidity) / Q128,
  }
}
```

### 3. Collected Fees Estimate

**Calculation basis**:

```text
Total fees = Collected + Unclaimed
∴ Collected = Total fees - Unclaimed
```

## v4 Architecture and Required Changes

### Fee Accrual and Credit Changes

**Fee Accrual and Credit:** Uniswap v4 changes how fee accrual is handled when modifying liquidity. In v3, adding or removing liquidity didn't automatically claim fees – you had to call a separate `collect` function to pull out accrued fees. In v4, **accrued fees act like a credit** that is automatically applied or required depending on liquidity changes. Increasing a position's liquidity will **roll any unclaimed fees into the position's liquidity**, and decreasing liquidity will **automatically withdraw** the position's unclaimed fees. However, if you want to claim fees without changing liquidity, you can perform a liquidity change of zero (as we'll do in this guide).

### Why StateView is Required

In v4, all pools are managed by a single `PoolManager`, so direct access to pool contracts is not possible. Instead, data must be read through the `StateView` contract.

```typescript
// v4 approach (required)
await StateView.getPositionInfo(poolId, owner, tickLower, tickUpper, salt)
```

### salt

In v4, the same owner can have multiple positions in the same tick range. `salt` is used to identify them individually.

**Derive the salt for the position:** As noted, v4 positions include a `salt` to distinguish positions with identical range by the same owner. For positions created via the `PositionManager` (which holds ownership in the pool), the salt **is the NFT token ID, encoded as a 32-byte value**.

```typescript
// Use tokenId as salt (PositionManager standard)
const salt = `0x${tokenId.toString(16).padStart(64, '0')}`
```

## Code Implementation Flow

### Phase 1: Position Information Retrieval

### Step 1: Position List Retrieval

Retrieves the tokenIds for v4 positions owned by a specific address from a Subgraph.

### Step 2: Position Details Retrieval

```typescript
async function getPositionDetails(tokenId: bigint): Promise<PositionDetails> {
  const [poolKey, infoValue] = await publicClient.readContract({
    address: POSITION_MANAGER_ADDRESS,
    functionName: 'getPoolAndPositionInfo',
    args: [tokenId],
  })

  // poolId calculation
  const poolId = Pool.getPoolId(currency0, currency1, poolKey.fee, poolKey.tickSpacing, poolKey.hooks)
}
```

### Step 3: Stored Fee State Retrieval

```typescript
async function getStoredPositionInfoV4(positionDetails, tokenId, owner) {
  const salt = `0x${tokenId.toString(16).padStart(64, '0')}`
  const [liquidity, feeGrowthInside0Last, feeGrowthInside1Last] = await publicClient.readContract({
    address: STATE_VIEW_ADDRESS,
    functionName: 'getPositionInfo',
    args: [poolId, POSITION_MANAGER_ADDRESS, tickLower, tickUpper, salt],
  })
}
```

### Step 4: Current Fee Growth Values Retrieval

**Read the current fee growth in the pool for the position's range:** To compute how much fees are unclaimed, we need the **current** fee growth inside the range and compare it to the last snapshot. We could manually fetch global fee growth and subtract out-of-range values, but `StateView` provides a convenience: [`getFeeGrowthInside(poolId, tickLower, tickUpper)`](/contracts/v4/reference/periphery/interfaces/IStateView) will calculate the up-to-date fee growth inside that tick range for each token. This function reads the latest pool state (including global fee growth) and subtracts the parts outside the range. It accounts for any new trades that happened since the last snapshot.

```typescript
async function getCurrentFeeGrowthV4(positionDetails) {
  const [feeGrowthInside0X128, feeGrowthInside1X128] = await publicClient.readContract({
    address: STATE_VIEW_ADDRESS,
    functionName: 'getFeeGrowthInside',
    args: [poolId, tickLower, tickUpper],
  })
}
```

### Phase 2: Submitting Our Fee Collection Transaction

Collecting fees in v4 is done via the `PositionManager` contract's `modifyLiquidities` function with a specific sequence of actions. We will use the Uniswap v4 SDK to construct the required calldata and then send the transaction.

### Build the fee-collection calldata with collectCallParameters

The Uniswap v4 SDK provides a helper `V4PositionManager.collectCallParameters(...)` that produces the calldata for the necessary multicall to collect fees. Under the hood, this will encode two actions: a `DECREASE_LIQUIDITY` with `liquidity = 0` (and min amounts = 0) and a `TAKE_PAIR` to sweep both tokens to a recipient. We need to supply the SDK with our position details and our desired options. First, create a `Position` object for the position (this requires the pool info and position info we fetched):

```typescript
async function collectFeesViaMulticall(tokenId, userAddress) {
  // Create Position object using pool and position parameters
  const position = new Position({
    pool,
    tickLower: positionDetails.tickLower,
    tickUpper: positionDetails.tickUpper,
    liquidity: positionDetails.liquidity.toString(),
  })

  // Specify collect options
  const collectOptions = {
    tokenId: tokenId,
    recipient: userAddress,
    slippageTolerance,
    deadline,
    hookData,
  }

  // Generate command with v4 SDK
  const { calldata, value } = V4PositionManager.collectCallParameters(position, collectOptions)

  // Execute with multicall
  const txHash = await walletClient.writeContract({
    account,
    chain: unichain,
    address: POSITION_MANAGER_ADDRESS,
    abi: POSITION_MANAGER_ABI,
    functionName: 'multicall',
    args: [[calldata]],
    value: BigInt(value),
  })
}
```

Let's break this down: we created a `Position` object using the pool and position parameters. We then specify `collectOptions` including the NFT `tokenId`, a `recipient` address (fees will be sent to this address), and a `deadline`. Because fee collection is not really subject to price slippage, we can set slippage tolerance to 0 and simply expect whatever fees are available. The SDK's `collectCallParameters` returns an object with `calldata` (the encoded bytes to send to the PositionManager) and `value` (the ETH value to send with the transaction, if needed). In our case, `value` will typically be `0` because we are not providing any additional ETH; we are only withdrawing. (The `value` would be non-zero if one of the actions required sending ETH to the contract, e.g. if adding liquidity to an ETH pair.)

**Under the hood:** The `calldata` produced encodes exactly two actions in `modifyLiquidities`: `Actions.DECREASE_LIQUIDITY` followed by `Actions.TAKE_PAIR`. The first action includes our `tokenId` and zeros for liquidity and min amounts, and the second action includes the two token currencies and the recipient address. Using a zero liquidity decrease is a trick to trigger the pool to calculate fees owed without actually changing the liquidity. The `TAKE_PAIR` then instructs the contract to transfer both token0 and token1 fee amounts out to us. (If our pool involved native ETH, one of the `Currency` entries in this param will be `Currency.wrap(0)` as shown, which signals the contract to send ETH. No manual WETH unwrap is needed – v4 handles it natively.)

### Phase 3: Verify the Fees Were Collected

Once the transaction is mined, you'll want to confirm that the fees made it to the `recipient`. There are a few ways to verify:

### Check the Transaction Receipt Logs

For ERC-20 tokens, the fee amounts taken will appear as `Transfer` events from the pool or PositionManager contract to your address. Token contracts will emit these events when the PositionManager transfers the fees to you. You can parse the receipt for `Transfer` logs of `token0` and `token1`. The amounts in those events should match the fees we calculated (or be very close, allowing for rounding).

```typescript
async function verifyFeeCollection(receipt, userAddress, positionDetails, ethBalanceBefore) {
  // Search for ERC-20 Transfer events
  const transferSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  const erc20Transfers = receipt.logs
    .filter(
      (log) =>
        log.topics[0] === transferSignature && log.topics[2]?.toLowerCase().includes(userAddress.slice(2).toLowerCase())
    )
    .map((log) => ({
      token: log.address as Address,
      amount: BigInt(log.data),
    }))
}
```

### Check Your Token Balances

You can simply measuring the balance change in your wallet before vs. after the call. For example, read your token balances (and ETH balance) prior to calling, then after the transaction confirm the increases. Because v4 might auto-wrap or unwrap ETH, if one of the tokens was ETH you should check your ETH balance difference. In ETH pools, no ERC-20 transfer event will fire for the ETH – the ETH will be sent directly to you (as an internal transfer), which is why checking the balance or the transaction's internal traces is necessary to confirm the amount.

```typescript
// Check native ETH balance changes
const hasNativeETH = isNativeETH(positionDetails.poolKey.currency0)

if (hasNativeETH) {
  const ethBalanceAfter = await publicClient.getBalance({ address: userAddress })
  const ethChange = ethBalanceAfter - ethBalanceBefore

  if (ethChange > 0n) {
    collectedFees.push({
      token: '0x0000000000000000000000000000000000000000',
      amount: ethChange,
    })
  }
}
```
