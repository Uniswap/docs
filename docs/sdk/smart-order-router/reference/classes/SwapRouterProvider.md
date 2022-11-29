[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / SwapRouterProvider

# Class: SwapRouterProvider

Provider for accessing the SwapRouter02 Contract .

**`Export`**

**`Interface`**

IRouterProvider

## Implements

- [`ISwapRouterProvider`](../interfaces/ISwapRouterProvider.md)

## Table of contents

### Constructors

- [constructor](SwapRouterProvider.md#constructor)

### Properties

- [multicall2Provider](SwapRouterProvider.md#multicall2provider)

### Methods

- [getApprovalType](SwapRouterProvider.md#getapprovaltype)

## Constructors

### constructor

• **new SwapRouterProvider**(`multicall2Provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `multicall2Provider` | [`IMulticallProvider`](IMulticallProvider.md)<`any`\> |

#### Defined in

[src/providers/swap-router-provider.ts:35](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/swap-router-provider.ts#L35)

## Properties

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

#### Defined in

[src/providers/swap-router-provider.ts:35](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/swap-router-provider.ts#L35)

## Methods

### getApprovalType

▸ **getApprovalType**(`tokenInAmount`, `tokenOutAmount`): `Promise`<`TokenApprovalTypes`\>

Get the approval method needed for each token. Throws an error if either query fails.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenInAmount` | `CurrencyAmount`<`Currency`\> | The Currency Amount of tokenIn needed by the user |
| `tokenOutAmount` | `CurrencyAmount`<`Currency`\> | The Currency Amount of tokenOut needed by the user |

#### Returns

`Promise`<`TokenApprovalTypes`\>

the Approval Types for each token.

#### Implementation of

[ISwapRouterProvider](../interfaces/ISwapRouterProvider.md).[getApprovalType](../interfaces/ISwapRouterProvider.md#getapprovaltype)

#### Defined in

[src/providers/swap-router-provider.ts:37](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/swap-router-provider.ts#L37)
