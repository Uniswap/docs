# BalanceDelta
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

*Two `int128` values packed into a single `int256` where the upper 128 bits represent the amount0
and the lower 128 bits represent the amount1.*


```solidity
type BalanceDelta is int256;
```

## BalanceDeltaLibrary
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)

Library for getting the amount0 and amount1 deltas from the BalanceDelta type


## State Variables
### ZERO_DELTA
A BalanceDelta of 0


```solidity
BalanceDelta public constant ZERO_DELTA = BalanceDelta.wrap(0);
```


## Functions
### amount0


```solidity
function amount0(BalanceDelta balanceDelta) internal pure returns (int128 _amount0);
```

### amount1


```solidity
function amount1(BalanceDelta balanceDelta) internal pure returns (int128 _amount1);
```

# sub
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)


```solidity
function sub(BalanceDelta a, BalanceDelta b) pure returns (BalanceDelta);
```

# toBalanceDelta
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)


```solidity
function toBalanceDelta(int128 _amount0, int128 _amount1) pure returns (BalanceDelta balanceDelta);
```

# eq
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)


```solidity
function eq(BalanceDelta a, BalanceDelta b) pure returns (bool);
```

# add
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)


```solidity
function add(BalanceDelta a, BalanceDelta b) pure returns (BalanceDelta);
```

# neq
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/BalanceDelta.sol)


```solidity
function neq(BalanceDelta a, BalanceDelta b) pure returns (bool);
```

