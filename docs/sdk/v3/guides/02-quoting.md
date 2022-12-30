---
id: quoting
title: Getting a Quote
---     

## Introduction

This guide will cover how to get the current quotes for any token pair on the Uniswap protocol. It is based on the [Quoting code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/quoting), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](./01-background.md) page!
:::

In this example we will use `quoteExactInputSingle` to get a quote for the pair **USDC - WETH**.
The inputs are the **token in**, the **token out**, the **amount in** and the **fee**.

The **fee** input parameters represents the swap fee that distributed to all in range liquidity at the time of the swap. It is one of the identifiers of a Pool, the others being **tokenIn** and **tokenOut**.

The guide will **cover**:

1. Computing the Pool's deployment address
2. Referencing the Pool contract and fetching metadata
3. Referencing the Quoter contract and getting a quote

At the end of the guide, we should be able to fetch a quote for the given input token pair and the input token amount with the press of a button on the web application.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

## Computing the Pool's deployment address

To interact with the **USDC - WETH** Pool contract, we first need to compute its deployment address.
The SDK provides a utility method for that:

```typescript reference title="Computing the Pool's address" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a88c8bc7a16ae15922c4ee86af796a9e430aad29/v3-sdk/quoting/src/example/Example.tsx#L20-L25
```

Since each *Uniswap V3 Pool* is uniquely identified by 3 characteristics (token in, token out, fee), we use those
in combination with the address of the *PoolFactory* contract to compute the address of the **USDC - ETH** Pool.
These parameters have already been defined in our configuration file:

```typescript reference title="Configuration Parameters" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/config.ts#L34-L39
```

## Referencing the Pool contract and fetching metadata

Now that we have the deployment address of the **USDC - ETH** Pool, we can construct an instance of an **ethers** `Contract` to interact with it:

```typescript reference title="Setting up a reference to the Pool contract" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/e1fbf8612e2e7d0b86a25637cc75881ff809ca2e/v3-sdk/quoting/src/example/Example.tsx#L27-L31
```

To construct the *Contract* we need to provide the address of the contract, its ABI and the provider that will carry out the RPC call for us.
We get access to the contract's ABI through the [@uniswap/v3-core](https://www.npmjs.com/package/@uniswap/v3-core) package, which holds the core smart contracts of the Uniswap V3 protocol:

```typescript reference title="Uniswap V3 Pool smart contract ABI" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a88c8bc7a16ae15922c4ee86af796a9e430aad29/v3-sdk/quoting/src/example/Example.tsx#L7
```

Having constructed our reference to the contract, we can now access its methods through our provider.
We use a batch `Promise` call. This approach queries state data concurrently, rather than sequentially, to avoid out of sync data that may be returned if sequential queries are executed over the span of two blocks:

```typescript reference title="Getting Pool metadata from the Pool smart contact" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a88c8bc7a16ae15922c4ee86af796a9e430aad29/v3-sdk/quoting/src/example/Example.tsx#L32-L36
```

The return values of these methods will become inputs to the quote fetching function.

:::note
In this example, the metadata we fetch is already present in our inputs. This guide fetches this information first in order to show how to fetch any metadata, which will be expanded on in future guides.
:::

## Referencing the Quoter contract and getting a quote

Like we did for the Pool contract, we need to construct an instance of an **ethers** `Contract` for our Quoter contract in order to interact with it:

```typescript reference title="Setting up a reference to the Quoter contract" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/a88c8bc7a16ae15922c4ee86af796a9e430aad29/v3-sdk/quoting/src/example/Example.tsx#L46-L50
```

We get access to the contract's ABI through the [@uniswap/v3-periphery](https://www.npmjs.com/package/@uniswap/v3-periphery) package, which holds the periphery smart contracts of the Uniswap V3 protocol:

```typescript reference title="Uniswap V3 Quoter smart contract ABI" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/22ae27bafdbff895ee2168584154626ef4af4d30/v3-sdk/quoting/src/example/Example.tsx#L6
```

We can now use our Quoter contact to obtain the quote.

In an ideal world, the quoter functions would be `view` functions, which would make them very easy to query on-chain with minimal gas costs. However, the Uniswap V3 Quoter contracts rely on state-changing calls designed to be reverted to return the desired data. This means calling the quoter will be very expensive and should not be called on-chain.

To get around this difficulty, we can use the `callStatic` method provided by the **ethers.js** `Contract` instances.
This is a useful method that submits a state-changing transaction to an Ethereum node, but asks the node to simulate the state change, rather than to execute it. Our script can then return the result of the simulated state change:

```typescript reference title="Getting Quotes from the Quoter contract" referenceLinkText="View on Github" customStyling
https://github.com/Uniswap/examples/blob/1ef393c2b8f8206a3dc5a42562382c267bcc361b/v3-sdk/quoting/src/example/Example.tsx#L35-L41
```

The result of the call is the number of output tokens you'd receive for the quoted swap.

It should be noted that `quoteExactInputSingle` is only 1 of 4 different methods that the quoter offers:

1. `quoteExactInputSingle` - given the amount you want to swap, produces a quote for the amount out for a swap of a single pool
2. `quoteExactInput` - given the amount you want to swap, produces a quote for the amount out for a swap over multiple pools
3. `quoteExactOutputSingle` - given the amount you want to get out, produces a quote for the amount in for a swap over a single pool
4. `quoteExactOutput`  - given the amount you want to get out, produces a quote for the amount in for a swap over multiple pools

## Next Steps

Now that you're able to make a quote, check out our next guide on [trading](./03-trading.md) using this quote!
