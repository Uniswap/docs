---
id: Trade
title: Trade
---

# Trade

Represents a trade executed against a list of pools.
Does not account for slippage, i.e. trades that front run this trade and move the price.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |
| `TTradeType` | TradeType |

## Properties

### inputAmount

• `Readonly` **inputAmount**: *CurrencyAmount*<TInput\>

The input amount for the trade assuming no slippage.

Defined in: [entities/trade.ts:73](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L73)

___

### outputAmount

• `Readonly` **outputAmount**: *CurrencyAmount*<TOutput\>

The output amount for the trade assuming no slippage.

Defined in: [entities/trade.ts:77](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L77)

___

### route

• `Readonly` **route**: [*Route*](entities_route.route.md)<TInput, TOutput\>

The route of the trade, i.e. which pools the trade goes through.

Defined in: [entities/trade.ts:65](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L65)

___

### tradeType

• `Readonly` **tradeType**: TTradeType

The type of the trade, either exact in or exact out.

Defined in: [entities/trade.ts:69](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L69)

## Accessors

### executionPrice

• get **executionPrice**(): *Price*<TInput, TOutput\>

The price expressed in terms of output amount/input amount.

**Returns:** *Price*<TInput, TOutput\>

Defined in: [entities/trade.ts:87](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L87)

___

### priceImpact

• get **priceImpact**(): *Percent*

Returns the percent difference between the route's mid price and the price impact

**Returns:** *Percent*

Defined in: [entities/trade.ts:108](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L108)

## Methods

### maximumAmountIn

▸ **maximumAmountIn**(`slippageTolerance`: *Percent*): *CurrencyAmount*<TInput\>

Get the maximum amount in that can be spent via this trade for the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | *Percent* | tolerance of unfavorable slippage from the execution price of this trade |

**Returns:** *CurrencyAmount*<TInput\>

Defined in: [entities/trade.ts:252](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L252)

___

### minimumAmountOut

▸ **minimumAmountOut**(`slippageTolerance`: *Percent*): *CurrencyAmount*<TOutput\>

Get the minimum amount that must be received from this trade for the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | *Percent* | tolerance of unfavorable slippage from the execution price of this trade |

**Returns:** *CurrencyAmount*<TOutput\>

Defined in: [entities/trade.ts:235](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L235)

___

### worstExecutionPrice

▸ **worstExecutionPrice**(`slippageTolerance`: *Percent*): *Price*<TInput, TOutput\>

Return the execution price after accounting for slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | *Percent* | the allowed tolerated slippage |

**Returns:** *Price*<TInput, TOutput\>

Defined in: [entities/trade.ts:267](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L267)

___

### bestTradeExactIn

▸ `Static` **bestTradeExactIn**<TInput, TOutput\>(`pools`: [*Pool*](entities_pool.pool.md)[], `currencyAmountIn`: *CurrencyAmount*<TInput\>, `currencyOut`: TOutput, `__namedParameters?`: [*BestTradeOptions*](../interfaces/entities_trade.besttradeoptions.md), `currentPools?`: [*Pool*](entities_pool.pool.md)[], `nextAmountIn?`: *CurrencyAmount*<Currency\>, `bestTrades?`: [*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>[]): *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>[]\>

Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
amount to an output token, making at most `maxHops` hops.
Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
the amount in among multiple routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pools` | [*Pool*](entities_pool.pool.md)[] | - | the pools to consider in finding the best trade |
| `currencyAmountIn` | *CurrencyAmount*<TInput\> | - | used in recursion; the original value of the currencyAmountIn parameter |
| `currencyOut` | TOutput | - | the desired currency out |
| `__namedParameters` | [*BestTradeOptions*](../interfaces/entities_trade.besttradeoptions.md) | {} | - |
| `currentPools` | [*Pool*](entities_pool.pool.md)[] | [] | used in recursion; the current list of pools |
| `nextAmountIn` | *CurrencyAmount*<Currency\> | - | exact amount of input currency to spend |
| `bestTrades` | [*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>[] | [] | used in recursion; the current list of best trades |

**Returns:** *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>[]\>

Defined in: [entities/trade.ts:290](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L290)

___

### bestTradeExactOut

▸ `Static` **bestTradeExactOut**<TInput, TOutput\>(`pools`: [*Pool*](entities_pool.pool.md)[], `currencyIn`: Currency, `currencyAmountOut`: *CurrencyAmount*<TOutput\>, `__namedParameters?`: [*BestTradeOptions*](../interfaces/entities_trade.besttradeoptions.md), `currentPools?`: [*Pool*](entities_pool.pool.md)[], `nextAmountOut?`: *CurrencyAmount*<Currency\>, `bestTrades?`: [*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>[]): *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>[]\>

similar to the above method but instead targets a fixed output amount
given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
to an output token amount, making at most `maxHops` hops
note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
the amount in among multiple routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pools` | [*Pool*](entities_pool.pool.md)[] | - | the pools to consider in finding the best trade |
| `currencyIn` | Currency | - | the currency to spend |
| `currencyAmountOut` | *CurrencyAmount*<TOutput\> | - | the desired currency amount out |
| `__namedParameters` | [*BestTradeOptions*](../interfaces/entities_trade.besttradeoptions.md) | {} | - |
| `currentPools` | [*Pool*](entities_pool.pool.md)[] | [] | used in recursion; the current list of pools |
| `nextAmountOut` | *CurrencyAmount*<Currency\> | - | the exact amount of currency out |
| `bestTrades` | [*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>[] | [] | used in recursion; the current list of best trades |

**Returns:** *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>[]\>

Defined in: [entities/trade.ts:376](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L376)

___

### createUncheckedTrade

▸ `Static` **createUncheckedTrade**<TInput, TOutput, TTradeType\>(`constructorArguments`: { `inputAmount`: *CurrencyAmount*<TInput\> ; `outputAmount`: *CurrencyAmount*<TOutput\> ; `route`: [*Route*](entities_route.route.md)<TInput, TOutput\> ; `tradeType`: TTradeType  }): [*Trade*](entities_trade.trade.md)<TInput, TOutput, TTradeType\>

Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
elsewhere and do not have any tick data

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |
| `TTradeType` | TradeType |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructorArguments` | *object* | the arguments passed to the trade constructor |
| `constructorArguments.inputAmount` | *CurrencyAmount*<TInput\> | - |
| `constructorArguments.outputAmount` | *CurrencyAmount*<TOutput\> | - |
| `constructorArguments.route` | [*Route*](entities_route.route.md)<TInput, TOutput\> | - |
| `constructorArguments.tradeType` | TTradeType | - |

**Returns:** [*Trade*](entities_trade.trade.md)<TInput, TOutput, TTradeType\>

Defined in: [entities/trade.ts:192](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L192)

___

### exactIn

▸ `Static` **exactIn**<TInput, TOutput\>(`route`: [*Route*](entities_route.route.md)<TInput, TOutput\>, `amountIn`: *CurrencyAmount*<TInput\>): *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>\>

Constructs an exact in trade with the given amount in and route

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [*Route*](entities_route.route.md)<TInput, TOutput\> | route of the exact in trade |
| `amountIn` | *CurrencyAmount*<TInput\> | the amount being passed in |

**Returns:** *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_INPUT\>\>

Defined in: [entities/trade.ts:120](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L120)

___

### exactOut

▸ `Static` **exactOut**<TInput, TOutput\>(`route`: [*Route*](entities_route.route.md)<TInput, TOutput\>, `amountOut`: *CurrencyAmount*<TOutput\>): *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>\>

Constructs an exact out trade with the given amount out and route

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [*Route*](entities_route.route.md)<TInput, TOutput\> | route of the exact out trade |
| `amountOut` | *CurrencyAmount*<TOutput\> | the amount returned by the trade |

**Returns:** *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, EXACT\_OUTPUT\>\>

Defined in: [entities/trade.ts:132](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L132)

___

### fromRoute

▸ `Static` **fromRoute**<TInput, TOutput, TTradeType\>(`route`: [*Route*](entities_route.route.md)<TInput, TOutput\>, `amount`: TTradeType *extends* EXACT\_INPUT ? *CurrencyAmount*<TInput\> : *CurrencyAmount*<TOutput\>, `tradeType`: TTradeType): *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, TTradeType\>\>

Constructs a trade by simulating swaps through the given route

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |
| `TTradeType` | TradeType |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [*Route*](entities_route.route.md)<TInput, TOutput\> | route to swap through |
| `amount` | TTradeType *extends* EXACT\_INPUT ? *CurrencyAmount*<TInput\> : *CurrencyAmount*<TOutput\> | the amount specified, either input or output, depending on tradeType |
| `tradeType` | TTradeType | whether the trade is an exact input or exact output swap |

**Returns:** *Promise*<[*Trade*](entities_trade.trade.md)<TInput, TOutput, TTradeType\>\>

Defined in: [entities/trade.ts:145](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/trade.ts#L145)
