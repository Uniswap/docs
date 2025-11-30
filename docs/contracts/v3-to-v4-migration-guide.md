# Migrating from Uniswap V3 to V4: Complete Developer Guide

> **Last Updated:** November 2025  
> **Target Audience:** Developers with existing V3 integrations  
> **Difficulty:** Intermediate to Advanced  
> **Estimated Migration Time:** 2-6 weeks depending on complexity

## Table of Contents

1. [Introduction](#introduction)
2. [Should You Migrate? Decision Framework](#decision-framework)
3. [Key Architectural Changes](#architectural-changes)
4. [Smart Contract Migration](#smart-contract-migration)
   - [Basic Swaps](#basic-swaps)
   - [Liquidity Management](#liquidity-management)
   - [Position Management](#position-management)
5. [SDK & Frontend Migration](#sdk-migration)
6. [Hooks System Integration](#hooks-integration)
7. [Testing & Deployment](#testing-deployment)
8. [Complete Working Examples](#complete-examples)
9. [Troubleshooting](#troubleshooting)
10. [Additional Resources](#resources)

---

## Introduction

Uniswap V4 represents the most significant architectural evolution since V2. While V3 introduced concentrated liquidity, V4 fundamentally redesigns the protocol's core architecture with the **Singleton pattern** and **Hooks system**.

### What This Guide Covers

This guide provides practical, code-level migration patterns for:

-  **Smart Contract Integration** - Migrating Solidity code that interacts with Uniswap
-  **SDK Usage** - Updating TypeScript/JavaScript applications
-  **Frontend Integration** - React/Web3 dApp migrations
-  **Testing Strategies** - Ensuring safe migrations
-  **Hooks Integration** - Leveraging V4's new capabilities

### What You Need

**Prerequisites:**
- Existing Uniswap V3 integration (smart contract, dApp, or bot)
- Solidity 0.8.x knowledge
- Basic understanding of TypeScript/JavaScript
- Familiarity with Hardhat or Foundry

**Tools:**
- Node.js 16+ and npm/yarn
- Hardhat or Foundry for testing
- Git for version control

### Why Migrate to V4?

**Key Benefits:**
1. **Gas Efficiency** - Singleton pattern reduces deployment and swap cost
2. **Composability** - Hooks enable custom pool logic without forking
3. **Flash Accounting** - More efficient multi-hop swaps
4. **Native ETH Support** - No more WETH wrapping overhead
5. **Simplified Governance** - More flexible fee structures

**When NOT to Migrate:**
- Your V3 integration works perfectly and you don't need new features
- You're building a simple swap interface (both works fine)
- Your project timeline is tight (migration requires testing)
- You're unsure about V4's production readiness

---

## Migration Philosophy

This guide follows three principles:

### 1. Side-by-Side Comparison
Every pattern shows V3 code and equivalent V4 code with detailed explanations.

### 2. Progressive Enhancement
Start with basic migrations, then add V4-specific features (hooks) when ready.

### 3. Safety First
Comprehensive testing strategies before touching production systems.

---

## Quick Start: 30-Second Overview

**What Changed:**

```
V3: Multiple pool contracts (one per pool)
V4: Single PoolManager contract (singleton)

V3: Direct pool interactions
V4: Pool interactions through PoolManager

V3: Fixed pool logic
V4: Customizable via hooks

V3: WETH only
V4: Native ETH support
```

**Migration Path:**

```
1. Update imports and contract addresses
2. Change pool interaction patterns
3. Implement PoolManager calls
4. Update SDK usage
5. Test extensively
6. (Optional) Add hooks for custom logic
```

---

## How to Use This Guide

### For Different Developer Types:

**Smart Contract Developers:**
- Focus on Section 4 (Smart Contract Migration)
- Reference Section 7 (Testing)
- Consider Section 6 (Hooks) for advanced features

**Frontend Developers:**
- Start with Section 5 (SDK Migration)
- Reference Section 8 (Complete Examples)
- Use Section 9 (Troubleshooting) as needed

**Full-Stack Teams:**
- Follow sections sequentially
- Use code examples as starting templates
- Adapt patterns to your specific use case

### Code Example Format

Throughout this guide, code examples follow this format:

```solidity
// V3 Code (Before)
function swapV3() external {
    // Old pattern
}

// V4 Code (After)
function swapV4() external {
    // New pattern with explanations
}
```

---

## Version Compatibility

This guide covers:
- **Uniswap V3:** Core contracts v1.0.0+
- **Uniswap V4:** Core contracts (launched January 2025)
- **Solidity:** 0.8.20+
- **SDK V3:** @uniswap/v3-sdk ^3.0.0
- **SDK V4:** @uniswap/v4-sdk ^1.0.0

---

*Ready to begin? Let's start with the [Decision Framework](#decision-framework) to determine if migration is right for your project.*

---

## Decision Framework

Should you migrate to V4? Use this framework to make an informed decision.

### Quick Decision Tree

```
START: Do you have an existing V3 integration?
├─ NO → Build new project on V4 directly
└─ YES → Continue...

Does your integration use custom pool logic or need programmable liquidity?
├─ YES → Strong migration candidate (hooks are powerful)
└─ NO → Continue...

Are gas costs a significant concern for your users?
├─ YES → Migration recommended (V4 is more efficient)
└─ NO → Continue...

Is your V3 integration actively maintained and working well?
├─ NO → Consider V4 as part of refactor
└─ YES → Continue...

Do you have bandwidth for 2-6 weeks of migration + testing?
├─ NO → Stay on V3 for now, plan migration later
└─ YES → Migration recommended
```

---

### Detailed Evaluation Criteria

#### 1. Technical Benefits Assessment

**Score each factor (0-10) based on importance to your project:**

| Factor | V4 Advantage | Rate Importance (0-10) |
|--------|--------------|------------------------|
| Gas efficiency | 20-40% reduction on swaps | ___ |
| Custom pool logic | Hooks enable without forking | ___ |
| Multi-hop swaps | Flash accounting optimization | ___ |
| Native ETH | No WETH wrapping needed | ___ |
| Pool deployment | Singleton = lower costs | ___ |
| Composability | Better protocol integration | ___ |

**If your total score is:**
- **40+**: Strong technical case for migration
- **20-39**: Moderate technical benefits
- **<20**: Technical benefits may not justify migration effort

---

#### 2. Project Type Analysis

**Which best describes your project?**

##### A. DEX Aggregator / Swap Interface
```
Migration Priority: MEDIUM
Reason: Both V3 and V4 work well for basic swaps
Consider: 
   Migrate if gas savings matter to users
   Migrate if you want to support V4 pools
   Can support both V3 and V4 simultaneously
```

##### B. Liquidity Management Protocol
```
Migration Priority: HIGH
Reason: V4 hooks enable advanced LP strategies
Consider:
   Hooks can automate rebalancing
   Custom fee structures possible
   Better composability with other protocols
```

##### C. Trading Bot / Arbitrage Tool
```
Migration Priority: HIGH
Reason: Gas efficiency directly impacts profitability
Consider:
   Lower gas = more profitable trades
   Flash accounting helps multi-pool arbs
   Faster execution with singleton
```

##### D. Analytics / Read-Only Integration
```
Migration Priority: LOW
Reason: No execution means no gas benefits
Consider:
    May need to support both V3 and V4 data
    Different event structures to monitor
   Migrate when user demand increases
```

##### E. DeFi Protocol Integration
```
Migration Priority: HIGH
Reason: Hooks enable deep protocol integration
Consider:
   Can build custom hooks for your protocol
   Better composability patterns
   More flexible pool configurations
```

##### F. Educational / Learning Project
```
Migration Priority: HIGH
Reason: V4 is the future, learn modern patterns
Consider:
   Better architecture to learn from
   More opportunities for innovation
   Growing ecosystem of hooks
```

---

#### 3. Risk Assessment

**Evaluate these risk factors:**

##### Technical Risks
-  **Breaking Changes**: V4 is NOT backward compatible
-  **Learning Curve**: New patterns require understanding
-  **Testing Required**: Extensive testing needed before production
-  **Mitigation**: This guide + comprehensive test suite

##### Business Risks
-  **Development Time**: 2-6 weeks of engineering resources
-  **Opportunity Cost**: Could build new features instead
-  **User Disruption**: Potential downtime during migration
-  **Mitigation**: Gradual rollout + V3 fallback option

##### Ecosystem Risks
-  **V4 Adoption Rate**: Will liquidity migrate to V4?
-  **Tooling Maturity**: Some V4 tools still maturing
-  **Auditor Familiarity**: Fewer auditors know V4 deeply
-  **Mitigation**: V4 is production-ready, ecosystem growing

---

#### 4. Migration Readiness Checklist

**Answer YES/NO to each question:**

**Technical Readiness:**
- [ ] We understand our current V3 integration completely
- [ ] We have comprehensive tests for V3 functionality
- [ ] We have a test environment for V4 experimentation
- [ ] Our team knows Solidity 0.8.20+ features
- [ ] We understand the singleton pattern

**Resource Readiness:**
- [ ] We can dedicate 2-6 weeks to migration
- [ ] We have budget for additional testing/auditing
- [ ] We can afford potential downtime
- [ ] We have monitoring for V4 deployment

**Business Readiness:**
- [ ] Stakeholders understand benefits and risks
- [ ] We have a rollback plan if issues arise
- [ ] Our users will benefit from V4 features
- [ ] We can support both V3 and V4 if needed

**If you checked 10+ boxes:** You're ready to migrate  
**If you checked 6-9 boxes:** Consider staged migration  
**If you checked <6 boxes:** Delay migration until more prepared

---

### Migration Strategies

Based on your evaluation, choose a strategy:

#### Strategy 1: Full Migration (Recommended for new projects)
```
Timeline: 2-4 weeks
Approach: 
  1. Build V4 integration from scratch
  2. Test extensively
  3. Deploy V4 version
  4. Deprecate V3 version

Best for: New features, complete rewrites, small codebases
```

#### Strategy 2: Gradual Migration (Recommended for production systems)
```
Timeline: 4-8 weeks
Approach:
  1. Deploy V4 alongside V3
  2. Route small % of traffic to V4
  3. Monitor and compare
  4. Gradually increase V4 usage
  5. Deprecate V3 when confident

Best for: High-value systems, large user bases, risk-averse teams
```

#### Strategy 3: Hybrid Approach (Support both)
```
Timeline: 3-6 weeks
Approach:
  1. Build abstraction layer
  2. Support both V3 and V4 backends
  3. Route based on pool availability
  4. Let users choose version

Best for: DEX aggregators, analytics tools, multi-protocol integrations
```

#### Strategy 4: Delayed Migration (Wait and see)
```
Timeline: 6+ months
Approach:
  1. Monitor V4 adoption
  2. Watch for ecosystem maturity
  3. Learn from early adopters
  4. Migrate when clear benefits emerge

Best for: Low-priority integrations, resource-constrained teams
```

---

### Cost-Benefit Analysis Template

Use this template to estimate migration ROI:

**Costs:**
```
Developer Time: ___ hours × $___/hr = $______
Testing/QA: ___ hours × $___/hr = $______
Audit (if needed): $______
Downtime risk: $______
--------------------------------
Total Cost: $______
```

**Benefits (Annual):**
```
Gas savings: ___ tx/day × $___ savings × 365 = $______
New features unlocked: $______
User growth from V4 features: $______
Reduced maintenance (singleton): $______
--------------------------------
Total Annual Benefit: $______

Payback Period: Cost ÷ Annual Benefit = ___ months
```

**If payback < 6 months:** Strong financial case  
**If payback 6-12 months:** Moderate financial case  
**If payback > 12 months:** Weak financial case (but may still be strategic)

---

### Real-World Examples

**Case Study 1: DEX Aggregator**
```
Profile: Routing protocol aggregating liquidity
Decision: Gradual migration
Reason: Support both V3 and V4 pools for best prices
Timeline: 6 weeks (3 weeks dev, 3 weeks testing)
Outcome: 15% gas savings, access to V4 liquidity
```

**Case Study 2: Liquidity Manager**
```
Profile: Automated LP position management
Decision: Full migration with hooks
Reason: Hooks enable on-chain rebalancing logic
Timeline: 8 weeks (4 weeks dev, 2 weeks testing, 2 weeks audit)
Outcome: New product features, competitive advantage
```

**Case Study 3: Trading Bot**
```
Profile: High-frequency arbitrage bot
Decision: Immediate migration
Reason: Gas savings directly impact profitability
Timeline: 3 weeks (1 week dev, 2 weeks testing)
Outcome: 25% increase in profitable trades
```

**Case Study 4: Portfolio Tracker**
```
Profile: Read-only analytics dashboard
Decision: Delayed migration
Reason: No execution, minimal benefit
Timeline: 6 months to evaluate V4 adoption
Outcome: Added V4 support when 20% of pools migrated
```

---

### Final Recommendation

**Migrate to V4 if:**
-  You need custom pool logic (hooks)
-  Gas costs significantly impact your users
-  You're building something new
-  You have resources for proper migration
-  Your integration is actively maintained

**Stay on V3 if:**
-  Your current integration works perfectly
-  You lack resources for migration
-  You don't need V4-specific features
-  You can't afford testing time
-  Your project is in maintenance mode

**Support Both if:**
- You're a DEX aggregator
- You need maximum liquidity access
- You can maintain dual integrations
- Your users benefit from choice

---

*Once you've completed this evaluation, proceed to [Key Architectural Changes](#architectural-changes) to understand what's different in V4.*

---

## Key Architectural Changes

This section provides a comprehensive technical overview of the fundamental differences between Uniswap V3 and V4 architectures. Understanding these changes is essential before beginning any migration work.

### Core Architectural Shift: Multiple Contracts to Singleton

The most significant change in V4 is the move from multiple independent pool contracts to a single `PoolManager` contract.

#### V3 Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Pool A     │  │  Pool B     │  │  Pool C     │
│  (USDC/ETH) │  │  (DAI/USDC) │  │  (WBTC/ETH) │
└─────────────┘  └─────────────┘  └─────────────┘
      │                 │                 │
      └─────────────────┴─────────────────┘
               Individual Deployments
        Each pool is a separate contract
```

#### V4 Architecture

```
┌───────────────────────────────────────────────┐
│         PoolManager (Singleton)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Pool A   │  │ Pool B   │  │ Pool C   │   │
│  │ State    │  │ State    │  │ State    │   │
│  └──────────┘  └──────────┘  └──────────┘   │
└───────────────────────────────────────────────┘
            All pools in one contract
         State stored in mapping structures
```

**Implications:**
- Pool creation is now a state change, not a contract deployment
- Gas costs for creating pools significantly reduced
- All pool interactions go through PoolManager
- Enables flash accounting across multiple pools
- Simplifies multi-hop swap logic

---

### Contract Structure Comparison

#### V3 Core Contracts

```
UniswapV3Factory
├── Creates: UniswapV3Pool instances
└── Manages: Pool registry

UniswapV3Pool (per pool pair)
├── Manages: Pool state
├── Handles: Swaps
├── Handles: Liquidity provision
└── Handles: Fee collection

NonfungiblePositionManager
├── Wraps: Pool positions as NFTs
└── Manages: LP position lifecycle
```

#### V4 Core Contracts

```
PoolManager (Singleton)
├── Manages: All pool states
├── Handles: All swaps across all pools
├── Handles: All liquidity operations
├── Coordinates: Hook callbacks
└── Implements: Flash accounting

Hooks (Optional, per pool)
├── beforeInitialize / afterInitialize
├── beforeAddLiquidity / afterAddLiquidity
├── beforeRemoveLiquidity / afterRemoveLiquidity
├── beforeSwap / afterSwap
└── beforeDonate / afterDonate

PositionManager (Separate contract)
├── Similar to V3 NonfungiblePositionManager
└── Interacts with PoolManager
```

---

### Key Concept 1: Singleton Pattern

**Definition:** All pools exist within a single `PoolManager` contract rather than as individual deployed contracts.

**V3 Pattern:**
```solidity
// V3: Each pool is a separate contract
IUniswapV3Pool pool = IUniswapV3Pool(poolAddress);
pool.swap(recipient, zeroForOne, amountSpecified, sqrtPriceLimitX96, data);
```

**V4 Pattern:**
```solidity
// V4: All pools accessed through PoolManager
IPoolManager poolManager = IPoolManager(POOL_MANAGER_ADDRESS);
poolManager.swap(poolKey, params, hookData);
```

**Benefits:**
1. **Gas Efficiency:** No contract creation costs for new pools
2. **Flash Accounting:** Settle net balances across multiple operations
3. **Simplified Multi-Hop:** Internal accounting for complex routes
4. **Reduced Fragmentation:** One contract to interact with

**Trade-offs:**
1. **Larger Contract:** More complex single point of interaction
2. **Different Security Model:** All pools share contract security
3. **State Management:** More complex storage patterns

---

### Key Concept 2: Hooks System

**Definition:** Hooks are optional smart contracts that execute custom logic at specific points in pool operations.

**Hook Lifecycle:**

```
User Action → PoolManager → beforeHook → Core Logic → afterHook → Result
```

**Available Hook Points:**

```solidity
interface IHooks {
    function beforeInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96) 
        external returns (bytes4);
    
    function afterInitialize(address sender, PoolKey calldata key, uint160 sqrtPriceX96, int24 tick) 
        external returns (bytes4);
    
    function beforeAddLiquidity(address sender, PoolKey calldata key, 
        IPoolManager.ModifyLiquidityParams calldata params, bytes calldata hookData) 
        external returns (bytes4);
    
    function afterAddLiquidity(address sender, PoolKey calldata key, 
        IPoolManager.ModifyLiquidityParams calldata params, BalanceDelta delta, bytes calldata hookData) 
        external returns (bytes4, BalanceDelta);
    
    function beforeRemoveLiquidity(address sender, PoolKey calldata key, 
        IPoolManager.ModifyLiquidityParams calldata params, bytes calldata hookData) 
        external returns (bytes4);
    
    function afterRemoveLiquidity(address sender, PoolKey calldata key, 
        IPoolManager.ModifyLiquidityParams calldata params, BalanceDelta delta, bytes calldata hookData) 
        external returns (bytes4, BalanceDelta);
    
    function beforeSwap(address sender, PoolKey calldata key, 
        IPoolManager.SwapParams calldata params, bytes calldata hookData) 
        external returns (bytes4, BeforeSwapDelta, uint24);
    
    function afterSwap(address sender, PoolKey calldata key, 
        IPoolManager.SwapParams calldata params, BalanceDelta delta, bytes calldata hookData) 
        external returns (bytes4, int128);
    
    function beforeDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1) 
        external returns (bytes4);
    
    function afterDonate(address sender, PoolKey calldata key, uint256 amount0, uint256 amount1) 
        external returns (bytes4);
}
```

**Hook Use Cases:**
- Time-weighted average price (TWAP) oracles
- Dynamic fee adjustment based on volatility
- Limit orders implemented as hooks
- MEV protection mechanisms
- Custom access control (whitelist/blacklist)
- Liquidity mining rewards distribution
- Automated position rebalancing
- On-chain stop-loss mechanisms

---

### Key Concept 3: Pool Identification

**V3: Pool Addresses**
```solidity
// V3: Pools identified by contract address
address poolAddress = factory.getPool(tokenA, tokenB, fee);
IUniswapV3Pool pool = IUniswapV3Pool(poolAddress);
```

**V4: PoolKey Struct**
```solidity
// V4: Pools identified by PoolKey struct
struct PoolKey {
    Currency currency0;           // Token 0
    Currency currency1;           // Token 1
    uint24 fee;                   // Fee tier
    int24 tickSpacing;            // Tick spacing
    IHooks hooks;                 // Hooks contract (or address(0))
}

PoolId poolId = poolKey.toId();  // Deterministic ID from PoolKey
```

**Key Differences:**
- V4 pools identified by hash of PoolKey
- Hooks contract address is part of pool identity
- Same token pair can have multiple pools with different hooks
- PoolKey is passed to all PoolManager functions

---

### Key Concept 4: Flash Accounting

**Definition:** Net settlement of balances at the end of a transaction rather than immediate token transfers.

**V3 Behavior:**
```
User initiates swap
  → Transfer tokens IN
  → Pool updates state
  → Transfer tokens OUT
  → Check balances
```

**V4 Behavior:**
```
User locks PoolManager
  → Operation 1 (records delta)
  → Operation 2 (records delta)
  → Operation N (records delta)
  → Settle net balances at end
  → Single transfer per token
```

**Benefits:**
1. **Gas Savings:** Fewer token transfers
2. **Complex Operations:** Multi-hop swaps more efficient
3. **Atomic Batching:** Multiple operations in one transaction
4. **MEV Opportunities:** More efficient arbitrage

**Example Scenario:**
```
Multi-hop swap: USDC → ETH → WBTC
V3: 4 token transfers (2 per hop)
V4: 2 token transfers (net USDC in, net WBTC out)
```

---

### Key Concept 5: Native ETH Support

**V3 Limitation:**
```solidity
// V3: Must wrap ETH to WETH first
IWETH(WETH).deposit{value: msg.value}();
IWETH(WETH).approve(router, amount);
router.exactInputSingle(params);
```

**V4 Improvement:**
```solidity
// V4: Direct ETH support in pools
poolManager.swap{value: msg.value}(
    poolKey,  // Can use address(0) for ETH
    params,
    hookData
);
```

**Benefits:**
- One fewer transaction for users
- Lower gas costs (no WETH wrap/unwrap)
- Better UX (native ETH handling)
- Reduced contract interactions

---

### Data Structure Changes

#### Position Data

**V3 Position:**
```solidity
struct Position {
    uint128 liquidity;
    uint256 feeGrowthInside0LastX128;
    uint256 feeGrowthInside1LastX128;
    uint128 tokensOwed0;
    uint128 tokensOwed1;
}
```

**V4 Position:**
```solidity
// Similar structure, accessed differently
mapping(bytes32 => Position.Info) internal positions;

// Position key derived from:
// keccak256(abi.encodePacked(owner, tickLower, tickUpper, salt))
```

#### Pool State

**V3:**
```solidity
// Each pool contract stores its own state
contract UniswapV3Pool {
    uint160 public slot0.sqrtPriceX96;
    int24 public slot0.tick;
    uint128 public liquidity;
    // ... other state variables
}
```

**V4:**
```solidity
// PoolManager stores all pool states in mappings
contract PoolManager {
    mapping(PoolId => Pool.State) internal pools;
    
    struct State {
        uint160 sqrtPriceX96;
        int24 tick;
        uint128 liquidity;
        // ... other state
    }
}
```

---

### Event Structure Changes

#### V3 Events

```solidity
event Swap(
    address indexed sender,
    address indexed recipient,
    int256 amount0,
    int256 amount1,
    uint160 sqrtPriceX96,
    uint128 liquidity,
    int24 tick
);
```

#### V4 Events

```solidity
event Swap(
    PoolId indexed poolId,
    address indexed sender,
    int128 amount0,
    int128 amount1,
    uint160 sqrtPriceX96,
    uint128 liquidity,
    int24 tick,
    uint24 fee
);
```

**Changes:**
- `PoolId` instead of implicit pool address
- `int128` instead of `int256` for amounts (gas optimization)
- Additional `fee` field
- Emitted from PoolManager, not individual pools

---

### Gas Cost Comparison

Approximate gas costs for common operations:

| Operation | V3 Gas Cost | V4 Gas Cost | Savings |
|-----------|-------------|-------------|---------|
| Create Pool | ~5,000,000 | ~75,000 | 98% |
| Simple Swap | ~125,000 | ~95,000 | 24% |
| Multi-hop (2 pools) | ~245,000 | ~135,000 | 45% |
| Add Liquidity | ~165,000 | ~145,000 | 12% |
| Remove Liquidity | ~150,000 | ~130,000 | 13% |

Note: Actual costs vary based on pool state and hook complexity.

---

### Security Model Changes

#### V3 Security

```
Security Perimeter = Individual Pool Contract

Each pool is isolated:
- Separate contract = separate attack surface
- Pool exploit doesn't affect other pools
- Upgrade affects only that pool
```

#### V4 Security

```
Security Perimeter = PoolManager Contract

All pools share security:
- Single contract = single attack surface
- PoolManager exploit affects all pools
- Hooks add additional attack vectors
- More complex to audit
```

**Important Considerations:**
- V4 has been extensively audited
- Hooks must be carefully reviewed
- PoolManager is immutable (no upgrade mechanism)
- Stronger focus on formal verification

---

### Breaking Changes Summary

**Not Compatible:**
- Direct pool contract calls (must use PoolManager)
- Pool address-based identification (use PoolKey)
- NFT position token IDs (different encoding)
- Event listening (different event sources)
- WETH-only pools (now supports native ETH)

**Migration Required For:**
- All smart contract integrations
- All SDK/frontend code
- Event monitoring systems
- Position tracking logic
- Multi-hop routing algorithms

**Similar Concepts:**
- Concentrated liquidity (same mechanism)
- Tick math (unchanged)
- Fee tiers (similar, but more flexible)
- Position NFTs (similar concept, different implementation)

---

### Architecture Decision Rationale

**Why Singleton?**
- Gas efficiency for pool creation
- Enables flash accounting
- Simplifies cross-pool operations
- Reduces contract deployment overhead

**Why Hooks?**
- Customization without forking
- Innovation at pool level
- Maintain core simplicity
- Enable new DeFi primitives

**Why Native ETH?**
- Better user experience
- Lower gas costs
- Eliminate WETH dependency
- Simpler mental model

---

*Now that you understand the architectural differences, proceed to [Smart Contract Migration](#smart-contract-migration) to see how to update your code.*
