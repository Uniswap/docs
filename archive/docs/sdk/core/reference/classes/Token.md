[@uniswap/sdk-core](../README.md) / [Exports](../modules.md) / Token

# Class: Token

Represents an ERC20 token with a unique address and some metadata.

## Hierarchy

- `BaseCurrency`

  ↳ **`Token`**

## Table of contents

### Constructors

- [constructor](Token.md#constructor)

### Properties

- [address](Token.md#address)
- [chainId](Token.md#chainid)
- [decimals](Token.md#decimals)
- [isNative](Token.md#isnative)
- [isToken](Token.md#istoken)
- [name](Token.md#name)
- [symbol](Token.md#symbol)

### Accessors

- [wrapped](Token.md#wrapped)

### Methods

- [equals](Token.md#equals)
- [sortsBefore](Token.md#sortsbefore)

## Constructors

### constructor

• **new Token**(`chainId`, `address`, `decimals`, `symbol?`, `name?`, `bypassChecksum?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | BaseCurrency#chainId |
| `address` | `string` | The contract address on the chain on which this token lives |
| `decimals` | `number` | BaseCurrency#decimals |
| `symbol?` | `string` | BaseCurrency#symbol |
| `name?` | `string` | BaseCurrency#name |
| `bypassChecksum?` | `boolean` | If true it only checks for length === 42, startsWith 0x and contains only hex characters |

#### Overrides

BaseCurrency.constructor

#### Defined in

[entities/token.ts:27](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L27)

## Properties

### address

• `Readonly` **address**: `string`

The contract address on the chain on which this token lives

#### Defined in

[entities/token.ts:16](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L16)

___

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

• `Readonly` **isNative**: ``false``

#### Overrides

BaseCurrency.isNative

#### Defined in

[entities/token.ts:10](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L10)

___

### isToken

• `Readonly` **isToken**: ``true``

#### Overrides

BaseCurrency.isToken

#### Defined in

[entities/token.ts:11](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L11)

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

• `get` **wrapped**(): [`Token`](Token.md)

Return this token, which does not need to be wrapped

#### Returns

[`Token`](Token.md)

#### Overrides

BaseCurrency.wrapped

#### Defined in

[entities/token.ts:66](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L66)

## Methods

### equals

▸ **equals**(`other`): `boolean`

Returns true if the two tokens are equivalent, i.e. have the same chainId and address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Currency`](../modules.md#currency) | other token to compare |

#### Returns

`boolean`

#### Overrides

BaseCurrency.equals

#### Defined in

[entities/token.ts:47](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L47)

___

### sortsBefore

▸ **sortsBefore**(`other`): `boolean`

Returns true if the address of this token sorts before the address of the other token

**`Throws`**

if the tokens have the same address

**`Throws`**

if the tokens are on different chains

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Token`](Token.md) | other token to compare |

#### Returns

`boolean`

#### Defined in

[entities/token.ts:57](https://github.com/Uniswap/sdk-core/blob/9997e88/src/entities/token.ts#L57)
