[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / TickListDataProvider

# Class: TickListDataProvider

A data provider for ticks that is backed by an in-memory array of ticks.

## Implements

- [`TickDataProvider`](../interfaces/TickDataProvider.md)

## Table of contents

### Constructors

- [constructor](TickListDataProvider.md#constructor)

### Properties

- [ticks](TickListDataProvider.md#ticks)

### Methods

- [getTick](TickListDataProvider.md#gettick)
- [nextInitializedTickWithinOneWord](TickListDataProvider.md#nextinitializedtickwithinoneword)

## Constructors

### constructor

• **new TickListDataProvider**(`ticks`, `tickSpacing`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | ([`Tick`](Tick.md) \| [`TickConstructorArgs`](../interfaces/TickConstructorArgs.md))[] |
| `tickSpacing` | `number` |

#### Defined in

[entities/tickListDataProvider.ts:12](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickListDataProvider.ts#L12)

## Properties

### ticks

• `Private` **ticks**: readonly [`Tick`](Tick.md)[]

#### Defined in

[entities/tickListDataProvider.ts:10](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickListDataProvider.ts#L10)

## Methods

### getTick

▸ **getTick**(`tick`): `Promise`\<\{ `liquidityGross`: `BigintIsh` ; `liquidityNet`: `BigintIsh`  \}\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tick` | `number` | the tick to load |

#### Returns

`Promise`\<\{ `liquidityGross`: `BigintIsh` ; `liquidityNet`: `BigintIsh`  \}\>

#### Implementation of

[TickDataProvider](../interfaces/TickDataProvider.md).[getTick](../interfaces/TickDataProvider.md#gettick)

#### Defined in

[entities/tickListDataProvider.ts:18](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickListDataProvider.ts#L18)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`tick`, `lte`, `tickSpacing`): `Promise`\<[`number`, `boolean`]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tick` | `number` | The current tick |
| `lte` | `boolean` | Whether the next tick should be lte the current tick |
| `tickSpacing` | `number` | The tick spacing of the pool |

#### Returns

`Promise`\<[`number`, `boolean`]\>

#### Implementation of

[TickDataProvider](../interfaces/TickDataProvider.md).[nextInitializedTickWithinOneWord](../interfaces/TickDataProvider.md#nextinitializedtickwithinoneword)

#### Defined in

[entities/tickListDataProvider.ts:22](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/tickListDataProvider.ts#L22)
