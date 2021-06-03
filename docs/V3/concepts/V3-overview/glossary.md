---
id: glossary
title: Glossary
---

## Automated Market Maker

An automated market maker is a smart contract on Ethereum that holds liquidity reserves. Users can trade against these reserves at prices determined by a fixed formula. Anyone may contribute liquidity to these smart contracts, earning pro-rata trading fees in return.

## Asset

While a digital asset can take many forms, the Uniswap Protocol supports ERC-20 token pairs, and represents a position in the form of an NFT (ERC-721).

## Concentrated Liquidity

Liquidity that is allocated within a determined price range.

## Constant Product Formula

The automated market making algorithm used by Uniswap. In v1 and v2, this was x\*y=k.

## Core

Smart contracts that are considered foundational, and are essential for Uniswap to exist. Upgrading to a new version of core would require deploying an entirely new set of smart contracts on Ethereum and would be considered a new version of the Uniswap Protocol.

## ERC20

ERC20 tokens are fungibile tokens on Ethereum. Uniswap supports all standard ERC20 implementations.

## Factory

A smart contract that deploys a unique smart contract for any ERC20/ERC20 trading pair.

## Flash Swap

A trade that uses the tokens purchased before paying for them.

## Invariant

The “k” value in the constant product formula X\*Y=K

## Liquidity Provider / "LP"

A liquidity provider is someone who deposits ERC20 tokens into a given liquidity pool. Liquidity providers take on price risk and are compensated with trading fees.

## Liquidity

Digital assets that are stored in a Uniswap pool contract, and are able to be traded against by traders.

## Mid Price

The price between the available buy and sell prices. In Uniswap V1 and V2, this is the ratio of the two ERC20 token reserves. In V3, this is the ratio of the two ERC20 token reserves available within the current active tick.

## Observation

An instance of historical price and liquidity data of a given pair

## Pair

A smart contract deployed from a Uniswap V1 or V2 factory contract that enables trading between two ERC20 tokens. Pair contracts are now called Pools in V3.

## Periphery

External smart contracts that are useful, but not required for Uniswap to exist. New periphery contracts can always be deployed without migrating liquidity.

## Pool

A contract deployed by the V3 factory that pairs two ERC-20 assets. Different pools may have different fees despite containing the same token pair. Pools were previously called Pairs before the introduction of multiple fee options.

## Position

An instance of liquidity defined by upper and lower tick. And the amount of liquidity contained therein.

## Price Impact

The difference between the mid-price and the execution price of a trade.

## Protocol Fees

Fees that are rewarded to the protocol itself, rather than to liquidity providers.

## Range

Any interval between two ticks of any disance.

## Range Order

An approximation of a limit order, in which a single asset is provided as liquidity across a specified range, and is continuously swapped to the desination address as the spot price crosses the range.

## Reserves

The liquidity available within a pair. This was more commonly referenced before concentrated liquidity was introduced.

## Slippage

The amount the price moves in a trading pair between when a transaction is submitted and when it is executed.

## Spot Price

The current price of a token relative to another within a given pair.

## Swap Fees

The fees collected upon swapping which are rewarded to liquidity providers.

## Tick Interval

The price space between two nearest ticks.

## Tick

The boundaries between discreet areas in price space.
