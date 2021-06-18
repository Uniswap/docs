---
id: CommonAddLiquidityOptions
title: CommonAddLiquidityOptions
---

# CommonAddLiquidityOptions

Options for producing the calldata to add liquidity.

## Properties

### deadline

• **deadline**: BigintIsh

When the transaction expires, in epoch seconds.

Defined in: [nonfungiblePositionManager.ts:54](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L54)

___

### slippageTolerance

• **slippageTolerance**: *Percent*

How much the pool price is allowed to move.

Defined in: [nonfungiblePositionManager.ts:49](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L49)

___

### token0Permit

• `Optional` **token0Permit**: [*StandardPermitArguments*](selfpermit.standardpermitarguments.md) \| [*AllowedPermitArguments*](selfpermit.allowedpermitarguments.md)

The optional permit parameters for spending token0

Defined in: [nonfungiblePositionManager.ts:64](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L64)

___

### token1Permit

• `Optional` **token1Permit**: [*StandardPermitArguments*](selfpermit.standardpermitarguments.md) \| [*AllowedPermitArguments*](selfpermit.allowedpermitarguments.md)

The optional permit parameters for spending token1

Defined in: [nonfungiblePositionManager.ts:69](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L69)

___

### useEther

• `Optional` **useEther**: *boolean*

Whether to spend ether. If true, one of the pool tokens must be WETH, by default false

Defined in: [nonfungiblePositionManager.ts:59](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/nonfungiblePositionManager.ts#L59)
