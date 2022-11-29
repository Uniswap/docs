[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / WithdrawOptions

# Interface: WithdrawOptions

Options to specify when withdrawing a position.

## Table of contents

### Properties

- [data](WithdrawOptions.md#data)
- [owner](WithdrawOptions.md#owner)

## Properties

### data

• `Optional` **data**: `string`

Set when withdrawing. `data` is passed to `safeTransferFrom` when transferring the position from contract back to owner.

#### Defined in

[staker.ts:66](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L66)

___

### owner

• **owner**: `string`

Set when withdrawing. The position will be sent to `owner` on withdraw.

#### Defined in

[staker.ts:61](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L61)
