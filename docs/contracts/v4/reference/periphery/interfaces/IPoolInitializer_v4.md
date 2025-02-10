# IPoolInitializer_v4
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/interfaces/IPoolInitializer_v4.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the PoolInitializer_v4 contract


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


