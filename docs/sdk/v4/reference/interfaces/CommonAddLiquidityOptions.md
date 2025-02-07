[@uniswap/v4-sdk](../overview.md) / CommonAddLiquidityOptions

Defined in: [PositionManager.ts:72](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L72)

Options for producing the calldata to add liquidity.

## Properties

### batchPermit?

> `optional` **batchPermit**: [`BatchPermitOptions`](BatchPermitOptions.md)

Defined in: [PositionManager.ts:81](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L81)

The optional permit2 batch permit parameters for spending token0 and token1

***

### useNative?

> `optional` **useNative**: `NativeCurrency`

Defined in: [PositionManager.ts:76](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L76)

Whether to spend ether. If true, one of the currencies must be the NATIVE currency.
