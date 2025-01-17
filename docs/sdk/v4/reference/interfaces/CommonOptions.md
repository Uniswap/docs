[@uniswap/v4-sdk](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk) / CommonOptions

# Interface: CommonOptions

Defined in: [PositionManager.ts:24](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L24)

## Properties

### deadline

> **deadline**: `BigintIsh`

Defined in: [PositionManager.ts:37](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L37)

When the transaction expires, in epoch seconds.

---

### hookData

> `optional` **hookData**: `string`

Defined in: [PositionManager.ts:32](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L32)

Optional data to pass to hooks

---

### slippageTolerance

> **slippageTolerance**: `Percent`

Defined in: [PositionManager.ts:28](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L28)

How much the pool price is allowed to move from the specified action.
