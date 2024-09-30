# PoolModifyLiquidityTestNoChecks
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/test/PoolModifyLiquidityTestNoChecks.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[PoolTestBase](contracts/v4/reference/core/test/PoolTestBase.md)


## Functions
### constructor


```solidity
constructor(IPoolManager _manager) PoolTestBase(_manager);
```

### modifyLiquidity


```solidity
function modifyLiquidity(PoolKey memory key, IPoolManager.ModifyLiquidityParams memory params, bytes memory hookData)
    external
    payable
    returns (BalanceDelta delta);
```

### modifyLiquidity


```solidity
function modifyLiquidity(
    PoolKey memory key,
    IPoolManager.ModifyLiquidityParams memory params,
    bytes memory hookData,
    bool settleUsingBurn,
    bool takeClaims
) public payable returns (BalanceDelta delta);
```

### unlockCallback


```solidity
function unlockCallback(bytes calldata rawData) external returns (bytes memory);
```

## Structs
### CallbackData

```solidity
struct CallbackData {
    address sender;
    PoolKey key;
    IPoolManager.ModifyLiquidityParams params;
    bytes hookData;
    bool settleUsingBurn;
    bool takeClaims;
}
```

