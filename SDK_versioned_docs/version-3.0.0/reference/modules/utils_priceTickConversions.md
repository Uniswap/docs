[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/priceTickConversions

# Module: utils/priceTickConversions

## Table of contents

### Functions

- [priceToClosestTick](utils_priceTickConversions.md#pricetoclosesttick)
- [tickToPrice](utils_priceTickConversions.md#ticktoprice)

## Functions

### priceToClosestTick

▸ **priceToClosestTick**(`price`): `number`

Returns the first tick for which the given price is greater than or equal to the tick price

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `price` | `Price`<`Token`, `Token`\> | for which to return the closest tick that represents a price less than or equal to the input price, i.e. the price of the returned tick is less than or equal to the input price |

#### Returns

`number`

#### Defined in

[utils/priceTickConversions.ts:29](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/priceTickConversions.ts#L29)

___

### tickToPrice

▸ **tickToPrice**(`baseToken`, `quoteToken`, `tick`): `Price`<`Token`, `Token`\>

Returns a price object corresponding to the input tick and the base/quote token
Inputs must be tokens because the address order is used to interpret the price represented by the tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseToken` | `Token` | the base token of the price |
| `quoteToken` | `Token` | the quote token of the price |
| `tick` | `number` | the tick for which to return the price |

#### Returns

`Price`<`Token`, `Token`\>

#### Defined in

[utils/priceTickConversions.ts:14](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/priceTickConversions.ts#L14)
