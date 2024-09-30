# IProtocolFeeController
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/interfaces/IProtocolFeeController.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface to fetch the protocol fees for a pool from the protocol fee controller


## Functions
### protocolFeeForPool

Returns the protocol fees for a pool given the conditions of this contract


```solidity
function protocolFeeForPool(PoolKey memory poolKey) external view returns (uint24 protocolFee);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`poolKey`|`PoolKey`|The pool key to identify the pool. The controller may want to use attributes on the pool to determine the protocol fee, hence the entire key is needed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`protocolFee`|`uint24`|The pool's protocol fee, expressed in hundredths of a bip. The upper 12 bits are for 1->0 and the lower 12 are for 0->1. The maximum is 1000 - meaning the maximum protocol fee is 0.1%. the protocolFee is taken from the input first, then the lpFee is taken from the remaining input|


