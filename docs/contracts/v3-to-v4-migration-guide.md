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


---

## Smart Contract Migration

This section provides detailed code examples for migrating smart contract integrations from V3 to V4. Each subsection includes side-by-side comparisons with inline explanations.

### Basic Swaps

Swaps are the most common operation to migrate. The fundamental differences are:
- V3 uses SwapRouter contract
- V4 uses PoolManager singleton
- V4 requires PoolKey instead of pool address
- V4 uses lock/unlock pattern for accounting

---

#### Setup and Imports

**V3 Imports:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

**V4 Imports:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import "@uniswap/v4-core/contracts/types/PoolKey.sol";
import "@uniswap/v4-core/contracts/types/Currency.sol";
import "@uniswap/v4-core/contracts/types/BalanceDelta.sol";
import "@uniswap/v4-periphery/contracts/base/PeripheryPayments.sol";
```

**Key Changes:**
- `ISwapRouter` → `IPoolManager`
- Added `PoolKey` for pool identification
- Added `Currency` type (replaces address for tokens)
- Added `BalanceDelta` for tracking balance changes
- `PeripheryPayments` for handling settlements

---

#### Contract State Variables

**V3 State:**
```solidity
contract MySwapperV3 {
    ISwapRouter public immutable swapRouter;
    
    constructor(address _swapRouter) {
        swapRouter = ISwapRouter(_swapRouter);
    }
}
```

**V4 State:**
```solidity
contract MySwapperV4 {
    IPoolManager public immutable poolManager;
    
    constructor(address _poolManager) {
        poolManager = IPoolManager(_poolManager);
    }
}
```

**Explanation:**
- V4 stores reference to PoolManager instead of SwapRouter
- PoolManager address is chain-specific (check deployment docs)

---

#### Exact Input Single Swap

This is the most common swap pattern: swap an exact amount of input tokens for a minimum amount of output tokens.

**V3 Implementation:**
```solidity
function swapExactInputSingleV3(
    address tokenIn,
    address tokenOut,
    uint24 fee,
    uint256 amountIn,
    uint256 amountOutMinimum
) external returns (uint256 amountOut) {
    // Step 1: Transfer tokens from caller to this contract
    IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
    
    // Step 2: Approve SwapRouter to spend tokens
    IERC20(tokenIn).approve(address(swapRouter), amountIn);
    
    // Step 3: Configure swap parameters
    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        fee: fee,
        recipient: msg.sender,
        deadline: block.timestamp,
        amountIn: amountIn,
        amountOutMinimum: amountOutMinimum,
        sqrtPriceLimitX96: 0  // No price limit
    });
    
    // Step 4: Execute swap
    amountOut = swapRouter.exactInputSingle(params);
}
```

**V4 Implementation:**
```solidity
function swapExactInputSingleV4(
    Currency currencyIn,
    Currency currencyOut,
    uint24 fee,
    int24 tickSpacing,
    address hookAddress,
    uint256 amountIn,
    uint256 amountOutMinimum
) external returns (uint256 amountOut) {
    // Step 1: Construct PoolKey to identify the pool
    PoolKey memory poolKey = PoolKey({
        currency0: currencyIn < currencyOut ? currencyIn : currencyOut,
        currency1: currencyIn < currencyOut ? currencyOut : currencyIn,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: IHooks(hookAddress)  // Use address(0) if no hooks
    });
    
    // Step 2: Determine swap direction
    bool zeroForOne = currencyIn < currencyOut;
    
    // Step 3: Configure swap parameters
    IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
        zeroForOne: zeroForOne,
        amountSpecified: -int256(amountIn),  // Negative for exact input
        sqrtPriceLimitX96: zeroForOne 
            ? TickMath.MIN_SQRT_PRICE + 1 
            : TickMath.MAX_SQRT_PRICE - 1
    });
    
    // Step 4: Execute swap through PoolManager
    // Note: Actual implementation requires lock/unlock pattern
    // This is simplified - see complete implementation below
    BalanceDelta delta = poolManager.swap(poolKey, params, "");
    
    // Step 5: Extract output amount from delta
    amountOut = zeroForOne 
        ? uint256(int256(-delta.amount1())) 
        : uint256(int256(-delta.amount0()));
    
    // Step 6: Verify minimum output
    require(amountOut >= amountOutMinimum, "Insufficient output");
}
```

**Key Differences:**
1. **PoolKey Construction**: Must build PoolKey struct with all pool parameters
2. **Currency Ordering**: Currencies must be ordered (currency0 < currency1)
3. **Negative Amount**: Exact input uses negative `amountSpecified`
4. **BalanceDelta**: Return value is delta struct, not uint256
5. **Lock Pattern**: Real implementation needs lock/unlock (shown next)

---

#### Complete V4 Swap with Lock Pattern

V4 requires using the lock/unlock pattern for proper accounting:

```solidity
import "@uniswap/v4-core/contracts/interfaces/callback/IUnlockCallback.sol";

contract MySwapperV4Complete is IUnlockCallback {
    IPoolManager public immutable poolManager;
    
    constructor(address _poolManager) {
        poolManager = IPoolManager(_poolManager);
    }
    
    // Storage for passing swap parameters to callback
    struct SwapCallbackData {
        address sender;
        PoolKey poolKey;
        IPoolManager.SwapParams params;
        uint256 amountOutMinimum;
    }
    
    function swapExactInputSingle(
        Currency currencyIn,
        Currency currencyOut,
        uint24 fee,
        int24 tickSpacing,
        address hookAddress,
        uint256 amountIn,
        uint256 amountOutMinimum
    ) external returns (uint256 amountOut) {
        // Construct PoolKey
        PoolKey memory poolKey = PoolKey({
            currency0: currencyIn < currencyOut ? currencyIn : currencyOut,
            currency1: currencyIn < currencyOut ? currencyOut : currencyIn,
            fee: fee,
            tickSpacing: tickSpacing,
            hooks: IHooks(hookAddress)
        });
        
        bool zeroForOne = currencyIn < currencyOut;
        
        // Prepare swap parameters
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: -int256(amountIn),
            sqrtPriceLimitX96: zeroForOne 
                ? TickMath.MIN_SQRT_PRICE + 1 
                : TickMath.MAX_SQRT_PRICE - 1
        });
        
        // Encode callback data
        SwapCallbackData memory callbackData = SwapCallbackData({
            sender: msg.sender,
            poolKey: poolKey,
            params: params,
            amountOutMinimum: amountOutMinimum
        });
        
        // Lock PoolManager and execute swap in callback
        bytes memory result = poolManager.unlock(
            abi.encode(callbackData)
        );
        
        // Decode result
        amountOut = abi.decode(result, (uint256));
    }
    
    // Callback function called by PoolManager during unlock
    function unlockCallback(bytes calldata rawData) 
        external 
        returns (bytes memory) 
    {
        require(msg.sender == address(poolManager), "Not PoolManager");
        
        // Decode callback data
        SwapCallbackData memory data = abi.decode(
            rawData, 
            (SwapCallbackData)
        );
        
        // Execute the swap
        BalanceDelta delta = poolManager.swap(
            data.poolKey,
            data.params,
            ""  // No hook data
        );
        
        // Determine amounts based on swap direction
        bool zeroForOne = data.params.zeroForOne;
        uint256 amountIn;
        uint256 amountOut;
        
        if (zeroForOne) {
            amountIn = uint256(int256(-delta.amount0()));
            amountOut = uint256(int256(-delta.amount1()));
        } else {
            amountIn = uint256(int256(-delta.amount1()));
            amountOut = uint256(int256(-delta.amount0()));
        }
        
        // Verify minimum output
        require(amountOut >= data.amountOutMinimum, "Insufficient output");
        
        // Settle balances with PoolManager
        if (data.poolKey.currency0.isNative()) {
            poolManager.settle{value: amountIn}(data.poolKey.currency0);
        } else {
            IERC20(Currency.unwrap(data.poolKey.currency0)).transferFrom(
                data.sender,
                address(poolManager),
                amountIn
            );
            poolManager.settle(data.poolKey.currency0);
        }
        
        // Take output tokens
        poolManager.take(
            data.poolKey.currency1,
            data.sender,
            amountOut
        );
        
        // Return amount out
        return abi.encode(amountOut);
    }
}
```

**Lock/Unlock Pattern Explanation:**
1. **Lock**: `poolManager.unlock()` begins transaction
2. **Callback**: PoolManager calls `unlockCallback()` on your contract
3. **Operations**: Perform swaps and other operations inside callback
4. **Settlement**: Settle net balances before callback returns
5. **Unlock**: PoolManager verifies balances and completes transaction

---

#### Exact Output Single Swap

Swap to receive an exact amount of output tokens.

**V3 Implementation:**
```solidity
function swapExactOutputSingleV3(
    address tokenIn,
    address tokenOut,
    uint24 fee,
    uint256 amountOut,
    uint256 amountInMaximum
) external returns (uint256 amountIn) {
    IERC20(tokenIn).transferFrom(msg.sender, address(this), amountInMaximum);
    IERC20(tokenIn).approve(address(swapRouter), amountInMaximum);
    
    ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        fee: fee,
        recipient: msg.sender,
        deadline: block.timestamp,
        amountOut: amountOut,
        amountInMaximum: amountInMaximum,
        sqrtPriceLimitX96: 0
    });
    
    amountIn = swapRouter.exactOutputSingle(params);
    
    // Refund excess tokens
    if (amountIn < amountInMaximum) {
        IERC20(tokenIn).transfer(msg.sender, amountInMaximum - amountIn);
    }
}
```

**V4 Implementation:**
```solidity
function swapExactOutputSingle(
    Currency currencyIn,
    Currency currencyOut,
    uint24 fee,
    int24 tickSpacing,
    address hookAddress,
    uint256 amountOut,
    uint256 amountInMaximum
) external returns (uint256 amountIn) {
    PoolKey memory poolKey = PoolKey({
        currency0: currencyIn < currencyOut ? currencyIn : currencyOut,
        currency1: currencyIn < currencyOut ? currencyOut : currencyIn,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: IHooks(hookAddress)
    });
    
    bool zeroForOne = currencyIn < currencyOut;
    
    // Positive amountSpecified for exact output
    IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
        zeroForOne: zeroForOne,
        amountSpecified: int256(amountOut),  // Positive for exact output
        sqrtPriceLimitX96: zeroForOne 
            ? TickMath.MIN_SQRT_PRICE + 1 
            : TickMath.MAX_SQRT_PRICE - 1
    });
    
    SwapCallbackData memory callbackData = SwapCallbackData({
        sender: msg.sender,
        poolKey: poolKey,
        params: params,
        amountOutMinimum: 0  // Not used for exact output
    });
    
    bytes memory result = poolManager.unlock(abi.encode(callbackData));
    amountIn = abi.decode(result, (uint256));
    
    require(amountIn <= amountInMaximum, "Excessive input");
}
```

**Key Difference:**
- **Positive Amount**: Exact output uses positive `amountSpecified`
- V3 handles refunds automatically
- V4 requires explicit refund logic in callback

---

#### Multi-Hop Swaps

Swapping through multiple pools for better prices.

**V3 Multi-Hop:**
```solidity
function swapMultiHopV3(
    bytes memory path,  // Encoded path: tokenA, fee1, tokenB, fee2, tokenC
    uint256 amountIn,
    uint256 amountOutMinimum
) external returns (uint256 amountOut) {
    IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
    IERC20(tokenIn).approve(address(swapRouter), amountIn);
    
    ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
        path: path,
        recipient: msg.sender,
        deadline: block.timestamp,
        amountIn: amountIn,
        amountOutMinimum: amountOutMinimum
    });
    
    amountOut = swapRouter.exactInput(params);
}
```

**V4 Multi-Hop:**
```solidity
function swapMultiHopV4(
    PoolKey[] memory poolKeys,  // Array of pool keys for route
    uint256 amountIn,
    uint256 amountOutMinimum
) external returns (uint256 amountOut) {
    // Store route data for callback
    MultiHopCallbackData memory callbackData = MultiHopCallbackData({
        sender: msg.sender,
        poolKeys: poolKeys,
        amountIn: amountIn,
        amountOutMinimum: amountOutMinimum
    });
    
    // Execute multi-hop in single lock
    bytes memory result = poolManager.unlock(abi.encode(callbackData));
    amountOut = abi.decode(result, (uint256));
}

// Callback handles multiple swaps with flash accounting
function unlockCallbackMultiHop(bytes calldata rawData) 
    external 
    returns (bytes memory) 
{
    require(msg.sender == address(poolManager), "Not PoolManager");
    
    MultiHopCallbackData memory data = abi.decode(
        rawData, 
        (MultiHopCallbackData)
    );
    
    // Execute swaps sequentially
    // Flash accounting means only net balance settled at end
    int256 currentAmount = -int256(data.amountIn);
    
    for (uint i = 0; i < data.poolKeys.length; i++) {
        bool zeroForOne = /* determine direction */;
        
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: currentAmount,
            sqrtPriceLimitX96: /* set limit */
        });
        
        BalanceDelta delta = poolManager.swap(data.poolKeys[i], params, "");
        
        // Update current amount for next swap
        currentAmount = zeroForOne ? delta.amount1() : delta.amount0();
    }
    
    // Final amount is the last swap output
    uint256 finalAmount = uint256(-currentAmount);
    require(finalAmount >= data.amountOutMinimum, "Insufficient output");
    
    // Settle only net balances
    // ... settlement logic ...
    
    return abi.encode(finalAmount);
}
```

**V4 Advantage:**
- Flash accounting means intermediate tokens never transferred
- Single settlement for entire route
- Significantly lower gas costs for multi-hop

---

#### Native ETH Handling

**V3 ETH Swap (requires WETH):**
```solidity
function swapETHForTokensV3(
    address tokenOut,
    uint24 fee,
    uint256 amountOutMinimum
) external payable returns (uint256 amountOut) {
    // Must wrap ETH to WETH first
    IWETH(WETH).deposit{value: msg.value}();
    IWETH(WETH).approve(address(swapRouter), msg.value);
    
    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
        tokenIn: WETH,
        tokenOut: tokenOut,
        fee: fee,
        recipient: msg.sender,
        deadline: block.timestamp,
        amountIn: msg.value,
        amountOutMinimum: amountOutMinimum,
        sqrtPriceLimitX96: 0
    });
    
    amountOut = swapRouter.exactInputSingle(params);
}
```

**V4 Native ETH Swap:**
```solidity
function swapETHForTokensV4(
    Currency tokenOut,
    uint24 fee,
    int24 tickSpacing,
    address hookAddress,
    uint256 amountOutMinimum
) external payable returns (uint256 amountOut) {
    // Use CurrencyLibrary.NATIVE for ETH (address(0))
    Currency ethCurrency = CurrencyLibrary.NATIVE;
    
    PoolKey memory poolKey = PoolKey({
        currency0: ethCurrency < tokenOut ? ethCurrency : tokenOut,
        currency1: ethCurrency < tokenOut ? tokenOut : ethCurrency,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: IHooks(hookAddress)
    });
    
    bool zeroForOne = ethCurrency < tokenOut;
    
    IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
        zeroForOne: zeroForOne,
        amountSpecified: -int256(msg.value),
        sqrtPriceLimitX96: zeroForOne 
            ? TickMath.MIN_SQRT_PRICE + 1 
            : TickMath.MAX_SQRT_PRICE - 1
    });
    
    // Callback handles ETH settlement automatically
    // Use poolManager.settle{value: amount}() for ETH
    
    SwapCallbackData memory callbackData = SwapCallbackData({
        sender: msg.sender,
        poolKey: poolKey,
        params: params,
        amountOutMinimum: amountOutMinimum
    });
    
    bytes memory result = poolManager.unlock(abi.encode(callbackData));
    amountOut = abi.decode(result, (uint256));
}
```

**Key Differences:**
- V4 uses `CurrencyLibrary.NATIVE` (address(0)) for ETH
- No WETH wrapping needed
- Settlement uses `settle{value: amount}()` for ETH
- More gas efficient

---

#### Migration Checklist for Swaps

When migrating swap functionality:

- [ ] Replace `ISwapRouter` with `IPoolManager` imports
- [ ] Change pool identification from address to `PoolKey`
- [ ] Implement `IUnlockCallback` interface
- [ ] Add lock/unlock pattern around operations
- [ ] Convert token addresses to `Currency` type
- [ ] Handle `BalanceDelta` return values
- [ ] Update settlement logic for native ETH if needed
- [ ] Adjust amount sign (negative for exact input, positive for exact output)
- [ ] Update price limit calculations
- [ ] Add proper error handling for new patterns
- [ ] Test with various token pairs and amounts
- [ ] Verify gas cost improvements

---

*Continue to [Liquidity Management](#liquidity-management) for migrating liquidity provision code.*

---

### Liquidity Management

Liquidity provision in V4 follows similar principles to V3 but requires different contract interactions. This section covers adding liquidity, removing liquidity, and collecting fees.

---

#### Adding Liquidity: Overview

**Key Differences V3 to V4:**
- V3 uses `NonfungiblePositionManager` contract
- V4 uses `PoolManager.modifyLiquidity()` function
- V4 requires lock/unlock pattern
- Position identification changes
- Settlement process differs

---

#### V3 Add Liquidity Pattern

```solidity
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

contract LiquidityProviderV3 {
    INonfungiblePositionManager public immutable positionManager;
    
    constructor(address _positionManager) {
        positionManager = INonfungiblePositionManager(_positionManager);
    }
    
    function addLiquidityV3(
        address token0,
        address token1,
        uint24 fee,
        int24 tickLower,
        int24 tickUpper,
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min
    ) external returns (
        uint256 tokenId,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    ) {
        // Transfer tokens to this contract
        IERC20(token0).transferFrom(msg.sender, address(this), amount0Desired);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1Desired);
        
        // Approve position manager
        IERC20(token0).approve(address(positionManager), amount0Desired);
        IERC20(token1).approve(address(positionManager), amount1Desired);
        
        // Prepare mint parameters
        INonfungiblePositionManager.MintParams memory params = 
            INonfungiblePositionManager.MintParams({
                token0: token0,
                token1: token1,
                fee: fee,
                tickLower: tickLower,
                tickUpper: tickUpper,
                amount0Desired: amount0Desired,
                amount1Desired: amount1Desired,
                amount0Min: amount0Min,
                amount1Min: amount1Min,
                recipient: msg.sender,
                deadline: block.timestamp
            });
        
        // Mint position (creates NFT)
        (tokenId, liquidity, amount0, amount1) = positionManager.mint(params);
        
        // Refund unused tokens
        if (amount0 < amount0Desired) {
            IERC20(token0).transfer(msg.sender, amount0Desired - amount0);
        }
        if (amount1 < amount1Desired) {
            IERC20(token1).transfer(msg.sender, amount1Desired - amount1);
        }
    }
}
```

---

#### V4 Add Liquidity Pattern

```solidity
import "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
import "@uniswap/v4-core/contracts/interfaces/callback/IUnlockCallback.sol";
import "@uniswap/v4-core/contracts/types/PoolKey.sol";
import "@uniswap/v4-core/contracts/types/BalanceDelta.sol";

contract LiquidityProviderV4 is IUnlockCallback {
    IPoolManager public immutable poolManager;
    
    constructor(address _poolManager) {
        poolManager = IPoolManager(_poolManager);
    }
    
    struct AddLiquidityCallbackData {
        address sender;
        PoolKey poolKey;
        IPoolManager.ModifyLiquidityParams params;
        uint256 amount0Max;
        uint256 amount1Max;
        uint256 amount0Min;
        uint256 amount1Min;
    }
    
    function addLiquidityV4(
        Currency currency0,
        Currency currency1,
        uint24 fee,
        int24 tickSpacing,
        address hooks,
        int24 tickLower,
        int24 tickUpper,
        uint256 liquidityDelta,
        uint256 amount0Max,
        uint256 amount1Max,
        uint256 amount0Min,
        uint256 amount1Min
    ) external returns (
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    ) {
        // Construct PoolKey
        PoolKey memory poolKey = PoolKey({
            currency0: currency0,
            currency1: currency1,
            fee: fee,
            tickSpacing: tickSpacing,
            hooks: IHooks(hooks)
        });
        
        // Prepare modify liquidity parameters
        IPoolManager.ModifyLiquidityParams memory params = 
            IPoolManager.ModifyLiquidityParams({
                tickLower: tickLower,
                tickUpper: tickUpper,
                liquidityDelta: int256(liquidityDelta),  // Positive to add
                salt: bytes32(0)  // Used for position identification
            });
        
        // Encode callback data
        AddLiquidityCallbackData memory callbackData = AddLiquidityCallbackData({
            sender: msg.sender,
            poolKey: poolKey,
            params: params,
            amount0Max: amount0Max,
            amount1Max: amount1Max,
            amount0Min: amount0Min,
            amount1Min: amount1Min
        });
        
        // Execute through unlock
        bytes memory result = poolManager.unlock(abi.encode(callbackData));
        
        // Decode results
        (liquidity, amount0, amount1) = abi.decode(
            result, 
            (uint128, uint256, uint256)
        );
    }
    
    function unlockCallback(bytes calldata rawData) 
        external 
        returns (bytes memory) 
    {
        require(msg.sender == address(poolManager), "Not PoolManager");
        
        AddLiquidityCallbackData memory data = abi.decode(
            rawData,
            (AddLiquidityCallbackData)
        );
        
        // Execute liquidity modification
        BalanceDelta delta = poolManager.modifyLiquidity(
            data.poolKey,
            data.params,
            ""  // Hook data
        );
        
        // Extract amounts from delta
        uint256 amount0 = uint256(uint128(-delta.amount0()));
        uint256 amount1 = uint256(uint128(-delta.amount1()));
        
        // Verify amounts are within acceptable range
        require(amount0 <= data.amount0Max, "Amount0 exceeds maximum");
        require(amount1 <= data.amount1Max, "Amount1 exceeds maximum");
        require(amount0 >= data.amount0Min, "Amount0 below minimum");
        require(amount1 >= data.amount1Min, "Amount1 below minimum");
        
        // Settle currency0
        if (data.poolKey.currency0.isNative()) {
            poolManager.settle{value: amount0}(data.poolKey.currency0);
        } else {
            IERC20(Currency.unwrap(data.poolKey.currency0)).transferFrom(
                data.sender,
                address(poolManager),
                amount0
            );
            poolManager.settle(data.poolKey.currency0);
        }
        
        // Settle currency1
        if (data.poolKey.currency1.isNative()) {
            poolManager.settle{value: amount1}(data.poolKey.currency1);
        } else {
            IERC20(Currency.unwrap(data.poolKey.currency1)).transferFrom(
                data.sender,
                address(poolManager),
                amount1
            );
            poolManager.settle(data.poolKey.currency1);
        }
        
        // Calculate liquidity added (approximation)
        uint128 liquidity = uint128(data.params.liquidityDelta);
        
        return abi.encode(liquidity, amount0, amount1);
    }
}
```

**Key Changes:**
1. **No NFT Creation**: V4 positions aren't automatically minted as NFTs
2. **liquidityDelta**: Specify liquidity amount directly, not token amounts
3. **Salt Parameter**: Used for position identification (can be used for multiple positions in same range)
4. **Settlement**: Manual settlement of both currencies
5. **Native ETH**: Direct support without WETH wrapping

---

#### Calculating Liquidity Amount

In V4, you specify liquidity directly rather than token amounts. Here's how to calculate it:

```solidity
import "@uniswap/v4-core/contracts/libraries/LiquidityAmounts.sol";
import "@uniswap/v4-core/contracts/libraries/TickMath.sol";

function getLiquidityForAmounts(
    uint160 sqrtPriceX96,
    int24 tickLower,
    int24 tickUpper,
    uint256 amount0,
    uint256 amount1
) public pure returns (uint128 liquidity) {
    uint160 sqrtRatioAX96 = TickMath.getSqrtPriceAtTick(tickLower);
    uint160 sqrtRatioBX96 = TickMath.getSqrtPriceAtTick(tickUpper);
    
    liquidity = LiquidityAmounts.getLiquidityForAmounts(
        sqrtPriceX96,
        sqrtRatioAX96,
        sqrtRatioBX96,
        amount0,
        amount1
    );
}

// Use this when adding liquidity
function addLiquidityWithAmounts(
    PoolKey memory poolKey,
    int24 tickLower,
    int24 tickUpper,
    uint256 amount0Desired,
    uint256 amount1Desired
) external {
    // Get current pool state
    (uint160 sqrtPriceX96, , , ) = poolManager.getSlot0(poolKey.toId());
    
    // Calculate liquidity
    uint128 liquidity = getLiquidityForAmounts(
        sqrtPriceX96,
        tickLower,
        tickUpper,
        amount0Desired,
        amount1Desired
    );
    
    // Now call addLiquidityV4 with calculated liquidity
    // ...
}
```

---

#### Removing Liquidity

**V3 Remove Liquidity:**

```solidity
function removeLiquidityV3(
    uint256 tokenId,
    uint128 liquidity,
    uint256 amount0Min,
    uint256 amount1Min
) external returns (uint256 amount0, uint256 amount1) {
    // Prepare decrease liquidity parameters
    INonfungiblePositionManager.DecreaseLiquidityParams memory params =
        INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: liquidity,
            amount0Min: amount0Min,
            amount1Min: amount1Min,
            deadline: block.timestamp
        });
    
    // Decrease liquidity
    (amount0, amount1) = positionManager.decreaseLiquidity(params);
    
    // Collect tokens
    INonfungiblePositionManager.CollectParams memory collectParams =
        INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient: msg.sender,
            amount0Max: uint128(amount0),
            amount1Max: uint128(amount1)
        });
    
    positionManager.collect(collectParams);
}
```

**V4 Remove Liquidity:**

```solidity
struct RemoveLiquidityCallbackData {
    address sender;
    PoolKey poolKey;
    IPoolManager.ModifyLiquidityParams params;
    uint256 amount0Min;
    uint256 amount1Min;
}

function removeLiquidityV4(
    PoolKey memory poolKey,
    int24 tickLower,
    int24 tickUpper,
    uint256 liquidityDelta,
    bytes32 salt,
    uint256 amount0Min,
    uint256 amount1Min
) external returns (uint256 amount0, uint256 amount1) {
    // Prepare parameters (negative liquidityDelta to remove)
    IPoolManager.ModifyLiquidityParams memory params =
        IPoolManager.ModifyLiquidityParams({
            tickLower: tickLower,
            tickUpper: tickUpper,
            liquidityDelta: -int256(liquidityDelta),  // Negative to remove
            salt: salt
        });
    
    RemoveLiquidityCallbackData memory callbackData = RemoveLiquidityCallbackData({
        sender: msg.sender,
        poolKey: poolKey,
        params: params,
        amount0Min: amount0Min,
        amount1Min: amount1Min
    });
    
    bytes memory result = poolManager.unlock(abi.encode(callbackData));
    (amount0, amount1) = abi.decode(result, (uint256, uint256));
}

// In unlockCallback, handle removal
function unlockCallbackRemove(bytes calldata rawData) 
    external 
    returns (bytes memory) 
{
    require(msg.sender == address(poolManager), "Not PoolManager");
    
    RemoveLiquidityCallbackData memory data = abi.decode(
        rawData,
        (RemoveLiquidityCallbackData)
    );
    
    // Execute liquidity removal
    BalanceDelta delta = poolManager.modifyLiquidity(
        data.poolKey,
        data.params,
        ""
    );
    
    // Delta is positive when removing liquidity (tokens owed to user)
    uint256 amount0 = uint256(int256(delta.amount0()));
    uint256 amount1 = uint256(int256(delta.amount1()));
    
    // Verify minimum amounts
    require(amount0 >= data.amount0Min, "Amount0 below minimum");
    require(amount1 >= data.amount1Min, "Amount1 below minimum");
    
    // Take tokens from PoolManager
    poolManager.take(data.poolKey.currency0, data.sender, amount0);
    poolManager.take(data.poolKey.currency1, data.sender, amount1);
    
    return abi.encode(amount0, amount1);
}
```

**Key Differences:**
1. **Negative liquidityDelta**: Use negative value to remove liquidity
2. **Positive Delta**: When removing, delta is positive (tokens owed)
3. **Take Instead of Collect**: Use `poolManager.take()` to withdraw tokens
4. **Salt Tracking**: Must use same salt as when position was created

---

#### Collecting Fees

**V3 Fee Collection:**

```solidity
function collectFeesV3(uint256 tokenId) 
    external 
    returns (uint256 amount0, uint256 amount1) 
{
    INonfungiblePositionManager.CollectParams memory params =
        INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient: msg.sender,
            amount0Max: type(uint128).max,  // Collect all fees
            amount1Max: type(uint128).max
        });
    
    (amount0, amount1) = positionManager.collect(params);
}
```

**V4 Fee Collection:**

In V4, fees are collected automatically when you modify liquidity or can be collected separately:

```solidity
struct CollectFeesCallbackData {
    address sender;
    PoolKey poolKey;
    int24 tickLower;
    int24 tickUpper;
    bytes32 salt;
}

function collectFeesV4(
    PoolKey memory poolKey,
    int24 tickLower,
    int24 tickUpper,
    bytes32 salt
) external returns (uint256 amount0, uint256 amount1) {
    CollectFeesCallbackData memory callbackData = CollectFeesCallbackData({
        sender: msg.sender,
        poolKey: poolKey,
        tickLower: tickLower,
        tickUpper: tickUpper,
        salt: salt
    });
    
    bytes memory result = poolManager.unlock(abi.encode(callbackData));
    (amount0, amount1) = abi.decode(result, (uint256, uint256));
}

// In callback, modify with zero liquidity delta to collect fees
function unlockCallbackCollectFees(bytes calldata rawData) 
    external 
    returns (bytes memory) 
{
    require(msg.sender == address(poolManager), "Not PoolManager");
    
    CollectFeesCallbackData memory data = abi.decode(
        rawData,
        (CollectFeesCallbackData)
    );
    
    // Modify with zero liquidityDelta to collect fees
    IPoolManager.ModifyLiquidityParams memory params =
        IPoolManager.ModifyLiquidityParams({
            tickLower: data.tickLower,
            tickUpper: data.tickUpper,
            liquidityDelta: 0,  // Zero delta = just collect fees
            salt: data.salt
        });
    
    BalanceDelta delta = poolManager.modifyLiquidity(
        data.poolKey,
        params,
        ""
    );
    
    // Positive delta = fees collected
    uint256 amount0 = uint256(int256(delta.amount0()));
    uint256 amount1 = uint256(int256(delta.amount1()));
    
    // Take collected fees
    if (amount0 > 0) {
        poolManager.take(data.poolKey.currency0, data.sender, amount0);
    }
    if (amount1 > 0) {
        poolManager.take(data.poolKey.currency1, data.sender, amount1);
    }
    
    return abi.encode(amount0, amount1);
}
```

**Key Points:**
- V4 collects fees by calling `modifyLiquidity` with `liquidityDelta = 0`
- Fees are automatically accumulated in position accounting
- Can collect fees without modifying liquidity amount

---

#### Position Tracking

**V3 Position Tracking:**
```solidity
// V3 positions identified by NFT tokenId
function getPositionV3(uint256 tokenId) 
    external 
    view 
    returns (
        address token0,
        address token1,
        uint24 fee,
        int24 tickLower,
        int24 tickUpper,
        uint128 liquidity
    ) 
{
    (
        ,
        ,
        token0,
        token1,
        fee,
        tickLower,
        tickUpper,
        liquidity,
        ,
        ,
        ,
    ) = positionManager.positions(tokenId);
}
```

**V4 Position Tracking:**
```solidity
// V4 positions identified by hash of parameters
function getPositionIdV4(
    address owner,
    int24 tickLower,
    int24 tickUpper,
    bytes32 salt
) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(owner, tickLower, tickUpper, salt));
}

function getPositionV4(
    PoolKey memory poolKey,
    address owner,
    int24 tickLower,
    int24 tickUpper,
    bytes32 salt
) external view returns (uint128 liquidity) {
    bytes32 positionId = getPositionIdV4(owner, tickLower, tickUpper, salt);
    
    // Get position info from PoolManager
    Position.Info memory position = poolManager.getPosition(
        poolKey.toId(),
        positionId
    );
    
    liquidity = position.liquidity;
}
```

**Important V4 Tracking Notes:**
1. **No Automatic NFT**: Positions aren't automatically NFTs
2. **Salt for Multiple Positions**: Use different salts for multiple positions in same range
3. **Manual Tracking**: Your contract should track position parameters
4. **Optional NFT Wrapper**: Can use separate Position NFT contract if desired

---

#### Increasing Liquidity in Existing Position

**V3 Increase Liquidity:**
```solidity
function increaseLiquidityV3(
    uint256 tokenId,
    uint256 amount0Desired,
    uint256 amount1Desired,
    uint256 amount0Min,
    uint256 amount1Min
) external returns (
    uint128 liquidity,
    uint256 amount0,
    uint256 amount1
) {
    IERC20(token0).transferFrom(msg.sender, address(this), amount0Desired);
    IERC20(token1).transferFrom(msg.sender, address(this), amount1Desired);
    
    IERC20(token0).approve(address(positionManager), amount0Desired);
    IERC20(token1).approve(address(positionManager), amount1Desired);
    
    INonfungiblePositionManager.IncreaseLiquidityParams memory params =
        INonfungiblePositionManager.IncreaseLiquidityParams({
            tokenId: tokenId,
            amount0Desired: amount0Desired,
            amount1Desired: amount1Desired,
            amount0Min: amount0Min,
            amount1Min: amount1Min,
            deadline: block.timestamp
        });
    
    (liquidity, amount0, amount1) = positionManager.increaseLiquidity(params);
}
```

**V4 Increase Liquidity:**
```solidity
// V4: Just call addLiquidityV4 with same tickLower, tickUpper, and salt
// The liquidity will be added to the existing position

function increaseLiquidityV4(
    PoolKey memory poolKey,
    int24 tickLower,
    int24 tickUpper,
    bytes32 salt,  // Must match original position
    uint256 additionalLiquidity,
    uint256 amount0Max,
    uint256 amount1Max
) external returns (uint256 amount0, uint256 amount1) {
    // Same as addLiquidityV4, but using existing position parameters
    // PoolManager automatically adds to existing position with matching salt
    
    IPoolManager.ModifyLiquidityParams memory params =
        IPoolManager.ModifyLiquidityParams({
            tickLower: tickLower,
            tickUpper: tickUpper,
            liquidityDelta: int256(additionalLiquidity),
            salt: salt  // Same salt = same position
        });
    
    // Execute through standard add liquidity flow
    // ...
}
```

---

#### Complete Liquidity Manager Example

```solidity
contract CompleteLiquidityManagerV4 is IUnlockCallback {
    IPoolManager public immutable poolManager;
    
    // Track user positions
    struct PositionInfo {
        PoolKey poolKey;
        int24 tickLower;
        int24 tickUpper;
        bytes32 salt;
        uint128 liquidity;
    }
    
    mapping(address => PositionInfo[]) public userPositions;
    
    constructor(address _poolManager) {
        poolManager = IPoolManager(_poolManager);
    }
    
    // Unified callback router
    enum CallbackType {
        ADD_LIQUIDITY,
        REMOVE_LIQUIDITY,
        COLLECT_FEES
    }
    
    struct CallbackData {
        CallbackType callbackType;
        bytes data;
    }
    
    function unlockCallback(bytes calldata rawData) 
        external 
        returns (bytes memory) 
    {
        require(msg.sender == address(poolManager), "Not PoolManager");
        
        CallbackData memory callback = abi.decode(rawData, (CallbackData));
        
        if (callback.callbackType == CallbackType.ADD_LIQUIDITY) {
            return handleAddLiquidity(callback.data);
        } else if (callback.callbackType == CallbackType.REMOVE_LIQUIDITY) {
            return handleRemoveLiquidity(callback.data);
        } else if (callback.callbackType == CallbackType.COLLECT_FEES) {
            return handleCollectFees(callback.data);
        }
        
        revert("Invalid callback type");
    }
    
    function handleAddLiquidity(bytes memory data) 
        private 
        returns (bytes memory) 
    {
        // Implementation from earlier examples
        // ...
    }
    
    function handleRemoveLiquidity(bytes memory data) 
        private 
        returns (bytes memory) 
    {
        // Implementation from earlier examples
        // ...
    }
    
    function handleCollectFees(bytes memory data) 
        private 
        returns (bytes memory) 
    {
        // Implementation from earlier examples
        // ...
    }
}
```

---

#### Migration Checklist for Liquidity Management

When migrating liquidity functionality:

- [ ] Replace `INonfungiblePositionManager` with `IPoolManager`
- [ ] Implement `IUnlockCallback` interface
- [ ] Convert position tracking from tokenId to position hash
- [ ] Update liquidity calculations to use `liquidityDelta` directly
- [ ] Implement position tracking system (positions not auto-NFTs)
- [ ] Update fee collection to use zero-delta modification
- [ ] Add salt parameter for position identification
- [ ] Handle native ETH in settlement logic
- [ ] Update increase/decrease liquidity functions
- [ ] Implement proper callback routing for different operations
- [ ] Test position lifecycle (create, modify, remove, collect)
- [ ] Verify slippage protection works correctly
- [ ] Consider implementing optional NFT wrapper if needed

---

*Continue to [Position Management](#position-management) for advanced position handling patterns.*
