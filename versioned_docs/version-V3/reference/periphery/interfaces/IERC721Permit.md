Extension to ERC721 that includes a permit function for signature based approvals


## Functions
### PERMIT_TYPEHASH
```solidity
  function PERMIT_TYPEHASH(
  ) external returns (bytes32)
```
The permit typehash used in the permit signature



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bytes32 | typehash for the permit
### DOMAIN_SEPARATOR
```solidity
  function DOMAIN_SEPARATOR(
  ) external returns (bytes32)
```
The domain separator used in the permit signature



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | domain seperator used in encoding of permit signature
### permit
```solidity
  function permit(
    address spender,
    uint256 tokenId,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```
Approve of a specific token ID for spending by spender via signature


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`spender` | address | The account that is being approved
|`tokenId` | uint256 | The ID of the token that is being approved for spending
|`deadline` | uint256 | The deadline timestamp by which the call must be mined for the approve to work
|`v` | uint8 | Must produce valid secp256k1 signature from the holder along with `r` and `s`
|`r` | bytes32 | Must produce valid secp256k1 signature from the holder along with `v` and `s`
|`s` | bytes32 | Must produce valid secp256k1 signature from the holder along with `r` and `v`

