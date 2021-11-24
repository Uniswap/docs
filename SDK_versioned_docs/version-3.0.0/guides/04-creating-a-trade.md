---
id: creating-a-trade
title: Creating a Trade
---

This guide extends the previous [creating a pool](03-creating-a-pool.md) and [getting started](./using-ethers) guides by using the `pool` object to quote an estimated amount out for a trade, then creates a trade object that can be used to execute a swap.

## Creating a Quoter Contract Object

In order to retrieve a quote, create a [Contract](https://docs.ethers.io/v5/api/contract/contract/) object using ethers.js

The quoter is a smart contract that retrieves estimated output or input amounts for a given swap type. This example creates an object in our javascript environment that models the [quoter interface](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/69e095f7c28a7e7fdaca94b5eaa644a8a25f86cc/contracts/interfaces/IQuoter.sol), which can be called to return a swap quote.

Create the quoter contract object by importing the [ABI](https://docs.soliditylang.org/en/v0.7.0/abi-spec.html) from the [uniswap-v3-periphery](https://www.npmjs.com/package/@uniswap/v3-periphery) npm package.

```ts
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
```

assign your [ethereum endpoint provider](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/), in this case, Infura.

```ts
const provider = new ethers.providers.JsonRpcProvider("<YOUR-ENDPOINT-HERE>");
```

Provide the [deployment address of the quoter contract](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/deploys.md).

```ts
const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);
```

## Using callStatic To Return A Quote

To get a quote for a swap, we will call the Quoter contract's `quoteExactInputSingle` function, the interface of which looks like this:

```solidity
   function quoteExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint24 fee,
        uint256 amountIn,
        uint160 sqrtPriceLimitX96
    ) external returns (uint256 amountOut);
```

In an ideal world, these quoter functions would be `view` functions, which would make them very easy to query on-chain with minimal gas costs. Instead, the V3 quoter contracts rely on state-changing calls designed to be reverted to return the desired data. This means calling the quoter will be very expensive and should not be called on-chain.

To get around this difficulty, we can use the [callStatic](https://docs.ethers.io/v5/api/contract/contract/#contract-callStatic) method provided by `ethers.js`. `callStatic` is a useful method that submits a state-changing transaction to an Ethereum node, but asks the node to simulate the state change, rather than to execute it. Our script can then return the result of the simulated state change.

To simulate a transaction without actually broadcasting it to the EVM, use the `callStatic` to call the `ExactInputSingle` function in the `Quoter` contract, which will tell us how much an of output token we will receive given a certain amount of input token when using a single hop swap.

Note this function uses the `Immutables` interface defined in the earlier guides.

```ts
async function main() {
  const amountIn = 1500;

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn.toString(),
    0
  );
}
```

## Construct a Trade

Create a [Route](https://github.com/Uniswap/uniswap-v3-sdk/blob/7c3aedd0cf9441d03607e258734eada44a73863d/src/entities/route.ts) object and assign it to a variable `swapRoute`

```ts
const swapRoute = new Route([poolExample], TokenA, TokenB);
```

Create an [Unchecked Trade](https://github.com/Uniswap/uniswap-v3-sdk/blob/7c3aedd0cf9441d03607e258734eada44a73863d/src/entities/trade.ts#L346), a type of trade that is useful when we have retrieved a quote prior to the construction of the trade object.

```ts
const uncheckedTradeExample = await Trade.createUncheckedTrade({
  route: swapRoute,
  inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
  outputAmount: CurrencyAmount.fromRawAmount(
    TokenB,
    quotedAmountOut.toString()
  ),
  tradeType: TradeType.EXACT_INPUT,
});
```

## Print The Quote And Trade To Your Console

Print the `Quote` and the `UncheckedTrade` to the console.

```ts
console.log("The quoted amount out is", quotedAmountOut.toString());
console.log("The unchecked trade object is", uncheckedTradeExample);
```

If everything is working, you should see something similar to this returned in your console.

```console
The quoted amount out is 661497830963
The unchecked trade object is Trade {
  swaps: [
    {
      inputAmount: [CurrencyAmount],
      outputAmount: [CurrencyAmount],
      route: [Route]
    }
  ],
  tradeType: 0
}
```

## The Full Example

```ts
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

const provider = new ethers.providers.JsonRpcProvider("<YOUR-ENDPOINT-HERE>");

// USDC-WETH pool address on mainnet for fee tier 0.05%
const poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";

const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI,
  provider
);

const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);

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
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  return immutables;
}

async function getPoolState() {
  // note that data here can be desynced if the call executes over the span of two or more blocks.
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const PoolState: State = {
    liquidity,
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
  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(3, immutables.token0, 6, "USDC", "USD Coin");

  const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  );

  // assign an input amount for the swap
  const amountIn = 1500;

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn.toString(),
    0
  );

  // create an instance of the route object in order to construct a trade object
  const swapRoute = new Route([poolExample], TokenA, TokenB);

  // create an unchecked trade instance
  const uncheckedTradeExample = await Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
    outputAmount: CurrencyAmount.fromRawAmount(
      TokenB,
      quotedAmountOut.toString()
    ),
    tradeType: TradeType.EXACT_INPUT,
  });

  // print the quote and the unchecked trade instance in the console
  console.log("The quoted amount out is", quotedAmountOut.toString());
  console.log("The unchecked trade object is", uncheckedTradeExample);
}

main();
```
