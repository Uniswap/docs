[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [nonfungiblePositionManager](../modules/nonfungiblePositionManager.md) / CollectOptions

# Interface: CollectOptions

[nonfungiblePositionManager](../modules/nonfungiblePositionManager.md).CollectOptions

## Table of contents

### Properties

- [expectedCurrencyOwed0](nonfungiblePositionManager.CollectOptions.md#expectedcurrencyowed0)
- [expectedCurrencyOwed1](nonfungiblePositionManager.CollectOptions.md#expectedcurrencyowed1)
- [recipient](nonfungiblePositionManager.CollectOptions.md#recipient)
- [tokenId](nonfungiblePositionManager.CollectOptions.md#tokenid)

## Properties

### expectedCurrencyOwed0

• **expectedCurrencyOwed0**: `CurrencyAmount`<`Currency`\>

Expected value of tokensOwed0, including as-of-yet-unaccounted-for fees/liquidity value to be burned

#### Defined in

[nonfungiblePositionManager.ts:91](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L91)

___

### expectedCurrencyOwed1

• **expectedCurrencyOwed1**: `CurrencyAmount`<`Currency`\>

Expected value of tokensOwed1, including as-of-yet-unaccounted-for fees/liquidity value to be burned

#### Defined in

[nonfungiblePositionManager.ts:96](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L96)

___

### recipient

• **recipient**: `string`

The account that should receive the tokens.

#### Defined in

[nonfungiblePositionManager.ts:101](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L101)

___

### tokenId

• **tokenId**: `BigintIsh`

Indicates the ID of the position to collect for.

#### Defined in

[nonfungiblePositionManager.ts:86](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L86)
