[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/computePoolAddress

# Module: utils/computePoolAddress

## Table of contents

### Functions

- [computePoolAddress](utils_computePoolAddress.md#computepooladdress)

## Functions

### computePoolAddress

▸ **computePoolAddress**(`__namedParameters`): `string`

Computes a pool address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.factoryAddress` | `string` | The Uniswap V3 factory address |
| `__namedParameters.fee` | [`FeeAmount`](../enums/constants.FeeAmount.md) | The fee tier of the pool |
| `__namedParameters.initCodeHashManualOverride?` | `string` | - |
| `__namedParameters.tokenA` | `Token` | The first token of the pair, irrespective of sort order |
| `__namedParameters.tokenB` | `Token` | The second token of the pair, irrespective of sort order |

#### Returns

`string`

The pool address

#### Defined in

[utils/computePoolAddress.ts:20](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/computePoolAddress.ts#L20)
