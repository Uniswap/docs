---
id: modules
title: Type Definitions
---

This page documents the core type definitions and interfaces used throughout the Uniswap SDK Core.

## Core Types

### Currency

Base interface for all currencies (tokens and native currencies).

```typescript
interface Currency {
  readonly isNative: boolean
  readonly isToken: boolean
  readonly chainId: number
  readonly decimals: number
  readonly symbol?: string
  readonly name?: string
}
```

### BigintIsh

Union type for values that can be converted to BigInt.

```typescript
type BigintIsh = JSBI | string | number
```

Used throughout the SDK for numeric inputs that need high precision.

## Utility Types

### TradeType

Enum for specifying trade direction:

```typescript
enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}
```

### Rounding

Enum for mathematical rounding modes:

```typescript
enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}
```

## Chain Support

### ChainId

Supported blockchain networks:

```typescript
enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  CELO = 42220,
  CELO_ALFAJORES = 44787,
  GNOSIS = 100,
  MOONBEAM = 1284,
  BNB = 56,
  AVALANCHE = 43114,
  BASE_GOERLI = 84531,
  BASE = 8453
}
```

## Constants

Key constants used throughout the SDK:

- **`MaxUint256`** - Maximum uint256 value
- **`ZERO`** - BigInt zero value  
- **`ONE`** - BigInt one value
- **`TWO`** - BigInt two value
- **`THREE`** - BigInt three value

## Usage Examples

### Working with Currencies

```typescript
import { Token, Ether } from '@uniswap/sdk-core'

// Native ETH
const ETH = Ether.onChain(1)

// ERC-20 Token
const USDC = new Token(
  1, // chainId
  '0xA0b86a33E6417c29C8F6e3b6E4E12A82aA4Ca8e9', // address
  6, // decimals
  'USDC', // symbol
  'USD Coin' // name
)
```

### Working with Amounts

```typescript
import { CurrencyAmount } from '@uniswap/sdk-core'

const amount = CurrencyAmount.fromRawAmount(USDC, '1000000') // 1 USDC
const readable = amount.toSignificant(6) // "1.000000"
```

For more detailed usage, see the individual class documentation and the [SDK Guides](../../v3/guides/01-background.md).