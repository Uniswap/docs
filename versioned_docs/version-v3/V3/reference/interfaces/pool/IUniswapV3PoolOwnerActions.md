Contains pool methods that may only be called by the factory owner

## setFeeProtocol
```solidity
  function setFeeProtocol(
    uint8 feeProtocol0, uint8 feeProtocol1
  ) external
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`feeProtocol0` |  | new protocol fee for token0 of the pool
|`feeProtocol1` |  | new protocol fee for token1 of the pool

## collectProtocol
```solidity
  function collectProtocol(
    address recipient, uint128 amount0Requested, uint128 amount1Requested
  ) external returns (uint128 amount0, uint128 amount1)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` |  | The address to which collected protocol fees should be sent
|`amount0Requested` |  | The maximum amount of token0 to send, can be 0 to collect fees in only token1
|`amount1Requested` |  | The maximum amount of token1 to send, can be 0 to collect fees in only token0

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`amount0`|  | The protocol fee collected in token0
|`amount1`|  | The protocol fee collected in token1
