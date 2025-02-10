# SwapMath
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/libraries/SwapMath.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Contains methods for computing the result of a swap within a single tick price range, i.e., a single tick.


## State Variables
### MAX_SWAP_FEE
the swap fee is represented in hundredths of a bip, so the max is 100%

*the swap fee is the total fee on a swap, including both LP and Protocol fee*


```solidity
uint256 internal constant MAX_SWAP_FEE = 1e6;
```


## Functions
### getSqrtPriceTarget

Computes the sqrt price target for the next swap step


```solidity
function getSqrtPriceTarget(bool zeroForOne, uint160 sqrtPriceNextX96, uint160 sqrtPriceLimitX96)
    internal
    pure
    returns (uint160 sqrtPriceTargetX96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`zeroForOne`|`bool`|The direction of the swap, true for currency0 to currency1, false for currency1 to currency0|
|`sqrtPriceNextX96`|`uint160`|The Q64.96 sqrt price for the next initialized tick|
|`sqrtPriceLimitX96`|`uint160`|The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceTargetX96`|`uint160`|The price target for the next swap step|


### computeSwapStep

Computes the result of swapping some amount in, or amount out, given the parameters of the swap

*If the swap's amountSpecified is negative, the combined fee and input amount will never exceed the absolute value of the remaining amount.*

*feePips must be no larger than MAX_SWAP_FEE for this function. We ensure that before setting a fee using LPFeeLibrary.isValid.*


```solidity
function computeSwapStep(
    uint160 sqrtPriceCurrentX96,
    uint160 sqrtPriceTargetX96,
    uint128 liquidity,
    int256 amountRemaining,
    uint24 feePips
) internal pure returns (uint160 sqrtPriceNextX96, uint256 amountIn, uint256 amountOut, uint256 feeAmount);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceCurrentX96`|`uint160`|The current sqrt price of the pool|
|`sqrtPriceTargetX96`|`uint160`|The price that cannot be exceeded, from which the direction of the swap is inferred|
|`liquidity`|`uint128`|The usable liquidity|
|`amountRemaining`|`int256`|How much input or output amount is remaining to be swapped in/out|
|`feePips`|`uint24`|The fee taken from the input amount, expressed in hundredths of a bip|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sqrtPriceNextX96`|`uint160`|The price after swapping the amount in/out, not to exceed the price target|
|`amountIn`|`uint256`|The amount to be swapped in, of either currency0 or currency1, based on the direction of the swap|
|`amountOut`|`uint256`|The amount to be received, of either currency0 or currency1, based on the direction of the swap|
|`feeAmount`|`uint256`|The amount of input that will be taken as a fee|


