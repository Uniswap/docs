---
id: core-interfaces
title: Core Interfaces
sidebar_position: 3
---

# Core Interfaces

The Compact protocol is composed of several key interfaces that define its functionality.

## ITheCompact

The core interface for The Compact protocol, providing functions for deposits, transfers, registration, and management.

### Deposit Functions

#### Basic Deposits
```solidity
// Deposit native tokens
function depositNative(
    bytes12 lockTag,
    address recipient
) external payable returns (uint256 id);

// Deposit ERC20 tokens
function depositERC20(
    address token,
    bytes12 lockTag,
    uint256 amount,
    address recipient
) external returns (uint256 id);

// Batch deposits (native + ERC20)
function batchDeposit(
    uint256[2][] calldata idsAndAmounts,
    address recipient
) external payable returns (bool);
```

#### Permit2 Deposits
```solidity
// Single deposit via Permit2
function depositERC20ViaPermit2(
    ISignatureTransfer.PermitTransferFrom calldata permit,
    address depositor,
    bytes12 lockTag,
    address recipient,
    bytes calldata signature
) external returns (uint256 id);

// Batch deposit via Permit2
function batchDepositViaPermit2(
    address depositor,
    ISignatureTransfer.TokenPermissions[] calldata permitted,
    DepositDetails calldata details,
    address recipient,
    bytes calldata signature
) external payable returns (uint256[] memory ids);
```

#### Deposit + Register Combinations
```solidity
// Native deposit and register
function depositNativeAndRegister(
    bytes12 lockTag,
    bytes32 claimHash,
    bytes32 typehash
) external payable returns (uint256 id);

// Native deposit and register for another
function depositNativeAndRegisterFor(
    address recipient,
    bytes12 lockTag,
    address arbiter,
    uint256 nonce,
    uint256 expires,
    bytes32 typehash,
    bytes32 witness
) external payable returns (uint256 id, bytes32 claimHash);

// ERC20 deposit and register
function depositERC20AndRegister(
    address token,
    bytes12 lockTag,
    uint256 amount,
    bytes32 claimHash,
    bytes32 typehash
) external returns (uint256 id);

// ERC20 deposit and register for another
function depositERC20AndRegisterFor(
    address recipient,
    address token,
    bytes12 lockTag,
    uint256 amount,
    address arbiter,
    uint256 nonce,
    uint256 expires,
    bytes32 typehash,
    bytes32 witness
) external returns (uint256 id, bytes32 claimHash, uint256 registeredAmount);

// Batch deposit and register multiple
function batchDepositAndRegisterMultiple(
    uint256[2][] calldata idsAndAmounts,
    bytes32[2][] calldata claimHashesAndTypehashes
) external payable returns (bool);

// Batch deposit and register for another
function batchDepositAndRegisterFor(
    address recipient,
    uint256[2][] calldata idsAndAmounts,
    address arbiter,
    uint256 nonce,
    uint256 expires,
    bytes32 typehash,
    bytes32 witness
) external payable returns (bytes32 claimHash, uint256[] memory registeredAmounts);

// Deposit via Permit2 and register
function depositERC20AndRegisterViaPermit2(
    ISignatureTransfer.PermitTransferFrom calldata permit,
    address depositor,
    bytes12 lockTag,
    bytes32 claimHash,
    CompactCategory compactCategory,
    string calldata witness,
    bytes calldata signature
) external returns (uint256 id);

// Batch deposit via Permit2 and register
function batchDepositAndRegisterViaPermit2(
    address depositor,
    ISignatureTransfer.TokenPermissions[] calldata permitted,
    DepositDetails calldata details,
    bytes32 claimHash,
    CompactCategory compactCategory,
    string calldata witness,
    bytes calldata signature
) external payable returns (uint256[] memory ids);
```

### Allocated Transfers

```solidity
// Transfer single ID to multiple recipients with allocator approval
function allocatedTransfer(
    AllocatedTransfer calldata transfer
) external returns (bool);

// Transfer multiple IDs
function allocatedBatchTransfer(
    AllocatedBatchTransfer calldata transfer
) external returns (bool);
```

### Registration Functions

```solidity
// Register single compact
function register(
    bytes32 claimHash,
    bytes32 typehash
) external returns (bool);

// Register multiple compacts
function registerMultiple(
    bytes32[2][] calldata claimHashesAndTypehashes
) external returns (bool);

// Register compact on behalf of sponsor
function registerFor(
    bytes32 typehash,
    address arbiter,
    address sponsor,
    uint256 nonce,
    uint256 expires,
    bytes12 lockTag,
    address token,
    uint256 amount,
    bytes32 witness,
    bytes calldata sponsorSignature
) external returns (bytes32 claimHash);

// Register batch compact on behalf of sponsor
function registerBatchFor(
    bytes32 typehash,
    address arbiter,
    address sponsor,
    uint256 nonce,
    uint256 expires,
    bytes32 idsAndAmountsHash,
    bytes32 witness,
    bytes calldata sponsorSignature
) external returns (bytes32 claimHash);

// Register multichain compact on behalf of sponsor
function registerMultichainFor(
    bytes32 typehash,
    address sponsor,
    uint256 nonce,
    uint256 expires,
    bytes32 elementsHash,
    uint256 notarizedChainId,
    bytes calldata sponsorSignature
) external returns (bytes32 claimHash);
```

### Forced Withdrawals

```solidity
// Enable forced withdrawal
function enableForcedWithdrawal(
    uint256 id
) external returns (uint256 withdrawableAt);

// Disable forced withdrawal
function disableForcedWithdrawal(
    uint256 id
) external returns (bool);

// Execute forced withdrawal
function forcedWithdrawal(
    uint256 id,
    address recipient,
    uint256 amount
) external returns (bool);
```

### Management Functions

```solidity
// Emissary management
function assignEmissary(
    bytes12 lockTag,
    address emissary
) external returns (bool);

function scheduleEmissaryAssignment(
    bytes12 lockTag
) external returns (uint256 emissaryAssignmentAvailableAt);

// Allocator management
function __registerAllocator(
    address allocator,
    bytes calldata proof
) external returns (uint96 allocatorId);

// Consume nonces (for allocators)
function consume(
    uint256[] calldata nonces
) external returns (bool);

// Benchmark withdrawal costs
function __benchmark(bytes32 salt) external payable;
```

### View Functions

```solidity
function getLockDetails(uint256 id) external view returns (
    address token,
    address allocator,
    ResetPeriod resetPeriod,
    Scope scope,
    bytes12 lockTag
);

function isRegistered(
    address sponsor,
    bytes32 claimHash,
    bytes32 typehash
) external view returns (bool isActive);

function getForcedWithdrawalStatus(
    address account,
    uint256 id
) external view returns (
    ForcedWithdrawalStatus status,
    uint256 forcedWithdrawalAvailableAt
);

function getEmissaryStatus(
    address sponsor,
    bytes12 lockTag
) external view returns (
    EmissaryStatus status,
    uint256 emissaryAssignmentAvailableAt,
    address currentEmissary
);

function hasConsumedAllocatorNonce(
    uint256 nonce,
    address allocator
) external view returns (bool consumed);

function getRequiredWithdrawalFallbackStipends() external view returns (
    uint256 nativeTokenStipend,
    uint256 erc20TokenStipend
);

function DOMAIN_SEPARATOR() external view returns (bytes32);

function name() external pure returns (string memory);
```

## ITheCompactClaims

The claims interface provides endpoints for arbiters to settle compacts.

### Single Chain Claims

```solidity
// Standard single-chain, single-ID claim
function claim(Claim calldata claimPayload) external returns (bytes32 claimHash);

// Multiple IDs on a single chain
function batchClaim(BatchClaim calldata claimPayload) external returns (bytes32 claimHash);
```

### Multichain Claims

```solidity
// For the notarized chain of a multichain compact
function multichainClaim(
    MultichainClaim calldata claimPayload
) external returns (bytes32 claimHash);

// For an exogenous chain of a multichain compact
function exogenousClaim(
    ExogenousMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash);

// Batch versions for multiple resource locks
function batchMultichainClaim(
    BatchMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash);

function exogenousBatchClaim(
    ExogenousBatchMultichainClaim calldata claimPayload
) external returns (bytes32 claimHash);
```

### Claim Struct

```solidity
struct Claim {
    bytes allocatorData;
    bytes sponsorSignature;
    address sponsor;
    uint256 nonce;
    uint256 expires;
    bytes32 witness;
    string witnessTypestring;
    uint256 id;
    uint256 allocatedAmount;
    Component[] claimants;
}
```

### Component Struct

```solidity
struct Component {
    uint256 claimant; // The lockTag + recipient
    uint256 amount;   // The amount of tokens
}
```

The `claimant` field encodes both:
- **recipient** address (lower 160 bits)
- **bytes12 lockTag** (upper 96 bits)

This encoding determines processing:
1. **Direct Transfer**: If `lockTag` matches the claimed lock's tag
2. **Convert Lock**: If `lockTag` is non-zero but different
3. **Withdraw**: If `lockTag` is `bytes12(0)`

## IAllocator

Interface that allocators must implement.

```solidity
interface IAllocator {
    // Called on standard ERC6909 transfers
    function attest(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) external returns (bytes4);
    
    // Called during claim processing for on-chain authorization
    function authorizeClaim(
        bytes32 claimHash,
        address arbiter,
        address sponsor,
        uint256 nonce,
        uint256 expires,
        uint256[2][] calldata idsAndAmounts,
        bytes calldata allocatorData
    ) external returns (bytes4);
    
    // Off-chain view function
    function isClaimAuthorized(
        bytes32 claimHash,
        address arbiter,
        address sponsor,
        uint256 nonce,
        uint256 expires,
        uint256[2][] calldata idsAndAmounts,
        bytes calldata allocatorData
    ) external view returns (bool);
}
```

Return values:
- `attest` must return `IAllocator.attest.selector`
- `authorizeClaim` must return `IAllocator.authorizeClaim.selector`

## IEmissary

Interface for emissaries providing fallback claim verification.

```solidity
interface IEmissary {
    // Called only if all other sponsor verification methods fail
    function verifyClaim(
        address sponsor,
        bytes32 digest,
        bytes32 claimHash,
        bytes calldata signature,
        bytes12 lockTag
    ) external view returns (bytes4);
}
```

Must return `IEmissary.verifyClaim.selector` on successful verification.

## Key Events

```solidity
event Claim(
    address indexed sponsor,
    address indexed allocator,
    address indexed arbiter,
    bytes32 claimHash,
    uint256 nonce
);

event NonceConsumedDirectly(
    address indexed allocator,
    uint256 nonce
);

event ForcedWithdrawalStatusUpdated(
    address indexed account,
    uint256 indexed id,
    bool activating,
    uint256 withdrawableAt
);

event CompactRegistered(
    address indexed sponsor,
    bytes32 claimHash,
    bytes32 typehash
);

event AllocatorRegistered(
    uint96 allocatorId,
    address allocator
);

event EmissaryAssigned(
    address indexed sponsor,
    bytes12 indexed lockTag,
    address indexed emissary
);

event EmissaryAssignmentScheduled(
    address indexed sponsor,
    bytes12 indexed lockTag,
    uint256 assignableAt
);
```

## Key Errors

```solidity
error InvalidToken(address token);
error Expired(uint256 expiration);
error InvalidSignature();
error PrematureWithdrawal(uint256 id);
error ForcedWithdrawalFailed();
error ForcedWithdrawalAlreadyDisabled(address account, uint256 id);
error UnallocatedTransfer(address operator, address from, address to, uint256 id, uint256 amount);
error InvalidBatchAllocation();
error InvalidRegistrationProof(address allocator);
error InvalidBatchDepositStructure();
error AllocatedAmountExceeded(uint256 allocatedAmount, uint256 providedAmount);
error InvalidScope(uint256 id);
error InvalidDepositTokenOrdering();
error InvalidDepositBalanceChange();
error Permit2CallFailed();
error ReentrantCall(address existingCaller);
error InconsistentAllocators();
error InvalidAllocation(address allocator);
error ChainIndexOutOfRange();
error InvalidEmissaryAssignment();
error EmissaryAssignmentUnavailable(uint256 assignableAt);
error InvalidLockTag();
```

## ERC6909 Metadata

The Compact implements standard ERC6909 metadata functions:

```solidity
function name(uint256 id) external view returns (string memory);
function symbol(uint256 id) external view returns (string memory);
function decimals(uint256 id) external view returns (uint8);
function tokenURI(uint256 id) external view returns (string memory);
