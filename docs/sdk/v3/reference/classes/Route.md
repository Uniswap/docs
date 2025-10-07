[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / Route

# Class: Route\<TInput, TOutput\>

Represents a list of pools through which a swap can occur

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TInput` | extends `Currency` | The input token |
| `TOutput` | extends `Currency` | The output token |

## Table of contents

### Constructors

- [constructor](Route.md#constructor)

### Properties

- [\_midPrice](Route.md#_midprice)
- [input](Route.md#input)
- [output](Route.md#output)
- [pools](Route.md#pools)
- [tokenPath](Route.md#tokenpath)

### Accessors

- [chainId](Route.md#chainid)
- [midPrice](Route.md#midprice)

## Constructors

### constructor

• **new Route**\<`TInput`, `TOutput`\>(`pools`, `input`, `output`)

Creates an instance of route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `Currency` |
| `TOutput` | extends `Currency` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pools` | [`Pool`](Pool.md)[] | An array of `Pool` objects, ordered by the route the swap will take |
| `input` | `TInput` | The input token |
| `output` | `TOutput` | The output token |

#### Defined in

[entities/route.ts:25](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L25)

## Properties

### \_midPrice

• `Private` **\_midPrice**: ``null`` \| `Price`\<`TInput`, `TOutput`\> = `null`

#### Defined in

[entities/route.ts:17](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L17)

___

### input

• `Readonly` **input**: `TInput`

#### Defined in

[entities/route.ts:14](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L14)

___

### output

• `Readonly` **output**: `TOutput`

#### Defined in

[entities/route.ts:15](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L15)

___

### pools

• `Readonly` **pools**: [`Pool`](Pool.md)[]

#### Defined in

[entities/route.ts:12](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L12)

___

### tokenPath

• `Readonly` **tokenPath**: `Token`[]

#### Defined in

[entities/route.ts:13](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L13)

## Accessors

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

#### Defined in

[entities/route.ts:54](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L54)

___

### midPrice

• `get` **midPrice**(): `Price`\<`TInput`, `TOutput`\>

Returns the mid price of the route

#### Returns

`Price`\<`TInput`, `TOutput`\>

#### Defined in

[entities/route.ts:61](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/entities/route.ts#L61)
