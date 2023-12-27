---
id: fetching-positions
title: Fetching Positions
---

## Introduction

This guide will cover how to fetch Positions from the Blockchain.
Like the [Liquidity Position guide](./01-position-data.md) it doesn't have an accompanying example, nevertheless the concepts and functions used here can be found among the various examples that interact with liquidity positions.

:::info
If you need an introduction to liquidity positions, check out the [Liquidity Position guide](./01-position-data.md)
:::

The [NonfungiblePositionManager Contract](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md) can be used to create Positions, as well as get information on **existing Positions**.
In this guide, we will fetch **all Positions** an address has and fetch the **detailed Position Data** for those positions.

The guide will **cover**:

1. Fetching all positions for an address.
2. Fetching the position info for the positions.

For this guide, the following Uniswap packages are used:

- [`@uniswapfoundation/v3-sdk`](https://www.npmjs.com/package/@uniswapfoundation/v3-sdk)
- [`@uniswapfoundation/sdk-core`](https://www.npmjs.com/package/@uniswapfoundation/sdk-core)

## Fetching the number of Positions

We want to fetch all Positions for our address.
We first fetch the number of positions an address owns using the `getPositionCount` function:

```typescript
import ethers from 'ethers'
import { Position } from '@uniswapfoundation/v3-sdk'

const provider = new ethers.providers.JsonRpcProvider('...rpcUrl')

// Address we want to fetch the positions for
const address = '...'

const positionCount: bigint = await Position.getPositionCount(provider, address)
```

Depending on the number of Positions this address owns, we may want to fetch them individually or all at once.

## Fetching individual Positions

If we want to paginate the positions an address owns we can fetch them one by one using the `getPositionForAddressAndIndex` function:

```typescript
let index = 0

const position: Position = await getPositionForAddressAndIndex(
    provider,
    address,
    index
)
```

We can use the position count we fetched earlier to create a loop for all positions we want to fetch.

## Fetching all Positions for an address

To fetch all Positions at once, we can use the `getAllPositionsForAddress` function:

```typescript
const allPositions: Position[] = await getAllPositionsForAddress(
    provider,
    address
)
```

This call may be too heavy for addresses that have hundreds of Positions.

## Fetching a Position with its Id

In some cases we may know the id of a specific Position, for example if we just created it.
We can use the `fetchWithPositionId` function to fetch the Position:

```typescript

const position: Position = await fetchWithPositionId(
    provider,
    positionId
)
```

## Next Steps

Now that we know how to fetch Positions, let's move to the next guide on [modifying Positions](./04-modifying-position.md).
