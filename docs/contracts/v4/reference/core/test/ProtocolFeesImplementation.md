# ProtocolFeesImplementation
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/ProtocolFeesImplementation.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

