---
id: glossary
title: Glossary
---

### Automated market maker

An automated market maker is a smart contract on Ethereum that holds on-chain liquidity reserves. Users can trade against these reserves at prices set by an automated market making formula.

### Concentrated liquidity

This is liquidity that is allocated within a custom price range as opposed to being uniformly spread across the entire price interval (0, ∞).

### Dynamic fees

Uniswap V4 supports dynamic fees, allowing pools to adjust their fees up or down. While other AMMs may have hard-coded logic for dynamic fees, V4 provides no opinionated calculation of the fee.

### ERC20

ERC20 tokens are fungible tokens on Ethereum. Uniswap supports all standard ERC20 implementations.

### Flash accounting

An optimization introduced in V4 that leverages EIP-1153's Transient Storage to reduce gas costs by consolidating balance changes into a single net update, eliminating intermediate balance transfers.

### Flash swap

A trade that uses the tokens being purchased before paying for them.


### Liquidity provider / LP

A liquidity provider is someone who deposits ERC20 tokens into a given liquidity pool. Liquidity providers take on price risk and are compensated with trading fees.

### Mid price

The price between the available buy and sell prices. This is the ratio of the two ERC20 token reserves available within the current active tick.

### Native ETH

Uniswap V4 supports native tokens, allowing ETH swappers and liquidity providers to benefit from cheaper transfers and the removal of wrapping costs.

### Pool

In Uniswap V4, pools are initialized as unique poolKey structs and managed entirely within the singleton contract, reducing gas costs by eliminating separate deployments for each pool.

### Pool key

A crucial struct in Uniswap V4 that uniquely identifies a liquidity pool. It encapsulates all the essential parameters that define a pool's characteristics.

### Pool manager

The single entry point for every liquidity pool, all pool state and logic are contained within this contract.

### Price impact

The difference between the mid-price and the execution price of a trade.

### Slippage

The amount the price moves in a trading pair between when a transaction is submitted and when it is executed.

### Singleton Design

Uniswap V4 introduces a single-contract architecture for managing pools, eliminating individual deployments, which drastically reduces gas costs for pool creation and multi-token swaps.

### Tick interval

The area of price space between two nearest active ticks.

### Ticks

Ticks are the boundaries between discrete price ranges. A change of 1 Tick always represents a price change of 0.01% from the current price.

### Core

Smart contracts that are essential for Uniswap to exist. Upgrading to a new version of core would require a liquidity migration.

### Periphery

External smart contracts that are useful, but not required for Uniswap to exist. New periphery contracts can always be deployed without migrating liquidity.