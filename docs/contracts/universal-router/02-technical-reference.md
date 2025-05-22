---
id: technical-reference
title: Technical Reference
sidebar_position: 1
---

## Functions

Transactions to the `UniversalRouter` all go through the `execute` function:

- `execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline)`
- `execute(bytes calldata commands, bytes[] calldata inputs)`

Both functions behave and process the commands exactly the same, the first one with a deadline. The function without the deadline parameter will not revert based on block.timestamp.

The `execute` function behaves like a minimal virtual machine. It interprets a list of 1-byte commands and their corresponding ABI-encoded inputs and executes them sequentially.

## Command Structure

Each command byte uses the following bit structure:

| 0   | 1 2 | 3 4 5 6 7 |
| :-- | :-- | :-------- |
| f   | r   | command   |

### `f`

A single bit flag, that signals whether or not the command should be allowed to revert without the whole transaction failing.

- If `f` is `0` aka `false` and the command reverts, then the entire transaction will revert and none of the commands will be executed.
- If `f` is `1` aka `true` and the command reverts, then the transaction will continue, allowing us to achieve partial fills. If using this flag, be careful to include further commands that will remove any funds that could be left unused in the `UniversalRouter` contract.

### `r`

2 unused bytes, reserved for future use. Leaving these 2 bits as `0` will save gas, but any value passed into the contract will be ignored. Later versions of the `UniversalRouter` will likely expand the 5 bits used for `command` to use at least 1 of these bits.

### `command`

A 5 bit unique identifier for the command that should be carried out. The values of these commands can be found within [Commands.sol](https://github.com/Uniswap/universal-router/blob/main/contracts/libraries/Commands.sol), or can be viewed in the table below.

The command types that are not defined do not have an assigned command at this moment in time. Providing one of these identifiers will cause the transaction to revert with `InvalidCommandType`.

## V2 vs V1 Overview

**Note:** For details on the previous version, see [Universal Router (Legacy)](./legacy/01-overview.md).

| Feature                   | V1                        | V2                                       |
| ------------------------- | ------------------------- | ---------------------------------------- |
| NFT support               | ✅ Multiple marketplaces  | ❌ Removed                               |
| V4 pool interaction       | ❌ Not supported          | ✅ `V4_SWAP`, `V4_POSITION_MANAGER_CALL` |
| V3/V4 position management | ❌ Not supported          | ✅ `V3_POSITION_MANAGER_*` / `V4_*`      |
| Commands                  | 0x00–0x3f (dense NFT ops) | 0x00–0x21 (compact core logic)           |
| Permit2-based transfers   | ✅                        | ✅ Extended with batch & position flows  |
| Sub-plan execution        | ✅ `EXECUTE_SUB_PLAN`     | ✅ Still supported                       |

## Supported Commands (V2)

| Command | Name                          |
| ------: | ----------------------------- |
|  `0x00` | `V3_SWAP_EXACT_IN`            |
|  `0x01` | `V3_SWAP_EXACT_OUT`           |
|  `0x02` | `PERMIT2_TRANSFER_FROM`       |
|  `0x03` | `PERMIT2_PERMIT_BATCH`        |
|  `0x04` | `SWEEP`                       |
|  `0x05` | `TRANSFER`                    |
|  `0x06` | `PAY_PORTION`                 |
|  `0x08` | `V2_SWAP_EXACT_IN`            |
|  `0x09` | `V2_SWAP_EXACT_OUT`           |
|  `0x0a` | `PERMIT2_PERMIT`              |
|  `0x0b` | `WRAP_ETH`                    |
|  `0x0c` | `UNWRAP_WETH`                 |
|  `0x0d` | `PERMIT2_TRANSFER_FROM_BATCH` |
|  `0x0e` | `BALANCE_CHECK_ERC20`         |
|  `0x10` | `V4_SWAP`                     |
|  `0x11` | `V3_POSITION_MANAGER_PERMIT`  |
|  `0x12` | `V3_POSITION_MANAGER_CALL`    |
|  `0x13` | `V4_INITIALIZE_POOL`          |
|  `0x14` | `V4_POSITION_MANAGER_CALL`    |
|  `0x21` | `EXECUTE_SUB_PLAN`            |

Commands not listed are placeholders and will revert if called.

## Command Inputs

Each command requires its own input structure. Inputs are encoded using `abi.encode(...)` and placed in `inputs[i]` to match `commands[i]`. For example:

---

## 🧮 Swap Commands

### `0x00` – V3_SWAP_EXACT_IN

**Parameters:**

- `address recipient`
- `uint256 amountIn`
- `uint256 amountOutMin`
- `bytes path`
- `bool payerIsUser`

**Calls:** `v3SwapExactInput(...)` in V3SwapModule  
**Usage:** Ideal for deterministic trades where the input amount is fixed.

---

### `0x01` – V3_SWAP_EXACT_OUT

**Parameters:**

- `address recipient`
- `uint256 amountOut`
- `uint256 amountInMax`
- `bytes path`
- `bool payerIsUser`

**Calls:** `v3SwapExactOutput(...)`  
**Usage:** When the user wants to receive a precise amount of output tokens, regardless of price volatility, within a max budget.

---

### `0x08` – V2_SWAP_EXACT_IN

**Parameters:**

- `address recipient`
- `uint256 amountIn`
- `uint256 amountOutMin`
- `address[] path`
- `bool payerIsUser`

**Calls:** `v2SwapExactInput(...)` in V2SwapModule  
**Usage:** Simple Uniswap V2-style fixed input swap using token pairs.

---

### `0x09` – V2_SWAP_EXACT_OUT

**Parameters:**

- `address recipient`
- `uint256 amountOut`
- `uint256 amountInMax`
- `address[] path`
- `bool payerIsUser`

**Calls:** `v2SwapExactOutput(...)`  
**Usage:** Swaps to get an exact output amount with limited token budget.

---

## 🔐 Permit2 Commands

### `0x02` – PERMIT2_TRANSFER_FROM

**Parameters:**

- `address token`
- `address recipient`
- `uint160 amount`

**Calls:** `permit2TransferFrom(...)`  
**Usage:** Transfers a single token using Permit2 allowances. Always pulls from `msg.sender`.

---

### `0x03` – PERMIT2_PERMIT_BATCH

**Parameters:**

- `PermitBatch permitBatch`
- `bytes signature`

**Calls:** `PERMIT2.permit(...)`  
**Usage:** Sets approval for multiple tokens in one signature.

---

### `0x0a` – PERMIT2_PERMIT

**Parameters:**

- `PermitSingle permitSingle`
- `bytes signature`

**Calls:** `PERMIT2.permit(...)`  
**Usage:** Sets approval for one token, often before `PERMIT2_TRANSFER_FROM`.

---

### `0x0d` – PERMIT2_TRANSFER_FROM_BATCH

**Parameters:**

- `AllowanceTransferDetails[] batch`

**Calls:** `permit2TransferFrom(...)`  
**Usage:** Transfers many tokens in one call from a user to one or more destinations.

---

## 💸 Payment & Balance Commands

### `0x04` – SWEEP

**Parameters:**

- `address token`
- `address recipient`
- `uint256 amountMin`

**Calls:** `Payments.sweep(...)`  
**Usage:** Clears out all router-held ETH or ERC20 tokens to a destination address.

---

### `0x05` – TRANSFER

**Parameters:**

- `address token`
- `address recipient`
- `uint256 amount`

**Calls:** `Payments.pay(...)`  
**Usage:** Transfers a specific amount (not full balance) from the router.

---

### `0x06` – PAY_PORTION

**Parameters:**

- `address token`
- `address recipient`
- `uint256 bips`

**Calls:** `Payments.payPortion(...)`  
**Usage:** Sends a % of the token balance (e.g., 2500 = 25%).

---

### `0x0e` – BALANCE_CHECK_ERC20

**Parameters:**

- `address owner`
- `address token`
- `uint256 minBalance`

**Calls:** view-only `balanceOf(...)`  
**Usage:** Ensures required token balance exists; useful for conditional workflows.

---

## 🔁 ETH & WETH

### `0x0b` – WRAP_ETH

**Parameters:**

- `address recipient`
- `uint256 amount`

**Calls:** `Payments.wrapETH(...)` → WETH.deposit()  
**Usage:** Converts ETH held by router into WETH and optionally sends it.

---

### `0x0c` – UNWRAP_WETH

**Parameters:**

- `address recipient`
- `uint256 amountMin`

**Calls:** `Payments.unwrapWETH9(...)`  
**Usage:** Converts all router-held WETH into ETH and sends it.

---

## 🧩 V3 & V4 Advanced

## `0x10` – V4_SWAP

### Parameters:

- **`bytes actions`**  
  Encoded action identifiers specifying the type of swap or payment action.  
  For available action types, see [Uniswap V4 SDK Actions](../../sdk/v4/reference/enumerations/Actions.md).

- **`bytes[] params`**
  ABI-encoded parameters array, corresponding one-to-one with each action provided in `actions`.
  Each action type requires its own parameter structure.

### Calls:

Executes actions via `V4SwapRouter._handleAction(action, params)`:

- Swap-related actions call `_swapExactInput(...)` or `_swapExactOutput(...)`.
- Payment-related actions (`settle`, `take`) call internal balance management methods (`_settle(...)`, `_take(...)`).
- Swap actions ultimately call `_swap(...)`, executing swaps via `PoolManager.swap(...)`.

**Usage:** Executes a swap on Uniswap V4 using the provided parameters.

### Internal Flow:

```markdown
UniversalRouter.execute(...) receives command `0x10`
↓ dispatch (UniversalRouter.sol)
V4SwapRouter.\_handleAction(action, params)
├── SWAP_EXACT_IN → \_swapExactInput(...)
├── SWAP_EXACT_OUT → \_swapExactOutput(...)
├── SETTLE / SETTLE_ALL → \_settle(...)
├── TAKE / TAKE_ALL / TAKE_PORTION → \_take(...)
↓ swap calls route to
\_swap(...) → PoolManager.swap(...)
```

---

### `0x11` – V3_POSITION_MANAGER_PERMIT

**Parameters:**

- `address spender`
- `uint256 tokenId`
- `uint256 deadline`
- `uint8 v, bytes32 r, bytes32 s`

**Calls:** NonfungiblePositionManager.permit(...)  
**Usage:** Grants router permission to operate on a user’s V3 NFT.

---

### `0x12` – V3_POSITION_MANAGER_CALL

**Parameters:**

- `bytes callData`

**Calls:** Arbitrary call to NonfungiblePositionManager  
**Usage:** Executes V3 NFT ops like `burn`, `collect`, `decreaseLiquidity`.

---

### `0x13` – V4_INITIALIZE_POOL

**Parameters:**

- `PoolKey key`
- `uint160 sqrtPriceX96`

**Calls:** `PoolManager.initialize(...)`  
**Usage:** Creates new V4 pool with specified fee, tick spacing, etc.

---

### `0x14` – V4_POSITION_MANAGER_CALL

**Parameters:**

- `bytes callData`

**Calls:** Arbitrary call to V4 PositionManager  
**Usage:** Used for `modifyLiquidity`, `mint`, `settle`, etc. on a pool.

---

## 🪢 Composability

### `0x21` – EXECUTE_SUB_PLAN

**Parameters:**

- `bytes subCommands`
- `bytes[] subInputs`

**Calls:** `execute(...)` (reentrantly)

**Usage:** Nested command execution for conditional or fallback logic. Used to group steps or allow selective reverts (via `f` flag).

## Reverting Command Example

To allow a command to fail without reverting the entire transaction, set the high bit:

```solidity
command = 0x80 | 0x00; // V3_SWAP_EXACT_IN with ALLOW_REVERT
```

Be sure to follow such commands with cleanup logic (e.g., `SWEEP`) to handle unused ETH or tokens.

## References

- [Uniswap Universal Router GitHub](https://github.com/Uniswap/universal-router)
- [Latest Commands.sol](https://github.com/Uniswap/universal-router/blob/main/contracts/libraries/Commands.sol)

## Legacy Documentation

- [Universal Router (Legacy) Overview](../../universal-router-legacy/overview)
- [Universal Router (Legacy) Technical Reference](../../universal-router-legacy/technical-reference)
