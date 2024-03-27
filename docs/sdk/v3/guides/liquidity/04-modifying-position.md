---
id: modifying-position
title: Adding & Removing Liquidity
---

## Introduction

This guide will cover how to modify a liquidity position by adding or removing liquidity on the Uniswap V3 protocol. It is based on the [modifying a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/modifying-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples). To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/modifying-position/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position and then modify the provided liquidity for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for, the Pool **fee** and the **fraction** by which to **add and remove** from our position.

The guide will **cover**:

1. Adding liquidity to our position
2. Removing liquidity from our position

At the end of the guide, given the inputs above, we should be able to add or remove liquidity from a minted position with the press of a button and see the change reflected in our position and the balance of our tokens.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)

The core code of this guide can be found in [`addLiquidity()`](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src/example/Example.tsx#L33) and [`removeLiquidity()`](https://github.com/Uniswap/examples/blob/733d586070afe2c8cceb35d557a77eac7a19a656/v3-sdk/modifying-position/src/example/Example.tsx#L83)

:::note
This guide assumes you are familiar with our [Minting a Position](./02-minting-position.md) guide. A minted position is required to add or remove liquidity from, so the buttons will be disabled until a position is minted.

Also note that we do not need to give approval to the `NonfungiblePositionManager` to transfer our tokens as we will have already done that when minting our position.
:::

## Configuration and utils

The example can be configured in the [`config.ts`](https://github.com/Uniswap/examples/blob/d34a53412dbf905802da2249391788a225719bb8/v3-sdk/modifying-position/src/config.ts) file.
The `CurrentConfig` object has this structure:

```typescript
export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
  },
  wallet: {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  tokens: {
    token0: USDC_TOKEN,
    token0Amount: 1000,
    token1: DAI_TOKEN,
    token1Amount: 1000,
    poolFee: FeeAmount.LOW,
    fractionToRemove: 1,
    fractionToAdd: 0.5,
  },
}
```

You should already be familiar with the `rpc`, `wallet` and token parameters, they are used in the same way as in the guides earlier in our v3-sdk series.
The `fractionToAdd` variable is the multiplicator by which we will increase the Position. A fraction of **0.5** means we increase the liquidity by **50%**.
The `fractionToRemove` variable is the fraction of the Position that we want to remove later in the guide. A fraction of **1** means we remove **100%** of the liquidity.

## Adding liquidity to our position

Assuming we have already minted a position, our first step is to construct the modified position using our original position to calculate the amount by which we want to increase our current position:

```typescript
const fractionToAdd: number = ...

const amount0Increased: JSBI = fromReadableAmount(
    readableAmount0 * fractionToAdd, 
    token0.decimals
)
const amount1Increase: JSBI = fromReadableAmount(
    readableAmount1 * fractionToAdd, 
    token1.decimals
)

const positionToIncreaseBy = constructPosition(
    amount0Increased,
    amount1Increase
  )
)
```

The `fromReadableAmount()` function calculates the amount of tokens in their smallest unit, so for example 1 ETH would be `1000000000000000000` Wei as ETH has 18 decimals.

A better way to get the amounts might be to fetch them with the positionId directly from the blockchain.
We demonstrated how to do that in the [first guide](./01-position-data.md#fetching-positions) of this series.

```typescript
import { Pool, Position } from '@uniswap/v3-sdk'
import JSBI from 'jsbi'

function constructPosition(
    amount0: JSBI,
    amount1: JSBI
): Position {
    // create Pool same as in the previous guide
    const pool = new Pool(...)

    // create position using the maximum liquidity from input amounts
    return Position.fromAmounts({
        pool,
        tickLower:
            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
            pool.tickSpacing * 2,
        tickUpper:
            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) +
            pool.tickSpacing * 2,
        amount0,
        amount1,
        useFullPrecision: true,
    })
}
```

The function receives two arguments, which are the amounts that are used to construct the Position instance. In this example, both of the arguments follow the same logic: we multiply the parameterized `tokenAmount` by the parameterized `fractionToAdd` since the new liquidity position will be added on top of the already minted liquidity position.

We then need to construct an options object of type [`AddLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L77) similar to how we did in the minting case. In this case, we will use [`IncreaseOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L75):

```typescript
import { AddLiquidityOptions } from '@uniswap/v3-sdk'

const addLiquidityOptions: AddLiquidityOptions = {
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
  tokenId,
}
```

Compared to minting, we have omitted the `recipient` parameter and instead passed in the `tokenId` of the position we previously minted.
As the Position already exists, the recipient doesn't change, instead the NonfungiblePositionManager contract can modify the existing Position by accessing it with its id.

The tokenId can be fetched with the tokenOfOwnerByIndex function of the NonfungiblePositionManager Contract as described [here](./01-position-data.md#fetching-positions).

The newly created position along with the options object are then passed to the `NonfungiblePositionManager`'s `addCallParameters`:

```typescript
import { NonfungiblePositionManager } from '@uniswap/v3-sdk'

const positionToIncreaseBy = constructPosition(CurrentConfig.tokens.amount0, CurrentConfig.tokens.amount1)

const { calldata, value } = NonfungiblePositionManager.addCallParameters(
  positionToIncreaseBy,
  addLiquidityOptions
)
```

The return values of `addCallParameters` are the calldata and value of the transaction we need to submit to increase our position's liquidity. We can now build and execute the transaction:

```typescript
import { ethers } from 'ethers'

const transaction = {
  data: calldata,
  to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
  value: value,
  from: address,
  maxFeePerGas: MAX_FEE_PER_GAS,
  maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
}

const wallet = new ethers.Wallet(privateKey, provider)

const txRes = await wallet.sendTransaction(transaction)
```

We can get the Contract address for the NonfungiblePositionManager from [Github](https://github.com/Uniswap/v3-periphery/blob/main/deploys.md).

After pressing the button, note how the balance of USDC and DAI drops and our position's liquidity increases.

## Removing liquidity from our position

The `removeLiquidity` function is the mirror action of adding liquidity and will be somewhat similar as a result, requiring a position to already be minted.

To start, we create a position identical to the one we minted:

```typescript
const amount0: JSBI = fromReadableAmount(
    readableAmount0 * fractionToAdd, 
    token0.decimals
)
const amount1: JSBI = fromReadableAmount(
    readableAmount1 * fractionToAdd, 
    token1.decimals
)

const currentPosition = constructPosition(
  amount0,
  amount1
)
```

We then need to construct an options object of type [`RemoveLiquidityOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L138):

```typescript
import { RemoveLiquidityOptions } from '@uniswap/v3-sdk'
import { Percent } from '@uniswap/sdk-core'

const removeLiquidityOptions: RemoveLiquidityOptions = {
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
  tokenId: positionId,
  // percentage of liquidity to remove
  liquidityPercentage: new Percent(0.5),
  collectOptions,
}
```

Just as with adding liquidity, we have omitted the `recipient` parameter and instead passed in the `tokenId` of the position we previously minted.

We have also provide two additional parameters:

- `liquidityPercentage` determines how much liquidity is removed from our initial position (as a `Percentage`), and transfers the removed liquidity back to our address. We set this percentage from our guide configuration ranging from 0 (0%) to 1 (100%). In this example we would remove 50% of the liquidity.
- [`collectOptions`](https://github.com/Uniswap/v3-sdk/blob/08a7c050cba00377843497030f502c05982b1c43/src/nonfungiblePositionManager.ts#L105) gives us the option to collect the fees, if any, that we have accrued for this position. In this example, we won't collect any fees, so we provide zero values. If you'd like to see how to collect fees without modifying your position, check out our [collecting fees](./03-collecting-fees.md) guide!

```typescript
import { CurrencyAmount } from '@uniswap/sdk-core'
import { CollectOptions } from '@uniswap/v3-sdk'

const collectOptions: Omit<CollectOptions, 'tokenId'> = {
  expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(
    token0,
    0
  ),
  expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(
    token1,
    0
  ),
  recipient: address,
}
```

The position object along with the options object is passed to the `NonfungiblePositionManager`'s `removeCallParameters`, similar to how we did in the adding liquidity case:

```typescript
const { calldata, value } = NonfungiblePositionManager.removeCallParameters(
  currentPosition,
  removeLiquidityOptions
)
```

The return values `removeCallParameters` are the calldata and value that are needed to construct the transaction to remove liquidity from our position. We can build the transaction and send it for execution:

```typescript
const transaction = {
  data: calldata,
  to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
  value: value,
  from: address,
  maxFeePerGas: MAX_FEE_PER_GAS,
  maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
}

const txRes = await wallet.sendTransaction(transaction)
```

After pressing the button, note how the balance of USDC and DAI increases and our position's liquidity drops.

## Next Steps

Now that you can mint and modify a position, check out how to [collect fees](./04-collecting-fees.md) from the position!
