[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [selfPermit](../modules/selfPermit.md) / SelfPermit

# Class: SelfPermit

[selfPermit](../modules/selfPermit.md).SelfPermit

## Hierarchy

- **`SelfPermit`**

  ↳ [`NonfungiblePositionManager`](nonfungiblePositionManager.NonfungiblePositionManager.md)

  ↳ [`SwapRouter`](swapRouter.SwapRouter.md)

## Table of contents

### Constructors

- [constructor](selfPermit.SelfPermit.md#constructor)

### Properties

- [INTERFACE](selfPermit.SelfPermit.md#interface)

### Methods

- [encodePermit](selfPermit.SelfPermit.md#encodepermit)

## Constructors

### constructor

• `Protected` **new SelfPermit**()

#### Defined in

[selfPermit.ts:31](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/selfPermit.ts#L31)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Defined in

[selfPermit.ts:29](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/selfPermit.ts#L29)

## Methods

### encodePermit

▸ `Static` `Protected` **encodePermit**(`token`, `options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |
| `options` | [`PermitOptions`](../modules/selfPermit.md#permitoptions) |

#### Returns

`string`

#### Defined in

[selfPermit.ts:33](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/selfPermit.ts#L33)
