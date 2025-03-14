# SVG
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/SVG.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Provides a function for generating an SVG associated with a Uniswap NFT

*Reference: https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/NFTSVG.sol*


## State Variables
### curve1

```solidity
string constant curve1 = "M1 1C41 41 105 105 145 145";
```


### curve2

```solidity
string constant curve2 = "M1 1C33 49 97 113 145 145";
```


### curve3

```solidity
string constant curve3 = "M1 1C33 57 89 113 145 145";
```


### curve4

```solidity
string constant curve4 = "M1 1C25 65 81 121 145 145";
```


### curve5

```solidity
string constant curve5 = "M1 1C17 73 73 129 145 145";
```


### curve6

```solidity
string constant curve6 = "M1 1C9 81 65 137 145 145";
```


### curve7

```solidity
string constant curve7 = "M1 1C1 89 57.5 145 145 145";
```


### curve8

```solidity
string constant curve8 = "M1 1C1 97 49 145 145 145";
```


## Functions
### generateSVG

Generate the SVG associated with a Uniswap v4 NFT


```solidity
function generateSVG(SVGParams memory params) internal pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`SVGParams`|The SVGParams struct containing the parameters for the SVG|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG string associated with the NFT|


### generateSVGDefs

Generate the SVG defs that create the color scheme for the SVG


```solidity
function generateSVGDefs(SVGParams memory params) private pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`SVGParams`|The SVGParams struct containing the parameters to generate the SVG defs|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG defs string|


### generateSVGBorderText

Generate the SVG for the moving border text displaying the quote and base currency addresses with their symbols


```solidity
function generateSVGBorderText(
    string memory quoteCurrency,
    string memory baseCurrency,
    string memory quoteCurrencySymbol,
    string memory baseCurrencySymbol
) private pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`quoteCurrency`|`string`|The quote currency|
|`baseCurrency`|`string`|The base currency|
|`quoteCurrencySymbol`|`string`|The quote currency symbol|
|`baseCurrencySymbol`|`string`|The base currency symbol|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the border NFT's border text|


### generateSVGCardMantle

Generate the SVG for the card mantle displaying the quote and base currency symbols and fee tier


```solidity
function generateSVGCardMantle(
    string memory quoteCurrencySymbol,
    string memory baseCurrencySymbol,
    string memory feeTier
) private pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`quoteCurrencySymbol`|`string`|The quote currency symbol|
|`baseCurrencySymbol`|`string`|The base currency symbol|
|`feeTier`|`string`|The fee tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the card mantle|


### generageSvgCurve

Generate the SVG for the curve that represents the position. Fade up (top is faded) if current price is above your position range, fade down (bottom is faded) if current price is below your position range
Circles are generated at the ends of the curve if the position is in range, or at one end of the curve it is on if not in range


```solidity
function generageSvgCurve(int24 tickLower, int24 tickUpper, int24 tickSpacing, int8 overRange)
    private
    pure
    returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick|
|`tickUpper`|`int24`|The upper tick|
|`tickSpacing`|`int24`|The tick spacing|
|`overRange`|`int8`|Whether the current tick is in range, over range, or under range|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the curve|


### getCurve

Get the curve based on the tick range
The smaller the tick range, the smaller/more linear the curve


```solidity
function getCurve(int24 tickLower, int24 tickUpper, int24 tickSpacing) internal pure returns (string memory curve);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick|
|`tickUpper`|`int24`|The upper tick|
|`tickSpacing`|`int24`|The tick spacing|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`curve`|`string`|The curve path|


### generateSVGCurveCircle

Generate the SVG for the circles on the curve


```solidity
function generateSVGCurveCircle(int8 overRange) internal pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`overRange`|`int8`|0 if the current tick is in range, 1 if the current tick is over range, -1 if the current tick is under range|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the circles|


### generateSVGPositionDataAndLocationCurve

If the position is over or under range, generate one circle at the end of the curve on the side of the range it is on with a larger circle around it
If the position is in range, generate two circles at the ends of the curve

Generate the SVG for the position data (token ID, hooks address, min tick, max tick) and the location curve (where your position falls on the curve)


```solidity
function generateSVGPositionDataAndLocationCurve(string memory tokenId, address hook, int24 tickLower, int24 tickUpper)
    private
    pure
    returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`string`|The token ID|
|`hook`|`address`|The hooks address|
|`tickLower`|`int24`|The lower tick|
|`tickUpper`|`int24`|The upper tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the position data and location curve|


### substring


```solidity
function substring(string memory str, uint256 startIndex, uint256 endIndex) internal pure returns (string memory);
```

### tickToString


```solidity
function tickToString(int24 tick) private pure returns (string memory);
```

### rangeLocation

Get the location of where your position falls on the curve


```solidity
function rangeLocation(int24 tickLower, int24 tickUpper) internal pure returns (string memory, string memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickLower`|`int24`|The lower tick|
|`tickUpper`|`int24`|The upper tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|The x and y coordinates of the location of the liquidity|
|`<none>`|`string`||


### generateSVGRareSparkle

Generates the SVG for a rare sparkle if the NFT is rare. Else, returns an empty string


```solidity
function generateSVGRareSparkle(uint256 tokenId, address hooks) private pure returns (string memory svg);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The token ID|
|`hooks`|`address`|The hooks address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`svg`|`string`|The SVG for the rare sparkle|


### isRare

Determines if an NFT is rare based on the token ID and hooks address


```solidity
function isRare(uint256 tokenId, address hooks) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|The token ID|
|`hooks`|`address`|The hooks address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether the NFT is rare or not|


## Structs
### SVGParams

```solidity
struct SVGParams {
    string quoteCurrency;
    string baseCurrency;
    address hooks;
    string quoteCurrencySymbol;
    string baseCurrencySymbol;
    string feeTier;
    int24 tickLower;
    int24 tickUpper;
    int24 tickSpacing;
    int8 overRange;
    uint256 tokenId;
    string color0;
    string color1;
    string color2;
    string color3;
    string x1;
    string y1;
    string x2;
    string y2;
    string x3;
    string y3;
}
```

