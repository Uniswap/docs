[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / AlphaRouter

# Class: AlphaRouter

Provides functionality for finding optimal swap routes on the Uniswap protocol.

**`Export`**

**`Abstract`**

## Implements

- [`IRouter`](IRouter.md)<[`AlphaRouterConfig`](../modules.md#alpharouterconfig)\>
- [`ISwapToRatio`](ISwapToRatio.md)<[`AlphaRouterConfig`](../modules.md#alpharouterconfig), [`SwapAndAddConfig`](../modules.md#swapandaddconfig)\>

## Table of contents

### Constructors

- [constructor](AlphaRouter.md#constructor)

### Properties

- [blockedTokenListProvider](AlphaRouter.md#blockedtokenlistprovider)
- [chainId](AlphaRouter.md#chainid)
- [gasPriceProvider](AlphaRouter.md#gaspriceprovider)
- [l2GasDataProvider](AlphaRouter.md#l2gasdataprovider)
- [mixedRouteGasModelFactory](AlphaRouter.md#mixedroutegasmodelfactory)
- [multicall2Provider](AlphaRouter.md#multicall2provider)
- [onChainQuoteProvider](AlphaRouter.md#onchainquoteprovider)
- [provider](AlphaRouter.md#provider)
- [simulator](AlphaRouter.md#simulator)
- [swapRouterProvider](AlphaRouter.md#swaprouterprovider)
- [tokenProvider](AlphaRouter.md#tokenprovider)
- [tokenValidatorProvider](AlphaRouter.md#tokenvalidatorprovider)
- [v2GasModelFactory](AlphaRouter.md#v2gasmodelfactory)
- [v2PoolProvider](AlphaRouter.md#v2poolprovider)
- [v2QuoteProvider](AlphaRouter.md#v2quoteprovider)
- [v2SubgraphProvider](AlphaRouter.md#v2subgraphprovider)
- [v3GasModelFactory](AlphaRouter.md#v3gasmodelfactory)
- [v3PoolProvider](AlphaRouter.md#v3poolprovider)
- [v3SubgraphProvider](AlphaRouter.md#v3subgraphprovider)

### Methods

- [absoluteValue](AlphaRouter.md#absolutevalue)
- [applyTokenValidatorToPools](AlphaRouter.md#applytokenvalidatortopools)
- [buildSwapAndAddMethodParameters](AlphaRouter.md#buildswapandaddmethodparameters)
- [calculateOptimalRatio](AlphaRouter.md#calculateoptimalratio)
- [emitPoolSelectionMetrics](AlphaRouter.md#emitpoolselectionmetrics)
- [getAmountDistribution](AlphaRouter.md#getamountdistribution)
- [getBlockNumberPromise](AlphaRouter.md#getblocknumberpromise)
- [getMixedRouteQuotes](AlphaRouter.md#getmixedroutequotes)
- [getV2Quotes](AlphaRouter.md#getv2quotes)
- [getV3Quotes](AlphaRouter.md#getv3quotes)
- [route](AlphaRouter.md#route)
- [routeToRatio](AlphaRouter.md#routetoratio)
- [userHasSufficientBalance](AlphaRouter.md#userhassufficientbalance)

## Constructors

### constructor

• **new AlphaRouter**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`AlphaRouterParams`](../modules.md#alpharouterparams) |

#### Defined in

[src/routers/alpha-router/alpha-router.ts:361](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L361)

## Properties

### blockedTokenListProvider

• `Protected` `Optional` **blockedTokenListProvider**: [`ITokenListProvider`](../interfaces/ITokenListProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:355](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L355)

___

### chainId

• `Protected` **chainId**: [`ChainId`](../enums/ChainId.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:339](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L339)

___

### gasPriceProvider

• `Protected` **gasPriceProvider**: [`IGasPriceProvider`](IGasPriceProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:349](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L349)

___

### l2GasDataProvider

• `Protected` `Optional` **l2GasDataProvider**: `IL2GasDataProvider`<`OptimismGasData`\> \| `IL2GasDataProvider`<`ArbitrumGasData`\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:356](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L356)

___

### mixedRouteGasModelFactory

• `Protected` **mixedRouteGasModelFactory**: [`IOnChainGasModelFactory`](IOnChainGasModelFactory.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:353](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L353)

___

### multicall2Provider

• `Protected` **multicall2Provider**: [`UniswapMulticallProvider`](UniswapMulticallProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:341](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L341)

___

### onChainQuoteProvider

• `Protected` **onChainQuoteProvider**: [`IOnChainQuoteProvider`](../interfaces/IOnChainQuoteProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:344](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L344)

___

### provider

• `Protected` **provider**: `BaseProvider`

#### Defined in

[src/routers/alpha-router/alpha-router.ts:340](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L340)

___

### simulator

• `Protected` `Optional` **simulator**: [`Simulator`](Simulator.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:359](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L359)

___

### swapRouterProvider

• `Protected` **swapRouterProvider**: [`ISwapRouterProvider`](../interfaces/ISwapRouterProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:350](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L350)

___

### tokenProvider

• `Protected` **tokenProvider**: [`ITokenProvider`](../interfaces/ITokenProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:348](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L348)

___

### tokenValidatorProvider

• `Protected` `Optional` **tokenValidatorProvider**: [`ITokenValidatorProvider`](../interfaces/ITokenValidatorProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:354](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L354)

___

### v2GasModelFactory

• `Protected` **v2GasModelFactory**: [`IV2GasModelFactory`](IV2GasModelFactory.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:352](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L352)

___

### v2PoolProvider

• `Protected` **v2PoolProvider**: [`IV2PoolProvider`](../interfaces/IV2PoolProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:347](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L347)

___

### v2QuoteProvider

• `Protected` **v2QuoteProvider**: [`IV2QuoteProvider`](../interfaces/IV2QuoteProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:346](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L346)

___

### v2SubgraphProvider

• `Protected` **v2SubgraphProvider**: [`IV2SubgraphProvider`](../interfaces/IV2SubgraphProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:345](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L345)

___

### v3GasModelFactory

• `Protected` **v3GasModelFactory**: [`IOnChainGasModelFactory`](IOnChainGasModelFactory.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:351](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L351)

___

### v3PoolProvider

• `Protected` **v3PoolProvider**: [`IV3PoolProvider`](../interfaces/IV3PoolProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:343](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L343)

___

### v3SubgraphProvider

• `Protected` **v3SubgraphProvider**: [`IV3SubgraphProvider`](../interfaces/IV3SubgraphProvider.md)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:342](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L342)

## Methods

### absoluteValue

▸ `Private` **absoluteValue**(`fraction`): `Fraction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fraction` | `Fraction` |

#### Returns

`Fraction`

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1928](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1928)

___

### applyTokenValidatorToPools

▸ `Private` **applyTokenValidatorToPools**<`T`\>(`pools`, `isInvalidFn`): `Promise`<`T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Pair` \| `Pool` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pools` | `T`[] |
| `isInvalidFn` | (`token`: `Currency`, `tokenValidation`: `undefined` \| [`TokenValidationResult`](../enums/TokenValidationResult.md)) => `boolean` |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1143](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1143)

___

### buildSwapAndAddMethodParameters

▸ `Private` **buildSwapAndAddMethodParameters**(`trade`, `swapAndAddOptions`, `swapAndAddParameters`): `Promise`<[`MethodParameters`](../modules.md#methodparameters)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `trade` | `Trade`<`Currency`, `Currency`, `TradeType`\> |
| `swapAndAddOptions` | [`SwapAndAddOptions`](../modules.md#swapandaddoptions) |
| `swapAndAddParameters` | [`SwapAndAddParameters`](../modules.md#swapandaddparameters) |

#### Returns

`Promise`<[`MethodParameters`](../modules.md#methodparameters)\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1678](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1678)

___

### calculateOptimalRatio

▸ `Private` **calculateOptimalRatio**(`position`, `sqrtRatioX96`, `zeroForOne`): `Fraction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Position` |
| `sqrtRatioX96` | `default` |
| `zeroForOne` | `boolean` |

#### Returns

`Fraction`

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1867](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1867)

___

### emitPoolSelectionMetrics

▸ `Private` **emitPoolSelectionMetrics**(`swapRouteRaw`, `allPoolsBySelection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `swapRouteRaw` | `Object` |
| `swapRouteRaw.estimatedGasUsed` | `BigNumber` |
| `swapRouteRaw.quote` | [`CurrencyAmount`](CurrencyAmount.md) |
| `swapRouteRaw.quoteGasAdjusted` | [`CurrencyAmount`](CurrencyAmount.md) |
| `swapRouteRaw.routes` | [`RouteWithValidQuote`](../modules.md#routewithvalidquote)[] |
| `allPoolsBySelection` | `CandidatePoolsBySelectionCriteria`[] |

#### Returns

`void`

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1729](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1729)

___

### getAmountDistribution

▸ `Private` **getAmountDistribution**(`amount`, `routingConfig`): [`number`[], [`CurrencyAmount`](CurrencyAmount.md)[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `routingConfig` | [`AlphaRouterConfig`](../modules.md#alpharouterconfig) |

#### Returns

[`number`[], [`CurrencyAmount`](CurrencyAmount.md)[]]

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1662](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1662)

___

### getBlockNumberPromise

▸ `Private` **getBlockNumberPromise**(): `number` \| `Promise`<`number`\>

#### Returns

`number` \| `Promise`<`number`\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1938](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1938)

___

### getMixedRouteQuotes

▸ `Private` **getMixedRouteQuotes**(`tokenIn`, `tokenOut`, `amounts`, `percents`, `quoteToken`, `mixedRouteGasModel`, `swapType`, `routingConfig`): `Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `Token` |
| `tokenOut` | `Token` |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `percents` | `number`[] |
| `quoteToken` | `Token` |
| `mixedRouteGasModel` | [`IGasModel`](../modules.md#igasmodel)<[`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)\> |
| `swapType` | `TradeType` |
| `routingConfig` | [`AlphaRouterConfig`](../modules.md#alpharouterconfig) |

#### Returns

`Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`MixedRouteWithValidQuote`](MixedRouteWithValidQuote.md)[]  }\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1489](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1489)

___

### getV2Quotes

▸ `Private` **getV2Quotes**(`tokenIn`, `tokenOut`, `amounts`, `percents`, `quoteToken`, `gasPriceWei`, `swapType`, `routingConfig`): `Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`V2RouteWithValidQuote`](V2RouteWithValidQuote.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `Token` |
| `tokenOut` | `Token` |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `percents` | `number`[] |
| `quoteToken` | `Token` |
| `gasPriceWei` | `BigNumber` |
| `swapType` | `TradeType` |
| `routingConfig` | [`AlphaRouterConfig`](../modules.md#alpharouterconfig) |

#### Returns

`Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`V2RouteWithValidQuote`](V2RouteWithValidQuote.md)[]  }\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1346](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1346)

___

### getV3Quotes

▸ `Private` **getV3Quotes**(`tokenIn`, `tokenOut`, `amounts`, `percents`, `quoteToken`, `gasModel`, `swapType`, `routingConfig`): `Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `Token` |
| `tokenOut` | `Token` |
| `amounts` | [`CurrencyAmount`](CurrencyAmount.md)[] |
| `percents` | `number`[] |
| `quoteToken` | `Token` |
| `gasModel` | [`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\> |
| `swapType` | `TradeType` |
| `routingConfig` | [`AlphaRouterConfig`](../modules.md#alpharouterconfig) |

#### Returns

`Promise`<{ `candidatePools`: `CandidatePoolsBySelectionCriteria` ; `routesWithValidQuotes`: [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)[]  }\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1186](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1186)

___

### route

▸ **route**(`amount`, `quoteCurrency`, `tradeType`, `swapConfig?`, `partialRoutingConfig?`): `Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

**`Inherit Doc`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `quoteCurrency` | `Currency` |
| `tradeType` | `TradeType` |
| `swapConfig?` | [`SwapOptions`](../modules.md#swapoptions) |
| `partialRoutingConfig` | `Partial`<[`AlphaRouterConfig`](../modules.md#alpharouterconfig)\> |

#### Returns

`Promise`<``null`` \| [`SwapRoute`](../modules.md#swaproute)\>

#### Implementation of

[IRouter](IRouter.md).[route](IRouter.md#route)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:820](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L820)

___

### routeToRatio

▸ **routeToRatio**(`token0Balance`, `token1Balance`, `position`, `swapAndAddConfig`, `swapAndAddOptions?`, `routingConfig?`): `Promise`<[`SwapToRatioResponse`](../modules.md#swaptoratioresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token0Balance` | [`CurrencyAmount`](CurrencyAmount.md) |
| `token1Balance` | [`CurrencyAmount`](CurrencyAmount.md) |
| `position` | `Position` |
| `swapAndAddConfig` | [`SwapAndAddConfig`](../modules.md#swapandaddconfig) |
| `swapAndAddOptions?` | [`SwapAndAddOptions`](../modules.md#swapandaddoptions) |
| `routingConfig` | `Partial`<[`AlphaRouterConfig`](../modules.md#alpharouterconfig)\> |

#### Returns

`Promise`<[`SwapToRatioResponse`](../modules.md#swaptoratioresponse)\>

#### Implementation of

[ISwapToRatio](ISwapToRatio.md).[routeToRatio](ISwapToRatio.md#routetoratio)

#### Defined in

[src/routers/alpha-router/alpha-router.ts:629](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L629)

___

### userHasSufficientBalance

▸ **userHasSufficientBalance**(`fromAddress`, `tradeType`, `amount`, `quote`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromAddress` | `string` |
| `tradeType` | `TradeType` |
| `amount` | [`CurrencyAmount`](CurrencyAmount.md) |
| `quote` | [`CurrencyAmount`](CurrencyAmount.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/routers/alpha-router/alpha-router.ts:1903](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/alpha-router.ts#L1903)
