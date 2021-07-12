---
id: smart-contracts
title: Smart Contracts Overview
skug: /reference
sidebar_position: 1
---

Uniswap V3 is a binary smart contract system comprised of many libraries, which together make the Core and Periphery

Core contracts provide fundamental safety guarantees for all parties interacting with Uniswap. They define the logic of pool generation, the pools themselves, and the interactions involving the respective assets therein.

Periphery contracts interact with one or more Core contracts but are not part of the core. They are designed to provide methods of interacting with the core that increase clarity and user safety.

External calls will primarily call the periphery interfaces. Externally available functions are all viewable in the reference documentation. Internal functions are viewable on the Uniswap V3 Github repo.

## Core

> [**Core Source Code**](https://github.com/Uniswap/uniswap-v3-core)

The core consists of a single factory, a pool deployer, and the many pools the factory will create.

A significant amount of care and attention has been given to gas optimization in the core contracts. The result is a substantial reduction in gas costs for all protocol interactions compared to V2, at the cost of a reduction in code clarity.

### Factory

> [**Factory Reference**](https://docs.uniswap.org/reference/core/UniswapV3Factory)

The factory defines the logic for generating pools. A pool is defined by two tokens, which make up the asset pair, and a fee. There can be multiple pools of the same asset pair, distinguished only by their swap fee.

### Pools

> [**Pool Reference**](https://docs.uniswap.org/reference/core/UniswapV3Pool).

Pools primarily serve as automated market makers for the paired assets. Additionally, they expose price oracle data and may be used as an asset source for flash transactions.

## Periphery

The periphery is a constellation of smart contracts designed to support domain-specific interactions with the core. As the Uniswap protocol is a permissionless system, the contracts described below have no special privileges and are only a small subset of possible periphery-like contracts.

### SwapRouter

> [**Swap Router Reference**](https://docs.uniswap.org/reference/periphery/SwapRouter)

> [**Swap Router Interface**](https://docs.uniswap.org/reference/periphery/interfaces/ISwapRouter)

The swap router supports all the basic requirements of a front-end offering trading. It natively supports single trades (x to y) and multihop trades (e.g. x to y to z).

### Nonfungible Position Manager

> [**Nonfungible Position Manager Reference**](https://docs.uniswap.org/reference/periphery/NonfungiblePositionManager)

> [**Nonfungible Position Manager Interface**](https://docs.uniswap.org/reference/periphery/interfaces/INonfungiblePositionManager)

The position manager handles the logic transactions involving the creation, adjustment, or exiting of positions.

### Oracle

> [**Oracle Reference**](https://docs.uniswap.org/reference/core/libraries/Oracle)

The oracle provides price and liquidity data useful for a wide variety of system designs, and is available in every deployed pool.

### Periphery Libraries

> [**Periphery Libraries**](https://docs.uniswap.org/reference/periphery/libraries/Base64)

The libraries provide a variety of helper functions developers may need, like calculating pool addresses, safe transfer functions, and more.
