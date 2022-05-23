---
id: swap-and-add
title: Swap and Add Liquidity Atomically
---

# Swap and Add Liquidity Atomically

When adding liquidity to a Uniswap v3 pool, you must provide two assets in a particular ratio. In many cases, your contract or the user's wallet hold a different ratio of those two assets. In order to deposit 100% of your assets, you must first **swap** your assets to the optimal ratio and then **add liquidity**. However, the swap may shift the balance of the pool and thus change the optimal ratio!

This guide will teach you how to execute this swap-and-add operation in a single atomic transaction. First, you will use the Auto Router to fetch calldata to swap to the optimal ratio and add liquidity. Then you will submit the transaction to the on-chain router contract `SwapRouter02.sol`.

## Initializing the Alpha Router

First, [import](https://docs.uniswap.org/sdk/guides/auto-router/quick-start#importing-the-package) and [initialize](https://docs.uniswap.org/sdk/guides/auto-router/quick-start#initializing-the-alpharouter) an instance of the Alpha Router. If you are using a different network, be sure to specify the right `chainId` parameter.

```bash
npm install @uniswap/smart-order-router
```

```typescript
import { AlphaRouter } from '@uniswap/smart-order-router'
const router = new AlphaRouter({ chainId: 1, provider: web3Provider })
```

## Fetching calldata from `routeToRatio`

Now call the `routeToRatio` method on the Auto Router. This function will return all the calldata you need to submit an atomic swap-and-add transaction.

#### Parameters

| Name                | Requirement | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token0Balance`     | required    | The initial balance of `token0` that you wish to swap-and-add, where `token0` is the `token0` in your target liquidity pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `token1Balance`     | required    | The initial balance of `token1` that you wish to swap-and-add, where `token1` is the `token1` in your target liquidity pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `position`          | required    | A [Position](https://docs.uniswap.org/sdk/guides/liquidity/minting#creating-a-position-instance) object that contains the details of the position for which to add liquidity. The position liquidity can be set to `1`, since liquidity is still unknown and will be set inside the call to `routeToRatio`.                                                                                                                                                                                                                                                                                                                                    |
| `swapAndAddConfig`  | required    | A [swapAndAddConfig](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/router.ts#L123) sets configurations for the `routeToRatio` algorithm. `ratioErrorTolerance` determines the margin of error the resulting ratio can have from the optimal ratio. `maxIterations` determines the maximum times the algorithm will iterate to find a ratio within error tolerance. If `maxIterations` is exceeded, an error is returned.                                                                                                                                                             |
| `swapAndAddOptions` | optional    | If [swapAndAddOptions](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/router.ts#L130) is included, `routeToRatio` will return the calldata for executing the atomic swap-and-add. These options contain `swapConfig` and `addLiquidityOptions`. `swapConfig` configures to set a recipient of leftover dust from swap, slippageTolerance, deadline, inputTokenPermit and outputTokenPermit. `addLiquidityOptions` must contain a `tokenId` to add to an existing position, or `recipient` to mint a new one. It also includes a slippage tolerance and deadline for adding liquidity. |
| `routingConfig`     | optional    | Optional advanced config for tuning the performance of the routing algorithm. View the [AlphaRouterConfig](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/alpha-router/alpha-router.ts#L222) object for these optional configuration parameters.                                                                                                                                                                                                                                                                                                                                      |

`token0Balance` [required]

- The initial balance of token0 that you wish to swap-and-add, where token0 is the token0 in your target liquidity pool.

`token1Balance` [required]

- The initial balance of token1 that you wish to swap-and-add, where token1 is the token1 in your target liquidity pool.

`position` [required]

- A [position object](https://docs.uniswap.org/sdk/guides/liquidity/minting#creating-a-position-instance) that contains the details of the position for which to add liquidity. The position liquidity can be set to 1, since liquidity is still unknown and will be set inside the call to `routeToRatio`.

`swapAndAddConfig` [required]

- A [swapAndAddConfig](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/router.ts#L123) sets configurations for the routeToRatio algorithm. `ratioErrorTolerance` determines the margin of error the resulting ratio can have from the optimal ratio. `maxIterations` determines the maximum times the algorithm will iterate to find a ratio within error tolerance. If max iterations is exceeded, an error is returned.

`swapAndAddOptions` [optional]

- If [swapAndAddOptions](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/router.ts#L130) is included, routeToRatio will return the calldata for executing the atomic swap-and-add. These options contain `swapConfig` and `addLiquidityOptions`. `swapConfig` configures to set a recipient of leftover dust from swap, slippageTolerance, deadline, inputTokenPermit and outputTokenPermit. `addLiquidityOptions` must contain a `tokenId` to add to an existing position, or `recipient` to mint a new one. It also includes a slippage tolerance and deadline for adding liquidity.

`routingConfig` [optional]

- Optional config for tuning the performance of the routing algorithm. View the [AlphaRouterConfig object](https://github.com/Uniswap/smart-order-router/blob/b26ffdc978ab1076c817392ab20ed2df325daf7a/src/routers/alpha-router/alpha-router.ts#L222) for these optional configuration parameters.

Here is a complete example that initializes these parameters and then calls `routeToRatio`

```typescript
const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

const WETH = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const token0Balance = CurrencyAmount.fromRawAmount(USDC, '5000000000')
const token1Balance = CurrencyAmount.fromRawAmount(WETH, '0')
const pool = new Pool(
  USDC,
  WETH,
  3000,
  '1283723400872544054280619964098219',
  '8390320113764730804' ,
  '193868'
);


const routeToRatioResponse = await router.routeToRatio(
    token0Balance,
    token1Balance,
    new Position({
        pool,
        tickLower: -60,
        tickUpper: 60,
        liquidity: 1,
    }),
    {
        ratioErrorTolerance: new Fraction(1, 100),
        maxIterations: 6,
    },
    {
        swapConfig: {
            recipient: <myAddress>,
            slippage: new Percent(5, 100),
            deadline: 100
        }
    },
    {
        tokenId: 10,
    }
);
```

## Submitting a Transaction

The `routeToRatio` function returns a `SwapToRatioResponse` object. If a route was found successfully, this object will have two fields:

- `status` will be set to `success`
- `result` will contain the `SwapToRatioRoute` object

The `SwapToRatioRoute` object will have the properties listed out in the type below:

```typescript
type SwapToRatioRoute = {
  quote: CurrencyAmount
  quoteGasAdjusted: CurrencyAmount
  optimalRatio: Fraction
  postSwapTargetPool: Pool
  estimatedGasUsed: BigNumber
  estimatedGasUsedQuoteToken: CurrencyAmount
  estimatedGasUsedUSD: CurrencyAmount
  gasPriceWei: BigNumber
  trade: Trade<Currency, Currency, TradeType>
  route: RouteWithValidQuote[]
  blockNumber: BigNumber
  methodParameters?: MethodParameters
}
```

Use the quoted gas price defined as `gasPriceWei` in the above `SwapToRatioRoute` object above and generated call data as inputs for the transaction, as done below:

```typescript
import { SwapToRatioStatus } from "@uniswap/smart-order-router";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const MY_ADDRESS = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

if (routeToRatioResponse.status == SwapToRatioStatus.success) {
  const route = routeToRatioResponse.result
  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: MY_ADDRESS,
    gasPrice: BigNumber.from(route.gasPriceWei),
  };
)

await web3Provider.sendTransaction(transaction);
```
