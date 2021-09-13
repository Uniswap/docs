---
id: fetching-prices
title: Fetching Spot Prices
---

## Fetching Token Prices with the SDK

To calculate the spot price of any pool, you can call trivially call `token0Price` or `token1Price` on any Pool object (how nice!). However, in addition to learning a couple of simple steps needed to fetch token prices, you will also learn *how* the SDK calculates these quantities. Going through these calculations will hopefully provide the necessary context behind fixed point numbers, square roots, and difficult-to-understand variable names like `sqrtPriceX96`. :)

### Calling the functions

Similar to other examples, you first must set up your pool. If you’re unsure how to collect all the parameters necessary in creating a Pool instance see [Creating a Pool Instance](https://docs.uniswap.org/sdk/guides/creating-a-pool) or look at this typescript example [here](https://github.com/Uniswap/uniswap-docs/blob/main/sdk-examples/AddAndRemoveLiquidity.tsx). The `Pool` class contains two getter methods `token0Price` and `token1Price` which will return the prices of each token respectively as a `Price`.

After constructing the pool, you can save the token prices as constants:

```typescript
  const DAI_USDC_POOL = new Pool(
    DAI,
    USDC,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  )
  
  const token0Price =  DAI_USDC_POOL.token0Price
  const token1Price = DAI_USDC_POOL.token1Price
```

### Understanding sqrtPrice

What is `sqrtPriceX96`?

In Uniswap V3, prices of tokens are stored (rather than derived) to allow pools to perform higher precision operations. In the actual implementation, prices are stored as square roots, hence the variable name `sqrtPriceX96`. The price is stored as a square root because of the geometric nature of the core AMM algorithm, x*y=k. Essentially, the math works out well when working with the square root of the price. 

In addition, you'll notice the `X96` tacked onto the end of the variable name. This naming convention indicates that it is a [fixed point number](https://en.wikipedia.org/wiki/Fixed-point_arithmetic) with 96 bits of precision preceding the decimal point. Because prices are fractions, using fixed point numbers is a way to represent fractions in integer-only environments and still achieve high precision.

An example of calculating a  `sqrtPriceX96` is :

```python
price = 100
sqrtPriceX96 = sqrt(price) * 2 ** 96
```

Thus, to get the price from the sqrtPriceX96 variable, you can execute the following operations to arrive at a final expression:

```python
sqrtPriceX96 = sqrt(price) * 2 ** 96
# divide both sides
sqrtPriceX96 / (2 ** 96) = sqrt(price)
# square both sides
(sqrtPriceX96 / (2 ** 96)) ** 2 = price
# multiply out the square
(sqrtPriceX96 / (2 ** 96)) * (sqrtPriceX96 / (2 ** 96))  = price
# square the numerator and denominator
(sqrtPriceX96 ** 2) / ((2 ** 96) * (2 ** 96)) = price
# add the exponents in the denominator to get the final expression:
sqrtRatioX96 ** 2 / 2 ** 192 = price
```
You will see that the formula in the last step is how the SDK calculates the prices with the functions [`token0Price`](#token0price) and [`token1Price`](#token1price).


### token0Price

Let's apply the math derived above to the functions `token0Price` and `token1Price`. Note that `sqrtRatioX96` is interchangeable with `sqrtPriceX96`. 

```typescript
  /**
   * Returns the current mid-price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */
  public get token0Price(): Price<Token, Token> {
    return (
      this._token0Price ??
      (this._token0Price = new Price(
        this.token0,
        this.token1,
        Q192,
        JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96)
      ))
    )
  }
```

`token0Price` returns a new `Price` as the ratio of token1 over token0. Note that a `Price` is constructed by :

```typescript
constructor(
    baseToken: Token, 
    quoteToken: Token,
    denominator: BigintIsh, 
    numerator: BigintIsh)
```

Let's break down the denominator and the numerator of the returned price and prove that it matches the math derived above. Recall that the expression achieved above is 

```python
price = sqrtRatioX96 ** 2 / 2 ** 192
```

#### The numerator

It's worth noting that the numerator is misleadingly listed *below* the denominator in the constructor for a `Price`. In any case, you will see that the numerator of the fraction is `JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96)` which nicely follows the math above: `sqrtPriceX96 ** 2`. 

#### The denominator

The denominator is `Q192`. To break this number down recall the following constants defined in the SDK :

```typescript
export const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96))
export const Q192 = JSBI.exponentiate(Q96, JSBI.BigInt(2))
```
Thus, the denominator for the `token0Price` also matches the math derived above where `Q192` is `(2 ** 96) * (2 ** 96)` which is the same as `(2 ** 192)`.

### token1Price

Recall that `token0Price` is the ratio of token1 over token0 and that `token1Price` is the ratio of token0 over token1. This means that the derivation for `token1Price` follows the same math except the numerator and denominator are flipped, implying the inverse. 

So instead of 

```python
price = sqrtRatioX96 ** 2 / 2 ** 192
```
 you have
```python
 price =  2 ** 192 / sqrtRatioX96 ** 2
 ```
which is simply shown below in the function definition of `token1Price` :

```typescript
  /**
   * Returns the current mid-price of the pool in terms of token1, i.e. the ratio of token0 over token1
   */
  public get token1Price(): Price<Token, Token> {
    return (
      this._token1Price ??
      (this._token1Price = new Price(
        this.token1,
        this.token0,
        JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96),
        Q192
      ))
    )
  }
  ```

 You can see that in the function definition the numerator is now `Q192` and the denominator is now `JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96)`, matching the expression above.