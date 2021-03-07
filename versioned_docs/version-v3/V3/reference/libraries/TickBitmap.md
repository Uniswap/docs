
## `TickBitmap`

Stores a packed mapping of tick index to its initialized state

The mapping uses int16 for keys since ticks are represented as int24 and there are 256 (2^8) values per word.


 ```solidity 
 function flipTick(
     mapping(int16 => uint256) self, int24 tick, int24 tickSpacing<br/>
   )(internal)
 ``` 

Flips the initialized state for a given tick from false to true, or vice versa



self: The mapping in which to flip the tick

tick: The tick to flip

tickSpacing: The spacing between usable ticks


 ```solidity 
 function nextInitializedTickWithinOneWord(
     mapping(int16 => uint256) self, int24 tick, int24 tickSpacing, bool lte<br/>
   )(internal) returns (int24 next, bool initialized)
 ``` 

Returns the next initialized tick contained in the same word (or adjacent word) as the tick that is either
to the left (less than or equal to) or right (greater than) of the given tick



self: The mapping in which to compute the next initialized tick

tick: The starting tick

tickSpacing: The spacing between usable ticks

lte: Whether to search for the next initialized tick to the left (less than or equal to the starting tick)


next: The next initialized or uninitialized tick up to 256 ticks away from the current tick

initialized: Whether the next tick is initialized, as the function only searches within up to 256 ticks


