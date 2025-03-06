# UnorderedNonce
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/base/UnorderedNonce.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
[IUnorderedNonce](contracts/v4/reference/periphery/interfaces/IUnorderedNonce.md)

Contract state and methods for using unordered nonces in signatures


## State Variables
### nonces
mapping of nonces consumed by each address, where a nonce is a single bit on the 256-bit bitmap

*word is at most type(uint248).max*


```solidity
mapping(address owner => mapping(uint256 word => uint256 bitmap)) public nonces;
```


## Functions
### _useUnorderedNonce

Consume a nonce, reverting if it has already been used


```solidity
function _useUnorderedNonce(address owner, uint256 nonce) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|address, the owner/signer of the nonce|
|`nonce`|`uint256`|uint256, the nonce to consume. The top 248 bits are the word, the bottom 8 bits indicate the bit position|


### revokeNonce

Revoke a nonce by spending it, preventing it from being used again

*Used in cases where a valid nonce has not been broadcasted onchain, and the owner wants to revoke the validity of the nonce*


```solidity
function revokeNonce(uint256 nonce) external payable;
```

