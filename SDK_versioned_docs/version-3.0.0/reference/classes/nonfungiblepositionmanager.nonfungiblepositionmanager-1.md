---
id: NonfungiblePositionManager
title: NonfungiblePositionManager
---

# NonfungiblePositionManager

## Hierarchy

- [*SelfPermit*](selfpermit.selfpermit-1.md)

  ↳ **NonfungiblePositionManager**

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: *Interface*

Overrides: [SelfPermit](selfpermit.selfpermit-1.md).[INTERFACE](selfpermit.selfpermit-1.md#interface)

Defined in: [nonfungiblePositionManager.ts:153](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L153)

## Methods

### addCallParameters

▸ `Static` **addCallParameters**(`position`: [*Position*](entities_position.position.md), `options`: [*AddLiquidityOptions*](../types/nonfungiblepositionmanager.addliquidityoptions.md)): [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [*Position*](entities_position.position.md) |
| `options` | [*AddLiquidityOptions*](../types/nonfungiblepositionmanager.addliquidityoptions.md) |

**Returns:** [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Defined in: [nonfungiblePositionManager.ts:162](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L162)

___

### collectCallParameters

▸ `Static` **collectCallParameters**(`options`: [*CollectOptions*](../interfaces/nonfungiblepositionmanager.collectoptions.md)): [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [*CollectOptions*](../interfaces/nonfungiblepositionmanager.collectoptions.md) |

**Returns:** [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Defined in: [nonfungiblePositionManager.ts:306](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L306)

___

### encodePermit

▸ `Static` `Protected` **encodePermit**(`token`: *Token*, `options`: [*PermitOptions*](../types/selfpermit.permitoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | *Token* |
| `options` | [*PermitOptions*](../types/selfpermit.permitoptions.md) |

**Returns:** *string*

Inherited from: [SelfPermit](selfpermit.selfpermit-1.md)

Defined in: [selfPermit.ts:34](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/selfPermit.ts#L34)

___

### removeCallParameters

▸ `Static` **removeCallParameters**(`position`: [*Position*](entities_position.position.md), `options`: [*RemoveLiquidityOptions*](../interfaces/nonfungiblepositionmanager.removeliquidityoptions.md)): [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Produces the calldata for completely or partially exiting a position

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [*Position*](entities_position.position.md) | the position to exit |
| `options` | [*RemoveLiquidityOptions*](../interfaces/nonfungiblepositionmanager.removeliquidityoptions.md) | additional information necessary for generating the calldata |

**Returns:** [*MethodParameters*](../interfaces/utils_calldata.methodparameters.md)

Defined in: [nonfungiblePositionManager.ts:323](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L323)
