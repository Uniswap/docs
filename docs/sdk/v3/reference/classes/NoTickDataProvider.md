[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / NoTickDataProvider

# Class: NoTickDataProvider

This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
do not need to load tick data for your use case.

## Implements

- [`TickDataProvider`](../interfaces/TickDataProvider.md)

## Table of contents

### Constructors

- [constructor](NoTickDataProvider.md#constructor)

### Properties

- [ERROR\_MESSAGE](NoTickDataProvider.md#error_message)

### Methods

- [getTick](NoTickDataProvider.md#gettick)
- [nextInitializedTickWithinOneWord](NoTickDataProvider.md#nextinitializedtickwithinoneword)

## Constructors

### constructor

• **new NoTickDataProvider**()

## Properties

### ERROR\_MESSAGE

▪ `Static` `Private` **ERROR\_MESSAGE**: `string` = `'No tick data provider was given'`

#### Defined in

[entities/tickDataProvider.ts:27](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickDataProvider.ts#L27)

## Methods

### getTick

▸ **getTick**(`_tick`): `Promise`<{ `liquidityNet`: `BigintIsh`  }\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_tick` | `number` | the tick to load |

#### Returns

`Promise`<{ `liquidityNet`: `BigintIsh`  }\>

#### Implementation of

[TickDataProvider](../interfaces/TickDataProvider.md).[getTick](../interfaces/TickDataProvider.md#gettick)

#### Defined in

[entities/tickDataProvider.ts:28](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickDataProvider.ts#L28)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`_tick`, `_lte`, `_tickSpacing`): `Promise`<[`number`, `boolean`]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_tick` | `number` | The current tick |
| `_lte` | `boolean` | Whether the next tick should be lte the current tick |
| `_tickSpacing` | `number` | The tick spacing of the pool |

#### Returns

`Promise`<[`number`, `boolean`]\>

#### Implementation of

[TickDataProvider](../interfaces/TickDataProvider.md).[nextInitializedTickWithinOneWord](../interfaces/TickDataProvider.md#nextinitializedtickwithinoneword)

#### Defined in

[entities/tickDataProvider.ts:32](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickDataProvider.ts#L32)
