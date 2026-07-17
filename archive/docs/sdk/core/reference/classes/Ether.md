[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / Ether

# Class: Ether

Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets

## Hierarchy

- [`NativeCurrency`](NativeCurrency.md)

  ↳ **`Ether`**

## Table of contents

### Constructors

- [constructor](Ether.md#constructor)

### Properties

- [chainId](Ether.md#chainid)
- [decimals](Ether.md#decimals)
- [isNative](Ether.md#isnative)
- [isToken](Ether.md#istoken)
- [name](Ether.md#name)
- [symbol](Ether.md#symbol)
- [\_etherCache](Ether.md#_ethercache)

### Accessors

- [wrapped](Ether.md#wrapped)

### Methods

- [equals](Ether.md#equals)
- [onChain](Ether.md#onchain)

## Constructors

### constructor

• `Protected` **new Ether**(`chainId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Overrides

[NativeCurrency](NativeCurrency.md).[constructor](NativeCurrency.md#constructor)

#### Defined in

[entities/ether.ts:11](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/ether.ts#L11)

## Properties

### chainId

• `Readonly` **chainId**: `number`

The chain ID on which this currency resides

#### Inherited from

[NativeCurrency](NativeCurrency.md).[chainId](NativeCurrency.md#chainid)

#### Defined in

[entities/baseCurrency.ts:21](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L21)

___

### decimals

• `Readonly` **decimals**: `number`

The decimals used in representing currency amounts

#### Inherited from

[NativeCurrency](NativeCurrency.md).[decimals](NativeCurrency.md#decimals)

#### Defined in

[entities/baseCurrency.ts:25](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L25)

___

### isNative

• `Readonly` **isNative**: ``true``

#### Inherited from

[NativeCurrency](NativeCurrency.md).[isNative](NativeCurrency.md#isnative)

#### Defined in

[entities/nativeCurrency.ts:7](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/nativeCurrency.ts#L7)

___

### isToken

• `Readonly` **isToken**: ``false``

#### Inherited from

[NativeCurrency](NativeCurrency.md).[isToken](NativeCurrency.md#istoken)

#### Defined in

[entities/nativeCurrency.ts:8](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/nativeCurrency.ts#L8)

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the currency, i.e. a descriptive textual non-unique identifier

#### Inherited from

[NativeCurrency](NativeCurrency.md).[name](NativeCurrency.md#name)

#### Defined in

[entities/baseCurrency.ts:33](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L33)

___

### symbol

• `Optional` `Readonly` **symbol**: `string`

The symbol of the currency, i.e. a short textual non-unique identifier

#### Inherited from

[NativeCurrency](NativeCurrency.md).[symbol](NativeCurrency.md#symbol)

#### Defined in

[entities/baseCurrency.ts:29](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/baseCurrency.ts#L29)

___

### \_etherCache

▪ `Static` `Private` **\_etherCache**: `Object` = `{}`

#### Index signature

▪ [chainId: `number`]: [`Ether`](Ether.md)

#### Defined in

[entities/ether.ts:21](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/ether.ts#L21)

## Accessors

### wrapped

• `get` **wrapped**(): [`Token`](Token.md)

Return the wrapped version of this currency that can be used with the Uniswap contracts. Currencies must
implement this to be used in Uniswap

#### Returns

[`Token`](Token.md)

#### Overrides

NativeCurrency.wrapped

#### Defined in

[entities/ether.ts:15](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/ether.ts#L15)

## Methods

### equals

▸ **equals**(`other`): `boolean`

Returns whether this currency is functionally equivalent to the other currency

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Currency`](../modules.md#currency) | the other currency |

#### Returns

`boolean`

#### Overrides

[NativeCurrency](NativeCurrency.md).[equals](NativeCurrency.md#equals)

#### Defined in

[entities/ether.ts:27](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/ether.ts#L27)

___

### onChain

▸ `Static` **onChain**(`chainId`): [`Ether`](Ether.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

[`Ether`](Ether.md)

#### Defined in

[entities/ether.ts:23](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/ether.ts#L23)
