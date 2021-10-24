Contains all events emitted by the pool


## Events
### Initialize
```solidity
  event Initialize(
    uint160 sqrtPriceX96,
    int24 tick
  )
```
Emitted exactly once by a pool when #initialize is first called on the pool

Mint/Burn/Swap cannot be emitted by the pool before Initialize

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sqrtPriceX96`| uint160 | The initial sqrt price of the pool, as a Q64.96
|`tick`| int24 | The initial tick of the pool, i.e. log base 1.0001 of the starting price of the pool
### Mint
```solidity
  event Mint(
    address sender,
    address owner,
    int24 tickLower,
    int24 tickUpper,
    uint128 amount,
    uint256 amount0,
    uint256 amount1
  )
```
Emitted when liquidity is minted for a given position


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sender`| address | The address that minted the liquidity
|`owner`| address | The owner of the position and recipient of any minted liquidity
|`tickLower`| int24 | The lower tick of the position
|`tickUpper`| int24 | The upper tick of the position
|`amount`| uint128 | The amount of liquidity minted to the position range
|`amount0`| uint256 | How much token0 was required for the minted liquidity
|`amount1`| uint256 | How much token1 was required for the minted liquidity
### Collect
```solidity
  event Collect(
    address owner,
    int24 tickLower,
    int24 tickUpper,
    uint128 amount0,
    uint128 amount1
  )
```
Emitted when fees are collected by the owner of a position

Collect events may be emitted with zero amount0 and amount1 when the caller chooses not to collect fees

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`owner`| address | The owner of the position for which fees are collected
|`tickLower`| int24 | The lower tick of the position
|`tickUpper`| int24 | The upper tick of the position
|`amount0`| uint128 | The amount of token0 fees collected
|`amount1`| uint128 | The amount of token1 fees collected
### Burn
```solidity
  event Burn(
    address owner,
    int24 tickLower,
    int24 tickUpper,
    uint128 amount,
    uint256 amount0,
    uint256 amount1
  )
```
Emitted when a position's liquidity is removed

Does not withdraw any fees earned by the liquidity position, which must be withdrawn via #collect

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`owner`| address | The owner of the position for which liquidity is removed
|`tickLower`| int24 | The lower tick of the position
|`tickUpper`| int24 | The upper tick of the position
|`amount`| uint128 | The amount of liquidity to remove
|`amount0`| uint256 | The amount of token0 withdrawn
|`amount1`| uint256 | The amount of token1 withdrawn
### Swap
```solidity
  event Swap(
    address sender,
    address recipient,
    int256 amount0,
    int256 amount1,
    uint160 sqrtPriceX96,
    uint128 liquidity,
    int24 tick
  )
```
Emitted by the pool for any swaps between token0 and token1


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sender`| address | The address that initiated the swap call, and that received the callback
|`recipient`| address | The address that received the output of the swap
|`amount0`| int256 | The delta of the token0 balance of the pool
|`amount1`| int256 | The delta of the token1 balance of the pool
|`sqrtPriceX96`| uint160 | The sqrt(price) of the pool after the swap, as a Q64.96
|`liquidity`| uint128 | The liquidity of the pool after the swap
|`tick`| int24 | The log base 1.0001 of price of the pool after the swap
### Flash
```solidity
  event Flash(
    address sender,
    address recipient,
    uint256 amount0,
    uint256 amount1,
    uint256 paid0,
    uint256 paid1
  )
```
Emitted by the pool for any flashes of token0/token1


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sender`| address | The address that initiated the swap call, and that received the callback
|`recipient`| address | The address that received the tokens from flash
|`amount0`| uint256 | The amount of token0 that was flashed
|`amount1`| uint256 | The amount of token1 that was flashed
|`paid0`| uint256 | The amount of token0 paid for the flash, which can exceed the amount0 plus the fee
|`paid1`| uint256 | The amount of token1 paid for the flash, which can exceed the amount1 plus the fee
### IncreaseObservationCardinalityNext
```solidity
  event IncreaseObservationCardinalityNext(
    uint16 observationCardinalityNextOld,
    uint16 observationCardinalityNextNew
  )
```
Emitted by the pool for increases to the number of observations that can be stored

observationCardinalityNext is not the observation cardinality until an observation is written at the index
just before a mint/swap/burn.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`observationCardinalityNextOld`| uint16 | The previous value of the next observation cardinality
|`observationCardinalityNextNew`| uint16 | The updated value of the next observation cardinality
### SetFeeProtocol
```solidity
  event SetFeeProtocol(
    uint8 feeProtocol0Old,
    uint8 feeProtocol1Old,
    uint8 feeProtocol0New,
    uint8 feeProtocol1New
  )
```
Emitted when the protocol fee is changed by the pool


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`feeProtocol0Old`| uint8 | The previous value of the token0 protocol fee
|`feeProtocol1Old`| uint8 | The previous value of the token1 protocol fee
|`feeProtocol0New`| uint8 | The updated value of the token0 protocol fee
|`feeProtocol1New`| uint8 | The updated value of the token1 protocol fee
### CollectProtocol
```solidity
  event CollectProtocol(
    address sender,
    address recipient,
    uint128 amount0,
    uint128 amount1
  )
```
Emitted when the collected protocol fees are withdrawn by the factory owner


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sender`| address | The address that collects the protocol fees
|`recipient`| address | The address that receives the collected protocol fees
|`amount0`| uint128 | The amount of token0 protocol fees that is withdrawn
|`amount1`| uint128 | The amount of token1 protocol fees that is withdrawn
