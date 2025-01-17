[@uniswap/v4-sdk](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk) / V4PositionPlanner

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

---

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

##### type

[`Actions`](../enums/Actions.md)

##### parameters

`any`[]

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addAction`](V4Planner.md#addaction)

---

### addBurn()

> **addBurn**(`tokenId`, `amount0Min`, `amount1Min`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:58](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L58)

#### Parameters

##### tokenId

`BigintIsh`

##### amount0Min

`BigintIsh`

##### amount1Min

`BigintIsh`

##### hookData

`string` = `EMPTY_BYTES`

#### Returns

`void`

---

### addDecrease()

> **addDecrease**(`tokenId`, `liquidity`, `amount0Min`, `amount1Min`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:46](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L46)

#### Parameters

##### tokenId

`BigintIsh`

##### liquidity

`BigintIsh`

##### amount0Min

`BigintIsh`

##### amount1Min

`BigintIsh`

##### hookData

`string` = `EMPTY_BYTES`

#### Returns

`void`

---

### addIncrease()

> **addIncrease**(`tokenId`, `liquidity`, `amount0Max`, `amount1Max`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:34](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L34)

#### Parameters

##### tokenId

`BigintIsh`

##### liquidity

`BigintIsh`

##### amount0Max

`BigintIsh`

##### amount1Max

`BigintIsh`

##### hookData

`string` = `EMPTY_BYTES`

#### Returns

`void`

---

### addMint()

> **addMint**(`pool`, `tickLower`, `tickUpper`, `liquidity`, `amount0Max`, `amount1Max`, `owner`, `hookData`): `void`

Defined in: [utils/v4PositionPlanner.ts:10](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L10)

#### Parameters

##### pool

[`Pool`](Pool.md)

##### tickLower

`number`

##### tickUpper

`number`

##### liquidity

`BigintIsh`

##### amount0Max

`BigintIsh`

##### amount1Max

`BigintIsh`

##### owner

`string`

##### hookData

`string` = `EMPTY_BYTES`

#### Returns

`void`

---

### addSettle()

> **addSettle**(`currency`, `payerIsUser`, `amount`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:213](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L213)

#### Parameters

##### currency

`Currency`

##### payerIsUser

`boolean`

##### amount

`BigNumber`

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addSettle`](V4Planner.md#addsettle)

---

### addSettlePair()

> **addSettlePair**(`currency0`, `currency1`): `void`

Defined in: [utils/v4PositionPlanner.ts:64](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L64)

#### Parameters

##### currency0

`Currency`

##### currency1

`Currency`

#### Returns

`void`

---

### addSweep()

> **addSweep**(`currency`, `to`): `void`

Defined in: [utils/v4PositionPlanner.ts:76](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L76)

#### Parameters

##### currency

`Currency`

##### to

`string`

#### Returns

`void`

---

### addTake()

> **addTake**(`currency`, `recipient`, `amount`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:218](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L218)

#### Parameters

##### currency

`Currency`

##### recipient

`string`

##### amount

`BigNumber`

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addTake`](V4Planner.md#addtake)

---

### addTakePair()

> **addTakePair**(`currency0`, `currency1`, `recipient`): `void`

Defined in: [utils/v4PositionPlanner.ts:70](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4PositionPlanner.ts#L70)

#### Parameters

##### currency0

`Currency`

##### currency1

`Currency`

##### recipient

`string`

#### Returns

`void`

---

### addTrade()

> **addTrade**(`trade`, `slippageTolerance`?): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:183](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L183)

#### Parameters

##### trade

`Trade`\<`Currency`, `Currency`, `TradeType`\>

##### slippageTolerance

`Percent`

#### Returns

[`V4Planner`](V4Planner.md)

#### Inherited from

[`V4Planner`](V4Planner.md).[`addTrade`](V4Planner.md#addtrade)

---

### finalize()

> **finalize**(): `string`

Defined in: [utils/v4Planner.ts:224](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L224)

#### Returns

`string`

#### Inherited from

[`V4Planner`](V4Planner.md).[`finalize`](V4Planner.md#finalize)
