Provides functions for fetching chunks of tick data for a pool

This avoids the waterfall of fetching the tick bitmap, parsing the bitmap to know which ticks to fetch, and
then sending additional multicalls to fetch the tick data

## Functions
### getPopulatedTicksInWord
```solidity
  function getPopulatedTicksInWord(
    address pool,
    int16 tickBitmapIndex
  ) external returns (struct ITickLens.PopulatedTick[] populatedTicks)
```
Get all the tick data for the populated ticks from a word of the tick bitmap of a pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`pool` | address | The address of the pool for which to fetch populated tick data
|`tickBitmapIndex` | int16 | The index of the word in the tick bitmap for which to parse the bitmap and
fetch all the populated ticks

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`populatedTicks`| address | An array of tick data for the given word in the tick bitmap
