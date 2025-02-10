# ReentrancyLock
[Git Source](https://github.com/uniswap/v4-periphery/blob/cf451c4f55f36ea64c2007d331e3a3574225fc8b/src/base/ReentrancyLock.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

A transient reentrancy lock, that stores the caller's address as the lock


## Functions
### isNotLocked


```solidity
modifier isNotLocked();
```

### _getLocker


```solidity
function _getLocker() internal view returns (address);
```

## Errors
### ContractLocked

```solidity
error ContractLocked();
```

