Deploys Uniswap V3 pools and manages ownership and control over pool protocol fees

## Functions

### createPool

```solidity
  function createPool(
    address tokenA,
    address tokenB,
    uint24 fee
  ) external returns (address pool)
```

Creates a pool for the given two tokens and fee

tokenA and tokenB may be passed in either order: token0/token1 or token1/token0. tickSpacing is retrieved
from the fee. The call will revert if the pool already exists, the fee is invalid, or the token arguments
are invalid.

#### Parameters:

| Name     | Type    | Description                                     |
| :------- | :------ | :---------------------------------------------- |
| `tokenA` | address | One of the two tokens in the desired pool       |
| `tokenB` | address | The other of the two tokens in the desired pool |
| `fee`    | uint24  | The desired fee for the pool                    |

#### Return Values:

| Name   | Type    | Description                           |
| :----- | :------ | :------------------------------------ |
| `pool` | address | The address of the newly created pool |

### setOwner

```solidity
  function setOwner(
    address _owner
  ) external
```

Updates the owner of the factory

Must be called by the current owner

#### Parameters:

| Name     | Type    | Description                  |
| :------- | :------ | :--------------------------- |
| `_owner` | address | The new owner of the factory |

### enableFeeAmount

```solidity
  function enableFeeAmount(
    uint24 fee,
    int24 tickSpacing
  ) public
```

Enables a fee amount with the given tickSpacing

Fee amounts may never be removed once enabled

#### Parameters:

| Name          | Type   | Description                                                                              |
| :------------ | :----- | :--------------------------------------------------------------------------------------- |
| `fee`         | uint24 | The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)                 |
| `tickSpacing` | int24  | The spacing between ticks to be enforced for all pools created with the given fee amount |
