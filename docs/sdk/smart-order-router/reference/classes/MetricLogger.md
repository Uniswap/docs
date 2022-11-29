[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / MetricLogger

# Class: MetricLogger

## Hierarchy

- [`IMetric`](IMetric.md)

  ↳ **`MetricLogger`**

## Table of contents

### Constructors

- [constructor](MetricLogger.md#constructor)

### Properties

- [log](MetricLogger.md#log)

### Methods

- [putDimensions](MetricLogger.md#putdimensions)
- [putMetric](MetricLogger.md#putmetric)

## Constructors

### constructor

• **new MetricLogger**(`context?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `MetricContext` |

#### Overrides

[IMetric](IMetric.md).[constructor](IMetric.md#constructor)

#### Defined in

[src/util/metric.ts:48](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L48)

## Properties

### log

• `Private` **log**: `Logger`

#### Defined in

[src/util/metric.ts:46](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L46)

## Methods

### putDimensions

▸ **putDimensions**(`dimensions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensions` | `Record`<`string`, `string`\> |

#### Returns

`void`

#### Overrides

[IMetric](IMetric.md).[putDimensions](IMetric.md#putdimensions)

#### Defined in

[src/util/metric.ts:53](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L53)

___

### putMetric

▸ **putMetric**(`key`, `value`, `unit?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `number` |
| `unit?` | [`MetricLoggerUnit`](../enums/MetricLoggerUnit.md) |

#### Returns

`void`

#### Overrides

[IMetric](IMetric.md).[putMetric](IMetric.md#putmetric)

#### Defined in

[src/util/metric.ts:57](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L57)
