---
id: position-fetching
title: Fetching Positions
---

## Introduction

This guide covers how to fetch and analyze liquidity positions in Uniswap v4 using the v4-sdk.

## Key Differences from v3

The v4 PositionManager does not implement ERC721Enumerable, so `tokenOfOwnerByIndex` is not available. This requires using the subgraph to discover position IDs. Additionally, v4 uses a packed data format for position information.

## Setup

```typescript
import { createPublicClient, http, Address, zeroAddress } from 'viem'
import { unichain } from 'viem/chains'
import request from 'graphql-request'

const POSITION_MANAGER_ADDRESS = '0x4529a01c7a0410167c5740c487a8de60232617bf' //unichain

const publicClient = createPublicClient({
  chain: unichain,
  transport: http(),
})
```

## Fetching Position IDs

```typescript
interface SubgraphPosition {
  id: string
  tokenId: string
  owner: string
}

const GET_POSITIONS_QUERY = `
  query GetPositions($owner: String!) {
    positions(where: { owner: $owner }) {
      tokenId
      owner
      id
    }
  }
`

const UNICHAIN_SUBGRAPH_URL =
  'https://gateway.thegraph.com/api/subgraphs/id/EoCvJ5tyMLMJcTnLQwWpjAtPdn74PcrZgzfcT5bYxNBH'

async function getPositionIds(owner: Address): Promise<bigint[]> {
  // You can explore queries at: https://thegraph.com/explorer/subgraphs/EoCvJ5tyMLMJcTnLQwWpjAtPdn74PcrZgzfcT5bYxNBH?view=Query&chain=arbitrum-one

  const headers = {
    Authorization: 'Bearer ' + process.env.GRAPH_KEY, // Get your API key from https://thegraph.com/studio/apikeys/
  }

  const response = await request<{ positions: SubgraphPosition[] }>(
    UNICHAIN_SUBGRAPH_URL,
    GET_POSITIONS_QUERY,
    { owner: owner.toLowerCase() },
    headers
  )

  return response.positions.map((p) => BigInt(p.tokenId))
}
```

## Decoding Packed Position Data

v4 stores position information in a packed format. Here's how to decode it:

```typescript
interface PackedPositionInfo {
  getTickUpper(): number
  getTickLower(): number
  hasSubscriber(): boolean
}

function decodePositionInfo(value: bigint): PackedPositionInfo {
  return {
    getTickUpper: () => {
      const raw = Number((value >> 32n) & 0xffffffn)
      return raw >= 0x800000 ? raw - 0x1000000 : raw
    },

    getTickLower: () => {
      const raw = Number((value >> 8n) & 0xffffffn)
      return raw >= 0x800000 ? raw - 0x1000000 : raw
    },

    hasSubscriber: () => (value & 0xffn) !== 0n,
  }
}
```

## Position Details Interface

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
}
```

## Contract ABI

```typescript
const POSITION_MANAGER_ABI = [
  {
    name: 'getPoolAndPositionInfo',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      {
        name: 'poolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', type: 'address' },
          { name: 'currency1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'tickSpacing', type: 'int24' },
          { name: 'hooks', type: 'address' },
        ],
      },
      { name: 'info', type: 'uint256' },
    ],
  },
  {
    name: 'getPositionLiquidity',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'liquidity', type: 'uint128' }],
  },
] as const
```

## Fetching Position Details

```typescript
async function getPositionDetails(tokenId: bigint): Promise<PositionDetails> {
  // Get pool key and packed position info
  // Get pool key and packed position info
  const [poolKey, infoValue] = (await publicClient.readContract({
    address: POSITION_MANAGER_ADDRESS,
    abi: POSITION_MANAGER_ABI,
    functionName: 'getPoolAndPositionInfo',
    args: [tokenId],
  })) as readonly [
    {
      currency0: Address
      currency1: Address
      fee: number
      tickSpacing: number
      hooks: Address
    },
    bigint
  ]

  // Get current liquidity
  const liquidity = (await publicClient.readContract({
    address: POSITION_MANAGER_ADDRESS,
    abi: POSITION_MANAGER_ABI,
    functionName: 'getPositionLiquidity',
    args: [tokenId],
  })) as bigint

  // Decode packed position info
  const positionInfo = decodePositionInfo(infoValue)

  return {
    tokenId,
    tickLower: positionInfo.getTickLower(),
    tickUpper: positionInfo.getTickUpper(),
    liquidity,
    poolKey,
  }
}
```

## Usage Example

```typescript
async function fetchUserPositions(userAddress: Address) {
  try {
    // Get position IDs from subgraph
    const tokenIds = await getPositionIds(userAddress)
    console.log(`Found ${tokenIds.length} positions on Unichain`)

    // Fetch details for each position
    for (const tokenId of tokenIds) {
      const details = await getPositionDetails(tokenId)

      console.log(`Position ${tokenId}:`)
      console.log(`  Token0: ${details.poolKey.currency0}`)
      console.log(`  Token1: ${details.poolKey.currency1}`)
      console.log(`  Fee: ${details.poolKey.fee / 10000}%`)
      console.log(`  Range: ${details.tickLower} to ${details.tickUpper}`)
      console.log(`  Liquidity: ${details.liquidity.toString()}`)
      console.log(`  Hooks: ${details.poolKey.hooks}`)
      console.log('---')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Example usage
fetchUserPositions('0xYourAddress' as Address)
```

## Resources

- [Uniswap v4 SDK](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk)
- [Unichain Documentation](https://docs.unichain.org/)
