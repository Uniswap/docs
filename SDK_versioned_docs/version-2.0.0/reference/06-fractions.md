---
id: fractions
title: Fractions
---

# Fraction

```typescript
constructor(numerator: BigintIsh, denominator: BigintIsh = ONE)
```

The base class which all subsequent fraction classes extend. **Not meant to be used directly.**

## Properties

### numerator

```typescript
numerator: JSBI
```

### denominator

```typescript
denominator: JSBI
```

### quotient

```typescript
quotient: JSBI
```

Performs floor division.

## Methods

### invert

```typescript
invert(): Fraction
```

### add

```typescript
add(other: Fraction | BigintIsh): Fraction
```

### subtract

```typescript
subtract(other: Fraction | BigintIsh): Fraction
```

### multiply

```typescript
multiply(other: Fraction | BigintIsh): Fraction
```

### divide

```typescript
divide(other: Fraction | BigintIsh): Fraction
```

### toSignificant

```typescript
toSignificant(
  significantDigits: number,
  format: object = { groupSeparator: '' },
  rounding: Rounding = Rounding.ROUND_HALF_UP
): string
```

Formats a fraction to the specified number of significant digits.

- For format options, see [toFormat](https://github.com/MikeMcl/toFormat).

### toFixed

```typescript
toFixed(
  decimalPlaces: number,
  format: object = { groupSeparator: '' },
  rounding: Rounding = Rounding.ROUND_HALF_UP
): string
```

Formats a fraction to the specified number of decimal places.

- For format options, see [toFormat](https://github.com/MikeMcl/toFormat).

# Percent

Responsible for formatting percentages (10% instead of 0.1).

## Example

```typescript
import { Percent } from '@uniswap/sdk'

const percent = new Percent('60', '100')
console.log(percent.toSignificant(2)) // 60
```

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).

# TokenAmount

```typescript
constructor(token: Token, amount: BigintIsh)
```

Responsible for formatting token amounts with specific decimal places.

## Example

```typescript
import { Token, TokenAmount } from '@uniswap/sdk'

const FRIED = new Token(ChainId.MAINNET, '0xfa1aFe1000000000000000000000000000000000', 18, 'FRIED', 'Beans')

const tokenAmount = new TokenAmount(FRIED, '3000000000000000000')
console.log(tokenAmount.toExact()) // 3
```

## Properties

### token

```typescript
token: Token
```

### raw

```typescript
raw: JSBI
```

Returns the full token amount, unadjusted for decimals.

## Methods

### add

```typescript
add(other: TokenAmount): TokenAmount
```

### subtract

```typescript
subtract(other: TokenAmount): TokenAmount
```

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).

### toExact

```typescript
toExact(format: object = { groupSeparator: '' }): string
```

# Price

```typescript
constructor(baseToken: Token, quoteToken: Token, denominator: BigintIsh, numerator: BigintIsh)
```

Responsible for denominating the relative price between two tokens. Denominator and numerator must be unadjusted for decimals.

## Example

```typescript
import { ChainId, WETH as WETHs, Token, Price } from '@uniswap/sdk'

const WETH = WETHs[ChainId.MAINNET]
const ABC = new Token(ChainId.MAINNET, '0xabc0000000000000000000000000000000000000', 18, 'ABC')

const price = new Price(WETH, ABC, '1000000000000000000', '123000000000000000000')
console.log(price.toSignificant(3)) // 123
```

This example shows the ETH/XYZ price, where ETH is the base token, and XYZ is the quote token. The price is constructed from an amount of XYZ (the numerator) / an amount of WETH (the denominator).

## Static Methods

### fromRoute

```typescript
fromRoute(route: Route): Price
```

## Properties

### baseToken

```typescript
baseToken: Token
```

### quoteToken

```typescript
quoteToken: Token
```

### scalar

```typescript
scalar: Fraction
```

Used to adjust the price for the decimals of the base and quote tokens.

### raw

```typescript
raw: Fraction
```

Returns the raw price, unadjusted for decimals.

### adjusted

```typescript
adjusted: Fraction
```

Returns the price, adjusted for decimals.

## Methods

### invert

```typescript
invert(): Price
```

### multiply

```typescript
multiply(other: Price): Price
```

### quote

```typescript
quote(tokenAmount: TokenAmount): TokenAmount
```

Given an asset amount, returns an equivalent value of the other asset, according to the current price.

### toSignificant

See [toSignificant](#tosignificant).

### toFixed

See [toFixed](#tofixed).
