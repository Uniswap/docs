These parameters are fixed for a pool forever, i.e., the methods will always return the same values

## factory
```solidity
  function factory(
    
  ) external returns (address)
```
No description

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | contract address
## token0
```solidity
  function token0(
    
  ) external returns (address)
```
No description

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | token contract address
## token1
```solidity
  function token1(
    
  ) external returns (address)
```
No description

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | token contract address
## fee
```solidity
  function fee(
    
  ) external returns (uint24)
```
No description

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | fee
## tickSpacing
```solidity
  function tickSpacing(
    
  ) external returns (int24)
```
Ticks can only be used at multiples of this value, minimum of 1 and always positive
e.g.: a tickSpacing of 3 means ticks can be initialized every 3rd tick, i.e., ..., -6, -3, 0, 3, 6, ...
This value is an int24 to avoid casting even though it is always positive.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | tick spacing
## maxLiquidityPerTick
```solidity
  function maxLiquidityPerTick(
    
  ) external returns (uint128)
```
This parameter is enforced per tick to prevent liquidity from overflowing a uint128 at any point, and
also prevents out-of-range liquidity from being used to prevent adding in-range liquidity to a pool


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | max amount of liquidity per tick
