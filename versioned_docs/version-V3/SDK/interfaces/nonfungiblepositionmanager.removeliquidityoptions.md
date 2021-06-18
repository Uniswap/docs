---
id: RemoveLiquidityOptions
title: RemoveLiquidityOptions
---

# RemoveLiquidityOptions

Options for producing the calldata to exit a position.

## Properties

### burnToken

• `Optional` **burnToken**: *boolean*

Whether the NFT should be burned if the entire position is being exited, by default false.

Defined in: [nonfungiblePositionManager.ts:139](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L139)

___

### collectOptions

• **collectOptions**: *Pick*<[*CollectOptions*](nonfungiblepositionmanager.collectoptions.md), ``"expectedCurrencyOwed0"`` \| ``"expectedCurrencyOwed1"`` \| ``"recipient"``\>

Parameters to be passed on to collect

Defined in: [nonfungiblePositionManager.ts:149](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L149)

___

### deadline

• **deadline**: BigintIsh

When the transaction expires, in epoch seconds.

Defined in: [nonfungiblePositionManager.ts:134](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L134)

___

### liquidityPercentage

• **liquidityPercentage**: *Percent*

The percentage of position liquidity to exit.

Defined in: [nonfungiblePositionManager.ts:124](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L124)

___

### permit

• `Optional` **permit**: [*NFTPermitOptions*](nonfungiblepositionmanager.nftpermitoptions.md)

The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT

Defined in: [nonfungiblePositionManager.ts:144](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L144)

___

### slippageTolerance

• **slippageTolerance**: *Percent*

How much the pool price is allowed to move.

Defined in: [nonfungiblePositionManager.ts:129](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L129)

___

### tokenId

• **tokenId**: BigintIsh

The ID of the token to exit

Defined in: [nonfungiblePositionManager.ts:119](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L119)
