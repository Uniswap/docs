---
id: Overview
title: Overview
sidebar_position: 1
---

# Introduction & Overview

## What is the Uniswap Liquidity Launchpad?

The Uniswap Liquidity Launchpad is a comprehensive framework for bootstrapping initial liquidity for Uniswap V4 pools through fair, transparent price discovery (see <a href='/whitepaper_cca.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a>). It combines three critical functions into a single, composable system:

1. **Price Discovery** - Run fair auctions using a novel Continuous Clearing Auction (CCA) mechanism to establish market price
2. **Liquidity Bootstrapping** - Automatically seed Uniswap V4 pools with auction proceeds at the discovered price
3. **Token Creation** (Optional) - Deploy new ERC-20 tokens with rich metadata and optional cross-chain capabilities

Unlike traditional approaches that rely on centralized market makers or expose participants to timing games and manipulation, the Uniswap Liquidity Launchpad provides a decentralized, mechanism-design-driven approach for establishing deep, sustainable liquidity from day one.


### Key Benefits

- **Fair Price Discovery** - Continuous clearing auctions eliminate timing games and establish credible market prices
- **Immediate Deep Liquidity** - Seamless transition from price discovery to active Uniswap V4 trading with substantial initial depth
- **Permissionless** - Anyone can bootstrap liquidity or participate in price discovery without gatekeepers
- **Transparent** - All parameters set upfront; real-time visibility into price discovery progress
- **Composable** - Modular architecture supports multiple auction formats and distribution strategies
- **Gas Efficient** - Optimized implementations using Permit2, multicall, and efficient data structures

## Core Components

The Uniswap Liquidity Launchpad framework is built on three coordinated components that work together to bootstrap liquidity:

1. **[Liquidity Launcher →](https://github.com/Uniswap/liquidity-launcher)** Central orchestration contract that coordinates distribution and liquidity deployment
2. **[Token Factory →](https://github.com/Uniswap/uerc20-factory)** (Optional) Creates new ERC-20 tokens with metadata, or integrates existing tokens
3. **Liquidity Strategies** - Modular contracts for different price discovery and liquidity mechanisms (prebuilt [LBP Strategy](https://github.com/Uniswap/liquidity-launcher) or [custom strategies](quickstarts/building.md))

Each component is designed to be composable and extensible, allowing you to customize your liquidity bootstrapping while maintaining security and fairness guarantees.

## High-Level Architecture

![Token Launcher Architecture](./images/TokenLauncherOverview.png)

### Typical Liquidity Bootstrapping Flow

The liquidity bootstrapping process follows a straightforward sequence from price discovery to active trading:

1. **Prepare Token** (Optional)

   Launch a new token using `LiquidityLauncher.createToken()` via the factory, which deploys a UERC20 or UERC20Superchain token and mints the initial supply to the launcher. Alternatively, use an existing token and approve the launcher to distribute it.

2. **Configure Liquidity Bootstrap**

   Set up your bootstrapping parameters:
   - **Auction parameters**: Supply release schedule, price floor, duration & timing, and graduation threshold
   - **Pool parameters**: Token split (max 50% to auction), fee tier & tick spacing, migration delay, and optional hooks

3. **Start Price Discovery**

   Call `LiquidityLauncher.distributeToken()` to allocate tokens to the LBP Strategy. This deploys a CCA auction with the allocated tokens, and price discovery begins as participants submit bids.

4. **Fair Price Discovery**

   As bids arrive, the auction continuously clears orders with automatic bid spreading, ensuring a uniform clearing price and real-time transparency for all participants. This establishes the fair market price for the token.

5. **Auction Completion**

   When the auction ends, the system checks if the graduation threshold was met. If graduated, the process proceeds to liquidity migration. If not, all bidders receive refunds.

6. **Liquidity Deployment**

   After the migration block delay, anyone can trigger `migrate()` to:
   - Initialize the Uniswap V4 pool at the discovered price
   - Deploy full-range liquidity using auction proceeds + reserve tokens
   - Deploy a one-sided position (if remaining tokens exist)
   - Mint the LP NFT to the position recipient

7. **Active Liquid Market**

   The pool is now live on Uniswap V4 with deep initial liquidity, making the token immediately tradable across the entire ecosystem with sustainable market depth.


## Next Steps

- Learn about the [Continous Clearing Auction](./05-auction-mechanism.md) mechanism
- Read the <a href='/whitepaper_cca.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> to learn more about the mechanism
- Dive into the repos below to see the code and start building

## Smart Contracts

| Contract | Description | Source | Mainnet Address | Unichain |
|----------|-------------|--------|-----------------|----------|
| **LiquidityLauncher** | Central orchestration contract | [liquidity-launcher](https://github.com/Uniswap/liquidity-launcher) | [0x00000008412db3394C91A5CbD01635c6d140637C](https://etherscan.io/address/0x00000008412db3394C91A5CbD01635c6d140637C) | Coming soon |
| **UERC20Factory** | Standard ERC-20 token factory | [uerc20-factory](https://github.com/Uniswap/uerc20-factory) | [0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5](https://etherscan.io/address/0x0cde87c11b959e5eb0924c1abf5250ee3f9bd1b5) | Coming soon |
| **LBPStrategyBasicFactory** | LBP strategy factory | [liquidity-launcher](https://github.com/Uniswap/liquidity-launcher) | [0x00000010F37b6524617b17e66796058412bbC487](https://etherscan.io/address/0x00000010F37b6524617b17e66796058412bbC487) | Coming soon |
| **ContinuousClearingAuction** | Continuous clearing auction factory | [continuous-clearing-auction](https://github.com/Uniswap/continuous-clearing-auction) |[0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D](https://etherscan.io/address/0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D) | Coming soon |
| **Permit2** | Token approval manager | [Uniswap](https://github.com/Uniswap/permit2) | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |
