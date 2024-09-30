# TickBitmap
[Git Source](https://github.com/Uniswap/v4-core/blob/1141642f8ba4665a50660886a8a8401526677045/src/libraries/TickBitmap.sol)
| Generated with [forge doc](https://book.getfoundry.sh/reference/forge/forge-doc)

Stores a packed mapping of tick index to its initialized state

*The mapping uses int16 for keys since ticks are represented as int24 and there are 256 (2^8) values per word.*


## Functions
### compress

*round towards negative infinity*


```solidity
function compress(int24 tick, int24 tickSpacing) internal pure returns (int24 compressed);
```

### position

Computes the position in the mapping where the initialized bit for a tick lives


```solidity
function position(int24 tick) internal pure returns (int16 wordPos, uint8 bitPos);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|The tick for which to compute the position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`wordPos`|`int16`|The key in the mapping containing the word in which the bit is stored|
|`bitPos`|`uint8`|The bit position in the word where the flag is stored|


### flipTick

Flips the initialized state for a given tick from false to true, or vice versa


```solidity
function flipTick(mapping(int16 => uint256) storage self, int24 tick, int24 tickSpacing) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`mapping(int16 => uint256)`|The mapping in which to flip the tick|
|`tick`|`int24`|The tick to flip|
|`tickSpacing`|`int24`|The spacing between usable ticks|


### nextInitializedTickWithinOneWord

Returns the next initialized tick contained in the same word (or adjacent word) as the tick that is either
to the left (less than or equal to) or right (greater than) of the given tick


```solidity
function nextInitializedTickWithinOneWord(
    mapping(int16 => uint256) storage self,
    int24 tick,
    int24 tickSpacing,
    bool lte
) internal view returns (int24 next, bool initialized);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`self`|`mapping(int16 => uint256)`|The mapping in which to compute the next initialized tick|
|`tick`|`int24`|The starting tick|
|`tickSpacing`|`int24`|The spacing between usable ticks|
|`lte`|`bool`|Whether to search for the next initialized tick to the left (less than or equal to the starting tick)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`next`|`int24`|The next initialized or uninitialized tick up to 256 ticks away from the current tick|
|`initialized`|`bool`|Whether the next tick is initialized, as the function only searches within up to 256 ticks|


## Errors
### TickMisaligned
Thrown when the tick is not enumerated by the tick spacing


```solidity
error TickMisaligned(int24 tick, int24 tickSpacing);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`int24`|the invalid tick|
|`tickSpacing`|`int24`|The tick spacing of the pool|

