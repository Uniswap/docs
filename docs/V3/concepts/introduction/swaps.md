---
id: swaps
title: Swaps
---

## Introduction 

Swaps are the most common way of interacting with the Uniswap protocol. For end-users, swapping is straightforward: a user selects an ERC-20 token that they own and a token they would like to trade it for. Executing a swap sells the currently owned tokens for the proportional amount of the tokens desired, minus the swap fee rewarded to liquidity providers[^1]. Swapping with the Uniswap protocol is a permissionless, peer-to-peer process and is entirely open to the public.

> note: Using web interfaces (websites) to swap via the Uniswap protocol can introduce additional permission structures or even entirely separate protocols that sit on top of the Uniswap protocol. To learn more about the differences between the protocol and a web interface, see What is Uniswap.

Swaps using the Uniswap protocol are different from traditional order book trades in that they are not executed against previously created orders - but rather against an automated liquidity pool directly. 

Swapping is a process executed via smart contracts that continuously value one asset relative to the other. As the two assets in a given pool are continuously valued relative to each other, the price of one asset in terms of the other continually shifts as a trade executes. This dynamic, where the price of one token relative to the other changes during the execution of a swap, we call price impact.

## Price Impact

In a traditional order-book market, a sizeable market-buy order may deplete the available liquidity of a prior limit-sell and continue to execute against a subsequent limit-sell order at a higher price. The result is the final execution price of the order is somewhere in between the two limit-sell prices from which the order was filled. 

Price impact affects the execution price of a swap similarly but is a result of a different dynamic. When using an automated market maker, the relative value of one asset in terms of the other continuously shifts during the execution of a swap, leaving the final execution price somewhere between where the relative value started - and ended. 

This dynamic affects every swap using the Uniswap protocol, as it is an inextricable part of AMM design.

Compared to previous versions of the Uniswap protocol, calculating price impact in V3 is somewhat more complicated, as the amount of liquidity available can change at different price points. Changes in active liquidity directly correlate to a reduction in price impact (in the case of more liquidity), or an increase in price impact (in areas of lower liquidity). 

For end-users, this isn't a problem. Approximate[^2] price impact is anticipated in real-time via the Uniswap interface, and warnings appear if unusually high price impact will occur during a swap. Anyone executing a swap will have the ability to assess the circumstances of price impact when needed. 

## Slippage

The other relevant detail to consider when approaching swaps with the Uniswap protocol is slippage. Slippage is the term we use to describe alterations to a given price environment that could occur while a submitted transaction is pending. 

When transactions are submitted to Ethereum, their order of execution is established by the amount of "gas" offered as a fee for executing each transaction. The higher the fee offered, the faster the transaction is executed. The transactions with a lower gas fee will remain pending for an indeterminate amount of time. During this time, the price environment in which the transaction will eventually be executed will change, as other swaps will be taking place.

Slippage tolerances establish a margin of change acceptable to the user. As long as the execution price is within the slippage range, e.g., %1, the transaction will be executed. If the execution price ends up outside of the accepted slippage range, the transaction will fail, and the swap will not occur.

A comparable situation in a traditional market would be a market-buy order executed after a delay. One can know the expected price of a market-buy order when submitted, but much can change in the time between submission and execution. 

## Safety Checks

Price impact and slippage can both change while a transaction is pending, which is why we have built numerous safety checks into the Unsiwap protocol to protect end-users from drastic changes in the execution environment of their swap. 
Some of the most commonly encountered safety checks: 

   * **Expired** : A transaction error that occurs if a swap is pending longer than a predetermined deadline. The deadline is a point in time after which the swap will be canceled to protect against unusually long pending periods and the increase in environmental change that comes along with it.

   * **INSUFFICIENT_OUTPUT_AMOUNT** : When a user submits a swap, the Uniswap interface will send an estimate of how much of the purchased token to expect out. If the anticipated output amount of a swap does not match, within a certain margin of change, the swap will be cancelled. This attempts to protect the user from any drastic and unfavorable price changes while their transaction is pending.

[^1] For information about liquidity provision, see liquidity provision

[^2] The Uniswap interface informs the user about the circumstances of their swap, but it is not guaranteed.
