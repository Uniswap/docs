---
id: Smart Order Router Integration
sidebar_position: 3
---

# Integrating with the Smart Order Router
The smart order router is a package that exposes a more optimized algorithm for swapping on Uniswap. To use the smart order router, you will create an `AlphaRouter` instance and use the method `route` to get quotes, gas information, and calldata for an optimized swap.

## The Package
Import `AlphaRouter` from the [smart-order-router](https://www.npmjs.com/package/@uniswap/smart-order-router) package.

```typescript
import { AlphaRouter } from '@uniswap/smart-order-router'
```

## The Providers

To create an instance of the AlphaRouter, configure the following providers:

```typescript 
export type AlphaRouterParams = {
  chainId: ChainId;
  provider: providers.BaseProvider;
  multicall2Provider?: UniswapMulticallProvider;
  v3SubgraphProvider?: IV3SubgraphProvider;
  v3PoolProvider?: IV3PoolProvider;
  v3QuoteProvider?: IV3QuoteProvider;
  v2SubgraphProvider?: IV2SubgraphProvider;
  v2PoolProvider?: IV2PoolProvider;
  v2QuoteProvider?: IV2QuoteProvider;
  tokenProvider?: ITokenProvider;
  gasPriceProvider?: IGasPriceProvider;
  v3GasModelFactory?: IV3GasModelFactory;
  v2GasModelFactory?: IV2GasModelFactory;
  blockedTokenListProvider?: ITokenListProvider;
};
```

`chainId` [required]
- The id of the chain you want to route swaps on. Ex) The chainId for Ethereum mainnet is `1`.

`provider` [required]
- A JSON RPC endpoint, like Infura.

`multicall2Provider` [optional]
-  Defaults to: 
```typescript 
UniswapMulticallProvider(chainId, provider, 375_000)
``` 
- Customize the multicall2Provider if you want to adjust the gas limit per call. 

`v3SubgraphProvider` [optional] 
- Defaults to cached pools.
- Customize the v3SubgraphProvider if you want to change the number of retries and the timeout set when making calls to the Uniswap v3 subgraph to get pool data.

`v3PoolProvider` [optional]
- Defaults to:
```typescript
CachingV3PoolProvider(
        this.chainId,
        new V3PoolProvider(ID_TO_CHAIN_ID(chainId), this.multicall2Provider),
        new NodeJSCache(new NodeCache({ stdTTL: 360, useClones: false }))
      );
```
- Customize this provider with a different cache for on chain pool data.

`v3QuoteProvider` [optional]
 - Defaults to:
```typescript
      new V3QuoteProvider(
        this.chainId,
        this.provider,
        this.multicall2Provider,
        {
          retries: 2,
          minTimeout: 100,
          maxTimeout: 1000,
        },
        {
          multicallChunk: 210, // 210
          gasLimitPerCall: 705_000, // 705
          quoteMinSuccessRate: 0.15,
        },
        {
          gasLimitOverride: 2_000_000,
          multicallChunk: 70,
        }
      );
  ```
 - Customize if you want to change any of the retries/timeouts/gas limits.

`v2SubgraphProvider` [optional]
- Defaults to:
  ```typescript
  V2SubgraphProvider(chainId)
  ```

`v2PoolProvider` [optional]
- Defaults to:
```typescript
V2PoolProvider(chainId, this.multicall2Provider)
```
- Customize if you also want a custom multicall2Provider or if you want to set custom retries.
gets v2 onchain pool data

`v2QuoteProvider` [optional] 
- Defaults to:
```typescript
new V2QuoteProvider()
```
`tokenProvider` [optional] 
- Defaults to:
```typescript
CachingTokenProviderWithFallback(
        chainId,
        new NodeJSCache(new NodeCache({ stdTTL: 3600, useClones: false })),
        new CachingTokenListProvider(
          chainId,
          DEFAULT_TOKEN_LIST,
          new NodeJSCache(new NodeCache({ stdTTL: 3600, useClones: false }))
        ),
        new TokenProvider(chainId, this.multicall2Provider)
      );
```
- Customize the token provider if you want to use your own token list. If you do not configure your own token provider, all swaps will be routed with the tokens included in `DEFAULT_TOKEN_LIST`.

`gasPriceProvider` [optional]
- Defaults to:
```typescript
CachingGasStationProvider(
        chainId,
        this.provider instanceof providers.JsonRpcProvider
          ? new EIP1559GasPriceProvider(this.provider)
          : new ETHGasStationInfoProvider(ETH_GAS_STATION_API_URL),
        new NodeJSCache<GasPrice>(
          new NodeCache({ stdTTL: 15_000, useClones: false })
        )
      );
```
- Customize if you want to get gas estimations from a different api or set up your own cache.
`v3GasModelFactory` [optional]
- Defaults to:
```typescript
V3HeuristicGasModelFactory()
```

`v2GasModelFactory` [optional]
- Defaults to:
```typescript
V2HeuristicGasModelFactory()
```
`blockedTokenListProvider` [optional]
- Defaults to Uniswap's unsupported token list.
- Customize if you want to not route swaps through pools with certain tokens.


## Calling `route`

Once you instantiate `AlphaRouter` call `route` with the following parameters:
```typescript
    {
      amount: CurrencyAmount,
      quoteCurrency: Currency,
      swapType: TradeType,
      swapConfig?: SwapConfig,
      partialRoutingConfig: Partial<AlphaRouterConfig> = {}
    }
```
`amount` [required]
- The amount to be swapped as a `CurrencyAmount`
`quoteCurrency` [required]
- The token or native currency you are swapping for as a `Currency`
`swapType` [required]
- Either an exactInput swap or an exactOutput swap.
`swapConfig` [optional]
- Configure to set a recipient, slippageTolerance, deadline, and inputTokenPermit
`partialRoutingConfig` [required]
-  Defaults to `DEFAULT_CONFIG`:
```typescript
  v3PoolSelection: {
    topN: 4,
    topNDirectSwaps: 2,
    topNTokenInOut: 4,
    topNSecondHop: 2,
    topNWithEachBaseToken: 2,
    topNWithBaseToken: 10,
    topNWithBaseTokenInSet: false,
  },
  v2PoolSelection: {
    topN: 10,
    topNDirectSwaps: 1,
    topNTokenInOut: 8,
    topNSecondHop: 6,
    topNWithEachBaseToken: 2,
    topNWithBaseToken: 5,
    topNWithBaseTokenInSet: false,
  },
  maxSwapsPerPath: 3,
  minSplits: 1,
  maxSplits: 5,
  distributionPercent: 5,
};
```

## Example
```typescript
const providerParams = AlphaRouterParams{chainId, provider, ...providers}
const router = new AlphaRouter(providerParams)
const swapParams = {
  amount,
  quoteCurrency,
  TradeType.EXACT_INPUT,
  swapConfig,
  routingConfig
}
const swap = router.route(swapParams)
```









