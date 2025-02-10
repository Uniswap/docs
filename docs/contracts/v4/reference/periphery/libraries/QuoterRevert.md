# QuoterRevert
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/libraries/QuoterRevert.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### revertQuote

reverts, where the revert data is the provided bytes

*called when quoting, to record the quote amount in an error*

*QuoteSwap is used to differentiate this error from other errors thrown when simulating the swap*


```solidity
function revertQuote(uint256 quoteAmount) internal pure;
```

### bubbleReason

reverts using the revertData as the reason

*to bubble up both the valid QuoteSwap(amount) error, or an alternative error thrown during simulation*


```solidity
function bubbleReason(bytes memory revertData) internal pure;
```

### parseQuoteAmount

validates whether a revert reason is a valid swap quote or not
if valid, it decodes the quote to return. Otherwise it reverts.


```solidity
function parseQuoteAmount(bytes memory reason) internal pure returns (uint256 quoteAmount);
```

## Errors
### UnexpectedRevertBytes
error thrown when invalid revert bytes are thrown by the quote


```solidity
error UnexpectedRevertBytes(bytes revertData);
```

### QuoteSwap
error thrown containing the quote as the data, to be caught and parsed later


```solidity
error QuoteSwap(uint256 amount);
```

