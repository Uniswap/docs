---
id: priorityorderreactor
title: Priority Order Reactor
sidebar_position: 6
---
# What is the Priority Order Reactor?
The [Priority Order Reactor](https://github.com/Uniswap/UniswapX/blob/main/src/reactors/PriorityOrderReactor.sol) is a new, experimental UniswapX reactor built specifically for optimal execution chains that utilize Priority Gas Auctions (PGA) for ordering transactions. This new reactor type, which is based on research presented in [Priority is All you Need](https://www.paradigm.xyz/2024/06/priority-is-all-you-need), allows fillers to bid on orders during fulfillment through setting custom priority fees. 

## Example Implementation
Alice submits a PriorityOrder offering 1 ETH in exchange for a minimum of 1000 USDC. The fair market rate for the order is 1100 USDC, resulting in around 100 USDC in potential profit. 

If we assume a filler has a desired margin of 10% of the total profit, the best price is 1090 USDC. This would be 900 bps of improvement. This filler would convert bps to mps (see below for details) to get 900 * 1000 = 900,000 mps of improvement. Thus they would set priorityFee of 900,000 wei on their fill transaction. Keep in mind that this is additional to the base fee.

# Details for Fillers
- The interface is exactly the same as the current production version of UniswapX, but there will be a new reactor address which will require new approvals.
- We do not plan to run any preliminary auctions for the start price of these orders, rather we set a minimum price that each order must be executed at.
- Each order is only executable after a certain block specified by the user. You can expect this block to be a few blocks in the future from when you receive the order. To ensure the best UX for our users, Uniswap Labs will have the ability to make the start block earlier by cosigning the order. We expect nearly all orders to be filled in the first possible block.
- For every wei of priority fee above a certain threshold (an optional order specified value), the user is owed 1 milli-bps more of their output token. Milli-bps (or MPS) are one-thousandth of a basis point.
- PriorityOrders are only supported on chains which order transactions by priority fee — currently limited to OP stack L2s. Because of this ordering policy, the winning fill transaction necessarily must have also given the user the best execution.

# Timeline
We are planning to pilot using the Priority Order Reactor in early August 2024. Join the [UniswapX Fillers Channel](https://t.me/UniswapXdiscussion) for more details. 
