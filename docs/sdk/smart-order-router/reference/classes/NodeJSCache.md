[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / NodeJSCache

# Class: NodeJSCache<T\>

Generic cache used by providers. Allows caching of results to minimize
round trips to external data sources.

**`Export`**

**`Interface`**

ICache

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`ICache`](../interfaces/ICache.md)<`T`\>

## Table of contents

### Constructors

- [constructor](NodeJSCache.md#constructor)

### Properties

- [nodeCache](NodeJSCache.md#nodecache)

### Methods

- [get](NodeJSCache.md#get)
- [has](NodeJSCache.md#has)
- [set](NodeJSCache.md#set)

## Constructors

### constructor

• **new NodeJSCache**<`T`\>(`nodeCache`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeCache` | `NodeCache` |

#### Defined in

[src/providers/cache-node.ts:6](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache-node.ts#L6)

## Properties

### nodeCache

• `Private` **nodeCache**: `NodeCache`

#### Defined in

[src/providers/cache-node.ts:6](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache-node.ts#L6)

## Methods

### get

▸ **get**(`key`): `Promise`<`undefined` \| `T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`undefined` \| `T`\>

#### Implementation of

[ICache](../interfaces/ICache.md).[get](../interfaces/ICache.md#get)

#### Defined in

[src/providers/cache-node.ts:8](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache-node.ts#L8)

___

### has

▸ **has**(`key`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[ICache](../interfaces/ICache.md).[has](../interfaces/ICache.md#has)

#### Defined in

[src/providers/cache-node.ts:16](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache-node.ts#L16)

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

#### Implementation of

[ICache](../interfaces/ICache.md).[set](../interfaces/ICache.md#set)

#### Defined in

[src/providers/cache-node.ts:12](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/providers/cache-node.ts#L12)
