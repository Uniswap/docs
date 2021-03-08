A contract that constructs a pool must implement this to pass arguments to the pool

This is used to remove all constructor arguments from the pool enabling pool addresses to be computed cheaply
without storing the entire init code of the pool.
## parameters
```solidity
  function parameters(
    
  ) external returns (address factory, address token0, address token1, uint24 fee, int24 tickSpacing)
```
Get the parameters to be used in constructing the pool, set transiently during pool creation.

Called by the pool constructor to fetch the parameters of the pool
Returns factory The factory address
Returns token0 The first token of the pool by address sort order
Returns token1 The second token of the pool by address sort order
Returns fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
Returns tickSpacing The minimum number of ticks between initialized ticks


