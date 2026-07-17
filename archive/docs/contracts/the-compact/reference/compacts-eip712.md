---
id: compacts-eip712
title: Compacts & EIP-712
sidebar_position: 2
---

A **compact** is an agreement created by a sponsor that allows their locked resources to be claimed under specified conditions. The Compact protocol uses EIP-712 typed structured data for creating and verifying signatures for these agreements.

## Compact Types

### 1. Single Compact
For single resource lock operations on a single chain.

```solidity
struct Compact {
    address arbiter;    // The account tasked with verifying and submitting the claim
    address sponsor;    // The account to source the tokens from
    uint256 nonce;      // A parameter to enforce replay protection, scoped to allocator
    uint256 expires;    // The time at which the claim expires
    bytes12 lockTag;    // A tag representing the allocator, reset period, and scope
    address token;      // The locked token, or address(0) for native tokens
    uint256 amount;     // The amount of ERC6909 tokens to commit from the lock
    // (Optional) Witness data may follow:
    // Mandate mandate;
}
```

### 2. Batch Compact
For allocating multiple resource locks on a single chain.

```solidity
struct BatchCompact {
    address arbiter;            // The account tasked with verifying and submitting the claim
    address sponsor;            // The account to source the tokens from
    uint256 nonce;              // A parameter to enforce replay protection, scoped to allocator
    uint256 expires;            // The time at which the claim expires
    Lock[] commitments;         // The committed locks with lock tags, tokens, & amounts
    // (Optional) Witness data may follow:
    // Mandate mandate;
}

struct Lock {
    bytes12 lockTag;    // A tag representing the allocator, reset period, and scope
    address token;      // The locked token, or address(0) for native tokens
    uint256 amount;     // The maximum committed amount of tokens
}
```

### 3. Multichain Compact
For allocating one or more resource locks across multiple chains.

```solidity
struct MultichainCompact {
    address sponsor;     // The account to source the tokens from
    uint256 nonce;       // A parameter to enforce replay protection, scoped to allocator
    uint256 expires;     // The time at which the claim expires
    Element[] elements;  // Arbiter, chainId, commitments, and mandate for each chain
}

struct Element {
    address arbiter;            // The account tasked with verifying and submitting the claim
    uint256 chainId;            // The chainId where the tokens are located
    Lock[] commitments;         // The committed locks with lock tags, tokens, & amounts
    // Witness data MUST follow (mandatory for multichain compacts):
    Mandate mandate;
}
```

## Witness Structure

The witness mechanism (`Mandate` struct) allows extending compacts with additional data for specifying conditions or parameters for a claim.

### Format
The witness is always a `Mandate` struct appended to the compact:

```solidity
Compact(..., Mandate mandate)Mandate(uint256 myArg, bytes32 otherArg)
```

### Witness Typestring
The `witnessTypestring` provided during a claim should be the arguments *inside* the `Mandate` struct (e.g., `uint256 myArg,bytes32 otherArg`), followed by any nested structs.

### Nested Structs
EIP-712 requires nested structs to be ordered alphanumerically after the top-level struct in the typestring. Prefix nested structs with "Mandate" (e.g., `MandateCondition`) to ensure correct ordering.

Example witness typestring:
```
MandateCondition condition,uint256 arg)MandateCondition(bool flag,uint256 val
```

> ⚠️ **Important**: Do not include the closing parenthesis in your witness typestring. It will be added by the protocol during dynamic typestring construction.

## Permit2 Integration

The Compact supports integration with Permit2 for gasless deposits:

### CompactDeposit
For basic Permit2 deposits:
```solidity
CompactDeposit(bytes12 lockTag,address recipient)
```

### Activation
Combines deposits with single compact registration:
```solidity
Activation(address activator,uint256 id,Compact compact)Compact(...)Mandate(...)
```

### BatchActivation
Combines deposits with batch compact registration:
```solidity
BatchActivation(address activator,uint256[] ids,Compact compact)Compact(...)Mandate(...)
```

## CompactCategory Enum

Used to distinguish between different types of compacts when using Permit2 integration:

```solidity
enum CompactCategory {
    Compact,        // 0
    BatchCompact,   // 1
    MultichainCompact // 2
}
```

## Registration

As an alternative to signing EIP-712 payloads, compacts can be registered directly on The Compact contract:

### Register Functions
```solidity
// Register a single compact
function register(bytes32 claimHash, bytes32 typehash) external;

// Register multiple compacts
function registerMultiple(bytes32[] calldata claimHashes, bytes32[] calldata typehashes) external;

// Register on behalf of sponsor
function registerFor(
    address sponsor,
    bytes32 claimHash,
    bytes32 typehash,
    bytes memory sponsorSignature
) external;
```

### Registration Event

When a compact is registered, the following event is emitted:

```solidity
event CompactRegistered(
    address indexed sponsor,
    bytes32 claimHash,
    bytes32 typehash
);
```

This event is emitted when a compact is registered via `register`, `registerMultiple`, or any of the combined deposit-and-register functions.

### Check Registration Status
```solidity
function isRegistered(
    address sponsor,
    bytes32 claimHash,
    bytes32 typehash
) external view returns (bool);
```

## Signature Verification

When a claim is submitted for a non-registered compact, The Compact verifies the sponsor's authorization in the following order:

1. **Caller is Sponsor**: If `msg.sender == sponsor`, authorization is granted
2. **ECDSA Signature**: Attempt standard ECDSA signature verification
3. **EIP-1271 `isValidSignature`**: If ECDSA fails, call `isValidSignature` on the sponsor's address
4. **Emissary `verifyClaim`**: If EIP-1271 fails, call the emissary's `verifyClaim` function
