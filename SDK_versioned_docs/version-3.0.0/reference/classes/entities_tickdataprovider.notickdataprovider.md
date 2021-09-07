[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/tickDataProvider](../modules/entities_tickDataProvider.md) / NoTickDataProvider

# Class: NoTickDataProvider

[entities/tickDataProvider](../modules/entities_tickDataProvider.md).NoTickDataProvider

This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
do not need to load tick data for your use case.

## Implements

- [`TickDataProvider`](../interfaces/entities_tickDataProvider.TickDataProvider.md)

## Table of contents

### Constructors

- [constructor](entities_tickDataProvider.NoTickDataProvider.md#constructor)

### Properties

- [ERROR\_MESSAGE](entities_tickDataProvider.NoTickDataProvider.md#error_message)

### Methods

- [getTick](entities_tickDataProvider.NoTickDataProvider.md#gettick)
- [nextInitializedTickWithinOneWord](entities_tickDataProvider.NoTickDataProvider.md#nextinitializedtickwithinoneword)

## Constructors

### constructor

• **new NoTickDataProvider**()

## Properties

### ERROR\_MESSAGE

▪ `Static` `Private` **ERROR\_MESSAGE**: `string` = `'No tick data provider was given'`

#### Defined in

[entities/tickDataProvider.ts:27](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickDataProvider.ts#L27)

## Methods

### getTick

▸ **getTick**(`_tick`): `Promise`<`Object`\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tick` | `number` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

[TickDataProvider](../interfaces/entities_tickDataProvider.TickDataProvider.md).[getTick](../interfaces/entities_tickDataProvider.TickDataProvider.md#gettick)

#### Defined in

[entities/tickDataProvider.ts:28](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickDataProvider.ts#L28)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`_tick`, `_lte`, `_tickSpacing`): `Promise`<[`number`, `boolean`]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tick` | `number` |
| `_lte` | `boolean` |
| `_tickSpacing` | `number` |

#### Returns

`Promise`<[`number`, `boolean`]\>

#### Implementation of

[TickDataProvider](../interfaces/entities_tickDataProvider.TickDataProvider.md).[nextInitializedTickWithinOneWord](../interfaces/entities_tickDataProvider.TickDataProvider.md#nextinitializedtickwithinoneword)

#### Defined in

[entities/tickDataProvider.ts:32](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/tickDataProvider.ts#L32)
