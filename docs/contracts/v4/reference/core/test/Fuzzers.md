# Fuzzers
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/Fuzzers.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
StdUtils


## State Variables
### _vm

```solidity
Vm internal constant _vm = Vm(address(uint160(uint256(keccak256("hevm cheat code")))));
```


## Functions
### boundLiquidityDelta


```solidity
function boundLiquidityDelta(PoolKey memory key, int256 liquidityDeltaUnbounded, int256 liquidityMaxByAmount)
    internal
    pure
    returns (int256);
```

### boundLiquidityDeltaTightly


```solidity
function boundLiquidityDeltaTightly(
    PoolKey memory key,
    int256 liquidityDeltaUnbounded,
    int256 liquidityMaxByAmount,
    uint256 maxPositions
) internal pure returns (int256);
```

### getLiquidityDeltaFromAmounts


```solidity
function getLiquidityDeltaFromAmounts(int24 tickLower, int24 tickUpper, uint160 sqrtPriceX96)
    internal
    pure
    returns (int256);
```

### boundTicks


```solidity
function boundTicks(int24 tickLower, int24 tickUpper, int24 tickSpacing) internal pure returns (int24, int24);
```

### boundTicks


```solidity
function boundTicks(PoolKey memory key, int24 tickLower, int24 tickUpper) internal pure returns (int24, int24);
```

### createRandomSqrtPriceX96


```solidity
function createRandomSqrtPriceX96(int24 tickSpacing, int256 seed) internal pure returns (uint160);
```

### createFuzzyLiquidityParams

*Obtain fuzzed and bounded parameters for creating liquidity*


```solidity
function createFuzzyLiquidityParams(
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    uint160 sqrtPriceX96
) internal pure returns (IPoolManager.ModifyLiquidityParams memory result);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The pool key|
|`params`|`IPoolManager.ModifyLiquidityParams`|IPoolManager.ModifyLiquidityParams Note that these parameters are unbounded|
|`sqrtPriceX96`|`uint160`|The current sqrt price|


### createFuzzyLiquidityParamsWithTightBound


```solidity
function createFuzzyLiquidityParamsWithTightBound(
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    uint160 sqrtPriceX96,
    uint256 maxPositions
) internal pure returns (IPoolManager.ModifyLiquidityParams memory result);
```

### createFuzzyLiquidity


```solidity
function createFuzzyLiquidity(
    PoolModifyLiquidityTest modifyLiquidityRouter,
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    uint160 sqrtPriceX96,
    bytes memory hookData
) internal returns (IPoolManager.ModifyLiquidityParams memory result, BalanceDelta delta);
```

### createFuzzyLiquidityWithTightBound


```solidity
function createFuzzyLiquidityWithTightBound(
    PoolModifyLiquidityTest modifyLiquidityRouter,
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    uint160 sqrtPriceX96,
    bytes memory hookData,
    uint256 maxPositions
) internal returns (IPoolManager.ModifyLiquidityParams memory result, BalanceDelta delta);
```

