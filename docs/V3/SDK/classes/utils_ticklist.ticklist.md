---
id: TickList
title: TickList
---

# TickList

Utility methods for interacting with sorted lists of ticks

## Methods

### getTick

▸ `Static` **getTick**(`ticks`: readonly [*Tick*](entities_tick.tick.md)[], `index`: *number*): [*Tick*](entities_tick.tick.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [*Tick*](entities_tick.tick.md)[] |
| `index` | *number* |

**Returns:** [*Tick*](entities_tick.tick.md)

Defined in: [utils/tickList.ts:50](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L50)

___

### isAtOrAboveLargest

▸ `Static` **isAtOrAboveLargest**(`ticks`: readonly [*Tick*](entities_tick.tick.md)[], `tick`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [*Tick*](entities_tick.tick.md)[] |
| `tick` | *number* |

**Returns:** *boolean*

Defined in: [utils/tickList.ts:45](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L45)

___

### isBelowSmallest

▸ `Static` **isBelowSmallest**(`ticks`: readonly [*Tick*](entities_tick.tick.md)[], `tick`: *number*): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [*Tick*](entities_tick.tick.md)[] |
| `tick` | *number* |

**Returns:** *boolean*

Defined in: [utils/tickList.ts:40](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L40)

___

### nextInitializedTick

▸ `Static` **nextInitializedTick**(`ticks`: readonly [*Tick*](entities_tick.tick.md)[], `tick`: *number*, `lte`: *boolean*): [*Tick*](entities_tick.tick.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [*Tick*](entities_tick.tick.md)[] |
| `tick` | *number* |
| `lte` | *boolean* |

**Returns:** [*Tick*](entities_tick.tick.md)

Defined in: [utils/tickList.ts:83](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L83)

___

### nextInitializedTickWithinOneWord

▸ `Static` **nextInitializedTickWithinOneWord**(`ticks`: readonly [*Tick*](entities_tick.tick.md)[], `tick`: *number*, `lte`: *boolean*, `tickSpacing`: *number*): [*number*, *boolean*]

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [*Tick*](entities_tick.tick.md)[] |
| `tick` | *number* |
| `lte` | *boolean* |
| `tickSpacing` | *number* |

**Returns:** [*number*, *boolean*]

Defined in: [utils/tickList.ts:101](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L101)

___

### validateList

▸ `Static` **validateList**(`ticks`: [*Tick*](entities_tick.tick.md)[], `tickSpacing`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | [*Tick*](entities_tick.tick.md)[] |
| `tickSpacing` | *number* |

**Returns:** *void*

Defined in: [utils/tickList.ts:20](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/tickList.ts#L20)
