---
title: Troubleshooting (v2)
description: Diagnose common Uniswap v2 integration errors, including K, rebasing edge cases, and router transaction failures.
---

This page covers error codes and failure patterns frequently encountered while integrating with Uniswap v2.

## UniswapV2: K

`K` errors happen when a swap attempt leaves pair reserves below invariant expectations.

## Fee On Transfer Tokens

### Inclusive fee-on-transfer tokens

These tokens burn or divert part of each transfer, so the recipient receives less than the sender transfers.

Use router functions ending in `SupportingFeeOnTransfer` to validate output amounts on receipt.

### Exclusive fee-on-transfer tokens

These tokens send an additional trailing transfer after the primary transfer.

Because the router cannot anticipate that trailing transfer, swaps may revert or leave pair state inconsistent.

## Rebasing Tokens

Rebasing tokens can change balances independently of transfers, which can create reserve drift.

### Negative rebasing tokens

Negative rebases can unbalance pool reserves and shift losses to the next transacting account.

### Positive rebasing tokens

Positive rebases can create surplus balances that are not reflected in reserve accounting. Third parties may capture this surplus via `skim()`.

### Notes on rebasing support

If you are designing rebasing tokens, account for integration behavior explicitly. Wrapper patterns such as [CHAI](https://chai.money/about.html) can improve compatibility.

## Router and Transaction Errors

### UniswapV2: LOCKED

`LOCKED` is the router reentrancy guard.

### No Access To Archive Node

This is usually an environment issue with local fork tooling.

### UniswapV2: TRANSFER_FAILED

The core contract could not transfer tokens to the recipient.

### UniswapV2: EXPIRED

The transaction deadline elapsed before inclusion onchain.

### Action Requires an Active Reserve

`VM Exception While Processing Transaction: Action Requires an Active Reserve`

### Unable To Approve Transaction On The Front End

Some tokens block direct allowance increases. Setting allowance to zero first, then setting the target amount, usually resolves this.
