---
id: glossary
title: Glossary
---

### Automated market maker

An automated market maker is a smart contract on Ethereum that holds on-chain liquidity reserves. Users can trade against these reserves at prices set by an automated market making formula.

### Concentrated liquidity

A key concept of Uniswap V3, this is liquidity that is allocated within a custom price range as opposed to being uniformly spread across the entire price interval (0, ∞).

### ERC20

ERC20 tokens are fungible tokens on Ethereum. Uniswap supports all standard ERC20 implementations.

### Flash swap

A trade that uses the tokens being purchased before paying for them.

### Liquidity provider / LP

A liquidity provider is someone who deposits ERC20 tokens into a given liquidity pool. Liquidity providers take on price risk and are compensated with trading fees.

### Mid price

The price between the available buy and sell prices. In V3, this is the ratio of the two ERC20 token reserves available within the current active tick.

### Pair

A smart contract deployed from the Uniswap V3 Factory that enables trading between two ERC20 tokens. Pair contracts are now called Pools in V3.

### Pool

A contract deployed by the V3 factory that pairs two ERC-20 assets. Different pools may have different fees despite containing the same token pair. Pools were previously called Pairs before the introduction of multiple fee options.

### Price impact

The difference between the mid-price and the execution price of a trade.

### Slippage

The amount the price moves in a trading pair between when a transaction is submitted and when it is executed.

### Tick interval

The area of price space between two nearest active ticks.

### Ticks

Ticks are the boundaries between discrete price ranges. A change of 1 Tick always represents a price change of 0.01% from the current price.

### Core

Smart contracts that are essential for Uniswap to exist. Upgrading to a new version of core would require a liquidity migration.

### Factory

A smart contract that deploys a unique smart contract for any ERC20/ERC20 trading pair.

### Periphery

External smart contracts that are useful, but not required for Uniswap to exist. New periphery contracts can always be deployed without migrating liquidity.