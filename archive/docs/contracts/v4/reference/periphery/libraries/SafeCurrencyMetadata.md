# SafeCurrencyMetadata
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/SafeCurrencyMetadata.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

can produce symbols and decimals from inconsistent or absent ERC20 implementations

*Reference: https://github.com/Uniswap/solidity-lib/blob/master/contracts/libraries/SafeERC20Namer.sol*


## State Variables
### MAX_SYMBOL_LENGTH

```solidity
uint8 constant MAX_SYMBOL_LENGTH = 12;
```


## Functions
### currencySymbol

attempts to extract the currency symbol. if it does not implement symbol, returns a symbol derived from the address


```solidity
function currencySymbol(address currency, string memory nativeLabel) internal view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`address`|The currency address|
|`nativeLabel`|`string`|The native label|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|the currency symbol|


### currencyDecimals

attempts to extract the token decimals, returns 0 if not implemented or not a uint8


```solidity
function currencyDecimals(address currency) internal view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currency`|`address`|The currency address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|the currency decimals|


### bytes32ToString


```solidity
function bytes32ToString(bytes32 x) private pure returns (string memory);
```

### addressToSymbol

produces a symbol from the address - the first 6 hex of the address string in upper case


```solidity
function addressToSymbol(address currencyAddress) private pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currencyAddress`|`address`|the address of the currency|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|the symbol|


### callAndParseStringReturn

calls an external view contract method that returns a symbol, and parses the output into a string


```solidity
function callAndParseStringReturn(address currencyAddress, bytes4 selector) private view returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currencyAddress`|`address`|the address of the currency|
|`selector`|`bytes4`|the selector of the symbol method|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|the symbol|


### truncateSymbol

truncates the symbol to the MAX_SYMBOL_LENGTH

*assumes the string is already longer than MAX_SYMBOL_LENGTH (or the same)*


```solidity
function truncateSymbol(string memory str) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`str`|`string`|the symbol|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|the truncated symbol|


