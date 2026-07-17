[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / Payments

# Class: Payments

## Table of contents

### Constructors

- [constructor](Payments.md#constructor)

### Properties

- [INTERFACE](Payments.md#interface)

### Methods

- [encodeFeeBips](Payments.md#encodefeebips)
- [encodeRefundETH](Payments.md#encoderefundeth)
- [encodeSweepToken](Payments.md#encodesweeptoken)
- [encodeUnwrapWETH9](Payments.md#encodeunwrapweth9)

## Constructors

### constructor

• `Private` **new Payments**()

Cannot be constructed.

#### Defined in

[payments.ts:25](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L25)

## Properties

### INTERFACE

▪ `Static` **INTERFACE**: `Interface`

#### Defined in

[payments.ts:20](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L20)

## Methods

### encodeFeeBips

▸ `Static` `Private` **encodeFeeBips**(`fee`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fee` | `Percent` |

#### Returns

`string`

#### Defined in

[payments.ts:27](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L27)

___

### encodeRefundETH

▸ `Static` **encodeRefundETH**(): `string`

#### Returns

`string`

#### Defined in

[payments.ts:73](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L73)

___

### encodeSweepToken

▸ `Static` **encodeSweepToken**(`token`, `amountMinimum`, `recipient`, `feeOptions?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Token` |
| `amountMinimum` | `default` |
| `recipient` | `string` |
| `feeOptions?` | [`FeeOptions`](../interfaces/FeeOptions.md) |

#### Returns

`string`

#### Defined in

[payments.ts:49](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L49)

___

### encodeUnwrapWETH9

▸ `Static` **encodeUnwrapWETH9**(`amountMinimum`, `recipient`, `feeOptions?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountMinimum` | `default` |
| `recipient` | `string` |
| `feeOptions?` | [`FeeOptions`](../interfaces/FeeOptions.md) |

#### Returns

`string`

#### Defined in

[payments.ts:31](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/payments.ts#L31)
