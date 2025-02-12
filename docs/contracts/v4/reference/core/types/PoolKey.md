# PoolKey
[Git Source](https://github.com/uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/types/PoolKey.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Returns the key for identifying a pool


```solidity
struct PoolKey {
    Currency currency0;
    Currency currency1;
    uint24 fee;
    int24 tickSpacing;
    IHooks hooks;
}
```

