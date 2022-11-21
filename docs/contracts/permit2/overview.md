---
id: overview
title: Overview
sidebar_position: 1
---

[`Permit2`](https://github.com/Uniswap/permit2) is a unification of 2 contracts, [`SignatureTransfer`](./reference/signature-transfer.md) and [`AllowanceTransfer`](./reference/allowance-transfer.md). The `SignatureTransfer` contract handles all signature-based transfers, meaning that an allowance on the token is bypassed and permissions to the spender only last for the duration of the transaction that the one-time signature is spent. The `AllowanceTransfer` contract handles setting allowances on tokens, giving permissions to spenders on a specified amount for a specified duration of time. Any transfers that then happen through the `AllowanceTransfer` contract will only succeed if the proper permissions have been set.

## Approving Permit2

Before integrating contracts can request users’ tokens through Permit2, users must approve the Permit2 contract through the specific token contract by calling something like:

```solidity
USDC.approve(permit2Address, totalAmount);
```

To get the maximal benefits from Permit2, users should do a max approval on the contract where: 
```solidity
totalAmount = type(uint256).max;
```
