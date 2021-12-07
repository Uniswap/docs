---
id: removing
title: Removing Liquidity
---

## Removing Liquidity from a Position

Use the function `removeCallParameters` with the `position` instantiated earlier and a `RemoveLiquidityOptions` interface. The reference for [`RemoveLiquidityOptions`](https://docs.uniswap.org/sdk/reference/interfaces/RemoveLiquidityOptions) is:

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

To remove liquidity from a position, set the parameters for `tokenId`, `liquidityPercentage`, `slippageTolerance`, `deadline`, and `collectOptions`. 

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

The parameter inputs are outlined below for `RemoveLiquidityOptions`:
-  the`tokenId` is again set to 1 for this example, but refers to the unique id of the position nft. 
- `liquidityPercentage` represents the amount of liquidity to remove. Adjust this parameter based on how much liquidity you want to remove. Set it to `Percent(1)` to remove all liquidity. 
- This example sets `slipppageTolerance` and `deadline` to the same values as the previous examples. 
- `collectOptions` defines the tokens to be collected and are passed onto `collect`. This example collects the maximum amount of DAI and USDC. 

When collecting fees in ETH, you must precompute the fees owed to protect against reentrancy attacks. In order to set a safety check, set the minimum fees owed in `expectedCurrencyOwed0` and `expectedCurrencyOwed1`. To calculate this, quote the `collect` function and store the amounts. The interface does similar behavior [here](https://github.com/Uniswap/uniswap-interface/blob/eff512deb8f0ab832eb8d1834f6d1a20219257d0/src/hooks/useV3PositionFees.ts#L32). For this example, it is not necessary to set a minimum amount of fees to collect because there is no concern with reentrancy for tokens (DAI/USDC).


```typescript
const { calldata, value } = NonfungiblePositionManager.removeCallParameters(position, {
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

You now know how to mint a liquidity position, add liquidity, and remove liquidity. Here's the [full example code](https://github.com/Uniswap/uniswap-docs/blob/main/sdk-examples/AddAndRemoveLiquidity.tsx) for reference.
