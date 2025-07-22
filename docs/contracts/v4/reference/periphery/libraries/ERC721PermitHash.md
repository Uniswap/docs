# ERC721PermitHash
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/libraries/ERC721PermitHash.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)


## State Variables
### PERMIT_TYPEHASH
*Value is equal to keccak256("Permit(address spender,uint256 tokenId,uint256 nonce,uint256 deadline)");*


```solidity
bytes32 constant PERMIT_TYPEHASH = 0x49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad;
```


### PERMIT_FOR_ALL_TYPEHASH
*Value is equal to keccak256("PermitForAll(address operator,bool approved,uint256 nonce,uint256 deadline)");*


```solidity
bytes32 constant PERMIT_FOR_ALL_TYPEHASH = 0x6673cb397ee2a50b6b8401653d3638b4ac8b3db9c28aa6870ffceb7574ec2f76;
```


## Functions
### hashPermit

Hashes the data that will be signed for IERC721Permit_v4.permit()


```solidity
function hashPermit(address spender, uint256 tokenId, uint256 nonce, uint256 deadline)
    internal
    pure
    returns (bytes32 digest);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The address which may spend the tokenId|
|`tokenId`|`uint256`|The tokenId of the owner, which may be spent by spender|
|`nonce`|`uint256`|A unique non-ordered value for each signature to prevent replay attacks|
|`deadline`|`uint256`|The time at which the signature expires|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`digest`|`bytes32`|The hash of the data to be signed; the equivalent to keccak256(abi.encode(PERMIT_TYPEHASH, spender, tokenId, nonce, deadline));|


### hashPermitForAll

Hashes the data that will be signed for IERC721Permit_v4.permit()


```solidity
function hashPermitForAll(address operator, bool approved, uint256 nonce, uint256 deadline)
    internal
    pure
    returns (bytes32 digest);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|The address which may spend any of the owner's tokenIds|
|`approved`|`bool`|true if the operator is to have full permission over the owner's tokenIds; false otherwise|
|`nonce`|`uint256`|A unique non-ordered value for each signature to prevent replay attacks|
|`deadline`|`uint256`|The time at which the signature expires|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`digest`|`bytes32`|The hash of the data to be signed; the equivalent to keccak256(abi.encode(PERMIT_FOR_ALL_TYPEHASH, operator, approved, nonce, deadline));|


