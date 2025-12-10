---
id: submit-bid
title: Submitting a bid
sidebar_position: 4
---

# Submitting a bid
This section will walk you through submitting a bid on a CCA auction.

## Prerequisites
Basic understanding of the CCA auction mechanism and Solidity is assumed. This guide continues from the [previous section](/docs/contracts/liquidity-launchpad/quickstart/example-configuration.md) where we configured a CCA auction and deployed it to our local anvil node.

## Summary
Currently we have a CCA contract deployed which we can interact with. It has the following parameters:
| Parameter             | Value                                      | Notes                                                                                                          |
|-----------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| currency              | `address(0)`                               | We'll use the native token for this example                                                                    |
| tokensRecipient       | `deployer`                                 | Address that will receive leftover tokens                                                                      |
| fundsRecipient        | `deployer`                                 | Address that will receive the funds raised during the auction                                                  |
| startBlock            | `uint64(block.number)`                     | Start the auction on the current block                                                                         |
| endBlock              | `uint64(block.number + 100)`               | End the auction after 100 blocks                                                                               |
| claimBlock            | `uint64(block.number + 100)`               | Allow claims at the end of the auction                                                                         |
| tickSpacing           | `7922816251426434048`                      | Use a tick spacing equal to the floor price                                                                    |
| validationHook        | `address(0)`                               | Use no validation hook                                                                                         |
| floorPrice            | `7922816251426434048`                      | Use a floor price representing a ratio of 1:1_000_000                                                          |
| requiredCurrencyRaised| `0`                                        | No graduation threshold                                                                                        |

We also added a token supply schedule of 10% in the first 50 blocks, 49% in the next 49 blocks, and 41% in the last block.

## Interacting with the auction contract
Let's create a new script to interact with the deployed auction contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {ContinuousClearingAuction} from "../src/ContinuousClearingAuction.sol";
import {console2} from "forge-std/console2.sol";

contract ExampleCCABidScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        ContinuousClearingAuction auction = ContinuousClearingAuction(vm.envAddress("AUCTION_ADDRESS"));

        vm.stopBroadcast();
    }
}
```

You can run this with the following command:
```bash
AUCTION_ADDRESS=<auction-contract-address> forge script scripts/ExampleCCABidScript.s.sol:ExampleCCABidScript --rpc-url http://localhost:8545 --private-key <your-private-key>
```

## Submitting a bid
To submit a bid, we need to call the `submitBid()` function on the auction contract. The function has the following signature:

```solidity
function submitBid(uint256 maxPrice, uint128 amount, address owner, uint256 prevTickPrice, bytes calldata hookData) external payable returns (uint256 bidId);
```

The `maxPrice` is the maximum price the bidder is willing to pay. This MUST be strictly above the current clearing price.

The `amount` is the amount of currency the user is bidding, and `owner` is the address of the user who will receive any purchased tokens or refunded currency.

The `prevTickPrice` is the price of the tick immediately preceding the tick to insert the bid into. You can also omit this and the contract will iterate through every tick starting from the floor price until it reaches the correct position.

The `hookData` is the data to pass to the validation hook. We'll omit this since we're not using a validation hook.

Let's add this to our script:
```solidity
    function run() public {
        vm.startBroadcast();

        ContinuousClearingAuction auction = ContinuousClearingAuction(vm.envAddress("AUCTION_ADDRESS"));

        uint256 maxPrice = auction.floorPrice() + auction.tickSpacing(); // Bid at the next possible price
        uint128 amount = 1 ether;
        address owner = vm.envAddress("DEPLOYER"); // The deployer is the owner of the bid by default

        uint256 bidId = auction.submitBid{value: amount}(maxPrice, amount, owner, bytes(""));

        console2.log("Bid submitted with ID:", bidId);

        vm.stopBroadcast();
    }
```

You can use the public anvil private key (`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`) when running the script as it has an existing balance of ETH:
```bash
AUCTION_ADDRESS=<auction-contract-address> forge script scripts/ExampleCCABidScript.s.sol:ExampleCCABidScript --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 -vvvv
```

The output should look like this:
```bash
Bid submitted with ID: 0
```

Congratulations! You've submitted your first bid on a CCA auction.

### Breaking down the events
If you look through the logs you'll see quite a few events emitted by the auction contract.

```
    ├─ emit ClearingPriceUpdated(blockNumber: 3, clearingPrice: 7922816251426434048 [7.922e18])
    ├─ emit CheckpointUpdated(blockNumber: 3, clearingPrice: 7922816251426434048 [7.922e18], cumulativeMps: 60000 [6e4])
    ├─ emit NextActiveTickUpdated(price: 15845632502852868096 [1.584e19])
    ├─ emit TickInitialized(price: 15845632502852868096 [1.584e19])
    ├─ emit BidSubmitted(id: 0, owner: RIPEMD-160: [0x0000000000000000000000000000000000000003], price: 15845632502852868096 [1.584e19], amount: 1000000000000000000 [1e18])
```

Clearly a lot more is happening that just submitting a bid.

The first thing we see happening is the auction creating a new checkpoint for the current block (in this case, block 3). At this point in time the auction has already started (remember how we used `block.number` for the start block?) and you can see that the `cumulativeMps` field, which tracks the percentage of auction which has passed, is at 60_000, or 6%. We also see that the auction updates the clearing price to the floor price (7922816251426434048). This is equal to the expected ratio of 1 ETH to 1 million tokens.

Additionally we see the auction initializing a new tick at the price which we placed our bid at (15845632502852868096). This value is equal to `floorPrice + tickSpacing` as expected (for simplicity we set tickSpacing equal to the floor price so this is 2 * floorPrice).

Finally we see the `BidSubmitted` event, which contains the bid ID, the owner of the bid, the price at which the bid was placed, and the amount of currency that was bid.

## Next steps
In the next section we'll modify our script to show how the price of the auction can change over time. We'll also cover exiting and claiming the tokens from a bid.
