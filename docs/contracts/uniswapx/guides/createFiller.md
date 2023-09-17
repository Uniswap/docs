---
id: createfiller
title: Creating A Filler
sidebar_position: 1
---

# Integrating as a Filler

There are two components to integrating as a filler: defining a filler execution strategy and retrieving & executing discovered orders.

## 1. Defining a Filler Execution Strategy

To execute a discovered order, a filler needs to call one of the `execute` methods ([source](https://github.com/Uniswap/UniswapX/blob/v1.1.0/src/reactors/BaseReactor.sol#L31)) of the Dutch Order Reactor, providing it with the orders to execute.

The simplest fill strategy is called `Direct Filler`, where the trade is executed directly against tokens held in the fillers address. To use this strategy, a filler can simply approve the order's output tokens to the reactor and call `execute` or `executeBatch` from their address. (see [source](https://github.com/Uniswap/UniswapX/blob/v1.1.0/src/reactors/BaseReactor.sol#L35)):

```solidity
// Execute direct filler order
outputToken.approve(reactor, type(uint256).max);
reactor.execute(order);
```

More sophisticated fillers can implement arbitrarily complex strategies by deploying their own Executor contracts. This contract should implement the [IReactorCallback](https://github.com/Uniswap/UniswapX/blob/v1.1.0/src/interfaces/IReactorCallback.sol) interface, which takes in an order with input tokens and acquires the allotted number of output tokens for the caller. It must approve the output tokens to the reactor, which then transfers them to the order output recipients to settle the order. Executor contracts must call `reactor.executeWithCallback` or `reactor.executeBatchWithCallback`. They can also specify arbitrary callback data that will be passed into the `reactorCallback` call.

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

For convenience, we’ve provided an [example Executor Contract](https://github.com/Uniswap/UniswapX/tree/v1.1.0/src/sample-executors) which demonstrates how a filler could implement a strategy that executes a UniswapX order against a Uniswap V3 pool.

## 2. Retrieve & Execute Signed Orders

All signed orders created through the Uniswap UI will be available via the UniswapX Orders Endpoint. We have [swagger documentation](https://api.uniswap.org/v2/uniswapx/docs) but see below for a quick example curl.

```
GET https://api.uniswap.org/v2/orders?orderStatus=open&chainId=1&limit=1
```

It’s up to the individual filler to architect their own systems for finding and executing profitable orders, but the basic flow is as follows:

1. Call `GET` on the `/orders` of the UniswapX Orders Endpoint as written above, to retrieve open signed orders
2. Decode returned orders using the [UniswapX SDK](https://github.com/Uniswap/UniswapX-sdk/#parsing-orders)
3. Determine which orders you would like to execute
4. Send a new transaction to the [execute](https://github.com/Uniswap/UniswapX/blob/a2025e3306312fc284a29daebdcabb88b50037c2/src/reactors/BaseReactor.sol#L29) or [executeBatch](https://github.com/Uniswap/UniswapX/blob/a2025e3306312fc284a29daebdcabb88b50037c2/src/reactors/BaseReactor.sol#L37) methods of the [Dutch Order Reactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/DutchOrderReactor.sol) specifying the signed orders you’d like to fill and the address of your executor contract

If the order is valid, it will be competing against other fillers attempts to execute it in a gas auction. For this reason, we recommend submitting these transactions through a service like [Flashbots Protect](https://docs.flashbots.net/flashbots-protect/overview).