---
id: pool-data
title: Fetching Pool Data
sidebar_position: 1
---

## Introduction

In this example we will use **ethers JS** and **ethers-multicall** to construct a `Pool` object that we can use in the following guides.

This guide will **cover**:

1. Computing the PoolId out of PoolKey
2. Referencing the StateView contract and fetching metadata
3. Fetching the positions of all initialized Ticks with multicall
4. Fetching all ticks by their indices with a multicall
5. Constructing the Pool object

At the end of the guide, we will have created a `Pool` Object that accurately represents the state of a v4 pool at the time we fetched it.

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

We will also use the `ethers-multicall` npm package:

- [`ethers-multicall`](https://www.npmjs.com/package/ethers-multicall)

## Configuration

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
    currency0: USDC_TOKEN.address,
    currency1: ETH_TOKEN.address,
    fee: FEE_AMOUNT_LOW,
    tickSpacing: TICK_SPACING_TEN,
    hooks: EMPTY_HOOK,
  },
}
```

The pool used is defined by a pair of tokens in `constants.ts`.
You can also change these two tokens and the other pool parameters in the config, just make sure a pool actually exists for your configuration.
Check out the top pools on [Uniswap](https://app.uniswap.org/explore/pools).

```typescript
export const ETH_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0x0000000000000000000000000000000000000000',
  18,
  'ETH',
  'Ether'
)

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USDC'
)
```

## Computing the PoolId out of PoolKey

In this example, we will construct the **USDC - ETH** Pool with **LOW** fees and without hooks. The SDK provides a method to compute the `PoolId` for this pool:

```typescript
import { Pool } from '@uniswap/v4-sdk';

const {currency0, currency1, fee, tickSpacing, hooks} = CurrentConfig.poolKey;
const poolId = Pool.getPoolId(currency0, currency1, fee, tickSpacing, hooks);

```

## Referencing the StateView contract and fetching metadata

Now that we have the `PoolId` of a **USDC - ETH** Pool, we need to call [StateView](/contracts/v4/guides/state-view) contract to get the pool state. In v4 you need to use `StateLibrary` to read pool state, but offchain systems—such as frontends or analytics services—require a deployed contract with view functions. This is where `StateView` comes in.
To construct the Contract we need to provide the address of the contract, its ABI and a provider connected to an RPC endpoint.

```typescript
import { ethers } from 'ethers'
const STATE_VIEW_ADDRESS = '0x7ffe42c4a5deea5b0fec41c94c136cf115597227'; // Replace with actual StateView contract address
const STATE_VIEW_ABI = [...]; // Import or define the ABI for StateView contract

const provider = getProvider() // Provide the right RPC address for the chain
const stateViewContract = new ethers.Contract(
    STATE_VIEW_ADDRESS,
    STATE_VIEW_ABI,
    provider
)
```

We get the `STATE_VIEW_ADDRESS` for our chain from [Uniswap Deployments](/contracts/v4/deployments).
Once we have set up our reference to the contract, we can proceed to access its methods. To construct our offchain representation of the Pool, we need to fetch its liquidity, sqrtPrice, currently active tick and the full Tick data.
We get the **liquidity**, **sqrtPrice** and **tick** directly from the blockchain by calling `getLiquidity()`and `getSlot0()` on the StateView contract:

```typescript
  const [slot0, liquidity] = await Promise.all([
    stateViewContract.getSlot0(poolId, {
      blockTag: blockNum,
    }),
    stateViewContract.getLiquidity(poolId, {
      blockTag: blockNum,
    }),
  ])
```

The [getSlot0 function](/contracts/v4/guides/state-view#getting-pool-state) represents the first (0th) storage slot of the pool and exposes multiple useful values in a single function:

- `sqrtPriceX96`: The current pool price in Q64.96 fixed-point format.
- `tick`: The current tick in which the pool is operating.
- `protocolFee` and `lpFee`: Fee parameters for protocol and LP fee tiers.

For our use case, we only need the `sqrtPriceX96` and the currently active `tick`.

## Fetching all Ticks

v4 pools use ticks to [concentrate liquidity](/concepts/protocol/concentrated-liquidity) in price ranges and allow for better pricing of trades.
Even though most Pools only have a couple of **initialized ticks**, it is possible that a pools liquidity is defined by thousands of **initialized ticks**.
In that case, it can be very expensive or slow to get all of them with normal RPC calls.

If you are not familiar with the concept of ticks, check out the [`introduction`](/concepts/protocol/concentrated-liquidity#ticks).

To access tick data, we will use the `getTickInfo` function of the State View contract:

```solidity
  function getTickInfo(PoolId poolId, int24 tick)
    external
    view
    returns (
        uint128 liquidityGross,
        int128 liquidityNet,
        uint256 feeGrowthOutside0X128,
        uint256 feeGrowthOutside1X128
    )
```

The `tick` parameter that we provide the function with is the **index** (memory position) of the Tick we are trying to fetch.
To get the indices of all initialized Ticks of the Pool, we can calculate them from the **tickBitmaps**.
To fetch a `tickBitmap` we use a `getTickBitmap` function of the State View contract:

```solidity
  function getTickBitmap(
      PoolId poolId,
      int16 wordPosition
  ) external view returns (uint256 tickBitmap)
```

A pool stores lots of bitmaps, each of which contain the status of 256 Ticks.
The parameter `int16 wordPosition` the function accepts is the position of the bitMap we want to fetch.
We can calculate all the position of bitMaps (or words as they are sometimes called) from the `tickSpacing` of the Pool, which is in turn dependant on the Fee tier.

So to summarise we need 4 steps to fetch all initialized ticks:

1. Calculate all bitMap positions from the tickSpacing of the Pool.
2. Fetch all bitMaps using their positions.
3. Calculate the memory positions of all Ticks from the bitMaps.
4. Fetch all Ticks by their memory position.

We will use multicalls for the fetch calls.

## Multicall

Multicall contracts **aggregate results** from multiple contract calls and therefore allow sending multiple contract calls in **one RPC request**.
This can improve the **speed** of fetching large amounts of data significantly and ensures that the data fetched is all from the **same block**.

We will use the Multicall2 contract by MakerDAO.
We use the `ethers-muticall` npm package to easily interact with the Contract.

## Calculating all bitMap positions

As mentioned, Uniswap v4 Pools store **bitmaps**, also called *words*, that represent the state of **256 initializable ticks** at a time.
The value at a bit of a word is 1 if the tick at this index is initialized and 0 if it isn't.
We can calculate the positions of initialized ticks from the **words** of the Pool.

All ticks of Uniswap v4 pools are between the indices `-887272` and `887272`.
We can calculate the minimum and maximum word from these indices and the Pool's tickSpacing:

```typescript
function tickToWord(tick: number): number {
  let compressed = Math.floor(tick / tickSpacing)
  if (tick < 0 && tick % tickSpacing !== 0) {
    compressed -= 1
  }
  return compressed >> 8
}

const minWord = tickToWord(-887272)
const maxWord = tickToWord(887272)
```

Ticks can only be initialized at indices that are **divisible by the tickSpacing**.
One word contains 256 ticks, so we can compress the ticks by right shifting 8 bit.

## Fetching bitMaps from their position

Knowing the positions of words, we can now fetch them using multicall.

First we initialize our multicall providers and State View Contract:

```typescript
import { ethers } from 'ethers'
import { Contract, Provider } from 'ethers-multicall'

const ethersProvider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL")
const multicallProvider = new Provider(ethersProvider)
await multicallProvider.init()

const stateViewContract = new Contract(STATE_VIEW_ADDRESS, STATE_VIEW_ABI)
```

The `multicallProvider` creates the multicall request and sends it via the ethers Provider.

Next we loop through all possible word positions and add a `getTickBitmap` call for each:

```typescript
let calls: any[] = []
let wordPosIndices: number[] = []
for (let i = minWord; i <= maxWord; i++) {
  wordPosIndices.push(i)
  calls.push(stateViewContract.getTickBitmap(poolId, i))
}
```

We also keep track of the word position indices to be able to loop through them in the same order we added the calls to the array.

We use the `multicallProvider.all()` function to send a multicall and map the results:

```typescript
const results: bigint[] = (await multicallProvider.all(calls)).map(
    (ethersResponse) => {
      return BigInt(ethersResponse.toString())
    }
  )
```

A great visualization of what the bitMaps look like can be found in the [Uniswap v3 development book](https://uniswapv3book.com/docs/milestone_2/tick-bitmap-index/](https://uniswapv3book.com/milestone_2/tick-bitmap-index.html):

<img src={require('./images/tickBitmap_cut.png').default} alt="TickBitmap" box-shadow="none"/>

We encourage anyone trying to get a deeper understanding of the Uniswap protocol to read the Book.

## Calculating the memory positions of all Ticks

Now that we fetched all **bitMaps**, we check which ticks are initialized and calculate the **tick position** from the **word index** and the **tickSpacing** of the pool.

We check if a tick is **initialized** inside the word by shifting a bit by the index we are looking at and performing a bitwise AND operation:

```typescript
const bit = 1n
const initialized = (bitmap & (bit << BigInt(i))) !== 0n
```

If the tick is **initialized**, we revert the compression from tick to word we made earlier by multiplying the word index with 256, which is the same as left shifting by 8 bit, adding the position we are currently at, and multiplying with the tickSpacing:

```typescript
const tickIndex = (ind * 256 + i) * tickSpacing
```

The whole loop looks like this:

```typescript
const tickIndices: number[] = []

  for (let j = 0; j < wordPosIndices.length; j++) {
    const ind = wordPosIndices[j]
    const bitmap = results[j]

    if (bitmap !== 0n) {
      for (let i = 0; i < 256; i++) {
        const bit = 1n
        const initialized = (bitmap & (bit << BigInt(i))) !== 0n
        if (initialized) {
          const tickIndex = (ind * 256 + i) * tickSpacing
          tickIndices.push(tickIndex)
        }
      }
    }
  }
```

We now have an array containing the indices of all initialized Ticks.

## Fetching all Ticks by their indices

We use the multicallProvider again to execute an aggregated read call for all tick indices.
We create an array of call Promises again and use `.all()` to make our multicall:

```typescript
const calls: any[] = []

for (const index of tickIndices) {
  calls.push(stateViewContract.getTickInfo(poolId, index))
}

const results = await multicallProvider.all(calls)
```

Again, the order of the results array is the same as the elements in **tickIndices**.

We are able to combine the **tickIndices** and **results** array to create an array of `Tick` objects:

```typescript
const allTicks: Tick[] = []

  for (let i = 0; i < tickIndices.length; i++) {
    const index = tickIndices[i]
    const ethersResponse = results[i]
    const tick = new Tick({
      index,
      liquidityGross: JSBI.BigInt(ethersResponse.liquidityGross.toString()),
      liquidityNet: JSBI.BigInt(ethersResponse.liquidityNet.toString()),
    })
    allTicks.push(tick)
  }
```

We need to parse the response from our RPC provider to JSBI values that the v4-sdk can work with.

## Constructing the Pool

We have everything to construct our `Pool` now:

```typescript
const usdcWethPool = new Pool(
    USDC,
    WETH,
    feeAmount,
    slot0.sqrtPriceX96,
    liquidity,
    slot0.tick,
    allTicks
)
```

With this fully initialized Pool, we can make accurate offchain calculations.
