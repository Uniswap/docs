---
id: single-swaps
title: Single Swaps
sidebar_position: 1
---

In this example, we’ll build a basic swap contract called `SimpleSwap`.  The contract will take in an input amount of Wrapped Ether and swap it for DAI via a Uniswap V3 pool. 

The basic steps we’ll run through are: 

1. Write the `SimpleSwap` smart contract
2. Write a test that executes a swap on the contract and makes sure it’s working 

After completing this guide you should be able to run a `SimpleSwap.test.js` test file which performs the swap on a local node you’ll be running and confirms it completed successfully. 

As a prerequisite, make sure you have a development environment set up and a local node running with a Mainnet fork. If you haven’t set this up yet, you can follow our guide here.

# Write the Smart Contract

Let’s begin by creating a new file for our contract at `contracts/SimpleSwap.sol`. Start by adding the following set up code:

```solidity
// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract SimpleSwap {
    constructor() {
    }
}
```

The first three lines are standard in Solidity programming, they set up the license and compiler info. We won’t go too deep into what they mean here, but if you’re not familiar with what these do we highly recommend reading through the [Solidity language docs](https://docs.soliditylang.org/en/v0.8.16/layout-of-source-files.html#layout-of-a-solidity-source-file).

Next, we import two elements from the Uniswap V3 Protocol (if you haven’t already run `npm add @uniswap/v3-periphery`). The first — `ISwapRouter.sol` — is the interface of the Uniswap SwapRouter contract, which we’ll use to route our swap to the appropriate contract methods on the Protocol. The second — `TransferHelper.sol` — is a utility library to help us do some required operations on ERC20 tokens. We’ll use these later in our contract.

Finally, we define our contract called `SimpleSwap`. This contract doesn’t do anything right now, but we can add some code so that it will perform a simple swap.

## Swap Code Setup

Next, we’ll add some constant addresses and references. In a production version of this contract, these should be dynamic (a great follow up project) — but to keep things simple we’re going to hard code them. 

Add the following lines to your `contracts/SimpleSwap.sol` file: 

```solidity
// ...
contract SimpleSwap {
    ISwapRouter public immutable swapRouter;
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint24 public constant feeTier = 3000;
		
	constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }
}
```

First we use the `ISwapRouter` interface to create a reference to a [SwapRouter](https://docs.uniswap.org/protocol/reference/periphery/interfaces/ISwapRouter). The [SwapRouter](https://docs.uniswap.org/protocol/reference/periphery/interfaces/ISwapRouter) is part of the [Uniswap V3 Periphery](https://github.com/Uniswap/v3-periphery) contracts, designed to make executing swaps easier:  

```solidity
ISwapRouter public immutable swapRouter;
```

Second, we create constant variables for the ERC20 tokens that we’ll be swapping. You can and should put these addresses into [Ether Scan](https://etherscan.io/) and confirm that they are the tokens you’re expecting: 

```solidity
address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
```

Next we create another constant variable to indicate the fee tier of the pool we want to use to swap. Again, in a more general contract this would be an input that gets set at runtime, but for simplicity we’re hardcoding to the 0.3% fee tier pool. Fee tiers are denoted in 1/100ths of a basis point so our fee tier will be 3000: 

```solidity
uint24 public constant feeTier = 3000;
```

Finally, we create the constructor, which gets called when our contract is deployed. We’re requiring that an integrator pass in the address of the SwapRouter that they want to use. All the constructor does then is set the `swapRouter` variable to use the one provided by the integrator: 

```solidity
constructor(ISwapRouter _swapRouter) {
    swapRouter = _swapRouter;
}
```

And that’s it! Now that we have all of the set up code written, we can move on to actually executing our swap. 

## Swap Code Implementation

Again, this sample contract only does one thing: swap WETH for DAI. Let’s start by creating the function signature for our swap: 

```solidity
contract SimpleSwap {
    //...
    function swapWETHForDAI(uint amountIn) external returns (uint256 amountOut) {
	    // We'll fill this in next
	}
}
```

The function takes in one parameter, the amount of WETH we want to swap denominated in Wei (which is 10^-18 WETH). OpenZeppelin has a [good explanation](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals) of why we denominate in Wei as opposed to WETH (TLDR; it allows us to do accurate arithmetic in Solidity which doesn’t support floating point numbers). For the purposes of this guide, just know to swap 1 WETH you have to pass this function an `amountIn` of 1*10^18.  

Performing a swap from WETH to DAI will require two prerequisite steps. First, our contract will have to move the requested amount of WETH from the caller’s wallet to itself and then it will need to approve the `swapRouter` to spend that WETH to swap for DAI. Luckily, the [Uniswap V3 Periphery](https://github.com/Uniswap/v3-periphery) contracts provide us tools to make this easy. Start by adding the following lines to your `swapWETHForDAI` function: 

```solidity
function swapWETHForDAI(uint amountIn) external returns (uint256 amountOut) {
    // Transfer the specified amount of WETH9 to this contract.
    TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
    
    // Approve the router to spend WETH9.
    TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);
}
```

The first step calls the periphery helper function `safeTransferFrom`, which transfers the desired amount of WETH from the caller’s wallet into the contract. Keep in mind that since we’re transferring on behalf of the user, that user will have to sign an approval before calling this method. This is a critical concept to understand, and we’ll go through *how* to do that in the next section when we create a test client. 

The next line calls `safeApprove` to allow the `swapRouter` to spend the specified amount of WETH. This will give SwapRouter permission to actually execute the swap for us. 

We’ll call the SwapRouter’s [exactInputSingle](https://docs.uniswap.org/protocol/reference/periphery/interfaces/ISwapRouter#exactinputsingle) method, which will run a swap of an “exact amount” of an input token for the maximum amount of an output token. 

Add the following code to the `swapWETHForDAI` function to execute the swap. It may seem complicated, but we’ll step through it.  

```solidity
function swapWETHForDAI(uint amountIn) external returns (uint256 amountOut) {
	// ...
	ISwapRouter.ExactInputSingleParams memory params =
      ISwapRouter.ExactInputSingleParams({
          tokenIn: WETH9,
          tokenOut: DAI,
          fee: feeTier,
          recipient: msg.sender,
          deadline: block.timestamp,
          amountIn: amountIn,
          amountOutMinimum: 0,
          sqrtPriceLimitX96: 0
      });
  // The call to `exactInputSingle` executes the swap.
  amountOut = swapRouter.exactInputSingle(params);
  return amountOut;
}
```

The V3-Periphery contracts provide us a [handy struct](https://github.com/Uniswap/v3-periphery/blob/9ca9575d09b0b8d985cc4d9a0f689f7a4470ecb7/contracts/interfaces/ISwapRouter.sol#L10), `ExactInputSingleParams` for the Swap method. All but the last two elements of this object should be pretty self explanatory, we’re just mapping variables that we already set to the parameter object. 

For simplicity in this example, we’ll set the last two elements `amountOutMinimum` and `sqrtPriceLimitX96` to zero. These are out of scope for this basic example, but they essentially let you set a minimum amount of the output, in this case DAI, that you’ll receive for a swap. In production, this is one way to limit price [slippage from a swap](https://docs.uniswap.org/protocol/concepts/V3-overview/swaps#slippage). 

Finally, in the last two lines, we’ll execute the `exactInputSingle` method of the SwapRouter, with the parameters we set up which actually executes the trade, then return the amount of DAI that that trade netted. 

## Complete Contract

That’s it! You now have a working contract that will swap an inputted amount of WETH for the maximum amount of DAI given current market prices. Before moving to testing, double check that your contract matches: 

```solidity
// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract SimpleSwap {
    ISwapRouter public immutable swapRouter;
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint24 public constant feeTier = 3000;
    
    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }
    
    function swapWETHForDAI(uint amountIn) external returns (uint256 amountOut) {

        // Transfer the specified amount of WETH9 to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        // Approve the router to spend WETH9.
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
        return amountOut; 
    }
}  
```

# Testing the Smart Contract

At this point our `SimpleSwap` contract is written so we could build any kind of front end client to run it. For this guide our client will be a test using Chai framework that ships with Hardhat to: 

1. Deploy our `SimpleSwap` contract to a fork of Ethereum Mainnet
2. Check our test wallet’s balance of DAI
3. Call the `swapWETHForDAI` to swap some test WETH for DAI
4. Confirm that the test user’s DAI balance actually increased

For this example, we’re assuming you’re using a Hardhat environment like the one set up in the Environment Set Up docs. 

### Contract Test File

Create a file at `./tests/SimpleSwap.test.js` and add the following starter code: 

```jsx
const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const DAI_DECIMALS = 18; 
const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; 

const ercAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function deposit() public payable",
  "function approve(address spender, uint256 amount) returns (bool)",
];

describe("SimpleSwap", function () {
  it("Should provide a caller with more DAI than they started with after a swap", async function () {
    
    /* Deploy the SimpleSwap contract */

    /* Connect to weth9 and wrap some eth  */

    
    /* Check Initial DAI Balance */ 

    /* Approve the swapper contract to spend weth9 for me */

    
    /* Execute the swap */
 
    
    /* Check DAI end balance */

    
    /* Test that we now have more DAI than when we started */

  });
});
```

The file starts by importing the test framework `Chai` and `Hardhat`, which we’ve been using for our development environment and sets some familiar constants. The [ERC-20 ABI](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) snippet lets us call functions like `Approve` on ERC-20 tokens (read more about ABIs [here](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html)). 

With the setup code out of the way, let’s jump into the the actual test, which starts on line 20. Add the following code to deploy our `SimpleSwap` contract: 

```jsx
/* Deploy the SimpleSwap contract */
const simpleSwapFactory = await ethers.getContractFactory("SimpleSwap");
const simpleSwap = await simpleSwapFactory.deploy(SwapRouterAddress);
await simpleSwap.deployed();
```

Hardhat is doing a lot of leg work for us here. It’s deploying the contract to our local environment and saving a callable version of it — `simpleSwap` — which we’ll be able to execute methods on.

The Hardhat local node provides us an account that is preloaded with a bunch of test ETH. Since we’re swapping WETH for DAI, we have to take some of that ETH and wrap it. Add the following code to first get the keys to the account, stored in the `signers` variable, then deposit some of it’s ETH in the WETH contract to wrap it: 

```jsx
/* Connect to WETH and wrap some eth  */
let signers = await hre.ethers.getSigners();
const WETH = new hre.ethers.Contract(WETH_ADDRESS, ercAbi, signers[0]);
const deposit = await WETH.deposit({ value: hre.ethers.utils.parseEther("10") });
await deposit.wait();
```

If all goes well, these steps will give us 10 WETH ready to be swapped for DAI. To begin the test, we’ll grab our test account’s current balance of DAI and save it to the local variable `DAIBalanceBefore`. You’ll notice we use the `formatUnits` utility from Ethers to convert the DAI amount to a readable floating point number: 

```jsx
/* Check Initial DAI Balance */ 
const DAI = new hre.ethers.Contract(DAI_ADDRESS, ercAbi, signers[0]);
const expandedDAIBalanceBefore = await DAI.balanceOf(signers[0].address);
const DAIBalanceBefore = Number(hre.ethers.utils.formatUnits(expandedDAIBalanceBefore, DAI_DECIMALS));
```

Next is a critical, often overlooked, step. Our `SimpleSwap` contract is going to be moving WETH on out of our wallet and onto the swap contract. It can’t do this without our approval, which we give by calling the `approve` method on the WETH ERC-20 contract itself. For this example, we’ll approve it to move 1 WETH on our behalf: 

```jsx
/* Approve the swapper contract to spend WETH for me */
await WETH.approve(simpleSwap.address, hre.ethers.utils.parseEther("1"));
```

And finally we can execute our swap on the `SimpleSwap` contract. Hardhat makes this easy, exposing the callable `swapWETHForDAI` method on our contract object. We’ll use this to swap of 0.1 WETH for DAI: 

```jsx
/* Execute the swap */
const amountIn = hre.ethers.utils.parseEther("0.1"); 
const swap = await simpleSwap.swapWETHForDAI(amountIn, { gasLimit: 300000 });
swap.wait();
```

Once that transaction completes, we’ll do another check of our account’s DAI balance: 

```jsx
/* Check DAI end balance */
const expandedDAIBalanceAfter = await DAI.balanceOf(signers[0].address);
const DAIBalanceAfter = Number(hre.ethers.utils.formatUnits(expandedDAIBalanceAfter, DAI_DECIMALS));
```

Finally, compare it to the DAI balance we checked before the swap. If the swap worked, we should now have more DAI than when we started: 

```jsx
/* Test that we now have more DAI than when we started */
expect( DAIBalanceAfter )
  .is.greaterThan(DAIBalanceBefore);
```

To run the test, you’ll need an local node running with a fork of mainnet. If you don’t have one running follow the instructions in the [Set up Your Environment](https://docs.uniswap.org/protocol/guides/local-environment) guide to start one. Then open a new command line to the repo’s root and run the following command: 

```bash
npx hardhat test --network localhost
```

If everything is working you should see that the test succeeded:  

```bash
SimpleSwap
    ✔ Should provide a caller with more DAI than they started with after a swap (1999ms)

  1 passing (2s)
```