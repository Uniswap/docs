Contains pool methods that may only be called by the factory owner


## Functions
### setFeeProtocol
```solidity
  function setFeeProtocol(
    uint8 feeProtocol0,
    uint8 feeProtocol1
  ) external
```
Set the denominator of the protocol's % share of the fees


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`feeProtocol0` | uint8 | new protocol fee for token0 of the pool
|`feeProtocol1` | uint8 | new protocol fee for token1 of the pool

### collectProtocol
```solidity
  function collectProtocol(
    address recipient,
    uint128 amount0Requested,
    uint128 amount1Requested
  ) external returns (uint128 amount0, uint128 amount1)
```
Collect the protocol fee accrued to the pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | The address to which collected protocol fees should be sent
|`amount0Requested` | uint128 | The maximum amount of token0 to send, can be 0 to collect fees in only token1
|`amount1Requested` | uint128 | The maximum amount of token1 to send, can be 0 to collect fees in only token0

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`| address | The protocol fee collected in token0
|`amount1`| uint128 | The protocol fee collected in token1
