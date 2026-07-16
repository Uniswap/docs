[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / Price

# Class: Price\<TBase, TQuote\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | extends [`Currency`](../modules.md#currency) |
| `TQuote` | extends [`Currency`](../modules.md#currency) |

## Hierarchy

- [`Fraction`](Fraction.md)

  ↳ **`Price`**

## Table of contents

### Constructors

- [constructor](Price.md#constructor)

### Properties

- [baseCurrency](Price.md#basecurrency)
- [denominator](Price.md#denominator)
- [numerator](Price.md#numerator)
- [quoteCurrency](Price.md#quotecurrency)
- [scalar](Price.md#scalar)

### Accessors

- [adjustedForDecimals](Price.md#adjustedfordecimals)
- [asFraction](Price.md#asfraction)
- [quotient](Price.md#quotient)
- [remainder](Price.md#remainder)

### Methods

- [add](Price.md#add)
- [divide](Price.md#divide)
- [equalTo](Price.md#equalto)
- [greaterThan](Price.md#greaterthan)
- [invert](Price.md#invert)
- [lessThan](Price.md#lessthan)
- [multiply](Price.md#multiply)
- [quote](Price.md#quote)
- [subtract](Price.md#subtract)
- [toFixed](Price.md#tofixed)
- [toSignificant](Price.md#tosignificant)

## Constructors

### constructor

• **new Price**\<`TBase`, `TQuote`\>(...`args`)

Construct a price, either with the base and quote currency amount, or the

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBase` | extends [`Currency`](../modules.md#currency) |
| `TQuote` | extends [`Currency`](../modules.md#currency) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`TBase`, `TQuote`, [`BigintIsh`](../modules.md#bigintish), [`BigintIsh`](../modules.md#bigintish)] \| [\{ `baseAmount`: [`CurrencyAmount`](CurrencyAmount.md)\<`TBase`\> ; `quoteAmount`: [`CurrencyAmount`](CurrencyAmount.md)\<`TQuote`\>  \}] |

#### Overrides

[Fraction](Fraction.md).[constructor](Fraction.md#constructor)

#### Defined in

[entities/fractions/price.ts:18](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L18)

## Properties

### baseCurrency

• `Readonly` **baseCurrency**: `TBase`

#### Defined in

[entities/fractions/price.ts:10](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L10)

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

___

### quoteCurrency

• `Readonly` **quoteCurrency**: `TQuote`

#### Defined in

[entities/fractions/price.ts:11](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L11)

___

### scalar

• `Readonly` **scalar**: [`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/price.ts:12](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L12)

## Accessors

### adjustedForDecimals

• `Private` `get` **adjustedForDecimals**(): [`Fraction`](Fraction.md)

Get the value scaled by decimals for formatting

#### Returns

[`Fraction`](Fraction.md)

#### Defined in

[entities/fractions/price.ts:77](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L77)

___

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

▸ **add**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Inherited from

[Fraction](Fraction.md).[add](Fraction.md#add)

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

#### Inherited from

[Fraction](Fraction.md).[divide](Fraction.md#divide)

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

▸ **invert**(): [`Price`](Price.md)\<`TQuote`, `TBase`\>

Flip the price, switching the base and quote currency

#### Returns

[`Price`](Price.md)\<`TQuote`, `TBase`\>

#### Overrides

[Fraction](Fraction.md).[invert](Fraction.md#invert)

#### Defined in

[entities/fractions/price.ts:49](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L49)

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

▸ **multiply**\<`TOtherQuote`\>(`other`): [`Price`](Price.md)\<`TBase`, `TOtherQuote`\>

Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOtherQuote` | extends [`Currency`](../modules.md#currency) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Price`](Price.md)\<`TQuote`, `TOtherQuote`\> | the other price |

#### Returns

[`Price`](Price.md)\<`TBase`, `TOtherQuote`\>

#### Overrides

[Fraction](Fraction.md).[multiply](Fraction.md#multiply)

#### Defined in

[entities/fractions/price.ts:57](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L57)

___

### quote

▸ **quote**(`currencyAmount`): [`CurrencyAmount`](CurrencyAmount.md)\<`TQuote`\>

Return the amount of quote currency corresponding to a given amount of the base currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyAmount` | [`CurrencyAmount`](CurrencyAmount.md)\<`TBase`\> | the amount of base currency to quote against the price |

#### Returns

[`CurrencyAmount`](CurrencyAmount.md)\<`TQuote`\>

#### Defined in

[entities/fractions/price.ts:67](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L67)

___

### subtract

▸ **subtract**(`other`): [`Fraction`](Fraction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`BigintIsh`](../modules.md#bigintish) \| [`Fraction`](Fraction.md) |

#### Returns

[`Fraction`](Fraction.md)

#### Inherited from

[Fraction](Fraction.md).[subtract](Fraction.md#subtract)

#### Defined in

[entities/fractions/fraction.ts:69](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/fraction.ts#L69)

___

### toFixed

▸ **toFixed**(`decimalPlaces?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `decimalPlaces` | `number` | `4` |
| `format?` | `object` | `undefined` |
| `rounding?` | [`Rounding`](../enums/Rounding.md) | `undefined` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toFixed](Fraction.md#tofixed)

#### Defined in

[entities/fractions/price.ts:85](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L85)

___

### toSignificant

▸ **toSignificant**(`significantDigits?`, `format?`, `rounding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `significantDigits` | `number` | `6` |
| `format?` | `object` | `undefined` |
| `rounding?` | [`Rounding`](../enums/Rounding.md) | `undefined` |

#### Returns

`string`

#### Overrides

[Fraction](Fraction.md).[toSignificant](Fraction.md#tosignificant)

#### Defined in

[entities/fractions/price.ts:81](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/fractions/price.ts#L81)
