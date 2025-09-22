---
id: Periphery Contracts
title: Periphery Contracts
sidebar_position: 7
---

# Emissary
Emissaries provide a fallback verification mechanism for sponsors when authorizing claims. This is particularly useful for:
1.  Smart contract accounts that might update their EIP-1271 signature verification logic.
2.  Accounts using EIP-7702 delegation that leverages EIP-1271.
3.  Situations where the sponsor wants to delegate claim verification to a trusted third party.

A sponsor assigns an emissary for a specific `lockTag` using [`assignEmissary`](./src/interfaces/ITheCompact.sol#L556). The emissary must implement the [`IEmissary`](./src/interfaces/IEmissary.sol) interface, specifically the `verifyClaim` function.

To change an emissary after one has been assigned, the sponsor must first call [`scheduleEmissaryAssignment`](./src/interfaces/ITheCompact.sol#L566), wait for the `resetPeriod` associated with the `lockTag` to elapse, and then call `assignEmissary` again with the new emissary's address (or `address(0)` to remove).

## IEmissary Interface

Emissaries must implement the `IEmissary` interface to integrate with The Compact:
```solidity
interface IEmissary {
    function verifyClaim(
        address sponsor,
        bytes32 digest,
        bytes32 claimHash,
        bytes calldata signature,
        bytes12 lockTag
    ) external view returns (bytes4)
}
```

**Requirements**:
- Must return `IEmissary.verifyClaim.selector` on successful verification

## Assignment and Management

### Assigning an Emissary

Sponsors assign emissaries for specific lock tags:

```solidity
function assignEmissary(
    bytes12 lockTag,
    address emissary
) external
```

**Parameters**:
- `lockTag`: The specific resource lock tag this emissary will be authorized for
- `emissary`: The address of the emissary contract (or `address(0)` to remove)

The emissary assignment is scoped to a specific `lockTag`, meaning sponsors can have different emissaries for different resource locks.

### Changing an Emissary

The emissary mechanism includes security timelocks to prevent sudden authorization changes:

1. **Schedule the Change**: Call `scheduleEmissaryAssignment` with the new emissary address
2. **Wait Period**: Wait for the `resetPeriod` associated with the `lockTag` to elapse
3. **Execute Assignment**: Call `assignEmissary` again with the new address

```solidity
function scheduleEmissaryAssignment(
    bytes12 lockTag,
    address newEmissary
) external
```

### Removing an Emissary

To remove an emissary, assign `address(0)`:

```solidity
assignEmissary(lockTag, address(0))
```

### Security Rationale

This timelock mechanism ensures that emissary changes cannot suddenly alter the authorization logic for outstanding compacts without providing adequate notice. This protects claimants who may have already begun fulfilling compact conditions based on the existing emissary.

## Role in Claim Verification

When a claim is submitted for a non-registered compact, The Compact verifies the sponsor's authorization in the following order:

1. **Caller is Sponsor**: If `msg.sender == sponsor`, authorization is granted
2. **ECDSA Signature**: Attempt standard ECDSA signature verification
3. **EIP-1271 `isValidSignature`**: If ECDSA fails, call `isValidSignature` on the sponsor's address (if it's a contract) with half the remaining gas
4. **Emissary `verifyClaim`**: If EIP-1271 fails or isn't applicable, and an emissary is assigned for the sponsor and `lockTag`, call the emissary's `verifyClaim` function

## Events

```solidity
event EmissaryAssigned(
    address indexed sponsor,
    bytes12 indexed lockTag,
    address emissary
)
```

Emitted when a sponsor assigns or changes an emissary via `assignEmissary`.

## Trust Assumptions

**Sponsors** must trust that emissaries will not authorize claims maliciously, as emissaries effectively have the same authorization power as the sponsor for claim verification.

**Claimants** must trust that emissaries (if assigned) will faithfully authorize valid claims. For EIP-7702 sponsors and smart contracts with upgradeable EIP-1271 logic, claimants should require the use of known, canonical emissaries that enforce delays before allowing key rotation.