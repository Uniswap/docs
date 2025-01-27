[@uniswap/v4-sdk](../overview.md) / RemoveLiquiditySpecificOptions

Defined in: [PositionManager.ts:87](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L87)

Options for producing the calldata to exit a position.

## Properties

### burnToken?

> `optional` **burnToken**: `boolean`

Defined in: [PositionManager.ts:96](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L96)

Whether the NFT should be burned if the entire position is being exited, by default false.

***

### liquidityPercentage

> **liquidityPercentage**: `Percent`

Defined in: [PositionManager.ts:91](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L91)

The percentage of position liquidity to exit.

***

### permit?

> `optional` **permit**: [`NFTPermitOptions`](NFTPermitOptions.md)

Defined in: [PositionManager.ts:101](https://github.com/Uniswap/sdks/blob/9cf6edb2df79338ae58f7ea7ca979c35a8a9bd56/sdks/v4-sdk/src/PositionManager.ts#L101)

The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT
