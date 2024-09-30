# SqrtPriceMathEchidnaTest
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/SqrtPriceMathEchidnaTest.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## Functions
### mulDivRoundingUpInvariants


```solidity
function mulDivRoundingUpInvariants(uint256 x, uint256 y, uint256 z) external pure;
```

### getNextSqrtPriceFromInputInvariants


```solidity
function getNextSqrtPriceFromInputInvariants(uint160 sqrtP, uint128 liquidity, uint256 amountIn, bool zeroForOne)
    external
    pure;
```

### getNextSqrtPriceFromOutputInvariants


```solidity
function getNextSqrtPriceFromOutputInvariants(uint160 sqrtP, uint128 liquidity, uint256 amountOut, bool zeroForOne)
    external
    pure;
```

### getNextSqrtPriceFromAmount0RoundingUpInvariants


```solidity
function getNextSqrtPriceFromAmount0RoundingUpInvariants(uint160 sqrtPX96, uint128 liquidity, uint256 amount, bool add)
    external
    pure;
```

### getNextSqrtPriceFromAmount1RoundingDownInvariants


```solidity
function getNextSqrtPriceFromAmount1RoundingDownInvariants(
    uint160 sqrtPX96,
    uint128 liquidity,
    uint256 amount,
    bool add
) external pure;
```

### getAmount0DeltaInvariants


```solidity
function getAmount0DeltaInvariants(uint160 sqrtP, uint160 sqrtQ, uint128 liquidity) external pure;
```

### getAmount0DeltaEquivalency


```solidity
function getAmount0DeltaEquivalency(uint160 sqrtP, uint160 sqrtQ, uint128 liquidity, bool roundUp) external pure;
```

### getAmount1DeltaInvariants


```solidity
function getAmount1DeltaInvariants(uint160 sqrtP, uint160 sqrtQ, uint128 liquidity) external pure;
```

### getAmount0DeltaSignedInvariants


```solidity
function getAmount0DeltaSignedInvariants(uint160 sqrtP, uint160 sqrtQ, int128 liquidity) external pure;
```

### getAmount1DeltaSignedInvariants


```solidity
function getAmount1DeltaSignedInvariants(uint160 sqrtP, uint160 sqrtQ, int128 liquidity) external pure;
```

### getOutOfRangeMintInvariants


```solidity
function getOutOfRangeMintInvariants(uint160 sqrtA, uint160 sqrtB, int128 liquidity) external pure;
```

### getInRangeMintInvariants


```solidity
function getInRangeMintInvariants(uint160 sqrtLower, uint160 sqrtCurrent, uint160 sqrtUpper, int128 liquidity)
    external
    pure;
```

