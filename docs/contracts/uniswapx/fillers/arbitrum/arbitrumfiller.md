---
id: arbitrumfiller
title: Filling on Arbitrum
sidebar_position: 4
---

# Filling on Arbitrum
Unlike UniswapX on Mainnet, orders on Arbitrum have **no RFQ portion and thus no exclusivity**. Filling on Arbitrum, however, follows the same two steps as filling on Mainnet: 
1. Retrieving signed orders  
2. Filling orders

## Retrieving Signed Orders
All signed Dutch Orders on Arbitrum, created through the Uniswap UI will be available via the UniswapX Orders Endpoint. We have [swagger documentation](https://api.uniswap.org/v2/uniswapx/docs) but see below for a quick example curl.

```
GET https://api.uniswap.org/v2/orders?orderStatus=open&chainId=42161&limit=1000
```

Use the [UniswapX SDK](https://github.com/Uniswap/sdks/tree/main/sdks/uniswapx-sdk) to parse the `encodedOrder` field returned from endpoint. Each one of these `Orders` represents a fillable user trader. 

As a lower latency alternative to polling the API, fillers can also apply to register a webhook and receive a feed of all open orders. See details for registering [here](../webhooks)

## Filling Orders
To execute a discovered order, a filler needs to call the [execute](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/BaseReactor.sol#L31) method of the Reactor specified in the retrieved `encodedOrder` body. The Reactor used by the Uniswap interface is located at:  

[0xB274d5F4b833b61B340b654d600A864fB604a87c](https://arbiscan.io/address/0xb274d5f4b833b61b340b654d600a864fb604a87c)

Always confirm the address from the retrieved order before submitting. 

The simplest fill strategy is called `Direct Filler`, where the trade is executed directly against tokens held in the fillers address. To use this strategy, a filler can simply approve the order's output tokens to the reactor and call `execute` or `executeBatch` from their address. (see [source](https://github.com/Uniswap/UniswapX/blob/v2.0.0-deploy/src/reactors/BaseReactor.sol)):

```solidity
// Execute direct filler order
outputToken.approve(reactor, type(uint256).max);
reactor.execute(order);
```

More sophisticated fillers can implement arbitrarily complex strategies by deploying their own Executor contracts. This contract should implement the [IReactorCallback](https://github.com/Uniswap/UniswapX/blob/v2.0.0-deploy/src/interfaces/IReactorCallback.sol) interface, which takes in an order with input tokens and acquires the allotted number of output tokens for the caller. It must approve the output tokens to the reactor, which then transfers them to the order output recipients to settle the order. Executor contracts must call `reactor.executeWithCallback` or `reactor.executeBatchWithCallback`. They can also specify arbitrary callback data that will be passed into the `reactorCallback` call.

```solidity
contract Executor {
  function execute(Order calldata order, bytes calldata callbackData) {
    reactor.executeWithCallback(order, callbackData)
  }

  function reactorCallback(ResolvedOrder[] calldata orders, bytes calldata callbackData) {
    // implement strategy here
  }
}

// Execute custom fill strategy
address executor = /* Address of deployed executor contract */ ;
bytes fillData = /* Call data to be sent to your executor contract */;
executor.execute(order, fillData);
```

For convenience, we’ve provided an [example Executor Contract](https://github.com/Uniswap/UniswapX/blob/v2.0.0-deploy/src/sample-executors/SwapRouter02Executor.sol) which demonstrates how a filler could implement a strategy that executes a UniswapX order against a Uniswap V3 pool. These contracts should be deployed to each chain that the filler would like to support.

## Order Types
On Arbitrum, DutchV3 order types are supported. You may query for a specific type by specifying the `orderType` query string parameter:

```
GET https://api.uniswap.org/v2/orders?orderStatus=open&chainId=42161&limit=1000&orderType={Dutch_V2 | Dutch_V3}
```

DutchV3 orders use a block-based decay mechanism. This design takes advantage of Arbitrum's 250 ms block frequency, allowing for more granular price updates compared to time-based decay systems that are limited by the `block.timestamp`'s second-level granularity in the EVM. 

### Order Type References
| OrderType | Contract Address | Reactor Specification | Example Filler Implementation |
|-----------|------------------|----------------------|------------------------------|
| DutchV3 | `0xB274d5F4b833b61B340b654d600A864fB604a87c` | [V3DutchOrderReactor.sol](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V3DutchOrderReactor.sol) | [dutchv3_strategy.rs](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/dutchv3_strategy.rs) |
| DutchV2 (deprecated April 15, 2025) | `0x1bd1aAdc9E230626C44a139d7E70d842749351eb` | [V2DutchOrderReactor.sol](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/V2DutchOrderReactor.sol) | [uniswapx_strategy.rs](https://github.com/Uniswap/uniswapx-artemis/blob/main/src/strategies/uniswapx_strategy.rs) |


# Get in touch
- To keep up to date, join our [Announcements Channel](https://t.me/uniswapx_fillers)
- To ask questions and discuss, join our [Fillers Group](https://t.me/UniswapXdiscussion)
