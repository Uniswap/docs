[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / V2Route

# Class: V2Route

## Hierarchy

- `Route`<`Token`, `Token`\>

  ↳ **`V2Route`**

## Table of contents

### Constructors

- [constructor](V2Route.md#constructor)

### Properties

- [input](V2Route.md#input)
- [output](V2Route.md#output)
- [pairs](V2Route.md#pairs)
- [path](V2Route.md#path)
- [protocol](V2Route.md#protocol)

### Accessors

- [chainId](V2Route.md#chainid)
- [midPrice](V2Route.md#midprice)

## Constructors

### constructor

• **new V2Route**(`pairs`, `input`, `output`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairs` | `Pair`[] |
| `input` | `Token` |
| `output` | `Token` |

#### Inherited from

V2RouteRaw<Token, Token\>.constructor

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:8

## Properties

### input

• `Readonly` **input**: `Token`

#### Inherited from

V2RouteRaw.input

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:6

___

### output

• `Readonly` **output**: `Token`

#### Inherited from

V2RouteRaw.output

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:7

___

### pairs

• `Readonly` **pairs**: `Pair`[]

#### Inherited from

V2RouteRaw.pairs

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:4

___

### path

• `Readonly` **path**: `Token`[]

#### Inherited from

V2RouteRaw.path

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:5

___

### protocol

• **protocol**: `V2` = `Protocol.V2`

#### Defined in

[src/routers/router.ts:33](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/router.ts#L33)

## Accessors

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

#### Inherited from

V2RouteRaw.chainId

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:11

___

### midPrice

• `get` **midPrice**(): `Price`<`TInput`, `TOutput`\>

#### Returns

`Price`<`TInput`, `TOutput`\>

#### Inherited from

V2RouteRaw.midPrice

#### Defined in

node_modules/@uniswap/v2-sdk/dist/entities/route.d.ts:10
