# PoolInitializer
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/base/PoolInitializer.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md)

Initializes a Uniswap v4 Pool

*Enables create pool + mint liquidity in a single transaction with multicall*


## Functions
### initializePool

Initialize a Uniswap v4 Pool


```solidity
function initializePool(PoolKey calldata key, uint160 sqrtPriceX96) external payable returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|the PoolKey of the pool to initialize|
|`sqrtPriceX96`|`uint160`|the initial sqrtPriceX96 of the pool|


