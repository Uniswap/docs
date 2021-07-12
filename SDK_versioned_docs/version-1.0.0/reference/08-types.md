---
id: types
title: Types
---

Below is an exhaustive list of all the external types used in the SDK.

```typescript
import BigNumber from "bignumber.js";
import { ethers } from "ethers";

import {
  SUPPORTED_CHAIN_ID,
  TRADE_TYPE,
  TRADE_EXACT,
  FIXED_UNDERFLOW_BEHAVIOR,
} from "./constants";

export type BigNumberish = BigNumber | ethers.utils.BigNumber | string | number;

//// types for on-chain, submitted, and normalized data
export type ChainIdOrProvider =
  | SUPPORTED_CHAIN_ID
  | ethers.providers.AsyncSendable
  | ethers.providers.Provider;

// type guard for ChainIdOrProvider
export function isChainId(
  chainIdOrProvider: ChainIdOrProvider
): chainIdOrProvider is SUPPORTED_CHAIN_ID {
  const chainId: SUPPORTED_CHAIN_ID = chainIdOrProvider as SUPPORTED_CHAIN_ID;
  return typeof chainId === "number";
}

// type guard for ChainIdOrProvider
export function isLowLevelProvider(
  chainIdOrProvider: ChainIdOrProvider
): chainIdOrProvider is ethers.providers.AsyncSendable {
  if (isChainId(chainIdOrProvider)) {
    return false;
  } else {
    const provider: ethers.providers.AsyncSendable =
      chainIdOrProvider as ethers.providers.AsyncSendable;
    return "send" in provider || "sendAsync" in provider;
  }
}

export interface Token {
  chainId?: SUPPORTED_CHAIN_ID;
  address?: string;
  decimals: number;
}

export interface TokenAmount {
  token: Token;
  amount: BigNumberish;
}

export interface TokenAmountNormalized {
  token: Token;
  amount: BigNumber;
}

export interface TokenReserves {
  token: Token;
  exchange?: Token;
  ethReserve: TokenAmount;
  tokenReserve: TokenAmount;
}

export interface TokenReservesNormalized {
  token: Token;
  exchange?: Token;
  ethReserve: TokenAmountNormalized;
  tokenReserve: TokenAmountNormalized;
}

export interface EthReserves {
  token: Token;
}

// type for input data
export type OptionalReserves = TokenReserves | EthReserves | undefined;

// type guard for OptionalReserves
export function areTokenReserves(
  reserves: OptionalReserves
): reserves is TokenReserves {
  const tokenReserves: TokenReserves = reserves as TokenReserves;
  return (
    tokenReserves !== undefined &&
    tokenReserves.ethReserve !== undefined &&
    tokenReserves.tokenReserve !== undefined
  );
}

// type guard for OptionalReserves
export function areETHReserves(
  reserves: OptionalReserves
): reserves is EthReserves {
  const tokenReserves: TokenReserves = reserves as TokenReserves;
  return (
    tokenReserves !== undefined &&
    tokenReserves.ethReserve === undefined &&
    tokenReserves.tokenReserve === undefined
  );
}

// type for output data
export type NormalizedReserves = TokenReservesNormalized | EthReserves;

// type guard for NormalizedReserves
export function areTokenReservesNormalized(
  reserves: NormalizedReserves
): reserves is TokenReservesNormalized {
  const tokenReservesNormalized: TokenReservesNormalized =
    reserves as TokenReservesNormalized;
  return (
    tokenReservesNormalized.ethReserve !== undefined &&
    tokenReservesNormalized.tokenReserve !== undefined
  );
}

//// types for computed data
export interface Rate {
  rate: BigNumber;
  rateInverted: BigNumber;
}
export interface MarketDetails {
  tradeType: TRADE_TYPE;
  inputReserves: NormalizedReserves;
  outputReserves: NormalizedReserves;
  marketRate: Rate;
}

export interface TradeDetails {
  marketDetailsPre: MarketDetails;
  marketDetailsPost: MarketDetails;
  tradeType: TRADE_TYPE;
  tradeExact: TRADE_EXACT;
  inputAmount: TokenAmountNormalized;
  outputAmount: TokenAmountNormalized;
  executionRate: Rate;
  marketRateSlippage: BigNumber;
  executionRateSlippage: BigNumber;
}

export type MethodArgument = BigNumber | number | string;

export interface ExecutionDetails {
  exchangeAddress: string;
  methodName: string;
  methodId: string;
  value: BigNumber;
  methodArguments: MethodArgument[];
}

//// types for formatting data
export type FlexibleFormat = BigNumber.Format | boolean;

// type guard for FlexibleFormat
export function isFormat(
  flexibleFormat: FlexibleFormat
): flexibleFormat is BigNumber.Format {
  const format: BigNumber.Format = flexibleFormat as BigNumber.Format;
  return typeof format !== "boolean";
}

export interface FormatSignificantOptions {
  significantDigits: number;
  roundingMode: BigNumber.RoundingMode;
  forceIntegerSignificance: boolean;
  format: FlexibleFormat;
}

export interface FormatFixedOptions {
  decimalPlaces: number;
  roundingMode: BigNumber.RoundingMode;
  dropTrailingZeros: boolean;
  underflowBehavior: FIXED_UNDERFLOW_BEHAVIOR;
  format: FlexibleFormat;
}
```
