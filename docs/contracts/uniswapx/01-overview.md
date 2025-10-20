---
id: overview
title: Overview
sidebar_position: 1
---

UniswapX is a permissionless, open source, auction-based swapping protocol for trading across AMMs and other liquidity sources. It improves swapping in several ways:

- Better prices by aggregating liquidity sources
- Gas-free swapping
- Protection against MEV (Maximal Extractable Value)
- No cost for failed transactions

Swappers generate signed orders which specify the outputs of their swap, and fillers compete to satisfy these orders using their own filling strategies.

## Trading on UniswapX
To trade using UniswapX, swappers create orders that define their auction parameters and price tolerance. Each supported chain uses different auction mechanisms optimized for its specific characteristics.

For example, the graphic below illustrates a Dutch Auction, one type of auction used in UniswapX. In this auction, the order starts at a maximum price and decays down to a minimum price over time. Note that orders technically specify output token amounts, but the documentation will sometimes use 'price' interchangeably for simplicity.

 <img src={require('./images/Uniswapx_graph.png').default} alt="UniswapX" width="100%%" /> 

Instead of submitting these orders directly onchain, swappers sign a message that uses Permit2 to allow the transfer of tokens to complete the trade as long as the number of tokens sent and received matches what is specified in the decay curve. These signed order messages are broadcast publicly and available to be executed by anyone who wants to be a "filler."

Once an order is broadcast, fillers race to submit these orders onchain as soon as it is economically profitable for them to do so. The realized price for an order is based on when the order is filled by the first successful filler within the auction timeline. Some auctions use the block timestamp to determine the price, and some use the block number.

:::info Auction Types
Different chains use different auction mechanisms. See our [Auction Types Overview](/contracts/uniswapx/auctiontypes) for details.
:::

## Fillers on UniswapX
As mentioned above, UniswapX introduces a new participant in the Uniswap ecosystem, the Filler. Fillers are sophisticated entities who perform complex calculations and employ MEV-protected strategies to pick up signed orders and execute them to achieve the most profitable fill. 

:::info Getting Started as a Filler
Anyone can fill orders on UniswapX. Get started by reading our [Filler Integration Overview](/contracts/uniswapx/fillers/filleroverview.md).
:::