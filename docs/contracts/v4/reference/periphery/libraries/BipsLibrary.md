# BipsLibrary
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/BipsLibrary.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


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

