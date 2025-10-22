# V4FeeController
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/feeControllers/V4FeeController.sol)

**Inherits:**
Owned

Triggers the collection of protocol fees to a predefined fee sink.


## State Variables
### POOL_MANAGER

```solidity
IPoolManager public immutable POOL_MANAGER;
```


### feeSink

```solidity
address public feeSink;
```


### merkleRoot

```solidity
bytes32 public merkleRoot;
```


## Functions
### constructor


```solidity
constructor(address _poolManager, address _feeSink, address _owner) Owned(_owner);
```

### collect

Collects the protocol fees for the given currencies to the fee sink.


```solidity
function collect(
  Currency[] calldata currency,
  uint256[] calldata amountRequested,
  uint256[] calldata amountExpected
) external;
```
**Parameters**

| Name              | Type         | Description                                                   |
| ----------------- | ------------ | ------------------------------------------------------------- |
| `currency`        | `Currency[]` | The currencies to collect fees for.                           |
| `amountRequested` | `uint256[]`  | The amount of each currency to request.                       |
| `amountExpected`  | `uint256[]`  | The amount of each currency that is expected to be collected. |


### setMerkleRoot

Sets the merkle root for the fee controller.

*only callable by owner*


```solidity
function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner;
```
**Parameters**

| Name          | Type      | Description             |
| ------------- | --------- | ----------------------- |
| `_merkleRoot` | `bytes32` | The merkle root to set. |


### triggerFeeUpdate

Triggers the fee update for the given pool key.


```solidity
function triggerFeeUpdate(
  PoolKey calldata _poolKey,
  uint24 newProtocolFee,
  bytes32[] calldata proof
) external;
```
**Parameters**

| Name             | Type        | Description                                                                                                                                 |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `_poolKey`       | `PoolKey`   | The pool key to update the fee for.                                                                                                         |
| `newProtocolFee` | `uint24`    | The new protocol fee to set.                                                                                                                |
| `proof`          | `bytes32[]` | The merkle proof corresponding to the set merkle root. Merkle root is generated from leaves of keccak256(abi.encode(poolKey, protocolFee)). |


## Errors
### AmountCollectedTooLow
Thrown when the amount collected is less than the amount expected.


```solidity
error AmountCollectedTooLow(uint256 amountCollected, uint256 amountExpected);
```

### InvalidProof
Thrown when the merkle proof is invalid.


```solidity
error InvalidProof();
```

