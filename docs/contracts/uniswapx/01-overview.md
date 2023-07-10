---
id: overview
title: Overview
sidebar_position: 1
---

# UniswapX

UniswapX is an intent-based ERC20 swap settlement protocol that provides swappers with a gasless experience, MEV protection, and access to arbitrary liquidity sources. Swappers generate signed orders which specify the intents of their swap, and fillers compete using arbitrary fill strategies to satisfy these orders.


## UniswapX Protocol Architecture

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

# Integrating with UniswapX
See [Filler Integration Guide](/contracts/uniswapx/guides/createfiller)

# Deployment Addresses

| Contract                      | Address                                                                                                               | Source                                                                                                                    |
| ---                           | ---                                                                                                                   | ---                                                                                                                       |
| Exclusive Dutch Order Reactor | [0xe80bF394d190851E215D5F67B67f8F5A52783F1E](https://etherscan.io/address/0xe80bF394d190851E215D5F67B67f8F5A52783F1E) | [ExclusiveDutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/reactors/ExclusiveDutchOrderReactor.sol) |
| OrderQuoter                   | [0x7714520f383C998e8822E8743FD6f90A2979689b](https://etherscan.io/address/0x7714520f383C998e8822E8743FD6f90A2979689b) | [OrderQuoter](https://github.com/Uniswap/UniswapX/blob/v1.0.0/src/OrderQuoter.sol)                                        |
| Permit2                       | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) | [Permit2](https://github.com/Uniswap/permit2)                                                                             |
