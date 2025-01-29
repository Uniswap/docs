---
id: overview
sidebar_position: 1
title: Overview
---

## Table of contents

### Enumerations

- [Rounding](enums/Rounding.md)
- [ChainId](enums/ChainId.md)
- [NativeCurrencyName](enums/NativeCurrencyName.md)
- [TradeType](enums/TradeType.md)

### Classes

- [CurrencyAmount](classes/CurrencyAmount.md)
- [Ether](classes/Ether.md)
- [Fraction](classes/Fraction.md)
- [NativeCurrency](classes/NativeCurrency.md)
- [Percent](classes/Percent.md)
- [Price](classes/Price.md)
- [Token](classes/Token.md)

### Type Aliases

- [BigintIsh](modules.md#bigintish)
- [Currency](modules.md#currency)

### Variables

- [MaxUint256](modules.md#maxuint256)
- [WETH9](modules.md#weth9)

### Functions

- [computePriceImpact](modules.md#computepriceimpact)
- [sortedInsert](modules.md#sortedinsert)
- [sqrt](modules.md#sqrt)
- [validateAndParseAddress](modules.md#validateandparseaddress)

## Type Aliases

### BigintIsh

Ƭ **BigintIsh**: `JSBI` \| `string` \| `number`

#### Defined in

[constants.ts:24](https://github.com/Uniswap/sdk-core/blob/9997e88/src/constants.ts#L24)

___

### Currency

Ƭ **Currency**: [`NativeCurrency`](classes/NativeCurrency.md) \| [`Token`](classes/Token.md)

#### Defined in

[entities/currency.ts:4](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/currency.ts#L4)

## Variables

### MaxUint256

• `Const` **MaxUint256**: `default`

#### Defined in

[constants.ts:37](https://github.com/Uniswap/sdk-core/blob/9997e88/src/constants.ts#L37)

___

### WETH9

• `Const` **WETH9**: `Object`

Known WETH9 implementation addresses, used in our implementation of Ether#wrapped

#### Index signature

▪ [chainId: `number`]: [`Token`](classes/Token.md)

#### Defined in

[entities/weth9.ts:6](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/weth9.ts#L6)

## Functions

### computePriceImpact

▸ **computePriceImpact**\<`TBase`, `TQuote`\>(`midPrice`, `inputAmount`, `outputAmount`): [`Percent`](classes/Percent.md)

Returns the percent difference between the mid price and the execution price, i.e. price impact.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | extends [`Currency`](modules.md#currency) |
| `TQuote` | extends [`Currency`](modules.md#currency) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `midPrice` | [`Price`](classes/Price.md)\<`TBase`, `TQuote`\> | mid price before the trade |
| `inputAmount` | [`CurrencyAmount`](classes/CurrencyAmount.md)\<`TBase`\> | the input amount of the trade |
| `outputAmount` | [`CurrencyAmount`](classes/CurrencyAmount.md)\<`TQuote`\> | the output amount of the trade |

#### Returns

[`Percent`](classes/Percent.md)

#### Defined in

[utils/computePriceImpact.ts:9](https://github.com/Uniswap/sdk-core/blob/9997e88/src/utils/computePriceImpact.ts#L9)

___

### sortedInsert

▸ **sortedInsert**\<`T`\>(`items`, `add`, `maxSize`, `comparator`): `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `add` | `T` |
| `maxSize` | `number` |
| `comparator` | (`a`: `T`, `b`: `T`) => `number` |

#### Returns

`T` \| ``null``

#### Defined in

[utils/sortedInsert.ts:5](https://github.com/Uniswap/sdk-core/blob/9997e88/src/utils/sortedInsert.ts#L5)

___

### sqrt

▸ **sqrt**(`value`): `JSBI`

Computes floor(sqrt(value))

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `default` | the value for which to compute the square root, rounded down |

#### Returns

`JSBI`

#### Defined in

[utils/sqrt.ts:14](https://github.com/Uniswap/sdk-core/blob/9997e88/src/utils/sqrt.ts#L14)

___

### validateAndParseAddress

▸ **validateAndParseAddress**(`address`): `string`

Validates an address and returns the parsed (checksummed) version of that address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | the unchecksummed hex address |

#### Returns

`string`

#### Defined in

[utils/validateAndParseAddress.ts:7](https://github.com/Uniswap/sdk-core/blob/9997e88/src/utils/validateAndParseAddress.ts#L7)
