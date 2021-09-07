[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/trade](../modules/entities_trade.md) / Trade

# Class: Trade<TInput, TOutput, TTradeType\>

[entities/trade](../modules/entities_trade.md).Trade

Represents a trade executed against a set of routes where some percentage of the input is
split across each route.

Each route has its own set of pools. Pools can not be re-used across routes.

Does not account for slippage, i.e., changes in price environment that can occur between
the time the trade is submitted and when it is executed.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |
| `TTradeType` | extends `TradeType` | The trade type, either exact input or exact output |

## Table of contents

### Constructors

- [constructor](entities_trade.Trade.md#constructor)

### Properties

- [\_executionPrice](entities_trade.Trade.md#_executionprice)
- [\_inputAmount](entities_trade.Trade.md#_inputamount)
- [\_outputAmount](entities_trade.Trade.md#_outputamount)
- [\_priceImpact](entities_trade.Trade.md#_priceimpact)
- [swaps](entities_trade.Trade.md#swaps)
- [tradeType](entities_trade.Trade.md#tradetype)

### Accessors

- [executionPrice](entities_trade.Trade.md#executionprice)
- [inputAmount](entities_trade.Trade.md#inputamount)
- [outputAmount](entities_trade.Trade.md#outputamount)
- [priceImpact](entities_trade.Trade.md#priceimpact)
- [route](entities_trade.Trade.md#route)

### Methods

- [maximumAmountIn](entities_trade.Trade.md#maximumamountin)
- [minimumAmountOut](entities_trade.Trade.md#minimumamountout)
- [worstExecutionPrice](entities_trade.Trade.md#worstexecutionprice)
- [bestTradeExactIn](entities_trade.Trade.md#besttradeexactin)
- [bestTradeExactOut](entities_trade.Trade.md#besttradeexactout)
- [createUncheckedTrade](entities_trade.Trade.md#createuncheckedtrade)
- [createUncheckedTradeWithMultipleRoutes](entities_trade.Trade.md#createuncheckedtradewithmultipleroutes)
- [exactIn](entities_trade.Trade.md#exactin)
- [exactOut](entities_trade.Trade.md#exactout)
- [fromRoute](entities_trade.Trade.md#fromroute)
- [fromRoutes](entities_trade.Trade.md#fromroutes)

## Constructors

### constructor

• `Private` **new Trade**<`TInput`, `TOutput`, `TTradeType`\>(`__namedParameters`)

Construct a trade by passing in the pre-computed property values

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `Currency` |
| `TOutput` | extends `Currency` |
| `TTradeType` | extends `TradeType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.routes` | { `inputAmount`: `CurrencyAmount`<`TInput`\> ; `outputAmount`: `CurrencyAmount`<`TOutput`\> ; `route`: [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>  }[] | The routes through which the trade occurs |
| `__namedParameters.tradeType` | `TTradeType` | The type of trade, exact input or exact output |

#### Defined in

[entities/trade.ts:397](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L397)

## Properties

### \_executionPrice

• `Private` **\_executionPrice**: `undefined` \| `Price`<`TInput`, `TOutput`\>

The cached result of the computed execution price

#### Defined in

[entities/trade.ts:143](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L143)

___

### \_inputAmount

• `Private` **\_inputAmount**: `undefined` \| `CurrencyAmount`<`TInput`\>

The cached result of the input amount computation

#### Defined in

[entities/trade.ts:97](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L97)

___

### \_outputAmount

• `Private` **\_outputAmount**: `undefined` \| `CurrencyAmount`<`TOutput`\>

The cached result of the output amount computation

#### Defined in

[entities/trade.ts:120](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L120)

___

### \_priceImpact

• `Private` **\_priceImpact**: `undefined` \| `Percent`

The cached result of the price impact computation

#### Defined in

[entities/trade.ts:164](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L164)

___

### swaps

• `Readonly` **swaps**: { `inputAmount`: `CurrencyAmount`<`TInput`\> ; `outputAmount`: `CurrencyAmount`<`TOutput`\> ; `route`: [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>  }[]

The swaps of the trade, i.e. which routes and how much is swapped in each that
make up the trade.

#### Defined in

[entities/trade.ts:82](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L82)

___

### tradeType

• `Readonly` **tradeType**: `TTradeType`

The type of the trade, either exact in or exact out.

#### Defined in

[entities/trade.ts:91](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L91)

## Accessors

### executionPrice

• `get` **executionPrice**(): `Price`<`TInput`, `TOutput`\>

The price expressed in terms of output amount/input amount.

#### Returns

`Price`<`TInput`, `TOutput`\>

#### Defined in

[entities/trade.ts:148](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L148)

___

### inputAmount

• `get` **inputAmount**(): `CurrencyAmount`<`TInput`\>

The input amount for the trade assuming no slippage.

#### Returns

`CurrencyAmount`<`TInput`\>

#### Defined in

[entities/trade.ts:102](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L102)

___

### outputAmount

• `get` **outputAmount**(): `CurrencyAmount`<`TOutput`\>

The output amount for the trade assuming no slippage.

#### Returns

`CurrencyAmount`<`TOutput`\>

#### Defined in

[entities/trade.ts:125](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L125)

___

### priceImpact

• `get` **priceImpact**(): `Percent`

Returns the percent difference between the route's mid price and the price impact

#### Returns

`Percent`

#### Defined in

[entities/trade.ts:169](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L169)

___

### route

• `get` **route**(): [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>

**`deprecated`** Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
this will return an error.

When the trade consists of just a single route, this returns the route of the trade,
i.e. which pools the trade goes through.

#### Returns

[`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>

#### Defined in

[entities/trade.ts:73](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L73)

## Methods

### maximumAmountIn

▸ **maximumAmountIn**(`slippageTolerance`, `amountIn?`): `CurrencyAmount`<`TInput`\>

Get the maximum amount in that can be spent via this trade for the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | The tolerance of unfavorable slippage from the execution price of this trade |
| `amountIn` | `CurrencyAmount`<`TInput`\> | - |

#### Returns

`CurrencyAmount`<`TInput`\>

The amount in

#### Defined in

[entities/trade.ts:456](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L456)

___

### minimumAmountOut

▸ **minimumAmountOut**(`slippageTolerance`, `amountOut?`): `CurrencyAmount`<`TOutput`\>

Get the minimum amount that must be received from this trade for the given slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | The tolerance of unfavorable slippage from the execution price of this trade |
| `amountOut` | `CurrencyAmount`<`TOutput`\> | - |

#### Returns

`CurrencyAmount`<`TOutput`\>

The amount out

#### Defined in

[entities/trade.ts:438](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L438)

___

### worstExecutionPrice

▸ **worstExecutionPrice**(`slippageTolerance`): `Price`<`TInput`, `TOutput`\>

Return the execution price after accounting for slippage tolerance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slippageTolerance` | `Percent` | the allowed tolerated slippage |

#### Returns

`Price`<`TInput`, `TOutput`\>

The execution price

#### Defined in

[entities/trade.ts:471](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L471)

___

### bestTradeExactIn

▸ `Static` **bestTradeExactIn**<`TInput`, `TOutput`\>(`pools`, `currencyAmountIn`, `currencyOut`, `__namedParameters?`, `currentPools?`, `nextAmountIn?`, `bestTrades?`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_INPUT`\>[]\>

Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
amount to an output token, making at most `maxHops` hops.
Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
the amount in among multiple routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `Currency` |
| `TOutput` | extends `Currency` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pools` | [`Pool`](entities_pool.Pool.md)[] | `undefined` | the pools to consider in finding the best trade |
| `currencyAmountIn` | `CurrencyAmount`<`TInput`\> | `undefined` | used in recursion; the original value of the currencyAmountIn parameter |
| `currencyOut` | `TOutput` | `undefined` | the desired currency out |
| `__namedParameters` | [`BestTradeOptions`](../interfaces/entities_trade.BestTradeOptions.md) | `{}` | - |
| `currentPools` | [`Pool`](entities_pool.Pool.md)[] | `[]` | used in recursion; the current list of pools |
| `nextAmountIn` | `CurrencyAmount`<`Currency`\> | `undefined` | exact amount of input currency to spend |
| `bestTrades` | [`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_INPUT`\>[] | `[]` | used in recursion; the current list of best trades |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_INPUT`\>[]\>

The exact in trade

#### Defined in

[entities/trade.ts:495](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L495)

___

### bestTradeExactOut

▸ `Static` **bestTradeExactOut**<`TInput`, `TOutput`\>(`pools`, `currencyIn`, `currencyAmountOut`, `__namedParameters?`, `currentPools?`, `nextAmountOut?`, `bestTrades?`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[]\>

similar to the above method but instead targets a fixed output amount
given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
to an output token amount, making at most `maxHops` hops
note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
the amount in among multiple routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `Currency` |
| `TOutput` | extends `Currency` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pools` | [`Pool`](entities_pool.Pool.md)[] | `undefined` | the pools to consider in finding the best trade |
| `currencyIn` | `TInput` | `undefined` | the currency to spend |
| `currencyAmountOut` | `CurrencyAmount`<`TOutput`\> | `undefined` | the desired currency amount out |
| `__namedParameters` | [`BestTradeOptions`](../interfaces/entities_trade.BestTradeOptions.md) | `{}` | - |
| `currentPools` | [`Pool`](entities_pool.Pool.md)[] | `[]` | used in recursion; the current list of pools |
| `nextAmountOut` | `CurrencyAmount`<`Currency`\> | `undefined` | the exact amount of currency out |
| `bestTrades` | [`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[] | `[]` | used in recursion; the current list of best trades |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_OUTPUT`\>[]\>

The exact out trade

#### Defined in

[entities/trade.ts:576](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L576)

___

### createUncheckedTrade

▸ `Static` **createUncheckedTrade**<`TInput`, `TOutput`, `TTradeType`\>(`constructorArguments`): [`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>

Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
elsewhere and do not have any tick data

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |
| `TTradeType` | extends `TradeType` | The type of the trade, either exact in or exact out |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructorArguments` | `Object` | The arguments passed to the trade constructor |
| `constructorArguments.inputAmount` | `CurrencyAmount`<`TInput`\> | - |
| `constructorArguments.outputAmount` | `CurrencyAmount`<`TOutput`\> | - |
| `constructorArguments.route` | [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\> | - |
| `constructorArguments.tradeType` | `TTradeType` | - |

#### Returns

[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>

The unchecked trade

#### Defined in

[entities/trade.ts:346](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L346)

___

### createUncheckedTradeWithMultipleRoutes

▸ `Static` **createUncheckedTradeWithMultipleRoutes**<`TInput`, `TOutput`, `TTradeType`\>(`constructorArguments`): [`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>

Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
elsewhere and do not have any tick data

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |
| `TTradeType` | extends `TradeType` | The type of the trade, either exact in or exact out |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructorArguments` | `Object` | The arguments passed to the trade constructor |
| `constructorArguments.routes` | { `inputAmount`: `CurrencyAmount`<`TInput`\> ; `outputAmount`: `CurrencyAmount`<`TOutput`\> ; `route`: [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>  }[] | - |
| `constructorArguments.tradeType` | `TTradeType` | - |

#### Returns

[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>

The unchecked trade

#### Defined in

[entities/trade.ts:377](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L377)

___

### exactIn

▸ `Static` **exactIn**<`TInput`, `TOutput`\>(`route`, `amountIn`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_INPUT`\>\>

Constructs an exact in trade with the given amount in and route

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\> | The route of the exact in trade |
| `amountIn` | `CurrencyAmount`<`TInput`\> | The amount being passed in |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_INPUT`\>\>

The exact in trade

#### Defined in

[entities/trade.ts:194](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L194)

___

### exactOut

▸ `Static` **exactOut**<`TInput`, `TOutput`\>(`route`, `amountOut`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_OUTPUT`\>\>

Constructs an exact out trade with the given amount out and route

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\> | The route of the exact out trade |
| `amountOut` | `CurrencyAmount`<`TOutput`\> | The amount returned by the trade |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `EXACT_OUTPUT`\>\>

The exact out trade

#### Defined in

[entities/trade.ts:209](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L209)

___

### fromRoute

▸ `Static` **fromRoute**<`TInput`, `TOutput`, `TTradeType`\>(`route`, `amount`, `tradeType`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>\>

Constructs a trade by simulating swaps through the given route

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20. |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20. |
| `TTradeType` | extends `TradeType` | The type of the trade, either exact in or exact out. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\> | route to swap through |
| `amount` | `TTradeType` extends `EXACT_INPUT` ? `CurrencyAmount`<`TInput`\> : `CurrencyAmount`<`TOutput`\> | the amount specified, either input or output, depending on tradeType |
| `tradeType` | `TTradeType` | whether the trade is an exact input or exact output swap |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>\>

The route

#### Defined in

[entities/trade.ts:226](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L226)

___

### fromRoutes

▸ `Static` **fromRoutes**<`TInput`, `TOutput`, `TTradeType`\>(`routes`, `tradeType`): `Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>\>

Constructs a trade from routes by simulating swaps

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20. |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20. |
| `TTradeType` | extends `TradeType` | The type of the trade, either exact in or exact out. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routes` | { `amount`: `TTradeType` extends `EXACT_INPUT` ? `CurrencyAmount`<`TInput`\> : `CurrencyAmount`<`TOutput`\> ; `route`: [`Route`](entities_route.Route.md)<`TInput`, `TOutput`\>  }[] | the routes to swap through and how much of the amount should be routed through each |
| `tradeType` | `TTradeType` | whether the trade is an exact input or exact output swap |

#### Returns

`Promise`<[`Trade`](entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\>\>

The trade

#### Defined in

[entities/trade.ts:276](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L276)
