---
id: creating-a-pool
title: Creating a Pool Instance
---

This guide extends the previous [getting started](./using-ethers) guide by using the fetched data from the EVM to create a `Pool` instance using the V3 SDK. A "Pool" as we refer to it here does not mean an actual V3 pool, but a model of one created with the SDK. This model will help us interact with the protocol, or manipulate data relevant to the protocol, in a way that does not require continually fetching pool data from the EVM - which can be time intensive and computationally costly.

## Importing the ABI

First we will replace the abi that we previously wrote out manually with a library that contains the total V3 pool abi for us to easily interact with. Note the abi is imported from the `v3-core` npm package, rather than the `v3-sdk` npm package, as it is a part of the protocol rather than the SDK.

Depending on your local configuration, you may need to update your tsconfig.json to allow importing of `json` files with `"resolveJsonModule": true,`.

```typescript
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
```

Now we'll update the `Contract` object with our imported ABI - and keep the pool address and provider the same as the previous example.

```typescript
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/<YOUR-ENDPOINT-HERE>"
);
const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI,
  provider
);
```

## Creating The Interfaces

Here we will create two interfaces, with types that are appropriate for the data we need. We won't be using all of this data, but some extra data is fetched for context.

```typescript
interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}
```

## Fetching Immutable Data

Now we're going to fetch the immutable data from the deployed V3 pool contract, and return it so we can use it to create our own model of the pool. Note that this style of fetching is not recommended for production, as each `await` call is executed sequentially. In your own program, you will likely want to use `Promise.all` to fetch the immutable data concurrently.

```typescript
async function getPoolImmutables() {
  const immutables: Immutables = {
    factory: await poolContract.factory(),
    token0: await poolContract.token0(),
    token1: await poolContract.token1(),
    fee: await poolContract.fee(),
    tickSpacing: await poolContract.tickSpacing(),
    maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
  };
  return immutables;
}
```

Next we need to fetch the state data. Again - this example fetches state data sequentially, which is vulnerable to creating inaccurate pool readings. In production, developers should fetch state data in a way that avoids the potential for returning state between blocks, which would create an inaccurate pool representation.

> `sqrtPriceX96` and `sqrtRatioX96`, despite being named differently, are interchangeable values.

## Fetching State Data

```typescript
async function getPoolState() {
  const slot = await poolContract.slot0();
  const PoolState: State = {
    liquidity: await poolContract.liquidity(),
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };
  return PoolState;
}
```

## Creating the Pool Instance

Finally, we will create a function called `main` which calls are previously written functions, and uses the returned data to construct two `Ethers.js` `Token` instances a V3 SDK `Pool` instance.

> The final constructor argument when creating a Pool, `ticks`, is optional. Ticks takes all tick data, including the liquidity within, which can be used to model the result of a swap. Because this can add up to a lot of data fetched from the EVM, it is optional and may be left out when not needed. In this example, we have left it out.

```typescript
async function main() {
  const immutables = await getPoolImmutables();
  const state = await getPoolState();
  const TokenA = new Token(1, immutables.token0, 6, "USDC", "USD Coin");
  const TokenB = new Token(1, immutables.token1, 18, "WETH", "Wrapped Ether");

  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  console.log(poolExample);
}

main();
```

If everything is working, the script should return something like this:

```typescript
Pool {
  token0: Token {
    chainId: 1,
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    isNative: false,
    isToken: true,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  },
  token1: Token {
    chainId: 1,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    isNative: false,
    isToken: true,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  },
  fee: 3000,
  sqrtRatioX96: JSBI(4) [ 1389262056, -1079304777, -1721588872, 19633, sign: false ],
  liquidity: JSBI(3) [ 988036789, -62655684, 1, sign: false ],
  tickCurrent: 197709,
  tickDataProvider: NoTickDataProvider {}
}
```

## The Final Script

```typescript
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/<YOUR-ENDPOINT-HERE>"
);

const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI,
  provider
);

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

async function getPoolImmutables() {
  const immutables: Immutables = {
    factory: await poolContract.factory(),
    token0: await poolContract.token0(),
    token1: await poolContract.token1(),
    fee: await poolContract.fee(),
    tickSpacing: await poolContract.tickSpacing(),
    maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
  };
  return immutables;
}

async function getPoolState() {
  const slot = await poolContract.slot0();
  const PoolState: State = {
    liquidity: await poolContract.liquidity(),
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };
  return PoolState;
}

async function main() {
  const immutables = await getPoolImmutables();
  const state = await getPoolState();
  const TokenA = new Token(1, immutables.token0, 6, "USDC", "USD Coin");
  const TokenB = new Token(1, immutables.token1, 18, "WETH", "Wrapped Ether");

  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  console.log(poolExample);
}

main();
```
