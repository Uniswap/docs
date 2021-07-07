---
id: security
title: Security
tags: advanced-topics, documentation
---

# Audit & Formal Verification

Between January 8 and April 30, a team of six engineers reviewed and formally verified crucial components of the smart contracts for Uniswap V2.

Their past work includes smart contract development on and formal verification of multi-collateral DAI.

The scope of work includes:

- Formal verification of the core smart contracts
- Code review of core smart contracts
- Numerical error analysis
- Code review of periphery smart contracts (during ongoing development)

The report also has a "Design Comments" section that we highly recommend for gaining a deep technical understanding of some one the choices made in Uniswap V2.

> [Read the report](https://uniswap.org/audit.html)

# Bug Bounty

Uniswap has an open and ongoing bug [bounty program](https://uniswap.org/bug-bounty/).

# Considerations when building on Uniswap

When integrating Uniswap V2 into another on-chain system, particular care must be taken to avoid security vulnerabilities, avenues for manipulations, and the potential loss of funds.

As a preliminary note: smart contract integrations can happen at two levels: directly with [Pair](../../reference/smart-contracts/pair) contracts, or through the [Router](../../reference/smart-contracts/router-02). Direct interactions offer maximal flexibility but require the most work to get right. Mediated interactions offer more limited capabilities but stronger safety guarantees.

There are two primary categories of risk associated with Uniswap V2. The first involves so-called "static" errors. These can include sending too many tokens to a pair during a swap (or requesting too few tokens back) or allowing transactions to linger in the mempool long enough for the sender's expectations about prices to no longer be accurate.

One may address these errors with fairly straightforward logic checks. Executing these logic checks is the primary purpose of routers. Those who interact directly with pairs must perform these checks themselves (with the help of the [Library](../../reference/smart-contracts/library).

"Dynamic" risk, the second category, involves runtime pricing. Because Ethereum transactions occur in an adversarial environment, naively written smart contracts can, and will, be exploited for profit. For example, suppose a smart contract checks the asset ratio in a Uniswap pool at runtime and trades against it, assuming that the ratio represents the "fair" or "market" price of these assets. In that case, it is highly vulnerable to manipulation. A malicious actor could, e.g., trivially insert transactions before and after the naive transaction (a so-called "sandwich" attack), causing the smart contract to trade at a radically worse price, profit from this at the trader's expense, and then return the contracts to their original state, all at a low cost. (One important caveat is that these types of attacks are mitigated by trading in highly liquid pools, or at low values.)

The best way to protect against these attacks is to introduce a price oracle. An oracle is any device that returns desired information, in this case, a pair's spot price. The best "oracle" is simply a traders' off-chain observation of the prevailing price, which can be passed into the trade as a safety check. This strategy is best suited to retail trading venues where users initiate transactions on their own behalf. However, it is often the case that a trusted price observation is not available (e.g., in multi-step, programmatic interactions involving Uniswap). Without a price oracle, these interactions will be forced to trade at whatever the (potentially manipulated) rate on Uniswap is. For details on the Uniswap V2 approach to oracles, see [Oracles](../core-concepts/oracles).
