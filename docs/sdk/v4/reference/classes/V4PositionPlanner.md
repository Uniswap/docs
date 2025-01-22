[@uniswap/v4-sdk](../overview.md) / V4PositionPlanner

# Class: V4PositionPlanner

Defined in: [utils/v4PositionPlanner.ts:8](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L8)

## Extends

- [`V4Planner`](V4Planner.md)

## Constructors

### new V4PositionPlanner()

> **new V4PositionPlanner**(): [`V4PositionPlanner`](V4PositionPlanner.md)

Defined in: [utils/v4Planner.ts:171](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L171)

#### Returns

[`V4PositionPlanner`](V4PositionPlanner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`constructor`](V4Planner.md#constructors)

## Properties

### actions

> **actions**: `string`

Defined in: [utils/v4Planner.ts:168](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L168)

#### Inherited from

[`V4Planner`](V4Planner.md).[`actions`](V4Planner.md#actions)

***

### params

> **params**: `string`[]

Defined in: [utils/v4Planner.ts:169](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L169)

#### Inherited from

[`V4Planner`](V4Planner.md).[`params`](V4Planner.md#params)

## Methods

### addAction()

> **addAction**(`type`, `parameters`): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:176](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L176)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | [`Actions`](../enumerations/Actions.md) |
| `parameters` | `any`[] |

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addAction`](V4Planner.md#addaction)

***

### addBurn()

> **addBurn**(`tokenId`, `amount0Min`, `amount1Min`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:58](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L58)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tokenId` | `BigintIsh` | `undefined` |
| `amount0Min` | `BigintIsh` | `undefined` |
| `amount1Min` | `BigintIsh` | `undefined` |
| `hookData` | `string` | `EMPTY_BYTES` |

#### Returns

`void`

***

### addDecrease()

> **addDecrease**(`tokenId`, `liquidity`, `amount0Min`, `amount1Min`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:46](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L46)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tokenId` | `BigintIsh` | `undefined` |
| `liquidity` | `BigintIsh` | `undefined` |
| `amount0Min` | `BigintIsh` | `undefined` |
| `amount1Min` | `BigintIsh` | `undefined` |
| `hookData` | `string` | `EMPTY_BYTES` |

#### Returns

`void`

***

### addIncrease()

> **addIncrease**(`tokenId`, `liquidity`, `amount0Max`, `amount1Max`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:34](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L34)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `tokenId` | `BigintIsh` | `undefined` |
| `liquidity` | `BigintIsh` | `undefined` |
| `amount0Max` | `BigintIsh` | `undefined` |
| `amount1Max` | `BigintIsh` | `undefined` |
| `hookData` | `string` | `EMPTY_BYTES` |

#### Returns

`void`

***

### addMint()

> **addMint**(`pool`, `tickLower`, `tickUpper`, `liquidity`, `amount0Max`, `amount1Max`, `owner`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:10](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L10)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `pool` | [`Pool`](Pool.md) | `undefined` |
| `tickLower` | `number` | `undefined` |
| `tickUpper` | `number` | `undefined` |
| `liquidity` | `BigintIsh` | `undefined` |
| `amount0Max` | `BigintIsh` | `undefined` |
| `amount1Max` | `BigintIsh` | `undefined` |
| `owner` | `string` | `undefined` |
| `hookData` | `string` | `EMPTY_BYTES` |

#### Returns

`void`

***

### addSettle()

> **addSettle**(`currency`, `payerIsUser`, `amount`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:213](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L213)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency` | `Currency` |
| `payerIsUser` | `boolean` |
| `amount`? | `BigNumber` |

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addSettle`](V4Planner.md#addsettle)

***

### addSettlePair()

> **addSettlePair**(`currency0`, `currency1`): `void`

Defined in: [utils/v4PositionPlanner.ts:64](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency0` | `Currency` |
| `currency1` | `Currency` |

#### Returns

`void`

***

### addSweep()

> **addSweep**(`currency`, `to`): `void`

Defined in: [utils/v4PositionPlanner.ts:76](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L76)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency` | `Currency` |
| `to` | `string` |

#### Returns

`void`

***

### addTake()

> **addTake**(`currency`, `recipient`, `amount`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:218](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L218)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency` | `Currency` |
| `recipient` | `string` |
| `amount`? | `BigNumber` |

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addTake`](V4Planner.md#addtake)

***

### addTakePair()

> **addTakePair**(`currency0`, `currency1`, `recipient`): `void`

Defined in: [utils/v4PositionPlanner.ts:70](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L70)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currency0` | `Currency` |
| `currency1` | `Currency` |
| `recipient` | `string` |

#### Returns

`void`

***

### addTrade()

> **addTrade**(`trade`, `slippageTolerance`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:183](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L183)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `trade` | [`Trade`](Trade.md)\<`Currency`, `Currency`, `TradeType`\> |
| `slippageTolerance`? | `Percent` |

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addTrade`](V4Planner.md#addtrade)

***

### finalize()

> **finalize**(): `string`

Defined in: [utils/v4Planner.ts:224](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L224)

#### Returns

`string`

#### Inherited from

[`V4Planner`](V4Planner.md).[`finalize`](V4Planner.md#finalize)
