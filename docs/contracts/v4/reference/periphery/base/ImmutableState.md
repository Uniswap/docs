# ImmutableState
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/base/ImmutableState.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IImmutableState](contracts/v4/reference/periphery/interfaces/IImmutableState.md)

A collection of immutable state variables, commonly used across multiple contracts


## State Variables
### poolManager
The Uniswap v4 PoolManager contract


```solidity
IPoolManager public immutable poolManager;
```


## Functions
### onlyPoolManager

Only allow calls from the PoolManager contract


```solidity
modifier onlyPoolManager();
```

### constructor


```solidity
constructor(IPoolManager _poolManager);
```

## Errors
### NotPoolManager
Thrown when the caller is not PoolManager


```solidity
error NotPoolManager();
```

