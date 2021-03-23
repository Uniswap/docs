Positions represent an owner address' liquidity between a lower and upper tick boundary

Positions store additional state for tracking fees owed to the position

## Functions
### get
```solidity
  function get(
    mapping(bytes32 => struct Position.Info) self,
    address owner,
    int24 tickLower,
    int24 tickUpper
  ) internal view returns (struct Position.Info position)
```
Returns the Info struct of a position, given an owner and position boundaries


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` | mapping(bytes32 => struct Position.Info) | The mapping containing all user positions
|`owner` | address | The address of the position owner
|`tickLower` | int24 | The lower tick boundary of the position
|`tickUpper` | int24 | The upper tick boundary of the position

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`position`| mapping(bytes32 => struct Position.Info) | The position info struct of the given owners' position
### update
```solidity
  function update(
    struct Position.Info self,
    int128 liquidityDelta,
    uint256 feeGrowthInside0X128,
    uint256 feeGrowthInside1X128
  ) internal
```
Credits accumulated fees to a user's position


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` | struct Position.Info | The mapping containing all user positions
|`liquidityDelta` | int128 | The change in pool liquidity as a result of the position update
|`feeGrowthInside0X128` | uint256 | The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries
|`feeGrowthInside1X128` | uint256 | The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries

