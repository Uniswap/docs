


## Functions
### safeTransferFrom
```solidity
  function safeTransferFrom(
    address token,
    address from,
    address to,
    uint256 value
  ) internal
```
Transfers tokens from the targeted address to the given destination
Errors with 'STF' if transfer fails


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | The contract address of the token to be transferred
|`from` | address | The originating address from which the tokens will be transferred
|`to` | address | The destination address of the transfer
|`value` | uint256 | The amount to be transferred

### safeTransfer
```solidity
  function safeTransfer(
    address token,
    address to,
    uint256 value
  ) internal
```
Transfers tokens from msg.sender to a recipient

Errors with ST if transfer fails

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | The contract address of the token which will be transferred
|`to` | address | The recipient of the transfer
|`value` | uint256 | The value of the transfer

### safeApprove
```solidity
  function safeApprove(
    address token,
    address to,
    uint256 value
  ) internal
```
Approves the stipulated contract to spend the given allowance in the given token

Errors with 'SA' if transfer fails

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | The contract address of the token to be approved
|`to` | address | The target of the approval
|`value` | uint256 | The amount of the given token the target will be allowed to spend

### safeTransferETH
```solidity
  function safeTransferETH(
    address to,
    uint256 value
  ) internal
```
Transfers ETH to the recipient address

Fails with `STE`

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The destination of the transfer
|`value` | uint256 | The value to be transferred

