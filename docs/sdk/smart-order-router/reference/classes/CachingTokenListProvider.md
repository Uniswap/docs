[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / CachingTokenListProvider

# Class: CachingTokenListProvider

Provider for getting token data.

**`Export`**

**`Interface`**

ITokenProvider

## Implements

- [`ITokenProvider`](../interfaces/ITokenProvider.md)
- [`ITokenListProvider`](../interfaces/ITokenListProvider.md)

## Table of contents

### Constructors

- [constructor](CachingTokenListProvider.md#constructor)

### Properties

- [chainAddressToTokenInfo](CachingTokenListProvider.md#chainaddresstotokeninfo)
- [chainId](CachingTokenListProvider.md#chainid)
- [chainSymbolToTokenInfo](CachingTokenListProvider.md#chainsymboltotokeninfo)
- [chainToTokenInfos](CachingTokenListProvider.md#chaintotokeninfos)
- [tokenCache](CachingTokenListProvider.md#tokencache)
- [tokenList](CachingTokenListProvider.md#tokenlist)

### Methods

- [CACHE\_KEY](CachingTokenListProvider.md#cache_key)
- [buildToken](CachingTokenListProvider.md#buildtoken)
- [getTokenByAddress](CachingTokenListProvider.md#gettokenbyaddress)
- [getTokenBySymbol](CachingTokenListProvider.md#gettokenbysymbol)
- [getTokens](CachingTokenListProvider.md#gettokens)
- [buildTokenList](CachingTokenListProvider.md#buildtokenlist)
- [fromTokenList](CachingTokenListProvider.md#fromtokenlist)
- [fromTokenListURI](CachingTokenListProvider.md#fromtokenlisturi)

## Constructors

### constructor

• **new CachingTokenListProvider**(`chainId`, `tokenList`, `tokenCache`)

Creates an instance of CachingTokenListProvider.
Token metadata (e.g. symbol and decimals) generally don't change so can be cached indefinitely.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | The chain id to use. |
| `tokenList` | `TokenList` | The token list to get the tokens from. |
| `tokenCache` | [`ICache`](../interfaces/ICache.md)<`Token`\> | Cache instance to hold cached tokens. |

#### Defined in

[src/providers/caching-token-list-provider.ts:54](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L54)

## Properties

### chainAddressToTokenInfo

• `Private` **chainAddressToTokenInfo**: `TokenInfoMapping`

#### Defined in

[src/providers/caching-token-list-provider.ts:43](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L43)

___

### chainId

• `Private` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/providers/caching-token-list-provider.ts:40](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L40)

___

### chainSymbolToTokenInfo

• `Private` **chainSymbolToTokenInfo**: `TokenInfoMapping`

#### Defined in

[src/providers/caching-token-list-provider.ts:42](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L42)

___

### chainToTokenInfos

• `Private` **chainToTokenInfos**: `ChainToTokenInfoList`

#### Defined in

[src/providers/caching-token-list-provider.ts:41](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L41)

___

### tokenCache

• `Private` **tokenCache**: [`ICache`](../interfaces/ICache.md)<`Token`\>

Cache instance to hold cached tokens.

#### Defined in

[src/providers/caching-token-list-provider.ts:57](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L57)

___

### tokenList

• `Private` **tokenList**: `TokenList`

#### Defined in

[src/providers/caching-token-list-provider.ts:44](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L44)

## Methods

### CACHE\_KEY

▸ `Private` **CACHE_KEY**(`tokenInfo`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenInfo` | `TokenInfo` |

#### Returns

`string`

#### Defined in

[src/providers/caching-token-list-provider.ts:33](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L33)

___

### buildToken

▸ `Private` **buildToken**(`tokenInfo`): `Promise`<`Token`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenInfo` | `TokenInfo` |

#### Returns

`Promise`<`Token`\>

#### Defined in

[src/providers/caching-token-list-provider.ts:219](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L219)

___

### getTokenByAddress

▸ **getTokenByAddress**(`address`): `Promise`<`undefined` \| `Token`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| `Token`\>

#### Implementation of

[ITokenListProvider](../interfaces/ITokenListProvider.md).[getTokenByAddress](../interfaces/ITokenListProvider.md#gettokenbyaddress)

#### Defined in

[src/providers/caching-token-list-provider.ts:200](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L200)

___

### getTokenBySymbol

▸ **getTokenBySymbol**(`_symbol`): `Promise`<`undefined` \| `Token`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_symbol` | `string` |

#### Returns

`Promise`<`undefined` \| `Token`\>

#### Implementation of

[ITokenListProvider](../interfaces/ITokenListProvider.md).[getTokenBySymbol](../interfaces/ITokenListProvider.md#gettokenbysymbol)

#### Defined in

[src/providers/caching-token-list-provider.ts:175](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L175)

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

[src/providers/caching-token-list-provider.ts:148](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L148)

___

### buildTokenList

▸ `Static` `Private` **buildTokenList**(`tokenListURI`): `Promise`<`TokenList`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenListURI` | `string` |

#### Returns

`Promise`<`TokenList`\>

#### Defined in

[src/providers/caching-token-list-provider.ts:105](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L105)

___

### fromTokenList

▸ `Static` **fromTokenList**(`chainId`, `tokenList`, `tokenCache`): `Promise`<[`CachingTokenListProvider`](CachingTokenListProvider.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `tokenList` | `TokenList` |
| `tokenCache` | [`ICache`](../interfaces/ICache.md)<`Token`\> |

#### Returns

`Promise`<[`CachingTokenListProvider`](CachingTokenListProvider.md)\>

#### Defined in

[src/providers/caching-token-list-provider.ts:126](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L126)

___

### fromTokenListURI

▸ `Static` **fromTokenListURI**(`chainId`, `tokenListURI`, `tokenCache`): `Promise`<[`CachingTokenListProvider`](CachingTokenListProvider.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `tokenListURI` | `string` |
| `tokenCache` | [`ICache`](../interfaces/ICache.md)<`Token`\> |

#### Returns

`Promise`<[`CachingTokenListProvider`](CachingTokenListProvider.md)\>

#### Defined in

[src/providers/caching-token-list-provider.ts:88](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L88)
