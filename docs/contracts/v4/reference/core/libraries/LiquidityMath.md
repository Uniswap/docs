# LiquidityMath
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/LiquidityMath.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### addDelta

Add a signed liquidity delta to liquidity and revert if it overflows or underflows


```solidity
function addDelta(uint128 x, int128 y) internal pure returns (uint128 z);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`x`|`uint128`|The liquidity before change|
|`y`|`int128`|The delta by which liquidity should be changed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`z`|`uint128`|The liquidity delta|


