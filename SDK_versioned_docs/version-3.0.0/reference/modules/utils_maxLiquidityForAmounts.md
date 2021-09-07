[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/maxLiquidityForAmounts

# Module: utils/maxLiquidityForAmounts

## Table of contents

### Functions

- [maxLiquidityForAmounts](utils_maxLiquidityForAmounts.md#maxliquidityforamounts)

## Functions

### maxLiquidityForAmounts

▸ **maxLiquidityForAmounts**(`sqrtRatioCurrentX96`, `sqrtRatioAX96`, `sqrtRatioBX96`, `amount0`, `amount1`, `useFullPrecision`): `JSBI`

Computes the maximum amount of liquidity received for a given amount of token0, token1,
and the prices at the tick boundaries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sqrtRatioCurrentX96` | `JSBI` | the current price |
| `sqrtRatioAX96` | `JSBI` | price at lower boundary |
| `sqrtRatioBX96` | `JSBI` | price at upper boundary |
| `amount0` | `BigintIsh` | token0 amount |
| `amount1` | `BigintIsh` | token1 amount |
| `useFullPrecision` | `boolean` | if false, liquidity will be maximized according to what the router can calculate, not what core can theoretically support |

#### Returns

`JSBI`

#### Defined in

[utils/maxLiquidityForAmounts.ts:68](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/maxLiquidityForAmounts.ts#L68)
