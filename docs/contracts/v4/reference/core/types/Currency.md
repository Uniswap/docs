# greaterThanOrEqualTo
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


```solidity
function greaterThanOrEqualTo(Currency currency, Currency other) pure returns (bool);
```

# Currency
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol)


```solidity
type Currency is address;
```

# CurrencyLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol)

*This library allows for transferring and holding native tokens and ERC20 tokens*


## State Variables
### ADDRESS_ZERO
A constant to represent the native currency


```solidity
Currency public constant ADDRESS_ZERO = Currency.wrap(address(0));
```


## Functions
### transfer


```solidity
function transfer(Currency currency, address to, uint256 amount) internal;
```

### balanceOfSelf


```solidity
function balanceOfSelf(Currency currency) internal view returns (uint256);
```

### balanceOf


```solidity
function balanceOf(Currency currency, address owner) internal view returns (uint256);
```

### isAddressZero


```solidity
function isAddressZero(Currency currency) internal pure returns (bool);
```

### toId


```solidity
function toId(Currency currency) internal pure returns (uint256);
```

### fromId


```solidity
function fromId(uint256 id) internal pure returns (Currency);
```

## Errors
### NativeTransferFailed
Additional context for ERC-7751 wrapped error when a native transfer fails


```solidity
error NativeTransferFailed();
```

### ERC20TransferFailed
Additional context for ERC-7751 wrapped error when an ERC20 transfer fails


```solidity
error ERC20TransferFailed();
```

# lessThan
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol)


```solidity
function lessThan(Currency currency, Currency other) pure returns (bool);
```

# equals
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol)


```solidity
function equals(Currency currency, Currency other) pure returns (bool);
```

# greaterThan
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/Currency.sol)


```solidity
function greaterThan(Currency currency, Currency other) pure returns (bool);
```

