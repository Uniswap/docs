[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / NonfungiblePositionManager

# Class: NonfungiblePositionManager

## Table of contents

### Constructors

- [constructor](NonfungiblePositionManager.md#constructor)

### Properties

- [INTERFACE](NonfungiblePositionManager.md#interface)

### Methods

- [addCallParameters](NonfungiblePositionManager.md#addcallparameters)
- [collectCallParameters](NonfungiblePositionManager.md#collectcallparameters)
- [createCallParameters](NonfungiblePositionManager.md#createcallparameters)
- [encodeCollect](NonfungiblePositionManager.md#encodecollect)
- [encodeCreate](NonfungiblePositionManager.md#encodecreate)
- [removeCallParameters](NonfungiblePositionManager.md#removecallparameters)
- [safeTransferFromParameters](NonfungiblePositionManager.md#safetransferfromparameters)

## Constructors

### constructor

• `Private` **new NonfungiblePositionManager**()

Cannot be constructed.

#### Defined in

[nonfungiblePositionManager.ts:181](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L181)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Defined in

[nonfungiblePositionManager.ts:176](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L176)

## Methods

### addCallParameters

▸ `Static` **addCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Position`](Position.md) |
| `options` | [`AddLiquidityOptions`](../modules.md#addliquidityoptions) |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:199](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L199)

___

### collectCallParameters

▸ `Static` **collectCallParameters**(`options`): [`MethodParameters`](../interfaces/MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CollectOptions`](../interfaces/CollectOptions.md) |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:326](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L326)

___

### createCallParameters

▸ `Static` **createCallParameters**(`pool`): [`MethodParameters`](../interfaces/MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](Pool.md) |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:192](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L192)

___

### encodeCollect

▸ `Static` `Private` **encodeCollect**(`options`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CollectOptions`](../interfaces/CollectOptions.md) |

#### Returns

`string`[]

#### Defined in

[nonfungiblePositionManager.ts:286](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L286)

___

### encodeCreate

▸ `Static` `Private` **encodeCreate**(`pool`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](Pool.md) |

#### Returns

`string`

#### Defined in

[nonfungiblePositionManager.ts:183](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L183)

___

### removeCallParameters

▸ `Static` **removeCallParameters**(`position`, `options`): [`MethodParameters`](../interfaces/MethodParameters.md)

Produces the calldata for completely or partially exiting a position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Position`](Position.md) | The position to exit |
| `options` | [`RemoveLiquidityOptions`](../interfaces/RemoveLiquidityOptions.md) | Additional information necessary for generating the calldata |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

The call parameters

#### Defined in

[nonfungiblePositionManager.ts:341](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L341)

___

### safeTransferFromParameters

▸ `Static` **safeTransferFromParameters**(`options`): [`MethodParameters`](../interfaces/MethodParameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SafeTransferOptions`](../interfaces/SafeTransferOptions.md) |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

#### Defined in

[nonfungiblePositionManager.ts:416](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L416)
