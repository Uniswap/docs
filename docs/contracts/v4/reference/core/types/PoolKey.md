# PoolKey
[Git Source](https://github.com/uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/types/PoolKey.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

