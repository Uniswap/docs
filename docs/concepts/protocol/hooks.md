---
id: hooks
title: Hooks
sidebar_position: 1
---

## Introduction

Uniswap v4 inherits all of the capital efficiency gains of Uniswap v3 while introducing major architectural improvements. 

The key innovations are the Hook System and Singleton Architecture, which together enable unprecedented protocol customization and gas optimization.

## Hooks

Hooks allow developers to customize and extend the behavior of liquidity pools. They are external smart contracts that can be attached to individual pools to intercept and modify the execution flow at specific points during pool-related actions.

The logic is executed before and/or after major operations such as pool creation, liquidity addition and removal, swapping, and donations.

Through these hook functions, developers can build sophisticated features like custom AMMs with different pricing curves, yield farming protocols, advanced trading features including limit orders, dynamic fee strategies, and custom oracle implementations. Each pool can have one hook (though a hook can serve multiple pools), hooks are optional and specified during pool creation, and developers can implement any combination of hook functions based on their needs.

## Singleton Architecture

The hook system in v4 is built on top of a revolutionary architectural change known as the singleton design. Unlike previous versions where each pool was a separate smart contract, v4 manages all pools through a single contract called the [PoolManager](/contracts/v4/concepts/PoolManager). This architectural innovation brings several key improvements:

- **Efficient Pool Creation**: Pools are created as state updates rather than contract deployments, significantly reducing gas costs
- **Gas Optimization**: Multi-hop swaps and complex operations are streamlined through a single contract
- **Flash Accounting**: Token balances are tracked internally and settled at the end of transactions, minimizing transfers
- **Native ETH Support**: Direct ETH trading without the need to wrap to WETH, improving user experience

These core features are just the beginning of what's possible with Uniswap v4. 

To explore all features including flash accounting, native ETH support, dynamic fees, and custom accounting, check out the [v4 whitepaper](https://uniswap.org/whitepaper-v4.pdf). 

For technical implementations and detailed guides, visit the [v4 technical documentation](/contracts/v4/concepts/overview).