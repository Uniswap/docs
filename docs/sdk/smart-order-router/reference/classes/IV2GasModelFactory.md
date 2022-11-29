[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IV2GasModelFactory

# Class: IV2GasModelFactory

Factory for building gas models that can be used with any route to generate
gas estimates.

Factory model is used so that any supporting data can be fetched once and
returned as part of the model.

**`Export`**

**`Abstract`**

## Table of contents

### Constructors

- [constructor](IV2GasModelFactory.md#constructor)

### Methods

- [buildGasModel](IV2GasModelFactory.md#buildgasmodel)

## Constructors

### constructor

• **new IV2GasModelFactory**()

## Methods

### buildGasModel

▸ `Abstract` **buildGasModel**(`__namedParameters`): `Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V2RouteWithValidQuote`](V2RouteWithValidQuote.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BuildV2GasModelFactoryType`](../modules.md#buildv2gasmodelfactorytype) |

#### Returns

`Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V2RouteWithValidQuote`](V2RouteWithValidQuote.md)\>\>

#### Defined in

[src/routers/alpha-router/gas-models/gas-model.ts:137](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/gas-model.ts#L137)
