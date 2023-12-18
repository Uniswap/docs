---
id: minting
title: Minting a Position
---

## Introduction

This guide will cover how to create (or mint) a liquidity position on the Uniswap V3 protocol.
It is based on the [minting a position code example](https://github.com/Uniswap/examples/tree/main/v3-sdk/minting-position), found in the Uniswap code examples [repository](https://github.com/Uniswap/examples).
To run this example, check out the examples's [README](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/README.md) and follow the setup instructions.

:::info
If you need a briefer on the SDK and to learn more about how these guides connect to the examples repository, please visit our [background](../01-background.md) page!
:::

In the Uniswap V3 protocol, liquidity positions are represented using non-fungible tokens. In this guide we will use the `NonfungiblePositionManager` class to help us mint a liquidity position for the  **USDC - DAI** pair. The inputs to our guide are the **two tokens** that we are pooling for, the **amount** of each token we are pooling for and the Pool **fee**.

The guide will **cover**:

1. Giving approval to transfer our tokens
2. Calculating our `Position` from our input tokens
3. Configuring and executing our minting transaction

At the end of the guide, given the inputs above, we should be able to mint a liquidity position with the press of a button and view the position on the UI of the web application.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v3-sdk`](https://www.npmjs.com/package/@uniswap/v3-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/smart-order-router`](https://www.npmjs.com/package/@uniswap/smart-order-router)

The core code of this guide can be found in [`mintPosition()`](https://github.com/Uniswap/examples/blob/main/v3-sdk/minting-position/src/libs/positions.ts#L37)

## Giving approval to transfer our tokens

We want to use the `NonfungiblePositionManager` contract to create our liqudity position.
In situations where a smart contract is transfering tokens on our behalf, we need to give it approval to do so.

We can use the `approveTokenTransfer()` function from the sdk for that:

```typescript
import { approveTokenTransfer } from '@uniswap/v3-sdk'
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from '@uniswap/sdk-core'

const signer = getWallet()

const positionManagerAddress = NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[
  CurrentConfig.tokens.token0.chainId
  ]

const token0Approval = await approveTokenTransfer(
  positionManagerAddress,
  token0Address,
  amount0,
  signer
)
const token1Approval = await approveTokenTransfer(
  positionManagerAddress,
  token1Address,
  amount1,
  signer
)
```

We can get the Contract address for the NonfungiblePositionManager from the `NONFUNGIBLE_POSITION_MANAGER_ADDRESSES` in the sdk-core.

## Calculating our `Position` from our input tokens

To create our Position, we first need to instantiate a `Pool` object:

```typescript
  import {Pool} from '@uniswap/v3-sdk'

  const provider = getProvider()

  const pool = await Pool.initFromChain(
    provider,
    CurrentConfig.tokens.in,
    CurrentConfig.tokens.out,
    CurrentConfig.tokens.poolFee
  )
```

Next, we can use the pool to create an instance of a `Position` object, which represents a Liquidity Position offchain:

```typescript
import { Position } from '@uniswap/v3-sdk'
import { BigIntish } from '@uniswap/sdk-core'

// The maximum token amounts we want to provide. BigIntish accepts number, string or bigint
const amount0: BigIntish = ...
const amount1: BigIntish = ...

const position = Position.fromAmounts({
  pool: pool,
  tickLower:
    nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
    pool.tickSpacing * 2,
  tickUpper:
    nearestUsableTick(pool.tick, pool.tickSpacing) +
    pool.tickSpacing * 2,
  amount0: amount0,
  amount1: amount1,
  useFullPrecision: true,
})
```

We use the `fromAmounts` static function of the `Position` class to create an instance of it, which uses the following parameters:

- The **tickLower** and **tickUpper** parameters specify the price range at which to provide liquidity. This example calls **nearestUsableTick** to get the current useable tick and adjust the lower parameter to be below it by two **tickSpacing** and the upper to be above it by two tickSpacing. This guarantees that the provided liquidity is "in range", meaning it will be earning fees upon minting this position
- **amount0** and **amount1** define the maximum amount of currency the liquidity position can use. In this example, we supply these from our configuration parameters.

Given those parameters, `fromAmounts` will attempt to calculate the maximum amount of liquidity we can supply.

## Configuring and executing our minting transaction

We can now use the `NonfungiblePositionManager` class to mint our Position:

```typescript
import { MintOptions, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { Percent } from '@uniswap/sdk-core'

const signer = getWallet()

const mintOptions: MintOptions = {
  recipient: getWalletAddress(),
  deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  slippageTolerance: new Percent(50, 10_000),
}

// get calldata for minting a position
const txResponse = NonfungiblePositionManager.mintOnChain(
  signer,
  provider,
  position,
  mintOptions
)
```

The `MintOptions` interface requires three keys:

- `recipient` defines the address of the Position owner, so in our case the address of our wallet.
- `deadline` defines the latest point in time at which we want our transaction to be included in the blockchain.
- `slippageTolerance` defines the maximum amount of **change of the ratio** of the Tokens we provide. The ratio can change if for example **trades** that change the price of the Pool are included before our transaction.

The `mitOnChain()` function directly signs and executes a transaction that will create our Position.

The effect of the transaction is to mint a new Position NFT. We should see a new position with liquidity in our list of positions.

## Next Steps

Once you have minted a position, our next guide ([Adding and Removing Liquidity](./03-modifying-position.md)) will demonstrate how you can add and remove liquidity from that minted position!
