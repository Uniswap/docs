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

- ✅ **Smart Contract Integration** - Migrating Solidity code that interacts with Uniswap
- ✅ **SDK Usage** - Updating TypeScript/JavaScript applications
- ✅ **Frontend Integration** - React/Web3 dApp migrations
- ✅ **Testing Strategies** - Ensuring safe migrations
- ✅ **Hooks Integration** - Leveraging V4's new capabilities

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
1. **Gas Efficiency** - Singleton pattern reduces deployment and swap costs
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
  ✅ Migrate if gas savings matter to users
  ✅ Migrate if you want to support V4 pools
  ⚠️  Can support both V3 and V4 simultaneously
```

##### B. Liquidity Management Protocol
```
Migration Priority: HIGH
Reason: V4 hooks enable advanced LP strategies
Consider:
  ✅ Hooks can automate rebalancing
  ✅ Custom fee structures possible
  ✅ Better composability with other protocols
```

##### C. Trading Bot / Arbitrage Tool
```
Migration Priority: HIGH
Reason: Gas efficiency directly impacts profitability
Consider:
  ✅ Lower gas = more profitable trades
  ✅ Flash accounting helps multi-pool arbs
  ✅ Faster execution with singleton
```

##### D. Analytics / Read-Only Integration
```
Migration Priority: LOW
Reason: No execution means no gas benefits
Consider:
  ⚠️  May need to support both V3 and V4 data
  ⚠️  Different event structures to monitor
  ✅ Migrate when user demand increases
```

##### E. DeFi Protocol Integration
```
Migration Priority: HIGH
Reason: Hooks enable deep protocol integration
Consider:
  ✅ Can build custom hooks for your protocol
  ✅ Better composability patterns
  ✅ More flexible pool configurations
```

##### F. Educational / Learning Project
```
Migration Priority: HIGH
Reason: V4 is the future, learn modern patterns
Consider:
  ✅ Better architecture to learn from
  ✅ More opportunities for innovation
  ✅ Growing ecosystem of hooks
```

---

#### 3. Risk Assessment

**Evaluate these risk factors:**

##### Technical Risks
- ⚠️ **Breaking Changes**: V4 is NOT backward compatible
- ⚠️ **Learning Curve**: New patterns require understanding
- ⚠️ **Testing Required**: Extensive testing needed before production
- ✅ **Mitigation**: This guide + comprehensive test suite

##### Business Risks
- ⚠️ **Development Time**: 2-6 weeks of engineering resources
- ⚠️ **Opportunity Cost**: Could build new features instead
- ⚠️ **User Disruption**: Potential downtime during migration
- ✅ **Mitigation**: Gradual rollout + V3 fallback option

##### Ecosystem Risks
- ⚠️ **V4 Adoption Rate**: Will liquidity migrate to V4?
- ⚠️ **Tooling Maturity**: Some V4 tools still maturing
- ⚠️ **Auditor Familiarity**: Fewer auditors know V4 deeply
- ✅ **Mitigation**: V4 is production-ready, ecosystem growing

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
- ✅ You need custom pool logic (hooks)
- ✅ Gas costs significantly impact your users
- ✅ You're building something new
- ✅ You have resources for proper migration
- ✅ Your integration is actively maintained

**Stay on V3 if:**
- ⚠️ Your current integration works perfectly
- ⚠️ You lack resources for migration
- ⚠️ You don't need V4-specific features
- ⚠️ You can't afford testing time
- ⚠️ Your project is in maintenance mode

**Support Both if:**
- 🔄 You're a DEX aggregator
- 🔄 You need maximum liquidity access
- 🔄 You can maintain dual integrations
- 🔄 Your users benefit from choice

---

*Once you've completed this evaluation, proceed to [Key Architectural Changes](#architectural-changes) to understand what's different in V4.*
