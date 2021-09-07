[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [utils/swapMath](../modules/utils_swapMath.md) / SwapMath

# Class: SwapMath

[utils/swapMath](../modules/utils_swapMath.md).SwapMath

## Table of contents

### Constructors

- [constructor](utils_swapMath.SwapMath.md#constructor)

### Methods

- [computeSwapStep](utils_swapMath.SwapMath.md#computeswapstep)

## Constructors

### constructor

• `Private` **new SwapMath**()

Cannot be constructed.

#### Defined in

[utils/swapMath.ts:13](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/swapMath.ts#L13)

## Methods

### computeSwapStep

▸ `Static` **computeSwapStep**(`sqrtRatioCurrentX96`, `sqrtRatioTargetX96`, `liquidity`, `amountRemaining`, `feePips`): [`default`, `default`, `default`, `default`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `sqrtRatioCurrentX96` | `default` |
| `sqrtRatioTargetX96` | `default` |
| `liquidity` | `default` |
| `amountRemaining` | `default` |
| `feePips` | [`FeeAmount`](../enums/constants.FeeAmount.md) |

#### Returns

[`default`, `default`, `default`, `default`]

#### Defined in

[utils/swapMath.ts:15](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/swapMath.ts#L15)
