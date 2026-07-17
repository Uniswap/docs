---
id: overview
title: Overview
sidebar_position: 1
---

## Introduction

As a DeFi project, token creator, or other interested party, you may want to _incentivize in-range liquidity provision_ on a Uniswap V3 pool. This guide describes one particular incentivization scheme at a high level, as implemented in [uniswap-v3-staker](https://github.com/Uniswap/uniswap-v3-staker).

## The Setting

Let's start by defining some terms. We refer to programs which incentivize liquidity as `Incentive`s; they're characterized by the following parameters:

- `rewardToken`: Perhaps the most important parameter, would-be incentivizers must pick the ERC20 token which they would like to distribute as a reward for providing liquidity.
- `pool`: The address of the Uniswap V3 pool in which liquidity must be provided.
- `startTime`: The UNIX timestamp at which rewards start to be distributed.
- `endTime`: The UNIX timestamp at which rewards start to decay.
- `refundee`: The address which has the right to reclaim any leftover rewards after the `Incentive` has concluded.

Finally, every `Incentive` has an associated `reward`, the total amount of `rewardToken`s that are allocated to be distributed over the lifecycle of the program.

## Reward Math

Now that we have an idea of what an `Incentive` looks like, let's explore how rewards are actually allocated to participants. The next section will touch on the participation mechanics, so for now let's abstract this away and just focus on the high-level design.

Recall that `Incentive` creators pick a `reward` amount and a program duration. This directly corresponds to picking _an amount of `rewardToken`s to distribute per second_; let's call this the reward rate. So, for every second between `startTime` and `endTime`, a constant amount of tokens are distributed proportionally _among all in-range liquidity at that second_. Crucially, this counts _all_ liquidity, not just liquidity that opts in to participating in the program. So, incentive creators should pick a reward rate that they deem worthwhile to distribute across (potentially) all in-range LPs for the duration of the program.

## Staking

So, how do users participate in these programs? Note that this section requires a basic understanding of [how Uniswap V3 position NFTs work](../../reference/periphery/NonfungiblePositionManager)

The first action a user must take in order to begin participating in an `Incentive` is to _deposit_ their position NFT into the [canonical staking contract address](https://github.com/Uniswap/uniswap-v3-staker#deployments), effectively temporarily giving custody over their NFT to this contract. This is necessary because, as we'll see later on, the staking contract needs to be able to guarantee that liquidity cannot be removed from NFTs participating in the program.

Once deposited, a user may then _stake_ their NFT into any number of active `Incentive`s for the Uniswap V3 pool their NFT is tied to (note that this can happen atomically with an initial _deposit_). Staked NFTs then immediately start to earn rewards, according to the algorithm outlined above. Users may periodically claim accrued `rewardToken`s while the program is ongoing, or wait to claim until the program has concluded to minimize overhead.

## Program Conclusion

There are two conditions that must be met for a program to be considered concluded:

1. `block.timestamp >= endTime`: In other words, the program's duration must have expired. However, this doesn't mark the official end of the program, as some users may still be participating right up until this `endTime` boundary and beyond, to maximize their rewards. This leads directly to the second condition.
2. All NFTs must be unstaked: A program can conclude only when every NFT which participated in it is unstaked. To ensure this is always possible, after the `endTime` of a program _anyone_ may unstake _any_ NFT (though of course they may not claim outstanding `rewardToken`s due to the NFT owner). This ensures that even if all users do not unstake themselves, someone can unstake them manually so that the program can end.

It's important that most or all programs fully conclude, primarily so that the `refundee` can reclaim any unallocated rewards. What are the conditions under which unallocated rewards will remain? Well, recall that the reward rate is the same across _all_ in-range liquidity. However, only program participants may actually claim accrued tokens, so it's likely that all programs will end up with a balance of `rewardToken`s that cannot be claimed. So, `refundee`s will typically be incentivized to bring programs to an official conclusion. This slightly cumbersome design is a consequence of the difficulty of consistently allocating rewards proportional to Uniswap V3 liquidity.

A final note: stakers who remain in the program after `endTime` may actually see their rewards marginally augmented or (more likely) gradually diluted. The magnitude of these changes depend on stakers' share of the total active liquidity, the time spend staked after `endTime`, and the sequence of unstaking. In the worst case, rewards decay proportionally to the duration. For example, at 2x the duration, ½ of rewards could remain, at 3x, ⅓ could remain, etc. While somewhat complex, this behavior can largely be ignored from a game-theoretic standpoint. Stakers should simply attempt to unstake and claim rewards as soon as possible after `endTime`, an outcome that is likely in any case, as `refundee`s will be eager to reclaim leftover rewards, and mass unstake stragglers.
