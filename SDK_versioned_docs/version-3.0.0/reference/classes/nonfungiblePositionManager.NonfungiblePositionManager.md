[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [nonfungiblePositionManager](../modules/nonfungiblePositionManager.md) / NonfungiblePositionManager

# Class: NonfungiblePositionManager

[nonfungiblePositionManager](../modules/nonfungiblePositionManager.md).NonfungiblePositionManager

## Hierarchy

- [`SelfPermit`](selfPermit.SelfPermit.md)

  ↳ **`NonfungiblePositionManager`**

## Table of contents

### Constructors

- [constructor](nonfungiblePositionManager.NonfungiblePositionManager.md#constructor)

### Properties

- [INTERFACE](nonfungiblePositionManager.NonfungiblePositionManager.md#interface)

### Methods

- [addCallParameters](nonfungiblePositionManager.NonfungiblePositionManager.md#addcallparameters)
- [collectCallParameters](nonfungiblePositionManager.NonfungiblePositionManager.md#collectcallparameters)
- [createCallParameters](nonfungiblePositionManager.NonfungiblePositionManager.md#createcallparameters)
- [encodeCollect](nonfungiblePositionManager.NonfungiblePositionManager.md#encodecollect)
- [encodeCreate](nonfungiblePositionManager.NonfungiblePositionManager.md#encodecreate)
- [encodePermit](nonfungiblePositionManager.NonfungiblePositionManager.md#encodepermit)
- [removeCallParameters](nonfungiblePositionManager.NonfungiblePositionManager.md#removecallparameters)

## Constructors

### constructor

• `Private` **new NonfungiblePositionManager**()

Cannot be constructed.

#### Overrides

[SelfPermit](selfPermit.SelfPermit.md).[constructor](selfPermit.SelfPermit.md#constructor)

#### Defined in

[nonfungiblePositionManager.ts:158](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L158)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Overrides

[SelfPermit](selfPermit.SelfPermit.md).[INTERFACE](selfPermit.SelfPermit.md#interface)

#### Defined in

[nonfungiblePositionManager.ts:153](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L153)

## Methods

### addCallParameters

▸ `Static` **addCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](entities_position.Position.md) |
| `options` | [`AddLiquidityOptions`](../modules/nonfungiblePositionManager.md#addliquidityoptions) |

#### Returns

[`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:178](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L178)

___

### collectCallParameters

▸ `Static` **collectCallParameters**(`options`): [`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CollectOptions`](../interfaces/nonfungiblePositionManager.CollectOptions.md) |

#### Returns

[`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:316](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L316)

___

### createCallParameters

▸ `Static` **createCallParameters**(`pool`): [`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](entities_pool.Pool.md) |

#### Returns

[`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:171](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L171)

___

### encodeCollect

▸ `Static` `Private` **encodeCollect**(`options`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CollectOptions`](../interfaces/nonfungiblePositionManager.CollectOptions.md) |

#### Returns

`string`[]

#### Defined in

[nonfungiblePositionManager.ts:268](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L268)

___

### encodeCreate

▸ `Static` `Private` **encodeCreate**(`pool`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](entities_pool.Pool.md) |

#### Returns

`string`

#### Defined in

[nonfungiblePositionManager.ts:162](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L162)

___

### encodePermit

▸ `Static` `Protected` **encodePermit**(`token`, `options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |
| `options` | [`PermitOptions`](../modules/selfPermit.md#permitoptions) |

#### Returns

`string`

#### Inherited from

[SelfPermit](selfPermit.SelfPermit.md).[encodePermit](selfPermit.SelfPermit.md#encodepermit)

#### Defined in

[selfPermit.ts:33](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/selfPermit.ts#L33)

___

### removeCallParameters

▸ `Static` **removeCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

Produces the calldata for completely or partially exiting a position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Position`](entities_position.Position.md) | The position to exit |
| `options` | [`RemoveLiquidityOptions`](../interfaces/nonfungiblePositionManager.RemoveLiquidityOptions.md) | Additional information necessary for generating the calldata |

#### Returns

[`MethodParameters`](../interfaces/utils_calldata.MethodParameters.md)

The call parameters

#### Defined in

[nonfungiblePositionManager.ts:334](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L334)
