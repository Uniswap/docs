# CurrencyRatioSortOrder
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/libraries/CurrencyRatioSortOrder.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Provides constants for sorting currencies when displaying price ratios
Currencies given larger values will be in the numerator of the price ratio

*Reference: https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/TokenRatioSortOrder.sol*


## State Variables
### NUMERATOR_MOST

```solidity
int256 constant NUMERATOR_MOST = 300;
```


### NUMERATOR_MORE

```solidity
int256 constant NUMERATOR_MORE = 200;
```


### NUMERATOR

```solidity
int256 constant NUMERATOR = 100;
```


### DENOMINATOR_MOST

```solidity
int256 constant DENOMINATOR_MOST = -300;
```


### DENOMINATOR_MORE

```solidity
int256 constant DENOMINATOR_MORE = -200;
```


### DENOMINATOR

```solidity
int256 constant DENOMINATOR = -100;
```


