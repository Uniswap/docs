---
id: collect-fees
title: Collecting Fees
sidebar_position: 3
---

## Collect Fees

- Make sure to go through the [first guide](./setting-up-your-contract.md) before continuing to this section.

- For each of these liquidity interaction examples, our contract must be in possession of the liquidity position NFT. Any example where depositing the NFT is not coded into the function, it is assumed to have already been transferred to our contract.

To collect the fees of an owner position, we will need to transfer the NFT from the calling address, assign the relevant variables from the NFT to local variables within our function, and pass those variables to the `nonfungiblePositionManager` when we call `collect`.

This function specifically collects all fees and sends to original owner of the NFT while still custodying the NFT
Set `amount0Max` and `amount1Max` to type(uint128).max to collect all fees

```solidity
    /// @notice Collects the fees associated with provided liquidity
    /// @dev The contract must hold the erc721 token before it can collect fees
    /// @param tokenId The id of the erc721 token
    /// @return amount0 The amount of fees collected in token0
    /// @return amount1 The amount of fees collected in token1
    function collectAllFees(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        // Caller must own the ERC721 position
        // Call to safeTransfer will trigger `onERC721Received` which must return the selector else transfer will fail
        nonfungiblePositionManager.safeTransferFrom(msg.sender, address(this), tokenId);

        // set amount0Max and amount1Max to uint256.max to collect all fees
        // alternatively can set recipient to msg.sender and avoid another transaction in `sendToOwner`
        INonfungiblePositionManager.CollectParams memory params =
            INonfungiblePositionManager.CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        // send collected feed back to owner
        _sendToOwner(tokenId, amount0, amount1);
    }
```

## Sending Fees To The Calling Address

This internal helper function sends any tokens, in the form of fees or position tokens, to the owner of an NFT.

in `_sendToOwner` we pass the amounts of fees due, previously populated in the last function, as arguments to `safeTransfer` which transfers the fees to `owner`.

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
