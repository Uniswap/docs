[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ITokenProvider

# Interface: ITokenProvider

Provider for getting token data.

**`Export`**

**`Interface`**

ITokenProvider

## Implemented by

- [`CachingTokenListProvider`](../classes/CachingTokenListProvider.md)
- [`CachingTokenProviderWithFallback`](../classes/CachingTokenProviderWithFallback.md)
- [`TokenProvider`](../classes/TokenProvider.md)

## Table of contents

### Methods

- [getTokens](ITokenProvider.md#gettokens)

## Methods

### getTokens

▸ **getTokens**(`addresses`, `providerConfig?`): `Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | `string`[] | The token addresses to get. |
| `providerConfig?` | `ProviderConfig` | The provider config. |

#### Returns

`Promise`<[`TokenAccessor`](../modules.md#tokenaccessor)\>

A token accessor with methods for accessing the tokens.

#### Defined in

[src/providers/token-provider.ts:24](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/token-provider.ts#L24)
