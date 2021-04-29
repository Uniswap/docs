---
id: smart-contracts
title: Smart Contracts Overview
skug: /reference
---

Similar to Uniswap v2, Uniswap v3 is a binary smart contract system comprised of Core contracts and Periphery contracts. Core contracts provide fundamental safety guarantees for all parties interacting with Uniswap. For this reason, core contracts are intentional in scope - they define the logic around pools and assets. This design is intentional as it isolates the most sensitive contracts thus reducing the surface area for attack. Periphery contracts interact with one or more Core contracts but themselves are not part of the core.

## Core
[Source code](https://github.com/Uniswap/uniswap-v3-core)
The core consists of a singleton factory, many pools the factory creates, and a pool deployer. The major difference in pool logic in v3, is that a single asset pair can have multiple different pools because v3 allows for different fee tiers. The design decisions behind the Core contracts though remain the same. They are quite minimal, even brutalist. Again, the simple rationale for this is that contracts with a smaller surface area are easier to reason about, less bug-prone, and more functionally elegant. Perhaps the biggest upside of this design is that many desired properties of the system can be asserted directly in the code, leaving little room for error. One downside, however, is that core contracts are somewhat user-unfriendly. In fact, interacting directly with these contracts is not recommended for most use cases. Instead, a periphery contract should be used.


See [here](https://github.com/Uniswap/uniswap-v3-periphery/blob/main/testnet-deploys.md) for testnet addresses. 
The Mainnet address is _.

### Factory and Pools

The factory defines the logic for generating pools. In v3, a pool is defined by two tokens, which make up the asset pair, and a fee. There can be multiple different pools of the same asset pair, distiguished only by the fee tier. 

Developer Reference documentation for the [Factory](https://docs.uniswap.org/reference/UniswapV3Factory) and for the [Pools](https://docs.uniswap.org/reference/UniswapV3Pool).


## Periphery

The periphery is a constellation of smart contracts designed to support domain-specific interactions with the core. Because of Uniswap’s permissionless nature, the contracts described below have no special privileges, and are in fact only a small subset of the universe of possible periphery-like contracts. However, they are useful examples of how to safely and efficiently interact with Uniswap v3. In v3, Periphery handles logic that relies on core, but lives separately like libraries, LP position management, the router for swaps, and specific example contracts that will be helpful for developers.

Mainnet addresses for periphery are _.

### Libraries
The libraries provide a variety of helper functions developers may need, like calculating pool addresses, safe transfer functions, and more. 
The Developer Reference for libraries is here. (TODO)

### Nonfungible Position Manager
The position manager handles the logic for wrapping v3 positions in the ERC721 non-fungible token. It also handles creating, exiting, and adjusting positions in v3.

The Developer Reference for the Nonfungible Position Manager is here. (TODO)

### SwapRouter
The router, which uses the libraries, fully supports all the basic requirements of a front-end offering trading. It natively supports single trades (x to y) and multihop trades (e.g. x to y to z).

The Developer Reference for the SwapRouter is here. (TODO)

### Specific Example Contracts
Example contracts in periphery are smaller scoped contracts that will help build intuition for how to interact with Uniswap v3 contracts. 
The guides that walk through specific exmaple contracts are here. (TODO)






