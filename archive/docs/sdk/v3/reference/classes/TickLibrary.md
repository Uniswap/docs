[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / TickLibrary

# Class: TickLibrary

## Table of contents

### Constructors

- [constructor](TickLibrary.md#constructor)

### Methods

- [getFeeGrowthInside](TickLibrary.md#getfeegrowthinside)

## Constructors

### constructor

• `Private` **new TickLibrary**()

Cannot be constructed.

#### Defined in

[utils/tickLibrary.ts:25](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickLibrary.ts#L25)

## Methods

### getFeeGrowthInside

▸ `Static` **getFeeGrowthInside**(`feeGrowthOutsideLower`, `feeGrowthOutsideUpper`, `tickLower`, `tickUpper`, `tickCurrent`, `feeGrowthGlobal0X128`, `feeGrowthGlobal1X128`): `default`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `feeGrowthOutsideLower` | `FeeGrowthOutside` |
| `feeGrowthOutsideUpper` | `FeeGrowthOutside` |
| `tickLower` | `number` |
| `tickUpper` | `number` |
| `tickCurrent` | `number` |
| `feeGrowthGlobal0X128` | `default` |
| `feeGrowthGlobal1X128` | `default` |

#### Returns

`default`[]

#### Defined in

[utils/tickLibrary.ts:27](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/utils/tickLibrary.ts#L27)
