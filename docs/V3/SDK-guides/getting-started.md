---
id: getting-started
title: Getting Started
---

The Uniswap SDK is separate from the Uniswap protocol. It is designed to assist developers when interacting with the protocol in any environment that can execute JavaScript, such as websites or node scripts. With the SDK, you can manipulate data that has been queried from the EVM using libraries that assist with several needs, such as data modeling and protection from rounding errors.

This guide will help you install the V3 SDK and [ethers.js](https://docs.ethers.io/v5/) to query state date and from a V3 Pool. While this tutorial doesn't use the V3 SDK - it will set us up to use it after we get the chain data we need.

# Installation

To interact with the V3 SDK - we recommend installing though the npm package

```javascript
npm i --save-dev @uniswap/v3-sdk
npm i --save-dev @uniswap/sdk-core
```

# Usage

```javascript
import { Pool } from '@uniswap/v3-sdk'
```


## First Steps 

For our first step, we're going to use `ethers.js` return immutable variables from a Uniswap V3 pool contract, and assign them to an interface in our script that can be repeatedly referenced without continually reading state data directly from the EVM. 

We'll need to make a new directory called `example`
```typescript
mkdir example 
cd example
```

then we'll make a new project using node

```typescript
npm init
```

```typescript
npm i typescript --save
npm i ts-node --save
npm i @uniswap/v3-sdk --save
npm i @uniswap/sdk-core i --save
npm i ethers  --save
```
Depending on your machine configuration, you may also need this: 

```typescript
npm install -D tslib @types/node
```

## Importing Ethers and the V3 SDK

We'll need to import ethers, and set up our environment variables so we can query chain data. For this example, we're using an infura endpoint. If you don't have access to an infura endpoint, you can setup a free account [here](https://infura.io/).

```typescript
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Address } from "cluster";

const provider = new ethers.providers.JsonRpcProvider("<YOUR-ENDPOINT-HERE>")
```

The first thing we'll need to do is to tell ethers where to look for our chain data. To do this we'll create a local variable with the contract address of the V3 pool we're trying to query. 

```typescript
const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"
```

Now we'll need the interface for the functions of the pool contract that we'll be calling
```typescript
const poolImmutablesAbi = [
"function factory() external view returns (address)",
"function token0() external view returns (address)",
"function token1() external view returns (address)",
"function fee() external view returns (uint24)",
"function tickSpacing() external view returns (int24)",
"function maxLiquidityPerTick() external view returns (uint128)",
];
```

## Using ethers.js "Contract"

Once that is setup, we create a new instance of a "Contract" using `ethers.js`. This isn't a smart contract itself, but rather a local model of one that helps us move data around off chain.

```typescript
const poolContract = new ethers.Contract(poolAddress, poolImmutablesAbi, provider)
```

Now we'll create an interface with all the data we're going to return, each assigned to its appropriate type

```typescript
interface Immutables {
    factory: Address;
    token0: Address;
    token1: Address;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: number;
}
```

## Returning Chain Data

now we're ready to query the EVM using `ethers.js`, and assign the returned values to the variables inside of our `Immutables` interface.

```typescript
async function getPoolImmutables() {
    const PoolImmutables: Immutables = {
        factory: await poolContract.factory(),
        token0: await poolContract.token0(),
        token1: await poolContract.token1(),
        fee: await poolContract.fee(),
        tickSpacing: await poolContract.tickSpacing(),
        maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
    }
    return PoolImmutables;
}
```
finally, we can call our function, and print out the returned data in our console:

## Calling Our Function

```typescript
getPoolImmutables().then((result)=>{
    console.log(result);
});
```

to call out function, we'll navigate to our project directory within our console, and use this command

```
npx ts-node example.ts
```

If everything worked correctly, you should see something like this:

```typescript
➜  example npx ts-node example.ts
{
  factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  token0: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  token1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  fee: 3000,
  tickSpacing: 60,
  maxLiquidityPerTick: BigNumber {
    _hex: '0x023746e6a58dcb13d4af821b93f062',
    _isBigNumber: true
  }
}
```

## The Final Script

```typescript
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Address } from "cluster";

const provider = new ethers.providers.JsonRpcProvider("<YOUR_ENDPOINT_HERE>")

const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"

const poolImmutablesAbi = [
"function factory() external view returns (address)",
"function token0() external view returns (address)",
"function token1() external view returns (address)",
"function fee() external view returns (uint24)",
"function tickSpacing() external view returns (int24)",
"function maxLiquidityPerTick() external view returns (uint128)",
];

const poolContract = new ethers.Contract(poolAddress, poolImmutablesAbi, provider)

interface Immutables {
    factory: Address;
    token0: Address;
    token1: Address;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: number;
}

async function getPoolImmutables() {
    const PoolImmutables: Immutables = {
        factory: await poolContract.factory(),
        token0: await poolContract.token0(),
        token1: await poolContract.token1(),
        fee: await poolContract.fee(),
        tickSpacing: await poolContract.tickSpacing(),
        maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
    }
    return PoolImmutables;
}

getPoolImmutables().then((result)=>{
    console.log(result);
});
```