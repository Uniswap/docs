


## Functions
### deploy
```solidity
  function deploy(
    address factory,
    address token0,
    address token1,
    uint24 fee,
    int24 tickSpacing
  ) internal returns (address pool)
```

Deploys a pool with the given parameters by transiently setting the parameters storage slot and then
clearing it after deploying the pool.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`factory` | address | The contract address of the Uniswap V3 factory
|`token0` | address | The first token of the pool by address sort order
|`token1` | address | The second token of the pool by address sort order
|`fee` | uint24 | The fee collected upon every swap in the pool, denominated in hundredths of a bip
|`tickSpacing` | int24 | The spacing between usable ticks

