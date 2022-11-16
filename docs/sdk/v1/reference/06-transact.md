---
id: transact
title: Transact
---

# getExecutionDetails

The function formats trade data for execution against the relevant Uniswap exchange.

## Function Signature

```typescript
export function getExecutionDetails(
  trade: TradeDetails,
  maxSlippage?: number,
  deadline?: number,
  recipient?: string
): ExecutionDetails
```

## Input Parameters

| Parameter    | Type           | Description                                                             |
| :----------- | :------------- | :---------------------------------------------------------------------- |
| trade        | `TradeDetails` | The trade to execute.                                                   |
| maxSlippage? | `number`       | The maximum slippage to allow, in basis points. Defaults to 200 \(2%\). |
| deadline?    | `number`       | When the transaction will expire. Defaults to 10 minutes in the future. |
| recipient?   | `number`       | An optional recipient address. Defaults to the `msg.sender`             |

## Example Usage

Method arguments are returned as one of: `BigNumber`, `number`, or `string`. `BigNumber`s are large number objects, `numbers` are small numbers in base 10, and `string`s are addresses.

```typescript
const tradeDetails: TradeDetails = tradeExactEthForTokensWithData(reserves, '1000000000000000000')

const executionDetails: ExecutionDetails = await getExecutionDetails(tradeDetails)

/*
{
  // the address of the relevant exchange
  exchangeAddress: 0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14,

  // the name of the method that must be called
  methodName: "ethToTokenSwapInput",

  // the id of the method name
  methodId: "0xf39b5b9b",

  // the ether value that must be sent with the transaction
  value: <BigNumber>,

  // method arguments as an array
  methodArguments: MethodArgument[]
}
*/
```
