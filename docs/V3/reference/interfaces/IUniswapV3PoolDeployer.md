A contract that constructs a pool must implement this to pass arguments to the pool

This is used to avoid having constructor arguments in the pool contract, which results in the init code hash
of the pool being constant allowing the CREATE2 address of the pool to be cheaply computed on-chain

## Functions
### parameters
```solidity
  function parameters(
  ) external view returns (address factory, address token0, address token1, uint24 fee, int24 tickSpacing)
```
Get the parameters to be used in constructing the pool, set transiently during pool creation.

Called by the pool constructor to fetch the parameters of the pool

#### Return Values :
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
| `factory `| address | The factory address
| `token0` | address | The first token of the pool by address sort order
| `token1` | address | The second token of the pool by address sort order
| `fee `| uint24 |The fee collected upon every swap in the pool, denominated in hundredths of a bip
| `tickSpacing` | int24 | The minimum number of ticks between initialized ticks


