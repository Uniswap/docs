# PoolKey
[Git Source](https://github.com/uniswap/v4-core/blob/d4185626c68e29de37023e453623d44cb9c12b51/src/types/PoolKey.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

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

