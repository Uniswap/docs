# PoolInitializer
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/PoolInitializer.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](/src/base/ImmutableState.sol/contract.ImmutableState.md)

Initializes a Uniswap v4 Pool

*Enables create pool + mint liquidity in a single transaction with multicall*


## Functions
### initializePool

Initialize a Uniswap v4 Pool


```solidity
function initializePool(PoolKey calldata key, uint160 sqrtPriceX96, bytes calldata hookData)
    external
    payable
    returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|the PoolKey of the pool to initialize|
|`sqrtPriceX96`|`uint160`|the initial sqrtPriceX96 of the pool|
|`hookData`|`bytes`|the optional data passed to the hook's initialize functions|


