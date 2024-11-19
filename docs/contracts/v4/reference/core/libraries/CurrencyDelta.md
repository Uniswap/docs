# CurrencyDelta
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/CurrencyDelta.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

*this library implements the equivalent of a mapping, as transient storage can only be accessed in assembly*


## Functions
### _computeSlot

calculates which storage slot a delta should be stored in for a given account and currency


```solidity
function _computeSlot(address target, Currency currency) internal pure returns (bytes32 hashSlot);
```

### getDelta


```solidity
function getDelta(Currency currency, address target) internal view returns (int256 delta);
```

### applyDelta

applies a new currency delta for a given account and currency


```solidity
function applyDelta(Currency currency, address target, int128 delta) internal returns (int256 previous, int256 next);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`previous`|`int256`|The prior value|
|`next`|`int256`|The modified result|


