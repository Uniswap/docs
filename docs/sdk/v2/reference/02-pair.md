---
id: pair
title: Pair
---

```typescript
constructor(tokenAmountA: CurrencyAmount, tokenAmountB: CurrencyAmount)
```

The Pair entity represents a Uniswap pair with a balance of each of its pair tokens.

# Example

```typescript
import { Pair } from '@uniswap/sdk-core'
import {ChainId, Token, CurrencyAmount } from '@uniswap/v2-sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')

const pair = new Pair(CurrencyAmount.fromRawAmount(HOT, '2000000000000000000'), CurrencyAmount.fromRawAmount(NOT, '1000000000000000000'))
```

# Static Methods

## getAddress

```typescript
getAddress(tokenA: Token, tokenB: Token): string
```

Computes the pair address for the passed [Tokens](token). See [Pair Addresses](../../../contracts/v2/guides/smart-contract-integration/getting-pair-addresses).

# Properties

## liquidityToken

```typescript
liquidityToken: Token
```

A Token representing the liquidity token for the pair. See [Pair (ERC-20)](../../../contracts/v2/reference/smart-contracts/pair-erc-20).

## token0

```typescript
token0: Token
```

See [Token0](../../../contracts/v2/reference/smart-contracts/pair#token0).

## token1

```typescript
token1: Token
```

See [Token1](../../../contracts/v2/reference/smart-contracts/pair#token1).

## reserve0

```typescript
reserve0: CurrencyAmount
```

The reserve of token0.

## reserve1

```typescript
reserve1: CurrencyAmount
```

The reserve of token1.

# Methods

## reserveOf

```typescript
reserveOf(token: Token): CurrencyAmount
```

Returns reserve0 or reserve1, depending on whether token0 or token1 is passed in.

## getOutputAmount

```typescript
getOutputAmount(inputAmount: CurrencyAmount): [CurrencyAmount, Pair]
```

Pricing function for exact input amounts. Returns maximum output amount based on current reserves and the new Pair that would exist if the trade were executed.

## getInputAmount

```typescript
getInputAmount(outputAmount: CurrencyAmount): [CurrencyAmount, Pair]
```

Pricing function for exact output amounts. Returns minimum input amount based on current reserves and the new Pair that would exist if the trade were executed.

## getLiquidityMinted

```typescript
getLiquidityMinted(totalSupply: CurrencyAmount, tokenAmountA: CurrencyAmount, tokenAmountB: CurrencyAmount): CurrencyAmount
```

Calculates the exact amount of liquidity tokens minted from a given amount of token0 and token1.

- totalSupply must be looked up on-chain.
- The value returned from this function _cannot_ be used as an input to getLiquidityValue.

## getLiquidityValue

```typescript
getLiquidityValue(
  token: Token,
  totalSupply: CurrencyAmount,
  liquidity: CurrencyAmount,
  feeOn: boolean = false,
  kLast?: BigintIsh
): CurrencyAmount
```

Calculates the exact amount of token0 or token1 that the given amount of liquidity tokens represent.

- totalSupply must be looked up on-chain.
- If the protocol charge is on, feeOn must be set to true, and kLast must be provided from an on-chain lookup.
- Values returned from this function _cannot_ be used as inputs to getLiquidityMinted.
