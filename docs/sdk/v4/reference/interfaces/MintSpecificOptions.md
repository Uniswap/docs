[@uniswap/v4-sdk](../overview.md) / MintSpecificOptions

Defined in: [PositionManager.ts:47](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L47)

## Properties

### createPool?

> `optional` **createPool**: `boolean`

Defined in: [PositionManager.ts:56](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L56)

Creates pool if not initialized before mint.

***

### migrate?

> `optional` **migrate**: `boolean`

Defined in: [PositionManager.ts:66](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L66)

Whether the mint is part of a migration from V3 to V4.

***

### recipient

> **recipient**: `string`

Defined in: [PositionManager.ts:51](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L51)

The account that should receive the minted NFT.

***

### sqrtPriceX96?

> `optional` **sqrtPriceX96**: `BigintIsh`

Defined in: [PositionManager.ts:61](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L61)

Initial price to set on the pool if creating
