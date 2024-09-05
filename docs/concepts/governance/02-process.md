---
id: process
title: Process
---

This document is a living document which represents the current process guidelines for developing and advancing Uniswap Governance Proposals.

## Tools

Several governance venues are available to Uniswap governance, each serving its own particular purpose.

1.  [_Governance Forum_](https://gov.uniswap.org/)

gov.uniswap.org is a Discourse-hosted forum for governance-related discussion. Community members must register for an account before sharing or liking posts. New members are required to enter 4 topics and read 15 posts over the course of 10 minutes before they are permitted to post themselves.

2. [_Snapshot_](https://snapshot.org/#/uniswapgovernance.eth)

Snapshot is a simple voting interface that allows users to signal sentiment off-chain. Votes on snapshot are weighted by the number of UNI delegated to the address used to vote.

3. [_Uniswap Agora_](https://vote.uniswapfoundation.org)

The Uniswap Foundation supports this voting and delegation interface. (Tally)[https://www.tally.xyz/gov/uniswap] is another app that supports proposal creation, delegation, and voting.

Below we outline a preliminary draft for the Uniswap governance process, detailing exactly where these venues fit in. These processes are subject to change according to feedback from the Uniswap community.

## Process
### Phase 1: Request for Comment (RFC)

Timeframe: Minimum 7 days

Form: [Governance Forum](https://gov.uniswap.org/) Post

The first phase of the governance process is meant to allow the community to digest a proposal, comment, and ask questions about a particular proposal.

To post a RFC, label your post “RFC - [Your Title Here]”. Prior to moving to Phase 2, give the community at least 7 days to read and comment on the RFC. Please respond to questions in the comments, and take feedback into account in the next iteration of the proposal posted in Phase 2.

### Phase 2: Temperature Check


Timeframe: 5 days

Quorum: 10M UNI

Form: [Snapshot Poll](https://snapshot.org/#/uniswapgovernance.eth)

The purpose of the Temperature Check is to signal community sentiment on a proposal prior to moving towards an on-chain vote.

To create a Temperature Check:

1. Incorporate the community feedback from the RFC phase into the proposal.

2. Create and post this version of the proposal in the [Governance Forum](https://gov.uniswap.org/) with the title “Temperature Check — [Your Title Here]”. Include a link to the RFC post. You will update the post to include a link to the Snapshot poll after you’ve posted that.

3. Create a [Snapshot poll](https://snapshot.org/#/uniswap). The voting options should consist of those which have gained support in the RFC Phase. This poll can be either binary or multiple choice but must include a “No change” option. Set the poll duration to 5 days. Include a link to the Forum Temperature Check post.

4. Update the Forum post with a link to the Snapshot Poll.

At the end of 5 days, the option with the majority of votes wins. There must be at least 10M UNI yes votes to move onto Phase 3. If the “No change” option wins, the proposal will not move onto the Phase 3.

### Phase 3: Governance Proposal

Timeframe: 2 day waiting period, 7 day voting period, 2 day timelock

Threshold: 40M UNI

Form: [Governance Proposal](https://app.uniswap.org/#/vote)

Phase 3 is the final step of the governance process. If this vote passes, then a change will be enacted on-chain.

To create an on-chain Governance Proposal:

1. Incorporate any last iterations to your proposal based on feedback prior to posting.

2. Create a topic in the [Governance Forum](https://gov.uniswap.org/) titled "Governance Proposal — [Your Title Here]" and link to previous forum posts and the Temperature Check Snapshot poll.

3. Create your proposal. This can be done either through an interface (e.g. [vote.uniswapfoundation.org](vote.uniswapfoundation.org)) or through writing the calldata for more complicated proposal logic. This calldata will be executed if and when the proposal passes. If writing the calldata yourself, please review the logic with a qualified Uniswap community member prior to posting the proposal.

4. Ensure that at least 1 million UNI is delegated to your address in order to submit a proposal, or find a delegate who has enough delegated UNI to meet the proposal threshold to propose on your behalf.

5. Once the proposal has been submitted (or the propose() function has been called), a two day voting delay will start. After the voting delay finishes, a seven day voting period begins. If the proposal passes, a two day timelock will follow before the proposed code can be executed.

## Changes to the Governance Process

Timeframe: 7 days

Threshold: 40M UNI

Form: [Snapshot Poll](https://snapshot.org/#/uniswap)

In the future, the community governance process above may need to undergo additional changes to continue to meet the needs of the Uniswap community. While an on-chain vote is not required to change the majority of this process, a clear display of community support and acceptance is important for process changes to have legitimacy.

Thus, changes to all off-chain community governance processes should be voted on through an off-chain Snapshot vote. There should be a 7-day voting period and 40M UNI quorum.

## Governance Glossary

- **UNI:** An ERC-20 token that designates the weight of a user's voting rights. The more UNI a user has in their wallet, the more weight their delegation or vote on a proposal holds.

- **Delegation:** UNI holders cannot vote or create proposals until they delegate their voting rights to an address. Delegation can be given to one address at a time, including the holder's own address. Note that delegation does not lock tokens; it simply adds votes to the chosen delegation address.

- **Proposal:** A proposal is executable code that modifies the governance contract or treasury and how they work. To create a proposal, a user must have at least 0.25% (2.5M UNI) of all UNI delegated to their address. Proposals are stored in the "proposals" mapping of the Governor smart contract. All proposals are subject to a 7-day voting period. If the proposer does not maintain their vote weight balance throughout the voting period, anyone may cancel the proposal.

- **Quorum:** In order for a vote to pass, it must achieve quorum of 4% of all UNI (40M) voting `yes`. The purpose of the quorum is to ensure that the only measures that pass have adequate voter participation.

- **Voting:** Users can vote for or against single proposals once they have voting rights delegated to their address. Votes can be cast while a proposal is in the "Active" state. Votes can be submitted immediately using "castVote" or submitted later with "castVoteBySig" (For more info on castVoteBySig and offline signatures, see EIP-712). If the majority of votes (and a 4% quorum of UNI) vote for a proposal, the proposal may be queued in the Timelock.

- **Voting Period:** Once a proposal has been created, Uniswap community members will have a seven day period (the Voting Period) to cast their votes.

- **Timelock:** All governance and other administrative actions are required to sit in the Timelock for a minimum of 2 days, after which they can be implemented.
