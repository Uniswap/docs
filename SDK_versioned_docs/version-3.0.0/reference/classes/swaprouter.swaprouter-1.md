---
id: SwapRouter
title: SwapRouter
---

# SwapRouter

Represents the Uniswap V2 SwapRouter, and has static methods for helping execute trades.

## Hierarchy

- [*SelfPermit*](selfpermit.selfpermit-1.md)

  ↳ **SwapRouter**

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: *Interface*

Overrides: [SelfPermit](selfpermit.selfpermit-1.md).[INTERFACE](selfpermit.selfpermit-1.md#interface)

Defined in: [swapRouter.ts:62](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L62)

## Methods

### encodePermit

▸ `Static` `Protected` **encodePermit**(`token`: *Token*, `options`: [*PermitOptions*](../types/selfpermit.permitoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | *Token* |
| `options` | [*PermitOptions*](../types/selfpermit.permitoptions.md) |

**Returns:** *string*

Inherited from: [SelfPermit](selfpermit.selfpermit-1.md)

Defined in: [selfPermit.ts:34](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/selfPermit.ts#L34)

___

### swapCallParameters

▸ `Static` **swapCallParameters**(`trade`: [*Trade*](entities_trade.trade.md)<Currency, Currency, TradeType\>, `options`: [*SwapOptions*](../interfaces/swaprouter.swapoptions.md)): [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `trade` | [*Trade*](entities_trade.trade.md)<Currency, Currency, TradeType\> | to produce call parameters for |
| `options` | [*SwapOptions*](../interfaces/swaprouter.swapoptions.md) | options for the call parameters |

**Returns:** [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Defined in: [swapRouter.ts:76](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L76)
