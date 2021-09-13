---
id: local-environment
title: Set up your local environment
sidebar_position: 0.5
---

To try out the example Uniswap V3 smart contracts in our guides, complete the steps in this article to set up your local environment.


## Create a Node.js project

Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Create a new directory and navigate to it, and create a new node project with `npm init`

```
mkdir swap-example

cd swap-example

npm init
```

## Install Hardhat and the Periphery contracts

For this example, we'll use [Hardhat](https://hardhat.org/) to compile our contracts.

```
npm add --save-dev hardhat
```

now we can install the V3 Periphery contracts, so that we can inherit what we need from them to execute a swap.

```
npm add @uniswap/v3-periphery
```

now we can create a new hardhat config file in our environment, which can help us configure the compilation and testing process for our contracts

```
npx hardhat
```

## Set the Solidity version for Hardhat

For this example, we'll need to change ./hardhat.config.js to include the appropriate solidity version for compiling the Uniswap V3 contracts.

```js
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
};
```

## Compile a contract

We can compile our contracts with `npx hardhat compile`
