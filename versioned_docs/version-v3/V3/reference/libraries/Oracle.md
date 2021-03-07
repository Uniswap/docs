
## `Oracle`

Provides price and liquidity data useful for a wide variety of system designs

Instances of stored oracle data, "observations", are collected in the oracle array
Every pool is initialized with an oracle array length of 1. Anyone can pay the SSTOREs to increase the
maximum length of the oracle array. New slots will be added when the array is fully populated.
Observations are overwritten when the full length of the oracle array is populated.
The most recent observation is available, independent of the length of the oracle array, by passing 0 to observe()


 ```solidity 
 function initialize(
     struct Oracle.Observation[65535] self, uint32 time<br/>
   )(internal) returns (uint16 cardinality, uint16 cardinalityNext)
 ``` 

Initialize the oracle array by writing the first slot. Called once for the lifecycle of the observations array



self: The stored oracle array

time: The time of the oracle initialization, via block.timestamp truncated to uint32


cardinality: The number of populated elements in the oracle array

cardinalityNext: The new length of the oracle array, independent of population

 ```solidity 
 function write(
     struct Oracle.Observation[65535] self, uint16 index, uint32 blockTimestamp, int24 tick, uint128 liquidity, uint16 cardinality, uint16 cardinalityNext<br/>
   )(internal) returns (uint16 indexUpdated, uint16 cardinalityUpdated)
 ``` 

Writes an oracle observation to the array

Writable at most once per block. Index represents the most recently written element, and must be tracked externally.
If the index is at the end of the allowable array length (according to cardinality), and the next cardinality
is greater than the current one, cardinality may be increased. This restriction is created to preserve ordering.


self: The stored oracle array

index: The location of the most recently updated observation

blockTimestamp: The timestamp of the new observation

tick: The active tick at the time of the new observation

liquidity: The total in-range liquidity at the time of the new observation

cardinality: The number of populated elements in the oracle array

cardinalityNext: The new length of the oracle array, independent of population


indexUpdated: The new index of the most recently written element in the oracle array

cardinalityUpdated: The new cardinality of the oracle array

 ```solidity 
 function grow(
     struct Oracle.Observation[65535] self, uint16 current, uint16 next<br/>
   )(internal) returns (uint16)
 ``` 

Prepares the oracle array to store up to `next` observations



self: The stored oracle array

current: The current next cardinality of the oracle array

next: The proposed next cardinality which will be populated in the oracle array


next: The next cardinality which will be populated in the oracle array

 ```solidity 
 function observe(
     struct Oracle.Observation[65535] self, uint32 time, uint32[] secondsAgos, int24 tick, uint16 index, uint128 liquidity, uint16 cardinality<br/>
   )(internal) returns (int56[] tickCumulatives, uint160[] liquidityCumulatives)
 ``` 

Returns the accumulator values as of each time seconds ago from the given time in the array of `secondsAgos`



self: The stored oracle array

time: The current block.timestamp

secondsAgos: Each amount of time to look back, in seconds, at which point to return an observation

tick: The current tick

index: The location of a given observation within the oracle array

liquidity: The current in-range pool liquidity

cardinality: The number of populated elements in the oracle array


tickCumulatives: The tick * time elapsed since the pool was first initialized, as of each `secondsAgo`

liquidityCumulatives: The liquidity * time elapsed since the pool was first initialized, as of each `secondsAgo`


