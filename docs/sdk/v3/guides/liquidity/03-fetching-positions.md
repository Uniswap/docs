---
id: fetching-positions
title: Fetching Positions
---

# Introduction

## Fetching Positions

The [NonfungiblePositionManager Contract](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md) can be used to create Positions, as well as get information on existing Positions.

In this section we will **fetch all Positions** for an address.

### Creating an ethers Contract

We use **ethersJS** to interact with the NonfungiblePositionManager Contract. Let's create an ethers Contract:

```typescript
import { ethers } from 'ethers'
import INONFUNGIBLE_POSITION_MANAGER from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'

const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

const nfpmContract = new ethers.Contract(
    NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    INONFUNGIBLE_POSITION_MANAGER.abi,
    provider
)
```

We get the Contract ABI from the 'v3-periphery` package and the contract address from [Github](https://github.com/Uniswap/v3-periphery/blob/main/deploys.md)

### Fetching the Position Ids

We want to fetch all Position Ids for our address. We first fetch the number of positions and then the ids by their indices.

We fetch the number of positions using the `balanceOf` read call:

```typescript

const numPositions = await nfpmContract.balanceOf(address)
```

Next we iterate over the number of positions and fetch the ids:

```typescript
const calls = []

for (let i = 0; i < numPositions; i++) {
    calls.push(
        nfpmContract.tokenOfOwnerByIndex(address, i)
    )
}

const positionIds = await Promise.all(calls)
```

### Fetching the Position Info

Now that we have the ids of the Positions associated with our address, we can fetch the position info using the `positions` function.

The solidity function returns a lot of values describing the Position:

```solidity
function positions(
    uint256 tokenId
  ) external view returns (
    uint96 nonce, 
    address operator, 
    address token0, 
    address token1, 
    uint24 fee, 
    int24 tickLower, 
    int24 tickUpper, 
    uint128 liquidity, 
    uint256 feeGrowthInside0LastX128, 
    uint256 feeGrowthInside1LastX128, 
    uint128 tokensOwed0, 
    uint128 tokensOwed1
    )
```

In this example we only care about values needed to interact with positions, so we create an Interface `PositionInfo`:

```typescript
interface PositionInfo {
  tickLower: number
  tickUpper: number
  liquidity: JSBI
  feeGrowthInside0LastX128: JSBI
  feeGrowthInside1LastX128: JSBI
  tokensOwed0: JSBI
  tokensOwed1: JSBI
}
```

We fetch the Position data with `positions`:

```typescript
const positionCalls = []

for (let id of positionIds) {
    positionCalls.push(
        nfpmContract.positions(id)
    )
}

const callResponses = await Promise.all(positionCalls)
```

Finally, we map the RPC response to our interface:

```typescript
const positionInfos = callResponses.map((position) => {
    return {
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        liquidity: JSBI.BigInt(position.liquidity),
        feeGrowthInside0LastX128: JSBI.BigInt(position.feeGrowthInside0LastX128),
        feeGrowthInside1LastX128: JSBI.BigInt(position.feeGrowthInside1LastX128),
        tokensOwed0: JSBI.BigInt(position.tokensOwed0),
        tokensOwed1: JSBI.BigInt(position.tokensOwed1),
  }
})
```

We now have an array containing PositionInfo for all positions that our address holds.
