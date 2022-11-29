[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / Percent

# Class: Percent

## Hierarchy

- [`Fraction`](Fraction.md)

  ↳ **`Percent`**

## Table of contents

### Constructors

- [constructor](Percent.md#constructor)

### Properties

- [denominator](Percent.md#denominator)
- [isPercent](Percent.md#ispercent)
- [numerator](Percent.md#numerator)

### Accessors

- [asFraction](Percent.md#asfraction)
- [quotient](Percent.md#quotient)
- [remainder](Percent.md#remainder)

### Methods

- [add](Percent.md#add)
- [divide](Percent.md#divide)
- [equalTo](Percent.md#equalto)
- [greaterThan](Percent.md#greaterthan)
- [invert](Percent.md#invert)
- [lessThan](Percent.md#lessthan)
- [multiply](Percent.md#multiply)
- [subtract](Percent.md#subtract)
- [toFixed](Percent.md#tofixed)
- [toSignificant](Percent.md#tosignificant)

## Constructors

### constructor

• **new Percent**(`numerator`, `denominator?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numerator` | [`BigintIsh`](../modules.md#bigintish) |
| `denominator` | [`BigintIsh`](../modules.md#bigintish) |

#### Inherited from

[Fraction](Fraction.md).[constructor](Fraction.md#constructor)

#### Defined in

[entities/fractions/fraction.ts:28](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L28)

## Properties

### denominator

• `Readonly` **denominator**: `default`

#### Inherited from

[Fraction](Fraction.md).[denominator](Fraction.md#denominator)

#### Defined in

[entities/fractions/fraction.ts:26](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L26)

___

### isPercent

• `Readonly` **isPercent**: ``true``

This boolean prevents a fraction from being interpreted as a Percent

#### Defined in

[entities/fractions/percent.ts:19](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L19)

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

## Methods

### add

▸ **add**(`other`): [`Percent`](Percent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Percent`](Percent.md)

#### Overrides

[Fraction](Fraction.md).[add](Fraction.md#add)

#### Defined in

[entities/fractions/percent.ts:21](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L21)

___

### divide

▸ **divide**(`other`): [`Percent`](Percent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Percent`](Percent.md)

#### Overrides

[Fraction](Fraction.md).[divide](Fraction.md#divide)

#### Defined in

[entities/fractions/percent.ts:33](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L33)

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

▸ **multiply**(`other`): [`Percent`](Percent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Percent`](Percent.md)

#### Overrides

[Fraction](Fraction.md).[multiply](Fraction.md#multiply)

#### Defined in

[entities/fractions/percent.ts:29](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L29)

___

### subtract

▸ **subtract**(`other`): [`Percent`](Percent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Percent`](Percent.md)

#### Overrides

[Fraction](Fraction.md).[subtract](Fraction.md#subtract)

#### Defined in

[entities/fractions/percent.ts:25](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L25)

___

### toFixed

▸ **toFixed**(`decimalPlaces?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `decimalPlaces` | `number` | `2` |
| `format?` | `object` | `undefined` |
| `rounding?` | [`Rounding`](../enums/Rounding.md) | `undefined` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toFixed](Fraction.md#tofixed)

#### Defined in

[entities/fractions/percent.ts:41](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L41)

___

### toSignificant

▸ **toSignificant**(`significantDigits?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `significantDigits` | `number` | `5` |
| `format?` | `object` | `undefined` |
| `rounding?` | [`Rounding`](../enums/Rounding.md) | `undefined` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toSignificant](Fraction.md#tosignificant)

#### Defined in

[entities/fractions/percent.ts:37](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/percent.ts#L37)
