Enables migration of liqudity from Uniswap v2-compatible pairs into Uniswap v3 pools


## Functions
### createAndInitializePoolIfNecessary
```solidity
  function createAndInitializePoolIfNecessary(
    address tokenA,
    address tokenB,
    uint24 fee,
    uint160 sqrtPriceX96
  ) external
```
Creates a new pool if it does not exist, then initializes if not initialized

This method can wrapped for use in multicall

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenA` | address | The contract address of either token0 or token1 in the v2 pair
We use tokenA and tokenB when we are referring to unsorted, or unordered tokens
|`tokenB` | address | The contract address of the other token, unsorted
|`fee` | uint24 | The fee amount of the v3 pool for the specified token pair
|`sqrtPriceX96` | uint160 | The initial square root price of the pool as a Q64.96 value

### migrate
```solidity
  function migrate(
    struct IV3Migrator.MigrateParams params
  ) external
```
Migrates liquidity to v3 by burning v2 liquidity and minting a new position for v3

Slippage protection is enforced via `amount{0,1}Min`, which should be a discount of the expected values of
the maximum amount of v3 liquidity that the v2 liquidity can get. For the special case of migrating to an
out-of-range position, `amount{0,1}Min` may be set to 0, enforcing that the position remains out of range

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`params` | struct IV3Migrator.MigrateParams | The params necessary to migrate v2 liquidity, encoded as `MigrateParams` in calldata

