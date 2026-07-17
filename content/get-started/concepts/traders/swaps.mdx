---
id: swaps
title: Swaps
description: Learn how swaps work on Uniswap, including price impact, liquidity pools, and trade execution.
---

## How Swaps Work

Swaps are the most common way of interacting with the Uniswap protocol. For end-users, swapping is straightforward: a user selects an ERC-20 token that they own and a token they would like to trade it for. Executing a swap sells the currently owned tokens for a proportional amount of the desired token, minus the swap fee, which is awarded to [liquidity providers](/docs/get-started/concepts/ecosystem-participants#liquidity-providers). Swapping with the Uniswap protocol is a permissionless process.

Most users access swaps through web interfaces, which typically add routing, warnings, and default safety settings on top of core protocol execution.

Swaps using the Uniswap protocol differ from traditional order book trades. They are not executed against discrete orders on a first-in-first-out basis. Instead, swaps execute against a passive pool of liquidity, with liquidity providers earning fees proportional to capital committed.

## Protocol-Level Execution

At the smart contract level, swaps include safety and accounting checks that differ by version:

- **Uniswap v2**: pair contracts enforce input/output constraints and the constant product invariant after fees. If these checks fail, the swap reverts.
- **Uniswap v3**: swaps move through ticks and enforce a price limit (`sqrtPriceLimitX96`). The pool collects payment through `uniswapV3SwapCallback`.
- **Uniswap v4**: swaps execute through `PoolManager` with `unlock` and final balance settlement, and hooks can run custom logic before and after swaps.

Integrations usually add user-level guards on top of these protocol checks, such as minimum output, maximum input, and transaction deadlines.

### User Protection Parameters

Most integrations expose three core swap protections:

- **Minimum output (`amountOutMinimum`)**: used in exact-input swaps. If execution would return fewer output tokens than this value, the transaction reverts.
- **Maximum input (`amountInMaximum`)**: used in exact-output swaps. If execution would require spending more input tokens than this value, the transaction reverts.
- **Transaction deadline**: a timestamp after which the swap is no longer valid. If the transaction lands after this time, it reverts instead of executing in a stale market context.

Together, these controls define the worst acceptable execution for a user while a transaction is pending.

## Price Impact

In a traditional order-book market, a sizeable market-buy order may deplete the available liquidity of a prior limit-sell and continue to execute against a subsequent limit-sell order at a higher price. The result is that the final execution price of the order is somewhere in between the two limit-sell prices against which the order was filled.

Price impact affects swap execution similarly, but through a different mechanism. In an automated market maker, the relative value of one asset in terms of the other continuously shifts during swap execution, leaving the final execution price somewhere between where the relative price started and ended.

This dynamic affects every swap using the Uniswap protocol, as it is an inextricable part of AMM design.

As the amount of liquidity available at different price points can vary, the price impact for a given swap size will change relative to the amount of liquidity available at any given point in price space. The greater the liquidity available at a given price, the lower the price impact for a given swap size. The lesser the liquidity available, the higher the price impact.

Approximate price impact is anticipated in real-time via the Uniswap interface, and warnings appear if unusually high price impact will occur during a swap. Anyone executing a swap can assess price impact before confirming execution.

## Slippage

The other relevant detail to consider when approaching swaps with the Uniswap protocol is slippage. Slippage is the term we use to describe alterations to a given price that could occur while a submitted transaction is pending.

When transactions are submitted to Ethereum, their order of execution is established by the amount of "gas" offered as a fee for executing each transaction. The higher the fee offered, the faster the transaction is executed. The transactions with a lower gas fee will remain pending for an indeterminate amount of time. During this time, the price environment in which the transaction will eventually be executed will change, as other swaps will be taking place.

Slippage tolerances establish a margin of change acceptable to the user beyond price impact. As long as the execution price is within the slippage range, e.g., 1%, the transaction will be executed. If the execution price ends up outside of the accepted slippage range, the transaction will fail, and the swap will not occur.

A comparable situation in a traditional market would be a market-buy order executed after a delay. One can know the expected price of a market-buy order when submitted, but much can change in the time between submission and execution.

## Safety Checks

Price impact and slippage can both change while a transaction is pending, so integrations typically include user protection checks on top of protocol execution checks. Common integration-level examples include: 

- **Expired**: A transaction error that occurs if a swap is pending longer than a predetermined deadline. The deadline is a point in time after which the swap will be canceled to protect against unusually long pending periods and the changes in price that typically accompany the passage of time.

- **INSUFFICIENT_OUTPUT_AMOUNT**: In Uniswap v2 router exact-input swaps, the transaction can revert if output falls below the user's minimum output constraint (`amountOutMinimum`). This attempts to protect the user from drastic and unfavorable price changes while the transaction is pending.

- **Excessive input required**: For exact-output swaps, the swap can revert when the required input exceeds the user's maximum input constraint (`amountInMaximum`). This protects users from unexpectedly spending more than intended if market conditions move before execution.

## How Hooks Customize Swaps in Uniswap v4

Hooks are one of the most important v4 features for swap integrations. They let pool creators and integrators attach custom logic to key lifecycle points (for example, before/after swap), enabling behavior that previously required separate wrappers or bespoke routing layers.

Depending on hook implementation, this can support custom fee logic, dynamic incentives, or other market-specific swap rules, while still settling through Uniswap's shared core accounting model.

In practice, hooks let teams customize how swaps behave at the pool level without replacing Uniswap's core execution and settlement path.

## Where to Go Next

- Build your first swap integration in the [trading guides](/docs/trading/overview).
- Learn LP mechanics in the [liquidity section](/docs/liquidity/overview).
- Explore advanced swap customization with [hooks](/docs/protocols/v4/concepts/hooks).
