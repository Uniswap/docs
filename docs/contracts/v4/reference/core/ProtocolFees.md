# ProtocolFees
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/ProtocolFees.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IProtocolFees](contracts/v4/reference/core/interfaces/IProtocolFees.md), Owned

Contract handling the setting and accrual of protocol fees


## State Variables
### protocolFeesAccrued
Given a currency address, returns the protocol fees accrued in that currency


```solidity
mapping(Currency currency => uint256 amount) public protocolFeesAccrued;
```


### protocolFeeController
Returns the current protocol fee controller address


```solidity
address public protocolFeeController;
```


## Functions
### constructor


```solidity
constructor(address initialOwner) Owned(initialOwner);
```

### setProtocolFeeController

Sets the protocol fee controller


```solidity
function setProtocolFeeController(address controller) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`address`|The new protocol fee controller|


### setProtocolFee

Sets the protocol fee for the given pool


```solidity
function setProtocolFee(PoolKey memory key, uint24 newProtocolFee) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The key of the pool to set a protocol fee for|
|`newProtocolFee`|`uint24`|The fee to set|


### collectProtocolFees

Collects the protocol fees for a given recipient and currency, returning the amount collected

*This will revert if the contract is unlocked*


```solidity
function collectProtocolFees(address recipient, Currency currency, uint256 amount)
    external
    returns (uint256 amountCollected);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address to receive the protocol fees|
|`currency`|`Currency`|The currency to withdraw|
|`amount`|`uint256`|The amount of currency to withdraw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountCollected`|`uint256`|The amount of currency successfully withdrawn|


### _isUnlocked

*abstract internal function to allow the ProtocolFees contract to access the lock*


```solidity
function _isUnlocked() internal virtual returns (bool);
```

### _getPool

*abstract internal function to allow the ProtocolFees contract to access pool state*

*this is overridden in PoolManager.sol to give access to the _pools mapping*


```solidity
function _getPool(PoolId id) internal virtual returns (Pool.State storage);
```

### _updateProtocolFees


```solidity
function _updateProtocolFees(Currency currency, uint256 amount) internal;
```

