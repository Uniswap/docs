---
id: overview
title: Overview
sidebar_position: 1
---

# The Compact

The Compact is an ownerless ERC6909 contract that facilitates the voluntary formation and mediation of reusable **resource locks**. It enables tokens to be credibly committed to be spent in exchange for performing actions across arbitrary, asynchronous environments, and claimed once the specified conditions have been met.

## Key Components

### Resource Locks
Resource locks are created when depositors place tokens (ERC20 or native) into The Compact. Each lock is represented by an ERC6909 token with four key properties:
- The underlying token
- The allocator (prevents double-spending)
- The scope (single-chain or multichain)
- The reset period (for forced withdrawals)

### Compacts
A compact is a commitment created by a resource lock owner (sponsor) that allows tokens to be claimed under specified conditions. Compacts use EIP-712 typed structured data for signatures and can be:
- **Single**: One resource lock on one chain
- **Batch**: Multiple resource locks on one chain
- **Multichain**: Resource locks across multiple chains

### Key Actors

- **Sponsors**: Deposit tokens and create compacts
- **Allocators**: Prevent double-spending and validate transfers
- **Arbiters**: Verify conditions and process claims
- **Claimants**: Fulfill conditions and receive tokens
- **Emissaries**: Provide fallback signature verification

## How It Works

1. **Deposit**: Sponsors deposit tokens to create resource locks (ERC6909 tokens)
2. **Create Compact**: Sponsors sign or register compacts specifying conditions
3. **Fulfill**: Claimants meet the specified conditions
4. **Claim**: Arbiters verify and process claims to transfer tokens

## Trust Model

The Compact operates on a trust-minimized model where:
- Sponsors trust allocators won't censor valid requests (but can force withdraw if needed).
- Sponsors trust arbiters will only process valid claims.
- Claimants trust allocators will maintain lock integrity.
- Claimants trust arbiters will process valid claims.

The Compact V1 has undergone two independent security reviews by [OpenZeppelin](https://openzeppelin.com) and [Spearbit Cantina](https://cantina.xyz).

## Deployments

The Compact is deployed at the same address across multiple chains:

| Network | Address | 
|---------|---------|
| Ethereum Mainnet | `0x00000000000018DF021Ff2467dF97ff846E09f48` |
| Base | `0x00000000000018DF021Ff2467dF97ff846E09f48` |
| Unichain | `0x00000000000018DF021Ff2467dF97ff846E09f48` |

> The Compact uses a deterministic deployment address, ensuring the same address across all supported networks.

The Compact uses a permissionless deployment process. Anyone can deploy the protocol to a new EVM chain by submitting a transaction with the same `to` and `data` arguments. This ensures the same deterministic address across all chains and enables the creation of compacts that commit resource locks across multiple chains.

## Resources

- [GitHub Repository](https://github.com/Uniswap/the-compact)
- [ITheCompact Interface](https://github.com/Uniswap/the-compact/blob/main/src/interfaces/ITheCompact.sol)
- [ITheCompactClaims Interface](https://github.com/Uniswap/the-compact/blob/main/src/interfaces/ITheCompactClaims.sol)
- [Sample Allocator: Smallocator](https://github.com/uniswap/smallocator)
- [Sample Allocator: Autocator](https://github.com/uniswap/autocator)
- [License](https://github.com/Uniswap/the-compact/blob/main/LICENSE.md) (MIT)
