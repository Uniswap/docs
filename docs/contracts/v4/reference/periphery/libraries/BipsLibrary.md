# BipsLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/BipsLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### BPS_DENOMINATOR

```solidity
uint256 internal constant BPS_DENOMINATOR = 10_000;
```


## Functions
### calculatePortion


```solidity
function calculatePortion(uint256 amount, uint256 bips) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The total amount to calculate a percentage of|
|`bips`|`uint256`|The percentage to calculate, in bips|


## Errors
### InvalidBips
emitted when an invalid percentage is provided


```solidity
error InvalidBips();
```

