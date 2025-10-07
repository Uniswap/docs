---
id: overview
title: Overview
sidebar_position: 1
---

The `UniversalRouter` is an ETH and ERC20 swap router, designed to aggregate trades across Uniswap protocols (including v2, v3, and v4) and provide users with highly flexible and composable transactions. The contract is unowned and non-upgradeable.

The flexible command-based architecture enables:

- Splitting and interleaving of Uniswap v2/v3/v4 swaps
- Partial fills of trades
- Wrapping and unwrapping of ETH (via WETH)
- Time-bound, signature-controlled token approvals using [Permit2](../permit2/overview.md)
- v3 and v4 position manager interactions (e.g., permit, liquidity modification, pool initialization)
- Sub-plan execution and balance checks

Transactions are encoded as a sequence of byte-sized commands, each with structured inputs. These commands can be chained within a single transaction to express highly customized workflows, including multi-hop swaps, liquidity migration from v3 to v4, and complex value routing—all without the need for prior token approvals.

> **Note:** The `UniversalRouter` integrates with `Permit2` to eliminate the need for direct token approvals. See the [Permit2 documentation](../permit2/overview.md) for details.

## Resources

- [UniversalRouter GitHub Repository](https://github.com/Uniswap/universal-router)