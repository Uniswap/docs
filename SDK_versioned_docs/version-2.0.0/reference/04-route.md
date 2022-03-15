---
id: route
title: Route
---

```typescript
constructor(pairs: Pair[], input: Token)
```

The Route entity represents one or more ordered Uniswap pairs with a fully specified path from input token to output token.

# Example

```typescript
import { ChainId, Token, TokenAmount, Pair, Route } from "@uniswap/sdk";

const HOT = new Token(
  ChainId.MAINNET,
  "0xc0FFee0000000000000000000000000000000000",
  18,
  "HOT",
  "Caffeine"
);
const NOT = new Token(
  ChainId.MAINNET,
  "0xDeCAf00000000000000000000000000000000000",
  18,
  "NOT",
  "Caffeine"
);
const HOT_NOT = new Pair(
  new TokenAmount(HOT, "2000000000000000000"),
  new TokenAmount(NOT, "1000000000000000000")
);

const route = new Route([HOT_NOT], NOT);
```

# Properties

## pairs

```typescript
pairs: Pair[]
```

The ordered pairs that the route is comprised of.

## path

```typescript
path: Token[]
```

The full path from input token to output token.

## input

```typescript
input: string;
```

The input token.

## output

```typescript
output: string;
```

The output token.

## midPrice

```typescript
midPrice: Price;
```

Returns the current mid price along the route.
