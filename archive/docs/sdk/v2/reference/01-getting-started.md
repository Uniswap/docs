---
id: getting-started
title: Getting Started
---

The pages that follow contain technical reference information on the Uniswap SDK.
Looking for a [quick start](../guides/quick-start) instead?
You may also want to jump into a [guide](../guides/fetching-data),
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

The Fractions class, among others that the V2 SDK depends on, are exported from the SDK Core to allow interoperability with the V3 SDK. 
Refer to the [Core SDK section of the docs](../../core/overview.md) to learn more about these classes.

The SDK works for all chains on which the [factory](../../../contracts/v2/reference/smart-contracts/factory#address) is deployed.

## Code

The [source code is available on GitHub](https://github.com/Uniswap/uniswap-sdk).

## Dependencies

The SDK installs a small number of dependencies(https://github.com/Uniswap/v2-sdk/blob/main/package.json#L24).
The most important dependency of the V2 SDK is the SDK core, which was previously part of the V2 SDK itself, but later released as its own package to avoid duplicate code between the V2 and V3 SDK.
