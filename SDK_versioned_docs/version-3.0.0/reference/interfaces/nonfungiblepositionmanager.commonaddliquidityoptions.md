[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [nonfungiblePositionManager](../modules/nonfungiblePositionManager.md) / CommonAddLiquidityOptions

# Interface: CommonAddLiquidityOptions

[nonfungiblePositionManager](../modules/nonfungiblePositionManager.md).CommonAddLiquidityOptions

Options for producing the calldata to add liquidity.

## Table of contents

### Properties

- [deadline](nonfungiblePositionManager.CommonAddLiquidityOptions.md#deadline)
- [slippageTolerance](nonfungiblePositionManager.CommonAddLiquidityOptions.md#slippagetolerance)
- [token0Permit](nonfungiblePositionManager.CommonAddLiquidityOptions.md#token0permit)
- [token1Permit](nonfungiblePositionManager.CommonAddLiquidityOptions.md#token1permit)
- [useNative](nonfungiblePositionManager.CommonAddLiquidityOptions.md#usenative)

## Properties

### deadline

• **deadline**: `BigintIsh`

When the transaction expires, in epoch seconds.

#### Defined in

[nonfungiblePositionManager.ts:54](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L54)

___

### slippageTolerance

• **slippageTolerance**: `Percent`

How much the pool price is allowed to move.

#### Defined in

[nonfungiblePositionManager.ts:49](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L49)

___

### token0Permit

• `Optional` **token0Permit**: [`PermitOptions`](../modules/selfPermit.md#permitoptions)

The optional permit parameters for spending token0

#### Defined in

[nonfungiblePositionManager.ts:64](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L64)

___

### token1Permit

• `Optional` **token1Permit**: [`PermitOptions`](../modules/selfPermit.md#permitoptions)

The optional permit parameters for spending token1

#### Defined in

[nonfungiblePositionManager.ts:69](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L69)

___

### useNative

• `Optional` **useNative**: `NativeCurrency`

Whether to spend ether. If true, one of the pool tokens must be WETH, by default false

#### Defined in

[nonfungiblePositionManager.ts:59](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/nonfungiblePositionManager.ts#L59)
