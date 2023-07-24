---
id: pool-data
title: Fetching Pool Data
---

## Introduction

This guide will cover how to initialize a Pool with full tick data to allow offchain calculations. It is based on the [Fetching Pool data example](https://github.com/Uniswap/examples/tree/main/v3-sdk/pool-data), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the guide's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/pool-data/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will use **ethers JS** and **ethers-multicall** to construct a `Pool` object that we can use in the following guides.

This guide will **cover**:

1. Computing the Pool's address
2. Referencing the Pool contract and fetching metadata
3. Fetching the positions of all initialized Ticks with multicall
4. Fetching all ticks by their indices with a multicall
5. Constructing the Pool object

At the end of the guide, we will have created a `Pool` Object that accurately represents the state of a V3 pool at the time we fetched it.

For this guide, the following Uniswap packages are used:
  
- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

We will also use the `ethers-multicall` npm package:

- [`ethers-multicall`](https://www.npmjs.com/package/ethers-multicall)

The core code of this guide can be found in [`fetcher.ts`](https://github.com/Uniswap/examples/tree/main/v3-sdk/multicall/src/libs/fetcher.ts)

## Computing the Pool's deployment address

In this example, we will construct the **USDC - WETH** Pool with **LOW** fees. The SDK provides a method to compute the address:

```typescript
import { Pool, FeeAmount } from '@uniswap/v3-sdk'
import { Token, WETH9 } from '@uniswap/sdk-core'

const USDC = new Token(1, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6)
const WETH = WETH9[USDC.chainId]
const poolAddress = Pool.getAddress(
    USDC, 
    WETH, 
    FeeAmount.LOW
  )
```

Uniswap V3 allows different Fee tiers when deploying a pool, so multiple pools can exist for each pair of tokens.

## Creating a Pool Contract instance and fetching metadata

Now that we have the address of a **USDC - ETH** Pool, we can construct an instance of an **ethers** `Contract` to interact with it.
To construct the Contract we need to provide the address of the contract, its ABI and a provider connected to an [RPC endpoint](https://docs.infura.io/infura/getting-started). We get access to the contract's ABI through the `@uniswap/v3-core` package, which holds the core smart contracts of the Uniswap V3 protocol:

```typescript
import { ethers } from 'ethers
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

const provider = new ethers.provider.JsonRpcProvider(rpcUrl)
const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI.abi,
    provider
)
```

Once we have set up our reference to the contract, we can proceed to access its methods. To construct our offchain representation of the Pool Contract, we need to fetch its liquidity, sqrtPrice, currently active tick and the full Tick data.
We get the **liquidity**, **sqrtPrice** and **tick** directly from the blockchain by calling `liquidity()`and `slot0()` on the Pool contract:

```typescript
const [liquidity, slot0] =
  await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ])
```

The [slot0 function](../../../../contracts/v3/reference/core/interfaces/pool/IUniswapV3PoolState.md#slot0) represents the first (0th) storage slot of the pool and exposes multiple useful values in a single function:

```solidity
  function slot0(
  ) external view returns (
    uint160 sqrtPriceX96, 
    int24 tick, 
    uint16 observationIndex, 
    uint16 observationCardinality, 
    uint16 observationCardinalityNext, 
    uint8 feeProtocol, 
    bool unlocked
  )
```

For our use case, we only need the `sqrtPriceX96` and the currently active `tick`.

## Fetching all Ticks

V3 pools use ticks to [concentrate liquidity](../../../concepts/protocol/concentrated-liquidity.md) in price ranges and allow for better pricing of trades.
Even though most Pools only have a couple of **initialized ticks**, it is possible that a pools liquidity is defined by thousands of **initialized ticks**.
In that case, it can be very expensive or slow to get all of them with normal RPC calls.

### Multicall

Multicall contracts **aggregate results** from multiple contract calls and therefore allow sending multiple contract calls in **one RPC request**.
This can improve the **speed** of fetching large amounts of data significantly and ensures that the data fetched is all from the **same block**.

We will use the Multicall2 contract by MakerDAO.
We use the `ethers-muticall` npm package to easily interact with the Contract.

### Fetching the positions of initialized Ticks

Uniswap V3 Pools store **bitmaps**, also called *words*, that represent the state of **256 initializable ticks** at a time.
The value at a bit of a word is 1 if the tick at this index is initialized and 0 if it isn't.
We can calculate the positions of initialized ticks from the **words** of the Pool.

All ticks of Uniswap V3 pools are between the indices `-887272` and `887272`.
We can calculate the minimum and maximum word from these indices and the Pool's tickSpacing:

```typescript
function tickToWord(tick: number): number {
  let compressed = Math.floor(tick / tickSpacing)
  if (tick < 0 && tick % tickSpacing !== 0) {
    compressed -= 1
  }
  return tick >> 8
}

const minWord = tickToWord(-887272)
const maxWord = tickToWord(887272)
```

Ticks can only be initialized at indices that are **divisible by the tickSpacing**.
One word contains 256 ticks, so we can compress the ticks by right shifting 8 bit.

Knowing the word indices, we can now fetch them from the Pool using multicall and the `tickBitmap` read call.

First we initialize our multicall providers and Pool Contract:

```typescript
import { ethers } from 'ethers'
import { Contract, Provider } from 'ethers-multicall'

const ethersProvider = new ethers.providers.JsonRpcProvider("...rpcUrl")
const multicallProvider = new Provider(ethersProvider)
await multicallProvider.init()

const poolContract = new Contract(poolAddress, IUniswapV3PoolABI.abi)
```

The `multicallProvider` creates the multicall request and sends it via the ethers Provider.

Next we loop through all possible word indices and add a `tickBitmap` call for each:

```typescript
let calls: any[] = []
let wordPosIndices: number[] = []
for (let i = minWord; i <= maxWord; i++) {
  wordPosIndices.push(i)
  calls.push(poolContract.tickBitmap(i))
}
```

We also keep track of the word indices to be able to loop through them in the same order we added the calls to the array.

We use the `multicallProvider.all()` function to send a multicall and map the results:

```typescript
const results: bigint[] = (await multicallProvider.all(calls)).map(
    (ethersResponse) => {
      return BigInt(ethersResponse.toString())
    }
  )
```

Lastly, we check which ticks are initialized in the words we fetched and calculate the **tick position** from the **word index** and the **tickSpacing** of the pool.

We check if a tick is **initialized** inside the word by shifting it to the position and performing a bitwise AND operation:

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

### Fetching all Ticks by their indices

We use the multicallProvider again to execute an aggregated read call for all tick indices.
We create an array of call Promises again and use `.all()` to make our multicall:

```typescript
const calls: any[] = []

for (const index of tickIndices) {
  calls.push(poolContract.ticks(index))
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

We need to parse the response from our RPC provider to JSBI values that the v3-sdk can work with.

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

## Next Steps

Now that you are familiar with fetching Pool data, continue your journey with the [next example](./03-active-liquidity.md) on visualizing the Liquidity density of a pool.
