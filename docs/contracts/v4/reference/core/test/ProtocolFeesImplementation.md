# ProtocolFeesImplementation
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/ProtocolFeesImplementation.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[ProtocolFees](contracts/v4/reference/core/ProtocolFees.md)


## State Variables
### _pools

```solidity
mapping(PoolId id => Pool.State) internal _pools;
```


### isUnlocked

```solidity
bool internal isUnlocked;
```


## Functions
### constructor


```solidity
constructor() ProtocolFees(msg.sender);
```

### setPrice


```solidity
function setPrice(PoolKey memory key, uint160 sqrtPriceX96) public;
```

### _getPool


```solidity
function _getPool(PoolId id) internal view override returns (Pool.State storage);
```

### setIsUnlocked


```solidity
function setIsUnlocked(bool newValue) public;
```

### _isUnlocked


```solidity
function _isUnlocked() internal view override returns (bool);
```

### updateProtocolFees


```solidity
function updateProtocolFees(Currency currency, uint256 amount) public;
```

