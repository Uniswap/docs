---
id: overview
sidebar_position: 1
title: Overview
---

## Enumerations

- [Actions](enumerations/Actions.md)
- [HookOptions](enumerations/HookOptions.md)
- [Subparser](enumerations/Subparser.md)

## Classes

- [Hook](classes/Hook.md)
- [Pool](classes/Pool.md)
- [Position](classes/Position.md)
- [Route](classes/Route.md)
- [Trade](classes/Trade.md)
- [V4BaseActionsParser](classes/V4BaseActionsParser.md)
- [V4Planner](classes/V4Planner.md)
- [V4PositionManager](classes/V4PositionManager.md)
- [V4PositionPlanner](classes/V4PositionPlanner.md)

## Interfaces

- [AllowanceTransferPermitBatch](interfaces/AllowanceTransferPermitBatch.md)
- [AllowanceTransferPermitSingle](interfaces/AllowanceTransferPermitSingle.md)
- [BatchPermitOptions](interfaces/BatchPermitOptions.md)
- [BestTradeOptions](interfaces/BestTradeOptions.md)
- [CollectSpecificOptions](interfaces/CollectSpecificOptions.md)
- [CommonAddLiquidityOptions](interfaces/CommonAddLiquidityOptions.md)
- [CommonOptions](interfaces/CommonOptions.md)
- [MethodParameters](interfaces/MethodParameters.md)
- [MintSpecificOptions](interfaces/MintSpecificOptions.md)
- [ModifyPositionSpecificOptions](interfaces/ModifyPositionSpecificOptions.md)
- [NFTPermitData](interfaces/NFTPermitData.md)
- [NFTPermitOptions](interfaces/NFTPermitOptions.md)
- [NFTPermitValues](interfaces/NFTPermitValues.md)
- [PermitDetails](interfaces/PermitDetails.md)
- [RemoveLiquiditySpecificOptions](interfaces/RemoveLiquiditySpecificOptions.md)
- [TransferOptions](interfaces/TransferOptions.md)

## Type Aliases

### AddLiquidityOptions

> **AddLiquidityOptions**: [`MintOptions`](overview.md#mintoptions) | [`IncreaseLiquidityOptions`](overview.md#increaseliquidityoptions)

Defined in: [PositionManager.ts:187](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L187)

---

### CollectOptions

> **CollectOptions**: [`CommonOptions`](interfaces/CommonOptions.md) & [`CollectSpecificOptions`](interfaces/CollectSpecificOptions.md)

Defined in: [PositionManager.ts:191](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L191)

---

### HookPermissions

> **HookPermissions**: `{ [key in HookOptions]: boolean }`

Defined in: [utils/hook.ts:4](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L4)

---

### IncreaseLiquidityOptions

> **IncreaseLiquidityOptions**: [`CommonOptions`](interfaces/CommonOptions.md) & [`CommonAddLiquidityOptions`](interfaces/CommonAddLiquidityOptions.md) & [`ModifyPositionSpecificOptions`](interfaces/ModifyPositionSpecificOptions.md)

Defined in: [PositionManager.ts:185](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L185)

---

### MintOptions

> **MintOptions**: [`CommonOptions`](interfaces/CommonOptions.md) & [`CommonAddLiquidityOptions`](interfaces/CommonAddLiquidityOptions.md) & [`MintSpecificOptions`](interfaces/MintSpecificOptions.md)

Defined in: [PositionManager.ts:184](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L184)

---

### Param

> **Param**: `object`

Defined in: [utils/v4BaseActionsParser.ts:6](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L6)

#### Type declaration

##### name

> `readonly` **name**: `string`

##### value

> `readonly` **value**: `any`

---

### ParamType

> **ParamType**: `object`

Defined in: [utils/v4Planner.ts:60](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4Planner.ts#L60)

#### Type declaration

##### name

> `readonly` **name**: `string`

##### subparser?

> `readonly` `optional` **subparser**: [`Subparser`](enumerations/Subparser.md)

##### type

> `readonly` **type**: `string`

---

### PathKey

> **PathKey**: `object`

Defined in: [utils/encodeRouteToPath.ts:5](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/encodeRouteToPath.ts#L5)

#### Type declaration

##### fee

> **fee**: `number`

##### hookData

> **hookData**: `string`

##### hooks

> **hooks**: `string`

##### intermediateCurrency

> **intermediateCurrency**: `string`

##### tickSpacing

> **tickSpacing**: `number`

---

### PoolKey

> **PoolKey**: `object`

Defined in: [entities/pool.ts:22](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/pool.ts#L22)

#### Type declaration

##### currency0

> **currency0**: `string`

##### currency1

> **currency1**: `string`

##### fee

> **fee**: `number`

##### hooks

> **hooks**: `string`

##### tickSpacing

> **tickSpacing**: `number`

---

### RemoveLiquidityOptions

> **RemoveLiquidityOptions**: [`CommonOptions`](interfaces/CommonOptions.md) & [`RemoveLiquiditySpecificOptions`](interfaces/RemoveLiquiditySpecificOptions.md) & [`ModifyPositionSpecificOptions`](interfaces/ModifyPositionSpecificOptions.md)

Defined in: [PositionManager.ts:189](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L189)

---

### SwapExactIn

> **SwapExactIn**: `object`

Defined in: [utils/v4BaseActionsParser.ts:29](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L29)

#### Type declaration

##### amountIn

> `readonly` **amountIn**: `string`

##### amountOutMinimum

> `readonly` **amountOutMinimum**: `string`

##### currencyIn

> `readonly` **currencyIn**: `string`

##### path

> `readonly` **path**: readonly [`PathKey`](overview.md#pathkey)[]

---

### SwapExactInSingle

> **SwapExactInSingle**: `object`

Defined in: [utils/v4BaseActionsParser.ts:21](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L21)

#### Type declaration

##### amountIn

> `readonly` **amountIn**: `string`

##### amountOutMinimum

> `readonly` **amountOutMinimum**: `string`

##### hookData

> `readonly` **hookData**: `string`

##### poolKey

> `readonly` **poolKey**: [`PoolKey`](overview.md#poolkey)

##### zeroForOne

> `readonly` **zeroForOne**: `boolean`

---

### SwapExactOut

> **SwapExactOut**: `object`

Defined in: [utils/v4BaseActionsParser.ts:44](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L44)

#### Type declaration

##### amountInMaximum

> `readonly` **amountInMaximum**: `string`

##### amountOut

> `readonly` **amountOut**: `string`

##### currencyOut

> `readonly` **currencyOut**: `string`

##### path

> `readonly` **path**: readonly [`PathKey`](overview.md#pathkey)[]

---

### SwapExactOutSingle

> **SwapExactOutSingle**: `object`

Defined in: [utils/v4BaseActionsParser.ts:36](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L36)

#### Type declaration

##### amountInMaximum

> `readonly` **amountInMaximum**: `string`

##### amountOut

> `readonly` **amountOut**: `string`

##### hookData

> `readonly` **hookData**: `string`

##### poolKey

> `readonly` **poolKey**: [`PoolKey`](overview.md#poolkey)

##### zeroForOne

> `readonly` **zeroForOne**: `boolean`

---

### V4RouterAction

> **V4RouterAction**: `object`

Defined in: [utils/v4BaseActionsParser.ts:11](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L11)

#### Type declaration

##### actionName

> `readonly` **actionName**: `string`

##### actionType

> `readonly` **actionType**: [`Actions`](enumerations/Actions.md)

##### params

> `readonly` **params**: readonly [`Param`](overview.md#param)[]

---

### V4RouterCall

> **V4RouterCall**: `object`

Defined in: [utils/v4BaseActionsParser.ts:17](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4BaseActionsParser.ts#L17)

#### Type declaration

##### actions

> `readonly` **actions**: readonly [`V4RouterAction`](overview.md#v4routeraction)[]

## Variables

### DYNAMIC_FEE_FLAG

> `const` **DYNAMIC_FEE_FLAG**: `8388608` = `0x800000`

Defined in: [entities/pool.ts:19](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/pool.ts#L19)

---

### hookFlagIndex

> `const` **hookFlagIndex**: `object`

Defined in: [utils/hook.ts:23](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/hook.ts#L23)

#### Type declaration

##### afterAddLiquidity

> **afterAddLiquidity**: `number` = `10`

##### afterAddLiquidityReturnsDelta

> **afterAddLiquidityReturnsDelta**: `number` = `1`

##### afterDonate

> **afterDonate**: `number` = `4`

##### afterInitialize

> **afterInitialize**: `number` = `12`

##### afterRemoveLiquidity

> **afterRemoveLiquidity**: `number` = `8`

##### afterRemoveLiquidityReturnsDelta

> **afterRemoveLiquidityReturnsDelta**: `number` = `0`

##### afterSwap

> **afterSwap**: `number` = `6`

##### afterSwapReturnsDelta

> **afterSwapReturnsDelta**: `number` = `2`

##### beforeAddLiquidity

> **beforeAddLiquidity**: `number` = `11`

##### beforeDonate

> **beforeDonate**: `number` = `5`

##### beforeInitialize

> **beforeInitialize**: `number` = `13`

##### beforeRemoveLiquidity

> **beforeRemoveLiquidity**: `number` = `9`

##### beforeSwap

> **beforeSwap**: `number` = `7`

##### beforeSwapReturnsDelta

> **beforeSwapReturnsDelta**: `number` = `3`

---

### V4_BASE_ACTIONS_ABI_DEFINITION

> `const` **V4_BASE_ACTIONS_ABI_DEFINITION**: `{ [key in Actions]: readonly ParamType[] }`

Defined in: [utils/v4Planner.ts:82](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/v4Planner.ts#L82)

## Functions

### amountWithPathCurrency()

> **amountWithPathCurrency**(`amount`, `pool`): `CurrencyAmount`\<`Currency`\>

Defined in: [utils/pathCurrency.ts:4](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/pathCurrency.ts#L4)

#### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `amount`  | `CurrencyAmount`\<`Currency`\> |
| `pool`    | [`Pool`](classes/Pool.md)    |

#### Returns

`CurrencyAmount`\<`Currency`\>

---

### encodeRouteToPath()

> **encodeRouteToPath**(`route`, `exactOutput`?): [`PathKey`](overview.md#pathkey)[]

Defined in: [utils/encodeRouteToPath.ts:13](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/encodeRouteToPath.ts#L13)

#### Parameters

| Parameter      | Type                                                |
| -------------- | --------------------------------------------------- |
| `route`        | [`Route`](classes/Route.md)\<`Currency`, `Currency`\> |
| `exactOutput`? | `boolean`                                           |

#### Returns

[`PathKey`](overview.md#pathkey)[]

---

### getPathCurrency()

> **getPathCurrency**(`currency`, `pool`): `Currency`

Defined in: [utils/pathCurrency.ts:12](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/pathCurrency.ts#L12)

#### Parameters

| Parameter  | Type                      |
| ---------- | ------------------------- |
| `currency` | `Currency`                |
| `pool`     | [`Pool`](classes/Pool.md) |

#### Returns

`Currency`

---

### priceToClosestTick()

> **priceToClosestTick**(`price`): `number`

Defined in: [utils/priceTickConversions.ts:35](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/priceTickConversions.ts#L35)

Returns the first tick for which the given price is greater than or equal to the tick price

#### Parameters

| Parameter | Type                            | Description                                                                                                                                                                      |
| --------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `price`   | `Price`\<`Currency`, `Currency`\> | for which to return the closest tick that represents a price less than or equal to the input price, i.e. the price of the returned tick is less than or equal to the input price |

#### Returns

`number`

---

### sortsBefore()

> **sortsBefore**(`currencyA`, `currencyB`): `boolean`

Defined in: [utils/sortsBefore.ts:3](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/sortsBefore.ts#L3)

#### Parameters

| Parameter   | Type       |
| ----------- | ---------- |
| `currencyA` | `Currency` |
| `currencyB` | `Currency` |

#### Returns

`boolean`

---

### tickToPrice()

> **tickToPrice**(`baseCurrency`, `quoteCurrency`, `tick`): `Price`\<`Currency`, `Currency`\>

Defined in: [utils/priceTickConversions.ts:20](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/priceTickConversions.ts#L20)

Returns a price object corresponding to the input tick and the base/quote token
Inputs must be tokens because the address order is used to interpret the price represented by the tick

#### Parameters

| Parameter       | Type       | Description                            |
| --------------- | ---------- | -------------------------------------- |
| `baseCurrency`  | `Currency` | -                                      |
| `quoteCurrency` | `Currency` | -                                      |
| `tick`          | `number`   | the tick for which to return the price |

#### Returns

`Price`\<`Currency`, `Currency`\>

---

### toAddress()

> **toAddress**(`currency`): `string`

Defined in: [utils/currencyMap.ts:7](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/currencyMap.ts#L7)

#### Parameters

| Parameter  | Type       |
| ---------- | ---------- |
| `currency` | `Currency` |

#### Returns

`string`

---

### toHex()

> **toHex**(`bigintIsh`): `string`

Defined in: [utils/calldata.ts:23](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/utils/calldata.ts#L23)

Converts a big int to a hex string

#### Parameters

| Parameter   | Type        | Description |
| ----------- | ----------- | ----------- |
| `bigintIsh` | `BigintIsh` |             |

#### Returns

`string`

The hex encoded calldata

---

### tradeComparator()

> **tradeComparator**\<`TInput`, `TOutput`, `TTradeType`\>(`a`, `b`): `number`

Defined in: [entities/trade.ts:17](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L17)

Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them

#### Type Parameters

| Type Parameter                     | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `TInput` _extends_ `Currency`      | The input currency, either Ether or an ERC-20      |
| `TOutput` _extends_ `Currency`     | The output currency, either Ether or an ERC-20     |
| `TTradeType` _extends_ `TradeType` | The trade type, either exact input or exact output |

#### Parameters

| Parameter | Type                                                           | Description                 |
| --------- | -------------------------------------------------------------- | --------------------------- |
| `a`       | [`Trade`](classes/Trade.md)\<`TInput`, `TOutput`, `TTradeType`\> | The first trade to compare  |
| `b`       | [`Trade`](classes/Trade.md)\<`TInput`, `TOutput`, `TTradeType`\> | The second trade to compare |

#### Returns

`number`

A sorted ordering for two neighboring elements in a trade array
