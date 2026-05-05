---
id: revert-reasons
title: Revert Reasons
sidebar_position: 5
---

UniswapX reactors revert with typed Solidity errors, which can be difficult to decode from a raw transaction receipt. Before submitting a fill transaction, fillers should use the `OrderQuoter` contract (or the UniswapX SDK wrapper) to simulate the fill and decode the revert reason — this avoids wasted gas and helps attribute failures to the right party.

## Order Validation States

The `OrderValidation` enum in the SDK captures every meaningful validation outcome. The table below describes each state and who is responsible for resolving it.

| State | Meaning | Who's Responsible |
|---|---|---|
| `OK` | Order is valid and fillable. | — |
| `Expired` | Order deadline has passed. | Filler (timing) |
| `NonceUsed` | Order nonce already consumed — order was filled or cancelled. | Protocol / Filler |
| `InsufficientFunds` | Swapper wallet lacks sufficient token balance or approval. | Swapper (surface to user) |
| `InvalidSignature` | Order signature is invalid or doesn't match the swapper. | Protocol |
| `InvalidOrderFields` | One or more order fields are malformed (bad decay times, amounts, reactor address, etc.). | Protocol / Filler |
| `ValidationFailed` | External validation contract rejected the order (often exclusivity). | Filler |
| `ExclusivityPeriod` | Order is in its exclusivity window and the caller is not the exclusive filler. | Filler (timing / routing) |
| `OrderNotFillableYet` | Order's start time hasn't been reached (Priority orders). | Filler (timing) |
| `InvalidGasPrice` | Gas price doesn't meet the order's requirements (Priority orders). | Filler |
| `InvalidCosignature` | Cosigner signature is missing or invalid (Cosigned orders). | Protocol / Filler |
| `UnknownError` | Unrecognized revert — check raw revert data. | — |

## Error Selector Reference

The table below maps 4-byte error selectors to their corresponding `OrderValidation` state. Use this as a lookup when decoding raw revert data from the reactor.

| Selector | State | Source |
|---|---|---|
| `8baa579f` | `InvalidSignature` | — |
| `815e1d64` | `InvalidSignature` | — |
| `756688fe` | `NonceUsed` | — |
| `302e5b7c` | `InvalidOrderFields` | Invalid dutch decay time |
| `773a6187` | `InvalidOrderFields` | Invalid dutch decay time |
| `4ddf4a64` | `InvalidOrderFields` | Invalid reactor address |
| `d303758b` | `InvalidOrderFields` | Both input and output decay |
| `7c1f8113` | `InvalidOrderFields` | Incorrect amounts |
| `43133453` | `InvalidOrderFields` | Invalid dutch decay time |
| `48fee69c` | `InvalidOrderFields` | — |
| `70f65caa` | `Expired` | — |
| `ee3b3d4b` | `NonceUsed` | — |
| `0a0b0d79` | `ValidationFailed` / `ExclusivityPeriod` | Exclusive filler check — maps to `ExclusivityPeriod` when `additionalValidationData` encodes an exclusive filler |
| `b9ec1e96` | `ExclusivityPeriod` | — |
| `062dec56` | `ExclusivityPeriod` | — |
| `75c1bb14` | `ExclusivityPeriod` | — |
| `a305df82` | `InvalidOrderFields` | Invalid cosigner output |
| `ac9143e7` | `InvalidOrderFields` | Invalid cosigner input |
| `fff08303` | `InvalidOrderFields` | Duplicate fee output |
| `d7815be1` | `InvalidCosignature` | `InvalidCosignature()` |
| `TRANSFER_FROM_FAILED` | `InsufficientFunds` | ERC-20 transfer failure |
| `d856fc5a` | `InvalidOrderFields` | Invalid fee escalation amounts |
| `cd21db4f` | `Expired` | Signature expired |
| `769d11e4` | `Expired` | `PriorityOrderReactor: InvalidDeadline()` |
| `c6035520` | `OrderNotFillableYet` | `PriorityOrderReactor: OrderNotFillable()` |
| `a6b844f5` | `InvalidOrderFields` | `PriorityOrderReactor: InputOutputScaling()` |
| `f3eb44e5` | `InvalidGasPrice` | `PriorityOrderReactor: InvalidGasPrice()` |

## Using the SDK to Pre-flight Orders

The UniswapX SDK's `OrderQuoter` class wraps the on-chain quoter contract and decodes the revert reason into the `OrderValidation` enum. Call it before sending your fill transaction to avoid wasted gas:

```typescript
import { OrderQuoter, OrderValidation } from '@uniswap/uniswapx-sdk';

const quoter = new OrderQuoter(provider, chainId);
const { validation } = await quoter.validate({ order, signature });

if (validation !== OrderValidation.OK) {
  console.error('Order invalid:', OrderValidation[validation]);
}
```

Running this simulation before submission lets you skip unwinnable fills, surface `InsufficientFunds` errors to your UI, and distinguish timing issues (e.g. `ExclusivityPeriod`) from permanent failures (e.g. `InvalidSignature`).

---

For broader context on building a fill bot — including order polling, execution flow, and webhook registration — see the [Filler Integration Guide](/contracts/uniswapx/fillers/filleroverview).
