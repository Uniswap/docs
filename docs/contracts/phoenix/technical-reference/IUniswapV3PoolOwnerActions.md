# IUniswapV3PoolOwnerActions
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/interfaces/IUniswapV3PoolOwnerActions.sol)

Contains pool methods that may only be called by the factory owner

*Vendored from
https://github.com/Uniswap/v3-core/blob/d8b1c635c275d2a9450bd6a78f3fa2484fef73eb/contracts/interfaces/pool/IUniswapV3PoolOwnerActions.sol*


## Functions
### setFeeProtocol

Set the denominator of the protocol's % share of the fees


```solidity
function setFeeProtocol(uint8 feeProtocol0, uint8 feeProtocol1) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeProtocol0`|`uint8`|new protocol fee for token0 of the pool|
|`feeProtocol1`|`uint8`|new protocol fee for token1 of the pool|


### collectProtocol

Collect the protocol fee accrued to the pool


```solidity
function collectProtocol(address recipient, uint128 amount0Requested, uint128 amount1Requested)
  external
  returns (uint128 amount0, uint128 amount1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The address to which collected protocol fees should be sent|
|`amount0Requested`|`uint128`|The maximum amount of token0 to send, can be 0 to collect fees in only token1|
|`amount1Requested`|`uint128`|The maximum amount of token1 to send, can be 0 to collect fees in only token0|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amount0`|`uint128`|The protocol fee collected in token0|
|`amount1`|`uint128`|The protocol fee collected in token1|


