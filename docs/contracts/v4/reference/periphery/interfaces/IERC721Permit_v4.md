# IERC721Permit_v4
[Git Source](https://github.com/uniswap/v4-periphery/blob/ea2bf2e1ba6863bb809fc2ff791744f308c4a26d/src/interfaces/IERC721Permit_v4.sol) - Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Interface for the ERC721Permit_v4 contract


## Functions
### permit

Approve of a specific token ID for spending by spender via signature

*payable so it can be multicalled with NATIVE related actions*


```solidity
function permit(address spender, uint256 tokenId, uint256 deadline, uint256 nonce, bytes calldata signature)
    external
    payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The account that is being approved|
|`tokenId`|`uint256`|The ID of the token that is being approved for spending|
|`deadline`|`uint256`|The deadline timestamp by which the call must be mined for the approve to work|
|`nonce`|`uint256`|a unique value, for an owner, to prevent replay attacks; an unordered nonce where the top 248 bits correspond to a word and the bottom 8 bits calculate the bit position of the word|
|`signature`|`bytes`|Concatenated data from a valid secp256k1 signature from the holder, i.e. abi.encodePacked(r, s, v)|


### permitForAll

Set an operator with full permission to an owner's tokens via signature

*payable so it can be multicalled with NATIVE related actions*


```solidity
function permitForAll(
    address owner,
    address operator,
    bool approved,
    uint256 deadline,
    uint256 nonce,
    bytes calldata signature
) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that is setting the operator|
|`operator`|`address`|The address that will be set as an operator for the owner|
|`approved`|`bool`|The permission to set on the operator|
|`deadline`|`uint256`|The deadline timestamp by which the call must be mined for the approve to work|
|`nonce`|`uint256`|a unique value, for an owner, to prevent replay attacks; an unordered nonce where the top 248 bits correspond to a word and the bottom 8 bits calculate the bit position of the word|
|`signature`|`bytes`|Concatenated data from a valid secp256k1 signature from the holder, i.e. abi.encodePacked(r, s, v)|


## Errors
### SignatureDeadlineExpired

```solidity
error SignatureDeadlineExpired();
```

### NoSelfPermit

```solidity
error NoSelfPermit();
```

### Unauthorized

```solidity
error Unauthorized();
```

