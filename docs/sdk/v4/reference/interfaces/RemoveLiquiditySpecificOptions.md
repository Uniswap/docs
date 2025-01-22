[@uniswap/v4-sdk](../overview.md) / RemoveLiquiditySpecificOptions

# Interface: RemoveLiquiditySpecificOptions

Defined in: [PositionManager.ts:87](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L87)

Options for producing the calldata to exit a position.

## Properties

### burnToken?

> `optional` **burnToken**: `boolean`

Defined in: [PositionManager.ts:96](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L96)

Whether the NFT should be burned if the entire position is being exited, by default false.

***

### liquidityPercentage

> **liquidityPercentage**: `Percent`

Defined in: [PositionManager.ts:91](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L91)

The percentage of position liquidity to exit.

***

### permit?

> `optional` **permit**: [`NFTPermitOptions`](NFTPermitOptions.md)

Defined in: [PositionManager.ts:101](https://github.com/Uniswap/sdks/blob/c1c9f64f11640c79a680f539823458931629e6ed/sdks/v4-sdk/src/PositionManager.ts#L101)

The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT
