[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / TickMath

# Class: TickMath

## Table of contents

### Constructors

- [constructor](TickMath.md#constructor)

### Properties

- [MAX\_SQRT\_RATIO](TickMath.md#max_sqrt_ratio)
- [MAX\_TICK](TickMath.md#max_tick)
- [MIN\_SQRT\_RATIO](TickMath.md#min_sqrt_ratio)
- [MIN\_TICK](TickMath.md#min_tick)

### Methods

- [getSqrtRatioAtTick](TickMath.md#getsqrtratioattick)
- [getTickAtSqrtRatio](TickMath.md#gettickatsqrtratio)

## Constructors

### constructor

• `Private` **new TickMath**()

Cannot be constructed.

#### Defined in

[utils/tickMath.ts:17](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L17)

## Properties

### MAX\_SQRT\_RATIO

▪ `Static` **MAX\_SQRT\_RATIO**: `default`

The sqrt ratio corresponding to the maximum tick that could be used on any pool.

#### Defined in

[utils/tickMath.ts:35](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L35)

___

### MAX\_TICK

▪ `Static` **MAX\_TICK**: `number` = `-TickMath.MIN_TICK`

The maximum tick that can be used on any pool.

#### Defined in

[utils/tickMath.ts:26](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L26)

___

### MIN\_SQRT\_RATIO

▪ `Static` **MIN\_SQRT\_RATIO**: `default`

The sqrt ratio corresponding to the minimum tick that could be used on any pool.

#### Defined in

[utils/tickMath.ts:31](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L31)

___

### MIN\_TICK

▪ `Static` **MIN\_TICK**: `number` = `-887272`

The minimum tick that can be used on any pool.

#### Defined in

[utils/tickMath.ts:22](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L22)

## Methods

### getSqrtRatioAtTick

▸ `Static` **getSqrtRatioAtTick**(`tick`): `default`

Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tick` | `number` | the tick for which to compute the sqrt ratio |

#### Returns

`default`

#### Defined in

[utils/tickMath.ts:41](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L41)

___

### getTickAtSqrtRatio

▸ `Static` **getTickAtSqrtRatio**(`sqrtRatioX96`): `number`

Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) \<= sqrtRatioX96
and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sqrtRatioX96` | `default` | the sqrt ratio as a Q64.96 for which to compute the tick |

#### Returns

`number`

#### Defined in

[utils/tickMath.ts:82](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickMath.ts#L82)
