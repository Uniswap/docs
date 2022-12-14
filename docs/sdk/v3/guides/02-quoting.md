---
id: quoting
title: Quoting
---     

## Introduction

This guide will cover how to get the current quotes for any token pair on Uniswap.
It is based on the [Quoting code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).

In this example we will use `quoteExactInputSingle` to get a quote for the pair **USDC - WETH**.

The guide **cover**:
1. computing the Pool's address
2. setting up a reference to the Pool contract
3. Getting constant information from the Pool contact
4. setting up a reference to the Quoter contract
5. Getting Quotes from the Quoter contract

The **inputs** to the guide are:
1. The token in
2. The token out
3. The amount in

The **output** of the guide is a visual representation of the quote.

## Discussion

### Computing the Pool's address
```js reference title="Computing the Pool's address"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L14-L19
```

### Setting up a reference to the Pool contract
```js reference title="Setting up a reference to the Pool contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L21
```

### Getting constant information from the Pool contract
```js reference title="Getting constant information from the Pool contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L22
```

### Setting up a reference to the Quoter contract
```js reference title="Setting up a reference to the Quoter contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L32
```

### Getting Quotes from the Quoter contract
```js reference title="Getting Quotes from the Quoter contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L35-41
```


## Output

The output is 


# Notes
There are 4 types of quotes:
1. quoteExactInputSingle - given the amount you want to swap, produces a quote for the amount out for a swap of a single pool
2. quoteExactInput - given the amount you want to swap, produces a quote for the amount out for a swap over multiple pools
3. quoteExactOutputSingle - given the amount you want to get out, produces a quote for the amount in for a swap over a single pool
4. quoteExactOutput  - given the amount you want to get out, produces a quote for the amount in for a swap over multiple pools



- intro: concept that piece of code implements, summary of guide and result
- call out inputs to guide
- step by step walk through of the meaty pieces
- how to see output etc
- make sure to keep it at 10mins
- links/footnotes at the bottom
- only code that is called out

## High level ideas
- amount in type
- pool fee
- readable amounts and token decimals

