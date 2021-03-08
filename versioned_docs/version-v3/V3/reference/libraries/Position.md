Positions represent an owner address' liquidity between a lower and upper tick boundary

Positions store additional state for tracking fees owed to the position

## get
```solidity
  function get(
    mapping(bytes32 => struct Position.Info) self, address owner, int24 tickLower, int24 tickUpper
  ) internal returns (struct Position.Info position)
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all user positions
|`owner` |  | The address of the position owner
|`tickLower` |  | The lower tick boundary of the position
|`tickUpper` |  | The upper tick boundary of the position

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`position`|  | The position info struct of the given owners' position
## update
```solidity
  function update(
    struct Position.Info self, int128 liquidityDelta, uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128
  ) internal
```
No description
#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` |  | The mapping containing all user positions
|`liquidityDelta` |  | The change in pool liquidity as a result of the position update
|`feeGrowthInside0X128` |  | The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries
|`feeGrowthInside1X128` |  | The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries

