---
id: architecture
title: Architecture
sidebar_position: 2
---

# UniswapX Protocol Architecture

<!-- ![Architecture](./assets/uniswapx-architecture.png) -->
<img src={require('./images/UniswapX.png').default} alt="UniswapX" width="100%%" />

### Reactors

Order Reactors _settle_ UniswapX orders. They are responsible for validating orders of a specific type, resolving them into inputs and outputs, executing them against the filler's strategy, and verifying that the order was successfully fulfilled.

Reactors process orders using the following steps:
- Validate the order
- Resolve the order into inputs and outputs
- Pull input tokens from the swapper to the fillContract using permit2 `permitWitnessTransferFrom` with the order as witness
- Call `reactorCallback` on the fillContract
- Verify that the output tokens were received by the output recipients

Reactors implement the [IReactor](https://github.com/Uniswap/UniswapX/blob/main/src/interfaces/IReactor.sol) interface which abstracts the specifics of the order specification. This allows for different reactor implementations with different order formats to be used with the same interface, allowing for shared infrastructure and easy extension by fillers.

Current reactor implementations:
- [PriorityOrderReactor.sol](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol): A reactor that settles orders via a filler competitions that use priority gas fees
- [V2DutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V2DutchOrderReactor.sol): A Dutch Order Reactor that settles V2 linear decay Dutch orders. This version uses the block timestamp for auction decay.
- [V3DutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V3DutchOrderReactor.sol): The latest version of the Dutch Order Reactor, which settles linear decay Dutch orders. Unlike V2 orders, these orders specify auction decay in blocks instead of using the block timestamp. Given that the block timestamp only has 1-second resolution, using the block number in this reactor is advantageous on chains like Arbitrum, which have a block resolution of 250ms.
- [ExclusiveDutchOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/ExclusiveDutchOrderReactor.sol): A reactor that settles linear-decay dutch orders with a period of exclusivity before decay begins
- [LimitOrderReactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/LimitOrderReactor.sol): A reactor that settles simple static limit orders

### Fill Contracts

Order fillContracts _fill_ UniswapX orders. They specify the filler's strategy for fulfilling orders and are called by the reactor with `reactorCallback`.

Some sample fillContract implementations are provided in this repository:
- [SwapRouter02Executor](https://github.com/Uniswap/UniswapX/blob/main/src/sample-executors/SwapRouter02Executor.sol): A fillContract that uses UniswapV2 and UniswapV3 via the SwapRouter02 router

### Direct Fill

If a filler wants to fill orders using funds on-hand rather than a fillContract, they can do so gas efficiently using the `directFill` macro by specifying `address(1)` as the fillContract. This will pull tokens from the filler using `msg.sender` to satisfy the order outputs.

# Whitepaper
More details on the UniswapX protocol are available in the [UniswapX Whitepaper](https://uniswap.org/whitepaper-uniswapx.pdf) and in the [UniswapX Repo](https://github.com/Uniswap/UniswapX).