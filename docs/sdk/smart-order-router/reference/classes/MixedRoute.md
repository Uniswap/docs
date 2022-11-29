[@uniswap/smart-order-router](../README.md) / [Exports](../modules.md) / MixedRoute

# Class: MixedRoute

## Hierarchy

- `MixedRouteSDK`<`Token`, `Token`\>

  ↳ **`MixedRoute`**

## Table of contents

### Constructors

- [constructor](MixedRoute.md#constructor)

### Properties

- [input](MixedRoute.md#input)
- [output](MixedRoute.md#output)
- [path](MixedRoute.md#path)
- [pools](MixedRoute.md#pools)
- [protocol](MixedRoute.md#protocol)

### Accessors

- [chainId](MixedRoute.md#chainid)
- [midPrice](MixedRoute.md#midprice)

## Constructors

### constructor

• **new MixedRoute**(`pools`, `input`, `output`)

Creates an instance of route.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pools` | `TPool`[] | An array of `TPool` objects (pools or pairs), ordered by the route the swap will take |
| `input` | `Token` | The input token |
| `output` | `Token` | The output token |

#### Inherited from

MixedRouteSDK<Token, Token\>.constructor

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:22

## Properties

### input

• `Readonly` **input**: `Token`

#### Inherited from

MixedRouteSDK.input

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:13

___

### output

• `Readonly` **output**: `Token`

#### Inherited from

MixedRouteSDK.output

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:14

___

### path

• `Readonly` **path**: `Token`[]

#### Inherited from

MixedRouteSDK.path

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:12

___

### pools

• `Readonly` **pools**: `TPool`[]

#### Inherited from

MixedRouteSDK.pools

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:11

___

### protocol

• **protocol**: `MIXED` = `Protocol.MIXED`

#### Defined in

[src/routers/router.ts:36](https://github.com/Uniswap/smart-order-router/blob/10190c3/src/routers/router.ts#L36)

## Accessors

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

#### Inherited from

MixedRouteSDK.chainId

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:23

___

### midPrice

• `get` **midPrice**(): `Price`<`TInput`, `TOutput`\>

Returns the mid price of the route

#### Returns

`Price`<`TInput`, `TOutput`\>

#### Inherited from

MixedRouteSDK.midPrice

#### Defined in

node_modules/@uniswap/router-sdk/dist/entities/mixedRoute/route.d.ts:27
