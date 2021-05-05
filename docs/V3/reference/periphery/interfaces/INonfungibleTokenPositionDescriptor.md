


## Functions
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
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| string | URI of the ERC721-compliant metadata
## Events
### UpdateTokenRatioPriority
```solidity
  event UpdateTokenRatioPriority(
    address token,
    int256 priority
  )
```
Emitted when a token is given a new priority order in the displayed price ratio


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token`| address | The token being given priority order
|`priority`| int256 | Represents priority in ratio - higher integers get numerator priority
