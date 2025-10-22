# ExchangeReleaser
[Git Source](https://github.com/Uniswap/protocol-fees/blob/38e66458d36a90d45d2da802d97629a7d8137a57/src/releasers/ExchangeReleaser.sol)

**Inherits:**
[IReleaser](/technical-reference/IReleaser), [ResourceManager](/technical-reference/ResourceManager), [Nonce](/technical-reference/Nonce)

A contract that releases assets from an AssetSink in exchange for transferring a
threshold
amount of a resource token

*Inherits from ResourceManager for resource transferring functionality and Nonce for replay
protection*

**Note:**
security-contact: security@uniswap.org


## State Variables
### ASSET_SINK

```solidity
IAssetSink public immutable ASSET_SINK;
```


## Functions
### constructor

Creates a new ExchangeReleaser instance


```solidity
constructor(address _resource, uint256 _threshold, address _assetSink, address _recipient)
  ResourceManager(_resource, _threshold, msg.sender, _recipient);
```
**Parameters**

| Name         | Type      | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| `_resource`  | `address` | The address of the resource token that must be transferred |
| `_threshold` | `uint256` |                                                            |
| `_assetSink` | `address` | The address of the AssetSink contract holding the assets   |
| `_recipient` | `address` | The address that will receive the resource tokens          |


### release

Releases assets to a specified recipient if the resource threshold is met


```solidity
function release(uint256 _nonce, Currency[] calldata assets, address recipient) external virtual;
```
**Parameters**

| Name        | Type         | Description                                                                                                                       |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `_nonce`    | `uint256`    | The nonce for the release, must equal to the contract nonce otherwise revert                                                      |
| `assets`    | `Currency[]` | The list of assets (addresses) to release, which may have length limits Native tokens (Ether) are represented as the zero address |
| `recipient` | `address`    | The address to receive the released assets, paid out by Asset Sink                                                                |


### _release

Internal function to handle the nonce check, transfer the RESOURCE, and call the
release of assets on the AssetSink.


```solidity
function _release(uint256 _nonce, Currency[] calldata assets, address recipient)
  internal
  handleNonce(_nonce);
```

