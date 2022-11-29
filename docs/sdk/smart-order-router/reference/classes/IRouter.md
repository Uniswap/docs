[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IRouter

# Class: IRouter<RoutingConfig\>

Provides functionality for finding optimal swap routes on the Uniswap protocol.

**`Export`**

**`Abstract`**

## Type parameters

| Name |
| :------ |
| `RoutingConfig` |

## Implemented by

- [`AlphaRouter`](AlphaRouter.md)

## Table of contents

### Constructors

- [constructor](IRouter.md#constructor)

### Methods

- [route](IRouter.md#route)

## Constructors

### constructor

• **new IRouter**<`RoutingConfig`\>()

#### Type parameters

| Name |
| :------ |
| `RoutingConfig` |

## Methods

### route

▸ `Abstract` **route**(`amount`, `quoteCurrency`, `swapType`, `swapOptions?`, `partialRoutingConfig?`): `Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

Finds the optimal way to swap tokens, and returns the route as well as a quote for the swap.
Considers split routes, multi-hop swaps, and gas costs.

**`Abstract`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) | The amount specified by the user. For EXACT_IN swaps, this is the input token amount. For EXACT_OUT swaps, this is the output token. |
| `quoteCurrency` | `Currency` | The currency of the token we are returning a quote for. For EXACT_IN swaps, this is the output token. For EXACT_OUT, this is the input token. |
| `swapType` | `TradeType` | - |
| `swapOptions?` | [`SwapOptions`](../modules.md#swapoptions) | Optional config for executing the swap. If provided, calldata for executing the swap will also be returned. |
| `partialRoutingConfig?` | `Partial`<`RoutingConfig`\> | Optional config for finding the optimal route. |

#### Returns

`Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

The swap route.

#### Defined in

[src/routers/router.ts:207](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/router.ts#L207)
