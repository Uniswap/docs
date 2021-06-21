---
id: 01-getting-started
title: Getting Started
tags: sdk, documentation
---

The pages that follow contain technical reference information on the Uniswap SDK.
Looking for a <Link to='/docs/v2/javascript-SDK/quick-start'>quickstart</Link> instead? 
You may also want to jump into a <Link to='/docs/v2/javascript-SDK/fetching-data'>guide</Link>, 
which offers a friendlier introduction to the SDK!

The SDK is written in TypeScript, has a robust test suite, performs arbitrary precision arithmetic, 
and supports rounding to significant digits or fixed decimal places. 
The principal exports of the SDK are _entities_: classes that contain initialization and validation checks, 
necessary data fields, and helper functions.

An important concept in the SDK is _fractions_. Because Solidity performs integer math, care must be taken in 
non-EVM environments to faithfully replicate the actual computation carried out on-chain. 
The first concern here is to ensure that an overflow-safe integer implementation is used. 
Ideally, the SDK would be able to use native [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)s. 
However, until support becomes more widespread, [JSBI](https://github.com/GoogleChromeLabs/jsbi) objects are used instead, 
with the idea that once BigInts proliferate, this dependency can be compiled away. 
The second concern is precision loss due to, for example, chained price ratio calculations. 
To address this issue, all math operations are performed as fraction operations, ensuring arbitrary precision up 
until the point that values are rounded for display purposes, or truncated to fit inside a fixed bit width.

The SDK works for all chains on which the <Link to='/docs/v2/smart-contracts/factory#address'>factory</Link> is deployed.

## Code

The [source code is available on GitHub](https://github.com/Uniswap/uniswap-sdk).

## Dependencies

The SDK declares its dependencies as [peer dependencies](https://github.com/Uniswap/uniswap-sdk/blob/v2/package.json#L33).
This is for two reasons:

 - prevent installation of unused dependencies (e.g. `@ethersproject/providers` and `@ethersproject/contracts`, only used in [`Fetcher`](/docs/v2/SDK/fetcher))
 - prevent duplicate `@ethersproject` dependencies with conflicting versions

However, this means you must install these dependencies alongside the SDK, if you do not already have them installed.