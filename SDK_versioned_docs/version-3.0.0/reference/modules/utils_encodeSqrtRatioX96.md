[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/encodeSqrtRatioX96

# Module: utils/encodeSqrtRatioX96

## Table of contents

### Functions

- [encodeSqrtRatioX96](utils_encodeSqrtRatioX96.md#encodesqrtratiox96)

## Functions

### encodeSqrtRatioX96

▸ **encodeSqrtRatioX96**(`amount1`, `amount0`): `JSBI`

Returns the sqrt ratio as a Q64.96 corresponding to a given ratio of amount1 and amount0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount1` | `BigintIsh` | The numerator amount i.e., the amount of token1 |
| `amount0` | `BigintIsh` | The denominator amount i.e., the amount of token0 |

#### Returns

`JSBI`

The sqrt ratio

#### Defined in

[utils/encodeSqrtRatioX96.ts:11](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/encodeSqrtRatioX96.ts#L11)
