# PoolTakeTest
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/PoolTakeTest.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[PoolTestBase](contracts/v4/reference/core/test/PoolTestBase.md)


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) PoolTestBase(_manager);
```

### take


```solidity
function take(PoolKey memory key, uint256 amount0, uint256 amount1) external payable;
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata rawData) external returns (bytes memory);
```

### _testTake


```solidity
function _testTake(Currency currency, address sender, uint256 amount) internal;
```

## Structs
### CallbackData

```solidity
struct CallbackData {
    address sender;
    PoolKey key;
    uint256 amount0;
    uint256 amount1;
}
```

