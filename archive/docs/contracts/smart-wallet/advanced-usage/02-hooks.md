---
id: hooks
title: Hooks
sidebar_position: 2
---

Hooks are powerful add-ons to keys which can perform arbitrary validation on signatures, and/or actions during execution time.

There are two subtypes of hooks: `ValidationHook` and `ExecutionHook`. A hook can implement either, or both interfaces.

Validation hooks have three call sites:

- `afterVerifySignature`
- `afterIsValidSignature`
- `afterValidateUserOp`

Execution hooks have two call sites:

- `beforeExecute`
- `afterExecute`

Hooks must revert to indicate that the given action should revert.

Example functionality which can be implemented in hooks includes:

- Spending limits
- Restricting keys from calling certain contracts and methods
- Turning a key into a multisig, effectively requiring additional signatures for verification
- Automated actions pre/post swaps

There are a few example hooks referenced in the repo. Be aware that these example hooks are not production code and may contain bugs. We do not recommend you to deploy these hooks or use them as reference implementations for productionized code. They are proof of concepts.