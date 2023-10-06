---
id: web3-development-basics
title: Web3 Development Basics
position: 3
---

## Introduction

Developing dApps and interacting with Smart Contracts is quite different from Web2, and at times challenging due to little information
on this topic compared to other areas of software development.

This developer guide is a quick overview of the space, including references to libraries and guides that are great starting points.
Reading this guide should help you identify areas that you might need to learn a bit more about and prepare you for the following Uniswap-specific guides.

It is assumed that you know the basics about Ethereum and the blockchain, including some terminology.
If you already know how to build dApps and interact with ethersJS etc. you can safely skip this guide.

## RPCs

The access point to the blockchain are RPC nodes. They are the [standardized interface](https://ethereum.org/en/developers/docs/apis/json-rpc/)
to read data from smart contracts, send transactions and interact with on-chain protocols.

RPCs are either [full or archival nodes](https://ethereum.org/en/developers/docs/nodes-and-clients/archive-nodes/)
with a ([JSON-RPC](https://www.jsonrpc.org/)) interface.

To support Ethereum's decentralization, one can host a node themselves, for example by using one of the implementations listed below:

* [geth](https://github.com/ethereum/go-ethereum) - The original (reference) implementation of the Ethereum protocol
* [erigon](https://github.com/ledgerwatch/erigon) - A very efficient archival node implementation
* [Nethermind](https://github.com/NethermindEth/nethermind) - An Ethereum implementation focused on stability

As achieving high availability and making sure your node is synced all the time turns out to be quite challenging,
there are nodes as a service (RPC) providers that you can use, especially in production environments.
When choosing an RPC provider, we suggest you look for an RPC service that supports websockets as they provide far superior performance than HTTP connections.
To ensure interoperability, you should also ensure that your RPC provider adheres strictly to the JSON-RPC standard and doesn't require custom requests.

[Chainnodes](https://www.chainnodes.org/) is a robust RPC provider with generous free tier that you can use in both development and production environments.
For testing purposes you could also use a free public RPC endpoint, for example from [Chainlist](https://chainlist.org/).

### JSON-RPC Standard

RPCs communicate over the [JSON-RPC](https://www.jsonrpc.org/) standard. To send requests, you take the RPC URL and
make a POST request with a JSON body. See the below example:

`POST https://mainnet.chainnodes.org/API_KEY`

Body:

```json
{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
}
```

At the time of writing, this request would respond with the following:

```json
{
    "id": 1,
    "result": "0x11527c0",
    "jsonrpc": "2.0"
}
```

Examining the result, we see that the result is an encoded hex string.
After decoding it, we see it returns the current blocknumber of our network, `18163648`.

You can find the above examples, including more, in [this Postman collection](https://www.postman.com/chainnodes/workspace/uniswap-examples).

To check out all possible RPC requests, head over to the [Chainnodes Docs](https://www.chainnodes.org/docs).

### Client implementations

As communicating over HTTP with POST requests directly can be quite difficult, especially if you want to properly
encode and decode responses and handle failures and exponential backoffs, there are client implementations that
can do the heavy lifting for you. These SDKs have developer friendly APIs and internally handle
creating the proper RPC requests, sending them to the endpoint you choose and decoding the response for you.

Some of the major implementations are listed below:

* [ethers.js](https://github.com/ethers-io/ethers.js) - Javascript/Typescript SDK for NodeJS and the Browser. Used throughout the Uniswap Docs.
* [wagmi](https://github.com/wagmi-dev/wagmi) and [viem](https://github.com/wagmi-dev/viem) - Javascript/Typescript, great duo for modern Web3 development in the Browser.
* [web3js](https://github.com/web3/web3.js) - Javascript/Typescript SDK for NodeJS and the Browser by ChainSafe.

Web3 development is not limited to JS. Web3 libraries for various languages include:

* [Web3.swift](https://github.com/Boilertalk/Web3.swift) - Swift SDK for iOS apps and Backends.
* [KEthereum](https://github.com/komputing/KEthereum) - Kotlin SDK for Android development.
* [ethers-rs](https://github.com/gakonst/ethers-rs) - Rust SDK.
* [ethclient](https://github.com/ethereum/go-ethereum/tree/master/ethclient) - Go SDK, part of geth, the reference Ethereum node implementation.

At the moment, Uniswap only offers Typescript sdks.

As you can see there are lots of SDKs to make it easier to communicate via RPC with the blockchain.

### Local Development

To simulate RPCs and transactions locally, you can check [this guide](./02-local-development).

## Indexers

As RPCs are only a slim abstraction of the data stored in the blockchain, there are certain things that are hard
or expensive to access with regular RPC requests.

A common example are transactions of a specific Wallet address. Imagine you want to get a list of all transactions that originated from (or to) a
specific Wallet. One could think there should be an RPC method called `eth_getTransactionsForWallet` or something similar.
But due to the nature of how the data is stored, this RPC method is not feasible, and hence not implemented.

Now, instead of accessing those kind of things by iterating through every block in the blockchain, you can use Indexers, that are
designed to index data like that on the go and provide easy access to it.

### TheGraph

A well-known, standardized implementation of indexers is [TheGraph](https://thegraph.com/). It is used by most major protocols,
including Uniswap, to index data and make it accessible to users and dashboards.

Using TheGraph, you can either access open [subgraphs](https://thegraph.com/explorer) via the GraphQL querying language, or [create your own](https://thegraph.com/docs/en/developing/creating-a-subgraph/) and deploy it.

Throughout the docs you will see how to interact with the Uniswap subgraph to fetch tick data and more without ever touching RPCs.

An important note about Indexers though:

While they can be helpful, you need to be aware that the ultimate source of truth comes from the RPCs. As reorgs happen and
certain issues on indexers arise, there might be certain datapoints that are either not fully up-to-date or even
completely wrong on Indexers. If you have a use-case that requires perfectly correct data all the time, use RPCs directly.
If you are just doing data visualization or dashboards, use Indexers if they fit your use-case.

Some popular subgraphs that you can try to fetch data from the blockchain easily (click on playground to give it a try):

* [Uniswap Messari subgraph](https://thegraph.com/explorer/subgraphs/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7?view=Overview&chain=mainnet)
* [Snapshot Subgraph](https://thegraph.com/explorer/subgraphs/3Q4vnuSqemXnSNHoiLD7wdBbGCXszUYnUbTz191kDMNn?view=Overview&chain=mainnet)
* [Aave V3 Messari subgraph](https://thegraph.com/explorer/subgraphs/HB1Z2EAw4rtPRYVb2Nz8QGFLHCpym6ByBX6vbCViuE9F?view=Overview&chain=mainnet)

## Smart Contract Development

Smart contracts are typically developed using the [Solidity language](https://soliditylang.org/).

There are VSCode plugins that make the development with Solidity easier. One of them is Juan Blanco's "Solidity" that you can find
over [here](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity).

You would typically also go for a developer suite with testing, compilation and deployment capabilities:

* [Foundry](https://github.com/foundry-rs/foundry) - Fast and modern developer tools for smart contract engineers.
* [Hardhat](https://github.com/NomicFoundation/hardhat) - Scriptable, easy and battle-tested JS developer suite for smart contracts.

To read data from smart contracts, or interact with them, use the [client SDKs](#client-implementations) mentioned above.
They help you generate the necessary RPC calls to fetch data from / send transactions to the blockchain and interact with your
smart contracts.
You can read more about it in the [ethers.js docs](https://docs.ethers.org/v5/api/contract/contract/).

## Blockchain Explorers

Manually gathering information and inspecting data stored in a blockchain is a tedious task.
Almost all chains have at least one accompanying block explorer to help visualize addresses, transactions, contracts and more.

For Ethereum mainnet, we suggest using [Etherscan](https://etherscan.io/).
You can use Etherscan to inspect [contracts](https://etherscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45#code), transactions, blocks, and much more.

If you are looking to debug a transaction, [Tenderly](https://dashboard.tenderly.co/tx/mainnet/0xa4affe1abfaf28d1763d6c3ccda33e717462a928abca89415fc6e661dd7e0c55) can also be a very helpful tool.
In this example of a failed transaction on the Uniswap V2 Router you can easily see why the execution failed and where.

## The Uniswap development suite

Uniswap offers several SDKs that work together and enable you to easily interact with the Uniswap protocol
The most important SDKs are:

* [sdk-core](https://github.com/Uniswap/sdk-core): The core of the Uniswap SDKs, defines classes and types shared across all the SDKs
* [v2-sdk](https://github.com/Uniswap/v2-sdk): An SDK to interact with the Uniswap V2 protocol.
* [v3-sdk](https://github.com/Uniswap/v3-sdk): An SDK to interact with the Uniswap V3 protocol.
* [router-sdk](https://github.com/Uniswap/router-sdk): Provides abstractions to interact with the (older) SwapRouter contracts.
* [universal-router-sdk](https://github.com/Uniswap/universal-router-sdk): Abstracts interactions with the Universal Router.
* [smart-order-router](https://github.com/Uniswap/smart-order-router): Searches for the most efficient routes for a trade.
* [permit2-sdk](https://github.com/Uniswap/permit2-sdk): Simplifies interactions with Permit2 in JS.
* [uniswapx-sdk](https://github.com/Uniswap/uniswapx-sdk): SDK for the UniswapX protocol.

As you know already, all interactions with the blockchain happens through RPCs. So the Uniswap SDKs, as you will see throughout the guides,
requires you to have access to an RPC endpoint like [Chainnodes](https://www.chainnodes.org).
When reading data, the data is read from the given RPC endpoint. When actually swapping, you will need to sign a transaction
using a private key.

We are continuously working on improving the Uniswap development suite, so stay tuned for more updates.

## Next Steps

Go through the basic guides first and try to fetch some data and interact with the Uniswap ecosystem a little bit. You can even
[send your first swap transaction](./swaps/02-trading) on a local fork!

While some concepts in Web3 require thinking outside of the box, this guide should give you a good overview on where to start.
You should now be fully equipped to follow our other guides.
