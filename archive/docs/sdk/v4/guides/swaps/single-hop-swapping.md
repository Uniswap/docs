---
id: single-hop-swapping
title: Executing a Single-Hop Swap
sidebar_position: 2
---

## Introduction

This guide will build off our [quoting guide](./quoting.md) and show how to use a quote to construct and execute a trade on the Uniswap v4 protocol. In this example we will trade between two tokens: **ETH and USDC**.

The guide will cover:

1. Setting up swap parameters and pool configuration
2. Using Universal Router and executing a single-hop swap

At the end of this guide, you should be able to execute swaps between any two tokens using a single pool on Uniswap V4.

For this guide, the following Uniswap packages are used:

- [`@uniswap/v4-sdk`](https://www.npmjs.com/package/@uniswap/v4-sdk)
- [`@uniswap/sdk-core`](https://www.npmjs.com/package/@uniswap/sdk-core)
- [`@uniswap/universal-router-sdk`](https://www.npmjs.com/package/@uniswap/universal-router-sdk)

## Setting up Swap Configuration

First, let's define our swap configuration. We will use the same pool structure from the quoting guide:

```typescript
import { SwapExactInSingle } from '@uniswap/v4-sdk'
import { USDC_TOKEN, ETH_TOKEN } from './constants'

export const CurrentConfig: SwapExactInSingle = {
    poolKey: {
        currency0: ETH_TOKEN.address,
        currency1: USDC_TOKEN.address,
        fee: 500,
        tickSpacing: 10,
        hooks: "0x0000000000000000000000000000000000000000",
    },
    zeroForOne: true, // The direction of swap is ETH to USDC. Change it to 'false' for the reverse direction
    amountIn: ethers.utils.parseUnits('1', ETH_TOKEN.decimals).toString(), 
    amountOutMinimum: "minAmountOut", // Change according to the slippage desired
    hookData: '0x00'
}
```

Like the quoting guide, the pool used is defined by a pair of tokens in `constants.ts`. You can change these two tokens and the other pool parameters in the config as long as a pool actually exists for that configuration.

## Using Universal Router and executing a single-hop swap

The Universal Router is a flexible, gas-efficient contract designed to execute complex swap operations across various protocols, including Uniswap v4. It serves as an intermediary between users and the Uniswap v4 PoolManager, handling the intricacies of swap execution.

So, we construct an instance of an **ethers** `Contract` for the Universal Router contract in order to interact with it:

```typescript
const UNIVERSAL_ROUTER_ADDRESS = "0x66a9893cc07d91d95644aedd05d03f95e1dba8af" // Change the Universal Router address as per the chain

const UNIVERSAL_ROUTER_ABI = [
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
]

const universalRouter = new ethers.Contract(
    UNIVERSAL_ROUTER_ADDRESS,
    UNIVERSAL_ROUTER_ABI,
    signer
)
```

We can get the `UNIVERSAL_ROUTER_ADDRESS` for our chain from [Uniswap Deployments](/contracts/v4/deployments).

A signer object can be created like this:

```typescript
const provider = new ethers.providers.JsonRpcProvider("RPC");
const signer = new ethers.Wallet(
  "YOUR PRIVATE KEY",
  provider
);
```

Now, let's implement the main function that handles the swap. When encoding a swap command for the Universal Router, we need to choose between two types of swaps:

- Exact Input Swaps: Use this swap-type when you know the exact amount of tokens you want to swap in, and you're willing to accept any amount of output tokens above your minimum. This is common when you want to sell a specific amount of tokens.
- Exact Output Swaps: Use this swap-type when you need a specific amount of output tokens, and you're willing to spend up to a maximum amount of input tokens. This is useful when you need to acquire a precise amount of tokens, for example, to repay a loan or meet a specific requirement.

We will be doing an Exact Input swap in this example.

```typescript
import { Actions, V4Planner } from '@uniswap/v4-sdk'
import { CommandType, RoutePlanner } from '@uniswap/universal-router-sdk'

const v4Planner = new V4Planner()
const routePlanner = new RoutePlanner()

// Set deadline (1 hour from now)
const deadline = Math.floor(Date.now() / 1000) + 3600

v4Planner.addAction(Actions.SWAP_EXACT_IN_SINGLE, [CurrentConfig]);
v4Planner.addAction(Actions.SETTLE_ALL, [CurrentConfig.poolKey.currency0, CurrentConfig.amountIn]);
v4Planner.addAction(Actions.TAKE_ALL, [CurrentConfig.poolKey.currency1, CurrentConfig.amountOutMinimum]);

const encodedActions = v4Planner.finalize()

routePlanner.addCommand(CommandType.V4_SWAP, [v4Planner.actions, v4Planner.params])

// Only needed for native ETH as input currency swaps
const txOptions: any = {
    value: CurrentConfig.amountIn
}

const tx = await universalRouter.execute(
    routePlanner.commands,
    [encodedActions],
    deadline,
    txOptions
)

const receipt = await tx.wait()
console.log('Swap completed! Transaction hash:', receipt.transactionHash)
```

The actions in the planner define the sequence of operations that will be performed in our v4 swap:

- `SWAP_EXACT_IN_SINGLE`: This action specifies that we want to perform an exact input swap using a single pool.
- `SETTLE_ALL`: This action ensures all input tokens involved in the swap are properly paid. This is part of v4's settlement pattern for handling token transfers.
- `TAKE_ALL`: This final action collects all output tokens after the swap is complete.

The sequence of these actions is important as they define the complete flow of our swap operation from start to finish. The input and output currencies should be exchanged for the `SETTLE_ALL` and `TAKE_ALL` actions if the direction of the swap is reversed.

The `V4_SWAP` command tells the Universal Router that we want to perform a swap on a Uniswap v4 pool.

## Handling Token Approvals for ERC20 Swaps

When swapping ERC20 tokens, we need to set up approvals through Permit2. So, we construct an instance of an **ethers** `Contract` for the Permit2 contract in order to interact with it:

```typescript
const permit2Contract = new ethers.Contract(
    PERMIT2_ADDRESS, 
    PERMIT2_ABI, 
    signer
)
```

Create a similar one for the ERC20 token contract. If enough allowances have not been provided or the deadline has expired, we first need to approve Permit2 as a spender on the ERC20 token and then approve the Universal Router on Permit2.

```typescript
const tx1 = await erc20Contract.approve(PERMIT2_ADDRESS, ethers.constants.MaxUint256)
const tx2 = await permit2Contract.approve(
  tokenAddress,
  UNIVERSAL_ROUTER_ADDRESS,
  ethers.BigNumber.from(2).pow(160).sub(1), // MAX_UINT160
  deadline
)
```

The rest of the swap process remains the same.

## Next Steps

Now that you understand single-hop swaps, you might want to explore [multi-hop swaps](./multi-hop-swapping.md) for trading between tokens without direct pools or enough liquidity.
