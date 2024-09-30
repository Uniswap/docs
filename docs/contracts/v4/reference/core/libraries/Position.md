# Position
[Git Source](https://github.com/Uniswap/docs/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/Position.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Positions represent an owner address' liquidity between a lower and upper tick boundary

*Positions store additional state for tracking fees owed to the position*


## Functions
### get

Returns the State struct of a position, given an owner and position boundaries


```solidity
function get(mapping(bytes32 => State) storage self, address owner, int24 tickLower, int24 tickUpper, bytes32 salt)
    internal
    view
    returns (State storage position);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`mapping(bytes32 => State)`|The mapping containing all user positions|
|`owner`|`address`|The address of the position owner|
|`tickLower`|`int24`|The lower tick boundary of the position|
|`tickUpper`|`int24`|The upper tick boundary of the position|
|`salt`|`bytes32`|A unique value to differentiate between multiple positions in the same range|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`position`|`State`|The position info struct of the given owners' position|


### calculatePositionKey

A helper function to calculate the position key


```solidity
function calculatePositionKey(address owner, int24 tickLower, int24 tickUpper, bytes32 salt)
    internal
    pure
    returns (bytes32 positionKey);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the position owner|
|`tickLower`|`int24`|the lower tick boundary of the position|
|`tickUpper`|`int24`|the upper tick boundary of the position|
|`salt`|`bytes32`|A unique value to differentiate between multiple positions in the same range, by the same owner. Passed in by the caller.|


### update

Credits accumulated fees to a user's position


```solidity
function update(State storage self, int128 liquidityDelta, uint256 feeGrowthInside0X128, uint256 feeGrowthInside1X128)
    internal
    returns (uint256 feesOwed0, uint256 feesOwed1);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`State`|The individual position to update|
|`liquidityDelta`|`int128`|The change in pool liquidity as a result of the position update|
|`feeGrowthInside0X128`|`uint256`|The all-time fee growth in currency0, per unit of liquidity, inside the position's tick boundaries|
|`feeGrowthInside1X128`|`uint256`|The all-time fee growth in currency1, per unit of liquidity, inside the position's tick boundaries|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`feesOwed0`|`uint256`|The amount of currency0 owed to the position owner|
|`feesOwed1`|`uint256`|The amount of currency1 owed to the position owner|


## Errors
### CannotUpdateEmptyPosition
Cannot update a position with no liquidity


```solidity
error CannotUpdateEmptyPosition();
```

## Structs
### State

```solidity
struct State {
    uint128 liquidity;
    uint256 feeGrowthInside0LastX128;
    uint256 feeGrowthInside1LastX128;
}
```

