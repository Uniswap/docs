[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / CurrencyAmount

# Class: CurrencyAmount\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Currency`](../modules.md#currency) |

## Hierarchy

- [`Fraction`](Fraction.md)

  ↳ **`CurrencyAmount`**

## Table of contents

### Constructors

- [constructor](CurrencyAmount.md#constructor)

### Properties

- [currency](CurrencyAmount.md#currency)
- [decimalScale](CurrencyAmount.md#decimalscale)
- [denominator](CurrencyAmount.md#denominator)
- [numerator](CurrencyAmount.md#numerator)

### Accessors

- [asFraction](CurrencyAmount.md#asfraction)
- [quotient](CurrencyAmount.md#quotient)
- [remainder](CurrencyAmount.md#remainder)
- [wrapped](CurrencyAmount.md#wrapped)

### Methods

- [add](CurrencyAmount.md#add)
- [divide](CurrencyAmount.md#divide)
- [equalTo](CurrencyAmount.md#equalto)
- [greaterThan](CurrencyAmount.md#greaterthan)
- [invert](CurrencyAmount.md#invert)
- [lessThan](CurrencyAmount.md#lessthan)
- [multiply](CurrencyAmount.md#multiply)
- [subtract](CurrencyAmount.md#subtract)
- [toExact](CurrencyAmount.md#toexact)
- [toFixed](CurrencyAmount.md#tofixed)
- [toSignificant](CurrencyAmount.md#tosignificant)
- [fromFractionalAmount](CurrencyAmount.md#fromfractionalamount)
- [fromRawAmount](CurrencyAmount.md#fromrawamount)

## Constructors

### constructor

• `Protected` **new CurrencyAmount**\<`T`\>(`currency`, `numerator`, `denominator?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Currency`](../modules.md#currency) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `T` |
| `numerator` | [`BigintIsh`](../modules.md#bigintish) |
| `denominator?` | [`BigintIsh`](../modules.md#bigintish) |

#### Overrides

[Fraction](Fraction.md).[constructor](Fraction.md#constructor)

#### Defined in

[entities/fractions/currencyAmount.ts:40](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L40)

## Properties

### currency

• `Readonly` **currency**: `T`

#### Defined in

[entities/fractions/currencyAmount.ts:14](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L14)

___

### decimalScale

• `Readonly` **decimalScale**: `default`

#### Defined in

[entities/fractions/currencyAmount.ts:15](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L15)

___

### denominator

• `Readonly` **denominator**: `default`

#### Inherited from

[Fraction](Fraction.md).[denominator](Fraction.md#denominator)

#### Defined in

[entities/fractions/fraction.ts:26](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L26)

___

### numerator

• `Readonly` **numerator**: `default`

#### Inherited from

[Fraction](Fraction.md).[numerator](Fraction.md#numerator)

#### Defined in

[entities/fractions/fraction.ts:25](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L25)

## Accessors

### asFraction

• `get` **asFraction**(): [`Fraction`](Fraction.md)

Helper method for converting any super class back to a fraction

#### Returns

[`Fraction`](Fraction.md)

#### Inherited from

Fraction.asFraction

#### Defined in

[entities/fractions/fraction.ts:154](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L154)

___

### quotient

• `get` **quotient**(): `default`

#### Returns

`default`

#### Inherited from

Fraction.quotient

#### Defined in

[entities/fractions/fraction.ts:42](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L42)

___

### remainder

• `get` **remainder**(): [`Fraction`](Fraction.md)

#### Returns

[`Fraction`](Fraction.md)

#### Inherited from

Fraction.remainder

#### Defined in

[entities/fractions/fraction.ts:47](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L47)

___

### wrapped

• `get` **wrapped**(): [`CurrencyAmount`](CurrencyAmount.md)\<[`Token`](Token.md)\>

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<[`Token`](Token.md)\>

#### Defined in

[entities/fractions/currencyAmount.ts:91](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L91)

## Methods

### add

▸ **add**(`other`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`CurrencyAmount`](CurrencyAmount.md)\<`T`\> |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Overrides

[Fraction](Fraction.md).[add](Fraction.md#add)

#### Defined in

[entities/fractions/currencyAmount.ts:47](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L47)

___

### divide

▸ **divide**(`other`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Overrides

[Fraction](Fraction.md).[divide](Fraction.md#divide)

#### Defined in

[entities/fractions/currencyAmount.ts:64](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L64)

___

### equalTo

▸ **equalTo**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

`boolean`

#### Inherited from

[Fraction](Fraction.md).[equalTo](Fraction.md#equalto)

#### Defined in

[entities/fractions/fraction.ts:91](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L91)

___

### greaterThan

▸ **greaterThan**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

`boolean`

#### Inherited from

[Fraction](Fraction.md).[greaterThan](Fraction.md#greaterthan)

#### Defined in

[entities/fractions/fraction.ts:99](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L99)

___

### invert

▸ **invert**(): [`Fraction`](Fraction.md)

#### Returns

[`Fraction`](Fraction.md)

#### Inherited from

[Fraction](Fraction.md).[invert](Fraction.md#invert)

#### Defined in

[entities/fractions/fraction.ts:51](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L51)

___

### lessThan

▸ **lessThan**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

`boolean`

#### Inherited from

[Fraction](Fraction.md).[lessThan](Fraction.md#lessthan)

#### Defined in

[entities/fractions/fraction.ts:83](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L83)

___

### multiply

▸ **multiply**(`other`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Overrides

[Fraction](Fraction.md).[multiply](Fraction.md#multiply)

#### Defined in

[entities/fractions/currencyAmount.ts:59](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L59)

___

### subtract

▸ **subtract**(`other`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`CurrencyAmount`](CurrencyAmount.md)\<`T`\> |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Overrides

[Fraction](Fraction.md).[subtract](Fraction.md#subtract)

#### Defined in

[entities/fractions/currencyAmount.ts:53](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L53)

___

### toExact

▸ **toExact**(`format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `object` |

#### Returns

`string`

#### Defined in

[entities/fractions/currencyAmount.ts:86](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L86)

___

### toFixed

▸ **toFixed**(`decimalPlaces?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `decimalPlaces` | `number` | `undefined` |
| `format?` | `object` | `undefined` |
| `rounding` | [`Rounding`](../enums/Rounding.md) | `Rounding.ROUND_DOWN` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toFixed](Fraction.md#tofixed)

#### Defined in

[entities/fractions/currencyAmount.ts:77](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L77)

___

### toSignificant

▸ **toSignificant**(`significantDigits?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `significantDigits` | `number` | `6` |
| `format?` | `object` | `undefined` |
| `rounding` | [`Rounding`](../enums/Rounding.md) | `Rounding.ROUND_DOWN` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toSignificant](Fraction.md#tosignificant)

#### Defined in

[entities/fractions/currencyAmount.ts:69](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L69)

___

### fromFractionalAmount

▸ `Static` **fromFractionalAmount**\<`T`\>(`currency`, `numerator`, `denominator`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

Construct a currency amount with a denominator that is not equal to 1

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Currency`](../modules.md#currency) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `T` | the currency |
| `numerator` | [`BigintIsh`](../modules.md#bigintish) | the numerator of the fractional token amount |
| `denominator` | [`BigintIsh`](../modules.md#bigintish) | the denominator of the fractional token amount |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Defined in

[entities/fractions/currencyAmount.ts:32](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L32)

___

### fromRawAmount

▸ `Static` **fromRawAmount**\<`T`\>(`currency`, `rawAmount`): [`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Currency`](../modules.md#currency) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `T` | the currency in the amount |
| `rawAmount` | [`BigintIsh`](../modules.md#bigintish) | the raw token or ether amount |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`T`\>

#### Defined in

[entities/fractions/currencyAmount.ts:22](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/currencyAmount.ts#L22)
