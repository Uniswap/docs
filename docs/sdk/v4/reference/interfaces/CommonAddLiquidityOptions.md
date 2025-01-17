[@uniswap/v4-sdk](https://github.com/Uniswap/sdks/tree/main/sdks/v4-sdk) / CommonAddLiquidityOptions

# Interface: CommonAddLiquidityOptions

Defined in: [PositionManager.ts:72](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L72)

Options for producing the calldata to add liquidity.

## Properties

### batchPermit

> `optional` **batchPermit**: [`BatchPermitOptions`](BatchPermitOptions.md)

Defined in: [PositionManager.ts:81](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L81)

The optional permit2 batch permit parameters for spending token0 and token1

---

### useNative

> `optional` **useNative**: `NativeCurrency`

Defined in: [PositionManager.ts:76](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L76)

Whether to spend ether. If true, one of the currencies must be the NATIVE currency.
