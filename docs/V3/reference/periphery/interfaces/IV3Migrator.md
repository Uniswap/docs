Enables migration of liqudity from Uniswap v2-compatible pairs into Uniswap v3 pools


## Functions
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

