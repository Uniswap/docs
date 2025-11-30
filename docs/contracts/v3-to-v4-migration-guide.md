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
