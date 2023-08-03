---
id: decrease-liquidity
title: Decrease Liquidity
sidebar_position: 4
---

Make sure to go through the [Setting Up Your Contract](./setting-up-your-contract.md) before continuing to this section

Here we decrease the liquidity of our position without withdrawing all of it.

- This example assumes the contract already has possession of the position NFT, and requires the calling address to be the same address that deposited the position NFT to our contract.

- In production, `amount0Min` and `amount1Min` should be adjusted to create slippage protections.

## Decrease Liquidity

```solidity
    /// @notice A function that decreases the current liquidity by half. An example to show how to call the `decreaseLiquidity` function defined in periphery.
    /// @param tokenId The id of the erc721 token
    /// @return amount0 The amount received back in token0
    /// @return amount1 The amount returned back in token1
    function decreaseLiquidityInHalf(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        // caller must be the owner of the NFT
        require(msg.sender == deposits[tokenId].owner, 'Not the owner');
        // get liquidity data for tokenId
        uint128 liquidity = deposits[tokenId].liquidity;
        uint128 halfLiquidity = liquidity / 2;

        // amount0Min and amount1Min are price slippage checks
        // if the amount received after burning is not greater than these minimums, transaction will fail
        INonfungiblePositionManager.DecreaseLiquidityParams memory params =
            INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: halfLiquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);

        INonfungiblePositionManager.CollectParams memory collectParams =
            INonfungiblePositionManager.CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: amount0,
                amount1Max: amount1
            });

        (collectedAmount0, collectedAmount1) = nonfungiblePositionManager.collect(collectParams);

        // send liquidity back to owner
        _sendToOwner(tokenId, collectedAmount0, collectedAmount1);
    }
```

## Sending Fees To The Calling Address

This internal helper function sends any tokens, in the form of fees or position tokens, to the owner of an NFT.

In `_sendToOwner`, we pass the amount of fees due, previously populated in the last function, as arguments to `safeTransfer`, which transfers the fees to `owner`.

```solidity
    /// @notice Transfers funds to owner of NFT
    /// @param tokenId The id of the erc721
    /// @param amount0 The amount of token0
    /// @param amount1 The amount of token1
    function _sendToOwner(
        uint256 tokenId,
        uint256 amount0,
        uint256 amount1
    ) internal {
        // get owner of contract
        address owner = deposits[tokenId].owner;

        address token0 = deposits[tokenId].token0;
        address token1 = deposits[tokenId].token1;
        // send collected fees to owner
        TransferHelper.safeTransfer(token0, owner, amount0);
        TransferHelper.safeTransfer(token1, owner, amount1);
    }
```
