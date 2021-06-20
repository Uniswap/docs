---
id: TickListDataProvider
title: TickListDataProvider
---

# TickListDataProvider

A data provider for ticks that is backed by an in-memory array of ticks.

## Implements

- [*TickDataProvider*](../interfaces/entities_tickdataprovider.tickdataprovider.md)

## Constructors

### constructor

\+ **new TickListDataProvider**(`ticks`: ([*Tick*](entities_tick.tick.md) \| [*TickConstructorArgs*](../interfaces/entities_tick.tickconstructorargs.md))[], `tickSpacing`: *number*): [*TickListDataProvider*](entities_ticklistdataprovider.ticklistdataprovider.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticks` | ([*Tick*](entities_tick.tick.md) \| [*TickConstructorArgs*](../interfaces/entities_tick.tickconstructorargs.md))[] |
| `tickSpacing` | *number* |

**Returns:** [*TickListDataProvider*](entities_ticklistdataprovider.ticklistdataprovider.md)

Defined in: [entities/tickListDataProvider.ts:10](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/tickListDataProvider.ts#L10)

## Methods

### getTick

▸ **getTick**(`tick`: *number*): *Promise*<{ `liquidityGross`: BigintIsh ; `liquidityNet`: BigintIsh  }\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type |
| :------ | :------ |
| `tick` | *number* |

**Returns:** *Promise*<{ `liquidityGross`: BigintIsh ; `liquidityNet`: BigintIsh  }\>

Implementation of: [TickDataProvider](../interfaces/entities_tickdataprovider.tickdataprovider.md)

Defined in: [entities/tickListDataProvider.ts:18](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/tickListDataProvider.ts#L18)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`tick`: *number*, `lte`: *boolean*, `tickSpacing`: *number*): *Promise*<[*number*, *boolean*]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type |
| :------ | :------ |
| `tick` | *number* |
| `lte` | *boolean* |
| `tickSpacing` | *number* |

**Returns:** *Promise*<[*number*, *boolean*]\>

Implementation of: [TickDataProvider](../interfaces/entities_tickdataprovider.tickdataprovider.md)

Defined in: [entities/tickListDataProvider.ts:22](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/tickListDataProvider.ts#L22)
