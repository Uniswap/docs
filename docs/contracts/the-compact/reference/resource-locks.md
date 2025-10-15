---
id: resource-locks
title: Resource Locks
sidebar_position: 1
---

Resource locks are the fundamental building blocks of The Compact protocol. They are created when a depositor places tokens (either native tokens or ERC20 tokens) into The Compact.

## Structure

Each resource lock has four key properties:

1. **Underlying Token**: The token held in the resource lock
2. **Allocator**: Tasked with cosigning on claims against the resource locks
3. **Scope**: Either spendable on any chain or limited to a single chain
4. **Reset Period**: For forcibly exiting the lock and for emissary reassignment timelocks

Each unique combination of these four properties is represented by a fungible ERC6909 tokenID. The owner of these ERC6909 tokens can act as a sponsor and create compacts.

## Lock Tag

Each resource lock is uniquely identified by a combination of:

1. **Underlying Token**: The address of the ERC20 token or native token held in the lock
2. **Allocator ID**: The ID of the entity responsible for authorizing uses of the lock, which consists of the 4-bit compact flag (shifted left by 88 bits) with the lowest 88 bits of the allocator address, resulting in a 92-bit value
3. **Scope**: Whether the lock can be spent on any chain (Multichain) or only on the same chain where the deposit occurred (Chain-specific)
4. **Reset Period**: The time that must elapse before a forced withdrawal can be completed. The reset period is one of eight predefined values, detailed in the section below.

The allocator ID, scope and reset period are encoded into a bytes12 lockTag, and the resource lock's unique ID (the ERC6909 tokenId) is derived by combining this lockTag with the underlying token address.

```solidity
lockTag = scope << 255 | resetPeriod << 252 | allocatorId << 160
lockId  = lockTag | tokenAddress
```

### Allocator ID Details

The compact flag is a 4-bit value (0-15) that represents how "compact" an allocator address is, based on the number of leading zero nibbles:
- If address has 0-3 leading zero nibbles: flag = 0
- If address has 4-17 leading zero nibbles: flag = (number of leading zeros - 3)
- If address has 18+ leading zero nibbles: flag = 15

Mathematically, the allocator ID can be represented as:

```solidity
compactFlag = min(max(0, leadingZeroNibbles - 3), 15)
id = (compactFlag << 88) | (allocator & 0x00000000000000000000FFFFFFFFFFFFFFFFFFFF)
```

### Reset Period Details

 The reset period is one of eight predefined values:

| Index | Reset Period Value        | Index | Reset Period Value        |
|-------|---------------------------|-------|---------------------------|
| 0     | `OneSecond`              | 4     | `OneHourAndFiveMinutes`  |
| 1     | `FifteenSeconds`         | 5     | `OneDay`                 |
| 2     | `OneMinute`              | 6     | `SevenDaysAndOneHour`    |
| 3     | `TenMinutes`             | 7     | `ThirtyDays`             |

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

### Native Tokens
For native tokens, The Compact mints an amount of ERC6909 tokens equal to the msg.value. For example, a native deposit with a value of 1e18 wei would result in exactly 1e18 ERC6909 tokens being minted to the caller (or specified recipient). A withdrawal of native underlying tokens from a resource lock causes a native value equal to the number of burned ERC6909 tokens to be transferred out of the contract.

### ERC20 Tokens
For ERC20 tokens, The Compact mints an amount of ERC6909 tokens equal to the actual balance change observed by the protocol as a result of an ERC20 deposit, accounting for the token's precision. In most cases, this is equal to the `amount` parameter passed to the token's `transfer`/`transferFrom` function, which is analogous to `msg.value`. One notable exception is fee-on-transfer tokens, where the actual and intended balance changes differ.

Deposits and withdrawals against an ERC20 resource lock are handled by:

- Checking the contract's balance before and after the token transfer
- Minting (or burning) an amount of ERC6909 tokens exactly equal to the observed balance change

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
