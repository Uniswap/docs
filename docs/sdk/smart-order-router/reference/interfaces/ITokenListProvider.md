[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ITokenListProvider

# Interface: ITokenListProvider

Provider for getting token data from a Token List.

**`Export`**

**`Interface`**

ITokenListProvider

## Implemented by

- [`CachingTokenListProvider`](../classes/CachingTokenListProvider.md)

## Table of contents

### Methods

- [getTokenByAddress](ITokenListProvider.md#gettokenbyaddress)
- [getTokenBySymbol](ITokenListProvider.md#gettokenbysymbol)

## Methods

### getTokenByAddress

▸ **getTokenByAddress**(`address`): `Promise`<`undefined` \| `Token`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`undefined` \| `Token`\>

#### Defined in

[src/providers/caching-token-list-provider.ts:27](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L27)

___

### getTokenBySymbol

▸ **getTokenBySymbol**(`_symbol`): `Promise`<`undefined` \| `Token`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_symbol` | `string` |

#### Returns

`Promise`<`undefined` \| `Token`\>

#### Defined in

[src/providers/caching-token-list-provider.ts:26](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/caching-token-list-provider.ts#L26)
