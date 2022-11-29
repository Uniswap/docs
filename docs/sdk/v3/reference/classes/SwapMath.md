[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / SwapMath

# Class: SwapMath

## Table of contents

### Constructors

- [constructor](SwapMath.md#constructor)

### Methods

- [computeSwapStep](SwapMath.md#computeswapstep)

## Constructors

### constructor

• `Private` **new SwapMath**()

Cannot be constructed.

#### Defined in

[utils/swapMath.ts:13](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/swapMath.ts#L13)

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
| `feePips` | [`FeeAmount`](../enums/FeeAmount.md) |

#### Returns

[`default`, `default`, `default`, `default`]

#### Defined in

[utils/swapMath.ts:15](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/swapMath.ts#L15)
