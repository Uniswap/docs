---
id: local-environment
title: Setting Up Your Local Environment
sidebar_position: 0.5
---

## Introduction

Swaps are the most common interaction with the Uniswap protocol. The swap examples are not production ready code, and are implemented in a simplistic manner for the purpose of learning.


## Setting up your environment

Create a new directory and navigate to it, and create a new node project with `npm init`

```
mkdir swap-example

cd swap-example

npm init
```

For this example, we'll use [Hardhat](https://hardhat.org/) to compile our contracts.

```
npm add --save-dev hardhat
```

now we can install the V3 Periphery contracts, so that we can inherit what we need from them to execute a swap.

```
npm add @uniswap/v3-periphery
```

now we cac create a new hardhat config file in our environment, which can help us configure the compilation and testing process for our contracts

```
npx hardhat
```

## setting hardhat solidity version

For this example, we'll need to change ./hardhat.config.js to include the appropriate solidity version for compiling the Uniswap V3 contracts.

```js
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
};
```

## Compiling our contract

We can compile our contracts with `npx hardhat compile`
