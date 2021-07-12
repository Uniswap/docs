---
id: quick-start
title: Smart Contract Quick start
tags: smart contract integration, documentation, quick start
---

Developing smart contracts for Ethereum involves a bevy of off-chain tools used for producing and testing bytecode
that runs on the [Ethereum Virtual Machine (EVM)](<https://eth.wiki/en/concepts/evm/ethereum-virtual-machine-(evm)-awesome-list>).
Some tools also include workflows for deploying this bytecode to the Ethereum network and testnets.
There are many options for these tools. This guide walks you through writing and testing a simple smart contract that
interacts with the Uniswap Protocol using one specific set of tools (`truffle` + `npm` + `mocha`).

## Requirements

To follow this guide, you must have the following installed:

- [nodejs >= v12.x & npm >= 6.x](https://nodejs.org/en/)

## Bootstrapping a project

You can start from scratch, but it's easier to use a tool like `truffle` to bootstrap an empty project.
Create an empty directory and run `npx truffle init` inside that directory to unbox the default
[Truffle box](https://www.trufflesuite.com/boxes).

```shell script
mkdir demo
cd demo
npx truffle init
```

## Setting up npm

In order to reference the Uniswap V2 contracts, you should use the npm artifacts we deploy containing the core and
periphery smart contracts and interfaces. To add npm dependencies, we first initialize the npm package.
We can run `npm init` in the same directory to create a `package.json` file. You can accept all the defaults and
change it later.

```shell script
npm init
```

## Adding dependencies

Now that we have an npm package, we can add our dependencies. Let's add both the
[`@uniswap/v2-core`](https://www.npmjs.com/package/@uniswap/v2-core) and
[`@uniswap/v2-periphery`](https://www.npmjs.com/package/@uniswap/v2-periphery) packages.

```shell script
npm i --save @uniswap/v2-core
npm i --save @uniswap/v2-periphery
```

If you check the `node_modules/@uniswap` directory, you can now find the Uniswap V2 contracts.

```shell script
moody@MacBook-Pro ~/I/u/demo> ls node_modules/@uniswap/v2-core/contracts
UniswapV2ERC20.sol    UniswapV2Pair.sol     libraries/
UniswapV2Factory.sol  interfaces/           test/
moody@MacBook-Pro ~/I/u/demo> ls node_modules/@uniswap/v2-periphery/contracts/
UniswapV2Migrator.sol  examples/              test/
UniswapV2Router01.sol  interfaces/
UniswapV2Router02.sol  libraries/
```

These packages include both the smart contract source code and the build artifacts.

## Writing our contract

We can now get started writing our example contract.
For writing Solidity, we recommend IntelliJ or VSCode with a solidity plugin, but you can use any text editor.
Let's write a contract that returns the value of some amount of liquidity shares for a given token pair.
First create a couple of files:

```shell script
mkdir contracts/interfaces
touch contracts/interfaces/ILiquidityValueCalculator.sol
touch contracts/LiquidityValueCalculator.sol
```

This will be the interface of the contract we implement. Put it in `contracts/interfaces/ILiquidityValueCalculator.sol`.

```solidity
pragma solidity ^0.6.6;

interface ILiquidityValueCalculator {
    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external returns (uint tokenAAmount, uint tokenBAmount);
}
```

Now let's start with the constructor. You need to know where the `UniswapV2Factory` is deployed in order to compute the
address of the pair and look up the total supply of liquidity shares, plus the amounts for the reserves.
We can store this as an address passed to the constructor.

The factory address is constant on mainnet and all testnets, so it may be tempting to make this value a constant in your contract,
but since we need to unit test the contract it should be an argument. You can use solidity immutables to save on gas
when accessing this variable.

```solidity
pragma solidity ^0.6.6;

import './interfaces/ILiquidityValueCalculator.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    constructor(address factory_) public {
        factory = factory_;
    }
}
```

Now we need to be able to look up the total supply of liquidity for a pair, and its token balances.
Let's put this in a separate function. To implement it, we must:

1. Look up the pair address
2. Get the reserves of the pair
3. Get the total supply of the pair liquidity
4. Sort the reserves in the order of tokenA, tokenB

The [`UniswapV2Library`](../../reference/smart-contracts/library) has some helpful methods for this.

```solidity
pragma solidity ^0.6.6;

import './interfaces/ILiquidityValueCalculator.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
        totalSupply = pair.totalSupply();
        (uint reserves0, uint reserves1,) = pair.getReserves();
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
    }
}
```

Finally we just need to compute the share value. We will leave that as an exercise to the reader.

```solidity
pragma solidity ^0.6.6;

import './interfaces/ILiquidityValueCalculator.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    constructor(address factory_) public {
        factory = factory_;
    }

    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
        totalSupply = pair.totalSupply();
        (uint reserves0, uint reserves1,) = pair.getReserves();
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
    }

    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external override returns (uint tokenAAmount, uint tokenBAmount) {
        revert('TODO');
    }
}
```

## Writing tests

In order to test your contract, you need to:

1. Bring up a testnet
2. Deploy the `UniswapV2Factory`
3. Deploy at least 2 ERC20 tokens for a pair
4. Create a pair for the factory
5. Deploy your `LiquidityValueCalculator` contract
6. Call `LiquidityValueCalculator#computeLiquidityShareValue`
7. Verify the result with an assertion

\#1 is handled for you automatically by the `truffle test` command.

Note you should only deploy the precompiled Uniswap contracts in the `build` directories for unit tests.
This is because solidity appends a metadata hash to compiled contract artifacts which includes the hash of the contract
source code path, and compilations on other machines will not result in the exact same bytecode.
This is problematic because in Uniswap V2 we use the hash of the bytecode in the v2-periphery
[`UniswapV2Library`](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L24),
to compute the pair address.

To get the bytecode for deploying UniswapV2Factory, you can import the file via:

```javascript
const UniswapV2FactoryBytecode =
  require("@uniswap/v2-core/build/UniswapV2Factory.json").bytecode;
```

We recommend using a standard ERC20 from `@openzeppelin/contracts` for deploying an ERC20.

You can read more about deploying contracts and writing tests using Truffle
[here](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript).

## Compiling and deploying the contract

Learn more about compiling and deploying contracts using Truffle
[here](https://www.trufflesuite.com/docs/truffle/getting-started/compiling-contracts) and
[here](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations) respectively.

## WIP

This guide is a WIP. Please contribute to this guide with the edit button below!
