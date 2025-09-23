---
id: auctiontypes
title: Auction Types
sidebar_position: 3
---

TODO

## Parametizing UniswapX Orders on Mainnet
The UniswapX protocol on Mainnet does not explicitly parameterize the pricing of orders like the Exclusive Dutch Order, rather order parameterization is left to be configured by the order constructor. 

In the current Uniswap Labs interface implementation of UniswapX, some fillers may choose to help parameterize orders on Mainnet by participating as quoters. These fillers can *only* win a quote if they guarantee improved swapper execution over Uniswap v3 or v2 liquidity pools. Fillers who win a quote will receive execution priority for a limited period of time to fill orders they submitted wining quotes for. 

To ensure a smooth swapping experience for traders, the set of Quoters will be vetted by Uniswap Labs following UniswapX’s launch, with plans to make the quoting system fully permissionless in the near future.

If you are interested in participating as a Quoter, please reach out [here](mailto:quoters@uniswap.org).