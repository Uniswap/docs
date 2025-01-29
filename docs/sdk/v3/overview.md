---
id: overview
sidebar_position: 1
title: Overview
---
# The Uniswap v3 SDK

> **Welcome to the v3 Uniswap SDK!**

The Uniswap v3 SDK provides abstractions to assist you with interacting with the Uniswap v3 smart contracts in a Typescript/Javascript environment (e.g. websites, node scripts). It makes uses of the [**Core SDK**](../core/overview.md) to gain access to abstractions that are common amongst the Uniswap SDKs. With the SDK, you can manipulate data that has been queried from the [EVM](https://ethereum.org/en/developers/docs/evm/) using libraries that assist with needs such as data modeling, protection from rounding errors, and compile time enforced typing.

To begin, we recommend looking at our [**Guides**](./guides/01-background.md) which include [runnable examples](https://github.com/Uniswap/examples/tree/main/v3-sdk) and walkthroughs of core usages. These guides will help you better understand how to use the SDK and integrate it into your application.

For complete documentation of the SDK's offerings, see the [**Technical Reference**](./reference/overview.md).

## Installation

To interact with the v3 SDK we recommend installing though npm:

```bash
npm i --save @uniswap/v3-sdk
npm i --save @uniswap/sdk-core
```

## Developer Links

- [**v3 SDK Github Repo**](https://github.com/Uniswap/v3-sdk)
- [**Core SDK Github Repo**](https://github.com/Uniswap/sdk-core)
- [**v3 SDK NPM Package**](https://www.npmjs.com/package/@uniswap/v3-sdk)

[![Unit Tests](https://github.com/Uniswap/uniswap-v3-sdk/workflows/Unit%20Tests/badge.svg)](https://github.com/Uniswap/uniswap-v3-sdk/actions?query=workflow%3A%22Unit+Tests%22)
[![Lint](https://github.com/Uniswap/uniswap-v3-sdk/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-v3-sdk/actions?query=workflow%3ALint)
[![npm version](https://img.shields.io/npm/v/@uniswap/v3-sdk/latest.svg)](https://www.npmjs.com/package/@uniswap/v3-sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@uniswap/v3-sdk/latest.svg)](https://bundlephobia.com/result?p=@uniswap/v3-sdk@latest)
[![Discord](https://img.shields.io/badge/discord-join%20chat-blue.svg)](https://discord.com/channels/597638925346930701/607978109089611786)
