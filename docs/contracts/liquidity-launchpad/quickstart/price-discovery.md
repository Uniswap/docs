---
id: price-discovery
title: Price discovery
sidebar_position: 5
---

# Entering price discovery
This section will walk you through how a CCA auction discovers new prices over time.

## Prerequisites
Basic understanding of the CCA auction mechanism and Solidity is assumed. This guide continues from the [previous section](/docs/contracts/liquidity-launchpad/quickstart/first-bid.md) where we submitted our first bid.

## Summary
Currently we have a CCA contract deployed which we have submitted a bid to. We'll now modify our script to show how the price of the auction can change over time.

To summarize the current relative parameters:
| Parameter             | Value                                      | Notes                                                                                                          |
|-----------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| currency              | `address(0)`                               | We'll use the native token for this example                                                                    |
| tickSpacing           | `79228162514264334008320`                  | Use a tick spacing equal to the floor price                                                                    |
| floorPrice            | `79228162514264334008320`                  | Use a floor price representing a ratio of 1:1,000,000                                                          |

And the total supply to sell is 1 billion tokens.

## Discovering a new price
In the last section we showed how the auction updates its internal state via checkpointing when a new bid is submitted. The bid that we submitted had two main parts: a max price and an amount.

The [whitepaper](https://uniswap.org/whitepaper.pdf) is the best resource to understand the mechanics of the auction but at a high level this is how the auction's mechanism works:
- Given that each bid is willing to purchase tokens until some _maximum price_, there exists a price for which no one is willing to participate in the auction.
- A less extreme version of the idea above is that there exists a _clearing price_ for which all of the demand (ex. ETH) in the auction can purchase all of the tokens that are being sold.
- This equilibrium can only change if a new bid is submitted into the auction.
- Thus, every time a new bid is added we try to find a new _clearing price_. We do this by iterating through each price tick until we find a price at which there is not enough demand to purchase all of the tokens that are being sold.
- This is the _clearing price_ and it is the price at which all active participants will pay in this block.

Hopefully you can quickly reason about how much `currency` is required to move the price of the auction above the floor: `required currency = desired price * totalSupply`

In our example, the floor price is a 1:1,000,000 ratio and the total supply is 1 billion tokens. So we'll need 1,000 ETH to move the price of the auction above the floor.

Let's modify our script to submit enough ETH to move the price of the auction above the floor.

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

You can run the script with the following command (the --slow is important!)
```bash
AUCTION_ADDRESS=<auction address> forge script scripts/ExampleCCABidScript.s.sol:ExampleCCABidScript \
--rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast -vvvv --slow
```

The output should look like this:
```
[335278] 0x1fE7eaE06ef5c6b5f7eeA526Ca1fc1945153dF58::submitBid{value: 1999999999999999909496}(158456325028528668016640 [1.584e23], 1999999999999999909496 [1.999e21], RIPEMD-160: [0x0000000000000000000000000000000000000003], 0x)
    ├─ emit ClearingPriceUpdated(blockNumber: 3, clearingPrice: 79228162514264334008320 [7.922e22])
    ├─ emit CheckpointUpdated(blockNumber: 3, clearingPrice: 79228162514264334008320 [7.922e22], cumulativeMps: 60000 [6e4])
    ├─ emit NextActiveTickUpdated(price: 158456325028528668016640 [1.584e23])
    ├─ emit TickInitialized(price: 158456325028528668016640 [1.584e23])
    ├─ emit BidSubmitted(id: 0, owner: RIPEMD-160: [0x0000000000000000000000000000000000000003], price: 158456325028528668016640 [1.584e23], amount: 1999999999999999909496 [1.999e21])
    └─ ← [Return] 0

  [177725] 0x1fE7eaE06ef5c6b5f7eeA526Ca1fc1945153dF58::checkpoint()
    ├─ emit NextActiveTickUpdated(price: 115792089237316195423570985008687907853269984665640564039457584007913129639935 [1.157e77])
    ├─ emit ClearingPriceUpdated(blockNumber: 4, clearingPrice: 158456325028528668016640 [1.584e23])
    ├─ emit CheckpointUpdated(blockNumber: 4, clearingPrice: 158456325028528668016640 [1.584e23], cumulativeMps: 80000 [8e4])
    └─ ← [Return] Checkpoint({ clearingPrice: 158456325028528668016640 [1.584e23], currencyRaisedAtClearingPriceQ96_X7: 3169126500570573360332800000000000000000000000000000000 [3.169e54], cumulativeMpsPerPrice: 5545971375998503882513753047040011356670 [5.545e39], cumulativeMps: 80000 [8e4], prev: 3, next: 18446744073709551615 [1.844e19] })
```

Observe that we bid `1999999999999999909496` wei of ETH, which is approximately 2000 ETH, and the auction's clearing price moved to `158456325028528668016640`. This is equal to our max price of `158456325028528668016640`. As such, we have successfully moved the price of the auction above the floor to exactly our maxPrice. This is because our bid deposited exactly the amount of ETH required to purchase the `totalSupply` of tokens at the given price. You can see in the forge script how the amount of ETH is calculated: `uint256 amountRequired = (maxPrice * uint256(auction.totalSupply())) >> 96`. Given the total supply of 1 billion tokens (1e9), it will require 2000 (2e3) ETH to move the price to a ratio of 1:2,000,000 (1:2e6).

This follows our intuition from the previous section, where the auction finds the highest price for which there is enough demand willing to purchase the `totalSupply` of tokens. If the clearing price moved above our max price, we would be outbid, and as we are the only bidder in the auction, there would be no demand to match with the supply. That's why the price of the auction moved exactly to the max price of the bid.

We also see that the new Checkpoint created in block #4 has the updated clearing price.

## Next steps
In the next section we'll cover how a bid can be exited and how tokens can be claimed.
