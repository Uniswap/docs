# LiquidityAmounts
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/LiquidityAmounts.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Provides functions for computing liquidity amounts from token amounts and prices


## Functions
### getLiquidityForAmount0

Computes the amount of liquidity received for a given amount of token0 and price range

*Calculates amount0 * (sqrt(upper) * sqrt(lower)) / (sqrt(upper) - sqrt(lower))*


```solidity
function getLiquidityForAmount0(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, uint256 amount0)
    internal
    pure
    returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price representing the first tick boundary|
|`sqrtPriceBX96`|`uint160`|A sqrt price representing the second tick boundary|
|`amount0`|`uint256`|The amount0 being sent in|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The amount of returned liquidity|


### getLiquidityForAmount1

Computes the amount of liquidity received for a given amount of token1 and price range

*Calculates amount1 / (sqrt(upper) - sqrt(lower)).*


```solidity
function getLiquidityForAmount1(uint160 sqrtPriceAX96, uint160 sqrtPriceBX96, uint256 amount1)
    internal
    pure
    returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceAX96`|`uint160`|A sqrt price representing the first tick boundary|
|`sqrtPriceBX96`|`uint160`|A sqrt price representing the second tick boundary|
|`amount1`|`uint256`|The amount1 being sent in|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The amount of returned liquidity|


### getLiquidityForAmounts

Computes the maximum amount of liquidity received for a given amount of token0, token1, the current
pool prices and the prices at the tick boundaries


```solidity
function getLiquidityForAmounts(
    uint160 sqrtPriceX96,
    uint160 sqrtPriceAX96,
    uint160 sqrtPriceBX96,
    uint256 amount0,
    uint256 amount1
) internal pure returns (uint128 liquidity);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceX96`|`uint160`|A sqrt price representing the current pool prices|
|`sqrtPriceAX96`|`uint160`|A sqrt price representing the first tick boundary|
|`sqrtPriceBX96`|`uint160`|A sqrt price representing the second tick boundary|
|`amount0`|`uint256`|The amount of token0 being sent in|
|`amount1`|`uint256`|The amount of token1 being sent in|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liquidity`|`uint128`|The maximum amount of liquidity received|


