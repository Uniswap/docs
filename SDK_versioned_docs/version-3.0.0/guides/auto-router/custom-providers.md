---
id: custom-providers
sidebar_position: 2
---

# Optional: Custom Providers

For advanced use cases, you can input custom providers when initializing the `AlphaRouter`. The `AlphaRouterParams` specifies all available providers you can input and are further outlined below.

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
## Parameters 

`chainId` [required]
- The id of the chain you want to route swaps on. Ex) The chainId for Ethereum mainnet is `1`.

`provider` [required]
- A JSON RPC endpoint, like Infura.

`multicall2Provider` [optional]
- Customize the multicall2Provider if you want to adjust the gas limit per call. 
-  Defaults to: 
```typescript 
UniswapMulticallProvider(chainId, provider, 375_000)
``` 

`v3SubgraphProvider` [optional] 
- Customize the v3SubgraphProvider if you want to change the number of retries and the timeout set when making calls to the Uniswap v3 subgraph to get pool data.
- Defaults to cached pools.

`v3PoolProvider` [optional]
- Customize this provider with a different cache for on chain pool data.
- Defaults to:
```typescript
CachingV3PoolProvider(
        this.chainId,
        new V3PoolProvider(ID_TO_CHAIN_ID(chainId), this.multicall2Provider),
        new NodeJSCache(new NodeCache({ stdTTL: 360, useClones: false }))
      );
```

`v3QuoteProvider` [optional]
 - Customize if you want to change any of the retries/timeouts/gas limits.
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

`v2SubgraphProvider` [optional]
- Customize the v2SubgraphProvider if you want to change the number of retries and the timeout set when making calls to the Uniswap v2 subgraph to get pool data.
- Defaults to:
  ```typescript
  V2SubgraphProvider(chainId)
  ```

`v2PoolProvider` [optional]
- Customize if you also want a custom multicall2Provider or if you want to set custom retries.
gets v2 onchain pool data
- Defaults to:
```typescript
V2PoolProvider(chainId, this.multicall2Provider)
```

`v2QuoteProvider` [optional] 
- Defaults to:
```typescript
new V2QuoteProvider()
```
`tokenProvider` [optional] 
- Customize the token provider if you want to use your own token list. If you do not configure your own token provider, all swaps will be routed with the tokens included in `DEFAULT_TOKEN_LIST`.
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

`gasPriceProvider` [optional]
- Customize if you want to get gas estimations from a different api or if you want to set up your own cache.
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
- Customize if you want to not route swaps through pools with certain tokens.
- Defaults to Uniswap's unsupported token list.
