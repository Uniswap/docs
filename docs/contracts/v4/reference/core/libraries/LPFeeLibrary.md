# LPFeeLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/LPFeeLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Library of helper functions for a pools LP fee


## State Variables
### DYNAMIC_FEE_FLAG
An lp fee of exactly 0b1000000... signals a dynamic fee pool. This isn't a valid static fee as it is > MAX_LP_FEE


```solidity
uint24 public constant DYNAMIC_FEE_FLAG = 0x800000;
```


### OVERRIDE_FEE_FLAG
the second bit of the fee returned by beforeSwap is used to signal if the stored LP fee should be overridden in this swap


```solidity
uint24 public constant OVERRIDE_FEE_FLAG = 0x400000;
```


### REMOVE_OVERRIDE_MASK
mask to remove the override fee flag from a fee returned by the beforeSwaphook


```solidity
uint24 public constant REMOVE_OVERRIDE_MASK = 0xBFFFFF;
```


### MAX_LP_FEE
the lp fee is represented in hundredths of a bip, so the max is 100%


```solidity
uint24 public constant MAX_LP_FEE = 1000000;
```


## Functions
### isDynamicFee

returns true if a pool's LP fee signals that the pool has a dynamic fee


```solidity
function isDynamicFee(uint24 self) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True of the fee is dynamic|


### isValid

returns true if an LP fee is valid, aka not above the maximum permitted fee


```solidity
function isValid(uint24 self) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True of the fee is valid|


### validate

validates whether an LP fee is larger than the maximum, and reverts if invalid


```solidity
function validate(uint24 self) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to validate|


### getInitialLPFee

gets and validates the initial LP fee for a pool. Dynamic fee pools have an initial fee of 0.

*if a dynamic fee pool wants a non-0 initial fee, it should call `updateDynamicLPFee` in the afterInitialize hook*


```solidity
function getInitialLPFee(uint24 self) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to get the initial LP from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|initialFee 0 if the fee is dynamic, otherwise the fee (if valid)|


### isOverride

returns true if the fee has the override flag set (2nd highest bit of the uint24)


```solidity
function isOverride(uint24 self) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True of the fee has the override flag set|


### removeOverrideFlag

returns a fee with the override flag removed


```solidity
function removeOverrideFlag(uint24 self) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to remove the override flag from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|fee The fee without the override flag set|


### removeOverrideFlagAndValidate

Removes the override flag and validates the fee (reverts if the fee is too large)


```solidity
function removeOverrideFlagAndValidate(uint24 self) internal pure returns (uint24 fee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`uint24`|The fee to remove the override flag from, and then validate|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|The fee without the override flag set (if valid)|


## Errors
### LPFeeTooLarge
Thrown when the static or dynamic fee on a pool exceeds 100%.


```solidity
error LPFeeTooLarge(uint24 fee);
```

