---
id: priceToClosestTick
---
[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [utils/priceTickConversions](../modules/utils_pricetickconversions.md) / priceToClosestTick

# priceToClosestTick

▸ **priceToClosestTick**(`price`: *Price*<Token, Token\>): *number*

Returns the first tick for which the given price is greater than or equal to the tick price

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `price` | *Price*<Token, Token\> | for which to return the closest tick that represents a price less than or equal to the input price, i.e. the price of the returned tick is less than or equal to the input price |

**Returns:** *number*

Defined in: [utils/priceTickConversions.ts:29](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/priceTickConversions.ts#L29)
