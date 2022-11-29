[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / IMulticallProvider

# Class: IMulticallProvider<TMulticallConfig\>

Provider for fetching data on chain using multicall contracts.

**`Export`**

**`Abstract`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `TMulticallConfig` | `any` |

## Hierarchy

- **`IMulticallProvider`**

  ↳ [`UniswapMulticallProvider`](UniswapMulticallProvider.md)

## Table of contents

### Constructors

- [constructor](IMulticallProvider.md#constructor)

### Methods

- [callMultipleFunctionsOnSameContract](IMulticallProvider.md#callmultiplefunctionsonsamecontract)
- [callSameFunctionOnContractWithMultipleParams](IMulticallProvider.md#callsamefunctiononcontractwithmultipleparams)
- [callSameFunctionOnMultipleContracts](IMulticallProvider.md#callsamefunctiononmultiplecontracts)

## Constructors

### constructor

• **new IMulticallProvider**<`TMulticallConfig`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TMulticallConfig` | `any` |

## Methods

### callMultipleFunctionsOnSameContract

▸ `Abstract` **callMultipleFunctionsOnSameContract**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunctionParams` | extends `undefined` \| `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CallMultipleFunctionsOnSameContractParams`](../modules.md#callmultiplefunctionsonsamecontractparams)<`TFunctionParams`, `TMulticallConfig`\> |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Defined in

[src/providers/multicall-provider.ts:113](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-provider.ts#L113)

___

### callSameFunctionOnContractWithMultipleParams

▸ `Abstract` **callSameFunctionOnContractWithMultipleParams**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

Calls a function on a single contract with different parameters.

For example, if you wanted to call the Uniswap V3 Quoter with 10 different
swap amounts this can be used to make the calls in a single multicall.

**`Abstract`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunctionParams` | extends `undefined` \| `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CallSameFunctionOnContractWithMultipleParams`](../modules.md#callsamefunctiononcontractwithmultipleparams)<`TFunctionParams`, `TMulticallConfig`\> |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Defined in

[src/providers/multicall-provider.ts:100](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-provider.ts#L100)

___

### callSameFunctionOnMultipleContracts

▸ `Abstract` **callSameFunctionOnMultipleContracts**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

Calls the same function on multiple contracts.

For example, if you wanted to get the ERC-20 balance of 10 different tokens
this can be used to call balance on the 10 contracts in a single multicall.

**`Abstract`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunctionParams` | extends `undefined` \| `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CallSameFunctionOnMultipleContractsParams`](../modules.md#callsamefunctiononmultiplecontractsparams)<`TFunctionParams`, `TMulticallConfig`\> |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Defined in

[src/providers/multicall-provider.ts:75](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-provider.ts#L75)
