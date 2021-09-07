[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [entities/route](../modules/entities_route.md) / Route

# Class: Route<TInput, TOutput\>

[entities/route](../modules/entities_route.md).Route

Represents a list of pools through which a swap can occur

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token |
| `TOutput` | extends `Currency` | The output token |

## Table of contents

### Constructors

- [constructor](entities_route.Route.md#constructor)

### Properties

- [\_midPrice](entities_route.Route.md#_midprice)
- [input](entities_route.Route.md#input)
- [output](entities_route.Route.md#output)
- [pools](entities_route.Route.md#pools)
- [tokenPath](entities_route.Route.md#tokenpath)

### Accessors

- [chainId](entities_route.Route.md#chainid)
- [midPrice](entities_route.Route.md#midprice)

## Constructors

### constructor

• **new Route**<`TInput`, `TOutput`\>(`pools`, `input`, `output`)

Creates an instance of route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `Currency` |
| `TOutput` | extends `Currency` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pools` | [`Pool`](entities_pool.Pool.md)[] | An array of `Pool` objects, ordered by the route the swap will take |
| `input` | `TInput` | The input token |
| `output` | `TOutput` | The output token |

#### Defined in

[entities/route.ts:25](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L25)

## Properties

### \_midPrice

• `Private` **\_midPrice**: ``null`` \| `Price`<`TInput`, `TOutput`\> = `null`

#### Defined in

[entities/route.ts:17](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L17)

___

### input

• `Readonly` **input**: `TInput`

#### Defined in

[entities/route.ts:14](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L14)

___

### output

• `Readonly` **output**: `TOutput`

#### Defined in

[entities/route.ts:15](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L15)

___

### pools

• `Readonly` **pools**: [`Pool`](entities_pool.Pool.md)[]

#### Defined in

[entities/route.ts:12](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L12)

___

### tokenPath

• `Readonly` **tokenPath**: `Token`[]

#### Defined in

[entities/route.ts:13](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L13)

## Accessors

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

#### Defined in

[entities/route.ts:54](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L54)

___

### midPrice

• `get` **midPrice**(): `Price`<`TInput`, `TOutput`\>

Returns the mid price of the route

#### Returns

`Price`<`TInput`, `TOutput`\>

#### Defined in

[entities/route.ts:61](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/entities/route.ts#L61)
