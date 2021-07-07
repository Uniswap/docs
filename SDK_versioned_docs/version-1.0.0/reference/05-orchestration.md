---
id: orchestration
title: Orchestration
---

Orchestration functions are plain-english wrappers for the function defined in [/sdk/1.0.0/reference/data](Data) and [Computation](/sdk/1.0.0/reference/computation).

Functions suffixed with `WithData` are synchronous, and require token reserves to be passed in as arguments. Functions without the suffix are asychronous, and require token addresses to be passed in as arguments.

# tradeExactEthForTokensWithData

The function facilitates trading an exact amount of ETH for a specified token.

## Function Signature

```typescript
export function tradeExactEthForTokensWithData(
  reserves: OptionalReserves,
  ethAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter | Type               | Description                         |
| :-------- | :----------------- | :---------------------------------- |
| reserves  | `OptionalReserves` | Reserves data for the output token. |
| ethAmount | `BigNumberish`     | The input amount of ETH.            |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeExactEthForTokensWithData(
  reserves,
  "1000000000000000000"
);
```

# tradeExactEthForTokens

The function facilitates trading an exact amount of ETH for a specified token.

## Function Signature

```typescript
export async function tradeExactEthForTokens(
  tokenAddress: string,
  ethAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress       | `string`            | Address of output token.                                                                                                                                                                                                               |
| ethAmount          | `BigNumberish`      | The input amount of ETH.                                                                                                                                                                                                               |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeExactEthForTokens(
  tokenAddress,
  "1000000000000000000"
);
```

# tradeEthForExactTokensWithData

The function facilitates trading ETH for an exact amount of a specified token.

## Function Signature

```typescript
export function tradeEthForExactTokensWithData(
  reserves: OptionalReserves,
  tokenAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter   | Type               | Description                         |
| :---------- | :----------------- | :---------------------------------- |
| reserves    | `OptionalReserves` | Reserves data for the output token. |
| tokenAmount | `BigNumberish`     | The output amount of tokens.        |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeEthForExactTokensWithData(
  reserves,
  "1000000000000000000"
);
```

# tradeEthForExactTokens

The function facilitates trading ETH for an exact amount of a specified token.

## Function Signature

```typescript
export async function tradeEthForExactTokens(
  tokenAddress: string,
  tokenAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress       | `string`            | Address of output token.                                                                                                                                                                                                               |
| tokenAmount        | `BigNumberish`      | The output amount of tokens.                                                                                                                                                                                                           |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeEthForExactTokens(
  tokenAddress,
  "1000000000000000000"
);
```

# tradeExactTokensForEthWithData

The function facilitates trading an exact amount of a specified token for ETH.

## Function Signature

```typescript
export function tradeExactTokensForEthWithData(
  reserves: OptionalReserves,
  tokenAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter   | Type               | Description                        |
| :---------- | :----------------- | :--------------------------------- |
| reserves    | `OptionalReserves` | Reserves data for the input token. |
| tokenAmount | `BigNumberish`     | The input amount of tokens.        |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeExactTokensForEthWithData(
  reserves,
  "1000000000000000000"
);
```

# tradeExactTokensForEth

The function facilitates trading an exact amount of a specified token for ETH.

## Function Signature

```typescript
export async function tradeExactTokensForEth(
  tokenAddress: string,
  tokenAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress       | `string`            | Address of input token.                                                                                                                                                                                                                |
| tokenAmount        | `BigNumberish`      | The input amount of tokens.                                                                                                                                                                                                            |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeExactTokensForEth(
  tokenAddress,
  "1000000000000000000"
);
```

# tradeTokensForExactEthWithData

The function facilitates trading a specified token for an exact amount of ETH.

## Function Signature

```typescript
export function tradeTokensForExactEthWithData(
  reserves: OptionalReserves,
  ethAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter | Type               | Description                        |
| :-------- | :----------------- | :--------------------------------- |
| reserves  | `OptionalReserves` | Reserves data for the input token. |
| ethAmount | `BigNumberish`     | The outpute amount of ETH.         |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeTokensForExactEthWithData(
  reserves,
  "1000000000000000000"
);
```

# tradeTokensForExactEth

The function facilitates trading a specified token for an exact amount of ETH.

## Function Signature

```typescript
export async function tradeTokensForExactEth(
  tokenAddress: string,
  ethAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress       | `string`            | Address of input token.                                                                                                                                                                                                                |
| ethAmount          | `BigNumberish`      | The output amount of ETH.                                                                                                                                                                                                              |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeTokensForExactEth(
  tokenAddress,
  "1000000000000000000"
);
```

# tradeExactTokensForTokensWithData

The function facilitates trading an exact amount of a specified token for another token.

## Function Signature

```typescript
export function tradeExactTokensForTokensWithData(
  reservesInput: OptionalReserves,
  reservesOutput: OptionalReserves,
  tokenAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter      | Type               | Description                         |
| :------------- | :----------------- | :---------------------------------- |
| reservesInput  | `OptionalReserves` | Reserves data for the input token.  |
| reservesOutput | `OptionalReserves` | Reserves data for the output token. |
| tokenAmount    | `BigNumberish`     | The input amount of tokens.         |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeExactTokensForTokensWithData(
  reservesInput,
  reservesOutput,
  "1000000000000000000"
);
```

# tradeExactTokensForTokens

The function facilitates trading an exact amount of a specified token for another token.

## Function Signature

```typescript
export async function tradeExactTokensForTokens(
  tokenAddressInput: string,
  tokenAddressOutput: string,
  tokenAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddressInput  | `string`            | Address of input token.                                                                                                                                                                                                                |
| tokenAddressOutput | `string`            | Address of output token.                                                                                                                                                                                                               |
| tokenAmount        | `BigNumberish`      | The input amount of tokens.                                                                                                                                                                                                            |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeExactTokensForTokens(
  tokenAddressInput,
  tokenAddressOutput,
  "1000000000000000000"
);
```

# tradeTokensForExactTokensWithData

The function facilitates trading a specified token for an exact amount of another token.

## Function Signature

```typescript
export function tradeTokensForExactTokensWithData(
  reservesInput: OptionalReserves,
  reservesOutput: OptionalReserves,
  tokenAmount: BigNumberish
): TradeDetails;
```

## Input Parameters

| Parameter      | Type               | Description                         |
| :------------- | :----------------- | :---------------------------------- |
| reservesInput  | `OptionalReserves` | Reserves data for the input token.  |
| reservesOutput | `OptionalReserves` | Reserves data for the output token. |
| tokenAmount    | `BigNumberish`     | The output amount of tokens.        |

## Example Usage

```typescript
const tradeDetails: TradeDetails = tradeTokensForExactTokensWithData(
  reservesInput,
  reservesOutput,
  "1000000000000000000"
);
```

# tradeTokensForExactTokens

The function facilitates trading an exact amount of a specified token for another token.

## Function Signature

```typescript
export async function tradeTokensForExactTokens(
  tokenAddressInput: string,
  tokenAddressOutput: string,
  tokenAmount: BigNumberish,
  chainIdOrProvider?: ChainIdOrProvider
): Promise<TradeDetails>;
```

## Input Parameters

| Parameter          | Type                | Description                                                                                                                                                                                                                            |
| :----------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddressInput  | `string`            | Address of input token.                                                                                                                                                                                                                |
| tokenAddressOutput | `string`            | Address of output token.                                                                                                                                                                                                               |
| tokenAmount        | `BigNumberish`      | The output amount of tokens.                                                                                                                                                                                                           |
| chainIdOrProvider? | `ChainIdOrProvider` | A supported chain id \(`1`, `3`, `4`, or `42`\), or an [underlying web3 provider](https://docs.ethers.io/ethers.js/html/api-providers.html#web3provider-inherits-from-jsonrpcprovider) connected to a chain with a supported chain id. |

## Example Usage

```typescript
const tradeDetails: TradeDetails = await tradeTokensForExactTokens(
  tokenAddressInput,
  tokenAddressOutput,
  "1000000000000000000"
);
```
