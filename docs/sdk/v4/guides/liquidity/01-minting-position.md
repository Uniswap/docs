---
id: position-minting
title: Minting a position
---

## Introduction

This guide will introduce us to liquidity positions in Uniswap v4 and present the v4-sdk classes and contracts used to interact with the protocol.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Overview of Uniswap v4 Position Minting

Uniswap v4 introduces a new PositionManager contract and a corresponding v4 SDK to manage liquidity positions. Like v3, liquidity positions are represented as NFTs, but v4 uses a command-based interface for bundling actions (e.g., minting liquidity and transferring tokens) into a single transaction.

The v4 SDK provides high-level classes – Pool, Position, and v4PositionManager – to help construct these transactions in JavaScript/TypeScript. This guide explains how to create (mint) a new liquidity position using the Uniswap v4 SDK.

We will cover:

- Setting up a Pool and Position for minting
- Configuring MintOptions (all parameters, types, and defaults)
- Using v4PositionManager.addCallParameters to get transaction data

## Preparing Pool and Position Objects

Before minting, you need a Pool instance reflecting the current on-chain state and a Position defining your desired liquidity parameters:

### Step 1: Define Token Information

```typescript
import { Token, ChainId, Ether } from '@uniswap/sdk-core'

const ETH_NATIVE = Ether.onChain(ChainId.Mainnet)

const ETH_TOKEN = new Token(
  ChainId.MAINNET,
  '0x0000000000000000000000000000000000000000',
  18,
  'ETH',
  'Ether'
)

const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USDC'
)
```

> **Note**: In v4, pools are identified by a PoolKey (which includes token0, token1, fee, tick spacing, and hook address). The SDK's Pool class helps manage these details. Ensure that the token order (token0 vs token1) and the hook address match the actual pool.

### Step 2: Fetch Pool State

Before creating a Pool instance, you need to fetch the current state from the blockchain:

```typescript
import { createPublicClient, http } from 'viem';
import { Pool } from '@uniswap/v4-sdk';

// Define constants for the function
// The STATE_VIEW_ADDRESS should be imported from your constants file
// or defined at the top of your file
const STATE_VIEW_ADDRESS = '0x86e8631a016f9068c3f085faf484ee3f5fdee8f2'; // Replace with actual StateView contract address
const STATE_VIEW_ABI = [...]; // Import or define the ABI for StateView contract
const CHAIN_ID = xxx; // Replace Chain id

// Create a viem client for reading blockchain data
const client = createPublicClient({
  chain: CHAIN_ID,
  transport: http()
});

// Define pool parameters
const fee = 500; // Fee tier (e.g., 500 = 0.05%)
const tickSpacing = 10; // Tick spacing for this fee tier
const hookAddress = '0x0000...'; // Hook address, if any (or zero address)

// Get the pool ID using SDK helper
const poolId = Pool.getPoolId(token0, token1, fee, tickSpacing, hookAddress);

// Fetch current pool state from the blockchain
const [slot0, liquidity] = await Promise.all([
  client.readContract({
    address: STATE_VIEW_ADDRESS,
    abi: STATE_VIEW_ABI,
    functionName: 'getSlot0',
    args: [poolId as `0x${string}`],
  }),
  client.readContract({
    address: STATE_VIEW_ADDRESS,
    abi: STATE_VIEW_ABI,
    functionName: 'getLiquidity',
    args: [poolId as `0x${string}`],
  }),
]);

// Extract relevant data
const sqrtPriceX96Current = slot0[0] as bigint;
const currentTick = slot0[1] as number;
const currentLiquidity = liquidity as bigint;

// Create Pool instance with the fetched data
const pool = new Pool(
  token0,
  token1,
  fee,
  tickSpacing,
  hookAddress, // Pass the hook address from above
  sqrtPriceX96Current.toString(), // Convert bigint to string for SDK
  currentLiquidity.toString(), // Convert bigint to string for SDK
  currentTick, // Current tick from slot0
);
```

### Step 3: Define Position Parameters

Now define the parameters for your liquidity position:

```typescript
import { nearestUsableTick } from "@uniswap/v3-sdk";

// Define position parameters
// These typically come from user input in your interface
const fullRange = false // Whether to create a full-range position
const tickRange = 500 // Tick range around current price (e.g., 5%)
const amountA = 1.0 // Amount of token A to deposit
const amountB = 1000.0 // Amount of token B to deposit

// Calculate tick boundaries based on user preferences
let tickLower: number
let tickUpper: number

if (fullRange) {
  // For full-range positions, use Uniswap's minimum and maximum allowed ticks
  const MIN_TICK = -887272
  const MAX_TICK = 887272

  // Get tick spacing from the pool (already fetched from blockchain)
  const poolTickSpacing = pool.tickSpacing

  // Round tickLower up (closer to the center)
  // The nearestUsableTick ensures the tick is aligned with tick spacing
  tickLower = nearestUsableTick(MIN_TICK, poolTickSpacing)

  // Round tickUpper down (closer to the center)
  tickUpper = nearestUsableTick(MAX_TICK, poolTickSpacing)
} else {
  // Calculate lower and upper ticks, ensuring they align with tick spacing
  tickLower = nearestUsableTick(currentTick - tickRangeAmount, tickSpacing)
  tickUpper = nearestUsableTick(currentTick + tickRangeAmount, tickSpacing)
}

// Convert human-readable amounts to token amounts with proper decimals
const amountADesired = BigInt(Math.floor(amountA * 10 ** ETH_TOKEN.decimals))
const amountBDesired = BigInt(Math.floor(amountB * 10 ** USDC_TOKEN.decimals))

// Ensure token amounts are in the correct order (token0, token1)
const amount0Desired = token0IsA ? amountADesired.toString() : amountBDesired.toString()
const amount1Desired = token0IsA ? amountBDesired.toString() : amountADesired.toString()
```

### Step 5: Create a Position

Use the SDK to create a Position object that represents your liquidity position:

```typescript
import { Position } from '@uniswap/v4-sdk'

// Create a position from the desired token amounts
// The SDK will calculate the maximum liquidity possible with these amounts
const position = Position.fromAmounts({
  pool,
  tickLower,
  tickUpper,
  amount0: amount0Desired,
  amount1: amount1Desired,
  useFullPrecision: true, // Use full precision for maximum accuracy
})

// You can now access useful information from the position:
// position.mintAmounts - The actual amounts needed to mint this position
// position.amount0 - The amount of token0 in the position
// position.amount1 - The amount of token1 in the position
// position.liquidity - The liquidity value of the position
console.log('Position liquidity:', position.liquidity.toString())
console.log('Token0 amount:', position.amount0.toExact())
console.log('Token1 amount:', position.amount1.toExact())
```

> **Alternative**: If you have a specific liquidity amount instead of token amounts, you could use:
>
> ```typescript
> const position = new Position({
>   pool,
>   tickLower,
>   tickUpper,
>   liquidity: '1000000000000000000', // Example liquidity amount
> })
> ```

## Understanding MintOptions and Its Parameters

Once the Position is defined, the next step is to prepare the MintOptions object. In Uniswap v4 SDK, MintOptions is a type alias that combines three sets of options: CommonOptions, CommonAddLiquidityOptions, and MintSpecificOptions. This structure covers generic transaction settings, options common to any "add liquidity" action, and options unique to minting a new position.

### MintOptions Parameters Explained

```typescript
// Import necessary types
import { Percent } from '@uniswap/sdk-core'
import { MintOptions } from '@uniswap/v4-sdk'

// Example code showing how to set up MintOptions
// These parameters typically come from user input or application state

// 1. slippageTolerance (required): Maximum allowed price movement
// Convert from a percentage (e.g., 0.5%) to a Percent object
// Here, 50 out of 10000 = 0.5%
const slippageTolerance = 0.5 // 0.5% slippage tolerance
const slippagePct = new Percent(Math.floor(slippageTolerance * 100), 10_000)

// 2. deadline (required): Transaction expiry timestamp in seconds
// Usually current time + some buffer (e.g., 20 minutes)
const deadlineSeconds = 20 * 60 // 20 minutes
const currentBlock = await publicClient.getBlock()
const currentBlockTimestamp = Number(currentBlock.timestamp)
const deadline = currentBlockTimestamp + deadlineSeconds

// 3. recipient (required): Address to receive the position NFT
// Typically the user's wallet address
const userAddress = '0xYourAddressHere' // Replace with actual user address

// Create the basic MintOptions object with required fields
const mintOptions: MintOptions = {
  recipient: userAddress,
  slippageTolerance: slippagePct,
  deadline: deadline.toString(),

  // 4. useNative (optional): Use native ETH
  useNative: ETH_TOKEN.isNative
    ? Ether.onChain(ETH_TOKEN.chainId)
    : USDC_TOKEN.isNative
    ? Ether.onChain(USDC_TOKEN.chainId)
    : undefined,

  // 5. batchPermit (optional): For gasless approvals via Permit2
  // We'll set this later if needed

  // 6. hookData (optional): Data for pool hooks
  // Only needed for pools with custom hooks
  hookData: '0x', // Default empty bytes

  // 7-8. For new pools only:
  // createPool: true, // Uncomment if creating a new pool
  // sqrtPriceX96: '1234567890123456789', // Initial price, required if createPool is true

  // 9. For migrations only:
  // migrate: false, // Normally omitted unless migrating from v3
}
```

| Parameter         | Type               | Description                                                 | Required           |
| ----------------- | ------------------ | ----------------------------------------------------------- | ------------------ |
| slippageTolerance | Percent            | Max price movement allowed (for min amount calc)            | Yes                |
| deadline          | BigintIsh          | Tx expiry timestamp (seconds)                               | Yes                |
| recipient         | string             | Address to receive the position NFT                         | Yes                |
| hookData          | string (bytes)     | Data for pool hook (if applicable)                          | No                 |
| useNative         | NativeCurrency     | Use native ETH instead of wrapped token if one is WETH      | No                 |
| batchPermit       | BatchPermitOptions | Permit2 parameters for gasless token approval               | No                 |
| createPool        | boolean            | Create & initialize pool if not existent                    | No (default false) |
| sqrtPriceX96      | BigintIsh          | Initial price (sqrtP) for new pool (required if createPool) | No                 |
| migrate           | boolean            | Mark as part of v3→v4 migration flow                        | No                 |

### Using Permit2 for Gasless Approvals (Optional)

The `batchPermit` option allows users to sign a message off-chain to grant token approval, avoiding separate approve transactions. Here's how to implement it:

```typescript
// Constants and imports needed for Permit2
import { getWalletAccount } from './your-wallet-helpers';

// Define necessary constants
const CONTRACTS = {
  PERMIT2: '0x000000000022D473030F116dDEE9F6B43aC78BA3', // Permit2 contract address
  POSITION_MANAGER: '0x4529a01c7a0410167c5740c487a8de60232617bf.', // Position Manager address (unichain)
};

const PERMIT2_ABI = [...]; // Import or define Permit2 ABI
const PERMIT2_TYPES = {
  PermitBatch: [
    { name: 'details', type: 'PermitDetails[]' },
    { name: 'spender', type: 'address' },
    { name: 'sigDeadline', type: 'uint256' }
  ],
  PermitDetails: [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint160' },
    { name: 'expiration', type: 'uint48' },
    { name: 'nonce', type: 'uint48' }
  ]
};

// Check if we should use Permit2 (application setting or user preference)
const usePermit2 = true; // This could be a user setting

if (usePermit2) {
  // Generate Permit2 data only for ERC20 tokens (not needed for native ETH)
  const permitDetails = [];

  // Process tokenA if it's not native
  if (!ETH_TOKEN.isNative) {
    // Get current nonce from Permit2 contract
    const [, , nonce] = (await publicClient.readContract({
      account: getWalletAccount(), // Your function to get the current wallet
      address: PERMIT2_ADDRESS,
      abi: PERMIT2_ABI,
      functionName: 'allowance',
      args: [userAddress, ETH_TOKEN.address, POSITION_MANAGER_ADDRESS],
    })) as [bigint, bigint, bigint];

    // Add permit details for this token
    // Max uint160 value is used as the amount for an unlimited allowance
    permitDetails.push({
      token: ETH_TOKEN.address,
      amount: (2n ** 160n - 1n).toString(), // Max uint160
      expiration: deadline.toString(),
      nonce: nonce.toString(),
    });
  }

  // Do the same for tokenB if it's not native
  if (!USDC_TOKEN.isNative) {
    const [, , nonce] = (await publicClient.readContract({
      account: getWalletAccount(),
      address: PERMIT2_ADDRESS,
      abi: PERMIT2_ABI,
      functionName: 'allowance',
      args: [userAddress, USDC_TOKEN.address, POSITION_MANAGER_ADDRESS],
    })) as [bigint, bigint, bigint];

    permitDetails.push({
      token: USDC_TOKEN.address,
      amount: (2n ** 160n - 1n).toString(),
      expiration: deadline.toString(),
      nonce: nonce.toString(),
    });
  }

  // If we have any tokens to permit, create and sign the permit message
  if (permitDetails.length > 0) {
    // Create permit data
    const permitData = {
      details: permitDetails,
      spender: POSITION_MANAGER_ADDRESS,
      sigDeadline: deadline.toString(),
    };

    // Sign the permit data with the user's wallet
    // This requires user interaction to approve the signature
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
    });

    // Add the permit data and signature to our mint options
    mintOptions.batchPermit = {
      owner: userAddress,
      permitBatch: permitData,
      signature,
    };
  }
}
```

## Using v4PositionManager to Generate Mint Transaction

With a Position object and MintOptions prepared, we can now use the SDK to compute the calldata and value needed for the transaction:

```typescript
import { V4PositionManager } from '@uniswap/v4-sdk'

// Generate transaction parameters
// This produces the calldata and value needed for the blockchain transaction
const { calldata, value } = V4PositionManager.addCallParameters(position, mintOptions)

// Log the results (for debugging)
console.log('Calldata:', calldata)
console.log('Value:', value)
```

Under the hood, `addCallParameters` builds the necessary function calls to the PositionManager contract:

- It encodes a MINT_POSITION command with your position parameters (pool key, tickLower, tickUpper, liquidity) and a SETTLE_PAIR command to pull in the tokens.
- The slippageTolerance is applied to calculate amount0Max and amount1Max – these are the maximum token amounts the contract is allowed to take.
- If useNative was true, it would also append a SWEEP command for the native token. In case of solidity, please read this [report](https://reports.electisec.com/reports/04-2025-Sickle#2-high---uniswapv4connectoraddliquidity-does-not-reclaim-excess-eth) carefully.
- If batchPermit is provided, the SDK will prepend the permit call using the contract's multicall capability.

## Executing the Transaction with Viem

After obtaining calldata and value, you need to send the transaction to the blockchain:

```typescript
import { createWalletClient } from 'viem'

// Function to execute the mint transaction
async function executeTransaction() {
  try {
    // Send the transaction
    const txHash = await walletClient.writeContract({
      account,
      chain: chainId,
      address: POSITION_MANAGER_ADDRESS,
      abi: POSITION_MANAGER_ABI,
      functionName: 'multicall',
      args: [[calldata]],
      value: BigInt(value),
    })

    // Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    })
  } catch (error) {
    console.error('Transaction failed:', error)
  }
}
```

## Further Resources

- [Uniswap v4 SDK Repository](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk)
- [Permit2 Documentation](/contracts/permit2/overview)
