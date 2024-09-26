# ERC721Permit_v4
[Git Source](https://github.com/Uniswap/v4-periphery/blob/47e3c30ae8a0d7c086bf3e41bd0e7e3a854e280b/src/base/ERC721Permit_v4.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

**Inherits:**
ERC721, [IERC721Permit_v4](contracts/v4/reference/periphery/interfaces/IERC721Permit_v4.md), [EIP712_v4](contracts/v4/reference/periphery/base/EIP712_v4.md), [UnorderedNonce](contracts/v4/reference/periphery/base/UnorderedNonce.md)

Nonfungible tokens that support an approve via signature, i.e. permit


## Functions
### constructor

Computes the nameHash and versionHash


```solidity
constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) EIP712_v4(name_);
```

### checkSignatureDeadline

Checks if the block's timestamp is before a signature's deadline


```solidity
modifier checkSignatureDeadline(uint256 deadline);
```

### permit

Approve of a specific token ID for spending by spender via signature

*payable so it can be multicalled with NATIVE related actions*


```solidity
function permit(address spender, uint256 tokenId, uint256 deadline, uint256 nonce, bytes calldata signature)
    external
    payable
    checkSignatureDeadline(deadline);
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
) external payable checkSignatureDeadline(deadline);
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


### setApprovalForAll

Enable or disable approval for a third party ("operator") to manage
all of `msg.sender`'s assets

*Emits the ApprovalForAll event. The contract MUST allow
multiple operators per owner.*

*Override Solmate's ERC721 setApprovalForAll so setApprovalForAll() and permit() share the _approveForAll method*


```solidity
function setApprovalForAll(address operator, bool approved) public override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator`|`address`|Address to add to the set of authorized operators|
|`approved`|`bool`|True if the operator is approved, false to revoke approval|


### _approveForAll


```solidity
function _approveForAll(address owner, address operator, bool approved) internal;
```

### approve

Change or reaffirm the approved address for an NFT

*override Solmate's ERC721 approve so approve() and permit() share the _approve method
Passing a spender address of zero can be used to remove any outstanding approvals
Throws error unless `msg.sender` is the current NFT owner,
or an authorized operator of the current owner.*


```solidity
function approve(address spender, uint256 id) public override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|The new approved NFT controller|
|`id`|`uint256`|The tokenId of the NFT to approve|


### _approve


```solidity
function _approve(address owner, address spender, uint256 id) internal;
```

### _isApprovedOrOwner


```solidity
function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool);
```

### tokenURI


```solidity
function tokenURI(uint256) public pure override returns (string memory);
```

