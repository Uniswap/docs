# PoolInitializer_v4
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/base/PoolInitializer_v4.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ImmutableState](contracts/v4/reference/periphery/base/ImmutableState.md), [IPoolInitializer_v4](contracts/v4/reference/periphery/interfaces/IPoolInitializer_v4.md)

Initializes a Uniswap v4 Pool

*Enables create pool + mint liquidity in a single transaction with multicall*


## Functions
### initializePool

Initialize a Uniswap v4 Pool

*If the pool is already initialized, this function will not revert and just return type(int24).max*


```solidity
function initializePool(PoolKey calldata key, uint160 sqrtPriceX96) external payable returns (int24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`key`|`PoolKey`|The PoolKey of the pool to initialize|
|`sqrtPriceX96`|`uint160`|The initial starting price of the pool, expressed as a sqrtPriceX96|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int24`|The current tick of the pool, or type(int24).max if the pool creation failed, or the pool already existed|


