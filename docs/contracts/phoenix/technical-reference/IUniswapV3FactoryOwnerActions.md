# IUniswapV3FactoryOwnerActions
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/interfaces/IUniswapV3FactoryOwnerActions.sol)

The Uniswap V3 Factory facilitates creation of Uniswap V3 pools and control over the
protocol fees

*Stripped down and renamed from:
https://github.com/Uniswap/v3-core/blob/d8b1c635c275d2a9450bd6a78f3fa2484fef73eb/contracts/interfaces/IUniswapV3Factory.sol*


## Functions
### owner

Returns the current owner of the factory

*Can be changed by the current owner via setOwner*


```solidity
function owner() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the factory owner|


### setOwner

Updates the owner of the factory

*Must be called by the current owner*


```solidity
function setOwner(address _owner) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The new owner of the factory|


### enableFeeAmount

Enables a fee amount with the given tickSpacing

*Fee amounts may never be removed once enabled*


```solidity
function enableFeeAmount(uint24 fee, int24 tickSpacing) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)|
|`tickSpacing`|`int24`|The spacing between ticks to be enforced for all pools created with the given fee amount|


### feeAmountTickSpacing

Returns the tick spacing for a given fee amount, if enabled, or 0 if not enabled

*A fee amount can never be removed, so this value should be hard coded or cached in the
calling context*


```solidity
function feeAmountTickSpacing(uint24 fee) external view returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|The enabled fee, denominated in hundredths of a bip. Returns 0 in case of unenabled fee|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The tick spacing|


