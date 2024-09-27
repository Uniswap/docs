# CurrencyLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/types/Currency.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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
### Wrap__NativeTransferFailed
Thrown when a native transfer fails


```solidity
error Wrap__NativeTransferFailed(address recipient, bytes reason);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`||
|`reason`|`bytes`|bubbled up revert reason|

### Wrap__ERC20TransferFailed
Thrown when an ERC20 transfer fails


```solidity
error Wrap__ERC20TransferFailed(address token, bytes reason);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`||
|`reason`|`bytes`|bubbled up revert reason|

