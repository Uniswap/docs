---
id: 01-getting-started
title: Getting Started
---

The [Uniswap SDK](https://github.com/Uniswap/uniswap-sdk/tree/v1) is meant to simplify every aspect of integrating Uniswap into your project. It's written in [TypeScript](https://www.typescriptlang.org), has a [robust test suite](https://github.com/Uniswap/uniswap-sdk/tree/v1/src/__tests__), uses [bignumber.js](https://github.com/MikeMcl/bignumber.js) for math, and includes an optional data-fetching module which relies on [ethers.js](https://github.com/ethers-io/ethers.js/).

The SDK was built to be extremely easy to use, but also feature-rich. It offers various levels of abstraction that make it suitable for use nearly anywhere, from hackathon projects to production applications.

# Overview

The SDK is divided into several modular components that perform tightly scoped tasks:

- <Link to='/docs/v1/SDK/data'>Data</Link> - Fetches Uniswap data from the blockchain
- <Link to='/docs/v1/SDK/computation'>Computation</Link> - Computes market- and trade-specific statistics using blockchain data
- <Link to='/docs/v1/SDK/format'>Format</Link> - Formats data for display
- <Link to='/docs/v1/SDK/orchestration'>Orchestration</Link> - Offers named abstraction functions that seamlessly combine lower-level data- and computation-related functions
- <Link to='/docs/v1/SDK/transact'>Transact</Link> - Prepares computed trades for execution against Uniswap smart contracts
- <Link to='/docs/v1/SDK/constants'>Constants</Link> - Exports various helpful constants for use throughout the SDK

Additionally, it exports a number of custom types:

- <Link to='/docs/v1/SDK/types'>Types</Link> - Exports all types used by the SDK

# Installation

To start using the SDK, simply install it into your project...

```bash
yarn add @uniswap/sdk
```

...import some functions...

```javascript
import { ... } from '@uniswap/sdk'
```

...and dive into the rest of the documentation to learn more!
