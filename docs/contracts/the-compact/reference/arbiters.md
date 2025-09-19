---
id: arbiters
title: Arbiters
sidebar_position: 5
---

# Arbiters

Arbiters are entities responsible for verifying and submitting claims against resource locks in The Compact protocol. When a sponsor creates a compact, they assign an arbiter per chain. That arbiter is the sole account that can trigger a claim against the compact on the respective chain and determines which accounts receive the locked balances and in what amounts.

## Role and Responsibilities

Arbiters serve as intermediaries between sponsors and claimants with these key responsibilities:

1. **Claim Verification**: Validate that claim conditions are met before submission
2. **Claim Submission**: Submit claims to The Compact on behalf of claimants
3. **Recipient Allocation**: Determine which accounts receive funds and their amounts
4. **Witness Data Validation**: Verify any witness data included in compacts
5. **Cross-chain Coordination**: For multichain compacts, coordinate claims across different chains

## Arbiter Selection

Arbiters are specified per compact or per element (in multichain compacts):

### Single and Batch Compacts
```solidity
struct Compact {
    address arbiter;    // The designated arbiter for this compact
    address sponsor;
    uint256 nonce;
    uint256 expires;
    // ...
}
```

### Multichain Compacts
```solidity
struct Element {
    address arbiter;    // Can be different per chain
    uint256 chainId;
    Lock[] commitments;
    Mandate mandate;    // Required for multichain
}
```

## Specifying Claimants

When submitting a claim, arbiters specify claimants through a `Component` struct that encodes both the recipient and the destination format:

```solidity
struct Component {
    uint256 claimant;  // Encodes both lockTag and recipient address
    uint256 amount;    // The amount of tokens to claim
}
```

### Claimant Encoding

The `claimant` field packs two pieces of information:
- **Upper 96 bits**: `bytes12 lockTag` (destination format)
- **Lower 160 bits**: `address recipient` (who receives the tokens)

### Destination Options

Based on the `lockTag` in the claimant field, arbiters can direct claimed resources to three different destinations:

#### 1. Direct Transfer (Keep as ERC6909)
When the `lockTag` matches the original resource lock's tag, the ERC6909 tokens are transferred directly to the recipient. This maintains the same lock properties (allocator, reset period, scope).

#### 2. Convert to New Resource Lock
When the `lockTag` is non-zero but different from the original, the tokens are converted to a new resource lock with different properties. This allows changing allocators, reset periods, or scopes while keeping funds locked.

#### 3. Withdraw to Underlying Token
When the `lockTag` is `bytes12(0)`, the ERC6909 tokens are burned and the underlying tokens (native or ERC20) are withdrawn to the recipient. This fully exits The Compact system.

### Example
```solidity
// Example: Arbiter specifying three different destinations
Component[] memory claimants = new Component[](3);

// Direct transfer - keep same lock properties
claimants[0] = Component({
    claimant: uint256(uint160(alice)) | (uint256(originalLockTag) << 160),
    amount: 100e18
});

// Convert to new lock with different allocator
claimants[1] = Component({
    claimant: uint256(uint160(bob)) | (uint256(newLockTag) << 160),
    amount: 50e18
});

// Withdraw to underlying token
claimants[2] = Component({
    claimant: uint256(uint160(charlie)), // lockTag is 0
    amount: 25e18
});
```

## Submitting Claims

Arbiters submit claims using one of six available claim functions based on:
- **Single vs Batch**: Whether claiming against one or multiple resource locks on a chain
- **Single-chain vs Multichain**: Whether the compact spans one or multiple chains
- **Notarized vs Exogenous** (multichain only): Whether claiming on the primary signed chain or other chains

### Single-Chain Claims

#### claim (Compact)
For single resource lock on a single chain:
```solidity
function claim(Claim calldata claimPayload) external returns (bytes32 claimHash)
```

#### batchClaim (BatchCompact)
For multiple resource locks on a single chain:
```solidity
function batchClaim(BatchClaim calldata claimPayload) external returns (bytes32 claimHash)
```

### Multichain Claims

#### multichainClaim (MultichainCompact - Notarized)
For single resource lock on the notarized chain (domain matches signature):
```solidity
function multichainClaim(
    MultichainClaim calldata claimPayload
) external returns (bytes32 claimHash)
```

#### exogenousClaim (MultichainCompact - Exogenous)
For single resource lock on exogenous chains (not the notarized chain):
```solidity
function exogenousClaim(
    ExogenousMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash)
```

#### batchMultichainClaim (BatchMultichainClaim - Notarized)
For multiple resource locks on the notarized chain:
```solidity
function batchMultichainClaim(
    BatchMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash)
```

#### exogenousBatchClaim (BatchMultichainClaim - Exogenous)
For multiple resource locks on exogenous chains:
```solidity
function exogenousBatchClaim(
    ExogenousBatchMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash)
```

## Trust Model

### For Sponsors
- Sponsors trust arbiters to:
  - Only submit valid claims that meet agreed-upon conditions
  - Not collude with claimants to drain resource locks prematurely
  - Properly verify witness data before claim submission

### For Claimants
- Claimants trust arbiters to:
  - Submit claims promptly when conditions are met
  - Not censor valid claims
  - Distribute claimed resources according to compact terms

## Arbiter Authorization

When an arbiter submits a claim, The Compact verifies authorization in this order:

1. **Arbiter is Caller**: The `msg.sender` must match the arbiter specified in the compact
2. **Claim Validity**: The claim must be valid (not expired, correct nonce, etc.)
3. **Sponsor Signature**: The sponsor's signature must authorize the compact (unless registered)
4. **Allocator Authorization**: The allocator must approve the claim

## Best Practices

### For Arbiter Selection
- Choose arbiters with proven track records
- Consider using decentralized arbiter networks for reduced trust requirements
- Implement arbiter reputation systems for accountability

### For Arbiter Implementation
- Validate all claim parameters before submission
- Implement robust witness data verification
- Maintain audit logs of all claim submissions
- Use secure key management for arbiter accounts

## Common Patterns

### Automated Arbiters
Smart contracts can act as arbiters to provide trustless claim verification:
- Oracle-based arbiters that verify external conditions
- Time-locked arbiters for scheduled releases
- Multi-signature arbiters requiring multiple approvals

### Arbiter Networks
Multiple arbiters can be coordinated through:
- Consensus mechanisms for claim approval
- Reputation-based selection systems
- Stake-based security models

## Error Handling

Common arbiter-related errors:
- `InvalidArbiter()`: The caller is not the designated arbiter
- `ClaimExpired()`: The claim has passed its expiration time
- `InvalidClaimSignature()`: The sponsor's signature is invalid
- `UnauthorizedClaim()`: The arbiter is not authorized for this claim

## Events

Key events related to arbiter actions:
```solidity
event Claim(
    address indexed sponsor,
    address indexed allocator,
    address indexed arbiter,
    bytes32 claimHash,
    uint256 nonce
)
```

## Security Considerations

### Arbiter Compromise
- If an arbiter's key is compromised, they could submit unauthorized claims
- Sponsors should monitor for suspicious claim activity
- Consider using time delays or multi-signature requirements for high-value compacts

### Arbiter Censorship
- Arbiters could refuse to submit valid claims
- Sponsors can mitigate by:
  - Using multiple arbiters
  - Implementing arbiter replacement mechanisms
  - Setting appropriate expiration times

### Front-running Protection
- Arbiters should use private mempools or commit-reveal schemes when appropriate
- Consider using flashbot bundles for sensitive claims
