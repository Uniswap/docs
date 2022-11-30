---
id: overview
title: Overview
---

> The updated reference for the newly deployed Governor Bravo is available via [Etherscan](https://etherscan.io/address/0x408ED6354d4973f66138C91495F2f2FCbd8724C3), some of the reference material below may be out of date.

The Uniswap protocol is governed and upgraded by UNI token holders, using three distinct components; the UNI token, governance module, and Timelock. Together, these contracts allow the community to propose, vote, and implement changes to the uniswap protocol.

Any addresses with more than 2.5M UNI (0.25% of total supply) delegated to it may propose governance actions, which contain finished, executable code. When a proposal is created, the community can cast their votes during a 7 day voting period. If there are more 'For' votes than 'Against' (i.e. a simple majority), and the number of 'For' votes >40M (meeting the quorum), it is queued in the Timelock, and may be executed in a minimum of 2 days.

## Timelock

The Timelock contract can modify system parameters, logic, and contracts in a 'time-delayed, opt-out' upgrade pattern. Timelock has a hard-coded minimum delay of 2 days, which is the least amount of notice possible for a governance action. Each proposed action will be published at a minimum of 2 days in the future from the time of announcement. Major upgrades, such as changing the risk system, may have up to a 30 day delay. Timelock is controlled by the governance module; pending and completed governance actions can be monitored on the Timelock Dashboard.

![](./images/gov_diagram-1.png)

# Key Events

## DelegateChanged

```solidity
DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)
```

Emitted when an account changes its delegate.

## DelegateVotesChanged

```solidity
DelegateVotesChanged(address indexed delegate, uint previousBalance, uint newBalance)
```

Emitted when a delegate account's vote balance changes.

## ProposalCreated

```solidity
ProposalCreated(uint id, address proposer, address[] targets, uint[] values, string[] signatures, bytes[] calldatas, uint startBlock, uint endBlock, string description)
```

Emitted when a new proposal is created.

## VoteCast

```solidity
VoteCast(address voter, uint proposalId, bool support, uint votes)
```

Emitted when a vote has been cast on a proposal.

## ProposalCanceled

```solidity
ProposalCanceled(uint id)
```

Emitted when a proposal has been canceled.

## ProposalQueued

```solidity
ProposalQueued(uint id, uint eta)
```

Emitted when a proposal has been queued in the Timelock.

## ProposalExecuted

```solidity
ProposalExecuted(uint id)
```

Emitted when a proposal has been executed in the Timelock.

# Read-Only Functions: UNI

## Get Current Votes

```solidity
function getCurrentVotes(address account) returns (uint96)
```

Returns the balance of votes for an account as of the current block.

| Name    | Type      |                                                                  |
| :------ | :-------- | :--------------------------------------------------------------- |
| account | `address` | Address of the account of which to retrieve the number of votes. |

## Get Prior Votes

```solidity
function getPriorVotes(address account, uint blockNumber) returns (uint96)
```

Returns the prior number of votes for an account at a specific block number. The block number passed must be a finalized block or the function will revert.

| Name        | Type      |                                                                        |
| :---------- | :-------- | :--------------------------------------------------------------------- |
| account     | `address` | Address of the account of which to retrieve the prior number of votes. |
| blocknumber | `uint`    | The block number at which to retrieve the prior number of votes.       |
|             |           |                                                                        |
| unnamed     | `uint96`  | The number of prior votes                                              |

# State-Changing Functions: UNI

## Delegate

```solidity
function delegate(address delegatee)
```

Delegate votes from the sender to the delegatee. Users can delegate to 1 address at a time, and the number of votes added to the delegatee’s vote count is equivalent to the balance of UNI in the user’s account. Votes are delegated from the current block and onward, until the sender delegates again, or transfers their UNI.

| Name      | Type      |                                                                    |
| :-------- | :-------- | :----------------------------------------------------------------- |
| delegatee | `address` | The address to which msg.sender wishes to delegate their votes to. |

## Delegate By Signature

```solidity
function delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s)
```

Delegate votes from the sender to the delegatee. Users can delegate to 1 address at a time, and the number of votes added to the delegatee’s vote count is equivalent to the balance of UNI in the user’s account. Votes are delegated from the current block and onward, until the sender delegates again, or transfers their UNI.

| Name      | Type      |                                                                                                                     |
| :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------ |
| delegatee | `address` | The address to which msg.sender wishis to delegate their vote to                                                    |
| nonce     | `uint`    | The contract state required to match the signature. This can be retrieved from the contract’s public nonces mapping |
| expiry    | `uint`    | The time when the signature expires. A block timestamp in seconds since the unix epoch.                             |
| v         | `uint`    | The recovery byte of the signature.                                                                                 |
| r         | `bytes32` | Half of the ECDSA signature pair.                                                                                   |
| s         | `bytes32` | Half of the ECDSA signature pair.                                                                                   |

# Read-Only Functions: Governor Alpha

## Quorum Votes

```solidity
function quorumVotes() public pure returns (uint)
```

Returns the minimum number of votes required for a proposal to succeed.

## Proposal Threshold

```solidity
function proposalThreshold() returns (uint)
```

Returns the minimum number of votes required for an account to create a proposal.

## Proposal Max Operations

```solidity
function proposalMaxOperations() returns (uint)
```

Returns the maximum number of actions that can be included in a proposal. Actions are functions calls that will be made when a proposal succeeds and executes.

## Voting Delay

```solidity
function votingDelay() returns (uint)
```

Returns the number of blocks to wait before voting on a proposal may begin. This value is added to the current block number when a proposal is created.

## Voting Period

```solidity
function votingPeriod() returns (uint)
```

Returns the duration of voting on a proposal, in blocks.

## Get Actions

```solidity
function getActions(uint proposalId) returns (uint proposalId) public view returns (address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas)
```

Gets the actions of a selected proposal. Pass a proposal ID and get the targets, values, signatures and calldatas of that proposal.

| Name       | Type   |                    |
| :--------- | :----- | :----------------- |
| proposalId | `uint` | ID of the proposal |

Returns:

- Array of addresses of contracts the proposal calls.
- Array of unsigned integers the proposal uses as values.
- Array of strings of the proposal’s signatures.
- Array of calldata bytes of the proposal.

## Get Receipt

```solidity
function getReceipt(uint proposalId, address voter) returns (Receipt memory)
```

Returns a proposal ballot receipt of a given voter.

| Name       | Type      |                                                              |
| :--------- | :-------- | :----------------------------------------------------------- |
| proposalId | `uint`    | ID of the proposal in which to get a voter’s ballot receipt. |
| voter      | `address` | Address of the account of a proposal voter.                  |
|            |           |                                                              |
| Receipt    | `struct`  | A Receipt struct for the ballot of the voter address.        |

## State

```solidity
function state(uint proposalId) returns (ProposalState)
```

Returns enum of type ProposalState, possible types are:
- Pending
- Active
- Canceled
- Defeated
- Succeeded
- Queued
- Expired
- Executed

| Name       | Type   |                    |
| :--------- | :----- | :----------------- |
| proposalId | `uint` | ID of the proposal |

# State-Changing Functions: Governor Alpha

## Propose

```solidity
function propose(address[] memory targets, uint[] memory values, string[] memory signatures, bytes[] memory calldatas, string memory description) returns (uint)
```

Creates a Proposal to change the protocol.

Proposals will be voted on by delegated voters. If there is sufficient support before the voting period ends, the proposal shall be automatically enacted. Enacted proposals are queued and executed in the Timelock contract.

The sender must hold more UNI than the current proposal threshold (proposalThreshold()) as of the immediately previous block. The proposal can have up to 10 actions (based on proposalMaxOperations()).

The proposer cannot create another proposal if they currently have a pending or active proposal. It is not possible to queue two identical actions in the same block (due to a restriction in the Timelock), therefore actions in a single proposal must be unique, and unique proposals that share an identical action must be queued in different blocks.

| Name        | Type      |                                                                                                                                                                                         |
| :---------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| targets     | `address` | The ordered list of target addresses for calls to be made during proposal execution. This array must be the same length as all other array parameters in this function.                 |
| values      | `uint`    | The ordered list of values (i.e. msg.value) to be passed to the calls made during proposal execution. This array must be the same length as all other array parameters in this function |
| signatures  | `string`  | The ordered list of function signatures to be passed during execution. This array must be the same length as all other array parameters in this function.                               |
| calldatas   | `bytes`   | The ordered list of data to be passed to each individual function call during proposal execution. This array must be the same length as all other array parameters in this function.    |
| description | `string`  | A human readable description of the proposal and the changes it will enact.                                                                                                             |
|             |           |                                                                                                                                                                                         |
| Unnamed     | `uint`    | Returns ID of the new proposal                                                                                                                                                          |

## Queue

```solidity
function queue(uint proposalId)
```

After a proposal has succeeded, any address can call the queue method to move the proposal into the Timelock queue. A proposal can only be queued if it has succeeded.

| Name       | Type   |                                   |
| :--------- | :----- | :-------------------------------- |
| proposalId | `uint` | ID of a given successful proposal |

## Execute

```solidity
function execute(uint proposalId) payable
```

After the Timelock delay period, any account may invoke the execute method to apply the changes from the proposal to the target contracts. This will invoke each of the actions described in the proposal.
This function is payable so the Timelock contract can invoke payable functions that were selected in the proposal.

| Name       | Type   |                                   |
| :--------- | :----- | :-------------------------------- |
| proposalId | `uint` | ID of a given successful proposal |

## Cancel

```solidity
function cancel(uint proposalId)
```

Cancel a proposal that has not yet been executed. The Guardian is the only one who may execute this unless the proposer does not maintain the delegates required to create a proposal. If the proposer does not have more delegates than the proposal threshold, anyone can cancel the proposal.

| Name       | Type   |                            |
| :--------- | :----- | :------------------------- |
| proposalId | `uint` | ID of a proposal to cancel |

## Cast Vote

```solidity
function castVote(uint proposalId, bool support)
```

Cast a vote on a proposal. The account's voting weight is determined by it's number of delegated votes at the time the proposal becomes active.

| Name       | Type   |                                                                     |
| :--------- | :----- | :------------------------------------------------------------------ |
| proposalId | `uint` | ID of a given successful proposal                                   |
| support    | `bool` | A boolean of true for 'yes' or false for 'no' on the proposal vote. |

## Cast Vote By Signature

```solidity
function castVoteBySig(uint proposalId, bool support, uint8 v, bytes32 r, bytes32 s)
```

Cast a vote on a proposal. The account's voting weight is determined by its number of delegated votes at the time the proposal became active. This method has the same purpose as Cast Vote, but instead enables offline signatures to participate in governance voting. For more details on how to create an offline signature, review EIP-712.

| Name       | Type      |                                                                                         |
| :--------- | :-------- | :-------------------------------------------------------------------------------------- |
| proposalId | `uint`    | ID of a given successful proposal                                                       |
| support    | `bool`    | A boolean of true for 'yes' or false for 'no' on the proposal vote.                     |
| expiry     | `uint`    | The time when the signature expires. A block timestamp in seconds since the unix epoch. |
| v          | `uint`    | The recovery byte of the signature.                                                     |
| r          | `bytes32` | Half of the ECDSA signature pair.                                                       |
| s          | `bytes32` | Half of the ECDSA signature pair.                                                       |
