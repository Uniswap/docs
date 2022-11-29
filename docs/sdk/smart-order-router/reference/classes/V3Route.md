[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V3Route

# Class: V3Route

## Hierarchy

- `Route`<`Token`, `Token`\>

  ↳ **`V3Route`**

## Table of contents

### Constructors

- [constructor](V3Route.md#constructor)

### Properties

- [input](V3Route.md#input)
- [output](V3Route.md#output)
- [pools](V3Route.md#pools)
- [protocol](V3Route.md#protocol)
- [tokenPath](V3Route.md#tokenpath)

### Accessors

- [chainId](V3Route.md#chainid)
- [midPrice](V3Route.md#midprice)

## Constructors

### constructor

• **new V3Route**(`pools`, `input`, `output`)

Creates an instance of route.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pools` | `Pool`[] | An array of `Pool` objects, ordered by the route the swap will take |
| `input` | `Token` | The input token |
| `output` | `Token` | The output token |

#### Inherited from

V3RouteRaw<Token, Token\>.constructor

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:20

## Properties

### input

• `Readonly` **input**: `Token`

#### Inherited from

V3RouteRaw.input

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:11

___

### output

• `Readonly` **output**: `Token`

#### Inherited from

V3RouteRaw.output

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:12

___

### pools

• `Readonly` **pools**: `Pool`[]

#### Inherited from

V3RouteRaw.pools

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:9

___

### protocol

• **protocol**: `V3` = `Protocol.V3`

#### Defined in

[src/routers/router.ts:30](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/router.ts#L30)

___

### tokenPath

• `Readonly` **tokenPath**: `Token`[]

#### Inherited from

V3RouteRaw.tokenPath

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:10

## Accessors

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

#### Inherited from

V3RouteRaw.chainId

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:21

___

### midPrice

• `get` **midPrice**(): `Price`<`TInput`, `TOutput`\>

Returns the mid price of the route

#### Returns

`Price`<`TInput`, `TOutput`\>

#### Inherited from

V3RouteRaw.midPrice

#### Defined in

node_modules/@uniswap/v3-sdk/dist/entities/route.d.ts:25
