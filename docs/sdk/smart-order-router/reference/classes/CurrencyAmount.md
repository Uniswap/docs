[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CurrencyAmount

# Class: CurrencyAmount

## Hierarchy

- `CurrencyAmount`<`Currency`\>

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

• `Protected` **new CurrencyAmount**(`currency`, `numerator`, `denominator?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency` |
| `numerator` | `BigintIsh` |
| `denominator?` | `BigintIsh` |

#### Inherited from

CurrencyAmountRaw<Currency\>.constructor

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:22

## Properties

### currency

• `Readonly` **currency**: `Currency`

#### Inherited from

CurrencyAmountRaw.currency

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:7

___

### decimalScale

• `Readonly` **decimalScale**: `default`

#### Inherited from

CurrencyAmountRaw.decimalScale

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:8

___

### denominator

• `Readonly` **denominator**: `default`

#### Inherited from

CurrencyAmountRaw.denominator

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:5

___

### numerator

• `Readonly` **numerator**: `default`

#### Inherited from

CurrencyAmountRaw.numerator

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:4

## Accessors

### asFraction

• `get` **asFraction**(): `Fraction`

Helper method for converting any super class back to a fraction

#### Returns

`Fraction`

#### Inherited from

CurrencyAmountRaw.asFraction

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:23

___

### quotient

• `get` **quotient**(): `default`

#### Returns

`default`

#### Inherited from

CurrencyAmountRaw.quotient

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:8

___

### remainder

• `get` **remainder**(): `Fraction`

#### Returns

`Fraction`

#### Inherited from

CurrencyAmountRaw.remainder

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:9

___

### wrapped

• `get` **wrapped**(): `CurrencyAmount`<`Token`\>

#### Returns

`CurrencyAmount`<`Token`\>

#### Inherited from

CurrencyAmountRaw.wrapped

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:30

## Methods

### add

▸ **add**(`other`): `CurrencyAmount`<`Currency`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `CurrencyAmount`<`Currency`\> |

#### Returns

`CurrencyAmount`<`Currency`\>

#### Inherited from

CurrencyAmountRaw.add

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:23

___

### divide

▸ **divide**(`other`): `CurrencyAmount`<`Currency`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Fraction` \| `BigintIsh` |

#### Returns

`CurrencyAmount`<`Currency`\>

#### Inherited from

CurrencyAmountRaw.divide

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:26

___

### equalTo

▸ **equalTo**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Fraction` \| `BigintIsh` |

#### Returns

`boolean`

#### Inherited from

CurrencyAmountRaw.equalTo

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:14

___

### greaterThan

▸ **greaterThan**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Fraction` \| `BigintIsh` |

#### Returns

`boolean`

#### Inherited from

CurrencyAmountRaw.greaterThan

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:15

___

### invert

▸ **invert**(): `Fraction`

#### Returns

`Fraction`

#### Inherited from

CurrencyAmountRaw.invert

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:10

___

### lessThan

▸ **lessThan**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Fraction` \| `BigintIsh` |

#### Returns

`boolean`

#### Inherited from

CurrencyAmountRaw.lessThan

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/fraction.d.ts:13

___

### multiply

▸ **multiply**(`other`): `CurrencyAmount`<`Currency`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Fraction` \| `BigintIsh` |

#### Returns

`CurrencyAmount`<`Currency`\>

#### Inherited from

CurrencyAmountRaw.multiply

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:25

___

### subtract

▸ **subtract**(`other`): `CurrencyAmount`<`Currency`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `CurrencyAmount`<`Currency`\> |

#### Returns

`CurrencyAmount`<`Currency`\>

#### Inherited from

CurrencyAmountRaw.subtract

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:24

___

### toExact

▸ **toExact**(`format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format?` | `object` |

#### Returns

`string`

#### Inherited from

CurrencyAmountRaw.toExact

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:29

___

### toFixed

▸ **toFixed**(`decimalPlaces?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decimalPlaces?` | `number` |
| `format?` | `object` |
| `rounding?` | `Rounding` |

#### Returns

`string`

#### Inherited from

CurrencyAmountRaw.toFixed

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:28

___

### toSignificant

▸ **toSignificant**(`significantDigits?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `significantDigits?` | `number` |
| `format?` | `object` |
| `rounding?` | `Rounding` |

#### Returns

`string`

#### Inherited from

CurrencyAmountRaw.toSignificant

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:27

___

### fromFractionalAmount

▸ `Static` **fromFractionalAmount**<`T`\>(`currency`, `numerator`, `denominator`): `CurrencyAmount`<`T`\>

Construct a currency amount with a denominator that is not equal to 1

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Currency` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `T` | the currency |
| `numerator` | `BigintIsh` | the numerator of the fractional token amount |
| `denominator` | `BigintIsh` | the denominator of the fractional token amount |

#### Returns

`CurrencyAmount`<`T`\>

#### Inherited from

CurrencyAmountRaw.fromFractionalAmount

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:21

___

### fromRawAmount

▸ `Static` **fromRawAmount**<`T`\>(`currency`, `rawAmount`): `CurrencyAmount`<`T`\>

Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Currency` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `T` | the currency in the amount |
| `rawAmount` | `BigintIsh` | the raw token or ether amount |

#### Returns

`CurrencyAmount`<`T`\>

#### Inherited from

CurrencyAmountRaw.fromRawAmount

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/fractions/currencyAmount.d.ts:14
