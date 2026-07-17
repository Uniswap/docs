---
id: computation
title: Computation
---

## getMarketDetails

This function computes market details for the passed reserves data. Markets are defined as ETH&lt;&gt;ERC20, ERC20&lt;&gt;ETH, or ERC20&lt;&gt;ERC20 pairs, where the first currency is the input and the second is the output. Reserves must be specified for both the input and output currency.

- In the case of ETH, `undefined` should be passed as the reserves data. [`getTokenReserves`](/sdk/1.0.0/reference/data/#getttokenreserves) formatted ERC20 reserves, or the requisite data can be fetched manually and passed in.

- Rates are calculated to 18 decimal places of precision.

### Function Signature

```typescript
export function getMarketDetails(
  optionalReservesInput: OptionalReserves,
  optionalReservesOutput: OptionalReserves
): MarketDetails
```

### Input Parameters

| Parameter              | Type               | Description                            |
| :--------------------- | :----------------- | :------------------------------------- |
| optionalReservesInput  | `OptionalReserves` | Reserves data for the input currency.  |
| optionalReservesOutput | `OptionalReserves` | Reserves data for the output currency. |

### Example Usage

```typescript
const reserves: ChainIdOrProvider = await getTokenReserves(tokenAddress)

const marketDetails: MarketDetails = getMarketDetails(undefined, reserves) // ETH<>ERC20

/*
{
  // market type
  tradeType: 'ETH_TO_TOKEN',

  // dummy ETH reserves
  inputReserves: {
    token: {
      chainId: 1,
      address: 'ETH',
      decimals: 18
    }
  },

  // normalized token reserves
  outputReserves: <NormalizedReserves>,

  // market rate calculated to 18 decimals of precision
  marketRate: {
    rate: <BigNumber>,        // x output / 1 input
    rateInverted: <BigNumber> // x input / 1 output
  }
}
*/
```

## getTradeDetails

This function computes trade details for the passed market data.

-This function throws an error if the passed \_tradeAmount is greater than the amount of ETH/tokens in the relevant Uniswap exchange.

- Trade amounts must be passed in non-decimal form \(where e.g. 1 ETH is represented as 1000000000000000000 wei\).

### Function Signature

```typescript
export function getTradeDetails(
  tradeExact: TRADE_EXACT,
  _tradeAmount: BigNumberish,
  marketDetails: MarketDetails
): TradeDetails
```

### Input Parameters

| Parameter     | Type            | Description                                                                      |
| :------------ | :-------------- | :------------------------------------------------------------------------------- |
| tradeExact    | `TRADE_EXACT`   | Whether either the input or the output currency is the exact amount.             |
| \_tradeAmount | `BigNumberish`  | The amount to buy/sell \(of the output/input currency, depending on tradeExact\) |
| marketDetails | `MarketDetails` | Market details.                                                                  |

### Example Usage

```typescript
const _purchaseAmount: BigNumber = new BigNumber('2.5')
const _decimals: number = 18
const tradeAmount: BigNumber = _purchaseAmount.multipliedBy(10 ** _decimals)
const marketDetails: MarketDetails = getMarketDetails(undefined, reserves) // ETH<>ERC20

// buy exactly 2.5 of an 18 decimal ERC20 with ETH
const tradeDetails: TradeDetails = getTradeDetails(TRADE_EXACT.OUTPUT, tradeAmount, marketDetails)

/*
{
  marketDetailsPre: <MarketDetails>,

  marketDetailsPost: <MarketDetails>,

  tradeType: 'ETH_TO_TOKEN',

  tradeExact: 'OUTPUT',

  inputAmount: {
    token: <Token>,
    amount: <BigNumber>
  },

  outputAmount: {
    token: <Token>,
    amount: <BigNumber>
  },

  // execution rate calculated to 18 decimals of precision
  executionRate: {
    rate: <BigNumber>         // x output / 1 input
    rateInverted: <BigNumber> // x input / 1 output
  },

  // slippage between the pre- and post-trade market rates, in basis points, calculated to 18 decimals of precision
  marketRateSlippage: <BigNumber>,

  // slippage between the execution and pre-trade market rate, in basis points, calculated to 18 decimals of precision
  executionRateSlippage: <BigNumber>
}
*/
```
