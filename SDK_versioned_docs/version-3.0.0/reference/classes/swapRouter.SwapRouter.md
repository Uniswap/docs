[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [swapRouter](../modules/swapRouter.md) / SwapRouter

# Class: SwapRouter

[swapRouter](../modules/swapRouter.md).SwapRouter

Represents the Uniswap V3 SwapRouter, and has static methods for helping execute trades.

## Hierarchy

- [`SelfPermit`](selfPermit.SelfPermit.md)

  ↳ **`SwapRouter`**

## Table of contents

### Constructors

- [constructor](swapRouter.SwapRouter.md#constructor)

### Properties

- [INTERFACE](swapRouter.SwapRouter.md#interface)

### Methods

- [encodePermit](swapRouter.SwapRouter.md#encodepermit)
- [swapCallParameters](swapRouter.SwapRouter.md#swapcallparameters)

## Constructors

### constructor

• `Private` **new SwapRouter**()

Cannot be constructed.

#### Overrides

[SelfPermit](selfPermit.SelfPermit.md).[constructor](selfPermit.SelfPermit.md#constructor)

#### Defined in

[swapRouter.ts:67](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L67)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Overrides

[SelfPermit](selfPermit.SelfPermit.md).[INTERFACE](selfPermit.SelfPermit.md#interface)

#### Defined in

[swapRouter.ts:62](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L62)

## Methods

### encodePermit

▸ `Static` `Protected` **encodePermit**(`token`, `options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |
| `options` | [`PermitOptions`](../modules/selfPermit.md#permitoptions) |

#### Returns

`string`

#### Inherited from

[SelfPermit](selfPermit.SelfPermit.md).[encodePermit](selfPermit.SelfPermit.md#encodepermit)

#### Defined in

[selfPermit.ts:33](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/selfPermit.ts#L33)

___

### swapCallParameters

▸ `Static` **swapCallParameters**(`trades`, `options`): [`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trades` | [`Trade`](entities_trade.Trade.md)<`Currency`, `Currency`, `TradeType`\> \| [`Trade`](entities_trade.Trade.md)<`Currency`, `Currency`, `TradeType`\>[] | - |
| `options` | [`SwapOptions`](../interfaces/swapRouter.SwapOptions.md) | options for the call parameters |

#### Returns

[`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Defined in

[swapRouter.ts:76](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L76)
