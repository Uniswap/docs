---
id: exit-bid
title: Exit and claim tokens
sidebar_position: 6
---

# Exit and claim tokens
This section will walk you through exiting a bid and claiming purchased tokens on a CCA auction.

## Prerequisites
This guide continues from the [previous section](/docs/contracts/liquidity-launchpad/quickstart/price-discovery.md). Basic knowledge of the CCA auction mechanism and Solidity is assumed.

## Summary
Currently we have a CCA contract deployed which we have submitted a bid to. We're the only bidder in the auction and the clearing price of the auction is at our max price. Let's modify the script to add another bid which will outbid our initial one, and show how both bids can be exited.

## Exiting a bid
From the previous section we have the following script (copy and pasted for convenience):
```solidity
contract ExampleCCABidScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        ContinuousClearingAuction auction = ContinuousClearingAuction(vm.envAddress("AUCTION_ADDRESS"));

        uint256 maxPrice = auction.floorPrice() + auction.tickSpacing(); // Bid at the next possible price
        uint256 amountRequired = (maxPrice * uint256(auction.totalSupply())) >> 96;
        uint128 amount = uint128(amountRequired);
        address owner = vm.envAddress("DEPLOYER"); // The deployer is the owner of the bid by default

        uint256 bidId = auction.submitBid{value: amount}(maxPrice, amount, owner, bytes(""));
        console2.log("Bid submitted with ID:", bidId);

        vm.roll(block.number + 1);

        auction.checkpoint();
        console2.log("checkpoint clearingPrice:", auction.clearingPrice());

        vm.stopBroadcast();
    }
}
```

Let's add another bid to the auction after our initial one. We'll bid at a price higher than the first bid but unlike the first bid, we won't deposit enough ETH to move the clearing price of the auction up to this new price. The second bid will be large enough to move the clearing price of the auction up, outbidding the first bid, but not large enough to move the clearing price of the auction up to the second bid's max price.

```solidity
    function run() public {
        vm.startBroadcast();

        ContinuousClearingAuction auction = ContinuousClearingAuction(vm.envAddress("AUCTION_ADDRESS"));

        uint256 maxPrice = auction.floorPrice() + auction.tickSpacing(); // Bid at the next possible price
        uint256 amountRequired = (maxPrice * uint256(auction.totalSupply())) >> 96;
        uint128 amount = uint128(amountRequired);
        address owner = vm.envAddress("DEPLOYER"); // The deployer is the owner of the bid by default

        uint256 bidId = auction.submitBid{value: amount}(maxPrice, amount, owner, bytes(""));
        console2.log("First bid submitted with ID:", bidId);

        vm.roll(block.number + 1);
        auction.checkpoint();
        console2.log("checkpoint clearingPrice after first bid:", auction.clearingPrice());

        maxPrice = auction.floorPrice() + 2 * auction.tickSpacing(); // Bid at a higher price than the first one
        amountRequired = (maxPrice * uint256(auction.totalSupply())) >> 96;
        // Deposit ~90% the amount of ETH required so the clearing price ends up somewhere between the first and second bid's max prices.
        amount = uint128(amountRequired * 9 / 10);

        bidId = auction.submitBid{value: amount}(maxPrice, amount, owner, bytes(""));
        console2.log("Second bid submitted with ID:", bidId);

        vm.roll(block.number + 1);
        auction.checkpoint();
        console2.log("checkpoint clearingPrice after second bid:", auction.clearingPrice());

        vm.stopBroadcast();
    }
}
```

You can run the script with the following command:
```bash
AUCTION_ADDRESS=<auction address> forge script scripts/ExampleCCABidScript.s.sol:ExampleCCABidScript \
--rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast -vvvv --slow
```

You'll see the following logs in the console:
```
== Logs ==
  First bid submitted with ID: 0
  checkpoint clearingPrice after first bid: 158456325028528668016640
  Second bid submitted with ID: 1
  checkpoint clearingPrice after second bid: 215207282483414186944057
```

Great! We've successfully submitted two bids to the auction and the clearing price of the auction is now at `215207282483414186944057`.

### Partially vs. fully filled bids
Bids in the auction can have periods where they are partially and fully filled. 

At a high level, a bid is considered "partially filled" whenever the clearing price is equal to the bid's max price. When the clearing price is strictly lower than the bid's max price, the bid is considered "fully filled". Once the clearingPrice moves above the bid's max price, the bid is outbid and stops purchasing tokens.

Let's take a look at the state of the two bids in the auction at this point in time:
| Checkpoint     | Bid 0 (max price: 1:1e6)          | Bid 1 (max price: 1:2e6) |
|----------------|------------------------------------|---------------------------|
| Checkpoint 0 (79228162514264334008320)    | Not placed            | Not placed   |
| Checkpoint 1 (158456325028528668016640)   | Partially filled      | Not placed   |
| Checkpoint 2 (215207282483414186944057)   | Outbid                | Fully filled |

The first bid is partially filled because the clearing price of the auction is equal to the bid's max price at checkpoint 1. The second bid is fully filled because the clearing price of the auction is strictly lower than the bid's max price at checkpoint 2 (215207282483414186944057 < 237684487542793002024960) or equivalently (2.7e-06 < 3e-06).

As of checkpoint 2 the first bid is considered `outbid` and it can be exited from the auction. It only participated for one block and the remainder of its ETH can be refunded back to the `owner`.

Let's append the following code to the end of the script to exit the first bid.
```solidity
    function run() public {
        // All the code from the previous script...

        uint64 lastCheckpointedBlock = auction.lastCheckpointedBlock();

        uint256 ownerBalanceBefore = address(owner).balance;
        auction.exitPartiallyFilledBid(0, uint64(firstCheckpointBlock), lastCheckpointedBlock);
        console2.log("Bid 0 exited");
        console2.log("Refunded ETH:", address(owner).balance - ownerBalanceBefore);

        Bid memory bid = auction.bids(0);
        console2.log("Bid 0 tokensFilled:", bid.tokensFilled);
        console2.log("Bid 0 exitedBlock:", bid.exitedBlock);
    }
}
```

Running this script gives the following output:
```
== Logs ==
  First bid submitted with ID: 0
  checkpoint clearingPrice after first bid: 158456325028528668016640
  Second bid submitted with ID: 1
  checkpoint clearingPrice after second bid: 215641168133582360708057
  Bid 0 exited
  Refunded ETH: 1995999999999999909677
  Bid 0 tokensFilled: 2000000000000000000000000
  Bid 0 exitedBlock: 5
```

The first bid is exited successfully and the remainder of its ETH can be refunded back to the `owner`. It purchased `2000000000000000000000000` wei of tokens (2000000) and was exited at block `5`. These funds can be used to re-bid on the auction at a later time if desired.

As the auction has not completed yet, the second bid is not exitable yet since its maxPrice is higher than the clearing price of the auction.

At the end of the auction and after `claimBlock` both bids can claim their purchased tokens.

### Claiming tokens
A bid must be exited before claiming tokens. Let's fast forward to the end of the auction so we can exit the second bid and claim tokens for both bids.

Append the following code to the end of the script:

```solidity
    function run() public {
        // All the code from the previous script...

        vm.roll(auction.endBlock());
        ownerBalanceBefore = address(owner).balance;
        auction.exitBid(1); // Exit the second bid
        console2.log("Bid 1 exited");
        console2.log("Refunded ETH:", address(owner).balance - ownerBalanceBefore);
        bid = auction.bids(1);
        console2.log("Bid 1 exitedBlock:", bid.exitedBlock);

        vm.roll(auction.claimBlock());
        uint256 ownerTokenBalanceBefore = auction.token().balanceOf(owner);
        auction.claimTokens(0);
        uint256 ownerTokenBalanceAfter = auction.token().balanceOf(owner);
        console2.log("Bid 0 tokens claimed:", ownerTokenBalanceAfter - ownerTokenBalanceBefore, (ownerTokenBalanceAfter - ownerTokenBalanceBefore) / 1e18);
        
        ownerTokenBalanceBefore = auction.token().balanceOf(owner);
        auction.claimTokens(1);
        ownerTokenBalanceAfter = auction.token().balanceOf(owner);
        console2.log("Bid 1 tokens claimed:", ownerTokenBalanceAfter - ownerTokenBalanceBefore, (ownerTokenBalanceAfter - ownerTokenBalanceBefore) / 1e18);

        vm.stopBroadcast();
    }
}
```

Running this script gives the following output:
```
  Bid 0 exited
  Refunded ETH: 1995999999999999909677
  Bid 0 exitedBlock: 4
  Bid 1 exited
  Refunded ETH: 0
  Bid 1 exitedBlock: 100
  Bid 0 tokens claimed: 2000000000000000000000000 2000000
  Bid 1 tokens claimed: 993999999999999999999999459 993999999
```

The second bid is exited successfully and it refunded 0 ETH back to the `owner`. This is expected since it was fully filled for the duration of the auction.

The first bid purchased `2,000,000` tokens and the second bid purchased `993,999,999` tokens. Given the total supply of 1 billion tokens this makes sense since the second bid completely outbid the first bid after the first checkpoint. 

Note that these two values don't add up perfectly to the total supply since the auction was not fully subscribed at its `startBlock`. The first bid was entered a few blocks after the start of the auction and thus the token supply allocated to those "missed" blocks were not sold. These unsold tokens can be swept back to the preconfigured `tokensRecipient` by calling `sweepUnsoldTokens` after the end of the auction.

### Sweep unsold tokens
At the end of the auction any unsold tokens can be swept back to the preconfigured `tokensRecipient` by calling `sweepUnsoldTokens`. This function is permissionless and can be called by anyone.

```solidity
    function run() public {
        // All the code from the previous script...

        uint256 tokensRecipientBalanceBefore = auction.token().balanceOf(auction.tokensRecipient());
        auction.sweepUnsoldTokens();
        uint256 tokensRecipientBalanceAfter = auction.token().balanceOf(auction.tokensRecipient());
        console2.log("Unsold tokens swept:", tokensRecipientBalanceAfter - tokensRecipientBalanceBefore, (tokensRecipientBalanceAfter - tokensRecipientBalanceBefore) / 1e18);

        vm.stopBroadcast();
    }
```

Running this script gives the following output:
```
Unsold tokens swept: 4000000000000000000000540 4000000
```

We can see that `4,000,000` tokens were not sold in the auction and were swept back to the `tokensRecipient`. Combining this value with the total number of tokens purchased by the first bid and the second bid gives us the total supply of tokens sold in the auction (2,000,000 + 993,999,999 + 4,000,000 = 1,000,000,000).

### Sweep raised currency
At the end of the auction any raised currency can be swept back to the preconfigured `currencyRecipient` by calling `sweepCurrency`. This function is also permissionless and can be called by anyone.

```solidity
    function run() public {
        // All the code from the previous script...

        uint256 fundsRecipientBalanceBefore = address(auction.fundsRecipient()).balance;
        auction.sweepCurrency();
        uint256 fundsRecipientBalanceAfter = address(auction.fundsRecipient()).balance;
        console2.log("Currency swept:", fundsRecipientBalanceAfter - fundsRecipientBalanceBefore, (fundsRecipientBalanceAfter - fundsRecipientBalanceBefore) / 1e18);
    }
```

Running this script gives the following output:
```
Currency swept: 2703999999999999877637 2703
```

We can see that `2703999999999999877637` wei of currency (~2,703 ETH) was raised in the auction and was swept to the preconfigured `fundsRecipient`.

## Next steps
This concludes the quickstart guide for the CCA auction mechanism! We covered:
- How to setup a local development environment
- How to configure a CCA auction
- Submitting a bid and understanding price discovery
- Exiting a bid and claiming tokens
- Sweeping unsold tokens and the total raised currency

For more details please refer to the [technical reference](/docs/contracts/liquidity-launchpad/05-auction-mechanism.md).

Additionally, the contracts are open sourced and MIT licensed. You can find the source code for the contracts in the [GitHub repository](https://github.com/Uniswap/continuous-clearing-auction).
