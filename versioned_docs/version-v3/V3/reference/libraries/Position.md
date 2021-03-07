
## `Position`

Positions represent an owner address' liquidity between a lower and upper tick boundary

Positions store additional state for tracking fees owed to the position


 ```solidity 
 function get(
     mapping(bytes32 => struct Position.Info) self, address owner, int24 tickLower, int24 tickUpper<br/>
   )(internal) returns (struct Position.Info position)
 ``` 

Returns the Info struct of a position, given an owner and position boundaries



self: The mapping containing all user positions

owner: The address of the position owner

tickLower: The lower tick boundary of the position

tickUpper: The upper tick boundary of the position


position: The position info struct of the given owners' position

 ```solidity 
 function update(
     struct Position.Info self, int128 liquidityDelta, uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128<br/>
   )(internal)
 ``` 

Credits accumulated fees to a user's position



self: The mapping containing all user positions

liquidityDelta: The change in pool liquidity as a result of the position update

feeGrowthInside0X128: The all-time fee growth in token0, per unit of liquidity, inside the position's tick boundaries

feeGrowthInside1X128: The all-time fee growth in token1, per unit of liquidity, inside the position's tick boundaries



