---
id: allocators
title: Allocators
sidebar_position: 4
---

# Allocators

Allocators are crucial infrastructure components in The Compact protocol that ensure resource lock integrity and prevent double-spending.

## Role and Responsibilities

Each resource lock is mediated by an allocator with four primary responsibilities:

1. **Preventing Double-Spending**: Ensuring sponsors don't commit the same tokens to multiple compacts or transfer away committed funds
2. **Validating Transfers**: Attesting to standard ERC6909 transfers of resource lock tokens
3. **Authorizing Claims**: Validating claims against resource locks
4. **Nonce Management**: Ensuring nonces are not reused for claims

## Registration

Allocators must be registered with The Compact before they can be assigned to locks.

### Registration Requirements

Anyone can register an allocator if one of three conditions is met:
- The caller is the allocator address being registered
- The allocator address contains code
- A proof is supplied representing valid create2 deployment parameters

### Registration Function

```solidity
function __registerAllocator(
    address allocator,
    bytes calldata proof
) external returns (uint96 allocatorId)
```

### Create2 Proof Format

When registering an allocator that doesn't yet exist but will be deployed via create2, provide an 85-byte proof:
```
0xff ++ factory ++ salt ++ initcode hash
```

This allows pre-registration of deterministic addresses.

## IAllocator Interface

All allocators must implement the `IAllocator` interface:

### attest Function

Called on standard ERC6909 transfers to validate them:

```solidity
function attest(
    address operator,
    address from,
    address to,
    uint256 id,
    uint256 amount
) external returns (bytes4)
```

**Requirements**:
- Must verify the transfer is safe
- Must return `IAllocator.attest.selector` on success

### authorizeClaim Function

Called by The Compact during claim processing for on-chain authorization:

```solidity
function authorizeClaim(
    bytes32 claimHash,
    address arbiter,
    address sponsor,
    uint256 nonce,
    uint256 expires,
    uint256[2][] calldata idsAndAmounts,
    bytes calldata allocatorData
) external returns (bytes4)
```

**Parameters**:
- `claimHash`: The hash of the claim being processed
- `arbiter`: The arbiter processing the claim
- `sponsor`: The sponsor of the compact
- `nonce`: The nonce for replay protection
- `expires`: Expiration timestamp
- `idsAndAmounts`: Array of [id, amount] pairs
- `allocatorData`: Custom data (e.g., signatures)

**Requirements**:
- Must return `IAllocator.authorizeClaim.selector` on success

### isClaimAuthorized Function

Off-chain view function to check if a claim would be authorized:

```solidity
function isClaimAuthorized(
    bytes32 claimHash,
    address arbiter,
    address sponsor,
    uint256 nonce,
    uint256 expires,
    uint256[2][] calldata idsAndAmounts,
    bytes calldata allocatorData
) external view returns (bool)
```

Should perform the same authorization checks as `authorizeClaim` but as a view function.

## Allocator Data

The `allocatorData` parameter allows allocators to implement custom authorization logic:

- Can contain signatures from off-chain systems
- May include merkle proofs or other authorization evidence
- The format is entirely defined by each allocator implementation

## Nonce Management

Allocators can directly consume nonces to invalidate compacts:

```solidity
function consume(uint256 nonce) external
```

This emits a `NonceConsumedDirectly` event and prevents any compact using that nonce from being claimed.

Check if a nonce has been consumed:
```solidity
function hasConsumedAllocatorNonce(
    address allocator,
    uint256 nonce
) external view returns (bool)
```

## Implementation Patterns

### On-chain Allocators

Purely on-chain allocators can:
- Track balances in contract storage
- Implement authorization logic directly
- Use on-chain randomness or oracles

### Hybrid Allocators

Combine on-chain and off-chain components:
- Off-chain tracking and signature generation
- On-chain signature verification
- Balance attestation via `allocatorData`

### Sample Implementations

Two basic sample implementations are available:

- **[Smallocator](https://github.com/uniswap/smallocator)**: A minimal implementation
- **[Autocator](https://github.com/uniswap/autocator)**: An automated allocator

## Trust Assumptions

### For Sponsors
- Allocators won't unduly censor valid requests against fully funded locks
- Sponsors can initiate forced withdrawals if allocators become unresponsive

### For Claimants
- Allocators are sound and won't allow resource locks to become underfunded
- Allocators will properly track and enforce balance constraints

## Events

```solidity
event AllocatorRegistered(
    uint96 allocatorId,
    address allocator
)

event NonceConsumedDirectly(
    address indexed allocator,
    uint256 nonce
)
```

## Error Handling

Common allocator-related errors:
- `InvalidAllocation(address allocator)`: Invalid allocator used
- `InvalidBatchAllocation()`: Batch allocation is invalid
- `InvalidRegistrationProof(address allocator)`: Registration proof is invalid
- `InconsistentAllocators()`: Allocators are inconsistent across batch operations
- `InvalidNonce(address account, uint256 nonce)`: Nonce is invalid or already consumed
