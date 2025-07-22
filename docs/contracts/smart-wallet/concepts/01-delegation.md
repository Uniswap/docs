---
id: delegation
title: Delegation
sidebar_position: 1
---

This contract is meant to be used with [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702): Set Code for EOAs. After the Ethereum Pectra fork, Externally Owned Accounts (EOAs) can now internalize code at a remotely deployed smart contract address. This process is called **delegation.** 

For simplicity, we will refer to these EOAs as *users* and these remote smart contracts as *implementations.* The term *Smart Wallet* will refer to the Uniswap smart wallet product.

Users can only be delegated to one contract at a time but can have other delegations on different chains.

After a user is delegated, they can execute transactions using the logic defined in the contract implementation, enabling advanced features like transaction batching, gas-less transactions, and custom permission controls - all while keeping their original address and on-chain history.