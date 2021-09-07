[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [utils/tickList](../modules/utils_tickList.md) / TickList

# Class: TickList

[utils/tickList](../modules/utils_tickList.md).TickList

Utility methods for interacting with sorted lists of ticks

## Table of contents

### Constructors

- [constructor](utils_tickList.TickList.md#constructor)

### Methods

- [binarySearch](utils_tickList.TickList.md#binarysearch)
- [getTick](utils_tickList.TickList.md#gettick)
- [isAtOrAboveLargest](utils_tickList.TickList.md#isatorabovelargest)
- [isBelowSmallest](utils_tickList.TickList.md#isbelowsmallest)
- [nextInitializedTick](utils_tickList.TickList.md#nextinitializedtick)
- [nextInitializedTickWithinOneWord](utils_tickList.TickList.md#nextinitializedtickwithinoneword)
- [validateList](utils_tickList.TickList.md#validatelist)

## Constructors

### constructor

• `Private` **new TickList**()

Cannot be constructed

#### Defined in

[utils/tickList.ts:18](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L18)

## Methods

### binarySearch

▸ `Static` `Private` **binarySearch**(`ticks`, `tick`): `number`

Finds the largest tick in the list of ticks that is less than or equal to tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] | list of ticks |
| `tick` | `number` | tick to find the largest tick that is less than or equal to tick |

#### Returns

`number`

#### Defined in

[utils/tickList.ts:62](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L62)

___

### getTick

▸ `Static` **getTick**(`ticks`, `index`): [`Tick`](entities_tick.Tick.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] |
| `index` | `number` |

#### Returns

[`Tick`](entities_tick.Tick.md)

#### Defined in

[utils/tickList.ts:50](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L50)

___

### isAtOrAboveLargest

▸ `Static` **isAtOrAboveLargest**(`ticks`, `tick`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] |
| `tick` | `number` |

#### Returns

`boolean`

#### Defined in

[utils/tickList.ts:45](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L45)

___

### isBelowSmallest

▸ `Static` **isBelowSmallest**(`ticks`, `tick`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] |
| `tick` | `number` |

#### Returns

`boolean`

#### Defined in

[utils/tickList.ts:40](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L40)

___

### nextInitializedTick

▸ `Static` **nextInitializedTick**(`ticks`, `tick`, `lte`): [`Tick`](entities_tick.Tick.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] |
| `tick` | `number` |
| `lte` | `boolean` |

#### Returns

[`Tick`](entities_tick.Tick.md)

#### Defined in

[utils/tickList.ts:83](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L83)

___

### nextInitializedTickWithinOneWord

▸ `Static` **nextInitializedTickWithinOneWord**(`ticks`, `tick`, `lte`, `tickSpacing`): [`number`, `boolean`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | readonly [`Tick`](entities_tick.Tick.md)[] |
| `tick` | `number` |
| `lte` | `boolean` |
| `tickSpacing` | `number` |

#### Returns

[`number`, `boolean`]

#### Defined in

[utils/tickList.ts:101](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L101)

___

### validateList

▸ `Static` **validateList**(`ticks`, `tickSpacing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | [`Tick`](entities_tick.Tick.md)[] |
| `tickSpacing` | `number` |

#### Returns

`void`

#### Defined in

[utils/tickList.ts:20](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/tickList.ts#L20)
