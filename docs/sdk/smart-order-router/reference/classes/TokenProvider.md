[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / TokenProvider

# Class: TokenProvider

Provider for getting token data.

**`Export`**

**`Interface`**

ITokenProvider

## Implements

- [`ITokenProvider`](../interfaces/ITokenProvider.md)

## Table of contents

### Constructors

- [constructor](TokenProvider.md#constructor)

### Properties

- [chainId](TokenProvider.md#chainid)
- [multicall2Provider](TokenProvider.md#multicall2provider)

### Methods

- [getTokens](TokenProvider.md#gettokens)

## Constructors

### constructor

• **new TokenProvider**(`chainId`, `multicall2Provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `multicall2Provider` | [`IMulticallProvider`](IMulticallProvider.md)<`any`\> |

#### Defined in

[src/providers/token-provider.ts:514](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-provider.ts#L514)

## Properties

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/token-provider.ts:515](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-provider.ts#L515)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

#### Defined in

[src/providers/token-provider.ts:516](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-provider.ts#L516)

## Methods

### getTokens

▸ **getTokens**(`_addresses`, `providerConfig?`): `Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_addresses` | `string`[] | The token addresses to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

A token accessor with methods for accessing the tokens.

#### Implementation of

[ITokenProvider](../interfaces/ITokenProvider.md).[getTokens](../interfaces/ITokenProvider.md#gettokens)

#### Defined in

[src/providers/token-provider.ts:519](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-provider.ts#L519)
