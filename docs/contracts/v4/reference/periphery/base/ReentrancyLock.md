# ReentrancyLock
[Git Source](https://github.com/Uniswap/docs/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/ReentrancyLock.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

