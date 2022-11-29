[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3HeuristicGasModelFactory

# Class: V3HeuristicGasModelFactory

Computes a gas estimate for a V3 swap using heuristics.
Considers number of hops in the route, number of ticks crossed
and the typical base cost for a swap.

We get the number of ticks crossed in a swap from the QuoterV2
contract.

We compute gas estimates off-chain because
 1/ Calling eth_estimateGas for a swaps requires the caller to have
    the full balance token being swapped, and approvals.
 2/ Tracking gas used using a wrapper contract is not accurate with Multicall
    due to EIP-2929. We would have to make a request for every swap we wanted to estimate.
 3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.

**`Export`**

## Hierarchy

- [`IOnChainGasModelFactory`](IOnChainGasModelFactory.md)

  ↳ **`V3HeuristicGasModelFactory`**

## Table of contents

### Constructors

- [constructor](V3HeuristicGasModelFactory.md#constructor)

### Methods

- [buildGasModel](V3HeuristicGasModelFactory.md#buildgasmodel)
- [calculateArbitrumToL1SecurityFee](V3HeuristicGasModelFactory.md#calculatearbitrumtol1securityfee)
- [calculateOptimismToL1SecurityFee](V3HeuristicGasModelFactory.md#calculateoptimismtol1securityfee)
- [estimateGas](V3HeuristicGasModelFactory.md#estimategas)

## Constructors

### constructor

• **new V3HeuristicGasModelFactory**()

#### Overrides

[IOnChainGasModelFactory](IOnChainGasModelFactory.md).[constructor](IOnChainGasModelFactory.md#constructor)

#### Defined in

[src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts:60](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts#L60)

## Methods

### buildGasModel

▸ **buildGasModel**(`__namedParameters`): `Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BuildOnChainGasModelFactoryType`](../modules.md#buildonchaingasmodelfactorytype) |

#### Returns

`Promise`<[`IGasModel`](../modules.md#igasmodel)<[`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)\>\>

#### Overrides

[IOnChainGasModelFactory](IOnChainGasModelFactory.md).[buildGasModel](IOnChainGasModelFactory.md#buildgasmodel)

#### Defined in

[src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts:64](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts#L64)

___

### calculateArbitrumToL1SecurityFee

▸ `Private` **calculateArbitrumToL1SecurityFee**(`routes`, `swapConfig`, `gasData`): [`BigNumber`, `BigNumber`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)[] |
| `swapConfig` | [`SwapOptionsUniversalRouter`](../modules.md#swapoptionsuniversalrouter) |
| `gasData` | `ArbitrumGasData` |

#### Returns

[`BigNumber`, `BigNumber`]

#### Defined in

[src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts:371](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts#L371)

___

### calculateOptimismToL1SecurityFee

▸ `Private` **calculateOptimismToL1SecurityFee**(`routes`, `swapConfig`, `gasData`): [`BigNumber`, `BigNumber`]

To avoid having a call to optimism's L1 security fee contract for every route and amount combination,
we replicate the gas cost accounting here.

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md)[] |
| `swapConfig` | [`SwapOptionsUniversalRouter`](../modules.md#swapoptionsuniversalrouter) |
| `gasData` | `OptimismGasData` |

#### Returns

[`BigNumber`, `BigNumber`]

#### Defined in

[src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts:341](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts#L341)

___

### estimateGas

▸ `Private` **estimateGas**(`routeWithValidQuote`, `gasPriceWei`, `chainId`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeWithValidQuote` | [`V3RouteWithValidQuote`](V3RouteWithValidQuote.md) |
| `gasPriceWei` | `BigNumber` |
| `chainId` | [`ChainId`](../enums/ChainId.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `baseGasUse` | `BigNumber` |
| `totalGasCostNativeCurrency` | `CurrencyAmount`<`Token`\> |
| `totalInitializedTicksCrossed` | `BigNumber` |

#### Defined in

[src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts:299](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts#L299)
