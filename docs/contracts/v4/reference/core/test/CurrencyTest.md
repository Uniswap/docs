# CurrencyTest
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/CurrencyTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### transfer


```solidity
function transfer(Currency currency, address to, uint256 amount) external;
```

### balanceOfSelf


```solidity
function balanceOfSelf(Currency currency) external view returns (uint256);
```

### balanceOf


```solidity
function balanceOf(Currency currency, address owner) external view returns (uint256);
```

### isAddressZero


```solidity
function isAddressZero(Currency currency) external pure returns (bool);
```

### toId


```solidity
function toId(Currency currency) external pure returns (uint256);
```

### fromId


```solidity
function fromId(uint256 id) external pure returns (Currency);
```

