---
id: glossary
title: Glossary
---

- **UNI:** An ERC-20 token that designates the weight of a user&#39;s voting rights. The more UNI a user has in their wallet, the more weight their delegation or vote on a proposal holds.

- **Delegation:** UNI holders cannot vote or create proposals until they delegate their voting rights to an address. Delegation can be given to one address at a time, including the holder&#39;s own address. Note that delegation does not lock tokens; it simply adds votes to the chosen delegation address.

- **Proposal:** A proposal is executable code that modifies the governance contract or treasury and how they work. In order to create a proposal, a user must have at least 0.25% (2.5M UNI) of all UNI delegated to their address. Proposals are stored in the &quot;proposals&quot; mapping of the Governor smart contract. All proposals are subject to a 7-day voting period. If the proposer does not maintain their vote weight balance throughout the voting period, the proposal may be canceled by anyone.

- **Quorum:** In order for a vote to pass, it must achieve quorum of 4% of all UNI (40M) voting in the affirmative. The purpose of the quorum is to ensure that the only measures that pass have adequate voter participation.

- **Voting:** Users can vote for or against single proposals once they have voting rights delegated to their address. Votes can be cast while a proposal is in the &quot;Active&quot; state. Votes can be submitted immediately using &quot;castVote&quot; or submitted later with &quot;castVoteBySig&quot; (For more info on castVoteBySig and offline signatures, see EIP-712). If the majority of votes (and a 4% quorum of UNI) vote for a proposal, the proposal may be queued in the Timelock.

- **Voting Period:** Once a proposal has been put forward, Uniswap community members will have a seven day period (the Voting Period) to cast their votes.

- **Timelock:** All governance and other administrative actions are required to sit in the Timelock for a minimum of 2 days, after which they can be implemented.
