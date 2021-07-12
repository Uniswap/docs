


## Functions
### getPoolKey
```solidity
  function getPoolKey(
    address tokenA,
    address tokenB,
    uint24 fee
  ) internal returns (struct PoolAddress.PoolKey)
```
Returns PoolKey: the ordered tokens with the matched fee levels


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenA` | address | The first token of a pool, unsorted
|`tokenB` | address | The second token of a pool, unsorted
|`fee` | uint24 | The fee level of the pool

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Poolkey`| PoolAddress.PoolKey | The pool details with ordered token0 and token1 assignments
### computeAddress
```solidity
  function computeAddress(
    address factory,
    struct PoolAddress.PoolKey key
  ) internal returns (address pool)
```
Deterministically computes the pool address given the factory and PoolKey


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`factory` | address | The Uniswap V3 factory contract address
|`key` | struct PoolAddress.PoolKey | The PoolKey

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`pool`| address | The contract address of the V3 pool
