# IERC6909Claims
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/interfaces/external/IERC6909Claims.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for claims over a contract balance, wrapped as a ERC6909


## Functions
### balanceOf

Owner balance of an id.


```solidity
function balanceOf(address owner, uint256 id) external view returns (uint256 amount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the owner.|
|`id`|`uint256`|The id of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The balance of the token.|


### allowance

Spender allowance of an id.


```solidity
function allowance(address owner, address spender, uint256 id) external view returns (uint256 amount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the owner.|
|`spender`|`address`|The address of the spender.|
|`id`|`uint256`|The id of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The allowance of the token.|


### isOperator

Checks if a spender is approved by an owner as an operator


```solidity
function isOperator(address owner, address spender) external view returns (bool approved);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the owner.|
|`spender`|`address`|The address of the spender.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`approved`|`bool`|The approval status.|


### transfer

Transfers an amount of an id from the caller to a receiver.


```solidity
function transfer(address receiver, uint256 id, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address of the receiver.|
|`id`|`uint256`|The id of the token.|
|`amount`|`uint256`|The amount of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True, always, unless the function reverts|


### transferFrom

Transfers an amount of an id from a sender to a receiver.


```solidity
function transferFrom(address sender, address receiver, uint256 id, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address of the sender.|
|`receiver`|`address`|The address of the receiver.|
|`id`|`uint256`|The id of the token.|
|`amount`|`uint256`|The amount of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True, always, unless the function reverts|


### approve

Approves an amount of an id to a spender.


```solidity
function approve(address spender, uint256 id, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The address of the spender.|
|`id`|`uint256`|The id of the token.|
|`amount`|`uint256`|The amount of the token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True, always|


### setOperator

Sets or removes an operator for the caller.


```solidity
function setOperator(address operator, bool approved) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The address of the operator.|
|`approved`|`bool`|The approval status.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True, always|


## Events
### OperatorSet

```solidity
event OperatorSet(address indexed owner, address indexed operator, bool approved);
```

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 indexed id, uint256 amount);
```

### Transfer

```solidity
event Transfer(address caller, address indexed from, address indexed to, uint256 indexed id, uint256 amount);
```

