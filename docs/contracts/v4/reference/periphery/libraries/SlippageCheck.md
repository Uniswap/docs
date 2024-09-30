# SlippageCheck
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/libraries/SlippageCheck.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

a library for checking if a delta exceeds a maximum ceiling or fails to meet a minimum floor


## Functions
### validateMinOut

Revert if one or both deltas does not meet a minimum output

*This should be called when removing liquidity (burn or decrease)*


```solidity
function validateMinOut(BalanceDelta delta, uint128 amount0Min, uint128 amount1Min) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delta`|`BalanceDelta`|The principal amount of tokens to be removed, does not include any fees accrued|
|`amount0Min`|`uint128`|The minimum amount of token0 to receive|
|`amount1Min`|`uint128`|The minimum amount of token1 to receive|


### validateMaxIn

Revert if one or both deltas exceeds a maximum input

*This should be called when adding liquidity (mint or increase)*


```solidity
function validateMaxIn(BalanceDelta delta, uint128 amount0Max, uint128 amount1Max) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delta`|`BalanceDelta`|The principal amount of tokens to be added, does not include any fees accrued (which is possible on increase)|
|`amount0Max`|`uint128`|The maximum amount of token0 to spend|
|`amount1Max`|`uint128`|The maximum amount of token1 to spend|


## Errors
### MaximumAmountExceeded

```solidity
error MaximumAmountExceeded(uint128 maximumAmount, uint128 amountRequested);
```

### MinimumAmountInsufficient

```solidity
error MinimumAmountInsufficient(uint128 minimumAmount, uint128 amountReceived);
```

