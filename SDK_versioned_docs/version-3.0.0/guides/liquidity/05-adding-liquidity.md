---
id: adding
title: Adding Liquidity
---

## Adding Liquidity to the Position

Constructing the calldata for adding liquidity uses the same function call to `addCallParameters`, which takes in a `Position` and an options field of type `AddLiquidityOptions`. Since the goal of this example is to add liquidity to an already existing position, construct `IncreaseOptions` instead of `MintOptions`. `IncreaseOptions` types are defined by the interfaces [`CommonAddLiquidityOptions`](https://docs.niftyleague.com/sdk/reference/interfaces/CommonAddLiquidityOptions) and [`IncreaseSpecificOptions`](https://docs.niftyleague.com/sdk/reference/interfaces/IncreaseSpecificOptions).

```typescript
export interface CommonAddLiquidityOptions {
  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent;

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh;

  /**
   * Whether to spend ether. If true, one of the pool tokens must be WETH, by default false
   */
  useNative?: NativeCurrency;

  /**
   * The optional permit parameters for spending token0
   */
  token0Permit?: PermitOptions;

  /**
   * The optional permit parameters for spending token1
   */
  token1Permit?: PermitOptions;
}

export interface IncreaseSpecificOptions {
  /**
   * Indicates the ID of the position to increase liquidity for.
   */
  tokenId: BigintIsh;
}
```

To construct the `IncreaseOptions` struct, specify `slippageTolerance`, `deadline`, and `tokenId`. The `tokenId` is the unique identifier of the position (or more specifically, the ERC721 that represents a position). In this example, the `tokenId` is naively set to 1, but in production, each `tokenId` is unique and can be fetched on chain.

Use [the functions](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Enumerable-tokenOfOwnerByIndex-address-uint256-) `tokensByIndex` or `tokenOfOwnerByIndex` to fetch `tokenId`s for ERC721s.

```typescript
const { calldata, value } = NonfungiblePositionManager.addCallParameters(
  position,
  {
    slippageTolerance: new Percent(50, 10_000),
    deadline: deadline,
    tokenId: 1,
  }
);
```
