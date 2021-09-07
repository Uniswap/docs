[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / entities/trade

# Module: entities/trade

## Table of contents

### Classes

- [Trade](../classes/entities_trade.Trade.md)

### Interfaces

- [BestTradeOptions](../interfaces/entities_trade.BestTradeOptions.md)

### Functions

- [tradeComparator](entities_trade.md#tradecomparator)

## Functions

### tradeComparator

▸ **tradeComparator**<`TInput`, `TOutput`, `TTradeType`\>(`a`, `b`): `number`

Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token, either Ether or an ERC-20 |
| `TOutput` | extends `Currency` | The output token, either Ether or an ERC-20 |
| `TTradeType` | extends `TradeType` | The trade type, either exact input or exact output |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Trade`](../classes/entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\> | The first trade to compare |
| `b` | [`Trade`](../classes/entities_trade.Trade.md)<`TInput`, `TOutput`, `TTradeType`\> | The second trade to compare |

#### Returns

`number`

A sorted ordering for two neighboring elements in a trade array

#### Defined in

[entities/trade.ts:16](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/trade.ts#L16)
