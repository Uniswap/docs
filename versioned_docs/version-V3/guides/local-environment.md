---
id: local-environment
title: Set up your local environment
sidebar_position: 0.5
---

This guide describes how to set up your environment using a specific toolset: `Node.js` + `npm` + `hardhat`. It also shows you how to install the Uniswap V3 Periphery contracts, which are required for the contract examples in the Uniswap Docs V3 guides. 


## Create a Node.js project

1. Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Create a new directory and navigate to it. Also, create a new node project with `npm init`.

   ```
   $ mkdir swap-example
   $ cd swap-example
   $ npm init
   ```

## Install Hardhat and the Periphery contracts

1. Install [Hardhat](https://hardhat.org/), which you can use for compiling contracts.

   ```
   $ npm add --save-dev hardhat
   ```

2. Install the V3 Periphery contracts so that you can inherit what you need from them to execute contracts.

   ```
   $ npm add @uniswap/v3-periphery
   ```

3. Create a new hardhat config file, which you can use for compiling and testing contracts.

   ```
   $ npx hardhat
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

To compile a contract, use `npx hardhat compile`.
