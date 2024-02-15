---
id: process
title: Process
---

This document is a living document which represents the current process guidelines for developing and advancing Uniswap Governance Proposals.

## Process

Several governance venues are available to Uniswap governance, each serving its own particular purpose.

1. [_gov.uniswap.org_](https://gov.uniswap.org/)

gov.uniswap.org is a Discourse-hosted forum for governance-related discussion. Community members must register for an account before sharing or liking posts. New members are required to enter 4 topics and read 15 posts over the course of 10 minutes before they are permitted to post themselves.

2. [_Snapshot_](https://snapshot.org/#/uniswap)

Snapshot is a simple voting interface that allows users to signal sentiment off-chain. Votes on snapshot are weighted by the number of UNI delegated to the address used to vote.

3. [_Governance Portal_](https://app.uniswap.org/#/vote)

The formal governance portal can be accessed directly through the Uniswap app interface. Votes are delegated and cast through the portal.

Below we outline a preliminary draft for the Uniswap governance process, detailing exactly where these venues fit in. These processes are subject to change according to feedback from the Uniswap community.

### Phase 1: Temperature Check — Discourse/Snapshot

The purpose of the Temperature Check is to determine if there is sufficient will to make changes to the status quo.

To create a Temperature Check:

1. Ask a general, non-biased question to the community on gov.uniswap.org about a potential change (example: &quot;Should Uniswap governance add liquidity mining for XYZ token?&quot;). Forum posts should be labeled as follows: &quot;Temperature Check - [Your Title Here]&quot;. The forum post should include a link to the associated Snapshot poll.

1. Voters use Snapshot to indicate their interest in bringing it forward to the next stage. Snapshot poll lengths should be set to 2 days.

That&#39;s it! You&#39;ve just started the process of gaining support for a proposal. At the end of the 2 days, a majority vote with a 25k UNI yes-vote threshold wins.

If the Temperature check does not suggest a change from the status quo, the topic will be closed on the governance site. If the Temperature Check does suggest a change, proceed to Stage 2: Consensus Check.

### Phase 2: Consensus Check — Discourse/Snapshot

The purpose of the Consensus Check is to establish formal discussion around a potential proposal.

To create a Consensus Check:

1. Use feedback from the Temperature Check post and create a new Snapshot poll which covers the options which have gained support. This poll can either be binary or multiple choice but you are required to include the option &quot;Make no change&quot; or its equivalent. Set the poll duration to 5 days.

1. Create a new topic in the Proposal Discussion category on gov.uniswap.org titled &quot;Consensus Check — [Your Title Here]&quot;. This will alert the community that this topic has already passed Temperature Check. Any topics beginning with Consensus Check that have not passed Temperature Check will immediately be removed by moderators. Make sure that the discussion thread links to the new Snapshot poll and the Temperature Check thread.

1. Reach out to your network to build support for the proposal. Discuss the proposal and actively solicit delegates to vote on it. Be willing to respond to questions on the Consensus Check topic. Share your view point, although try to remain as impartial as possible.

At the end of 5 days, whichever option has the majority of votes wins, and can be included in a governance proposal for Stage 3. A 50k UNI yes-vote quorum is required for the Consensus Check to pass.

If the option &quot;Make no change&quot; wins, the Consensus Check topic will be closed by the moderators.

### Phase 3: Governance Proposal — Governance Portal

Phase 3 — Governance Proposal — is the final step of the governance process. The proposal should be based on the winning outcome from the Consensus Check and can consist of one or multiple actions, up to a maximum of 10 actions per proposal.

To create a Governance Proposal:

1. Write the code for your proposal, which will be voted on through the Governance Portal. More resources can be found [here](https://compound.finance/docs/governance#propose) **.** All proposed code should be audited by a professional auditor. This auditing process may be paid or reimbursed by the community treasury.

1. Ensure that you have at least 2.5 million UNI delegated to your address in order to submit a proposal, or find someone who has enough UNI to meet the proposal threshold to propose on your behalf.

1. Create a topic in the Proposal Discussion category on gov.uniswap.org titled &quot;Governance Proposal — [Your Title Here]&quot; and link to any relevant Snapshot polls/discussion threads as well as the code audit report. Topics that begin with &quot;Governance Proposal&quot; that have not successfully passed through the Temperature Check and Consensus Check stages will be removed by moderators.

1. Call the propose() function of the Governor Bravo to deploy your proposal.

Once the propose() function has been called, a two day voting delay will start. After voting delay is finished a seven day voting period begins. Ongoing discussion can take place in the gov.uniswap.org forum. If the proposal passes successfully, a two day timelock will follow before the proposed code is executed.

## Soft governance

The process described above lays out a structure for those wishing to host a formal vote around a particular issue.

However, governing this system also requires a degree of &quot;meta governance&quot;, discussions that inform the direction of and the implementation processes behind policy but which don&#39;t qualify as policy themselves.

The community may discuss new ideas and strategies for governance — including changes to the three-step process outlined above — in the &quot;Governance-Meta&quot; category. On-chain voting is not necessary to make updates to off-chain processes.

## Governance Glossary

- **UNI:** An ERC-20 token that designates the weight of a user&#39;s voting rights. The more UNI a user has in their wallet, the more weight their delegation or vote on a proposal holds.

- **Delegation:** UNI holders cannot vote or create proposals until they delegate their voting rights to an address. Delegation can be given to one address at a time, including the holder&#39;s own address. Note that delegation does not lock tokens; it simply adds votes to the chosen delegation address.

- **Proposal:** A proposal is executable code that modifies the governance contract or treasury and how they work. In order to create a proposal, a user must have at least 0.25% (2.5M UNI) of all UNI delegated to their address. Proposals are stored in the &quot;proposals&quot; mapping of the Governor smart contract. All proposals are subject to a 7-day voting period. If the proposer does not maintain their vote weight balance throughout the voting period, the proposal may be canceled by anyone.

- **Quorum:** In order for a vote to pass, it must achieve quorum of 4% of all UNI (40M) voting in the affirmative. The purpose of the quorum is to ensure that the only measures that pass have adequate voter participation.

- **Voting:** Users can vote for or against single proposals once they have voting rights delegated to their address. Votes can be cast while a proposal is in the &quot;Active&quot; state. Votes can be submitted immediately using &quot;castVote&quot; or submitted later with &quot;castVoteBySig&quot; (For more info on castVoteBySig and offline signatures, see EIP-712). If the majority of votes (and a 4% quorum of UNI) vote for a proposal, the proposal may be queued in the Timelock.

- **Voting Period:** Once a proposal has been put forward, Uniswap community members will have a seven day period (the Voting Period) to cast their votes.

- **Timelock:** All governance and other administrative actions are required to sit in the Timelock for a minimum of 2 days, after which they can be implemented.
