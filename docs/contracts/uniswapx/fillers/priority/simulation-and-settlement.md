---
id: simulation-and-settlement
title: Simulation Failures and Settlement Decisions
sidebar_position: 7
---

When filling Priority orders on Unichain or Base, simulation reverts are an expected part of normal operation — not a sign of a bug in your filler. Because Priority orders are keyed to a specific block (`cosignerData.auctionTargetBlock`), any simulation that runs slightly before or after that block will revert. This guide explains why this happens and how to decide whether to attempt on-chain settlement after a failed simulation.

## Why Simulation Reverts Are Expected

Every Priority order includes a `cosignerData.auctionTargetBlock` field that specifies the exact block at which the order becomes executable. The `PriorityOrderReactor` checks this field on-chain and reverts if the current block does not match.

Because block times on Unichain and Base are very short (roughly 1 second), the window between when a simulation runs and when a transaction actually lands is enough for the target block to shift. As a result:

- Simulating **before** `auctionTargetBlock` → `InvalidTargetBlock` revert
- Simulating **at** `auctionTargetBlock` → likely success (subject to other checks)
- Simulating **after** `auctionTargetBlock` → `InvalidTargetBlock` revert

Treat `InvalidTargetBlock` reverts as transient, not terminal. They do not indicate a problem with your fill logic or the order itself.

:::note
The `UniswapXOrderQuoter` requires a `JsonRpcProvider` that supports block overrides to correctly simulate Priority orders. Without block overrides, the quoter cannot advance the simulated block to `auctionTargetBlock` and will revert even for valid orders.
:::

## Decision Tree: Attempt vs Skip Settlement After Failed Simulation

Use the revert reason to decide whether to retry, attempt settlement anyway, or skip entirely:

```
Failed simulation
│
├── Revert reason: InvalidTargetBlock
│   └── Block-timing mismatch — RETRY at next block
│
├── Gas estimation fails entirely (no revert reason)
│   └── Node-level failure — SKIP this attempt; poll again next block
│
├── Revert reason: InvalidCosignature
│   └── Cosignature is missing or malformed — SKIP and ALERT
│       (order may have been tampered with or cosigner is unavailable)
│
├── Revert reason: DeadlinePassed
│   └── Order deadline has elapsed — SKIP; do not attempt settlement
│
├── Revert reason: InsufficientOutput / OutputsExceedInputs
│   └── Price moved against you — SKIP; recalculate profit before retrying
│
└── Any other revert reason
    └── Treat as terminal for this attempt — SKIP and log for investigation
```

If your simulation succeeds, proceed to submit the fill transaction with your chosen priority fee. Remember that only the transaction with the highest priority fee wins; all others will revert on-chain (by design).

## Error Code Reference

| Revert Reason | Cause | Recommended Action |
|---|---|---|
| `InvalidTargetBlock` | Current block ≠ `auctionTargetBlock` | Retry at next block |
| `InvalidCosignature` | Cosignature missing or invalid | Skip and alert your team |
| `DeadlinePassed` | Order deadline has elapsed | Skip |
| `InsufficientOutput` | Filler output below required minimum | Skip; re-evaluate pricing |
| `OutputsExceedInputs` | Callback returned less than required | Skip; fix callback logic |
| `OrderAlreadyFilled` | Another filler won the order | Skip (normal PGA loss) |

For a more complete list of revert reasons, see the [KNOWN_ERRORS](https://github.com/Uniswap/sdks/blob/a7fb8d7b8eecdc8a29d386420339da86b0361a77/sdks/uniswapx-sdk/src/utils/OrderQuoter.ts#L70) map in the UniswapX SDK.

## Base L1 Data Fee Warning

On **Base**, every transaction incurs an additional **L1 data fee** (the cost of posting calldata to Ethereum mainnet) on top of the standard L2 execution gas. This fee is not reflected in a plain `eth_estimateGas` call against the Base RPC.

If your gas estimation does not account for the L1 data fee:

- Your profitability calculation will be incorrect — the actual transaction cost will be higher than estimated.
- A simulation that appears profitable may result in a loss on-chain.

**Recommendation:** Use the [Base fee oracle](https://docs.base.org/docs/fees/) (`GasPriceOracle` precompile at `0x420000000000000000000000000000000000000F`) to query `getL1Fee(bytes calldata _data)` with your encoded transaction calldata before submitting. Add the returned L1 fee to your L2 gas estimate to get the true total cost.

```typescript
// Pseudocode — adapt to your filler stack
const l2GasCost = await provider.estimateGas(fillTx);
const l1Fee = await gasPriceOracle.getL1Fee(encodedCalldata);
const totalCost = l2GasCost * gasPrice + l1Fee;
```

Fillers that skip this step frequently underestimate costs on Base, especially for orders with large calldata (e.g. complex callback paths).
