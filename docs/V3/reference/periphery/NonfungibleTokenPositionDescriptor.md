Produces a string containing the data URI for a JSON metadata string


## Functions
### constructor
```solidity
  function constructor(
  ) public
```

### tokenURI
```solidity
  function tokenURI(
    contract INonfungiblePositionManager positionManager,
    uint256 tokenId
  ) external returns (string)
```
Produces the URI describing a particular token ID for a position manager

Note this URI may be a data: URI with the JSON contents directly inlined

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`positionManager` | contract INonfungiblePositionManager | The position manager for which to describe the token
|`tokenId` | uint256 | The ID of the token for which to produce a description, which may not be valid

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| contract INonfungiblePositionManager | URI of the ERC721-compliant metadata
### flipRatio
```solidity
  function flipRatio(
  ) public returns (bool)
```

### tokenRatioPriority
```solidity
  function tokenRatioPriority(
  ) public returns (int256)
```




