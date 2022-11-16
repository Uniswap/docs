---
id: integration-issues
title: Token Integration Issues
---

Fee-on-transfer and rebasing tokens will not function correctly on v3.

## Fee-on-transfer Tokens

Fee-on-transfer tokens will not function with our router contracts. As a workaround, the token creators may create a token wrapper or a customized router. We will not be making a router that supports fee-on-transfer tokens in the future.

## Rebasing Tokens

Rebasing tokens will succeed in pool creation and swapping, but liquidity providers will bear the loss of a negative rebase when their position becomes active, with no way to recover the loss.
