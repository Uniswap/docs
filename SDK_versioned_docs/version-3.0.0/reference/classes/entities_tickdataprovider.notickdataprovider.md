---
id: NoTickDataProvider
title: NoTickDataProvider
---

# NoTickDataProvider

This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
do not need to load tick data for your use case.

## Implements

- [*TickDataProvider*](../interfaces/entities_tickdataprovider.tickdataprovider.md)

## Constructors

### constructor

\+ **new NoTickDataProvider**(): [*NoTickDataProvider*](entities_tickdataprovider.notickdataprovider.md)

**Returns:** [*NoTickDataProvider*](entities_tickdataprovider.notickdataprovider.md)

## Methods

### getTick

▸ **getTick**(`_tick`: *number*): *Promise*<{ `liquidityNet`: BigintIsh  }\>

Return information corresponding to a specific tick

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tick` | *number* |

**Returns:** *Promise*<{ `liquidityNet`: BigintIsh  }\>

Implementation of: [TickDataProvider](../interfaces/entities_tickdataprovider.tickdataprovider.md)

Defined in: [entities/tickDataProvider.ts:28](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/tickDataProvider.ts#L28)

___

### nextInitializedTickWithinOneWord

▸ **nextInitializedTickWithinOneWord**(`_tick`: *number*, `_lte`: *boolean*, `_tickSpacing`: *number*): *Promise*<[*number*, *boolean*]\>

Return the next tick that is initialized within a single word

#### Parameters

| Name | Type |
| :------ | :------ |
| `_tick` | *number* |
| `_lte` | *boolean* |
| `_tickSpacing` | *number* |

**Returns:** *Promise*<[*number*, *boolean*]\>

Implementation of: [TickDataProvider](../interfaces/entities_tickdataprovider.tickdataprovider.md)

Defined in: [entities/tickDataProvider.ts:32](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/tickDataProvider.ts#L32)
