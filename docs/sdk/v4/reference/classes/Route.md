[@uniswap/v4-sdk](../overview.md) / Route

# Class: Route\<TInput, TOutput\>

Defined in: [entities/route.ts:12](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L12)

Represents a list of pools through which a swap can occur

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TInput` *extends* `Currency` | The input currency |
| `TOutput` *extends* `Currency` | The output currency |

## Constructors

### new Route()

> **new Route**\<`TInput`, `TOutput`\>(`pools`, `input`, `output`): [`Route`](Route.md)\<`TInput`, `TOutput`\>

Defined in: [entities/route.ts:28](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L28)

Creates an instance of route.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pools` | [`Pool`](Pool.md)[] | An array of `Pool` objects, ordered by the route the swap will take |
| `input` | `TInput` | The input currency |
| `output` | `TOutput` | The output currency |

#### Returns

[`Route`](Route.md)\<`TInput`, `TOutput`\>

## Properties

### currencyPath

> `readonly` **currencyPath**: `Currency`[]

Defined in: [entities/route.ts:14](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L14)

***

### input

> `readonly` **input**: `TInput`

Defined in: [entities/route.ts:15](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L15)

***

### output

> `readonly` **output**: `TOutput`

Defined in: [entities/route.ts:16](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L16)

***

### pathInput

> `readonly` **pathInput**: `Currency`

Defined in: [entities/route.ts:17](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L17)

***

### pathOutput

> `readonly` **pathOutput**: `Currency`

Defined in: [entities/route.ts:18](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L18)

***

### pools

> `readonly` **pools**: [`Pool`](Pool.md)[]

Defined in: [entities/route.ts:13](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L13)

## Accessors

### chainId

#### Get Signature

> **get** **chainId**(): `number`

Defined in: [entities/route.ts:58](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L58)

##### Returns

`number`

***

### midPrice

#### Get Signature

> **get** **midPrice**(): `Price`\<`TInput`, `TOutput`\>

Defined in: [entities/route.ts:65](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/entities/route.ts#L65)

Returns the mid price of the route

##### Returns

`Price`\<`TInput`, `TOutput`\>
