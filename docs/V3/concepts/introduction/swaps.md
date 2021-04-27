---
id: swaps
title: Swaps
---

Swaps are the most common way of interacting with the Uniswap protocol. For end users, swapping is straightforward: a user selects an ERC-20 token that they own, and a token they would like to trade for. Executing a swap will trade the currently owned tokens for the commensurate amount of the other token desired, less the swap fee rewarded to liquidity providers.

Swapping via the protocol is an on-chain, peer-to-peer process that is entirely available to the public.

> note: Using web interfaces to swap via the Uniswap protocol can introduce additional permission structures, or entirely separate protocols that sit on top of the Uniswap protocol. To learn more about the differences between the protocol and a web interface, see Protocol, Interface, Labs.

Swapping using the Uniswap protocol is different from traditional order book trades, in that it is not executed against previously created orders, but against a liquidity pool directly. Swapping is a process executed via a smart contract 

that continuously values one asset relative to the other. Because the two assets in a given pool are valued relative to each other, the price of one in terms of the other is constantly shifting as a trade is executed. This dynamic, where the price of one token relative to the other changes during the execution of a swap, is called price impact.