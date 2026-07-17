[@uniswap/v3-sdk](../README.md) / [Exports](../modules.md) / IncentiveKey

# Interface: IncentiveKey

Represents a unique staking program.

## Table of contents

### Properties

- [endTime](IncentiveKey.md#endtime)
- [pool](IncentiveKey.md#pool)
- [refundee](IncentiveKey.md#refundee)
- [rewardToken](IncentiveKey.md#rewardtoken)
- [startTime](IncentiveKey.md#starttime)

## Properties

### endTime

• **endTime**: `BigintIsh`

The time that the incentive program ends.

#### Defined in

[staker.ts:28](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L28)

___

### pool

• **pool**: [`Pool`](../classes/Pool.md)

The pool that the staked positions must provide in.

#### Defined in

[staker.ts:20](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L20)

___

### refundee

• **refundee**: `string`

The address which receives any remaining reward tokens at `endTime`.

#### Defined in

[staker.ts:32](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L32)

___

### rewardToken

• **rewardToken**: `Token`

The token rewarded for participating in the staking program.

#### Defined in

[staker.ts:16](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L16)

___

### startTime

• **startTime**: `BigintIsh`

The time when the incentive program begins.

#### Defined in

[staker.ts:24](https://github.com/Uniswap/v3-sdk/blob/08a7c05/src/staker.ts#L24)
