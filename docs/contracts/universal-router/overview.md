---
id: overview
title: Overview
sidebar_position: 1
---

The `UniversalRouter` is an ETH, ERC20, and NFT swap router, that can aggregate trades across protocols to give users access highly-flexible and personalised transactions. The contract is unowned, and is not upgradeable.

The flexible command style allows us to provide users with:

- Splitting and interleaving of Uniswap trades
- Purchases of NFTs across 8 marketplaces
- Partial fills of trades
- Wrapping and Unwrapping of ETH
- Time-bound, signature controlled token approvals using [Permit2]()

Transactions are encoded using a string of commands, allowing users to have maximum flexibility over what they want to perform. With all of these features available in a single transaction, the possibilities available to users are endless.

*Note: The `UniversalRouter` uses `Permit2` to remove the need for token approvals being provided directly to the `UniversalRouter`. The `Permit2` documentation can be found [here]().*
