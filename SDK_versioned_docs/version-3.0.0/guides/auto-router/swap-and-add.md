---
id: swap-and-add
title: Swap and Add Liquidity Atomically
sidebar_position: 2
---

# Swap and Add Liquidity Atomically

You can use the Auto Router to fetch optimized trade routes that result in token balances proportional to the amount needed for adding optimal liquidity to a pool position. Use the method `routeToRatio` to get quotes, gas information, and calldata for atomically swapping tokens to a particular ratio and adding the new token balances to a pool position.

## Initializing the Alpha Router

Follow the instructions to [import](https://docs.uniswap.org/sdk/guides/auto-router/quick-start#importing-the-package) then [initialize](https://docs.uniswap.org/sdk/guides/auto-router/quick-start#initializing-the-alpharouter) an instance of the Alpha Router

## Calling `routeToRatio`

The `routeToRatio` method returns all the swap and add calldata needed for submitting an atomic transaction to perform a swap and add liquidity to a position.

Once you instantiate `AlphaRouter` call `route` with the following parameters:

```typescript
    {
      token0Balance: CurrencyAmount,
      token1Balance: CurrencyAmount,
			position: Position,
      swapAndAddConfig: SwapAndAddConfig,
      swapAndAddOptions?: swapAndAddOptions,
			partialRoutingConfig?: Partial<AlphaRouterConfig> = {}
    }
```

#### Parameters

`token0Balance` [required]

- The initial starting balance of the token0 of the pool for which to add liquidity

`token1Balance` [required]

- The initial starting balance of the token1 of the pool for which to add liquidity

`position` [required]

- A position object that contains the details of the position for which to add liquidity. The position liquidity can be set to 1, since liquidity is still unknown before performing `routeToRatio`

`swapAndAddConfig` [required]

- Configurations for the routeToRatio algorithm. errorTolerance determines the margin of error the resulting ratio can have from the optimal ratio. maxIterations determines how many times the algorithm will iterate until it finds a ratio within error tolerance before it will error.

`swapAndAddOptions` [optional]

- If included, routeToRatio will return the calldata for executing the atomic swap-and-add. These options contain `swapConfig` and `addLiquidityOptions`. `swapCOnfig` configures to set a recipient of leftover dust from swap, slippageTolerance, deadline, and inputTokenPermit. `addLiquidityOptions` contains slippageTolerance and deadline for the swap. `addLiquidityOptions` must contain a `tokenId` to add to an existing position, or `recipient` to mint a new one. It also includes a slippage tolerance and deadline for adding liquidity.

`swapAndAddConfig` [required]

- Configurations for the routeToRatio algorithm. errorTolerance determines the margin of error the resulting ratio can have from the optimal ratio. maxIterations determines how many times the algorithm will iterate until it finds a ratio within error tolerance before it will error.

`routingConfig` [optional]

- Optional config for tuning the performance of the routing algorithm.

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


const route = await router.route({
  token0Balance,
  token1Balance,
	position: new Position({
      pool,
      tickLower: -60,
      tickUpper: 60,
      liquidity: 1, // arbitrary and unused
  }),
  swapAndAddConfig: {
		swapConfig: {
	    recipient: myAddress,
	    slippage: new Percent(5, 100),
	    deadline: 100
	  },
		addLiquidityOptions: {
			tokenId: 10,
			slippage: new Percent(5, 100),
			deadline: 100
		}
	}
);
```