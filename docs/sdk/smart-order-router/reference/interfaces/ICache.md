[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / ICache

# Interface: ICache<T\>

Generic cache used by providers. Allows caching of results to minimize
round trips to external data sources.

**`Export`**

**`Interface`**

ICache

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`NodeJSCache`](../classes/NodeJSCache.md)

## Table of contents

### Methods

- [get](ICache.md#get)
- [has](ICache.md#has)
- [set](ICache.md#set)

## Methods

### get

▸ **get**(`key`): `Promise`<`undefined` \| `T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Defined in

[src/providers/cache.ts:10](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache.ts#L10)

___

### has

▸ **has**(`key`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/providers/cache.ts:14](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache.ts#L14)

___

### set

▸ **set**(`key`, `value`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `T` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/providers/cache.ts:12](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache.ts#L12)
