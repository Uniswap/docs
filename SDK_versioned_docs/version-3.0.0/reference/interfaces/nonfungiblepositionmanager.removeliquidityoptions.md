[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [nonfungiblePositionManager](../modules/nonfungiblePositionManager.md) / RemoveLiquidityOptions

# Interface: RemoveLiquidityOptions

[nonfungiblePositionManager](../modules/nonfungiblePositionManager.md).RemoveLiquidityOptions

Options for producing the calldata to exit a position.

## Table of contents

### Properties

- [burnToken](nonfungiblePositionManager.RemoveLiquidityOptions.md#burntoken)
- [collectOptions](nonfungiblePositionManager.RemoveLiquidityOptions.md#collectoptions)
- [deadline](nonfungiblePositionManager.RemoveLiquidityOptions.md#deadline)
- [liquidityPercentage](nonfungiblePositionManager.RemoveLiquidityOptions.md#liquiditypercentage)
- [permit](nonfungiblePositionManager.RemoveLiquidityOptions.md#permit)
- [slippageTolerance](nonfungiblePositionManager.RemoveLiquidityOptions.md#slippagetolerance)
- [tokenId](nonfungiblePositionManager.RemoveLiquidityOptions.md#tokenid)

## Properties

### burnToken

• `Optional` **burnToken**: `boolean`

Whether the NFT should be burned if the entire position is being exited, by default false.

#### Defined in

[nonfungiblePositionManager.ts:139](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L139)

___

### collectOptions

• **collectOptions**: `Omit`<[`CollectOptions`](nonfungiblePositionManager.CollectOptions.md), ``"tokenId"``\>

Parameters to be passed on to collect

#### Defined in

[nonfungiblePositionManager.ts:149](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L149)

___

### deadline

• **deadline**: `BigintIsh`

When the transaction expires, in epoch seconds.

#### Defined in

[nonfungiblePositionManager.ts:134](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L134)

___

### liquidityPercentage

• **liquidityPercentage**: `Percent`

The percentage of position liquidity to exit.

#### Defined in

[nonfungiblePositionManager.ts:124](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L124)

___

### permit

• `Optional` **permit**: [`NFTPermitOptions`](nonfungiblePositionManager.NFTPermitOptions.md)

The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT

#### Defined in

[nonfungiblePositionManager.ts:144](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L144)

___

### slippageTolerance

• **slippageTolerance**: `Percent`

How much the pool price is allowed to move.

#### Defined in

[nonfungiblePositionManager.ts:129](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L129)

___

### tokenId

• **tokenId**: `BigintIsh`

The ID of the token to exit

#### Defined in

[nonfungiblePositionManager.ts:119](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L119)
