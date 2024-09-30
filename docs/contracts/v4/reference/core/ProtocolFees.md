# ProtocolFees
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/ProtocolFees.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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
IProtocolFeeController public protocolFeeController;
```


### BLOCK_LIMIT_BPS

```solidity
uint256 private constant BLOCK_LIMIT_BPS = 100;
```


## Functions
### constructor


```solidity
constructor() Owned(msg.sender);
```

### setProtocolFeeController

Sets the protocol fee controller


```solidity
function setProtocolFeeController(IProtocolFeeController controller) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`IProtocolFeeController`|The new protocol fee controller|


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

### _fetchProtocolFee

Fetch the protocol fees for a given pool

*the success of this function is false if the call fails or the returned fees are invalid*

*to prevent an invalid protocol fee controller from blocking pools from being initialized
the success of this function is NOT checked on initialize and if the call fails, the protocol fees are set to 0.*


```solidity
function _fetchProtocolFee(PoolKey memory key) internal returns (uint24 protocolFee);
```

### _updateProtocolFees


```solidity
function _updateProtocolFees(Currency currency, uint256 amount) internal;
```

