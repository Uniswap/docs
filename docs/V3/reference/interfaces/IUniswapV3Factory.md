The Uniswap V3 Factory facilitates creation of Uniswap V3 pools and control over the protocol fees

# Events:
- [`OwnerChanged(address oldOwner, address newOwner)`](#IUniswapV3Factory-OwnerChanged-address-address-)
- [`PoolCreated(address token0, address token1, uint24 fee, int24 tickSpacing, address pool)`](#IUniswapV3Factory-PoolCreated-address-address-uint24-int24-address-)
- [`FeeAmountEnabled(uint24 fee, int24 tickSpacing)`](#IUniswapV3Factory-FeeAmountEnabled-uint24-int24-)
## owner
```solidity
  function owner(
    
  ) external returns (address)
```
Returns the current owner of the factory

Can be changed by the current owner via setOwner


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | address of the factory owner
## feeAmountTickSpacing
```solidity
  function feeAmountTickSpacing(
    uint24 fee
  ) external returns (int24)
```
Returns the tick spacing for a given fee amount, if enabled, or 0 if not enabled

A fee amount can never bee removed, so this value should be hard coded or cached in the calling context


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | tick spacing
## getPool
```solidity
  function getPool(
    address tokenA, address tokenB, uint24 fee
  ) external returns (address pool)
```
Returns the pool address for a given pair of tokens and a fee, or address 0 if it does not exist

tokenA and tokenB may be passed in either token0/token1 or token1/token0 order


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`pool`|  | The pool address
## createPool
```solidity
  function createPool(
    address tokenA, address tokenB, uint24 fee
  ) external returns (address pool)
```
Creates a pool for the given two tokens and fee

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
Updates the owner of the factory

Must be called by the current owner

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` |  | The new owner of the factory

## enableFeeAmount
```solidity
  function enableFeeAmount(
    uint24 fee, int24 tickSpacing
  ) external
```
Enables a fee amount with the given tickSpacing

Fee amounts may never be removed once enabled

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`fee` |  | The fee amount to enable, denominated in hundredths of a bip (i.e. 1e-6)
|`tickSpacing` |  | The spacing between ticks to be enforced for all pools created with the given fee amount

## Event `OwnerChanged(address oldOwner, address newOwner)`
Emitted when the owner of the factory is changed


## Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`oldOwner`|  | The owner before the owner was changed
|`newOwner`|  | The owner after the owner was changed
## Event `PoolCreated(address token0, address token1, uint24 fee, int24 tickSpacing, address pool)`
Emitted when a pool is created


## Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token0`|  | The first token of the pool by address sort order
|`token1`|  | The second token of the pool by address sort order
|`fee`|  | The fee collected upon every swap in the pool, denominated in hundredths of a bip
|`tickSpacing`|  | The minimum number of ticks between initialized ticks
|`pool`|  | The address of the created pool
## Event `FeeAmountEnabled(uint24 fee, int24 tickSpacing)`
Emitted when a new fee amount is enabled for pool creation via the factory


## Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`fee`|  | The enabled fee, denominated in hundredths of a bip
|`tickSpacing`|  | The minimum number of ticks between initialized ticks for pools created with the given fee
