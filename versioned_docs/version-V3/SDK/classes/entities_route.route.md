---
id: Route
title: Route
---

# Route

Represents a list of pools through which a swap can occur

## Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

## Constructors

### constructor

\+ **new Route**<TInput, TOutput\>(`pools`: [*Pool*](entities_pool.pool.md)[], `input`: TInput, `output`: TOutput): [*Route*](entities_route.route.md)<TInput, TOutput\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | Currency |
| `TOutput` | Currency |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pools` | [*Pool*](entities_pool.pool.md)[] |
| `input` | TInput |
| `output` | TOutput |

**Returns:** [*Route*](entities_route.route.md)<TInput, TOutput\>

Defined in: [entities/route.ts:15](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L15)

## Properties

### input

• `Readonly` **input**: TInput

Defined in: [entities/route.ts:12](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L12)

___

### output

• `Readonly` **output**: TOutput

Defined in: [entities/route.ts:13](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L13)

___

### pools

• `Readonly` **pools**: [*Pool*](entities_pool.pool.md)[]

Defined in: [entities/route.ts:10](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L10)

___

### tokenPath

• `Readonly` **tokenPath**: *Token*[]

Defined in: [entities/route.ts:11](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L11)

## Accessors

### chainId

• get **chainId**(): *number*

**Returns:** *number*

Defined in: [entities/route.ts:46](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L46)

___

### inputToken

• get **inputToken**(): *Token*

Returns the token representation of the input currency. If the input currency is Ether, returns the wrapped ether token.

**Returns:** *Token*

Defined in: [entities/route.ts:53](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L53)

___

### midPrice

• get **midPrice**(): *Price*<TInput, TOutput\>

Returns the mid price of the route

**Returns:** *Price*<TInput, TOutput\>

Defined in: [entities/route.ts:67](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L67)

___

### outputToken

• get **outputToken**(): *Token*

Returns the token representation of the output currency. If the output currency is Ether, returns the wrapped ether token.

**Returns:** *Token*

Defined in: [entities/route.ts:60](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/entities/route.ts#L60)
