---
id: tickToPrice
---
[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [utils/priceTickConversions](../modules/utils_pricetickconversions.md) / tickToPrice

# tickToPrice

▸ **tickToPrice**(`baseToken`: Token, `quoteToken`: Token, `tick`: *number*): *Price*<Token, Token\>

Returns a price object corresponding to the input tick and the base/quote token
Inputs must be tokens because the address order is used to interpret the price represented by the tick

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseToken` | Token | the base token of the price |
| `quoteToken` | Token | the quote token of the price |
| `tick` | *number* | the tick for which to return the price |

**Returns:** *Price*<Token, Token\>

Defined in: [utils/priceTickConversions.ts:14](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/utils/priceTickConversions.ts#L14)
