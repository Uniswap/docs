---
id: overview
sidebar_position: 1
title: Overview
---

# Trading API

The Uniswap Trading API provides quote generation and transaction building for token swaps across 25+ chains. This API handles route optimization, gas estimation, and transaction encoding - you handle balance checks, transaction signing, and broadcasting.

## Quick Start

### Authentication

All requests require an API key:

```bash
curl -X POST https://trade.api.uniswap.org/v1/quote \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tokenIn":"0x...","tokenOut":"0x...","amount":"1000000",...}'
```

### Basic Quote Request

```typescript
const response = await fetch('https://trade.api.uniswap.org/v1/quote', {
  method: 'POST',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tokenIn: '0x0000000000000000000000000000000000000000', // ETH
    tokenOut: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    tokenInChainId: 1,
    tokenOutChainId: 1,
    type: 'EXACT_INPUT',
    amount: '1000000000000000000', // 1 ETH in wei
    swapper: '0x...', // User's wallet address
    slippageTolerance: 0.5 // 0.5%
  })
});

const quote = await response.json();
```

## Architecture

### Client-Side Responsibilities

The Trading API is a quote and transaction building service. Your application handles:

1. **Balance Checks**: Verify token balances before requesting quotes
2. **Allowance Management**: Check and request token approvals (ERC-20 `approve` or Permit2)
3. **Nonce Management**: Track transaction nonces for the user's wallet
4. **Gas Estimation**: Verify gas estimates before broadcasting
5. **Transaction Broadcasting**: Sign and submit transactions via your RPC provider
6. **Transaction Monitoring**: Track confirmations and handle reverts

### Required Infrastructure

Your integration must include:

- **RPC Provider**: Connection to blockchain nodes (Infura, Alchemy, or self-hosted)
- **Web3 Library**: ethers.js, viem, or web3.js for transaction signing
- **Wallet Integration**: WalletConnect, MetaMask, or similar for user signing

### Data Flow

```
User Request
    |
Your Application
    |-- Check balances (via your RPC)
    |-- Request quote (Trading API)
    |-- Build transaction (Trading API response)
    |-- Check allowances (via your RPC)
    |-- Get user signature (Wallet)
    |-- Manage nonce (your tracking)
    +-- Broadcast transaction (via your RPC)
         |
    Blockchain
```

## Available Endpoints

| Endpoint | Description |
|----------|-------------|
| [POST /quote](./quote) | Generate a quote for a token swap |
| [POST /swap](./swap) | Convert a quote into an unsigned transaction |
| [POST /check_approval](./check-approval) | Check if token approval is required |
| [POST /swap_5792](./swap-5792) | Generate batch transactions for EIP-5792 |
| [POST /swap_7702](./swap-7702) | Generate transaction with EIP-7702 delegation |
| [Cross-Chain Plans](./cross-chain) | Multi-step cross-chain swap endpoints |

## Routing Types

The API returns different quote types based on the optimal routing strategy:

| Value | Type | Description |
|-------|------|-------------|
| 0 | CLASSIC | Standard AMM swap through Uniswap pools |
| 1 | DUTCH_LIMIT | Dutch auction order (UniswapX) |
| 2 | DUTCH_V2 | Dutch auction V2 |
| 3 | LIMIT_ORDER | Limit order |
| 4 | WRAP | ETH to WETH wrap |
| 5 | UNWRAP | WETH to ETH unwrap |
| 6 | BRIDGE | Cross-chain bridge |
| 7 | PRIORITY | MEV-protected priority order |
| 8 | DUTCH_V3 | Dutch auction V3 |
| 9 | QUICKROUTE | Fast approximation quote |
| 10 | CHAINED | Multi-step cross-chain swap |

## Getting Started

1. **Get an API Key**: Contact the Uniswap team to request API access
2. **Set Up Infrastructure**: Configure your RPC provider and wallet integration
3. **Implement the Flow**: Follow the [integration guide](./integration-guide) for step-by-step implementation
4. **Test on Testnet**: Validate your integration before going live

## Next Steps

- [Integration Guide](./integration-guide) - Complete step-by-step implementation guide
- [Quote Endpoint](./quote) - Detailed quote request/response documentation
- [Permit2 Flow](./permit2) - Gasless approvals via EIP-712 signatures
- [Error Handling](./errors) - Common errors and troubleshooting
