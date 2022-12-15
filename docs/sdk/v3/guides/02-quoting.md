---
id: quoting
title: Quoting
---     

## Introduction

This guide will cover how to get the current quotes for any token pair on Uniswap.
It is based on the [Quoting code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).

In this example we will use `quoteExactInputSingle` to get a quote for the pair **USDC - WETH**.
The inputs are the **token in**, the **token out** and the **amount in**.

The guide will **cover**:
1. Computing the **USDC - WETH** Pool's deployment address
2. Setting up a reference to the Pool contract and getting metadata from it.
3. Setting up a reference to the Quoter contract and getting a quote for the pool

At the end of the guide, we should be able to fetch a quote for the given input token pair and the input token amount with the press of a button on the web application.

## Example

### Computing the Pool's address


To interact with the **USDC - WETH** Pool contract, we first need to compute its deployment address.
The SDK provides a utility method for that:

```js reference title="Computing the Pool's address"
https://github.com/Uniswap/examples/blob/22ae27bafdbff895ee2168584154626ef4af4d30/v3-sdk/quoting/src/example/Example.tsx#L13-L18
```
Since each *Uniswap V3 Pool* is uniquely identified by 3 characteristics (token in, token out, fee), we use those
in combination with the address of the *PoolFactory* contract to compute the address of the **USDC - ETH** Pool.
These parameters have already been defined in our configuration file:

```ts reference title="Configuration Parameters"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/config.ts#L34-L39
```


### Setting up a reference to the Pool contract

Now that we have the deployment address of the **USDC - ETH** Pool, we can construct an instance of an **ethers** `Contract` to interact with it:

```js reference title="Setting up a reference to the Pool contract"
https://github.com/Uniswap/examples/blob/e1fbf8612e2e7d0b86a25637cc75881ff809ca2e/v3-sdk/quoting/src/example/Example.tsx#L27-L31
```

To construct the *Contract* we just need to provide the address of the contract, its ABI and the provider that will carry out the RPC call for us.
We can get access to the contract's ABI through the [@uniswap/v3-core](https://www.npmjs.com/package/@uniswap/v3-core) package, which holds 

```js reference title="Uniswap V3 Pool smart contract ABI"
https://github.com/Uniswap/examples/blob/22ae27bafdbff895ee2168584154626ef4af4d30/v3-sdk/quoting/src/example/Example.tsx#L7
```


### Getting Pool metadata from the Pool smart contact

Having constructed our reference to the contract, we can now access its methods through our provider.
We use a batch `Promise` call. This approach queries state data concurrently, rather than sequentially, to avoid out of sync data that may be returned if sequential queries are executed over the span of two blocks:


```js reference title="Getting Pool metadata from the Pool smart contact"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L22
```

The return values of these methods will become inputs to the quote fetching function.

### Setting up a reference to the Quoter contract

Like we did for the Pool contract, we need to construct an instance of an **ethers** `Contract` for our Quoter contract in order to interact with it:
```js reference title="Setting up a reference to the Quoter contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L32
```

We can get access to the contract's ABI through the [@uniswap/v3-periphery](https://www.npmjs.com/package/@uniswap/v3-periphery) package:

```js reference title="Uniswap V3 Quoter smart contract ABI"
https://github.com/Uniswap/examples/blob/22ae27bafdbff895ee2168584154626ef4af4d30/v3-sdk/quoting/src/example/Example.tsx#L6
```


### Getting Quotes from the Quoter contract

We can now use our Quoter contact to obtain the quote.

In an ideal world, the quoter functions would be `view` functions, which would make them very easy to query on-chain with minimal gas costs. 
However, the Uniswap V3 Quoter contracts rely on state-changing calls designed to be reverted to return the desired data. 
This means calling the quoter will be very expensive and should not be called on-chain.

To get around this difficulty, we can use the `callStatic` method provided by the **ethers.js** `Contract` instances.
This is a useful method that submits a state-changing transaction to an Ethereum node, but asks the node to simulate the state change, rather than to execute it. 
Our script can then return the result of the simulated state change:

```js reference title="Getting Quotes from the Quoter contract"
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L35-L41
```

It should be noted that `quoteExactInputSingle` is only 1 of 4 different methods that the quoter offers:
1. `quoteExactInputSingle` - given the amount you want to swap, produces a quote for the amount out for a swap of a single pool
2. `quoteExactInput` - given the amount you want to swap, produces a quote for the amount out for a swap over multiple pools
3. `quoteExactOutputSingle` - given the amount you want to get out, produces a quote for the amount in for a swap over a single pool
4. `quoteExactOutput`  - given the amount you want to get out, produces a quote for the amount in for a swap over multiple pools
