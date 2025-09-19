---
id: resource-locks
title: Resource Locks
sidebar_position: 1
---

# Resource Locks

Resource locks are the fundamental building blocks of The Compact protocol. They are created when a depositor places tokens (either native tokens or ERC20 tokens) into The Compact.

## Structure

Each resource lock has four key properties:

1. **Underlying Token**: The token held in the resource lock
2. **Allocator**: Tasked with cosigning on claims against the resource locks
3. **Scope**: Either spendable on any chain or limited to a single chain
4. **Reset Period**: For forcibly exiting the lock and for emissary reassignment timelocks

Each unique combination of these four properties is represented by a fungible ERC6909 tokenID. The owner of these ERC6909 tokens can act as a sponsor and create compacts.

## Lock Tag

The `scope`, `resetPeriod`, and the `allocatorId` (obtained when an allocator is registered) are packed into a `bytes12 lockTag`. A resource lock's specific ID (the ERC6909 `tokenId`) is a concatenation of this `lockTag` and the underlying `token` address, represented as a `uint256` for ERC6909 compatibility.

```solidity
// lockTag structure (bytes12):
// [allocatorId: 96 bits][scope: 1 bit][resetPeriod: 95 bits]
```

## Creating Resource Locks

Resource locks are created by depositing tokens into The Compact. Multiple deposit methods are available:

### Native Token Deposits
```solidity
function depositNative(
    address recipient,
    bytes12 lockTag
) external payable returns (uint256 id)
```

### ERC20 Token Deposits
```solidity
function depositERC20(
    address token,
    address recipient,
    uint256 amount,
    bytes12 lockTag
) external returns (uint256 id)
```

### Batch Deposits
```solidity
function batchDeposit(
    DepositDetails[] calldata depositDetails
) external payable returns (uint256[] memory ids)
```

### Permit2 Integration
```solidity
function depositERC20ViaPermit2(
    ISignatureTransfer.PermitBatchTransferFrom memory permit,
    bytes memory signature
) external returns (uint256 id)
```

## Token Handling

### Fee-on-Transfer Tokens
The Compact correctly handles fee-on-transfer tokens for both deposits and withdrawals. The amount of ERC6909 tokens minted or burned is based on the *actual balance change* in The Compact contract, not just the specified amount.

:::warning Important Integration Notice

In order to support fee-on-transfer tokens, The Compact does not fully adhere to the Checks-Effects-Interactions (CEI) paradigm as part of deposits and withdrawals.
<br/>
If you are integrating with The Compact, particularly as an allocator, and are reading ERC6909 token balances, be aware that those balances may subsequently increase or decrease as part of the same transaction if the call executes a deposit, withdrawal, or claim against The Compact that in turn triggers a nested call to the integrator in question.
<br/>
To ensure that all balances are fully "settled," integrators should first ensure that the reentrancy guard on The Compact is not set via:

```solidity
require(
    TheCompact.exttload(0x0000000000000000000000000000000000000000000000929eee149b4bd21268) < 2,
    "Balance state may not be final on The Compact"
)
```

*Note: Use `extsload` instead of `exttload` on chains without `tstore` support.*

:::

### Rebasing Tokens
**Rebasing tokens (e.g., stETH) are NOT supported in The Compact V1.** Any yield or other balance changes occurring after deposit will not accrue to the depositor's ERC6909 tokens. For such assets, use their wrapped, non-rebasing counterparts (e.g., wstETH).

## Forced Withdrawals

Resource lock owners can initiate forced withdrawals if an allocator becomes unresponsive:

1. **Enable**: Call `enableForcedWithdrawal(uint256 id)`
2. **Wait**: The `resetPeriod` must elapse
3. **Withdraw**: Call `forcedWithdrawal(uint256 id, address recipient, uint256 amount)`

The forced withdrawal state can be reversed with `disableForcedWithdrawal(uint256 id)`.

## View Functions

Query resource lock details:
```solidity
function getLockDetails(uint256 id) external view returns (
    address token,
    address allocator,
    uint48 resetPeriod,
    Scope scope,
    bytes12 lockTag
)
```

Check forced withdrawal status:
```solidity
function getForcedWithdrawalStatus(
    address account,
    uint256 id
) external view returns (ForcedWithdrawalStatus status)
```

## Error Handling

Common errors when working with resource locks:
- `InvalidToken(address token)`: Invalid token address provided
- `InvalidLockTag()`: Invalid lock tag provided
- `InvalidDepositBalanceChange()`: Actual balance change doesn't match expectations
- `PrematureWithdrawal(uint256 id)`: Attempting withdrawal before reset period
- `ForcedWithdrawalFailed()`: Forced withdrawal operation failed
