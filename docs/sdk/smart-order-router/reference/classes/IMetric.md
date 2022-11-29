[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IMetric

# Class: IMetric

## Hierarchy

- **`IMetric`**

  ↳ [`MetricLogger`](MetricLogger.md)

## Table of contents

### Constructors

- [constructor](IMetric.md#constructor)

### Methods

- [putDimensions](IMetric.md#putdimensions)
- [putMetric](IMetric.md#putmetric)

## Constructors

### constructor

• **new IMetric**()

## Methods

### putDimensions

▸ `Abstract` **putDimensions**(`dimensions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensions` | `Record`<`string`, `string`\> |

#### Returns

`void`

#### Defined in

[src/util/metric.ts:36](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L36)

___

### putMetric

▸ `Abstract` **putMetric**(`key`, `value`, `unit?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `number` |
| `unit?` | [`MetricLoggerUnit`](../enums/MetricLoggerUnit.md) |

#### Returns

`void`

#### Defined in

[src/util/metric.ts:37](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/metric.ts#L37)
