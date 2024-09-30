# IERC20Minimal
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/interfaces/external/IERC20Minimal.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Contains a subset of the full ERC20 interface that is used in Uniswap V3


## Functions
### balanceOf

Returns an account's balance in the token


```solidity
function balanceOf(address account) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account for which to look up the number of tokens it has, i.e. its balance|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of tokens held by the account|


### transfer

Transfers the amount of token from the `msg.sender` to the recipient


```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The account that will receive the amount transferred|
|`amount`|`uint256`|The number of tokens to send from the sender to the recipient|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Returns true for a successful transfer, false for an unsuccessful transfer|


### allowance

Returns the current allowance given to a spender by an owner


```solidity
function allowance(address owner, address spender) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The account of the token owner|
|`spender`|`address`|The account of the token spender|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current allowance granted by `owner` to `spender`|


### approve

Sets the allowance of a spender from the `msg.sender` to the value `amount`


```solidity
function approve(address spender, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The account which will be allowed to spend a given amount of the owners tokens|
|`amount`|`uint256`|The amount of tokens allowed to be used by `spender`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Returns true for a successful approval, false for unsuccessful|


### transferFrom

Transfers `amount` tokens from `sender` to `recipient` up to the allowance given to the `msg.sender`


```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The account from which the transfer will be initiated|
|`recipient`|`address`|The recipient of the transfer|
|`amount`|`uint256`|The amount of the transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Returns true for a successful transfer, false for unsuccessful|


## Events
### Transfer
Event emitted when tokens are transferred from one address to another, either via `#transfer` or `#transferFrom`.


```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|The account from which the tokens were sent, i.e. the balance decreased|
|`to`|`address`|The account to which the tokens were sent, i.e. the balance increased|
|`value`|`uint256`|The amount of tokens that were transferred|

### Approval
Event emitted when the approval amount for the spender of a given owner's tokens changes.


```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The account that approved spending of its tokens|
|`spender`|`address`|The account for which the spending allowance was modified|
|`value`|`uint256`|The new allowance from the owner to the spender|

