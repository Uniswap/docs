# Uniswap v4 SDK Overview: What's Different

The Uniswap v4 SDK introduces some major changes that fundamentally alter how developers interact with Uniswap. This overview highlights these key differences and what they mean for your applications.

## Key Changes

### Universal Router Requirement for Swapping
**What changed**: v3 allowed direct calls to the v3 Swap Router contract. v4 requires all swapping operations to go through the Universal Router.

**Why**: v4's singleton PoolManager architecture and flash accounting system require a different interaction pattern. The v4Planner batches operations and encodes them for the Universal Router - you cannot make direct swap calls.

**Key differences**:
- All swaps must be "planned" using v4Planner, even single swaps
- Operations use new patterns: SETTLE (pay tokens) and TAKE (receive tokens)
- Enables efficient multi-step operations and cross-protocol routes

**Impact**: This enables more efficient multi-step operations in a single transaction.

### StateView Contract Introduction
**Why it exists**: v4 uses a singleton PoolManager that tracks all pools in one contract, unlike v3's separate pool contracts. 

**What it means**: The StateView contract wraps the PoolManager's state reading functions with a dedicated view-only interface. Instead of calling the PoolManager directly for state queries, you use StateView for cleaner, more organized access to pool data like slot0, tick info, liquidity, and position information.

**Impact**: Provides a dedicated, organized interface for off-chain clients to read pool state data.

### Position Fetching Changed
**What changed**: v3 allowed easy enumeration of user positions on-chain. v4 provides no way to get all of a user's position IDs directly from the contracts. Additionally, position information is packed into a single uint256 value for efficiency, requiring decoding to extract individual fields like liquidity, fee growth, and tick ranges.

**Why it's different**: This design choice means position enumeration must happen off-chain through event indexing.

**Impact**: Applications must choose and implement indexing solutions to know which positions a user owns.

### Fee Collection Behavior Changed
**What changed**: v3 had an explicit `collect()` function for fee collection. v4 has no standalone collect function - fees are automatically collected and distributed when you modify positions.

**New pattern**: 
- Fees automatically roll over when increasing/decreasing liquidity
- To collect fees without modifying position size, you must modify the position with zero change (e.g., `modifyLiquidity(positionId, 0)`)
- StateView contract must be used to query the fee growth inside in order to calculate the exact amount of fees owed 

**Impact**: Fee collection logic must be redesigned around position modifications rather than explicit collect calls. 

## Quick Comparison

| Feature | v3 | v4 |
|---------|----|----|
| Swapping | Direct router calls | Universal Router |
| Pool State | Individual pool contracts | StateView contract |
| Position Discovery | On-chain enumeration | Off-chain indexing |
| Fee Collection | Explicit collect() | Automatic on modification |

## What This Means for Developers

### Migration Requirements
1. **Restructure all swaps** to use Universal Router with v4Planner
2. **Build position indexing systems** using event logs and subgraphs for position discovery
3. **Redesign fee collection logic** to use position modifications instead of explicit collect() calls
4. **Implement StateView integration** for all pool state queries instead of direct PoolManager calls

### Development Impact
- **Universal Router**: All swaps must be batched, but enables complex multi-step operations
- **Position tracking**: Requires additional infrastructure
- **Fee collection**: Simpler in some cases (automatic), more complex in others (zero-change modifications)
- **StateView**: Cleaner interface for state queries

## Learning Path

To get started with v4 SDK development, follow these guides based on the key changes:

### 1. Swapping
Learn how to restructure swaps using Universal Router integration.

**Documentation**: [Swaps & Quoting Guide](https://docs.uniswap.org/sdk/v4/guides/swaps/quoting)

### 2. Position Management (Off-chain Indexing + Fee Collection)
Understand position tracking systems and the new automatic fee collection patterns.

**Coming Soon**: *Position Management Guide*

### 3. Advanced Features (StateView + Pool Creation)
Explore efficient state queries and pool creation with the new architecture.

**Coming Soon**: *Advanced Features Guide*
