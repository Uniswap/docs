# TransientStateLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/libraries/TransientStateLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A helper library to provide state getters that use exttload


## Functions
### getSyncedReserves

returns the reserves for the synced currency

*returns 0 if the reserves are not synced or value is 0.
Checks the synced currency to only return valid reserve values (after a sync and before a settle).*


```solidity
function getSyncedReserves(IPoolManager manager) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`|The pool manager contract.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The reserves of the currency.|


### getSyncedCurrency


```solidity
function getSyncedCurrency(IPoolManager manager) internal view returns (Currency);
```

### getNonzeroDeltaCount

Returns the number of nonzero deltas open on the PoolManager that must be zeroed out before the contract is locked


```solidity
function getNonzeroDeltaCount(IPoolManager manager) internal view returns (uint256);
```

### currencyDelta

Get the current delta for a caller in the given currency


```solidity
function currencyDelta(IPoolManager manager, address target, Currency currency) internal view returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IPoolManager`||
|`target`|`address`|The credited account address|
|`currency`|`Currency`|The currency for which to lookup the delta|


### isUnlocked

Returns whether the contract is unlocked or not


```solidity
function isUnlocked(IPoolManager manager) internal view returns (bool);
```

