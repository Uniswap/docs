[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / LegacyRouter

# Class: LegacyRouter

Replicates the router implemented in the V3 interface.
Code is mostly a copy from https://github.com/Uniswap/uniswap-interface/blob/0190b5a408c13016c87e1030ffc59326c085f389/src/hooks/useBestV3Trade.ts#L22-L23
with React/Redux hooks removed, and refactoring to allow re-use in other routers.

## Table of contents

### Constructors

- [constructor](LegacyRouter.md#constructor)

### Properties

- [chainId](LegacyRouter.md#chainid)
- [multicall2Provider](LegacyRouter.md#multicall2provider)
- [poolProvider](LegacyRouter.md#poolprovider)
- [quoteProvider](LegacyRouter.md#quoteprovider)
- [tokenProvider](LegacyRouter.md#tokenprovider)

### Methods

- [buildMethodParameters](LegacyRouter.md#buildmethodparameters)
- [buildTrade](LegacyRouter.md#buildtrade)
- [computeAllRoutes](LegacyRouter.md#computeallroutes)
- [findBestRouteExactIn](LegacyRouter.md#findbestrouteexactin)
- [findBestRouteExactOut](LegacyRouter.md#findbestrouteexactout)
- [getAllPossiblePairings](LegacyRouter.md#getallpossiblepairings)
- [getAllRoutes](LegacyRouter.md#getallroutes)
- [getBestQuote](LegacyRouter.md#getbestquote)
- [route](LegacyRouter.md#route)
- [routeExactIn](LegacyRouter.md#routeexactin)
- [routeExactOut](LegacyRouter.md#routeexactout)

## Constructors

### constructor

• **new LegacyRouter**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`LegacyRouterParams`](../modules.md#legacyrouterparams) |

#### Defined in

[src/routers/legacy-router/legacy-router.ts:57](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L57)

## Properties

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/routers/legacy-router/legacy-router.ts:51](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L51)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`IMulticallProvider`](IMulticallProvider.md)<`any`\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:52](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L52)

___

### poolProvider

• `Protected` **poolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

#### Defined in

[src/routers/legacy-router/legacy-router.ts:53](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L53)

___

### quoteProvider

• `Protected` **quoteProvider**: [`IOnChainQuoteProvider`](../interfaces/IOnChainQuoteProvider.md)

#### Defined in

[src/routers/legacy-router/legacy-router.ts:54](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L54)

___

### tokenProvider

• `Protected` **tokenProvider**: [`ITokenProvider`](../interfaces/ITokenProvider.md)

#### Defined in

[src/routers/legacy-router/legacy-router.ts:55](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L55)

## Methods

### buildMethodParameters

▸ `Private` **buildMethodParameters**<`TTradeType`\>(`trade`, `swapConfig`): `MethodParameters`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTradeType` | extends `TradeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `trade` | `Trade`<`Currency`, `Currency`, `TTradeType`\> |
| `swapConfig` | [`SwapOptionsSwapRouter02`](../modules.md#swapoptionsswaprouter02) |

#### Returns

`MethodParameters`

#### Defined in

[src/routers/legacy-router/legacy-router.ts:541](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L541)

___

### buildTrade

▸ `Private` **buildTrade**<`TTradeType`\>(`tokenInCurrency`, `tokenOutCurrency`, `tradeType`, `routeAmount`): `Trade`<`Currency`, `Currency`, `TTradeType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTradeType` | extends `TradeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenInCurrency` | `Currency` |
| `tokenOutCurrency` | `Currency` |
| `tradeType` | `TTradeType` |
| `routeAmount` | [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md) |

#### Returns

`Trade`<`Currency`, `Currency`, `TTradeType`\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:468](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L468)

___

### computeAllRoutes

▸ `Private` **computeAllRoutes**(`tokenIn`, `tokenOut`, `pools`, `chainId`, `currentPath?`, `allPaths?`, `startTokenIn?`, `maxHops?`): [`V3Route`](V3Route.md)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tokenIn` | `Token` | `undefined` |
| `tokenOut` | `Token` | `undefined` |
| `pools` | `Pool`[] | `undefined` |
| `chainId` | [`ChainId`](../enums/ChainId.md) | `undefined` |
| `currentPath` | `Pool`[] | `[]` |
| `allPaths` | [`V3Route`](V3Route.md)[] | `[]` |
| `startTokenIn` | `Token` | `tokenIn` |
| `maxHops` | `number` | `2` |

#### Returns

[`V3Route`](V3Route.md)[]

#### Defined in

[src/routers/legacy-router/legacy-router.ts:430](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L430)

___

### findBestRouteExactIn

▸ `Private` **findBestRouteExactIn**(`amountIn`, `tokenOut`, `routes`, `routingConfig?`): `Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountIn` | [`CurrencyAmount`](CurrencyAmount.md) |
| `tokenOut` | `Token` |
| `routes` | [`V3Route`](V3Route.md)[] |
| `routingConfig?` | [`LegacyRoutingConfig`](../modules.md#legacyroutingconfig) |

#### Returns

`Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:202](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L202)

___

### findBestRouteExactOut

▸ `Private` **findBestRouteExactOut**(`amountOut`, `tokenIn`, `routes`, `routingConfig?`): `Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountOut` | [`CurrencyAmount`](CurrencyAmount.md) |
| `tokenIn` | `Token` |
| `routes` | [`V3Route`](V3Route.md)[] |
| `routingConfig?` | [`LegacyRoutingConfig`](../modules.md#legacyroutingconfig) |

#### Returns

`Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:234](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L234)

___

### getAllPossiblePairings

▸ `Private` **getAllPossiblePairings**(`tokenIn`, `tokenOut`): `Promise`<[`Token`, `Token`, `FeeAmount`][]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `Token` |
| `tokenOut` | `Token` |

#### Returns

`Promise`<[`Token`, `Token`, `FeeAmount`][]\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:365](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L365)

___

### getAllRoutes

▸ `Private` **getAllRoutes**(`tokenIn`, `tokenOut`, `routingConfig?`): `Promise`<[`V3Route`](V3Route.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `Token` |
| `tokenOut` | `Token` |
| `routingConfig?` | [`LegacyRoutingConfig`](../modules.md#legacyroutingconfig) |

#### Returns

`Promise`<[`V3Route`](V3Route.md)[]\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:333](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L333)

___

### getBestQuote

▸ `Private` **getBestQuote**(`routes`, `quotesRaw`, `quoteToken`, `routeType`): `Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`V3Route`](V3Route.md)[] |
| `quotesRaw` | [`RouteWithQuotes`](../modules.md#routewithquotes)<[`V3Route`](V3Route.md)\>[] |
| `quoteToken` | `Token` |
| `routeType` | `TradeType` |

#### Returns

`Promise`<``null`` \| [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:258](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L258)

___

### route

▸ **route**(`amount`, `quoteCurrency`, `swapType`, `swapConfig?`, `partialRoutingConfig?`): `Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `quoteCurrency` | `Currency` |
| `swapType` | `TradeType` |
| `swapConfig?` | [`SwapOptionsSwapRouter02`](../modules.md#swapoptionsswaprouter02) |
| `partialRoutingConfig?` | `Partial`<[`LegacyRoutingConfig`](../modules.md#legacyroutingconfig)\> |

#### Returns

`Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:70](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L70)

___

### routeExactIn

▸ **routeExactIn**(`currencyIn`, `currencyOut`, `amountIn`, `swapConfig?`, `routingConfig?`): `Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyIn` | `Currency` |
| `currencyOut` | `Currency` |
| `amountIn` | [`CurrencyAmount`](CurrencyAmount.md) |
| `swapConfig?` | [`SwapOptionsSwapRouter02`](../modules.md#swapoptionsswaprouter02) |
| `routingConfig?` | [`LegacyRoutingConfig`](../modules.md#legacyroutingconfig) |

#### Returns

`Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:96](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L96)

___

### routeExactOut

▸ **routeExactOut**(`currencyIn`, `currencyOut`, `amountOut`, `swapConfig?`, `routingConfig?`): `Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyIn` | `Currency` |
| `currencyOut` | `Currency` |
| `amountOut` | [`CurrencyAmount`](CurrencyAmount.md) |
| `swapConfig?` | [`SwapOptionsSwapRouter02`](../modules.md#swapoptionsswaprouter02) |
| `routingConfig?` | [`LegacyRoutingConfig`](../modules.md#legacyroutingconfig) |

#### Returns

`Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Defined in

[src/routers/legacy-router/legacy-router.ts:149](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/legacy-router/legacy-router.ts#L149)
