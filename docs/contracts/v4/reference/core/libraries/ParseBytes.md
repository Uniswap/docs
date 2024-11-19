# ParseBytes
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/libraries/ParseBytes.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Parses bytes returned from hooks and the byte selector used to check return selectors from hooks.

*parseSelector also is used to parse the expected selector
For parsing hook returns, note that all hooks return either bytes4 or (bytes4, 32-byte-delta) or (bytes4, 32-byte-delta, uint24).*


## Functions
### parseSelector


```solidity
function parseSelector(bytes memory result) internal pure returns (bytes4 selector);
```

### parseFee


```solidity
function parseFee(bytes memory result) internal pure returns (uint24 lpFee);
```

### parseReturnDelta


```solidity
function parseReturnDelta(bytes memory result) internal pure returns (int256 hookReturn);
```

