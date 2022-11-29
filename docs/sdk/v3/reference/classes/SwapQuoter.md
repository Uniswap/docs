[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / SwapQuoter

# Class: SwapQuoter

Represents the Uniswap V3 QuoterV1 contract with a method for returning the formatted
calldata needed to call the quoter contract.

## Table of contents

### Constructors

- [constructor](SwapQuoter.md#constructor)

### Properties

- [V1INTERFACE](SwapQuoter.md#v1interface)
- [V2INTERFACE](SwapQuoter.md#v2interface)

### Methods

- [quoteCallParameters](SwapQuoter.md#quotecallparameters)

## Constructors

### constructor

• **new SwapQuoter**()

## Properties

### V1INTERFACE

▪ `Static` **V1INTERFACE**: `Interface`

#### Defined in

[quoter.ts:37](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/quoter.ts#L37)

___

### V2INTERFACE

▪ `Static` **V2INTERFACE**: `Interface`

#### Defined in

[quoter.ts:38](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/quoter.ts#L38)

## Methods

### quoteCallParameters

▸ `Static` **quoteCallParameters**<`TInput`, `TOutput`\>(`route`, `amount`, `tradeType`, `options?`): [`MethodParameters`](../interfaces/MethodParameters.md)

Produces the on-chain method name of the appropriate function within QuoterV2,
and the relevant hex encoded parameters.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](Route.md)<`TInput`, `TOutput`\> | The swap route, a list of pools through which a swap can occur |
| `amount` | `CurrencyAmount`<`TInput` \| `TOutput`\> | The amount of the quote, either an amount in, or an amount out |
| `tradeType` | `TradeType` | The trade type, either exact input or exact output |
| `options` | [`QuoteOptions`](../interfaces/QuoteOptions.md) | The optional params including price limit and Quoter contract switch |

#### Returns

[`MethodParameters`](../interfaces/MethodParameters.md)

The formatted calldata

#### Defined in

[quoter.ts:51](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/quoter.ts#L51)
