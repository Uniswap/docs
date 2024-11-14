# PoolSwapTest
[Git Source](https://github.com/uniswap/v4-core/blob/b619b6718e31aa5b4fa0286520c455ceb950276d/src/test/PoolSwapTest.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

