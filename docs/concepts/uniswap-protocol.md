---
id: uniswap-protocol
title: The Uniswap Protocol
sidebar_position: 2
---


## Introduction

The Uniswap protocol is a peer-to-peer[^1] system designed for exchanging cryptocurrencies [(ERC-20 Tokens)](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) on the [Ethereum](https://ethereum.org/) blockchain. The protocol is implemented as a set of persistent, non-upgradable smart contracts; designed to prioritize censorship resistance, security, self-custody, and to function without any trusted intermediaries who may selectively restrict access.

There are currently four versions of the Uniswap protocol. [v1](/contracts/v1/overview) and [v2](/contracts/v2/overview) are open source and licensed under GPL. [v3](/contracts/v3/overview) introduced concentrated liquidity and is open source with slight modifications, which are viewable [here](https://github.com/Uniswap/uniswap-v3-core/blob/main/LICENSE). [v4](/contracts/v4/overview) introduces the singleton pool architecture and hooks system, enabling unprecedented protocol customization, and uses a dual license structure viewable [here](https://github.com/Uniswap/v4-core/tree/main/licenses). Each version of Uniswap, once deployed, will function in perpetuity, with 100% uptime, provided the continued existence of the Ethereum blockchain.

## How does the Uniswap protocol compare to a typical market?

To understand how the Uniswap protocol differs from a traditional exchange, it is helpful to first look at two subjects: how the Automated Market Maker design deviates from traditional central limit order book-based exchanges, and how permissionless systems depart from conventional permissioned systems.

### Order Book VS AMM

Most publicly accessible markets use a central limit [order book](https://www.investopedia.com/terms/o/order-book.asp) style of exchange, where buyers and sellers create orders organized by price level that are progressively filled as demand shifts. Anyone who has traded stocks through brokerage firms will be familiar with an order book system.

The Uniswap protocol takes a different approach, using an Automated Market Maker (AMM), sometimes referred to as a Constant Function Market Maker, in place of an order book. Through its evolution, the protocol has enhanced this model: [v3](/contracts/v3/overview) introduced concentrated liquidity for capital efficiency, and [v4](/contracts/v4/overview)'s singleton pool architecture and hooks system enable unprecedented customization of pool behavior while maintaining the core AMM principles.

At a very high level, an AMM replaces the buy and sell orders in an order book market with a liquidity pool of two assets, both valued relative to each other. As one asset is traded for the other, the relative prices of the two assets shift, and a new market rate for both is determined. In this dynamic, a buyer or seller trades directly with the pool, rather than with specific orders left by other parties. The advantages and disadvantages of Automated Market Makers versus their traditional order book counterparts are under active research by a growing number of parties. We have collected some notable examples on our [research page](./research.md).

### Permissionless Systems

The second departure from traditional markets is the permissionless and immutable design of the Uniswap protocol. These design decisions were inspired by Ethereum's core tenets, and our commitment to the ideals of permissionless access and immutability as indispensable components of a future in which anyone in the world can access financial services without fear of discrimination or counter-party risk.

Permissionless design means that the protocol's services are entirely open for public use, with no ability to selectively restrict who can or cannot use them. Anyone can swap, provide liquidity, or create new markets at will. This is a departure from traditional financial services, which typically restrict access based on geography, wealth status, and age.

The protocol is also immutable, in other words not upgradeable. No party is able to pause the contracts, reverse trade execution, or otherwise change the behavior of the protocol in any way. It is worth noting that Uniswap Governance has the right (but no obligation) to divert a percentage of swap fees on any pool to a specified address. However, this capability is known to all participants in advance, and to prevent abuse, the percentage is constrained between 10% and 25%.

## Where can I find more information

For research into the economics of AMMs, game theory, or optimization research, check out our [research](./research.md) page.

For features implemented in v3 that expand and refine the AMM design, see the [v3 Concepts](./protocol/concentrated-liquidity.md) page.

For the latest innovations in v4, including singleton pools and hooks, see the [v4 Concepts](./protocol/hooks.md) page.

[^1]: Ethereum protocols are sometimes referred to as peer-to-contract systems as well. These are similar to a peer-to-peer systems, but with immutable, persistent programs known as smart contracts taking the place of a peer.
