---
id: overview
title: Overview
sidebar_position: 1
---

# UniswapX

UniswapX is a permissionless, open source, auction-based swapping protocol for trading across AMMs and other liquidity sources. It improves swapping in several ways:

- Better prices by aggregating liquidity sources
- Gas-free swapping
- Protection against MEV (Maximal Extractable Value)
- No cost for failed transactions

Swappers generate signed orders which specify the outputs of their swap, and fillers compete to satisfy these orders using their own filling strategies.

# Trading on UniswapX
To trade using UniswapX, swappers create orders that specify parameters for an auction, as well as the maximum and minimum outputs they are willing to receive during a trade over a certain time period. Different chains implement different auction mechanisms optimized for their specific characteristics.

The graphic below illustrates how one version of an auction, called a Dutch Auction, works in UniswapX. The swapper's order specifies a maximum output amount, which decays down to a minimum output amount over a specified amount of time.

 <img src={require('./images/UniswapX_graph.png').default} alt="UniswapX" width="100%%" /> 

Instead of submitting these orders directly onchain, swappers sign a message that uses Permit2 to allow the transfer of tokens to complete the trade as long as the number of tokens sent and received matches what is specified in the decay curve. These signed order messages are broadcast publicly and available to be executed by anyone who wants to be a "filler."

Once an order is broadcast, fillers race to submit these orders onchain as soon as it is economically profitable for them to do so. The realized price for an order is based on when the order is filled by the first successful filler within the auction timeline. Some auctions use the block timestamp to determine the price, and some use the block number.

:::info Auction Types
Different chains use different auction mechanisms. See our [Auction Types Overview](/contracts/uniswapx/auctiontypes) for details.
:::

## Fillers on UniswapX
As mentioned above, UniswapX introduces a new participant in the Uniswap ecosystem, the Filler. Fillers are sophisticated entities who perform complex calculations and employ MEV-protected strategies to pick up signed orders and execute them to achieve the most profitable fill. 

:::info Getting Started as a Filler
Anyone can fill orders on UniswapX. Get started by reading our [Filler Integration Guide](/contracts/uniswapx/guides/mainnet/createfiller).
:::