# INonce
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/interfaces/base/INonce.sol)


## Functions
### nonce


```solidity
function nonce() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The contract's nonce|


## Errors
### InvalidNonce
Thrown when a user-provided nonce is not equal to the contract's nonce


```solidity
error InvalidNonce();
```

