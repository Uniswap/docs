---
id: resources
title: Resources
sidebar_position: 3
---

## Core Contracts

The foundation of The Compact protocol - an ERC6909-based system for reusable resource locks.

- **[TheCompact](https://github.com/Uniswap/the-compact)** - Main protocol implementation
- **[ITheCompact Interface](https://github.com/Uniswap/the-compact/blob/main/src/interfaces/ITheCompact.sol)** - Core interface definition
- **[ITheCompactClaims Interface](https://github.com/Uniswap/the-compact/blob/main/src/interfaces/ITheCompactClaims.sol)** - Claims interface
- **[License](https://github.com/Uniswap/the-compact/blob/main/LICENSE.md)** - MIT

## Peripheral Contracts

:::warning DEVELOPER WARNING
 These repositories are under development and are intended to serve as reference implementations for understanding peripheral contract functionality within The Compact. These are for testing/reference purposes only - do not use these contracts in production environments.
:::
### Reference Allocators

#### Smart Contract Allocators
**[Repository](https://github.com/Uniswap/sc-allocators)**

Various example allocator implementations for use with The Compact. Allocators co-sign or authorize claims against sponsors' locked balances, prevent under-allocation, and in the case of the HybridERC7683 implementation, broadcast cross-chain orders using ERC-7683. Some allocators also rely on Uniswap Tribunal. The provided examples include both fully on-chain and hybrid (on-chain + off-chain) allocators.

#### Smallocator (Off-chain)
**[Repository](https://github.com/uniswap/smallocator)**

A minimalistic server-based allocator for The Compact. Smallocator provides an API for sponsors to request resource lock allocations across multiple blockchains, with support for EIP-4361 session authentication and signing EIP-712 Compact messages. It also includes a frontend application for interacting directly with the server that also facilitates making deposits into resource locks it oversees.

#### Autocator (Off-chain)
**[Repository](https://github.com/uniswap/autocator)**

A server-based allocator for The Compact that leverages protocol signatures and transactions for authentication. Autocator provides an API for requesting resource lock allocations across multiple blockchains by providing the details of associated compacts with accompanying sponsor signatures or onchain registrations. It also includes a frontend application for interacting directly with the server that also facilitates making deposits into resource locks it oversees.

### Supporting Infrastructure

#### Emissary
**[Repository](https://github.com/Uniswap/emissary)**

An on-chain signature authority delegation registry with support for secp256k1 and P256 keys (both HSM and WebAuthn formats). Designed for use as a fallback signature validation mechanism.

#### Tribunal
**[Repository](https://github.com/Uniswap/Tribunal)**

Tribunal is an illustration for how processing cross-chain swap settlements against PGA (priority gas auction) blockchains. It ensures that tokens are transferred according to the mandate specified by the originating sponsor and enforces that a single party is able to perform the settlement in the event of a dispute.

#### Arbiters
**[Repository](http://github.com/Uniswap/arbiters)**

A repository for developing arbiter implementations that leverage The Compact for performing cross-chain swaps.