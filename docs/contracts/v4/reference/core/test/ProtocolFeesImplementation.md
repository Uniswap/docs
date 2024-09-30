# ProtocolFeesImplementation
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/ProtocolFeesImplementation.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

### fetchProtocolFee


```solidity
function fetchProtocolFee(PoolKey memory key) public returns (uint24);
```

### updateProtocolFees


```solidity
function updateProtocolFees(Currency currency, uint256 amount) public;
```

