Contains a subset of the full ERC20 interface that is used in Uniswap V3


## Functions
### balanceOf
```solidity
  function balanceOf(
    address account
  ) external view returns (uint256)
```
Returns the balance of a token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`account` | address | The account for which to look up the number of tokens it has, i.e. its balance

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | number of tokens held by the account

### transfer
```solidity
  function transfer(
    address recipient,
    uint256 amount
  ) external returns (bool)
```
Transfers the amount of token from the `msg.sender` to the recipient


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The account that will receive the amount transferred
|`amount` | uint256 | The number of tokens to send from the sender to the recipient

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | true for a successful transfer, false for an unsuccessful transfer
### allowance
```solidity
  function allowance(
    address owner,
    address spender
  ) external view returns (uint256)
```
Returns the current allowance given to a spender by an owner


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`owner` | address | The account of the token owner
|`spender` | address | The account of the token spender

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | current allowance granted by `owner` to `spender`
### approve
```solidity
  function approve(
    address spender,
    uint256 amount
  ) external returns (bool)
```
Sets the allowance of a spender from the `msg.sender` to the value `amount`


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`spender` | address | The account which will be allowed to spend a given amount of the owners tokens
|`amount` | uint256 | The amount of tokens allowed to be used by `spender`

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | true for a successful approval, false for unsuccessful
### transferFrom
```solidity
  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool)
```
Transfers `amount` tokens from `sender` to `recipient` up to the allowance given to the `msg.sender`


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`sender` | address | The account from which the transfer will be initiated
|`recipient` | address | The recipient of the transfer
|`amount` | uint256 | The amount of the transfer

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | true for a successful transfer, false for unsuccessful
## Events
### Transfer
```solidity
  event Transfer(
    address from,
    address to,
    uint256 value
  )
```
Event emitted when tokens are transferred from one address to another, either via `#transfer` or `#transferFrom`.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | The account from which the tokens were sent, i.e. the balance decreased
|`to`| address | The account to which the tokens were sent, i.e. the balance increased
|`value`| uint256 | The amount of tokens that were transferred
### Approval
```solidity
  event Approval(
    address owner,
    address spender,
    uint256 value
  )
```
Event emitted when the approval amount for the spender of a given owner's tokens changes.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`owner`| address | The account that approved spending of its tokens
|`spender`| address | The account for which the spending allowance was modified
|`value`| uint256 | The new allowance from the owner to the spender
