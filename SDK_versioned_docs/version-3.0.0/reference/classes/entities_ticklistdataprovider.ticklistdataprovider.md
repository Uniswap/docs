[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/tickListDataProvider](../modules/entities_tickListDataProvider.md) / TickListDataProvider

# Class: TickListDataProvider

[entities/tickListDataProvider](../modules/entities_tickListDataProvider.md).TickListDataProvider

A data provider for ticks that is backed by an in-memory array of ticks.

## Implements

- [`TickDataProvider`](../interfaces/entities_tickDataProvider.TickDataProvider.md)

## Table of contents

### Constructors

- [constructor](entities_tickListDataProvider.TickListDataProvider.md#constructor)

### Properties

- [ticks](entities_tickListDataProvider.TickListDataProvider.md#ticks)

### Methods

- [getTick](entities_tickListDataProvider.TickListDataProvider.md#gettick)
- [nextInitializedTickWithinOneWord](entities_tickListDataProvider.TickListDataProvider.md#nextinitializedtickwithinoneword)

## Constructors

### constructor

• **new TickListDataProvider**(`ticks`, `tickSpacing`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | ([`Tick`](entities_tick.Tick.md) \| [`TickConstructorArgs`](../interfaces/entities_tick.TickConstructorArgs.md))[] |
| `tickSpacing` | `number` |

#### Defined in

[entities/tickListDataProvider.ts:12](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickListDataProvider.ts#L12)

## Properties

### ticks

• `Private` **ticks**: readonly [`Tick`](entities_tick.Tick.md)[]

#### Defined in

[entities/tickListDataProvider.ts:10](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickListDataProvider.ts#L10)

## Methods

### getTick

▸ **getTick**(`tick`): `Promise`<`Object`\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type |
| :------ | :------ |
| `tick` | `number` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

[TickDataProvider](../interfaces/entities_tickDataProvider.TickDataProvider.md).[getTick](../interfaces/entities_tickDataProvider.TickDataProvider.md#gettick)

#### Defined in

[entities/tickListDataProvider.ts:18](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickListDataProvider.ts#L18)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`tick`, `lte`, `tickSpacing`): `Promise`<[`number`, `boolean`]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type |
| :------ | :------ |
| `tick` | `number` |
| `lte` | `boolean` |
| `tickSpacing` | `number` |

#### Returns

`Promise`<[`number`, `boolean`]\>

#### Implementation of

[TickDataProvider](../interfaces/entities_tickDataProvider.TickDataProvider.md).[nextInitializedTickWithinOneWord](../interfaces/entities_tickDataProvider.TickDataProvider.md#nextinitializedtickwithinoneword)

#### Defined in

[entities/tickListDataProvider.ts:22](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickListDataProvider.ts#L22)
