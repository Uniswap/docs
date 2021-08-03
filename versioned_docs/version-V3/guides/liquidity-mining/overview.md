---
id: liquidity-mining-overview
title: Overview
sidebar_position: 1
---

## Introduction

As a DeFi project, token creator, or other interested party, you may be wondering what the best ways to _incentivize in-range liquidity provision_ on one or more Uniswap V3 pools are. This guide describes one particular incentivization scheme at a high level, as implemented in [uniswap-v3-staker](https://github.com/Uniswap/uniswap-v3-staker).

## The Setting

Let's start by defining some terms. First, we refer to programs which incentivize liquidity as `Incentive`s. `Incentive`s are characterized by the following parameters:

- `rewardToken`: Perhaps the most important parameter, would-be incentivizers must pick the ERC20 token which they would like to distribute as a reward for providing active liquidity.
- `pool`: The address of the Uniswap V3 pool in which liquidity must be provided.
- `startTime`: The UNIX timestamp at which rewards start to be distributed.
- `endTime`: The UNIX timestamp at which rewards start to decay.
- `refundee`: The address which has the right to reclaim any leftover rewards after the `Incentive` has concluded.

## Staking

So, now that we have an idea of what an `Incentive` looks like, let's try understand how a user might participate. Note that this section requires a basic understanding of how Uniswap V3 position NFTs work.

The first action a user must take in order to begin participating in an `Incentive` is to _deposit_ their position NFT into the [canonical staking contract address](https://github.com/Uniswap/uniswap-v3-staker#deployments), effectively temporarily giving custody over their NFT to this contract. This is necessary because, as we'll see later on, the staking contract needs to be able to guarantee that liquidity cannot be removed from NFTs participating in the program.

Once deposited, a user may then _stake_ their deposited token into any number of active `Incentive`s for the Uniswap V3 pool their NFT is tied to. Note that this can happen atomically with an initial _deposit_. Staked NFTs then immediately start to earn rewards, _as long as the underlying positions are in range_. 

## Reward Math

So, how are rewards actually allocated to staked NFTs? Recall that `Incentive` creators are essentially picking _an amount of `rewardToken`s to distribute per second to in-range LPs_, over some interval. Let's call this value the reward rate. Between `startTime` and `endTime`, the reward rate remains constant, and for every second that goes by, tokens are allocated proportionally _among all in-range liquidity at the time_. Crucially, this counts not just _staked_ liquidity, but _all_ liquidity. So, incentive creators should pick a reward rate that they deem worthwhile to distribute across (potentially) all in-range LPs for the duration of the program.

## Program Conclusion

But what happens if some of the liquidity active during an `Incentive` is not staked? Some `rewardToken`s were set aside for this unstaked liquidity, but they cannot be claimed. This is where the `refundee` comes into play. After a program has concluded, the `refundee` can claim any remaining `rewardToken`s in the contract.

There are two conditions that must be met for a program to be considered concluded:

1. `block.timestamp >= endTime`: In other words, the program must have officially ended.
2. All staked NFTs must be unstaked: After a program ends, _anyone_ may unstake any NFT (claiming their `rewardToken`s for them in the process). This ensures that even if all users do not unstake themselves, someone can unstake them manually so that the `refundee` can claim remaining tokens.

Because of how the rewards algorithm works, stakers who remain in the program after `endTime` may see their rewards either diluted OR marginally augmented, depending on their position's share of the total active liquidity. In the worst case, rewards decay proportionally to the additional time spent staked. For example, at 2x the duration, ½ of rewards could remain, at 3x, ⅓ could remain, etc. While somewhat complex, this behavior can largely be ignored from a game-theoretic standpoint. Stakers should simply attempt to unstake and claim rewards as soon as possible after `endTime`, an outcome that is likely in any case, as `refundee`s will be eager to reclaim leftover rewards, and mass unstake stragglers.