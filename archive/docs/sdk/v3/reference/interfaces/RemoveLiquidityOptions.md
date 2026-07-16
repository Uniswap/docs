[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / RemoveLiquidityOptions

# Interface: RemoveLiquidityOptions

Options for producing the calldata to exit a position.

## Table of contents

### Properties

- [burnToken](RemoveLiquidityOptions.md#burntoken)
- [collectOptions](RemoveLiquidityOptions.md#collectoptions)
- [deadline](RemoveLiquidityOptions.md#deadline)
- [liquidityPercentage](RemoveLiquidityOptions.md#liquiditypercentage)
- [permit](RemoveLiquidityOptions.md#permit)
- [slippageTolerance](RemoveLiquidityOptions.md#slippagetolerance)
- [tokenId](RemoveLiquidityOptions.md#tokenid)

## Properties

### burnToken

• `Optional` **burnToken**: `boolean`

Whether the NFT should be burned if the entire position is being exited, by default false.

#### Defined in

[nonfungiblePositionManager.ts:162](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L162)

___

### collectOptions

• **collectOptions**: `Omit`\<[`CollectOptions`](CollectOptions.md), ``"tokenId"``\>

Parameters to be passed on to collect

#### Defined in

[nonfungiblePositionManager.ts:172](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L172)

___

### deadline

• **deadline**: `BigintIsh`

When the transaction expires, in epoch seconds.

#### Defined in

[nonfungiblePositionManager.ts:157](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L157)

___

### liquidityPercentage

• **liquidityPercentage**: `Percent`

The percentage of position liquidity to exit.

#### Defined in

[nonfungiblePositionManager.ts:147](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L147)

___

### permit

• `Optional` **permit**: [`NFTPermitOptions`](NFTPermitOptions.md)

The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT

#### Defined in

[nonfungiblePositionManager.ts:167](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L167)

___

### slippageTolerance

• **slippageTolerance**: `Percent`

How much the pool price is allowed to move.

#### Defined in

[nonfungiblePositionManager.ts:152](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L152)

___

### tokenId

• **tokenId**: `BigintIsh`

The ID of the token to exit

#### Defined in

[nonfungiblePositionManager.ts:142](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/nonfungiblePositionManager.ts#L142)
