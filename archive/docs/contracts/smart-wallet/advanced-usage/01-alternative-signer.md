---
id: alternative-signers
title: Alternative Signers
sidebar_position: 1
---

Calibur allows for a user to add any number of signers to their account. Known as `keys`, the following types are supported: `Secp256k1`, `Secp256r1 (P256)`, and `WebAuthn P256`.

This is an **advanced** feature. Please be aware of the following:

- By default, added keys do not expire and have no hooks.
- A malicious key could steal all of your ETH and tokens

Registering external signers on your account changes the security model. Proceed with caution!