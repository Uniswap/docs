---
id: route
title: Route
---

```typescript
constructor(pairs: Pair[], input: Token, output: Token)
```

The Route entity represents one or more ordered Uniswap pairs with a fully specified path from input token to output token.

## Example

```typescript
import { ChainId, Token, CurrencyAmount } from '@uniswap/sdk-core'
import { Pair, Route } from '@uniswap/v2-sdk'

const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
const HOT_NOT = new Pair(CurrencyAmount.fromRawAmount(HOT, '2000000000000000000'), CurrencyAmount.fromRawAmount(NOT, '1000000000000000000'))

const route = new Route([HOT_NOT], NOT, HOT)
```

## Properties

### pairs

```typescript
pairs: Pair[]
```

The ordered pairs that the route is comprised of.

### path

```typescript
path: Token[]
```

The full path from input token to output token.

### input

```typescript
input: Token
```

The input token.

### output

```typescript
output: Token
```

The output token.

### midPrice

```typescript
midPrice: Price
```

Returns the current mid price along the route.
