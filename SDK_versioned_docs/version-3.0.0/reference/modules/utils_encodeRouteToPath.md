[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / utils/encodeRouteToPath

# Module: utils/encodeRouteToPath

## Table of contents

### Functions

- [encodeRouteToPath](utils_encodeRouteToPath.md#encoderoutetopath)

## Functions

### encodeRouteToPath

▸ **encodeRouteToPath**(`route`, `exactOutput`): `string`

Converts a route to a hex encoded path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](../classes/entities_route.Route.md)<`Currency`, `Currency`\> | the v3 path to convert to an encoded path |
| `exactOutput` | `boolean` | whether the route should be encoded in reverse, for making exact output swaps |

#### Returns

`string`

#### Defined in

[utils/encodeRouteToPath.ts:11](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/utils/encodeRouteToPath.ts#L11)
