---
id: auto-router
title: Integrating the Auto Router
---

# Quick Start

You can use the Auto Router to fetch optimized trade routes for swapping on Uniswap. To use the Auto Router, you will create an `AlphaRouter` instance and use the method `route` to get quotes, gas information, and calldata for an optimized swap.

In this quick start you will:

1. Import necessary packages
2. Initialize the `AlphaRouter`
3. Set up the parameters for the `route` method
4. Call `route` to retrieve calldata
5. Submit a route transaction

## Importing the Package

To integrate with the Auto Router, you will use the [smart-order-router](https://www.npmjs.com/package/@uniswap/smart-order-router) package. The smart-order-router package allows you to use the Auto Router through the `AlphaRouter` class.

Import `AlphaRouter` from the smart-order-router package to get started.

```typescript
import { AlphaRouter } from "@uniswap/smart-order-router";
```

## Initializing the AlphaRouter

The `AlphaRouter` class contains methods for generating optimized routes. To create an instance of the AlphaRouter, configure the `chainId` and `provider` parameters.

#### Parameters

| Name     | Requirement | Description                                                                                    |
| -------- | ----------- | ---------------------------------------------------------------------------------------------- |
| chainId  | [required]  | The id of the chain you want to route swaps on. e.g., The chainId for Ethereum mainnet is `1`. |
| provider | [required]  | A JSON RPC endpoint, e.g., Infura.                                                             |

```typescript
const router = new AlphaRouter({ chainId: 1, provider: web3Provider };
```

## Calling `route`

The `route` method returns all the swap calldata and gas information needed for submitting an optimal swap to the chain.

Once you instantiate `AlphaRouter` call `route` with the following parameters:

```typescript
    {
      amount: CurrencyAmount,
      quoteCurrency: Currency,
      tradeType: TradeType,
      swapConfig?: SwapConfig,
      partialRoutingConfig?: Partial<AlphaRouterConfig> = {}
    }
```

#### Parameters

| Name          | Requirement | Description                                                                                                                                          |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount        | [required]  | The amount specified by the user. For EXACT_IN swaps, this is the input token amount. For EXACT_OUT swaps, this is the output token.                 |
| quoteCurrency | [required]  | The currency of the token we are returning a quote for. For EXACT_IN swaps, this is the output token. For EXACT_OUT, this is the input tok           |
| swapType      | [required]  | Either an exactInput swap or an exactOutput swap.                                                                                                    |
| swapConfig    | [optional]  | Configure to set a recipient, slippageTolerance, deadline, and inputTokenPermit. If provided, calldata for executing the swap will also be returned. |
| routingConfig | [optional]  | Optional config for tuning the performance of the routing algorithm.                                                                                 |

This example gets a route for a WETH-USDC swap.

```typescript
const WETH = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

const route = await router.route({
  amount: wethAmount,
  tokenOut: USDC,
  swapType: TradeType.EXACT_IN,
  swapConfig: {
    recipient: myAddress,
    slippageTolerance: new Percent(5, 100),
    deadline: 100
  }
);
```

## Submitting a Transaction

The object returned from calling `route` is a `SwapRoute` object with the following fields:

```typescript
export type SwapRoute = {
  quote: CurrencyAmount;
  quoteGasAdjusted: CurrencyAmount;
  estimatedGasUsed: BigNumber;
  estimatedGasUsedQuoteToken: CurrencyAmount;
  estimatedGasUsedUSD: CurrencyAmount;
  gasPriceWei: BigNumber;
  trade: Trade<Currency, Currency, TradeType>;
  route: RouteWithValidQuote[];
  blockNumber: BigNumber;
  methodParameters?: MethodParameters;
};
```

Use the quoted gas price and generated call data as inputs for the transaction, as done below:

```typescript
const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const MY_ADDRESS = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

const transaction = {
  data: route.methodParameters.calldata,
  to: V3_SWAP_ROUTER_ADDRESS,
  value: BigNumber.from(route.methodParameters.value),
  from: MY_ADDRESS,
  gasPrice: BigNumber.from(route.gasPriceWei),
};

await web3Provider.sendTransaction(transaction);
```

## The Full Example

This full example compiles all of the steps above and also prints the route quote and gas quotes returned from the `SwapRoute` data.

```typescript
import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount } from '@uniswap/sdk-core'

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
const MY_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
const web3Provider = /*YOUR PROVIDER HERE*/

const router = new AlphaRouter({ chainId: 1, provider: web3Provider });

const WETH = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

const wethAmount = CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));

const route = await router.route({
  amountIn: wethAmount,
  tokenOut: USDC,
  tradeType: TradeType.EXACT_IN,
  {
    recipient: myAddress,
    slippageTolerance: new Percent(5, 100),
    deadline: 100
  }
);

console.log(`Quote Exact In: ${route.quote.toFixed(2)}`);
console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);

const transaction = {
  data: route.methodParameters.calldata,
  to: V3_SWAP_ROUTER_ADDRESS,
  value: BigNumber.from(route.methodParameters.value),
  from: MY_ADDRESS,
  gasPrice: BigNumber.from(route.gasPriceWei),
};

await web3Provider.sendTransaction(transaction);
```
