# SlippageCheck
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/SlippageCheck.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

