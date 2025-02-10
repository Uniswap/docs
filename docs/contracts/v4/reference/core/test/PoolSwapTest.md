# PoolSwapTest
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/test/PoolSwapTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[PoolTestBase](contracts/v4/reference/core/test/PoolTestBase.md)


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) PoolTestBase(_manager);
```

### swap


```solidity
function swap(
    PoolKey memory key,
    IPoolManager.SwapParams memory params,
    TestSettings memory testSettings,
    bytes memory hookData
) external payable returns (BalanceDelta delta);
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata rawData) external returns (bytes memory);
```

## Errors
### NoSwapOccurred

```solidity
error NoSwapOccurred();
```

## Structs
### CallbackData

```solidity
struct CallbackData {
    address sender;
    TestSettings testSettings;
    PoolKey key;
    IPoolManager.SwapParams params;
    bytes hookData;
}
```

### TestSettings

```solidity
struct TestSettings {
    bool takeClaims;
    bool settleUsingBurn;
}
```

