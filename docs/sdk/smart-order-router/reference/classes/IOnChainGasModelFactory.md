[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IOnChainGasModelFactory

# Class: IOnChainGasModelFactory

Factory for building gas models that can be used with any route to generate
gas estimates.

Factory model is used so that any supporting data can be fetched once and
returned as part of the model.

**`Export`**

**`Abstract`**

## Hierarchy

- **`IOnChainGasModelFactory`**

  ↳ [`V3HeuristicGasModelFactory`](V3HeuristicGasModelFactory.md)

## Table of contents

### Constructors

- [constructor](IOnChainGasModelFactory.md#constructor)

### Methods

- [buildGasModel](IOnChainGasModelFactory.md#buildgasmodel)

## Constructors

### constructor

• **new IOnChainGasModelFactory**()

## Methods

### buildGasModel

▸ `Abstract` **buildGasModel**(`__namedParameters`): `Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md) \| [`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BuildOnChainGasModelFactoryType`](../modules.md#buildonchaingasmodelfactorytype) |

#### Returns

`Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md) \| [`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)\>\>

#### Defined in

[src/routers/alpha-router/gas-models/gas-model.ts:157](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/gas-model.ts#L157)
