# ReentrancyLock
[Git Source](https://github.com/uniswap/v4-periphery/blob/3f295d8435e4f776ea2daeb96ce1bc6d63f33fc7/src/base/ReentrancyLock.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

