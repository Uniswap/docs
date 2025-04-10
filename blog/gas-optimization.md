---
title: An Introduction to Gas Optimization
authors:
  - name: Moody Salem
    url: https://github.com/moodysalem
  - name: Noah Zinsmeister
    url: https://github.com/NoahZinsmeister
  - name: Connor Martin
    url: https://github.com/Yorkemartin
hide_table_of_contents: true
image: /use.png
slug: intro-to-gas-optimization
---

<div class="test">


<img src={require('./use.png').default} alt="RangeOrder1" width="100%" height="100%" />

<p></p>

## Gas Optimization

:::tip Get Started

To help devs get their contracts into tip-top shape before deployment, we reconfigured our most used gas snapshot tool as a simple npm package: [The Uniswap Gas Snapshot Test](https://www.npmjs.com/package/@uniswap/snapshot-gas-cost)

:::

At Uniswap Labs, many of the smart contracts we’ve written have gone on to become the most frequently called smart contracts on the Ethereum blockchain.

Tens of thousands of ETH are spent every month by users interacting with the Uniswap Protocol contracts. Multiples of that still are spent on the many protocol forks deployed across Ethereum and other environments.

Due to the protocol’s significant use, and reuse in the form of forks, a change in the gas optimization of a piece of protocol code that saves 1% in gas translates to millions of dollars saved by the DeFi community over the lifetime of the contracts.

As a result, it is difficult to overstate the significance of these optimizations. Considerable effort goes into this work, [which](https://github.com/Uniswap/v3-core/commit/705be1eefc56a3620afe96a725c3a68951e8d4a9) [frequently](https://github.com/Uniswap/v3-core/commit/7689aa8e2adecbcf94198f79cb4f230d0419d009) [continues](https://github.com/Uniswap/v3-core/commit/225399176cf1fa562aa74345b7885e1244d95417) [right](https://github.com/Uniswap/v3-core/commit/ebcdb5225a3cf4188f4752f59fe52e6b0071909d) [up](https://github.com/Uniswap/v3-core/commit/49ce1c3a600e4c0e22e272b2144a3082663cb1ea) [to](https://github.com/Uniswap/v3-core/commit/5b485192df944273882397d804d13c2e4ebb25da) [deployment](https://github.com/Uniswap/v3-core/commit/723f90cbea93fc09ff06303bd4db03ce3b0847a1).

While much of the discourse around gas optimization takes the form of specific implementation techniques, which can be quite fun to read and experiment with, we think a more helpful thing to write about is the development of a process in pursuit of gas optimization, rather than a collection of specific optimizations which may become dated as Ethereum progresses.

## Measurement

If there’s one lesson to learn from this post, it’s that all optimization starts with measurement. The single biggest tool in our arsenal of gas optimization is the [snapshot test](https://jestjs.io/docs/snapshot-testing) borrowed from Jest snapshot testing. For V3, we used a snippet in combination with the [mocha-chai-jest-snapshot](https://www.npmjs.com/package/mocha-chai-jest-snapshot) plugin to record gas costs in [hundreds of situations.](https://github.com/Uniswap/v3-core/blob/ed88be38ab2032d82bf10ac6f8d03aa631889d48/test/__snapshots__/UniswapV3Pool.gas.spec.ts.snap)

The code below, which we use in our development process, has been implemented in an NPM package for easy use in your project: [The Uniswap Gas Snapshot Test.](https://www.npmjs.com/package/@uniswap/snapshot-gas-cost)

<details>
<summary> The Gas Snapshot Test Code </summary>

```typescript
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/abstract-provider";
import { expect } from "./expect";
import { Contract, BigNumber, ContractTransaction } from "ethers";

export default async function snapshotGasCost(
  x:
    | TransactionResponse
    | Promise<TransactionResponse>
    | ContractTransaction
    | Promise<ContractTransaction>
    | TransactionReceipt
    | Promise<BigNumber>
    | BigNumber
    | Contract
    | Promise<Contract>
): Promise<void> {
  const resolved = await x;
  if ("deployTransaction" in resolved) {
    const receipt = await resolved.deployTransaction.wait();
    expect(receipt.gasUsed.toNumber()).toMatchSnapshot();
  } else if ("wait" in resolved) {
    const waited = await resolved.wait();
    expect(waited.gasUsed.toNumber()).toMatchSnapshot();
  } else if (BigNumber.isBigNumber(resolved)) {
    expect(resolved.toNumber()).toMatchSnapshot();
  }
}
```

</details>

This test allows us to see [every change](https://github.com/Uniswap/v3-core/pull/455/files#diff-9dd2638a0155da6d7dcf09f3866954da30e66e6a3569a6aa7794604e51ad030c) to the smart contracts - and surfaces the exact savings that the user would experience in a variety of situations. It’s essential to commit these snapshots to the repository so that future changes can be compared against the current gas costs of your smart contracts.

Now that the basics of the concepts are covered, how do you decide where to spend your time optimizing?

First, it’s important to understand what changes are relevant and what changes are not. A gas difference of 50 on a call that costs 100k gas is typically below the bar of relevance. However, several 50 gas optimizations, called multiple times per transaction, can add up to a 1% savings for a user action. The important thing here is the context: if you are saving 50 gas in a function that typically costs 1000 gas, you are saving 5% in that function. You should separate your code into function boundaries and measure at those boundaries. We do this with the many libraries in the Uniswap V3 codebase.

Context is also relevant for where to spend your time in a codebase. For example, we know the majority of users will interact with Uniswap via calls to swap. So we should focus our energy primarily on the swap function.

Sometimes optimization is less clear cut. In many cases, the code is strictly better after a change, whereas in others, certain scenarios become more expensive while making others less, e.g., mint is cheaper, but swap is more expensive. In order to understand whether to commit to a change, it’s important to understand how users will interact with a contract.

An extreme example of this is the lack of proxies in the Uniswap V3 codebase. Using a proxy could save millions of gas every time you create a V3 pool. However, users will interact with a particular pool on average over a thousand times over the lifetime of the contracts. Assuming $O(1M)$ [^1] gas and $O(1k)$ calls per contract, the proxy must have an overhead of less than $O(1M) / O(1K) = O(1K)$ gas. The overhead of a proxy, unfortunately, is more than that. A proxy contract means that an implementation address *and* a proxy address must be called to execute a swap. Calling a new address as part of a swap incurs an additional minimum $O(1K)$ gas. Interestingly, the Solidity optimizer ‘runs’ parameter does something like this: it optimizes your code such that the gas cost is minimized if you deployed and ran your contract `runs` times.

## In Practice: Storage Packing

When optimizing smart contracts, it’s important to identify areas of the code that are likely to yield the most significant returns (in terms of gas saved). To gain intuition about this, it’s important to take a step back and understand the fundamental constraints at play.

The most expensive operations on Ethereum (and most other L1 blockchains) typically involve storing and fetching data that must persist across transactions and blocks. The totality of this data is referred to as the blockchain’s *state*. If we zoom in to the subset of that state associated with a particular smart contract, we refer to it as the contract’s *storage*.

:::note Disk vs Memory
A quick aside: storing and retrieving state is so expensive because it must reside on [disk](https://en.wikipedia.org/wiki/Disk_storage), as it’s too large to fit in [memory](https://en.wikipedia.org/wiki/Random-access_memory). For more information on these types of tradeoffs in blockchain settings, see [The Limits to Blockchain Scalability](https://vitalik.eth.limo/general/2021/05/23/scaling.html).
:::

So, returning to optimization, it’s clear that one of our primary goals should be to minimize our contract’s use of storage, as this can lead to massive savings for end-users.

Now that we know what to focus on, it’s time to operationalize this insight. To do so, we’ll need to peek into the internals of the Ethereum Virtual Machine, or EVM for short. The EVM is the engine that processes transactions on Ethereum (similar to how your browser is the engine that renders websites you visit). It defines the rules governing what contracts can do, including how they use storage! One of these rules states that when contracts are writing to or reading from storage, they must do so in increments of 256 bits. Each 256-bit chunk is referred to as a [word](<https://en.wikipedia.org/wiki/Word_(computer_architecture)>).

Of course, it’s possible to store more than 256 bits of data per contract, but the given data will then span multiple words, each of which costs gas to update. To illustrate how one can accommodate these limitations, consider the case when we need to track multiple pieces of data, which are considerably smaller than 256 bits. For example, a boolean is a simple yes/no flag that can be stored in a single bit, and we may want to track several mutually independent booleans in our contract. If we can manage to pack the representations of these variables within the bounds of a single word, we can read and write to them in bulk - ensuring that we are only charged gas for using a single word of storage. This is probably the single-most important gas golfing technique, which we use widely at Uniswap.

In V3, seven (!) different variables are packed into a single word (also referred to as a slot):

```solidity
struct Slot0 {
	// the current price
	uint160 sqrtPriceX96;
	// the current tick
	int24 tick;
	// the most-recently updated index of the observations array
	uint16 observationIndex;
	// the current maximum number of observations that are being stored
	uint16 observationCardinality;
	// the next maximum number of observations to store, triggered in observations.write
	uint16 observationCardinalityNext;
	// the current protocol fee as a percentage of the swap fee taken on withdrawal
	// represented as an integer denominator (1/x)%
	uint8 feeProtocol;
	// whether the pool is locked
	bool unlocked;
}

Slot0 public slot0;
```

To verify that this is the case, we can simply add up the number of bits used by each variable. e.g., `uint160 sqrtPriceX96` uses 160 bits, `int24 tick` uses 24 bits, etc.

> $160 + 24 + 16 + 16 + 16 + 8 + 1 = 241$

This tells us we actually have 15 bits to spare! This contract stores many more variables, some of which take up entire slots on their own, but by carefully selecting the variables with compact representations and declaring them side-by-side, we’ve achieved our aim of gas optimization. By this point, it should be apparent that gas optimization is not just a matter of clever tricks and novel expressions of data; but also a matter of foundational decision-making made while designing the architecture of your smart contracts.

For a deeper look into slot packing in Solidity, a good place to start is the [Solidity Documentation](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

[^1] [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation)

</div>
