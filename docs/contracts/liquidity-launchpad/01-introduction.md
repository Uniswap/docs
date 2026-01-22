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

Unlike traditional approaches that rely on centralized market makers or expose participants to timing games and manipulation, the Uniswap Liquidity Launchpad provides an open mechanism for boostrapping deep liquidity on decentralized exchanges.

The system is composable - it is not limited to the intial set of implementation contracts. Other auction and LBPStrategy implementations are welcome!

### Key Benefits

- **Fair Price Discovery** - Continuous clearing auctions eliminate timing games and establish credible market prices
- **Immediate Deep Liquidity** - Seamless transition from price discovery to active Uniswap V4 trading with substantial initial depth
- **Permissionless** - Anyone can bootstrap liquidity or participate in price discovery without gatekeepers
- **Transparent** - All parameters are immutable after they are set
- **Composable** - Modular architecture supports multiple auction formats and distribution strategies

## Components

The Uniswap Liquidity Launchpad framework is built on three coordinated components that work together to bootstrap liquidity:

1. **[Liquidity Launcher →](https://github.com/Uniswap/liquidity-launcher)** Central orchestration contract that coordinates distribution and liquidity deployment
2. **[Token Factory →](https://github.com/Uniswap/uerc20-factory)** (Optional) Creates new ERC-20 tokens with metadata, or integrates existing tokens
3. **Liquidity Strategies** - Modular contracts for different price discovery and liquidity mechanisms (prebuilt [LBP Strategy](https://github.com/Uniswap/liquidity-launcher) or [custom strategies](./05-strategies.md#writing-a-custom-strategy))

Each component is designed to be composable and extensible, allowing you to customize your liquidity bootstrapping while maintaining security and fairness guarantees.

## High-Level Architecture

![Token Launcher Architecture](./images/TokenLauncherOverview.png)

### Example Flow

The following is a high level overview of how the provided [LBP Strategy](https://github.com/Uniswap/liquidity-launcher) contracts interface and work with the [Continuous Clearing Auction](https://github.com/Uniswap/continuous-clearing-auction/).

The following actions must be performed atomically in one transaction. `LiquidityLauncher` supports native multicall which is highly recommended.

1. **Prepare Token** (Optional)

   Launch a new token using `LiquidityLauncher.createToken()` via the [UERC20Factory](https://github.com/Uniswap/liquidity-launcher/blob/96860d8239785e717cff1e4189643b9acee925ff/src/token-factories/uerc20-factory), which deploys a UERC20 or UERC20Superchain token and mints the initial supply to the launcher. Alternatively, use an existing token and approve the launcher to transfer it via Permit2.

2. **Deploy Strategies**

   Call `LiquidityLauncher.distributeToken()` to deploy a new LBPStrategy instance via factory. The strategy will validate that the auction parameters and eventual pool configuration are valid, and if so, it will deploy a CCA auction with the desired amount of tokens to sell. The `LiquidityLauncher` contract will transfer tokens to the LBPStrategy and then they will be transferred into the auction. 

   We use an optimistic transfer then call pattern throughout the contracts to trigger an action after performing an ERC20 transfer. 

3. **Auction Completion**

   When the auction ends, all of the raised funds will be swept to a specified `fundsRecipient`. The LBPStrategy will ensure that it is the recipient of both the raised funds and any leftover unsold tokens. The configured `initializer` on the LBPStrategy must implement the `ILBPInitializer` interface to return the necessary data for the pool migration and liquidity creation.

   ```solidity
   // from: https://github.com/Uniswap/liquidity-launcher/blob/main/src/interfaces/ILBPInitializer.sol
   struct LBPInitializationParams {
      uint256 initialPriceX96; // the price discovered by the contract
      uint256 tokensSold; // the number of tokens sold by the contract
      uint256 currencyRaised; // the amount of currency raised by the contract
   }

   interface ILBPInitializer {
      function lbpInitializationParams() external view returns (LBPInitializationParams memory params);
   }
   ```

4. **Migrating Liquidity**

   Anyone can call the `migrate()` function on the `LBPStrategy` after the configured `migrationBlock`. This does the following:
   - Initialize a new Uniswap V4 pool at the price from the auction
   - Deploy a full-range LP position using the auction proceeds + reserved tokens
   - (Optionally) deploy a one-sided position with remaining tokens
   - Mint the NFT for the LP position to the a specified `positionRecipient`
   - Sweep any leftover tokens or raised funds to a configured `operator` 

5. **After Migration**

   The pool will be live on Uniswap V4 with deep liquidity around the discovered price. Participants in the auction can claim their purchased tokens on the auction after `claimBlock`, and these instances of the LBPStrategy + Auction contracts should hold no funds after all bids are withdrawn and all actions performed.

## Next Steps

- Learn about the [Continous Clearing Auction](./04-auction-mechanism.md) mechanism
- Read the <a href='/whitepaper_cca.pdf' target='_blank' rel='noopener noreferrer'>whitepaper</a> to learn more about the mechanism
- Review the Continuous Clearing Auction [Technical Reference](https://github.com/Uniswap/continuous-clearing-auction/blob/main/docs/TechnicalDocumentation.md)