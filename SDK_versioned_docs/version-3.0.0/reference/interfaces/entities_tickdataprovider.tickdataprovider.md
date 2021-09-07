[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/tickDataProvider](../modules/entities_tickDataProvider.md) / TickDataProvider

# Interface: TickDataProvider

[entities/tickDataProvider](../modules/entities_tickDataProvider.md).TickDataProvider

Provides information about ticks

## Implemented by

- [`NoTickDataProvider`](../classes/entities_tickDataProvider.NoTickDataProvider.md)
- [`TickListDataProvider`](../classes/entities_tickListDataProvider.TickListDataProvider.md)

## Table of contents

### Methods

- [getTick](entities_tickDataProvider.TickDataProvider.md#gettick)
- [nextInitializedTickWithinOneWord](entities_tickDataProvider.TickDataProvider.md#nextinitializedtickwithinoneword)

## Methods

### getTick

▸ **getTick**(`tick`): `Promise`<`Object`\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tick` | `number` | the tick to load |

#### Returns

`Promise`<`Object`\>

#### Defined in

[entities/tickDataProvider.ts:11](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickDataProvider.ts#L11)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`tick`, `lte`, `tickSpacing`): `Promise`<[`number`, `boolean`]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tick` | `number` | The current tick |
| `lte` | `boolean` | Whether the next tick should be lte the current tick |
| `tickSpacing` | `number` | The tick spacing of the pool |

#### Returns

`Promise`<[`number`, `boolean`]\>

#### Defined in

[entities/tickDataProvider.ts:19](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickDataProvider.ts#L19)
