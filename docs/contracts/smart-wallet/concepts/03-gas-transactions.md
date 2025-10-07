---
id: gas-abstraction
title: Gas Abstraction
sidebar_position: 3
---

Gas abstraction allows users to transact without needing to have a balance of ETH to pay for gas fees. Instead, a third party called a [bundler](https://www.alchemy.com/overviews/what-is-a-bundler) can cover or manage those fees on their behalf.

Our smart wallet implements [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337): **Account Abstraction Using Alt Mempool**, a widely adopted standard within the industry.

By default, EntryPoint v0.8 (0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108) is enabled on the account. This can be disabled or changed by the root signer - please exercise caution as this can lead to a loss of funds. 

You can view details about the deployment of the EntryPoint contract [here](https://github.com/eth-infinitism/account-abstraction/releases). It is considered a public good deployed by the community.