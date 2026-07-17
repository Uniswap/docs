[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / Fraction

# Class: Fraction

## Hierarchy

- **`Fraction`**

  ↳ [`CurrencyAmount`](CurrencyAmount.md)

  ↳ [`Percent`](Percent.md)

  ↳ [`Price`](Price.md)

## Table of contents

### Constructors

- [constructor](Fraction.md#constructor)

### Properties

- [denominator](Fraction.md#denominator)
- [numerator](Fraction.md#numerator)

### Accessors

- [asFraction](Fraction.md#asfraction)
- [quotient](Fraction.md#quotient)
- [remainder](Fraction.md#remainder)

### Methods

- [add](Fraction.md#add)
- [divide](Fraction.md#divide)
- [equalTo](Fraction.md#equalto)
- [greaterThan](Fraction.md#greaterthan)
- [invert](Fraction.md#invert)
- [lessThan](Fraction.md#lessthan)
- [multiply](Fraction.md#multiply)
- [subtract](Fraction.md#subtract)
- [toFixed](Fraction.md#tofixed)
- [toSignificant](Fraction.md#tosignificant)
- [tryParseFraction](Fraction.md#tryparsefraction)

## Constructors

### constructor

• **new Fraction**(`numerator`, `denominator?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numerator` | [`BigintIsh`](../modules.md#bigintish) |
| `denominator` | [`BigintIsh`](../modules.md#bigintish) |

#### Defined in

[entities/fractions/fraction.ts:28](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L28)

## Properties

### denominator

• `Readonly` **denominator**: `default`

#### Defined in

[entities/fractions/fraction.ts:26](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L26)

___

### numerator

• `Readonly` **numerator**: `default`

#### Defined in

[entities/fractions/fraction.ts:25](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L25)

## Accessors

### asFraction

• `get` **asFraction**(): [`Fraction`](Fraction.md)

Helper method for converting any super class back to a fraction

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:154](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L154)

___

### quotient

• `get` **quotient**(): `default`

#### Returns

`default`

#### Defined in

[entities/fractions/fraction.ts:42](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L42)

___

### remainder

• `get` **remainder**(): [`Fraction`](Fraction.md)

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:47](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L47)

## Methods

### add

▸ **add**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:55](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L55)

___

### divide

▸ **divide**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:115](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L115)

___

### equalTo

▸ **equalTo**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

`boolean`

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

#### Defined in

[entities/fractions/fraction.ts:99](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L99)

___

### invert

▸ **invert**(): [`Fraction`](Fraction.md)

#### Returns

[`Fraction`](Fraction.md)

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

#### Defined in

[entities/fractions/fraction.ts:83](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L83)

___

### multiply

▸ **multiply**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:107](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L107)

___

### subtract

▸ **subtract**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:69](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L69)

___

### toFixed

▸ **toFixed**(`decimalPlaces`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `decimalPlaces` | `number` | `undefined` |
| `format` | `object` | `undefined` |
| `rounding` | [`Rounding`](../enums/Rounding.md) | `Rounding.ROUND_HALF_UP` |

#### Returns

`string`

#### Defined in

[entities/fractions/fraction.ts:138](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L138)

___

### toSignificant

▸ **toSignificant**(`significantDigits`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `significantDigits` | `number` | `undefined` |
| `format` | `object` | `undefined` |
| `rounding` | [`Rounding`](../enums/Rounding.md) | `Rounding.ROUND_HALF_UP` |

#### Returns

`string`

#### Defined in

[entities/fractions/fraction.ts:123](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L123)

___

### tryParseFraction

▸ `Static` `Private` **tryParseFraction**(`fractionish`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fractionish` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/fraction.ts:33](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L33)
