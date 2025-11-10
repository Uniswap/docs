# IReleaser
[Git Source](https://github.com/Uniswap/phoenix-fees/blob/f7ccbcc4f1be2c8485a362f78f4f1ea34145b2b0/src/interfaces/IReleaser.sol)

**Inherits:**
[IResourceManager](/home/toda/dev/phoenix-fees/forge-docs/src/src/interfaces/base/IResourceManager.sol/interface.IResourceManager.md), [INonce](/home/toda/dev/phoenix-fees/forge-docs/src/src/interfaces/base/INonce.sol/interface.INonce.md)


## Functions
### TOKEN_JAR


```solidity
function TOKEN_JAR() external view returns (ITokenJar);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ITokenJar`|Address of the Token Jar contract that will release the assets|


### release

Releases assets to a specified recipient if the resource threshold is met


```solidity
function release(uint256 _nonce, Currency[] calldata assets, address recipient) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_nonce`|`uint256`|The nonce for the release, must equal to the contract nonce otherwise revert|
|`assets`|`Currency[]`|The list of assets (addresses) to release, which may have length limits Native tokens (Ether) are represented as the zero address|
|`recipient`|`address`|The address to receive the released assets, paid out by Token Jar|


