---
id: removing
title: Removing Liquidity
---

## Removing Liquidity from a Position

To retrieve the remove liquidity calldata, use the function `removeCallParameters`, which takes in a `Position`, which we defined earlier, and `RemoveLiquidityOptions`. The reference for `RemoveLiquidityOptions` is:

```typescript
/**
 * Options for producing the calldata to exit a position.
 */
export interface RemoveLiquidityOptions {
  /**
   * The ID of the token to exit
   */
  tokenId: BigintIsh

  /**
   * The percentage of position liquidity to exit.
   */
  liquidityPercentage: Percent

  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh

  /**
   * Whether the NFT should be burned if the entire position is being exited, by default false.
   */
  burnToken?: boolean

  /**
   * The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT
   */
  permit?: NFTPermitOptions

  /**
   * Parameters to be passed on to collect
   */
  collectOptions: Omit<CollectOptions, 'tokenId'>
}
```

To remove liquidity from a position, we set the parameters for `tokenId`, `liquidityPercentage`, `slippageTolerance`, `deadline`, and `collectOptions`. 

The reference for `CollectOptions` is 
```typescript
export interface CollectOptions {
  /**
   * Indicates the ID of the position to collect for.
   */
  tokenId: BigintIsh

  /**
   * Expected value of tokensOwed0, including as-of-yet-unaccounted-for fees/liquidity value to be burned
   */
  expectedCurrencyOwed0: CurrencyAmount<Currency>

  /**
   * Expected value of tokensOwed1, including as-of-yet-unaccounted-for fees/liquidity value to be burned
   */
  expectedCurrencyOwed1: CurrencyAmount<Currency>

  /**
   * The account that should receive the tokens.
   */
  recipient: string
}
```

For the `RemoveLiquidityOptions`, the`tokenId` is again set to 1 for this example, but refers to the unique id of the position nft. `liquidityPercentage` represents the amount of liquidity to remove. Adjust the `liquidity` parameter based on how much liquidity you want to remove. Set it to `Percent(1)` to remove all liquidity. This example sets `slipppageTolerance` and `deadline` to the same values as the previous examples. Finally. `collectOptions` defines the tokens to be collected and are passed onto `collect`. This example collects the maximum amount of DAI and USDC. `expectedCurrencyOwed0` and `expectedCurrencyOwed1` are the minimum amount of fees. 

Collecting fees in ETH requires precomputing the fees owed to protect against reentrency attacks. The `expectedCurrencyOwed0` and `expectedCurrencyOwed1` parameters allow you to set this safety check which should be set to the mnimum fees owed. To calculate this, you can quote the collect function and store the amounts. The interface does similar behavior [here](https://github.com/Uniswap/uniswap-interface/blob/eff512deb8f0ab832eb8d1834f6d1a20219257d0/src/hooks/useV3PositionFees.ts#L32).


```typescript
const {calldata, value} = NonfungiblePositionManager.removeCallParameters(position, {
        tokenId: 1,
        liquidityPercentage: new Percent(1),
        slippageTolerance: new Percent(50, 10_000),
        deadline: deadline,
        collectOptions: {
          expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(DAI, 0),
          expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(USDC, 0),
          recipient: sender
        }}
    );
```

## The example code

[Here](https://github.com/Uniswap/uniswap-docs/blob/main/sdk-examples/AddAndRemoveLiquidity.tsx) is a link to the full file with all example snippets to give a holistic picture of declaring variables and interacting with the SDK with the functions `addCallParameters` and `removeCallParameters`. 