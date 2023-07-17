---
id: overview
title: Overview
sidebar_position: 1
---

# UniswapX

UniswapX is a new permissionless, open source (GPL), auction-based routing protocol for trading across AMMs and other liquidity sources.

UniswapX improves swapping in several ways:

- Better prices by aggregating liquidity sources
- Gas-free swapping
- Protection against MEV (Maximal Extractable Value)
- No cost for failed transactions
- And in the coming months, UniswapX will expand to gas-free cross-chain swaps.

Swappers generate signed orders which specify the intents of their swap, and fillers compete using arbitrary filling strategies to satisfy these orders.

# Trading on UniswapX
To trade using UniswapX, swappers create a new type of order called an Exclusive Dutch Order which specifies the maximum and minimum outputs they are willing to receive in a trade over a certain time period.

<img src={require('./images/UniswapX_graph.png').default} alt="UniswapX" width="100%%" />

They then sign a message that uses Permit2 to allow the transfer of tokens to complete the trade as long as the the number of tokens sent and received matched what is specified in the decay curve. These Signed Order messages are broadcast publicly and available to be executed by anyone who wants to be a “filler”.

## Fillers on UniswapX
UniswapX introduces a new participant in the Uniswap ecosystem, the _Filler_. These agents pickup signed orders from swappers and compete to execute them using any source of liquidity they have access to.

Anyone can fill orders on UniswapX, get started by reading our [Filler Integration Guide](/uniswapx/guides/createfiller).

## Parametizing UniswapX Orders
The UniswapX protocol does not explicitly parameterize the pricing of orders like the Exclusive Dutch Order, rather order parameterization is left to be configured by the order constructor. 

In the current Uniswap Labs interface implementation of UniswapX, some fillers may choose to help parameterize orders by participating as quoters. These fillers can *only* win a quote if they guarantee improved swapper execution over Uniswap v3 or v2 liquidity pools. Fillers who win a quote will receive execution priority for a limited period of time to fill orders they submitted wining quotes for. 

To ensure a smooth swapping experience for traders during the beta period, the set of Quoters will be vetted by Uniswap Labs following UniswapX’s launch, with plans to make the quoting system fully permissionless in the near future.

If you are interested in participating as a Quoter during the beta period, please reach out [here](mailto:quoters@uniswap.org).

# UniswapX Protocol Architecture

<!-- ![Architecture](./assets/uniswapx-architecture.png) -->
<img src={require('./images/UniswapX.png').default} alt="UniswapX" width="100%%" />

### Reactors

Order Reactors _settle_ UniswapX orders. They are responsible for validating orders of a specific type, resolving them into inputs and outputs, and executing them against the filler's strategy, and verifying that the order was successfully fulfilled.

Reactors process orders using the following steps:
- Validate the order
- Resolve the order into inputs and outputs
- Pull input tokens from the swapper to the fillContract using permit2 `permitWitnessTransferFrom` with the order as witness
- Call `reactorCallback` on the fillContract
- Verify that the output tokens were received by the output recipients

Reactors implement the [IReactor](./src/interfaces/IReactor.sol) interface which abstracts the specifics of the order specification. This allows for different reactor implementations with different order formats to be used with the same interface, allowing for shared infrastructure and easy extension by fillers.

Current reactor implementations:
- [LimitOrderReactor](./src/reactors/LimitOrderReactor.sol): A reactor that settles simple static limit orders
- [DutchOrderReactor](./src/reactors/DutchOrderReactor.sol): A reactor that settles linear-decay dutch orders
- [ExclusiveDutchOrderReactor](./src/reactors/ExclusiveDutchOrderReactor.sol): A reactor that settles linear-decay dutch orders with a period of exclusivity before decay begins

### Fill Contracts

Order fillContracts _fill_ UniswapX orders. They specify the filler's strategy for fulfilling orders and are called by the reactor with `reactorCallback`.

Some sample fillContract implementations are provided in this repository:
- [SwapRouter02Executor](./src/sample-executors/SwapRouter02Executor.sol): A fillContract that uses UniswapV2 and UniswapV3 via the SwapRouter02 router

### Direct Fill

If a filler wants to fill orders using funds on-hand rather than a fillContract, they can do so gas efficiently using the `directFill` macro by specifying `address(1)` as the fillContract. This will pull tokens from the filler using `msg.sender` to satisfy the order outputs.

# Whitepaper
More details on the UniswapX protocol are available in the [UniswapX Whitepaper](https://uniswap.org/whitepaper-uniswapx.pdf). 

# Deployment Addresses

| Contract                      | Address                                                                                                               | Source                                                                                                                    |
| ---                           | ---                                                                                                                   | ---                                                                                                                       |
| Exclusive Dutch Order Reactor | [0xe80bF394d190851E215D5F67B67f8F5A52783F1E](https://etherscan.io/address/0xe80bF394d190851E215D5F67B67f8F5A52783F1E) | [ExclusiveDutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/reactors/ExclusiveDutchOrderReactor.sol) |
| OrderQuoter                   | [0x7714520f383C998e8822E8743FD6f90A2979689b](https://etherscan.io/address/0x7714520f383C998e8822E8743FD6f90A2979689b) | [OrderQuoter](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/OrderQuoter.sol)                                        |
| Permit2                       | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)                                                                             |
