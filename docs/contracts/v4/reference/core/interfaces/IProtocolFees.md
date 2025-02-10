# IProtocolFees
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/interfaces/IProtocolFees.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for all protocol-fee related functions in the pool manager


## Functions
### protocolFeesAccrued

Given a currency address, returns the protocol fees accrued in that currency


```solidity
function protocolFeesAccrued(Currency currency) external view returns (uint256 amount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`Currency`|The currency to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of protocol fees accrued in the currency|


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


### setProtocolFeeController

Sets the protocol fee controller


```solidity
function setProtocolFeeController(address controller) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`controller`|`address`|The new protocol fee controller|


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


### protocolFeeController

Returns the current protocol fee controller address


```solidity
function protocolFeeController() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address The current protocol fee controller address|


## Events
### ProtocolFeeControllerUpdated
Emitted when the protocol fee controller address is updated in setProtocolFeeController.


```solidity
event ProtocolFeeControllerUpdated(address indexed protocolFeeController);
```

### ProtocolFeeUpdated
Emitted when the protocol fee is updated for a pool.


```solidity
event ProtocolFeeUpdated(PoolId indexed id, uint24 protocolFee);
```

## Errors
### ProtocolFeeTooLarge
Thrown when protocol fee is set too high


```solidity
error ProtocolFeeTooLarge(uint24 fee);
```

### InvalidCaller
Thrown when collectProtocolFees or setProtocolFee is not called by the controller.


```solidity
error InvalidCaller();
```

### ProtocolFeeCurrencySynced
Thrown when collectProtocolFees is attempted on a token that is synced.


```solidity
error ProtocolFeeCurrencySynced();
```

