[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/isSorted

# Module: utils/isSorted

## Table of contents

### Functions

- [isSorted](utils_isSorted.md#issorted)

## Functions

### isSorted

▸ **isSorted**<`T`\>(`list`, `comparator`): `boolean`

Determines if a tick list is sorted

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `T`[] | The tick list |
| `comparator` | (`a`: `T`, `b`: `T`) => `number` | The comparator |

#### Returns

`boolean`

true if sorted

#### Defined in

[utils/isSorted.ts:7](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/isSorted.ts#L7)
