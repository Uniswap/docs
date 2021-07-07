---
id: SwapOptions
title: SwapOptions
---

# SwapOptions

Options for producing the arguments to send calls to the router.

## Properties

### deadline

• **deadline**: BigintIsh

When the transaction expires, in epoch seconds.

Defined in: [swapRouter.ts:40](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L40)

___

### fee

• `Optional` **fee**: [*FeeOptions*](swaprouter.feeoptions.md)

Optional information for taking a fee on output.

Defined in: [swapRouter.ts:55](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L55)

___

### inputTokenPermit

• `Optional` **inputTokenPermit**: [*StandardPermitArguments*](selfpermit.standardpermitarguments.md) \| [*AllowedPermitArguments*](selfpermit.allowedpermitarguments.md)

The optional permit parameters for spending the input.

Defined in: [swapRouter.ts:45](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L45)

___

### recipient

• **recipient**: *string*

The account that should receive the output.

Defined in: [swapRouter.ts:35](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L35)

___

### slippageTolerance

• **slippageTolerance**: *Percent*

How much the execution price is allowed to move unfavorably from the trade execution price.

Defined in: [swapRouter.ts:30](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L30)

___

### sqrtPriceLimitX96

• `Optional` **sqrtPriceLimitX96**: *string* \| *number* \| *default*

The optional price limit for the trade.

Defined in: [swapRouter.ts:50](https://github.com/Uniswap/uniswap-v3-sdk/blob/aeb1b09/src/swapRouter.ts#L50)
