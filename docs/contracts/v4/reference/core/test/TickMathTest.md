# TickMathTest
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/TickMathTest.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### getSqrtPriceAtTick


```solidity
function getSqrtPriceAtTick(int24 tick) external pure returns (uint160);
```

### getGasCostOfGetSqrtPriceAtTick


```solidity
function getGasCostOfGetSqrtPriceAtTick(int24 tick) external view returns (uint256);
```

### getTickAtSqrtPrice


```solidity
function getTickAtSqrtPrice(uint160 sqrtPriceX96) external pure returns (int24);
```

### getGasCostOfGetTickAtSqrtPrice


```solidity
function getGasCostOfGetTickAtSqrtPrice(uint160 sqrtPriceX96) external view returns (uint256);
```

### MIN_SQRT_PRICE


```solidity
function MIN_SQRT_PRICE() external pure returns (uint160);
```

### MAX_SQRT_PRICE


```solidity
function MAX_SQRT_PRICE() external pure returns (uint160);
```

### MIN_TICK


```solidity
function MIN_TICK() external pure returns (int24);
```

### MAX_TICK


```solidity
function MAX_TICK() external pure returns (int24);
```

