[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / CollectOptions

# Interface: CollectOptions

## Table of contents

### Properties

- [expectedCurrencyOwed0](CollectOptions.md#expectedcurrencyowed0)
- [expectedCurrencyOwed1](CollectOptions.md#expectedcurrencyowed1)
- [recipient](CollectOptions.md#recipient)
- [tokenId](CollectOptions.md#tokenid)

## Properties

### expectedCurrencyOwed0

• **expectedCurrencyOwed0**: `CurrencyAmount`<`Currency`\>

Expected value of tokensOwed0, including as-of-yet-unaccounted-for fees/liquidity value to be burned

#### Defined in

[nonfungiblePositionManager.ts:114](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L114)

___

### expectedCurrencyOwed1

• **expectedCurrencyOwed1**: `CurrencyAmount`<`Currency`\>

Expected value of tokensOwed1, including as-of-yet-unaccounted-for fees/liquidity value to be burned

#### Defined in

[nonfungiblePositionManager.ts:119](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L119)

___

### recipient

• **recipient**: `string`

The account that should receive the tokens.

#### Defined in

[nonfungiblePositionManager.ts:124](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L124)

___

### tokenId

• **tokenId**: `BigintIsh`

Indicates the ID of the position to collect for.

#### Defined in

[nonfungiblePositionManager.ts:109](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L109)
