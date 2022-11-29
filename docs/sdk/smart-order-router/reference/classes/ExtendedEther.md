[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ExtendedEther

# Class: ExtendedEther

## Hierarchy

- `Ether`

  ↳ **`ExtendedEther`**

## Table of contents

### Constructors

- [constructor](ExtendedEther.md#constructor)

### Properties

- [chainId](ExtendedEther.md#chainid)
- [decimals](ExtendedEther.md#decimals)
- [isNative](ExtendedEther.md#isnative)
- [isToken](ExtendedEther.md#istoken)
- [name](ExtendedEther.md#name)
- [symbol](ExtendedEther.md#symbol)
- [\_cachedExtendedEther](ExtendedEther.md#_cachedextendedether)

### Accessors

- [wrapped](ExtendedEther.md#wrapped)

### Methods

- [equals](ExtendedEther.md#equals)
- [onChain](ExtendedEther.md#onchain)

## Constructors

### constructor

• `Protected` **new ExtendedEther**(`chainId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Inherited from

Ether.constructor

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/ether.d.ts:8

## Properties

### chainId

• `Readonly` **chainId**: `number`

The chain ID on which this currency resides

#### Inherited from

Ether.chainId

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/baseCurrency.d.ts:18

___

### decimals

• `Readonly` **decimals**: `number`

The decimals used in representing currency amounts

#### Inherited from

Ether.decimals

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/baseCurrency.d.ts:22

___

### isNative

• `Readonly` **isNative**: ``true``

#### Inherited from

Ether.isNative

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/nativeCurrency.d.ts:6

___

### isToken

• `Readonly` **isToken**: ``false``

#### Inherited from

Ether.isToken

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/nativeCurrency.d.ts:7

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the currency, i.e. a descriptive textual non-unique identifier

#### Inherited from

Ether.name

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/baseCurrency.d.ts:30

___

### symbol

• `Optional` `Readonly` **symbol**: `string`

The symbol of the currency, i.e. a short textual non-unique identifier

#### Inherited from

Ether.symbol

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/baseCurrency.d.ts:26

___

### \_cachedExtendedEther

▪ `Static` `Private` **\_cachedExtendedEther**: `Object` = `{}`

#### Index signature

▪ [chainId: `number`]: `NativeCurrency`

#### Defined in

[src/util/chains.ts:497](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/chains.ts#L497)

## Accessors

### wrapped

• `get` **wrapped**(): `Token`

#### Returns

`Token`

#### Overrides

Ether.wrapped

#### Defined in

[src/util/chains.ts:491](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/chains.ts#L491)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Currency` |

#### Returns

`boolean`

#### Inherited from

Ether.equals

#### Defined in

node_modules/@uniswap/sdk-core/dist/entities/ether.d.ts:12

___

### onChain

▸ `Static` **onChain**(`chainId`): [`ExtendedEther`](ExtendedEther.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

[`ExtendedEther`](ExtendedEther.md)

#### Overrides

Ether.onChain

#### Defined in

[src/util/chains.ts:500](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/util/chains.ts#L500)
