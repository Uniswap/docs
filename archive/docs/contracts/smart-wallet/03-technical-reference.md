---
id: technical-reference
title: Technical Reference
sidebar_position: 5
---

For more details, see the [technical reference](https://github.com/Uniswap/calibur/tree/main/docs).

### Important Integration Callouts

The Calibur contracts are open sourced and MIT licensed. While anyone is free to build off of them, it is extremely important that integrators protect against certain known integration pitfalls.

- By default, registered keys do not expire and they do not have any hooks attached to them. While they are not admin keys and thus cannot self-call (callback into the Calibur contract), they can still spend any token and ETH balances.
- An admin key added to the account can add other keys with any expiration or admin status
- It is possible to pass along hookData to hooks for extra verification. This data is arbitrary and hook developers MUST verify its uniqueness and integrity.
- The contract does not enforce that the User Verification flag is set in Webauthn signatures
- Signatures from the private key of the EOA are always valid on the Calibur contracts. Those from alternative signers can be invalidated if desired by calling `updateSalt`, which will update the account’s EIP712 domain separator.
- It is completely valid to not execute the ERC7739 rehash code path on a signature originating from the root EOA. This is because this contract makes an assumption that IF the root key is registered on another wallet, that wallet is responsible for rehashing.
- Undelegating and redelegating may leave your account exposed to dirtied storage. Proceed with caution when redelegating to another contract.

For a comprehensive list of best practices, reference the documentation in the Github repository, past audit reports, and inline comments in the contract code.