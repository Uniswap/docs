# ExchangeReleaser
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/releasers/ExchangeReleaser.sol)

**Inherits:**
[IReleaser](/home/toda/dev/phoenix-fees/forge-docs/src/src/interfaces/IReleaser.sol/interface.IReleaser.md), [ResourceManager](/home/toda/dev/phoenix-fees/forge-docs/src/src/base/ResourceManager.sol/abstract.ResourceManager.md), [Nonce](/home/toda/dev/phoenix-fees/forge-docs/src/src/base/Nonce.sol/abstract.Nonce.md)

A contract that releases assets from an TokenJar in exchange for transferring a
threshold
amount of a resource token

Inherits from ResourceManager for resource transferring functionality and Nonce for replay
protection

**Note:**
security-contact: security@uniswap.org


## State Variables
### TOKEN_JAR

```solidity
ITokenJar public immutable TOKEN_JAR
```


## Functions
### constructor

Creates a new ExchangeReleaser instance


```solidity
constructor(address _resource, uint256 _threshold, address _tokenJar, address _recipient)
  ResourceManager(_resource, _threshold, msg.sender, _recipient);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_resource`|`address`|The address of the resource token that must be transferred|
|`_threshold`|`uint256`||
|`_tokenJar`|`address`|The address of the TokenJar contract holding the assets|
|`_recipient`|`address`|The address that will receive the resource tokens|


### release

Releases assets to a specified recipient if the resource threshold is met


```solidity
function release(uint256 _nonce, Currency[] calldata assets, address recipient) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nonce`|`uint256`|The nonce for the release, must equal to the contract nonce otherwise revert|
|`assets`|`Currency[]`|The list of assets (addresses) to release, which may have length limits Native tokens (Ether) are represented as the zero address|
|`recipient`|`address`|The address to receive the released assets, paid out by Token Jar|


### _release

Internal function to handle the nonce check, transfer the RESOURCE, and call the
release of assets on the TokenJar.


```solidity
function _release(uint256 _nonce, Currency[] calldata assets, address recipient)
  internal
  handleNonce(_nonce);
```

