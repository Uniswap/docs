
## `SecondsOutside`

Stores packed 32 bit timestamp values


Contains methods for working with a mapping from tick to 32 bit timestamp values, specifically seconds
spent outside the tick.


The mapping uses int24 for keys since ticks are represented as int24 and there are 8 (2^3) values per word.


### `initialize(mapping(int24 => uint256) self, int24 tick, int24 tickCurrent, int24 tickSpacing, uint32 time)` (internal)

Called the first time a tick is used to set the seconds outside value. Assumes the tick is not
initialized.




self: the packed mapping of tick to seconds outside

tick: the tick to be initialized

tickCurrent: the current tick

tickSpacing: the spacing between usable ticks

time: the current timestamp


### `clear(mapping(int24 => uint256) self, int24 tick, int24 tickSpacing)` (internal)

Called when a tick is no longer used, to clear the seconds outside value of the tick




self: the packed mapping of tick to seconds outside

tick: the tick to be cleared

tickSpacing: the spacing between usable ticks


### `cross(mapping(int24 => uint256) self, int24 tick, int24 tickSpacing, uint32 time)` (internal)

Called when an initialized tick is crossed to update the seconds outside for that tick. Must be called
every time an initialized tick is crossed




self: the packed mapping of tick to seconds outside

tick: the tick to be crossed

tickSpacing: the spacing between usable ticks

time: the current block timestamp truncated to 32 bits


### `get(mapping(int24 => uint256) self, int24 tick, int24 tickSpacing) → uint32` (internal)

Get the seconds outside for an initialized tick. Should be called only on initialized ticks.




self: the packed mapping of tick to seconds outside

tick: the tick to get the seconds outside value for

tickSpacing: the spacing between usable ticks


the: seconds outside value for that tick

### `secondsInside(mapping(int24 => uint256) self, int24 tickLower, int24 tickUpper, int24 tickCurrent, int24 tickSpacing, uint32 time) → uint32` (internal)

Get the seconds inside a tick range, assuming both tickLower and tickUpper are initialized




self: the packed mapping of tick to seconds outside

tickLower: the lower tick for which to get seconds inside

tickUpper: the upper tick for which to get seconds inside

tickCurrent: the current tick

tickSpacing: the spacing between usable ticks


a: relative seconds inside value that can be snapshotted and compared to a later snapshot to compute
time spent between tickLower and tickUpper, i.e. time that a position's liquidity was in use.


