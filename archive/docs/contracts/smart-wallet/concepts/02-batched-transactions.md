---
id: batched-transactions
title: Batched Transactions
sidebar_position: 2
---

Batched transactions are transactions which include one or more actions. For example, approving an ERC20 token and a swap using that token. Our smart wallet natively supports batched transactions, saving users gas and clicks.

Our smart wallet supports simple batched calls as well as [ERC-7821](https://eips.ethereum.org/EIPS/eip-7821): **Minimal Batch Executor Interface**, a standard which increases interoperability between dapps and contract implementations.