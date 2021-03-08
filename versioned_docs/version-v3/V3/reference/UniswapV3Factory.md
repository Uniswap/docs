Deploys Uniswap V3 pools and manages ownership and control over pool protocol fees

## createPool
```solidity
  function createPool(
    address tokenA, address tokenB, uint24 fee
  ) external returns (address pool)
```
tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
are invalid.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`tokenA` |  | One of the two tokens in the desired pool
|`tokenB` |  | The other of the two tokens in the desired pool
|`fee` |  | The desired fee for the pool

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`pool`|  | The address of the newly created pool
## setOwner
```solidity
  function setOwner(
    address _owner
  ) external
```
Must be called by the current owner

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` |  | The new owner of the factory

## enableFeeAmount
```solidity
  function enableFeeAmount(
    uint24 fee, int24 tickSpacing
  ) public
```
Fee amounts may never be removed once enabled

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`fee` |  | The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
|`tickSpacing` |  | The spacing between ticks to be enforced for all pools created with the given fee amount

