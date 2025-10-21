# IV3FeeController
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/interfaces/IV3FeeController.sol)


## Functions
### ASSET_SINK


```solidity
function ASSET_SINK() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address where collected fees are sent.|


### FACTORY


```solidity
function FACTORY() external view returns (IUniswapV3Factory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IUniswapV3Factory`|The Uniswap V3 Factory contract.|


### merkleRoot


```solidity
function merkleRoot() external view returns (bytes32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The current merkle root used to designate which pools have a fee enabled|


### feeSetter


```solidity
function feeSetter() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The authorized address to set fees-by-fee-tier AND the merkle root|


### feeTiers


```solidity
function feeTiers(uint256 i) external view returns (uint24);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The fee tiers enabled on the factory|


### storeFeeTier

Stores a fee tier.

*Must be a fee tier that exists on the Uniswap V3 Factory.*


```solidity
function storeFeeTier(uint24 feeTier) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeTier`|`uint24`|The fee tier to store.|


### defaultFees

Returns the default fee value for a given fee tier.


```solidity
function defaultFees(uint24 feeTier) external view returns (uint8 defaultFeeValue);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeTier`|`uint24`|The fee tier to query.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`defaultFeeValue`|`uint8`|The default fee value expressed as the denominator on the inclusive interval [4, 10]. The fee value is packed (token1Fee \<\< 4 \| token0Fee)|


### enableFeeAmount

Enables a new fee tier on the Uniswap V3 Factory.

*Only callable by `owner`. Also updates the `feeTiers` array.*


```solidity
function enableFeeAmount(uint24 newFeeTier, int24 tickSpacing) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeTier`|`uint24`|The fee tier to enable.|
|`tickSpacing`|`int24`|The corresponding tick spacing for the new fee tier.|


### setFactoryOwner

Sets the owner of the Uniswap V3 Factory.

*Only callable by `owner`*


```solidity
function setFactoryOwner(address newOwner) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newOwner`|`address`|The new owner of the Uniswap V3 Factory.|


### collect

Collects protocol fees from the specified pools to the designated `ASSET_SINK`


```solidity
function collect(CollectParams[] calldata collectParams)
  external
  returns (Collected[] memory amountsCollected);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collectParams`|`CollectParams[]`|Array of collection parameters for each pool.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountsCollected`|`Collected[]`|Array of collected amounts for each pool.|


### setMerkleRoot

Sets the merkle root used for designating which pools have the fee enabled.

*Only callable by `feeSetter`*


```solidity
function setMerkleRoot(bytes32 _merkleRoot) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_merkleRoot`|`bytes32`|The new merkle root to set.|


### setDefaultFeeByFeeTier

Sets the default fee value for a specific fee tier.


```solidity
function setDefaultFeeByFeeTier(uint24 feeTier, uint8 defaultFeeValue) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeTier`|`uint24`|The fee tier, expressed in pips, to set the default fee for.|
|`defaultFeeValue`|`uint8`|The default fee value to set, expressed as the denominator on the inclusive interval [4, 10]. The fee value is packed (token1Fee \<\< 4 \| token0Fee)|


### triggerFeeUpdate

Triggers a fee update for a single pool with merkle proof verification.


```solidity
function triggerFeeUpdate(address pool, bytes32[] calldata merkleProof) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`address`|The pool address to update the fee for.|
|`merkleProof`|`bytes32[]`|The merkle proof corresponding to the set merkle root.|


### triggerFeeUpdate

Triggers a fee update for one pair of tokens with merkle proof verification. There may
be multiple pools initialized from the given pair.

*Assumes that token0 < token1.*


```solidity
function triggerFeeUpdate(address token0, address token1, bytes32[] calldata proof) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`|The first token of the pair.|
|`token1`|`address`|The second token of the pair.|
|`proof`|`bytes32[]`|The merkle proof corresponding to the set merkle root.|


### batchTriggerFeeUpdate

Triggers fee updates for multiple pairs of tokens with batch merkle proof
verification.

*Assumes that token0 < token1 in the token pair.*


```solidity
function batchTriggerFeeUpdate(
  Pair[] calldata pairs,
  bytes32[] calldata proof,
  bool[] calldata proofFlags
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pairs`|`Pair[]`|The pair of two tokens. There may be multiple pools initialized from the same pair.|
|`proof`|`bytes32[]`|The merkle proof corresponding to the set merkle root.|
|`proofFlags`|`bool[]`|The flags for the merkle proof verification.|


### setFeeSetter

Sets a new fee setter address.


```solidity
function setFeeSetter(address newFeeSetter) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeSetter`|`address`|The new address authorized to set fees and merkle roots.|


## Errors
### InvalidProof
Thrown when the merkle proof is invalid.


```solidity
error InvalidProof();
```

### InvalidFeeTier
Thrown when trying to set a default fee for a non-enabled fee tier.


```solidity
error InvalidFeeTier();
```

### Unauthorized
Thrown when an unauthorized address attempts to call a restricted function


```solidity
error Unauthorized();
```

### TierAlreadyStored
Thrown when trying to store a fee tier that is already stored.


```solidity
error TierAlreadyStored();
```

## Structs
### CollectParams
The input parameters for the collection.


```solidity
struct CollectParams {
  address pool;
  uint128 amount0Requested;
  uint128 amount1Requested;
}
```

### Collected
The returned amounts of token0 and token1 that are collected.


```solidity
struct Collected {
  uint128 amount0Collected;
  uint128 amount1Collected;
}
```

### Pair
The pair of tokens to trigger fees for. Each node in the merkle tree is the sorted
pair. If one pair in the merkle tree is (USDC, USDT), all pools consisting of those tokens
will be allowed to have a fee enabled.


```solidity
struct Pair {
  address token0;
  address token1;
}
```

