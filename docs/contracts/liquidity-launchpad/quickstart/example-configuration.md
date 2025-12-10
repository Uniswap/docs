---
id: example-configuration
title: Example configuration
sidebar_position: 2
---

# Configuring a CCA auction
This section will walk you through each parameter of a CCA auction and an example configuration. For more details please refer to the [technical reference](/docs/contracts/liquidity-launchpad/05-auction-mechanism.md).

### Prerequisites
Basic understanding of the CCA auction mechanism and Solidity is assumed. This guide continues from the [previous section](/docs/contracts/liquidity-launchpad/quickstart/local-deployment.md).

## Auction Parameters
The `AuctionParameters` struct parameterizes a new CCA auction. It is encoded and passed to the `ContinuousClearingAuctionFactory` contract when deploying a new auction. The struct definition is as follows:

```solidity
/// from: https://github.com/Uniswap/continuous-clearing-auction/blob/main/src/interfaces/IContinuousClearingAuction.sol
struct AuctionParameters {
    address currency; // token to raise funds in. Use address(0) for ETH
    address tokensRecipient; // address to receive leftover tokens
    address fundsRecipient; // address to receive all raised funds
    uint64 startBlock; // Block which the first step starts
    uint64 endBlock; // When the auction finishes
    uint64 claimBlock; // Block when the auction can claimed
    uint256 tickSpacing; // Fixed granularity for prices
    address validationHook; // Optional hook called before a bid
    uint256 floorPrice; // Starting floor price for the auction
    uint128 requiredCurrencyRaised; // Amount of currency required to be raised for the auction to graduate
    bytes auctionStepsData; // Packed bytes describing token issuance schedule
}
```

We'll cover each parameter in detail below.

### currency
The `currency` parameter is the address of the token that will be used to raise funds for the auction. This can be any ERC20 token or the native token of the chain (address(0)).

### tokensRecipient
The `tokensRecipient` parameter is the address that will receive the leftover tokens after the auction is complete. Depending on the implementation, this may be a trusted EOA address or a strategy contract address if the auction is being used to bootstrap a liquidity pool.

### fundsRecipient
The `fundsRecipient` parameter is the address that will receive the funds raised during the auction. Again, depending on the implementation, this may be a trusted EOA address or a strategy contract address if the auction is being used to bootstrap a liquidity pool.

### startBlock
The `startBlock` parameter is the block number at which the auction will start. Once the auction starts, the supply schedule will begin and bids will be accepted. Note that `startBlock` is inclusive so the auction will start exactly on the block specified.

### endBlock
The `endBlock` parameter is the block number at which the auction will end. Note that `endBlock` is exclusive so the auction will end on the block specified. No more bids are accepted at and after the end block.

### claimBlock
The `claimBlock` parameter is the block number at which purchased tokens can be claimed. It must be at or after the `endBlock`.

### tickSpacing
The `tickSpacing` parameter denotes the **minimum** price increment for bids. It is used to prevent users from being outbid by others by infinitesimally small amounts and for gas efficiency in finding new clearing prices. Generally integrators should choose a tick spacing of AT LEAST 1 basis point of the floor price. 1% or 10% is also reasonable.

Bids can only be placed at increments of tickSpacing, but the auction may clear at any price. 

### validationHook
The `validationHook` parameter is an optional contract that can be used to validate bids before they are accepted. It is called before a bid is accepted and can be used to reject bids that do not meet certain criteria. It must implement the `IValidationHook` interface. Use `address(0)` to opt-out of validation.

### floorPrice
The `floorPrice` parameter is the starting floor price for the auction. It is the minimum price at which bids will be accepted.

All prices in the auction are represented as the ratio of `currency` to `token`. For example, a floor price with an integer component of 1000 means that 1000 `currency` is required to purchase 1 `token`. Additionally, the price is represented as a Q96 fixed-point number to allow for fractional prices. For more details about the Q-number format please refer to this wikipedia [article](https://en.wikipedia.org/wiki/Q_(number_format)).

Using the above example, a floor price of 1000 would be represented as `1000 << 96` or `1000 * 2^96`.

### requiredCurrencyRaised
The `requiredCurrencyRaised` parameter is the amount of `currency` required to be raised for the auction to graduate. If the auction does not raise this amount, the auction will not graduate and all bidders will be refunded their initial bid amounts. No tokens will be sold and the `totalSupply` will be swept back to the `tokensRecipient`.

### auctionStepsData
The `auctionStepsData` parameter is a packed bytes array that describes the token issuance schedule. It is used to determine the amount of tokens that will be sold in each block. It is a series of `uint64` values that represent the per-block issuance rate in MPS (milli-bips), and the number of blocks to sell over.

For more details about the auction steps please refer to the [technical reference](/docs/contracts/liquidity-launchpad/05-auction-mechanism.md#auction-steps-supply-issuance-schedule).

## Example configuration
Let's create an example configuration for a CCA auction. We'll use the script we started in the [previous section](/docs/contracts/liquidity-launchpad/quickstart/local-deployment.md).

Here's the script copy and pasted for convenience:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {ContinuousClearingAuctionFactory} from "../src/ContinuousClearingAuctionFactory.sol";
import {IDistributionContract} from "../src/interfaces/external/IDistributionContract.sol";
import {console2} from "forge-std/console2.sol";

contract ExampleCCADeploymentScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        ContinuousClearingAuctionFactory factory = new ContinuousClearingAuctionFactory();
        console2.log("Factory deployed to:", address(factory));

        // TODO: configure the auction and deploy it via `initializeDistribution()`

        vm.stopBroadcast();
    }
}
```

First, make sure to import the `AuctionParameters` struct from the `IContinuousClearingAuction` interface:

```solidity
import {AuctionParameters} from "../src/interfaces/IContinuousClearingAuction.sol";
```

Then, we can configure the auction parameters:

```solidity
address deployer = vm.envAddress("DEPLOYER");

AuctionParameters memory parameters = AuctionParameters({
    currency: address(0),                   // We'll use the native token for this example
    tokensRecipient: deployer,
    fundsRecipient: deployer,
    startBlock: uint64(block.number),       // Start the auction on the current block
    endBlock: uint64(block.number + 100),   // End the auction after 100 blocks
    claimBlock: uint64(block.number + 100), // Allow claims at the end of the auction
    tickSpacing: 1 << 96,                   // Use a tick spacing equal to the floor price. The next possible bids prices will be 2 currency:1 token, 3:1 token, etc.
    validationHook: address(0),             // Use no validation hook
    floorPrice: 1 << 96,                    // Use a floor price representing a ratio of 1:1
    requiredCurrencyRaised: 0,              // No graduation threshold 
    auctionStepsData: bytes("")             // Leave this blank for now
});
```

Let's build the auction steps data. For simplicity, we'll sell tokens following a monotonically increasing schedule. We'll sell 10% over 50 blocks, 49% over 49 blocks, and the final 41% in the last block.

To derive the steps:
- First tranche: 10% over 50 blocks
Express 10% in MPS as 1e6 (1,000,000). Over 50 blocks this is 1e6 / 50 = 20,000 MPS per block.
Pack this into a bytes8 value:

```solidity
bytes8 firstTranche = uint64(20_000) | (uint64(50) << 24);
```

Repeat this for the rest of the tranches to get the final auction steps data:
```solidity
bytes8 secondTranche = uint64(100_000) | (uint64(49) << 24); // 49e6 / 49 = 100_000 MPS per block
bytes8 thirdTranche = uint64(4_100_000) | (uint64(1) << 24); // 41e6 / 1 = 4_100_000 MPS per block
```

Finally, pack the auction steps data into a bytes array:
```solidity
bytes memory auctionStepsData = abi.encodePacked(firstTranche, secondTranche, thirdTranche);

// Set the auction steps data
parameters.auctionStepsData = auctionStepsData;
```

You can leverage the `AuctionStepsBuilder` helper library to build the auction steps data.

Before we can finish the script we need to deploy a MockERC20 token to use in the auction. You can use the `ERC20Mock` contract in `openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol`, or any other MockERC20 token you prefer.

```solidity
import {ERC20Mock} from '@openzeppelin/contracts/mocks/token/ERC20Mock.sol';
```

Now let's finish the script:

```solidity
    using AuctionStepsBuilder for bytes;

    function run() public {
        address deployer = vm.envAddress("DEPLOYER");

        vm.startBroadcast();
        ContinuousClearingAuctionFactory factory = new ContinuousClearingAuctionFactory();
        console2.log("Factory deployed to:", address(factory));

        ERC20Mock token = new ERC20Mock();
        uint256 totalSupply = 1_000_000_000e18; // 1 billion tokens

        bytes memory auctionStepsData = AuctionStepsBuilder.init().addStep(20_000, 50).addStep(100_000, 49).addStep(4_100_000, 1);

        AuctionParameters memory parameters = AuctionParameters({
            currency: address(0),
            tokensRecipient: deployer,
            fundsRecipient: deployer,
            startBlock: uint64(block.number),
            endBlock: uint64(block.number + 100),
            claimBlock: uint64(block.number + 100),
            tickSpacing: 1 << 96,
            validationHook: address(0),
            floorPrice: 1 << 96,
            requiredCurrencyRaised: 0,
            auctionStepsData: auctionStepsData
        });

        IDistributionContract auction = IDistributionContract(factory.initializeDistribution(address(token), totalSupply, abi.encode(parameters), bytes32(0)));
        token.mint(address(auction), totalSupply);
        console2.log("Auction deployed to:", address(auction));

        vm.stopBroadcast();
    }
```

This will deploy the mock token, deploy the auction contract, and mint the total supply (1 billion tokens) to the auction contract.

The final step in the script is to ensure that we call `onTokensReceived()` on the auction contract to register the receipt of the tokens.

```solidity
    token.mint(address(auction), totalSupply);
    auction.onTokensReceived();
```

The complete script should look like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {ContinuousClearingAuctionFactory} from "../src/ContinuousClearingAuctionFactory.sol";
import {AuctionParameters} from "../src/interfaces/IContinuousClearingAuction.sol";
import {IDistributionContract} from "../src/interfaces/external/IDistributionContract.sol";
import {AuctionStepsBuilder} from "../test/utils/AuctionStepsBuilder.sol";
import {ERC20Mock} from '@openzeppelin/contracts/mocks/token/ERC20Mock.sol';
import {console2} from "forge-std/console2.sol";

contract ExampleCCADeploymentScript is Script {
    using AuctionStepsBuilder for bytes;
    function setUp() public {}

    function run() public {
        address deployer = vm.envAddress("DEPLOYER");

        vm.startBroadcast();
        ContinuousClearingAuctionFactory factory = new ContinuousClearingAuctionFactory();
        console2.log("Factory deployed to:", address(factory));

        ERC20Mock token = new ERC20Mock();
        uint256 totalSupply = 1_000_000_000e18; // 1 billion tokens

        bytes memory auctionStepsData = AuctionStepsBuilder.init().addStep(20_000, 50).addStep(100_000, 49).addStep(4_100_000, 1);

        AuctionParameters memory parameters = AuctionParameters({
            currency: address(0),
            tokensRecipient: deployer,
            fundsRecipient: deployer,
            startBlock: uint64(block.number),
            endBlock: uint64(block.number + 100),
            claimBlock: uint64(block.number + 100),
            tickSpacing: 1 << 96,
            validationHook: address(0),
            floorPrice: 1 << 96,
            requiredCurrencyRaised: 0,
            auctionStepsData: auctionStepsData
        });

        IDistributionContract auction = IDistributionContract(factory.initializeDistribution(address(token), totalSupply, abi.encode(parameters), bytes32(0)));

        token.mint(address(auction), totalSupply);
        auction.onTokensReceived();

        console2.log("Auction deployed to:", address(auction));
        vm.stopBroadcast();
    }
}
```

Let's run the script:
```bash
forge script script/ExampleCCADeploymentScript.s.sol:ExampleCCADeploymentScript --rpc-url http://localhost:8545 --private-key <your-private-key> --broadcast
```

The deployment should be successful and you should see the factory and auction contract addresses logged to the console.

### Next steps
In the next section we'll write some scripts to interact with the deployed auction contract.