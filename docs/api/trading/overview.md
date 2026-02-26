---
id: overview
sidebar_position: 1
title: Overview
---

# Trading API

The Uniswap Trading API provides quote generation and transaction building for token swaps across 25+ chains. It handles route optimization, gas estimation, and transaction encoding, while your application manages balances, signing, and transaction broadcasting.

## Get your API key

Create an account in the [Trading API Developer Portal](https://developers.uniswap.org/dashboard/) to generate your API key.

:::info
For complete endpoint coverage, authentication requirements, and implementation patterns, see the [API Integration Guide](https://api-docs.uniswap.org/guides/integration_guide).
:::

## Quick Start

Get started with the Uniswap Agent CLI skill, or send a direct request using the cURL example below.

### Agent CLI

If you are using Agent CLI:

```bash
npx skills add uniswap/uniswap-ai --skill swap-integration
```

### cURL Reference

> Never commit real API keys to the repository. Use environment variables or placeholders.

```bash
curl --request POST \
  --url https://trade-api.gateway.uniswap.org/v1/quote \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_API_KEY' \
  --header 'x-universal-router-version: 2.0' \
  --data '{
  "generatePermitAsTransaction": false,
  "autoSlippage": "DEFAULT",
  "routingPreference": "BEST_PRICE",
  "spreadOptimization": "EXECUTION",
  "urgency": "urgent",
  "permitAmount": "FULL",
  "type": "EXACT_INPUT",
  "amount": "1000000000000000000",
  "tokenInChainId": "1",
  "tokenOutChainId": "1",
  "tokenIn": "0x0000000000000000000000000000000000000000",
  "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "swapper": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
}'
```