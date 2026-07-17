---
title: Overview
description: Learn how Uniswap Universal Router composes v2, v3, and v4 swaps with Permit2-based approvals in one transaction.
---

The `UniversalRouter` is an ETH and ERC20 swap router that aggregates trades across Uniswap v2, v3, and v4. It is unowned and non-upgradeable.

Its command-based architecture supports:

- Splitting and interleaving of Uniswap v2/v3/v4 swaps
- Partial fills of trades
- Wrapping and unwrapping of ETH (via WETH)
- Time-bound, signature-controlled token approvals using [Permit2](/docs/protocols/permit2/overview)
- v3 and v4 position manager interactions (e.g., permit, liquidity modification, pool initialization)
- Sub-plan execution and balance checks

Transactions are encoded as a sequence of byte-sized commands, each with structured inputs. These commands can be chained in one transaction to express custom workflows, including multi-hop swaps and liquidity migration from v3 to v4.

## How It Works

You call `execute(...)` with a `commands` byte string and a parallel `inputs` array. The router processes each command in order and routes execution to the corresponding module. This lets you combine swap, payment, approval, and position-manager actions without splitting logic across multiple transactions.

## Permit2 Integration

`UniversalRouter` integrates with `Permit2`, so token transfer permissions can be provided by signature. This reduces repeated approval flows and enables more composable routing plans.

See [Permit2 documentation](/docs/protocols/permit2/overview) for allowance and signature-transfer patterns.

## Where to Go Next

- Review command encoding in [Universal Router Commands](/docs/protocols/universal-router/concepts/commands)
- Review token approval patterns in [Permit2](/docs/protocols/permit2/overview)
- Review [UniversalRouter GitHub Repository](https://github.com/Uniswap/universal-router)