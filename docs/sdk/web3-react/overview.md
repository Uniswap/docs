---
id: overview
sidebar_position: 1
title: Overview
---
# `web3-react`

> **Welcome to `web3-react`!**

`web3-react` provides abstractions to assist you with connecting your dApp to web3 connectors and exposes methods to interact with those connections. It currently supports connecting to the following wallets:
- Network
- Injected wallets (eg MetaMask)
- Gnosis safe
- Coinbase wallet
- WalletConnect wallet

To begin, we recommend looking at our [guides](./guides/01-setting-up.md) which include [runnable examples](https://github.com/Uniswap/examples/tree/main/web3-react) and walkthroughs of core usages. These guides will help you better understand how to use `web3-react` and integrate it into your application.

:::info
This guide uses `web3-react` version 8, which is a beta version.
:::

## Installation

`web3-react` consists of many packages, each providing different functionalities. The [core](https://www.npmjs.com/package/@web3-react/core) package exposes the methods used to interact with web3 connectors, the [types](https://www.npmjs.com/package/@web3-react/types) package declares useful types, while the others are installed to enable interactions with different connectors.

To interact with `web3-react` we recommend installing though npm:

```bash
npm install --save @web3-react/core
```

or yarn:

```bash
yarn add @web3-react/core
```

## Developer Links

- [**`web3-react` on GitHub**](https://github.com/Uniswap/web3-react)

[![npm version](https://img.shields.io/npm/v/@web3-react/core/latest.svg)](https://www.npmjs.com/package/@web3-react/core/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@web3-react/core/latest.svg)](https://bundlephobia.com/result?p=@web3-react/core@latest)
[![Discord](https://img.shields.io/badge/discord-join%20chat-blue.svg)](https://discord.com/channels/597638925346930701/607978109089611786)
