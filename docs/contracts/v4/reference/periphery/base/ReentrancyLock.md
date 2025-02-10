# ReentrancyLock
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/base/ReentrancyLock.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

