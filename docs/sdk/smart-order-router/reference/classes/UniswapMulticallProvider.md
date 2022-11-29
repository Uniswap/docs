[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / UniswapMulticallProvider

# Class: UniswapMulticallProvider

The UniswapMulticall contract has added functionality for limiting the amount of gas
that each call within the multicall can consume. This is useful for operations where
a call could consume such a large amount of gas that it causes the node to error out
with an out of gas error.

**`Export`**

## Hierarchy

- [`IMulticallProvider`](IMulticallProvider.md)<[`UniswapMulticallConfig`](../modules.md#uniswapmulticallconfig)\>

  ↳ **`UniswapMulticallProvider`**

## Table of contents

### Constructors

- [constructor](UniswapMulticallProvider.md#constructor)

### Properties

- [chainId](UniswapMulticallProvider.md#chainid)
- [gasLimitPerCall](UniswapMulticallProvider.md#gaslimitpercall)
- [multicallContract](UniswapMulticallProvider.md#multicallcontract)
- [provider](UniswapMulticallProvider.md#provider)

### Methods

- [callMultipleFunctionsOnSameContract](UniswapMulticallProvider.md#callmultiplefunctionsonsamecontract)
- [callSameFunctionOnContractWithMultipleParams](UniswapMulticallProvider.md#callsamefunctiononcontractwithmultipleparams)
- [callSameFunctionOnMultipleContracts](UniswapMulticallProvider.md#callsamefunctiononmultiplecontracts)

## Constructors

### constructor

• **new UniswapMulticallProvider**(`chainId`, `provider`, `gasLimitPerCall?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `provider` | `BaseProvider` | `undefined` |
| `gasLimitPerCall` | `number` | `1_000_000` |

#### Overrides

[IMulticallProvider](IMulticallProvider.md).[constructor](IMulticallProvider.md#constructor)

#### Defined in

[src/providers/multicall-uniswap-provider.ts:36](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L36)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/multicall-uniswap-provider.ts:37](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L37)

___

### gasLimitPerCall

• `Protected` **gasLimitPerCall**: `number` = `1_000_000`

#### Defined in

[src/providers/multicall-uniswap-provider.ts:39](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L39)

___

### multicallContract

• `Private` **multicallContract**: `UniswapInterfaceMulticall`

#### Defined in

[src/providers/multicall-uniswap-provider.ts:34](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L34)

___

### provider

• `Protected` **provider**: `BaseProvider`

#### Defined in

[src/providers/multicall-uniswap-provider.ts:38](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L38)

## Methods

### callMultipleFunctionsOnSameContract

▸ **callMultipleFunctionsOnSameContract**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `approxGasUsedPerSuccessCall`: `number` ; `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunctionParams` | extends `undefined` \| `any`[] |
| `TReturn` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CallMultipleFunctionsOnSameContractParams`](../modules.md#callmultiplefunctionsonsamecontractparams)<`TFunctionParams`, [`UniswapMulticallConfig`](../modules.md#uniswapmulticallconfig)\> |

#### Returns

`Promise`<{ `approxGasUsedPerSuccessCall`: `number` ; `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Overrides

[IMulticallProvider](IMulticallProvider.md).[callMultipleFunctionsOnSameContract](IMulticallProvider.md#callmultiplefunctionsonsamecontract)

#### Defined in

[src/providers/multicall-uniswap-provider.ts:225](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L225)

___

### callSameFunctionOnContractWithMultipleParams

▸ **callSameFunctionOnContractWithMultipleParams**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `approxGasUsedPerSuccessCall`: `number` ; `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

Calls a function on a single contract with different parameters.

For example, if you wanted to call the Uniswap V3 Quoter with 10 different
swap amounts this can be used to make the calls in a single multicall.

**`Abstract`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TFunctionParams` | extends `undefined` \| `any`[] |
| `TReturn` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CallSameFunctionOnContractWithMultipleParams`](../modules.md#callsamefunctiononcontractwithmultipleparams)<`TFunctionParams`, [`UniswapMulticallConfig`](../modules.md#uniswapmulticallconfig)\> |

#### Returns

`Promise`<{ `approxGasUsedPerSuccessCall`: `number` ; `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Overrides

[IMulticallProvider](IMulticallProvider.md).[callSameFunctionOnContractWithMultipleParams](IMulticallProvider.md#callsamefunctiononcontractwithmultipleparams)

#### Defined in

[src/providers/multicall-uniswap-provider.ts:134](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L134)

___

### callSameFunctionOnMultipleContracts

▸ **callSameFunctionOnMultipleContracts**<`TFunctionParams`, `TReturn`\>(`params`): `Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

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
| `params` | [`CallSameFunctionOnMultipleContractsParams`](../modules.md#callsamefunctiononmultiplecontractsparams)<`TFunctionParams`, `any`\> |

#### Returns

`Promise`<{ `blockNumber`: `BigNumber` ; `results`: [`Result`](../modules.md#result)<`TReturn`\>[]  }\>

#### Overrides

[IMulticallProvider](IMulticallProvider.md).[callSameFunctionOnMultipleContracts](IMulticallProvider.md#callsamefunctiononmultiplecontracts)

#### Defined in

[src/providers/multicall-uniswap-provider.ts:56](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/multicall-uniswap-provider.ts#L56)
