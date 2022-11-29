[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / NativeCurrency

# Class: NativeCurrency

Represents the native currency of the chain on which it resides, e.g.

## Hierarchy

- `BaseCurrency`

  ↳ **`NativeCurrency`**

  ↳↳ [`Ether`](Ether.md)

## Table of contents

### Constructors

- [constructor](NativeCurrency.md#constructor)

### Properties

- [chainId](NativeCurrency.md#chainid)
- [decimals](NativeCurrency.md#decimals)
- [isNative](NativeCurrency.md#isnative)
- [isToken](NativeCurrency.md#istoken)
- [name](NativeCurrency.md#name)
- [symbol](NativeCurrency.md#symbol)

### Accessors

- [wrapped](NativeCurrency.md#wrapped)

### Methods

- [equals](NativeCurrency.md#equals)

## Constructors

### constructor

• `Protected` **new NativeCurrency**(`chainId`, `decimals`, `symbol?`, `name?`)

Constructs an instance of the base class `BaseCurrency`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | the chain ID on which this currency resides |
| `decimals` | `number` | decimals of the currency |
| `symbol?` | `string` | symbol of the currency |
| `name?` | `string` | of the currency |

#### Inherited from

BaseCurrency.constructor

#### Defined in

[entities/baseCurrency.ts:42](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L42)

## Properties

### chainId

• `Readonly` **chainId**: `number`

The chain ID on which this currency resides

#### Inherited from

BaseCurrency.chainId

#### Defined in

[entities/baseCurrency.ts:21](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L21)

___

### decimals

• `Readonly` **decimals**: `number`

The decimals used in representing currency amounts

#### Inherited from

BaseCurrency.decimals

#### Defined in

[entities/baseCurrency.ts:25](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L25)

___

### isNative

• `Readonly` **isNative**: ``true``

#### Overrides

BaseCurrency.isNative

#### Defined in

[entities/nativeCurrency.ts:7](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/nativeCurrency.ts#L7)

___

### isToken

• `Readonly` **isToken**: ``false``

#### Overrides

BaseCurrency.isToken

#### Defined in

[entities/nativeCurrency.ts:8](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/nativeCurrency.ts#L8)

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the currency, i.e. a descriptive textual non-unique identifier

#### Inherited from

BaseCurrency.name

#### Defined in

[entities/baseCurrency.ts:33](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L33)

___

### symbol

• `Optional` `Readonly` **symbol**: `string`

The symbol of the currency, i.e. a short textual non-unique identifier

#### Inherited from

BaseCurrency.symbol

#### Defined in

[entities/baseCurrency.ts:29](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L29)

## Accessors

### wrapped

• `Abstract` `get` **wrapped**(): [`Token`](Token.md)

Return the wrapped version of this currency that can be used with the Uniswap contracts. Currencies must
implement this to be used in Uniswap

#### Returns

[`Token`](Token.md)

#### Inherited from

BaseCurrency.wrapped

#### Defined in

[entities/baseCurrency.ts:62](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L62)

## Methods

### equals

▸ `Abstract` **equals**(`other`): `boolean`

Returns whether this currency is functionally equivalent to the other currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Currency`](../modules.md#currency) | the other currency |

#### Returns

`boolean`

#### Inherited from

BaseCurrency.equals

#### Defined in

[entities/baseCurrency.ts:56](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L56)
