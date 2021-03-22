Stores a packed mapping of tick index to its initialized state

The mapping uses int16 for keys since ticks are represented as int24 and there are 256 (2^8) values per word.

## Functions
### flipTick
```solidity
  function flipTick(
    mapping(int16 => uint256) self,
    int24 tick,
    int24 tickSpacing
  ) internal
```
Flips the initialized state for a given tick from false to true, or vice versa


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` | mapping(int16 => uint256) | The mapping in which to flip the tick
|`tick` | int24 | The tick to flip
|`tickSpacing` | int24 | The spacing between usable ticks

### nextInitializedTickWithinOneWord
```solidity
  function nextInitializedTickWithinOneWord(
    mapping(int16 => uint256) self,
    int24 tick,
    int24 tickSpacing,
    bool lte
  ) internal returns (int24 next, bool initialized)
```
Returns the next initialized tick contained in the same word (or adjacent word) as the tick that is either
to the left (less than or equal to) or right (greater than) of the given tick


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`self` | mapping(int16 => uint256) | The mapping in which to compute the next initialized tick
|`tick` | int24 | The starting tick
|`tickSpacing` | int24 | The spacing between usable ticks
|`lte` | bool | Whether to search for the next initialized tick to the left (less than or equal to the starting tick)

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`next`| mapping(int16 => uint256) | The next initialized or uninitialized tick up to 256 ticks away from the current tick
|`initialized`| int24 | Whether the next tick is initialized, as the function only searches within up to 256 ticks
