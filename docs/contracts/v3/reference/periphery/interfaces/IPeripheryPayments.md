Functions to ease deposits and withdrawals of ETH

## Functions

### unwrapWETH9

```solidity
  function unwrapWETH9(
    uint256 amountMinimum,
    address recipient
  ) external
```

Unwraps the contract's WETH9 balance and sends it to recipient as ETH.

The amountMinimum parameter prevents malicious contracts from stealing WETH9 from users.

#### Parameters:

| Name            | Type    | Description                           |
| :-------------- | :------ | :------------------------------------ |
| `amountMinimum` | uint256 | The minimum amount of WETH9 to unwrap |
| `recipient`     | address | The address receiving ETH             |

### refundETH

```solidity
  function refundETH(
  ) external
```

Refunds any ETH balance held by this contract to the `msg.sender`

Useful for bundling with mint or increase liquidity that uses ether, or exact output swaps
that use ether for the input amount

### sweepToken

```solidity
  function sweepToken(
    address token,
    uint256 amountMinimum,
    address recipient
  ) external
```

Transfers the full amount of a token held by this contract to recipient

The amountMinimum parameter prevents malicious contracts from stealing the token from users

#### Parameters:

| Name            | Type    | Description                                                                |
| :-------------- | :------ | :------------------------------------------------------------------------- |
| `token`         | address | The contract address of the token which will be transferred to `recipient` |
| `amountMinimum` | uint256 | The minimum amount of token required for a transfer                        |
| `recipient`     | address | The destination address of the token                                       |
