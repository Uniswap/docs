---
id: swap-and-add
title: Swapping and Adding Liquidity
---

## Introduction

This guide will cover how to execute a swap-and-add operation in a single atomic transaction.
It is based on the [swap-and-add example](https://github.com/Uniswap/examples/tree/main/v3-sdk/swap-and-add-liquidity), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/tree/main/v3-sdk/swap-and-add-liquidity) and follow the setup instructions.

:::info

If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!

:::

When adding liquidity to a Uniswap v3 pool, you must provide two assets in a particular ratio. In many cases, your contract or the user's wallet hold a different ratio of those two assets. In order to deposit 100% of your assets, you must first swap your assets to the optimal ratio and then add liquidity. 

However, the swap may shift the balance of the pool and thus change the optimal ratio. To avoid that, we can execute this swap-and-add liquidity operation in an atomic fashion, using a router. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for and the Pool **fee**.

The guide will **cover**:
1. Creating a router instance
2. Constructing the parameters for the swap-and-add function call
3. Making the swap-and function call 
4. Constructing and executing the transaction to swap-and-add liquidity 

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position's id on the UI of the web application. We should also be able to swap-and-add liquidity with the press of a button and see the change reflected in the balance of our tokens.

## Example

### Creating a router instance

The first step is to setup our router, the [`AlphaRouter`](https://github.com/Uniswap/smart-order-router/blob/97c1bb7cb64b22ebf3509acda8de60c0445cf250/src/routers/alpha-router/alpha-router.ts#L333), which is part of the [smart-order-router package](https://www.npmjs.com/package/@uniswap/smart-order-router). The router requires a `chainId` and a `provider` to be initialized. Note that routing is not supported for local forks, so we will use a mainnet provider even when swapping on a local fork:

```js reference title="Creating a router instance" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L41
```

Please note that routing has been covered in greater detail in the [routing guide](../04-routing.md).
### Constructing the parameters for the swap-and-add function call


Having created the router, we now need to construct the parameters required to make a call to its `routeToRatio` function. This is exactly what we want in our example.

The first parameter is an instance of `SwapAndAddConfig`, which sets configurations for the `routeToRatio ` algorithm. `ratioErrorTolerance` determines the margin of error the resulting ratio can have from the optimal ratio. `maxIterations` determines the maximum times the algorithm will iterate to find a ratio within error tolerance. If max iterations is exceeded, an error is returned:

```js reference title="Constructing SwapAndAddConfig" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L43-L46
```

The second parameter, which is optional, is an instance of `SwapAndAddOptions`. If it is included, `routeToRatio` will return the calldata for executing the atomic swap-and-add. These options contain `swapConfig` and `addLiquidityOptions`. `swapConfig` configures to set a recipient of leftover dust from swap, `slippageTolerance` and a `deadline` for the swap.

Then, `addLiquidityOptions` must contain a `tokenId` to add to an existing position, **or** a `recipient` to mint a new one. It also includes a `slippageTolerance` and `deadline` for adding liquidity.

The only custom parameter for `swapAndAddOptions`, is the token id, which is no other than the position id of the last position we minted in the example:

```js reference title="Constructing SwapAndAddOptions" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L48-L58
```

Thirdly, we construct two instances of `CurrencyAmount`s, each of which represents the initial balance of the token that we wish to swap-and-add, where the token is the token in our target liquidity pool. We use the configuration parameters of the guide to set those:

```js reference title="Constructing the two CurrencyAmounts" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L60-L74
```


Finally we construct the position, a position object that contains the details of the position for which to add liquidity. The position liquidity can be set to 1, since liquidity is still unknown and will be set inside the call to `routeToRatio`:

```js reference title="Making the call to routeToRatio" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L76-L79
```


### Making the swap-and function call

Having constructed all the parameters we need to call `routeToRatio`, we can now make the call to the function:

```js reference title="Constructing the position object" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L81-L87
```
The return type of the function call is [SwapToRatioResponse](https://github.com/Uniswap/smart-order-router/blob/97c1bb7cb64b22ebf3509acda8de60c0445cf250/src/routers/router.ts#L121). If a route was found successfully, this object will have two fields: the status will be set to success and the result will contain the `SwapToRatioRoute` object. We check to make sure that both of those conditions hold true before we construct and submit the transaction:

```js reference title="Checking that a route was found" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L89-L94
```

### Constructing and executing the transaction to swap-and-add liquidity

After making sure that a route was successfully found, we can now construct and send the transaction. The response result, that is of type`SwapToRatioRoute`, has the properties we need to construct our transaction object:

```js reference title="Constructing and sending the transaction" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a34ecd48c95c075bfbc443af4b4150b481e87b8b/v3-sdk/swap-and-add-liquidity/src/example/Example.tsx#L96-L104
```

If the transaction was successful, the effect of it is to swap-and-add the the amount of each token that we supplied.