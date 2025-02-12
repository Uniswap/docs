# IPositionDescriptor
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/interfaces/IPositionDescriptor.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the PositionDescriptor contract


## Functions
### tokenURI

Produces the URI describing a particular token ID

*Note this URI may be a data: URI with the JSON contents directly inlined*


```solidity
function tokenURI(IPositionManager positionManager, uint256 tokenId) external view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionManager`|`IPositionManager`|The position manager for which to describe the token|
|`tokenId`|`uint256`|The ID of the token for which to produce a description, which may not be valid|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The URI of the ERC721-compliant metadata|


### flipRatio

Returns true if currency0 has higher priority than currency1


```solidity
function flipRatio(address currency0, address currency1) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency0`|`address`|The first currency address|
|`currency1`|`address`|The second currency address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if currency0 has higher priority than currency1|


### currencyRatioPriority

Returns the priority of a currency.
For certain currencies on mainnet, the smaller the currency, the higher the priority
And those with the higher priority values (more positive values) will be in the numerator of the price ratio


```solidity
function currencyRatioPriority(address currency) external view returns (int256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`address`|The currency address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|The priority of the currency|


### wrappedNative


```solidity
function wrappedNative() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The wrapped native token for this descriptor|


### nativeCurrencyLabel


```solidity
function nativeCurrencyLabel() external view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The native currency label for this descriptor|


### poolManager


```solidity
function poolManager() external view returns (IPoolManager);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IPoolManager`|The pool manager for this descriptor|


## Errors
### InvalidTokenId

```solidity
error InvalidTokenId(uint256 tokenId);
```

