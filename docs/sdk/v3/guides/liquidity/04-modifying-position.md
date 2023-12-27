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

- [`@uniswapfoundation/v3-sdk`](https://www.npmjs.com/package/@uniswapfoundation/v3-sdk)
- [`@uniswapfoundation/sdk-core`](https://www.npmjs.com/package/@uniswapfoundation/sdk-core)

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

Assuming we have already minted a position, our first step is to fetch that position, or reuse the `Position` object if it was just created.

To fetch a position using the id you will need an initialized ethers provider for the RPC you are using.
For the local fork configuration mentioned above you can use `http://localhost:8545`.

Use the following snippet to fetch a position using the position id:

```typescript
import { ethers } from 'ethers'
import { Position } from '@uniswapfoundation/v3-sdk'

// You need to know this, or fetch the position differently
const myPositionId = "0xabcdef"

const ethersProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const position = await Position.fetchWithPositionId(ethersProvider, myPositionId)
```

For more examples on how to fetch your position, refer to the [Fetching Positions Guide](./03-fetching-positions.md).

The easiest version of increasing your position is if you know a percentage by which you want to increase it.
If you increase it by 10%, it means both current token balances (amount0, amount1) in the position will be increased by 10% each.

So if you have a position with 1000 USDC and 1000 USDT, the 10% increase will increase both to 1100.
This also means you need to make approvals to the `NonfungiblePositionManager` before to reflect at least those 100 USDC and USDT changes, as mentioned in the beginning of this guide. The exact amount can be calculated using current amount0 and amount1 of your position and the percentage you are using.

The snippet to increase liquidity by 10% can be seen below:

```typescript
import { ethers } from 'ethers'
import { Fraction } from '@uniswapfoundation/sdk-core'

// Use your private key or another way to initialize a Wallet.
// A different way would be to use the Metamask signer in the browser.
const myWallet = new ethers.Wallet("0x_private_key")

const ethersProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545")

// Either you know this already like mentioned before, or you can access it from the fetched position with
// position.positionId
const positionId = "0xabcdef"
const addLiquidityOptions: AddLiquidityOptions = {
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
  tokenId: positionId,
}

const transactionResponse = await position.increasePositionByPercentageOnChain({
  signer: myWallet,
  provider: ethersProvider,
  percentage: new Fraction(10, 100), // (10 / 100) for 10%tokenId
  options: addLiquidityOptions
})

// Wait for 3 confirmations and then access the transaction receipt.
const transactionReceipt = await transactionResponse.wait(3)
```

In certain case you might want to increase your position to a specific value.

Let's assume you display position data in a UI to the user and they can freely change the amounts to which they want to change the position amounts.
Whenever the user changes one of the values (amount0 or amount1), you will need to automatically update the other value as positions can only be changed
in percentage increments on both sides as they need to be balanced.

If you display a position with the following values:

```
Pool: USDC <> WETH
amount0: 1000 USDC
amount1: 0.5 WETH
```

And the user wants to change `amount0` to 1500 USDC, you would run a calculation like the following:

```typescript
const currentAmount0 = myPosition.amount0 // USDC
const currentAmount1 = myPosition.amount1 // WETH

// User asked for 1500 USDC. Fractions are initialized with the smallest amount
// So we need to multiply 1500 by 10^decimals
const wantedAmount0 = CurrencyAmount.fromFractionalAmount(myPosition.pool.token0, 1500n * (10n ** BigInt(myPosition.pool.token0.decimals)), 1)

// First make sure that wantedAmount0 is higher than currentAmount0, otherwise you will need to follow
// the next section of this guide to decrease a position.

const positionMultiplier = wantedAmount0.divide(currentAmount0).asFraction

const resultingAmount1 = currentAmount1.multiply(positionMultiplier)

// We can now display resultingAmount1 to the user, so he knows both amounts before confirming the position change.

// 1500 / 1000 = 1.5, so we need to subtract 1 to get 0.5, which is the format the increase position function expects
const percentageIncrease = positionMultiplier.subtract(new Fraction(1, 1))
```

Using this `percentageIncrease` Fraction you can follow the snippets from before to increase the position by this percentage.

Make sure to approve the `NonfungiblePositionManager` by the difference of current amounts and wanted amounts for both tokens. If you made an unlimited
approval for minting the position, you can skip this step.

## Removing liquidity from our position

Assuming we have already minted a position, our first step is to fetch that position, or reuse the `Position` object if it was just created.

To fetch a position using the id you will need an initialized ethers provider for the RPC you are using.
For the local fork configuration mentioned above you can use `http://localhost:8545`.

Use the following snippet to fetch a position using the position id:

```typescript
import { ethers } from 'ethers'
import { Position } from '@uniswapfoundation/v3-sdk'

// You need to know this, or fetch the position differently
const myPositionId = "0xabcdef"

const ethersProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
const position = await Position.fetchWithPositionId(ethersProvider, myPositionId)
```

For more examples on how to fetch your position, refer to the [Fetching Positions Guide](./03-fetching-positions.md).

The easiest version of increasing your position is if you know a percentage by which you want to decrease it.
If you decrease it by 10%, it means both current token balances (amount0, amount1) in the position will be decreased by 10% each.

So if you have a position with 1000 USDC and 1000 USDT, the 10% decrease will decrease both to 900.

If you want to completely close a position, pass 100% to this function.

The snippet to decrease liquidity by 10% can be seen below:

```typescript
import { ethers } from 'ethers'
import { Fraction } from '@uniswapfoundation/sdk-core'

// Use your private key or another way to initialize a Wallet.
// A different way would be to use the Metamask signer in the browser.
const myWallet = new ethers.Wallet("0x_private_key")

const ethersProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545")

// Either you know this already like mentioned before, or you can access it from the fetched position with
// position.positionId
const positionId = "0xabcdef"
const decreaseLiquidityOptions: Omit<RemoveLiquidityOptions, 'liquidityPercentage' | 'collectOptions'> = {
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
  tokenId: positionId,
}

const transactionResponse = await position.decreasePositionByPercentageOnChain({
  signer: myWallet,
  provider: ethersProvider,
  percentage: new Fraction(10, 100), // (10 / 100) for 10%tokenId
  options: decreaseLiquidityOptions
})

// Wait for 3 confirmations and then access the transaction receipt.
const transactionReceipt = await transactionResponse.wait(3)
```

In certain case you might want to decrease your position to a specific value.

Let's assume you display position data in a UI to the user and they can freely change the amounts to which they want to change the position amounts.
Whenever the user changes one of the values (amount0 or amount1), you will need to automatically update the other value as positions can only be changed
in percentage increments on both sides as they need to be balanced.

If you display a position with the following values:

```
Pool: USDC <> WETH
amount0: 1000 USDC
amount1: 0.5 WETH
```

And the user wants to change `amount0` to 800 USDC, you would run a calculation like the following:

```typescript
const currentAmount0 = myPosition.amount0 // USDC
const currentAmount1 = myPosition.amount1 // WETH

// User asked for 800 USDC. Fractions are initialized with the smallest amount
// So we need to multiply 1500 by 10^decimals
const wantedAmount0 = CurrencyAmount.fromFractionalAmount(myPosition.pool.token0, 800n * (10n ** BigInt(myPosition.pool.token0.decimals)), 1)

// First make sure that wantedAmount0 is lower than currentAmount0, otherwise you will need to follow
// the previous section of this guide to increase a position.

const positionMultiplier = wantedAmount0.divide(currentAmount0).asFraction

const resultingAmount1 = currentAmount1.multiply(positionMultiplier)

// We can now display resultingAmount1 to the user, so he knows both amounts before confirming the position change.

// 800 / 1000 = 0.8, so we need to do 1 - 0.8 to get 0.2, which is the format the decrease position function expects
const percentageDecrease = new Fraction(1, 1).subtract(positionMultiplier)
```

Using this `percentageDecrease` Fraction you can follow the snippets from before to decrease the position by this percentage.

For decreasing positions, no approvals are required.

## Next Steps

Now that you can mint and modify a position, check out how to [collect fees](./04-collecting-fees.md) from the position!
