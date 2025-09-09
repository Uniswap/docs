[@uniswap/v4-sdk](../overview.md) / Trade

Defined in: [entities/trade.ts:66](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L66)

Represents a trade executed against a set of routes where some percentage of the input is
split across each route.

Each route has its own set of pools. Pools can not be re-used across routes.

Does not account for slippage, i.e., changes in price environment that can occur between
the time the trade is submitted and when it is executed.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20 |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20 |
| `TTradeType` *extends* `TradeType` | The trade type, either exact input or exact output |

## Properties

### swaps

> `readonly` **swaps**: `object`[]

Defined in: [entities/trade.ts:83](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L83)

The swaps of the trade, i.e. which routes and how much is swapped in each that
make up the trade.

#### inputAmount

> **inputAmount**: `CurrencyAmount`\<`TInput`\>

#### outputAmount

> **outputAmount**: `CurrencyAmount`\<`TOutput`\>

#### route

> **route**: [`Route`](Route.md)\<`TInput`, `TOutput`\>

***

### tradeType

> `readonly` **tradeType**: `TTradeType`

Defined in: [entities/trade.ts:92](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L92)

The type of the trade, either exact in or exact out.

## Accessors

### executionPrice

#### Get Signature

> **get** **executionPrice**(): `Price`\<`TInput`, `TOutput`\>

Defined in: [entities/trade.ts:149](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L149)

The price expressed in terms of output amount/input amount.

##### Returns

`Price`\<`TInput`, `TOutput`\>

***

### inputAmount

#### Get Signature

> **get** **inputAmount**(): `CurrencyAmount`\<`TInput`\>

Defined in: [entities/trade.ts:103](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L103)

The input amount for the trade assuming no slippage.

##### Returns

`CurrencyAmount`\<`TInput`\>

***

### outputAmount

#### Get Signature

> **get** **outputAmount**(): `CurrencyAmount`\<`TOutput`\>

Defined in: [entities/trade.ts:126](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L126)

The output amount for the trade assuming no slippage.

##### Returns

`CurrencyAmount`\<`TOutput`\>

***

### priceImpact

#### Get Signature

> **get** **priceImpact**(): `Percent`

Defined in: [entities/trade.ts:170](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L170)

Returns the percent difference between the route's mid price and the price impact

##### Returns

`Percent`

***

### route

#### Get Signature

> **get** **route**(): [`Route`](Route.md)\<`TInput`, `TOutput`\>

Defined in: [entities/trade.ts:74](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L74)

##### Deprecated

Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
this will return an error.

When the trade consists of just a single route, this returns the route of the trade,
i.e. which pools the trade goes through.

##### Returns

[`Route`](Route.md)\<`TInput`, `TOutput`\>

## Methods

### bestTradeExactIn()

> `static` **bestTradeExactIn**\<`TInput`, `TOutput`\>(`pools`, `currencyAmountIn`, `currencyOut`, `__namedParameters`, `currentPools`, `nextAmountIn`, `bestTrades`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_INPUT`\>[]>

Defined in: [entities/trade.ts:454](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L454)

Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input currency
amount to an output currency, making at most `maxHops` hops.
Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
the amount in among multiple routes.

#### Type Parameters

| Type Parameter |
| ------ |
| `TInput` *extends* `Currency` |
| `TOutput` *extends* `Currency` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `pools` | [`Pool`](Pool.md)[] | `undefined` | the pools to consider in finding the best trade |
| `currencyAmountIn` | `CurrencyAmount`\<`TInput`\> | `undefined` | used in recursion; the original value of the currencyAmountIn parameter |
| `currencyOut` | `TOutput` | `undefined` | the desired currency out |
| `__namedParameters` | [`BestTradeOptions`](../interfaces/BestTradeOptions.md) | `{}` | - |
| `currentPools` | [`Pool`](Pool.md)[] | `[]` | used in recursion; the current list of pools |
| `nextAmountIn` | `CurrencyAmount`\<`Currency`\> | `currencyAmountIn` | exact amount of input currency to spend |
| `bestTrades` | [`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_INPUT`\>[] | `[]` | used in recursion; the current list of best trades |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_INPUT`\>[]>

The exact in trade

***

### bestTradeExactOut()

> `static` **bestTradeExactOut**\<`TInput`, `TOutput`\>(`pools`, `currencyIn`, `currencyAmountOut`, `__namedParameters`, `currentPools`, `nextAmountOut`, `bestTrades`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[]>

Defined in: [entities/trade.ts:533](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L533)

similar to the above method but instead targets a fixed output amount
given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input currency
to an output currency amount, making at most `maxHops` hops
note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
the amount in among multiple routes.

#### Type Parameters

| Type Parameter |
| ------ |
| `TInput` *extends* `Currency` |
| `TOutput` *extends* `Currency` |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `pools` | [`Pool`](Pool.md)[] | `undefined` | the pools to consider in finding the best trade |
| `currencyIn` | `TInput` | `undefined` | the currency to spend |
| `currencyAmountOut` | `CurrencyAmount`\<`TOutput`\> | `undefined` | the desired currency amount out |
| `__namedParameters` | [`BestTradeOptions`](../interfaces/BestTradeOptions.md) | `{}` | - |
| `currentPools` | [`Pool`](Pool.md)[] | `[]` | used in recursion; the current list of pools |
| `nextAmountOut` | `CurrencyAmount`\<`Currency`\> | `currencyAmountOut` | the exact amount of currency out |
| `bestTrades` | [`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[] | `[]` | used in recursion; the current list of best trades |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[]>

The exact out trade

***

### createUncheckedTrade()

> `static` **createUncheckedTrade**\<`TInput`, `TOutput`, `TTradeType`\>(`constructorArguments`): [`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>

Defined in: [entities/trade.ts:305](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L305)

Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
elsewhere and do not have any tick data

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20 |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20 |
| `TTradeType` *extends* `TradeType` | The type of the trade, either exact in or exact out |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `constructorArguments` | \{ `inputAmount`: `CurrencyAmount`\<`TInput`\>; `outputAmount`: `CurrencyAmount`\<`TOutput`\>; `route`: [`Route`](Route.md)\<`TInput`, `TOutput`\>; `tradeType`: `TTradeType`; \} | The arguments passed to the trade constructor |
| `constructorArguments.inputAmount` | `CurrencyAmount`\<`TInput`\> | - |
| `constructorArguments.outputAmount` | `CurrencyAmount`\<`TOutput`\> | - |
| `constructorArguments.route` | [`Route`](Route.md)\<`TInput`, `TOutput`\> | - |
| `constructorArguments.tradeType` | `TTradeType` | - |

#### Returns

[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>

The unchecked trade

***

### createUncheckedTradeWithMultipleRoutes()

> `static` **createUncheckedTradeWithMultipleRoutes**\<`TInput`, `TOutput`, `TTradeType`\>(`constructorArguments`): [`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>

Defined in: [entities/trade.ts:336](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L336)

Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
elsewhere and do not have any tick data

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20 |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20 |
| `TTradeType` *extends* `TradeType` | The type of the trade, either exact in or exact out |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `constructorArguments` | \{ `routes`: `object`[]; `tradeType`: `TTradeType`; \} | The arguments passed to the trade constructor |
| `constructorArguments.routes` | `object`[] | - |
| `constructorArguments.tradeType` | `TTradeType` | - |

#### Returns

[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>

The unchecked trade

***

### exactIn()

> `static` **exactIn**\<`TInput`, `TOutput`\>(`route`, `amountIn`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_INPUT`\>>

Defined in: [entities/trade.ts:195](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L195)

Constructs an exact in trade with the given amount in and route

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20 |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20 |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | [`Route`](Route.md)\<`TInput`, `TOutput`\> | The route of the exact in trade |
| `amountIn` | `CurrencyAmount`\<`TInput`\> | The amount being passed in |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_INPUT`\>>

The exact in trade

***

### exactOut()

> `static` **exactOut**\<`TInput`, `TOutput`\>(`route`, `amountOut`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_OUTPUT`\>>

Defined in: [entities/trade.ts:210](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L210)

Constructs an exact out trade with the given amount out and route

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20 |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20 |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | [`Route`](Route.md)\<`TInput`, `TOutput`\> | The route of the exact out trade |
| `amountOut` | `CurrencyAmount`\<`TOutput`\> | The amount returned by the trade |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `EXACT_OUTPUT`\>>

The exact out trade

***

### fromRoute()

> `static` **fromRoute**\<`TInput`, `TOutput`, `TTradeType`\>(`route`, `amount`, `tradeType`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>>

Defined in: [entities/trade.ts:227](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L227)

Constructs a trade by simulating swaps through the given route

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20. |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20. |
| `TTradeType` *extends* `TradeType` | The type of the trade, either exact in or exact out. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | [`Route`](Route.md)\<`TInput`, `TOutput`\> | route to swap through |
| `amount` | `TTradeType` *extends* `EXACT_INPUT` ? `CurrencyAmount`\<`TInput`\> : `CurrencyAmount`\<`TOutput`\> | the amount specified, either input or output, depending on tradeType |
| `tradeType` | `TTradeType` | whether the trade is an exact input or exact output swap |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>>

The route

***

### fromRoutes()

> `static` **fromRoutes**\<`TInput`, `TOutput`, `TTradeType`\>(`routes`, `tradeType`): `Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>>

Defined in: [entities/trade.ts:272](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L272)

Constructs a trade from routes by simulating swaps

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency, either Ether or an ERC-20. |
| `TOutput` *extends* `Currency` | The output currency, either Ether or an ERC-20. |
| `TTradeType` *extends* `TradeType` | The type of the trade, either exact in or exact out. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `routes` | `object`[] | the routes to swap through and how much of the amount should be routed through each |
| `tradeType` | `TTradeType` | whether the trade is an exact input or exact output swap |

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TInput`, `TOutput`, `TTradeType`\>>

The trade

***

### maximumAmountIn()

> **maximumAmountIn**(`slippageTolerance`, `amountIn`): `CurrencyAmount`\<`TInput`\>

Defined in: [entities/trade.ts:415](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L415)

Get the maximum amount in that can be spent via this trade for the given slippage tolerance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | The tolerance of unfavorable slippage from the execution price of this trade |
| `amountIn` | `CurrencyAmount`\<`TInput`\> | - |

#### Returns

`CurrencyAmount`\<`TInput`\>

The amount in

***

### minimumAmountOut()

> **minimumAmountOut**(`slippageTolerance`, `amountOut`): `CurrencyAmount`\<`TOutput`\>

Defined in: [entities/trade.ts:397](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L397)

Get the minimum amount that must be received from this trade for the given slippage tolerance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | The tolerance of unfavorable slippage from the execution price of this trade |
| `amountOut` | `CurrencyAmount`\<`TOutput`\> | - |

#### Returns

`CurrencyAmount`\<`TOutput`\>

The amount out

***

### worstExecutionPrice()

> **worstExecutionPrice**(`slippageTolerance`): `Price`\<`TInput`, `TOutput`\>

Defined in: [entities/trade.ts:430](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/entities/trade.ts#L430)

Return the execution price after accounting for slippage tolerance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slippageTolerance` | `Percent` | the allowed tolerated slippage |

#### Returns

`Price`\<`TInput`, `TOutput`\>

The execution price
