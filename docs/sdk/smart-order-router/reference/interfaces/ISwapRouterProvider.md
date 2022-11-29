[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ISwapRouterProvider

# Interface: ISwapRouterProvider

Provider for accessing the SwapRouter02 Contract .

**`Export`**

**`Interface`**

IRouterProvider

## Implemented by

- [`SwapRouterProvider`](../classes/SwapRouterProvider.md)

## Table of contents

### Methods

- [getApprovalType](ISwapRouterProvider.md#getapprovaltype)

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

#### Defined in

[src/providers/swap-router-provider.ts:28](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/swap-router-provider.ts#L28)
