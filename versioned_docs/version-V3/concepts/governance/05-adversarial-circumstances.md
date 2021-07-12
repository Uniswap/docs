---
id: adversarial-circumstances
title: Adversarial Circumstances
tags: goveranance, documentation
---

This document explores some adversarial circumstances which Uniswap Governance may encounter in the future. Its goal is to help those interested in Uniswap Governance understand the reasoning behind some of its design, its limitations, and potential avenues for growth.

# Scenario 1

A good faith proposal is brought to vote but is found to have an exploitable edge case. A bad faith actor uses a series of DeFi leveraging strategies to quickly buy enough UNI during the voting period to sway the vote in favor of the proposal, passing it and exploiting the vulnerability.

## Circumvention

UNI voting power must be delegated to an address either entirely before a proposal has been submitted or during the proposal delay period. For now, the proposal delay is set to one block, which is about 15 seconds. A proposal delay of one block leaves no opportunity for a third party to find an exploitable edge case and opportunistically purchase uni, self delegate and sway the vote.

In the future, Uniswap Governance may vote to increase the proposal delay. While there are obvious benefits to an increased proposal delay, It may introduce some potential adverse outcomes such as opportunistic edge case exploitation.

# Scenario 2

A bad faith proposal is crafted and submitted to vote, which is unambiguously not in the best interest of Uniswap Governance. Multiple parties collude ahead of time to corner the UNI market to force the proposal through, gain access to the UNI reserves, and drain the funds.

## Circumvention

Since UNI is a freely tradable asset, anyone can attempt a governance takeover via market buying. That said, to force-pass a bad faith vote would require a minimum of 40 million UNI. If not outright impossible, this amount would be prohibitively expensive and likely cost more when accounting for price fluctuation than the net gain from the attack.

If a group somehow achieved a bad faith takeover, Timelock's delay would give affected agents time to withdraw their assets from the protocol. This would also be an opportunity to fork the protocol, a path that would likely be taken by the remaining good-faith actors.

# Scenario 3

A single party uses a flash loan to push through a proposal, potentially creating a pseudo-DDOS attack by spamming governance with proposals and preventing effective use.

## Circumvention

A delegated balance of 10 million UNI is required to submit a vote, but the balance check is set exactly one block in the past. This prevents any flash loan proposals from being created, as flash loans cannot execute outside of a single block.

The proposer must also maintain a minimum balance of 10 million UNI throughout the voting period, or anyone may cancel the proposal. This balance maintenance check prevents many highly leveraged proposal techniques that may span several blocks.

# Scenario 4

A bad faith proposal is created, which will genuinely incentivize bad faith voting.

Exmaple: &quot;The treasury will be drained. Any votes in favor will be sent the balance of the treasury. Any votes opposed will be locked from the funds of the treasury.&quot;

## Circumvention

No mechanism explicitly prevents this type of scenario, but market forces disincentivize it.

Because the treasury is comprised of UNI tokens exclusively, the market would react appropriately if a vote were to pass that would jeopardize the economic viability of Uniswap Governance and the UNI token. By the time the vote would pass, UNI's price would have fallen so low as to make the attack fruitless.

UNI acting as the only asset of the governance treasury disincentivizes this form of bad faith voting. Uniswap Governance may choose in the future to diversify governance assets. While there are many benefits to this path, some fringe possibilities such as incentivized bad faith voting may appear.
