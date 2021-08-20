---
id: liquidity-actions
title: Adding Liquidity
---

## Adding Liquidity to the Position

Constructing the calldata for adding liquidity uses the same function call to `addCallParameters`, which takes in a `Position` and an options field of type `AddLiquidityOptions`. Since the goal of this example is to add liquidity to an already existing position, construct `IncreaseOptions` instead of `MintOptions`. `IncreaseOptions` types are defined by the interfaces `CommonAddLiquidityOptions & IncreaseSpecificOptions`. `CommonAddLiquidityOptions` is outlined above because minting also required these parameters and the reference for `IncreaseSpecificOptions` is:

```typescript
export interface IncreaseSpecificOptions {
  /**
   * Indicates the ID of the position to increase liquidity for.
   */
  tokenId: BigintIsh
}
```

Thus, to construct the `IncreaseOptions` struct we just need to specify `slippageTolerance`, `deadline`, and `tokenId`. The `tokenId` is the unique identifier of the position (or more specifically, the ERC721 that represents a position) for which we want to add liquidity. In this example, our tokenId is just 1 for this example, but in production, each tokenId is unique and can be fetched on chain.

To fetch tokenIds consider the functions `tokensByIndex` or `tokenOfOwnerByIndex` defined [here](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Enumerable-tokenOfOwnerByIndex-address-uint256-).

```typescript
const {calldata ,value} = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: new Percent(50, 10_000),
        deadline: deadline,
        tokenId: 1
        });
  ```
