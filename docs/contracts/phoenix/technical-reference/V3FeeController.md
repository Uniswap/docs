# V3FeeController
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/c991c8625e12bb19b2a7f4f51eca9f542351e095/src/feeControllers/V3FeeController.sol)

**Inherits:**
[IV3FeeController](/technical-reference/IV3FeeController), Owned

A contract that allows the setting and collecting of protocol fees per pool, and adding
new fee tiers to the Uniswap V3 Factory.

*This contract is ownable. The owner can set the merkle root for proving protocol fee
amounts per pool, set new fee tiers on Uniswap V3, and change the owner of this contract.
Note that this contract will be the set owner on the Uniswap V3 Factory.*

**Note:**
security-contact: security@uniswap.org


## State Variables
### FACTORY

```solidity
IUniswapV3Factory public immutable FACTORY;
```


### ASSET_SINK

```solidity
address public immutable ASSET_SINK;
```


### merkleRoot

```solidity
bytes32 public merkleRoot;
```


### feeSetter

```solidity
address public feeSetter;
```


### defaultFees
Returns the default fee value for a given fee tier.


```solidity
mapping(uint24 feeTier => uint8 defaultFeeValue) public defaultFees;
```


### feeTiers
*Returns four enabled fee tiers: 100, 500, 3000, 10000. May return more if more are
enabled.*


```solidity
uint24[] public feeTiers;
```


## Functions
### onlyFeeSetter

Ensures only the fee setter can call the setMerkleRoot and setDefaultFeeByFeeTier
functions


```solidity
modifier onlyFeeSetter();
```

### constructor

*At construction, the fee setter defaults to 0 and its on the owner to set.*


```solidity
constructor(address _factory, address _assetSink) Owned(msg.sender);
```

### storeFeeTier

Stores a fee tier.

*Must be a fee tier that exists on the Uniswap V3 Factory.*


```solidity
function storeFeeTier(uint24 feeTier) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeTier`|`uint24`|The fee tier to store.|


### enableFeeAmount

Enables a new fee tier on the Uniswap V3 Factory.

*Only callable by `owner`. Also updates the `feeTiers` array.*


```solidity
function enableFeeAmount(uint24 fee, int24 tickSpacing) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint24`||
|`tickSpacing`|`int24`|The corresponding tick spacing for the new fee tier.|


### setFactoryOwner


```solidity
function setFactoryOwner(address newOwner) external onlyOwner;
```

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
function setMerkleRoot(bytes32 _merkleRoot) external onlyFeeSetter;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_merkleRoot`|`bytes32`|The new merkle root to set.|


### setDefaultFeeByFeeTier

Sets the default fee value for a specific fee tier.


```solidity
function setDefaultFeeByFeeTier(uint24 feeTier, uint8 defaultFeeValue) external onlyFeeSetter;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeTier`|`uint24`|The fee tier, expressed in pips, to set the default fee for.|
|`defaultFeeValue`|`uint8`|The default fee value to set, expressed as the denominator on the inclusive interval [4, 10]. The fee value is packed (token1Fee \<\< 4 \| token0Fee)|


### setFeeSetter

Sets a new fee setter address.


```solidity
function setFeeSetter(address newFeeSetter) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newFeeSetter`|`address`|The new address authorized to set fees and merkle roots.|


### triggerFeeUpdate

Triggers a fee update for a single pool with merkle proof verification.


```solidity
function triggerFeeUpdate(address pool, bytes32[] calldata proof) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pool`|`address`|The pool address to update the fee for.|
|`proof`|`bytes32[]`||


### triggerFeeUpdate

Triggers a fee update for a single pool with merkle proof verification.


```solidity
function triggerFeeUpdate(address token0, address token1, bytes32[] calldata proof) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token0`|`address`||
|`token1`|`address`||
|`proof`|`bytes32[]`||


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


### _setProtocolFeesForPair


```solidity
function _setProtocolFeesForPair(address token0, address token1) internal;
```

### _setProtocolFee


```solidity
function _setProtocolFee(address pool, uint24 feeTier) internal;
```

### _doubleHash


```solidity
function _doubleHash(address token0, address token1) internal pure returns (bytes32 poolHash);
```

### _feeTierExists


```solidity
function _feeTierExists(uint24 feeTier) internal view returns (bool);
```

