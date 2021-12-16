Nonfungible tokens that support an approve via signature, i.e. permit


## Functions
### _getAndIncrementNonce
```solidity
  function _getAndIncrementNonce(
    uint256 tokenId
  ) internal virtual returns (uint256)
```

Gets the current nonce for a token ID and then increments it, returning the original value


### constructor
```solidity
  function constructor(
    string memory name_,
    string memory symbol_,
    string memory version_
  ) internal
```
Computes the nameHash and versionHash



### DOMAIN_SEPARATOR
```solidity
  function DOMAIN_SEPARATOR(
  ) public view override returns (bytes32)
```
The domain separator used in the permit signature



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bytes32 | domain seperator used in encoding of permit signature
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

