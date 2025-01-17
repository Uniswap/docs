[@uniswap/v4-sdk](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk) / V4Planner

# Class: V4Planner

Defined in: [utils/v4Planner.ts:167](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L167)

## Extended by

- [`V4PositionPlanner`](V4PositionPlanner.md)

## Constructors

### new V4Planner()

> **new V4Planner**(): [`V4Planner`](V4Planner.md)

Defined in: [utils/v4Planner.ts:171](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L171)

#### Returns

[`V4Planner`](V4Planner.md)

## Properties

### actions

> **actions**: `string`

Defined in: [utils/v4Planner.ts:168](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L168)

---

### params

> **params**: `string`[]

Defined in: [utils/v4Planner.ts:169](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L169)

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

---

### finalize()

> **finalize**(): `string`

Defined in: [utils/v4Planner.ts:224](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/utils/v4Planner.ts#L224)

#### Returns

`string`
