# Descriptor
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/Descriptor.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Describes NFT token positions

*Reference: https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/NFTDescriptor.sol*


## State Variables
### sqrt10X128

```solidity
uint256 constant sqrt10X128 = 1076067327063303206878105757264492625226;
```


## Functions
### constructTokenURI

Constructs the token URI for a Uniswap v4 NFT


```solidity
function constructTokenURI(ConstructTokenURIParams memory params) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`ConstructTokenURIParams`|Parameters needed to construct the token URI|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The token URI as a string|


### escapeSpecialCharacters

Escapes special characters in a string if they are present


```solidity
function escapeSpecialCharacters(string memory symbol) internal pure returns (string memory);
```

### generateDescriptionPartOne

Generates the first part of the description for a Uniswap v4 NFT


```solidity
function generateDescriptionPartOne(
    string memory quoteCurrencySymbol,
    string memory baseCurrencySymbol,
    string memory poolManager
) private pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`quoteCurrencySymbol`|`string`|The symbol of the quote currency|
|`baseCurrencySymbol`|`string`|The symbol of the base currency|
|`poolManager`|`string`|The address of the pool manager|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The first part of the description|


### generateDescriptionPartTwo

Generates the second part of the description for a Uniswap v4 NFTs


```solidity
function generateDescriptionPartTwo(
    string memory tokenId,
    string memory baseCurrencySymbol,
    string memory quoteCurrency,
    string memory baseCurrency,
    string memory hooks,
    string memory feeTier
) private pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`string`|The token ID|
|`baseCurrencySymbol`|`string`|The symbol of the base currency|
|`quoteCurrency`|`string`|The address of the quote currency|
|`baseCurrency`|`string`|The address of the base currency|
|`hooks`|`string`|The address of the hooks contract|
|`feeTier`|`string`|The fee tier of the pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The second part of the description|


### generateName

Generates the name for a Uniswap v4 NFT


```solidity
function generateName(ConstructTokenURIParams memory params, string memory feeTier)
    private
    pure
    returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`ConstructTokenURIParams`|Parameters needed to generate the name|
|`feeTier`|`string`|The fee tier of the pool|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The name of the NFT|


### generateDecimalString


```solidity
function generateDecimalString(DecimalStringParams memory params) private pure returns (string memory);
```

### tickToDecimalString

Gets the price (quote/base) at a specific tick in decimal form
MIN or MAX are returned if tick is at the bottom or top of the price curve


```solidity
function tickToDecimalString(
    int24 tick,
    int24 tickSpacing,
    uint8 baseCurrencyDecimals,
    uint8 quoteCurrencyDecimals,
    bool flipRatio
) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The tick (either tickLower or tickUpper)|
|`tickSpacing`|`int24`|The tick spacing of the pool|
|`baseCurrencyDecimals`|`uint8`|The decimals of the base currency|
|`quoteCurrencyDecimals`|`uint8`|The decimals of the quote currency|
|`flipRatio`|`bool`|True if the ratio was flipped|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The ratio value as a string|


### sigfigsRounded


```solidity
function sigfigsRounded(uint256 value, uint8 digits) private pure returns (uint256, bool);
```

### adjustForDecimalPrecision

Adjusts the sqrt price for different currencies with different decimals


```solidity
function adjustForDecimalPrecision(uint160 sqrtRatioX96, uint8 baseCurrencyDecimals, uint8 quoteCurrencyDecimals)
    private
    pure
    returns (uint256 adjustedSqrtRatioX96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtRatioX96`|`uint160`|The sqrt price at a specific tick|
|`baseCurrencyDecimals`|`uint8`|The decimals of the base currency|
|`quoteCurrencyDecimals`|`uint8`|The decimals of the quote currency|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`adjustedSqrtRatioX96`|`uint256`|The adjusted sqrt price|


### abs

Absolute value of a signed integer


```solidity
function abs(int256 x) private pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`int256`|The signed integer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The absolute value of x|


### fixedPointToDecimalString


```solidity
function fixedPointToDecimalString(uint160 sqrtRatioX96, uint8 baseCurrencyDecimals, uint8 quoteCurrencyDecimals)
    internal
    pure
    returns (string memory);
```

### feeToPercentString

Converts fee amount in pips to decimal string with percent sign


```solidity
function feeToPercentString(uint24 fee) internal pure returns (string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`|fee amount|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|fee as a decimal string with percent sign|


### addressToString


```solidity
function addressToString(address addr) internal pure returns (string memory);
```

### generateSVGImage

Generates the SVG image for a Uniswap v4 NFT


```solidity
function generateSVGImage(ConstructTokenURIParams memory params) internal pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`ConstructTokenURIParams`|Parameters needed to generate the SVG image|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG image as a string|


### overRange

Checks if the current price is within your position range, above, or below


```solidity
function overRange(int24 tickLower, int24 tickUpper, int24 tickCurrent) private pure returns (int8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick|
|`tickUpper`|`int24`|The upper tick|
|`tickCurrent`|`int24`|The current tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int8`|0 if the current price is within the position range, -1 if below, 1 if above|


### isSpecialCharacter


```solidity
function isSpecialCharacter(bytes1 b) private pure returns (bool);
```

### scale


```solidity
function scale(uint256 n, uint256 inMn, uint256 inMx, uint256 outMn, uint256 outMx)
    private
    pure
    returns (string memory);
```

### currencyToColorHex


```solidity
function currencyToColorHex(uint256 currency, uint256 offset) internal pure returns (string memory str);
```

### getCircleCoord


```solidity
function getCircleCoord(uint256 currency, uint256 offset, uint256 tokenId) internal pure returns (uint256);
```

### sliceCurrencyHex


```solidity
function sliceCurrencyHex(uint256 currency, uint256 offset) internal pure returns (uint256);
```

## Structs
### ConstructTokenURIParams

```solidity
struct ConstructTokenURIParams {
    uint256 tokenId;
    address quoteCurrency;
    address baseCurrency;
    string quoteCurrencySymbol;
    string baseCurrencySymbol;
    uint8 quoteCurrencyDecimals;
    uint8 baseCurrencyDecimals;
    bool flipRatio;
    int24 tickLower;
    int24 tickUpper;
    int24 tickCurrent;
    int24 tickSpacing;
    uint24 fee;
    address poolManager;
    address hooks;
}
```

### DecimalStringParams

```solidity
struct DecimalStringParams {
    uint256 sigfigs;
    uint8 bufferLength;
    uint8 sigfigIndex;
    uint8 decimalIndex;
    uint8 zerosStartIndex;
    uint8 zerosEndIndex;
    bool isLessThanOne;
    bool isPercent;
}
```

