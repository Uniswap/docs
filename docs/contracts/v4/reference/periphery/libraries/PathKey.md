# PathKeyLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/PathKey.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Functions for working with PathKeys


## Functions
### getPoolAndSwapDirection

Get the pool and swap direction for a given PathKey


```solidity
function getPoolAndSwapDirection(PathKey calldata params, Currency currencyIn)
    internal
    pure
    returns (PoolKey memory poolKey, bool zeroForOne);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`PathKey`|the given PathKey|
|`currencyIn`|`Currency`|the input currency|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`PoolKey`|the pool key of the swap|
|`zeroForOne`|`bool`|the direction of the swap, true if currency0 is being swapped for currency1|


# PathKey
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/PathKey.sol)


```solidity
struct PathKey {
    Currency intermediateCurrency;
    uint24 fee;
    int24 tickSpacing;
    IHooks hooks;
    bytes hookData;
}
```

