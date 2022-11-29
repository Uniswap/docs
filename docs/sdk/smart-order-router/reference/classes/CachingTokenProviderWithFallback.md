[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingTokenProviderWithFallback

# Class: CachingTokenProviderWithFallback

Provider for getting token metadata that falls back to a different provider
in the event of failure.

**`Export`**

## Implements

- [`ITokenProvider`](../interfaces/ITokenProvider.md)

## Table of contents

### Constructors

- [constructor](CachingTokenProviderWithFallback.md#constructor)

### Properties

- [chainId](CachingTokenProviderWithFallback.md#chainid)
- [fallbackTokenProvider](CachingTokenProviderWithFallback.md#fallbacktokenprovider)
- [primaryTokenProvider](CachingTokenProviderWithFallback.md#primarytokenprovider)
- [tokenCache](CachingTokenProviderWithFallback.md#tokencache)

### Methods

- [CACHE\_KEY](CachingTokenProviderWithFallback.md#cache_key)
- [getTokens](CachingTokenProviderWithFallback.md#gettokens)

## Constructors

### constructor

• **new CachingTokenProviderWithFallback**(`chainId`, `tokenCache`, `primaryTokenProvider`, `fallbackTokenProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `tokenCache` | [`ICache`](../interfaces/ICache.md)<`Token`\> |
| `primaryTokenProvider` | [`ITokenProvider`](../interfaces/ITokenProvider.md) |
| `fallbackTokenProvider?` | [`ITokenProvider`](../interfaces/ITokenProvider.md) |

#### Defined in

[src/providers/caching-token-provider.ts:144](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L144)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/caching-token-provider.ts:145](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L145)

___

### fallbackTokenProvider

• `Protected` `Optional` **fallbackTokenProvider**: [`ITokenProvider`](../interfaces/ITokenProvider.md)

#### Defined in

[src/providers/caching-token-provider.ts:150](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L150)

___

### primaryTokenProvider

• `Protected` **primaryTokenProvider**: [`ITokenProvider`](../interfaces/ITokenProvider.md)

#### Defined in

[src/providers/caching-token-provider.ts:149](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L149)

___

### tokenCache

• `Private` **tokenCache**: [`ICache`](../interfaces/ICache.md)<`Token`\>

#### Defined in

[src/providers/caching-token-provider.ts:148](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L148)

## Methods

### CACHE\_KEY

▸ `Private` **CACHE_KEY**(`chainId`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](../enums/ChainId.md) |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[src/providers/caching-token-provider.ts:141](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L141)

___

### getTokens

▸ **getTokens**(`_addresses`): `Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_addresses` | `string`[] | The token addresses to get. |

#### Returns

`Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

A token accessor with methods for accessing the tokens.

#### Implementation of

[ITokenProvider](../interfaces/ITokenProvider.md).[getTokens](../interfaces/ITokenProvider.md#gettokens)

#### Defined in

[src/providers/caching-token-provider.ts:153](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-provider.ts#L153)
