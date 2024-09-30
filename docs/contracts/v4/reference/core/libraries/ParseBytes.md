# ParseBytes
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/ParseBytes.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

