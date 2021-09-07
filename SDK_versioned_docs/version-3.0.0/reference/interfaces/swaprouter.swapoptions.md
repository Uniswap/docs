[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / [swapRouter](../modules/swapRouter.md) / SwapOptions

# Interface: SwapOptions

[swapRouter](../modules/swapRouter.md).SwapOptions

Options for producing the arguments to send calls to the router.

## Table of contents

### Properties

- [deadline](swapRouter.SwapOptions.md#deadline)
- [fee](swapRouter.SwapOptions.md#fee)
- [inputTokenPermit](swapRouter.SwapOptions.md#inputtokenpermit)
- [recipient](swapRouter.SwapOptions.md#recipient)
- [slippageTolerance](swapRouter.SwapOptions.md#slippagetolerance)
- [sqrtPriceLimitX96](swapRouter.SwapOptions.md#sqrtpricelimitx96)

## Properties

### deadline

• **deadline**: `BigintIsh`

When the transaction expires, in epoch seconds.

#### Defined in

[swapRouter.ts:40](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L40)

___

### fee

• `Optional` **fee**: [`FeeOptions`](swapRouter.FeeOptions.md)

Optional information for taking a fee on output.

#### Defined in

[swapRouter.ts:55](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L55)

___

### inputTokenPermit

• `Optional` **inputTokenPermit**: [`PermitOptions`](../modules/selfPermit.md#permitoptions)

The optional permit parameters for spending the input.

#### Defined in

[swapRouter.ts:45](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L45)

___

### recipient

• **recipient**: `string`

The account that should receive the output.

#### Defined in

[swapRouter.ts:35](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L35)

___

### slippageTolerance

• **slippageTolerance**: `Percent`

How much the execution price is allowed to move unfavorably from the trade execution price.

#### Defined in

[swapRouter.ts:30](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L30)

___

### sqrtPriceLimitX96

• `Optional` **sqrtPriceLimitX96**: `BigintIsh`

The optional price limit for the trade.

#### Defined in

[swapRouter.ts:50](https://github.com/Uniswap/uniswap-v3-sdk/blob/63d5c6d/src/swapRouter.ts#L50)
