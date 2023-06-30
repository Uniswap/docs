---
id: position-data
title: Liquidity Positions
---

## Introduction

This guide will introduce us to **liquidity positions** in Uniswap V3 and present the `v3-sdk` classes and Contracts used to interact with the protocol.
The concepts and code snippets showcased here can be found across the **Pooling Liquidity** examples in the Uniswap code examples [repository](https://github.com/Uniswap/examples).

In this guide, we will take a look at the [Position](../../reference/classes/Position.md) and [NonfungiblePositionManager](../../reference/classes/NonfungiblePositionManager.md) classes, as well as the [NonfungiblePositionManager Contract](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md).

At the end of the guide, we should be familiar with the most important classes used to interact with liquidity positions.
We should also understand how to fetch positions from the **NonfungiblePositionManager Contract**.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/v3-periphery`](https://www.npmjs.com/package/@uniswap/v3-periphery)

The code mentioned in this guide can be found across the [minting Position](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/src), [collecting Fees](https://github.com/Uniswap/examples/blob/main/v3-sdk/collecting-fees/src), [modifying positions](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src) and [swap and add liquidity](https://github.com/Uniswap/examples/blob/main/v3-sdk/swap-and-add-liquidity/src) examples.

## Position class

The **sdk** provides a `Position` class used to create local representations of an onchain position.
It is used to create the calldata for onchain calls to mint or modify an onchain position. 

There are four ways to construct a position.

Directly with the [constructor](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L40):

```typescript
import { Pool, Position } from '@uniswap/v3-sdk'
import JSBI from 'jsbi'

const pool = new Pool(...)
const tickLower: number = -100
const tickUpper: number = 200
const liquidity: JSBI = JSBI.BigInt('1000000000000000000')

const position = new Position({
    pool,
    liquidity,
    tickLower,
    tickUpper
})
```

Using the [`fromAmounts()`](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/position.ts#L312) function:

```typescript
import { BigIntish } from '@uniswap/sdk-core'

const pool = new Pool(...)
const tickLower: number = -100
const tickUpper: number = 200
const amount0: BigIntish = '1000000000000000000'
const amount1: BigIntish = JSBI.BigInt('1000000000000000000')
const useFullPrecision: boolean = true

const position = Position.fromAmounts({
    pool, 
    tickLower, 
    tickUpper, 
    amount0, 
    amount1, 
    useFullPrecision
})
```

Or using the [`fromAmount0()`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/entities/position.ts#L354) or [`fromAmount1()`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/entities/position.ts#L378) functions:

```typescript
import { BigIntish } from '@uniswap/sdk-core'
...

const pool = new Pool(...)
const tickLower: number = -200
const tickUpper: number = 100
const amount0: BigIntish = '1000000000000000000'
const useFullPrecision: boolean = true

const singleSidePositionToken0 = Position.fromAmount0({
    pool, 
    tickLower, 
    tickUpper, 
    amount0,
    useFullPrecision
})

const amount1: BigIntish = 100000000

const singleSidePositionToken1 = Position.fromAmount1({
    pool, 
    tickLower, 
    tickUpper, 
    amount1,
    useFullPrecision
})
```

These last two functions calculate a position at the given tick range given the amount of `token0` or `token1` and an unlimited amount of the other Token.
For example, if a tick range where the ratio between `token0` and `token1` is 1 : 2 is defined by `tickLower` and `tickUpper`, the position would be created with that ratio.
A create transaction would then fail if the wallet doesn't hold enough `token1` or the Contract is not given the necessary **Transfer Approval**.

All of these functions take an Object with **named values** as a call parameter. The amount and liquidity values are of type `BigIntish` which accepts `number`, `string` and `JSBI`.

The values of `tickLower` and `tickUpper` must match **initializable ticks** of the Pool.

## NonfungiblePositionManager

The `NonfungiblePositionManager` class is mainly used to create calldata for functions on the **NonfungiblePositionManager Contract**.

We will look at the **sdk** class and write functions on the Contract in this section.

### Creating a Position

To create a position on a Pool, the [`mint`](../../../../contracts/v3/reference/periphery/NonfungiblePositionManager.md#mint) function is called on the Contract.
The **sdk** class provides the `addCallParameters` function to create the calldata for the transaction:

```typescript
import { MintOptions, NonfungiblePositionManager } from '@uniswap/v3-sdk'

const mintOptions: MintOptions = {
  recipient: address,
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
}

// get calldata for minting a position
const { calldata, value } = NonfungiblePositionManager.addCallParameters(
  positionToMint,
  mintOptions
)
```

This call creates a position if it doesn't exist, but can also be used to increase an existing position.
Take a look at the [Mint Position guide](./02-minting-position.md) and [Modify Position guide](./04-modifying-position.md) to learn more.

### Decreasing and Increasing a Position

To decrease or increase the liquidity of a Position, the `decreaseLiquidity` or `increaseLiquidity` functions are called on the Contract.
To increase, `addCallParameters` is used as mentioned above, to decrease we use `removeCallParameters`:

```typescript
const { calldata, value } = NonfungiblePositionManager.removeCallParameters(
  currentPosition,
  removeLiquidityOptions
)
```

Take a look at the [Modify Positions guide](04-modifying-position.md) to learn how to create the `currentPosition` and `removeLiquidityOptions` parameters.

### Collecting Fees

To collect fees accrued, the `collect` function is called on the Contract.
The **sdk class** provides the `collectCallParameters` function to create the calldata for that:

```typescript
const { calldata, value } =
  NonfungiblePositionManager.collectCallParameters(collectOptions)
```

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

## Next steps

Now that you are familiar with the most important classes and Contract to interact with Liquidity Positions, continue with the next guide on [Minting Positions](./02-minting-position.md).
