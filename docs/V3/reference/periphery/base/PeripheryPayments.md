


## Functions
### receive
```solidity
  function receive(
  ) external
```




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
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`amountMinimum` | uint256 | The minimum amount of WETH9 to unwrap
|`recipient` | address | The address receiving ETH

### sweepToken
```solidity
  function sweepToken(
    address token,
    uint256 amountMinimum,
    address recipient
  ) external
```
Sends the full amount of a token held by this contract to the given recipient

The amountMinimum parameter prevents malicious contracts from stealing the token from users

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | The contract address of the token which will be transferred to `recipient`
|`amountMinimum` | uint256 | The minimum amount of token required for a transfer
|`recipient` | address | The destination address of the token

### pay
```solidity
  function pay(
    address token,
    address payer,
    address recipient,
    uint256 value
  ) internal
```


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | The token to pay
|`payer` | address | The entity that must pay
|`recipient` | address | The entity that will receive payment
|`value` | uint256 | The amount to pay

