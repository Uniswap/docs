[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ISwapToRatio

# Class: ISwapToRatio<RoutingConfig, SwapAndAddConfig\>

## Type parameters

| Name |
| :------ |
| `RoutingConfig` |
| `SwapAndAddConfig` |

## Implemented by

- [`AlphaRouter`](AlphaRouter.md)

## Table of contents

### Constructors

- [constructor](ISwapToRatio.md#constructor)

### Methods

- [routeToRatio](ISwapToRatio.md#routetoratio)

## Constructors

### constructor

• **new ISwapToRatio**<`RoutingConfig`, `SwapAndAddConfig`\>()

#### Type parameters

| Name |
| :------ |
| `RoutingConfig` |
| `SwapAndAddConfig` |

## Methods

### routeToRatio

▸ `Abstract` **routeToRatio**(`token0Balance`, `token1Balance`, `position`, `swapAndAddConfig`, `swapAndAddOptions?`, `routingConfig?`): `Promise`<[`SwapToRatioResponse`](../modules.md#swaptoratioresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token0Balance` | [`CurrencyAmount`](CurrencyAmount.md) |
| `token1Balance` | [`CurrencyAmount`](CurrencyAmount.md) |
| `position` | `Position` |
| `swapAndAddConfig` | `SwapAndAddConfig` |
| `swapAndAddOptions?` | [`SwapAndAddOptions`](../modules.md#swapandaddoptions) |
| `routingConfig?` | `RoutingConfig` |

#### Returns

`Promise`<[`SwapToRatioResponse`](../modules.md#swaptoratioresponse)\>

#### Defined in

[src/routers/router.ts:217](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/router.ts#L217)
