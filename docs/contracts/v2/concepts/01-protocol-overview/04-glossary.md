---
id: glossary
title: Glossary
---

### Automated market maker

An automated market maker is a smart contract on Ethereum that holds on-chain liquidity reserves. Users can trade against these reserves at prices set by an automated market making formula.

### Constant product formula

The automated market making algorithm used by Uniswap.
See [x\*y=k](#x--y--k).

### ERC20

ERC20 tokens are fungible tokens on Ethereum. Uniswap supports all standard ERC20 implementations.

### Factory

A smart contract responsible for deploying unique contracts for each ERC20/ERC20 trading pair.

### Pair

A smart contract deployed from the Uniswap V2 Factory that enables trading between two ERC20 tokens.

### Pool

Liquidity within a pair is aggregated from all liquidity providers.

### Liquidity provider / LP

A liquidity provider deposits an equivalent value of two ERC20 tokens into a pair’s liquidity pool. Liquidity providers take on price risk and are compensated with fees.

### Mid price

TThe midpoint between the buy and sell prices of tokens at a given moment.

### Price impact

The difference between the mid-price and the execution price of a trade.

### Slippage

The difference in price for a trading pair between transaction submission and execution.

### Core

Smart contracts that form the essential infrastructure of Uniswap. Upgrading to a new version of core would require a liquidity migration.

### Periphery

External smart contracts that enhance Uniswap’s functionality but are not essential for its operation.

### Flash swap

A trade where tokens are borrowed and used before payment is made, all within a single transaction.

### `x * y = k`

The constant product formula underlying Uniswap’s automated market-making mechanism.

### Invariant

The constant value ('k') in the constant product formula, which remains unchanged during trades.
