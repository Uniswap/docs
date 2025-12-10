---
id: local-deployment
title: Create a local deployment
sidebar_position: 2
---

# Create a local deployment
This guide will walk you through deploying a Continuous Clearing Auction (CCA) instance locally.

## Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Anvil](https://book.getfoundry.sh/anvil/)

Also, please check out the [setup guide](./setup.md) for installation instructions.

## Deployment methods
There are two main ways to deploy new CCA auctions:
1. Via the `ContinuousClearingAuctionFactory` contract (recommended)
2. Deploying a new `ContinuousClearingAuction` contract directly

### Deploying via factory (recommended)
The `ContinuousClearingAuctionFactory` contract is a factory contract that deploys new instances of the contract. It inherits the `IDistributionStrategy` interface from the [Liquidity Launcher](https://github.com/Uniswap/liquidity-launcher) contracts.

```solidity
interface IDistributionStrategy {
    /// @notice Initialize a distribution of tokens under this strategy.
    /// @dev Contracts can choose to deploy an instance with a factory-model or handle all distributions within the
    /// implementing contract. For some strategies this function will handle the entire distribution, for others it
    /// could merely set up initial state and provide additional entrypoints to handle the distribution logic.
    /// @param token The token that is being distributed.
    /// @param totalSupply The supply of the token that is being distributed.
    /// @param configData Arbitrary, strategy-specific parameters.
    /// @param salt The optional salt for deterministic deployment.
    /// @return distributionContract The contract that will handle or manage the distribution.
    ///         (Could be `address(this)` if the strategy is handled in-place, or a newly deployed instance).
    function initializeDistribution(address token, uint256 totalSupply, bytes calldata configData, bytes32 salt)
        external
        returns (IDistributionContract distributionContract);
}
```

The factory contract is deployed to the same address across the following networks:
| Network  | Address                                    | Commit Hash                              | Version          |
| -------- | ------------------------------------------ | ---------------------------------------- | ---------------- |
| Mainnet  | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Unichain | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Base     | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |
| Sepolia  | 0x0000ccaDF55C911a2FbC0BB9d2942Aa77c6FAa1D | 154fd189022858707837112943c09346869c964f | v1.0.0-candidate |

### Deploying a new `ContinuousClearingAuction` contract directly
CCA auctions can be deployed directly by calling the constructor:

```solidity
constructor(address _token, uint128 _totalSupply, AuctionParameters memory _parameters)

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

We'll be using the factory method for the rest of this guide.

## ContinuousClearingAuctionFactory
The factory contract has two functions: `initializeDistribution()` and `getAuctionAddress()`. It has no constructor parameters so it can be easily deployed to the same address across all networks.

### initializeDistribution()
This is the main entrypoint and is called by integrating contracts within the `LiquidityLauncher` system.

It performs basic validation checks:
- Requires the amount of tokens to be less than `uint128.max`
- CREATE2 prevents the same auction configuration from being initialized twice

To avoid issues with circular deployments, the factory contract will replace the `tokenRecipient` and `fundsRecipient` parameters if they are set to the sentinel "MSG_SENDER" address (address(1)). 

```solidity
        // If the tokensRecipient is address(1), set it to the msg.sender
        if (parameters.tokensRecipient == ActionConstants.MSG_SENDER) parameters.tokensRecipient = msg.sender;
        // If the fundsRecipient is address(1), set it to the msg.sender
        if (parameters.fundsRecipient == ActionConstants.MSG_SENDER) parameters.fundsRecipient = msg.sender;
```

Finally, an optional caller provided `salt` is hashed with the auction parameters to allow for deterministic deployments and vanity addresses.

This function emits the `AuctionCreated` event with address of the new auction contract as well as the `amount` and `token` being distributed.

### getAuctionAddress()
This function is a simple view function that performs the same logic as `initializeDistribution()` but does not deploy a new contract. It calculates and returns the address of the new auction contract.

Onchain integrators will find this function useful for calculating the address of an auction contract before it is deployed.

## Starting our local deployment script
Let's start by creating a new script file in the `scripts` folder.

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

Then, you can run the script:
```bash
forge script script/ExampleCCADeploymentScript.s.sol:ExampleCCADeploymentScript --rpc-url http://localhost:8545 --private-key <your-private-key> --broadcast
```

This will deploy the factory contract.

### Next steps
In the next section we'll walk through the different parameters of a CCA auction and create an example configuration.