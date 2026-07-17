Functions to ease deposits and withdrawals of ETH

## Functions

### unwrapWETH9WithFee

```solidity
  function unwrapWETH9WithFee(
  ) external
```

Unwraps the contract's WETH9 balance and sends it to recipient as ETH, with a percentage between
0 (exclusive), and 1 (inclusive) going to feeRecipient

The amountMinimum parameter prevents malicious contracts from stealing WETH9 from users.

### sweepTokenWithFee

```solidity
  function sweepTokenWithFee(
  ) external
```

Transfers the full amount of a token held by this contract to recipient, with a percentage between
0 (exclusive) and 1 (inclusive) going to feeRecipient

The amountMinimum parameter prevents malicious contracts from stealing the token from users
