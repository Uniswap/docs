---
id: integration-guide
sidebar_position: 2
title: Integration Guide
---

# Trading API Integration Guide

This guide provides comprehensive documentation for integrating with the Uniswap Trading API, including schema definitions, validation requirements, error handling, and best practices.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Schema Reference](#schema-reference)
- [Permit2 Flow](#permit2-flow)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## API Endpoints

### POST /quote

Generate a quote for a token swap.

**Request Body:**

```typescript
interface QuoteRequest {
  // Required
  tokenIn: string;           // Token address to swap from
  tokenOut: string;          // Token address to swap to
  tokenInChainId: number;    // Chain ID for input token
  tokenOutChainId: number;   // Chain ID for output token
  type: 'EXACT_INPUT' | 'EXACT_OUTPUT';
  amount: string;            // Amount in token's smallest unit (wei)
  swapper: string;           // User's wallet address

  // Slippage (choose one, mutually exclusive)
  slippageTolerance?: number;      // Manual slippage as percentage (e.g., 0.5 = 0.5%)
  autoSlippage?: 'DEFAULT';        // Automatic slippage calculation

  // Optional
  protocols?: Protocol[];          // Limit to specific protocols
  routingPreference?: RoutingPreference;
  urgency?: 'urgent' | 'normal';
  permitAmount?: 'FULL' | 'EXACT';
  gasStrategies?: GasStrategy[];
}
```

**Response:**

```typescript
interface QuoteResponse {
  requestId: string;
  routing: SwapType;  // See SwapType enum

  // Quote (one of, depends on routing type)
  classicQuote?: ClassicQuote;
  bridgeQuote?: BridgeQuote;
  dutchLimitQuote?: DutchLimitQuote;
  dutchLimitV2Quote?: DutchLimitV2Quote;
  dutchLimitV3Quote?: DutchLimitV3Quote;
  wrapUnwrapQuote?: WrapUnwrapQuote;
  priorityQuote?: PriorityQuote;
  chainedQuote?: ChainedQuote;

  // Permit data (if permit requested)
  permitSingleData?: PermitSingleData;
  permitTransferFromData?: PermitTransferFromData;

  permitTransaction?: TransactionRequest;
  permitGasFee?: string;
}
```

### POST /swap

Convert a quote into an unsigned transaction ready for signing.

**Request Body:**

```typescript
interface SwapRequest {
  // Quote (required)
  quote: ClassicQuote | WrapUnwrapQuote | BridgeQuote;

  // Permit2 signature (optional, but both required if either present)
  signature?: string;        // EIP-712 signature for Permit2
  permitData?: PermitSingleData;  // Required if signature provided

  // Optional parameters
  safetyMode?: 'RELAXED' | 'SAFE';
  deadline?: number;         // Unix timestamp
  simulateTransaction?: boolean;
  refreshGasPrice?: boolean;
  urgency?: 'urgent' | 'normal';
  gasStrategies?: GasStrategy[];
}
```

:::warning Important
The `signature` and `permitData` fields must either both be present or both be omitted. See [Permit2 Flow](#permit2-flow) for details.
:::

**Response:**

```typescript
interface SwapResponse {
  requestId: string;
  swap: TransactionRequest;  // Transaction to sign and broadcast
  gasFee?: string;
  gasEstimates?: GasEstimate[];
  txFailureReasons?: TransactionFailureReason[];
}
```

### POST /check_approval

Check if token approval is required before swapping.

**Request Body:**

```typescript
interface CheckApprovalRequest {
  walletAddress: string;
  token: string;
  amount: string;
  chainId: number;
  urgency?: 'urgent' | 'normal';
  includeGasInfo?: boolean;
  tokenOut?: string;
  tokenOutChainId?: number;
}
```

**Response:**

```typescript
interface CheckApprovalResponse {
  requestId: string;
  approval: TransactionRequest;       // Approval transaction (if needed)
  cancel: TransactionRequest;         // Cancel approval transaction
  gasFee?: string;
  cancelGasFee?: string;
  gasEstimates?: GasEstimate[];
}
```

### POST /swap_5792

Generate a batch of transactions for EIP-5792 wallet_sendCalls.

**Request Body:**

```typescript
interface Swap5792Request {
  classicQuote?: ClassicQuote;
  wrapUnwrapQuote?: WrapUnwrapQuote;
  bridgeQuote?: BridgeQuote;
  permitData?: PermitSingleData;
  deadline: number;          // Unix timestamp (required)
  urgency?: 'urgent' | 'normal';
}
```

**Response:**

```typescript
interface Swap5792Response {
  requestId: string;
  from: string;
  chainId: number;
  calls: TransactionRequest5792[];
  gasFee?: string;
  gasEstimates?: GasEstimate[];
}

interface TransactionRequest5792 {
  to: string;
  data: string;
  value: string;
}
```

### POST /swap_7702

Generate a transaction with EIP-7702 delegation.

**Request Body:**

```typescript
interface Swap7702Request {
  classicQuote?: ClassicQuote;
  wrapUnwrapQuote?: WrapUnwrapQuote;
  bridgeQuote?: BridgeQuote;
  smartContractDelegationAddress: string;  // Required
  permitData?: PermitSingleData;
  deadline?: number;
  urgency?: 'urgent' | 'normal';
  gasStrategies?: GasStrategy[];
}
```

### Cross-Chain Plans

For cross-chain swaps (where `tokenInChainId !== tokenOutChainId`):

- **POST /plan** - Create a plan from a CHAINED quote
- **GET /plan/:planId** - Check plan status
- **PATCH /plan/:planId** - Update plan with transaction hashes/signatures

```typescript
// Example: Create cross-chain plan
const quoteResponse = await fetch('/quote', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
    'x-chained-actions-enabled': 'true',  // Required header
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tokenIn: '0x...',
    tokenInChainId: 1,      // Ethereum
    tokenOut: '0x...',
    tokenOutChainId: 8453,  // Base
    // ... other params
  })
});
```

## Schema Reference

### TransactionRequest

The `TransactionRequest` object returned by `/swap` contains all fields needed to broadcast a transaction:

```typescript
interface TransactionRequest {
  to: string;           // Contract address to call
  from: string;         // User's wallet address
  data: string;         // Encoded function call (hex string)
  value: string;        // Native token amount (wei)
  chainId: number;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gasPrice?: string;    // Legacy gas price
}
```

#### Critical Field: `data`

The `data` field contains the encoded contract call and **must always be present** in swap transactions.

:::danger Validation Requirements
1. **Never Empty**: The `data` field must be a non-empty hex string (not `""` or `"0x"`)
2. **Always Validate**: Check `data` exists before broadcasting
3. **Revert Prevention**: Empty `data` causes on-chain transaction reverts
:::

**Validation Example:**

```typescript
function validateTransaction(tx: TransactionRequest): void {
  // Critical validation
  if (!tx.data || tx.data === '' || tx.data === '0x') {
    throw new Error('Transaction data is empty - invalid swap transaction');
  }

  if (!tx.to || !tx.from) {
    throw new Error('Missing required transaction fields');
  }

  // Verify valid hex
  if (!/^0x[0-9a-fA-F]*$/.test(tx.data)) {
    throw new Error('Transaction data is not valid hex');
  }
}

// Use before broadcasting
const swapResponse = await fetch('/swap', {...});
const {swap} = await swapResponse.json();

validateTransaction(swap);  // Validate before signing

const signedTx = await wallet.signTransaction(swap);
const txHash = await provider.sendTransaction(signedTx);
```

### PermitSingleData

For Permit2-based approvals:

```typescript
interface PermitSingleData {
  domain: TypedDataDomain;
  values: PermitSingle;
  types: Record<string, TypedDataField[]>;
}

interface PermitSingle {
  details: {
    token: string;
    amount: string;
    expiration: string;
    nonce: string;
  };
  spender: string;
  sigDeadline: string;
}
```

## Permit2 Flow

Permit2 enables gasless token approvals via EIP-712 signatures.

### When to Use Permit2

Use Permit2 when:
- Swapping ERC-20 tokens (not native tokens)
- User hasn't approved the token for Permit2
- You want to minimize transaction count (1 tx instead of 2)

### Implementation Steps

#### 1. Get Quote with Permit Data

```typescript
const quoteResponse = await fetch('/quote', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tokenIn: '0x...',
    tokenOut: '0x...',
    amount: '1000000',
    type: 'EXACT_INPUT',
    swapper: '0x...',
    tokenInChainId: 1,
    tokenOutChainId: 1,
    permitAmount: 'EXACT',  // or 'FULL'
    slippageTolerance: 0.5
  })
});

const {quote} = await quoteResponse.json();
```

#### 2. Sign the Permit

```typescript
let signature: string | undefined;
let permitData: PermitSingleData | undefined;

if (quote.permitData) {
  signature = await wallet._signTypedData(
    quote.permitData.domain,
    quote.permitData.types,
    quote.permitData.values
  );
  permitData = quote.permitData;
}
```

#### 3. Submit to /swap

:::warning Critical Field Requirements
When including a Permit2 signature, both `signature` AND `permitData` must be provided:
:::

```typescript
// CORRECT - Both fields provided
const swapRequest = {
  classicQuote: quote,
  signature: signature,
  permitData: permitData
};

// WRONG - Missing permitData
const swapRequest = {
  classicQuote: quote,
  signature: signature      // Will fail validation
};

// WRONG - Null permitData
const swapRequest = {
  classicQuote: quote,
  signature: signature,
  permitData: null          // API rejects null, omit field instead
};

// CORRECT - No permit (both fields omitted)
const swapRequest = {
  classicQuote: quote
  // signature and permitData omitted entirely
};
```

**Field Omission Rules:**

1. **If using Permit2**: Include both `signature` and `permitData`
2. **If NOT using Permit2**: Omit both fields entirely (don't set to `null`)
3. **Never mix**: Don't provide one without the other

#### 4. Broadcast Transaction

```typescript
const {swap} = await swapResponse.json();

validateTransaction(swap);

const signedTx = await wallet.signTransaction(swap);
const txReceipt = await provider.sendTransaction(signedTx);
```

### Permit2 Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `"permitData" must be of type object` | Field set to `null` | Omit field entirely |
| `signature provided without permitData` | Missing `permitData` | Include both or neither |
| `Invalid permit signature` | Wrong data signed or expired | Re-request quote and sign fresh |

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Request succeeded |
| 400 | Invalid request (validation error) |
| 401 | Invalid API key |
| 429 | Rate limit exceeded |
| 500 | API error (retry with backoff) |
| 503 | Temporary unavailability (retry) |

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  message: string;
  details?: Record<string, any>;
}
```

### Common Errors

#### NO_QUOTES_AVAILABLE

**Cause**: No route found for the requested swap

**Solutions**:
- Verify token addresses are correct and on the specified chain
- Check sufficient liquidity exists for the trade size
- Try different protocols or routing preferences
- Reduce trade size

#### INSUFFICIENT_RESERVES

**Cause**: Liquidity insufficient for the requested amount

**Solutions**:
- Reduce trade amount
- Split into multiple smaller trades
- Try alternative routing

#### VALIDATION_ERROR

**Cause**: Invalid request parameters

**Solutions**:
- Check all required fields are present
- Verify addresses are valid checksummed addresses
- Ensure amount is in correct units (wei, not ether)
- Validate chain IDs are supported

### Transaction Revert Scenarios

If a transaction reverts on-chain:

1. **Check `data` field**: Verify it's not empty
2. **Verify token balance**: User has sufficient tokens at broadcast time
3. **Check allowance**: Token approval is sufficient (if not using Permit2)
4. **Check slippage**: Price moved beyond slippage tolerance
5. **Check deadline**: Quote expired before broadcast
6. **Nonce collision**: Another transaction used the same nonce

**Recommended Client-Side Checks:**

```typescript
async function validateBeforeBroadcast(
  tx: TransactionRequest,
  provider: Provider,
  token: string,
  amount: string
): Promise<void> {
  // 1. Validate transaction structure
  if (!tx.data || tx.data === '' || tx.data === '0x') {
    throw new Error('Invalid transaction: empty data field');
  }

  // 2. Check native balance
  const balance = await provider.getBalance(tx.from);
  if (balance.lt(tx.value)) {
    throw new Error('Insufficient native token balance');
  }

  // 3. Check ERC-20 balance (if applicable)
  if (token !== NATIVE_TOKEN_ADDRESS) {
    const tokenContract = new Contract(token, ERC20_ABI, provider);
    const tokenBalance = await tokenContract.balanceOf(tx.from);
    if (tokenBalance.lt(amount)) {
      throw new Error('Insufficient token balance');
    }
  }

  // 4. Simulate transaction (optional but recommended)
  try {
    await provider.call(tx);
  } catch (error) {
    throw new Error(`Transaction simulation failed: ${error.message}`);
  }
}
```

## Best Practices

### 1. Quote Freshness

Quotes are time-sensitive due to price volatility:

- **Refresh quotes** if more than 30 seconds old before broadcasting
- **Use `deadline`** parameter to prevent execution of stale quotes
- **Monitor price impact** and warn users of significant changes

```typescript
const QUOTE_EXPIRY_MS = 30000; // 30 seconds

const quoteTimestamp = Date.now();
// ... user reviews and signs ...
if (Date.now() - quoteTimestamp > QUOTE_EXPIRY_MS) {
  quote = await fetchQuote(params);  // Fetch fresh quote
}
```

### 2. Transaction Validation

Always validate transaction payloads before broadcasting:

```typescript
function validateSwapTransaction(tx: TransactionRequest): void {
  if (!tx.data || tx.data === '' || tx.data === '0x') {
    throw new Error('Transaction data is empty');
  }

  if (!tx.to || !isAddress(tx.to)) {
    throw new Error('Invalid recipient address');
  }

  if (!tx.from || !isAddress(tx.from)) {
    throw new Error('Invalid sender address');
  }

  if (tx.maxFeePerGas && tx.gasPrice) {
    throw new Error('Cannot set both maxFeePerGas and gasPrice');
  }

  if (tx.value && BigNumber.from(tx.value).lt(0)) {
    throw new Error('Invalid transaction value');
  }
}
```

### 3. Gas Management

The API provides gas estimates, but clients should:

- **Apply gas buffer**: Add 10-20% to estimated gas limit
- **Update gas prices**: Use `refreshGasPrice: true` for fresh estimates
- **Handle gas spikes**: Warn users when gas is unusually high
- **EIP-1559 vs Legacy**: Use EIP-1559 on supported chains

```typescript
function applyGasBuffer(tx: TransactionRequest): TransactionRequest {
  if (tx.gasLimit) {
    const buffered = BigNumber.from(tx.gasLimit)
      .mul(120)  // 120%
      .div(100);
    return {...tx, gasLimit: buffered.toString()};
  }
  return tx;
}
```

### 4. Slippage Configuration

Balance protection vs execution success:

| Setting | Slippage | Use Case |
|---------|----------|----------|
| Conservative | 0.1-0.5% | Stable pairs, low volatility |
| Moderate | 0.5-1% | Most swaps |
| Aggressive | 1-5% | Large trades, volatile markets, low liquidity |

### 5. Error Recovery

Implement retry logic with exponential backoff:

```typescript
async function fetchQuoteWithRetry(
  params: QuoteRequest,
  maxRetries = 3
): Promise<QuoteResponse> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch('/quote', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        if (response.status === 429) {
          await sleep(Math.pow(2, attempt) * 1000);
          continue;
        }
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      await sleep(Math.pow(2, attempt) * 1000);
    }
  }
  throw new Error('Max retries exceeded');
}
```

### 6. Monitoring & Logging

Track key metrics for production reliability:

```typescript
interface SwapMetrics {
  quoteLatency: number;
  swapLatency: number;
  quoteFreshness: number;
  gasEstimateAccuracy: number;
  revertRate: number;
}

function logSwapAttempt(
  params: QuoteRequest,
  quote: QuoteResponse,
  txHash?: string,
  error?: Error
): void {
  const metrics = {
    timestamp: Date.now(),
    chainId: params.tokenInChainId,
    tokenIn: params.tokenIn,
    tokenOut: params.tokenOut,
    amount: params.amount,
    routing: quote.routing,
    txHash,
    success: !!txHash && !error,
    error: error?.message
  };

  analytics.track('swap_attempt', metrics);
}
```

## Troubleshooting

### Quote Issues

**Problem**: No quotes returned

**Checklist**:
- [ ] Token addresses are valid for the specified chains
- [ ] Liquidity exists for the trading pair
- [ ] Amount is within reasonable bounds
- [ ] Chain IDs are supported by the API
- [ ] Protocols specified (if any) are available

**Problem**: Quote price seems incorrect

**Checklist**:
- [ ] Amount is in correct units (wei, not ether)
- [ ] Token decimals are correct
- [ ] Slippage tolerance is appropriate
- [ ] Price impact is acceptable for trade size

### Transaction Issues

**Problem**: Transaction reverts on-chain

**Checklist**:
- [ ] `data` field is not empty
- [ ] Token balance sufficient at broadcast time
- [ ] Token approval sufficient (if not using Permit2)
- [ ] Quote not expired (deadline not passed)
- [ ] Slippage tolerance not too tight
- [ ] Gas limit sufficient
- [ ] Nonce correct (no collisions)

**Problem**: Transaction takes too long to confirm

**Checklist**:
- [ ] Gas price competitive (use `refreshGasPrice: true`)
- [ ] Network not congested
- [ ] Transaction not stuck (check nonce)

### API Issues

**Problem**: 429 Rate Limit Exceeded

**Solution**: Implement exponential backoff and request caching:

```typescript
const cache = new Map<string, {data: any, timestamp: number}>();

async function fetchWithCache(
  url: string,
  params: any,
  cacheDuration = 30000
): Promise<any> {
  const cacheKey = `${url}:${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.data;
  }

  const data = await fetchWithRetry(url, params);
  cache.set(cacheKey, {data, timestamp: Date.now()});
  return data;
}
```

**Problem**: Inconsistent responses

**Solution**: Include `requestId` in all related requests for debugging:

```typescript
const requestId = generateUUID();

const quote = await fetchQuote({...params, requestId});
const swap = await fetchSwap({classicQuote: quote, requestId});
```

### Integration Issues

**Problem**: Empty `data` field in transaction

**Solution**:
1. Add validation before broadcasting
2. Log the full response for debugging
3. Contact support with `requestId` if persistent

```typescript
const {swap} = await swapResponse.json();

if (!swap.data || swap.data === '' || swap.data === '0x') {
  console.error('Invalid swap response:', {
    requestId: swap.requestId,
    swap
  });
  throw new Error('Empty transaction data - please contact support');
}
```

**Problem**: Permit2 validation errors

**Solution**: Follow exact field requirements:

```typescript
const swapRequest: SwapRequest = {
  classicQuote: quote
};

// Only add permit fields if both are present
if (signature && permitData) {
  swapRequest.signature = signature;
  swapRequest.permitData = permitData;
}
// Otherwise omit entirely (don't set to null)
```

## Limitations

- **UniswapX V2**: Mainnet, Arbitrum, Base, Unichain only
- **UniswapX V3**: Arbitrum only
- **L2 UniswapX minimum**: 300 USDC equivalent
- **Native token swaps**: No UniswapX for native token input or wrapping

## Support

For additional support:

- **Discord**: Join the Uniswap developer community
- **GitHub Issues**: Report bugs and issues

When reporting issues, include:
- Request ID from API response
- Full request/response payloads (sanitize sensitive data)
- Chain ID and transaction hash (if applicable)
- Timestamp of the request
