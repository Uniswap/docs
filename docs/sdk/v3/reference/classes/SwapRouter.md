[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / SwapRouter

# Class: SwapRouter

Represents the Uniswap V3 SwapRouter, and has static methods for helping execute trades.

## Table of contents

### Constructors

- [constructor](SwapRouter.md#constructor)

### Properties

- [INTERFACE](SwapRouter.md#interface)

### Methods

- [swapCallParameters](SwapRouter.md#swapcallparameters)

## Constructors

### constructor

• `Private` **new SwapRouter**()

Cannot be constructed.

#### Defined in

[swapRouter.ts:57](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/swapRouter.ts#L57)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Defined in

[swapRouter.ts:52](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/swapRouter.ts#L52)

## Methods

### swapCallParameters

▸ `Static` **swapCallParameters**(`trades`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trades` | [`Trade`](Trade.md)\<`Currency`, `Currency`, `TradeType`\> \| [`Trade`](Trade.md)\<`Currency`, `Currency`, `TradeType`\>[] | - |
| `options` | [`SwapOptions`](../interfaces/SwapOptions.md) | options for the call parameters |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

#### Defined in

[swapRouter.ts:64](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/swapRouter.ts#L64)
