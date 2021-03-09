


## Functions
### deploy
```solidity
  function deploy(
    address factory, address token0, address token1, uint24 fee, int24 tickSpacing
  ) internal returns (address pool)
```

Deploys a pool with the given parameters by transiently setting the parameters storage slot and then
clearing it after deploying the pool.


